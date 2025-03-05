import { Header } from "./header";

import type { ReactNode } from "react";

export const RootLayout = ({ children }: { children: ReactNode }) => {
	console.log("RootLayout");
	return (
		<>
			<Header />
			<main>{children}</main>
			<footer>Footer</footer>
		</>
	);
};
