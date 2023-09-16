import { BiInfinite } from 'react-icons/bi';
import { FaCrown } from 'react-icons/fa';
import { HiLightBulb } from 'react-icons/hi';
import styles from "@styles/lol-guide/benefits.module.css";

export default function Benefits() {
	return (
		<section className={styles.section}>
			<div className={styles.section_area}>
				<div className={styles.benefit}>
					<BiInfinite />
					<h3>Full lifetime access</h3>
				</div>
				<div className={styles.benefit}>
					<FaCrown />
					<h3>Learn from the best</h3>
				</div>
				<div className={styles.benefit}>
					<HiLightBulb />
					<h3>Practical tips & tricks</h3>
				</div>
			</div>
		</section>
	);
}
