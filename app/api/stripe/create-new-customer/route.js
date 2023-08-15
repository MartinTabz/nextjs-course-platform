import { getServiceSupabase } from '@utils/service-supabase';
import initStripe from 'stripe';

export async function POST(req) {
	const { searchParams } = new URL(req.url);
	const key = searchParams.get('API_ROUTE_SECRET');

	if (key !== process.env.API_ROUTE_SECRET) {
		return new Response('You are not allowed to call this API', {
			status: 401,
		});
	}

	const { record } = await req.json();

	const stripe = initStripe(process.env.STRIPE_SECRET_KEY);

	const customer = await stripe.customers.create({
		email: record.email,
      description: record.id
	});

	const supabase = getServiceSupabase();

	await supabase
		.from('profile')
		.update({ stripe_customer_id: customer.id })
		.eq('id', record.id);

	return new Response(`Stripe customer created ${customer.id}`);
}
