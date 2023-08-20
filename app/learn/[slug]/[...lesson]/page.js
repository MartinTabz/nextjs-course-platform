import VideoPlayer from '@app/learn/[slug]/[...lesson]/components/video-player';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import MUX from '@mux/mux-node';

export default async function Page({ params }) {
	const supabase = createServerComponentClient({ cookies });

	const {
		data: { session },
	} = await supabase.auth.getSession();

	if (!session) {
		redirect('/signin');
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

	if (!/^(\d+)\.(\d+)$/.exec(params.lesson[0])) {
		console.log('The pattern does not match');
		notFound();
	}

	const [chapterStr, lessonStr] = params.lesson[0]
		.split('.')
		.map((str) => parseInt(str, 10));

	const chapter = parseInt(chapterStr);
	const lesson = parseInt(lessonStr);

	if (isNaN(chapter) || isNaN(lesson)) {
		notFound();
	}

	const { data, error } = await supabase
		.from('lesson')
		.select(`*, chapter(course_order, product(slug))`)
		.eq('chapter.product.slug', params.slug)
		.eq('chapter.course_order', chapterStr)
		.eq('chapter_order', lessonStr)
		.eq('slug', params.lesson[1])
		.single();

	if (error || !data) {
		notFound();
	}

	var videourl = null;

	if (data.playback_id) {
		const token = MUX.JWT.signPlaybackId(data.playback_id, {
			keyId: process.env.MUX_SECRET_SIGNING_KEY_ID,
			keySecret: process.env.MUX_SECRET_BASE,
			expiration: '7d',
			type: 'video',
		});
		videourl = `https://stream.mux.com/${data.playback_id}.m3u8?token=${token}`;
	}

	const videoData = {
		videoUrl: videourl,
		lekceId: data.id,
	};

	return (
		<>
			<h1>{data.name}</h1>
			<span>{data.description}</span>
			{videourl && <VideoPlayer passedData={videoData} />}
			<div dangerouslySetInnerHTML={{ __html: data.content }} />
		</>
	);
}
