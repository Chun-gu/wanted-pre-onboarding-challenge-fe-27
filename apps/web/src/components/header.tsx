import { useAuthService } from "@/hooks/use-auth-service";

import { SignOutButton } from "./auth/sign-out-button";

export const Header = () => {
	const { token } = useAuthService();
	console.log("Header", { token });

	const isSignedIn = token !== null;

	return (
		<header>
			<h1>To-do List</h1>

			{isSignedIn && <SignOutButton />}
		</header>
	);
};
