import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';
import RedirectToCheckout from './components/redirect';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function OrderPage({ searchParams }) {
	if (!searchParams.p) {
		console.log('searchParams.p ', searchParams.p);
		redirect('/preorder/failed');
	}

	const supabase = createServerComponentClient({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session.user.id) {
		redirect('/signin');
	}

	const { data: already, error: already_error } = await supabase
		.from('purchase')
		.select('id')
		.eq('user', session.user.id)
		.eq('product', searchParams.p);

	if (already_error) {
		redirect('/preorder/failed');
	} else if (already.length > 0) {
		redirect('/dashboard');
	} else {
		const { data: product_stripe_data, error: product_stripe_error } =
			await supabase
				.from('product')
				.select('stripe_price, id')
				.eq('id', searchParams.p)
				.single();

		if (!product_stripe_data.stripe_price || product_stripe_error) {
			redirect('/preorder/failed');
		}

      await new Promise(resolve => setTimeout(resolve, 3000));

		const { data: profile, error: profile_error } = await supabase
			.from('profile')
			.select('stripe_customer_id')
			.eq('id', session.user.id)
			.single();

		if (!profile.stripe_customer_id || profile_error) {
			redirect('/preorder/failed');
		}

		try {
			const { url } = await stripe.checkout.sessions.create({
				payment_method_types: ['card'],
				line_items: [
					{
						price: product_stripe_data.stripe_price,
						quantity: 1,
					},
				],
				mode: 'payment',
				success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/order/succeeded`,
				cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/order/failed`,
				customer: profile.stripe_customer_id,
				metadata: {
					user_id: session.user.id,
					product_id: product_stripe_data.id,
				},
			});
			if (url) {
				return <RedirectToCheckout url={url} />
			} else {
				redirect('/preorder/failed');
			}
		} catch (error) {
			console.log('error: ', error);
			redirect('/preorder/failed');
		}
	}
}
