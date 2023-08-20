import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import ChaptersLessons from '@app/learn/[slug]/components/chapters-lessons';

export default async function Page({ params }) {
	console.log(params);

	const supabase = createServerComponentClient({ cookies });

	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
      console.log('Session not found');
		notFound();
	}

	const { data: product_exists_data, error: product_exists_error } =
		await supabase
			.from('product')
			.select('id, visible')
			.eq('slug', params.slug)
			.single();

	if (
		product_exists_error ||
		!product_exists_data ||
		!product_exists_data?.id ||
		!product_exists_data?.visible
	) {
      console.log('Product does not exist');
		notFound();
	}

	const { data: user_has_product_data, error: user_has_product_error } =
		await supabase
			.from('purchase')
			.select('id')
			.eq('product', product_exists_data.id)
			.eq('user', session.user.id)
			.single();

	if (user_has_product_error) {
		notFound();
	}

	if (!user_has_product_data?.id) {
		redirect('/products');
	}

	const { data: product, error } = await supabase
		.from('product')
		.select(`*, chapter(*, lesson(*))`)
		.eq('slug', params.slug)
		.single();

	if (error) {
		throw new Error(error.message);
	} else if (!product) {
		throw new Error('Failed to query the course');
	}

	return (
		<>
			<ChaptersLessons product={product} />
		</>
	);
}
