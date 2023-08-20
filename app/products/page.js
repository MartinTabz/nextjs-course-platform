import Product from '@app/products/components/product';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ProductsPage() {
	const supabase = createServerComponentClient({ cookies });
	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session?.user?.id) {
		redirect('/signin');
	}

	const { data: products, error } = await supabase
		.from('product')
		.select('*')
		.eq('visible', true);

	if (error) {
		throw new Error(error.message);
	}

	return (
		<section>
			<h1>Our products</h1>
			<div>
				{products.length > 0 ? (
					products.map((p) => <Product key={p.id} product={p} />)
				) : (
					<span>No products yet</span>
				)}
			</div>
		</section>
	);
}
