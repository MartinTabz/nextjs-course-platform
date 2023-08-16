'use client';

import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import Image from 'next/image';

export default function Product({ product }) {
	const handlePurchase = async (productId) => {
		try {
			const { data } = await axios.get('/api/stripe/create-checkout-session', {
				params: {
					product: productId,
				},
			});
			if (data?.error) {
				console.log(data.error);
				return;
			} else if (!data?.id) {
				console.log('Something went wrong.');
				return;
			}

			if (data?.id) {
				const stripe = await loadStripe(
					process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
				);
				await stripe.redirectToCheckout({
					sessionId: data.id,
				});
			} else {
				console.log('Something went wrong.');
				return;
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			{product.banner_url && (
				<Image src={product.banner_url} width={160} height={90} />
			)}
			<h3>{product.name}</h3>
			<p>{product.description}</p>
			<b>
				{(product.price / 100).toLocaleString('en-US', {
					style: 'currency',
					currency: 'USD',
				})}
			</b>
			<button onClick={() => handlePurchase(product.id)}>Buy Now</button>
		</div>
	);
}
