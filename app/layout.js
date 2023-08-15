import '@styles/globals.css';

export const metadata = {
	title: 'LOL Course',
	description:
		'Building a League Of Legends course to get people to play better',
};

export const dynamic = 'force-dynamic';

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
