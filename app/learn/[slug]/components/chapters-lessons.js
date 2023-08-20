'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ChaptersLessons({ product }) {
	const supabase = createClientComponentClient();

	const [chapters, setChapters] = useState(product.chapter);
	const [progress, setProgress] = useState(null);

	const [dropdownStates, setDropdownStates] = useState({});

	const toggleDropdown = (chapterId) => {
		setDropdownStates((prevState) => ({
			...prevState,
			[chapterId]: !prevState[chapterId],
		}));
	};

	useEffect(() => {
		const fetchProgress = async () => {
			const {
				data: { session },
			} = await supabase.auth.getSession();

			const { data: progress } = await supabase
				.from('progress')
				.select('*')
				.eq('user', session.user.id);
         console.log(progress);
			setProgress(progress);
		};

		fetchProgress();
	}, [supabase]);

	return (
		<>
         <div>
            <h1>{product.name}</h1>
         </div>
			{chapters.map((chapter) => (
				<div key={chapter.id}>
					<div onClick={() => toggleDropdown(chapter.id)}>
						<span>{chapter.order}</span>
						<h2>{chapter.name}</h2>
					</div>
					{dropdownStates[chapter.id] && (
						<div>
							{chapter.lesson
								.sort((a, b) => a.chapter_order - b.chapter_order)
								.map((l) => {
									const isViewed = progress.some(
										(item) => item.lesson === l.id && item.viewed
									);

									return (
										<Link
											href={`/learn/${product.slug}/${chapter.order}.${l.chapter_order}/${l.slug}`}
											key={l.id}
										>
											<span>{`${chapter.order}.${l.chapter_order}`}</span>
											{l.banner_url ? (
												<Image
													src={l.banner_url}
													width={96}
													height={54}
													alt={l.nazev}
												/>
											) : (
												<div>?</div>
											)}
											<div>
												<h3>{l.name}</h3>
												<p>{l.description}</p>
											</div>
											{isViewed && <p>viewed</p>}
										</Link>
									);
								})}
						</div>
					)}
				</div>
			))}
		</>
	);
}
