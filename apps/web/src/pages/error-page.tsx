import { Link } from "react-router-dom";

import { url } from "@/core/route";

export const ErrorPage = () => {
	return (
		<>
			<h1>Error</h1>
			<p>오류 발생</p>
			<Link to={url.web.root()}>홈으로 이동</Link>
		</>
	);
};
