import Bother from '@components/lol-course/bother';
import Coach from '@components/lol-course/coach';
import Contents from '@components/lol-course/contents';
import Faq from '@components/lol-course/faq';
import Features from '@components/lol-course/features';
import Footer from '@components/lol-course/footer';
import Hero from '@components/lol-course/hero';
import How from '@components/lol-course/how';
import Join from '@components/lol-course/join';
import Why from '@components/lol-course/why';

export default function Page() {
	return (
		<>
			<main style={{ backgroundColor: 'var(--clr-white)'}}>
				<Hero />
				<Why />
				<How />
				<Coach />
				<Features />
				<Contents />
				<Bother />
				<Join />
				<Faq />
			</main>
			<Footer />
		</>
	);
}
