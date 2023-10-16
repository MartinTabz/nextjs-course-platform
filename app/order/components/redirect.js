'use client';

import { useRouter } from 'next/navigation';

export default function RedirectToCheckout({ url }) {
	const router = useRouter();
	router.push(url);
	return <h1>Redirecting to checkout...</h1>;
}
