import Link from "next/link";

export default function IndexPage() {
	return (
		<div>
			<h1>Welcome to the main page!</h1>
			<Link href={"/signin"}>Sign In</Link>
			<br />
			<Link href={"/dashboard"}>Dashboard</Link>
		</div>
	);
}
