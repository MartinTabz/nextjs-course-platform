import blob from '@public/lol-course/blob.png';
import coach from '@public/lol-course/dandan.png';
import line from '@public/lol-course/underline-short.png';
import style from '@styles/lol-course/coach.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { FaTrophy } from 'react-icons/fa6';

export default function Coach() {
	return (
		<section className={style.section}>
			<div className={style.area}>
				<div className={style.heading}>
					<h2>Course coach</h2>
					<Image src={line} alt="" />
				</div>
				<div className={style.coach}>
					<Image className={style.image} src={coach} alt="" />
					<h3>
						Danny <span>Dan Dan</span> Le Comt
					</h3>
					<p>
						Pro player for 6 years in Europe. Coached professional teams for 2
						years. I've gathered perspectives from both regions and both as a
						player and as a coach, something which a lot of people will not take
						into proper account as they're so called macro geniuses when they
						don't know what it takes to truly become the best at both. Played
						for famous teams such as Origen, Misfits, LDLC and coached 100
						Thieves for two years.{' '}
					</p>
					<a
						className={style.achieve}
                  target='_blank'
						href="https://lol.fandom.com/wiki/Dan_Dan"
					>
						<FaTrophy />
						Click to see my achievements
					</a>
					<Link className={style.cta} href={'#join'}>
						Learn From DanDan
					</Link>
					<Image className={style.blob} src={blob} alt="" />
				</div>
			</div>
		</section>
	);
}
