'use client';

import { loadStripe } from '@stripe/stripe-js';
import style from '@styles/lol-course/join.module.css';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { FaCheck, FaUnlock } from 'react-icons/fa6';

export default function Join() {
	const supabase = createClientComponentClient();
	const router = useRouter();
	const pathname = usePathname();

	const handlePurchase = async () => {
		const {
			data: { session },
		} = await supabase.auth.getSession();

		const slug = pathname.split('/')[pathname.split('/').length - 1];

		const { data: product, error: product_error } = await supabase
			.from('product')
			.select('id, preorder')
			.eq('landingpage_slug', slug)
			.single();

		if (product_error || !product) {
			console.log('Error: ', product_error, product);
			return;
		}

		if (session) {
			if (product.preorder) {
				router.push(`/preorder?p=${product.id}`);
			} else {
				try {
					const { data } = await axios.get(
						'/api/stripe/create-checkout-session',
						{
							params: {
								product: product.id,
							},
						}
					);
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
			}
		} else if (!session) {
			if (product.preorder) {
				await supabase.auth.signInWithOAuth({
					provider: 'discord',
					options: {
						redirectTo: `${process.env.NEXT_PUBLIC_DOMAIN}/auth/preordercallback?p=${product.id}`,
					},
				});
			} else {
				await supabase.auth.signInWithOAuth({
					provider: 'discord',
					options: {
						redirectTo: `${process.env.NEXT_PUBLIC_DOMAIN}/auth/ordercallback?p=${product.id}`,
					},
				});
			}
		}
	};

	return (
		<div className={style.container}>
			<svg
				width="1440"
				height="113"
				className={style.border}
				viewBox="0 0 1440 113"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M0 0L720 73L1440 0V73H0V0Z"
					fill="var(--clr-dark)"
					fillOpacity="0.4"
				/>
				<path d="M0 27L720 73L1440 27V112.5H0V27Z" fill="var(--clr-dark)" />
			</svg>

			<section id="join" className={style.section}>
				<div className={style.area}>
					<div className={style.top}>
						<h2>Get unlimited access</h2>
						<span>Be trained like a professional</span>
					</div>

					<span className={style.price}>24.99</span>

					<div className={style.items}>
						<div className={style.item}>
							<FaCheck />
							Tips and tricks you haven&apos;t heard of
						</div>
						<div className={style.item}>
							<FaCheck />
							Practical exercises for improvement
						</div>
						<div className={style.item}>
							<FaCheck />
							Custom-made learning app
						</div>
						<div className={style.item}>
							<FaCheck />
							Access to professional coach
						</div>
						<div className={style.item}>
							<FaCheck />
							Master your role
						</div>
						<div className={style.item}>
							<FaUnlock />
							$24.99 once forever
						</div>
					</div>

					<div className={style.cta}>
						<button onClick={handlePurchase}>Improve</button>
						<span>Lock in your price before it increases</span>
					</div>
				</div>
				<div className={style.or}>
					<span>Or do nothing</span>
					<p>and be stuck in low rank forever</p>
				</div>
			</section>
		</div>
	);
}
