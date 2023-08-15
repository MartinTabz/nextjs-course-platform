'use client';

import Image from 'next/image';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import axios from 'axios';

export default function Product({ product }) {
   const supabase = createClientComponentClient();

   const handlePurchase = async () => {}

	return (
		<div>
			{product.banner_url && (
				<Image src={product.banner_url} width={160} height={90} />
			)}
			<h3>{product.name}</h3>
			<p>{product.description}</p>
			<button onClick={handlePurchase}>Buy Now</button>
		</div>
	);
}
