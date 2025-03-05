import { useAuthService } from "@/hooks/use-auth-service";

export const SignOutButton = () => {
	const { signOut } = useAuthService();

	async function handleClickSignOut() {
		await signOut();
	}

	return (
		<button type="button" onClick={handleClickSignOut}>
			로그아웃
		</button>
	);
};
