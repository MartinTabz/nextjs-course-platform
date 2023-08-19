import { getServiceSupabase } from '@utils/service-supabase';
import { buffer } from 'node:stream/consumers';
import initStripe from 'stripe';

export async function POST(req) {
	const stripe = initStripe(process.env.STRIPE_SECRET_KEY);
	const signature = req.headers.get('stripe-signature');
	const signingSecret = process.env.STRIPE_WEBHOOK_SECRET;
	const reqBuffer = await buffer(req.body);

	let event;

	try {
		event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret);
	} catch (error) {
		return new Response(`Webhook error: ${error.message}`, { status: 404 });
	}

	const supabase = getServiceSupabase();

	switch (event.type) {
		case 'checkout.session.completed':
			const checkout = event.data.object;
			await supabase
				.from('purchase')
				.insert([
					{
						user: checkout.metadata.user_id,
						product: checkout.metadata.product_id,
					},
				]);
			break;
	}

	return new Response('Vytvořen nový nákup');
}
