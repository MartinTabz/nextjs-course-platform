import bg from '@public/herobg.webp';
import thumb from '@public/videothumb.webp';
import styles from '@styles/lol-guide/herosection.module.css';
import Image from 'next/image';

export default function HeroSection() {
	return (
		<section className={styles.section}>
			<div className={styles.section_area}>
				<h1>The Complete Guide to League of Legends</h1>
				<p>
					Embark on a journey of skill development and game mastery with our
					League of Legends course that will make you the ultimate pro
				</p>
				<div className={styles.video_section}>
					<div className={styles.video_upper}>
						Watch The Video - Find out everything you need to know!
					</div>
					<Image
						className={styles.video}
						src={thumb}
						alt="The Complete Guide to League of Legends"
					/>
				</div>
			</div>
			<Image
				className={styles.background}
				src={bg}
				alt="The Complete Guide to League of Legends"
			/>
		</section>
	);
}
