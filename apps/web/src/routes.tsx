import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Layout } from "@/components/layout";
// import { AuthGuard } from "@/components/auth-guard";
import { RootLayout } from "@/components/root-layout";
import { SignInPage } from "@/pages/sign-in-page";
// import { url } from "@/core/route";
// import { ErrorPage } from "@/pages/error-page";
import { SignUpPage } from "@/pages/sign-up-page";
import { TodoDetailPage } from "@/pages/todo-detail-page";
import { TodosPage } from "@/pages/todos-page";

// import type { RouteObject } from "react-router-dom";

// type Route = RouteObject & {
// 	label: string;
// 	parent?: string;
// 	children?: Array<Route>;
// 	needAuth: boolean;
// 	// allowedRoles?: Array<string>;
// 	allowedRoles: Array<(typeof ROLE)[number]>;
// };

// const ROLE = ["visitor", "member"] as const;

// const routes: Array<Route> = [
// 	{
// 		path: url.web.root,
// 		label: "홈",
// 		element: <RootLayout />,
// 		errorElement: <ErrorPage />,
// 		needAuth: false,
// 		allowedRoles: ["visitor"],
// 		// accessibleRoles: ["member", "user"],
// 	},
// 	{
// 		path: url.web.todos.list,
// 		label: "할 일",
// 		parent: url.web.root,
// 		element: <TodosPage />,
// 		needAuth: true,
// 		allowedRoles: ["member"],
// 		// accessibleRoles: ["member"],
// 	},
// 	{
// 		path: url.web.signUp,
// 		label: "회원가입",
// 		parent: url.web.root,
// 		element: <SignUpPage />,
// 		needAuth: false,
// 		allowedRoles: ["visitor"],
// 	},
// 	{
// 		path: url.web.signIn,
// 		label: "로그인",
// 		parent: url.web.root,
// 		element: <SignInPage />,
// 		needAuth: false,
// 		allowedRoles: ["visitor"],
// 	},
// ];

// const routeTree: Array<Route> = routes.reduce((tree, currRoute) => {
// 	if (currRoute.parent === undefined) {
// 		tree.push(currRoute);
// 	} else {
// 		const parentRoute = tree.find((route) => route.path === currRoute.parent);

// 		if (parentRoute === undefined) {
// 			throw new Error(`${currRoute.label}: Invalid Parent Route!`);
// 		}

// 		(parentRoute.children ??= []).push(currRoute);
// 	}

// 	if (currRoute.allowedRoles.includes("visitor")) {
// 		currRoute.element = <AuthGuard>{currRoute.element}</AuthGuard>;
// 	}
// 	if (currRoute.allowedRoles.includes("member")) {
// 		currRoute.element = <AuthGuard>{currRoute.element}</AuthGuard>;
// 	}

// 	return tree;
// }, [] as Array<Route>);
// console.log(routeTree);

const router = createBrowserRouter(
	[
		{
			path: "/",
			element: (
				<RootLayout>
					<Layout />
				</RootLayout>
			),
			children: [
				{
					path: "todos",
					element: <TodosPage />,
					// children: [
					// 	{
					// 		path: ":id",
					// 		element: <TodoDetailPage />,
					// 	},
					// ],
				},
				{
					path: "todos/:id",
					element: (
						<Suspense fallback={<div>Loading...</div>}>
							<TodoDetailPage />
						</Suspense>
					),
				},
				{
					path: "sign-up",
					element: <SignUpPage />,
				},
				{
					path: "sign-in",
					element: <SignInPage />,
				},
			],
		},
	],
	// routeTree,
	// routes.map((route) => ({
	// 	...route,
	// 	element: route.needAuth ? (
	// 		<AuthGuard>{route.element}</AuthGuard>
	// 	) : (
	// 		route.element
	// 	),
	// })),
);

export const Routes = () => {
	return <RouterProvider router={router} />;
};
