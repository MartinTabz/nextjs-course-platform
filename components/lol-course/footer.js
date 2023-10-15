import style from '@styles/lol-course/footer.module.css';
import Link from 'next/link';

export default function Footer() {
	return (
		<footer className={style.footer}>
			<div className={style.area}>
				<div className={style.top}>
					<nav className={style.nav}>
						<Link href={'/signin'}>Sign In</Link>
						<Link href={'/terms-conditions'}>Terms & Conditions</Link>
						<Link href={'/privacy-policy'}>Privacy Policy</Link>
						<a href={'mailto:support@cqrgame.com'}>
							Support: support@cqrgame.com
						</a>
					</nav>

					<Link className={style.btn} href={'/signin'}>
						Sign In
					</Link>
				</div>
				<div className={style.details}>
					<p>
						Everything taught within Conquer The Game is for education purposes
						only. It is up to each student to implement and do the work.
					</p>
					<p>
						Conquer The Game team doesn&apos;t guarantee getting into higher
						ranks.
					</p>
				</div>
			</div>
		</footer>
	);
}
