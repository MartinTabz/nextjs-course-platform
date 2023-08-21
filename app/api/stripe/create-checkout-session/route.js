import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
	const supabase = createRouteHandlerClient({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		const send = {
			id: null,
			error: 'You are not authorized to call this API',
		};
		return new Response(JSON.stringify(send), { status: 401 });
	}

	const requestUrl = new URL(request.url);
	const product = requestUrl.searchParams.get('product');

	if (!product) {
		const send = {
			id: null,
			error: 'Product price was not passed',
		};
		return new Response(JSON.stringify(send));
	}

	const { data: purchase_exist_data, error: purchase_exist_error } =
		await supabase
			.from('purchase')
			.select('id')
			.eq('user', session.user.id)
			.eq('product', product);

	if (purchase_exist_error) {
		const send = {
			id: null,
			error: 'Something went wrong while querying data about existing purchase',
		};
		return new Response(JSON.stringify(send));
	} else if (purchase_exist_data.length > 0) {
		console.log(purchase_exist_data.length);
		const send = {
			id: null,
			error: 'You already bought this product',
		};
		return new Response(JSON.stringify(send));
	}

	const { data: product_stripe_data, error: product_stripe_error } =
		await supabase
			.from('product')
			.select('stripe_price, id')
			.eq('id', product)
			.single();

	if (!product_stripe_data.stripe_price || product_stripe_error) {
		const send = {
			id: null,
			error: 'Something went wrong with the product',
		};
		return new Response(JSON.stringify(send));
	}

	const { data: profile, error: profile_error } = await supabase
		.from('profile')
		.select('stripe_customer_id')
		.eq('id', session.user.id)
		.single();

	if (!profile.stripe_customer_id || profile_error) {
		const send = {
			id: null,
			error: 'You do not have Stripe Customer linked to your profile',
		};
		return new Response(JSON.stringify(send));
	}

	try {
		const { id } = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: [
				{
					price: product_stripe_data.stripe_price,
					quantity: 1,
				},
			],
			mode: 'payment',
			success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/products/payment-success`,
			cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/products/payment-failed`,
			customer: profile.stripe_customer_id,
			metadata: {
				user_id: session.user.id,
				product_id: product_stripe_data.id
			},
		});
		if (id) {
			const send = {
				id,
				error: null,
			};
			return new Response(JSON.stringify(send));
		} else {
			const send = {
				id: null,
				error: 'Something went wrong while creating a checkout session',
			};
			return new Response(JSON.stringify(send));
		}
	} catch (error) {
		const send = {
			id: null,
			error: error.message,
		};
		return new Response(JSON.stringify(send));
	}
}
