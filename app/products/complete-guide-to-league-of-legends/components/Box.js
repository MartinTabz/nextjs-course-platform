'use client';

import bg from '@public/boxbg.webp';
import icon1 from '@public/lolicon1.webp';
import icon2 from '@public/lolicon2.webp';
import icon3 from '@public/lolicon3.webp';
import tag from '@public/saletag.webp';
import styles from '@styles/lol-guide/box.module.css';
import Image from 'next/image';
import { HiShoppingCart } from 'react-icons/hi';

export default function Box() {
	return (
		<section className={styles.section}>
			<div className={styles.section_area}>
				<div className={styles.inner_box}>
					<div className={styles.text}>
						<h2>Complete Guide</h2>
						<p>
							Discover your full potential in League of Legends under the
							guidance of a former professional coach and climb higher than ever
							before!
						</p>
						<button className={styles.btn}>
							<HiShoppingCart />
							<div className={styles.btn_text}>
								<h4>Yes! I want to improve</h4>
								<h5>
									for only
									<span className={styles.oldprice}>
										40$<div className={styles.outline}></div>
									</span>
									<span className={styles.newprice}>25$</span>
								</h5>
							</div>
						</button>
					</div>
					<Image className={styles.inside_icon} src={icon3} alt="" />
					<Image className={styles.tag} src={tag} alt="" />
				</div>
				<Image className={styles.iconone} src={icon1} alt="" />
				<Image className={styles.icontwo} src={icon2} alt="" />
			</div>
		</section>
	);
}
