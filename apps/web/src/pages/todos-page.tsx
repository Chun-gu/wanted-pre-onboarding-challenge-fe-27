// import { Outlet } from "react-router-dom";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { TodoCreateForm } from "@/components/todo/todo-create-form";
import { TodoFilter } from "@/components/todo/todo-filter";
import { TodoList } from "@/components/todo/todo-list";

export const TodosPage = () => {
	return (
		<>
			<h1>할 일 목록</h1>

			<TodoCreateForm />

			<TodoFilter />

			<ErrorBoundary fallback={<div>Error</div>}>
				<Suspense fallback={<div>Loading...</div>}>
					<TodoList />
				</Suspense>
			</ErrorBoundary>
		</>
	);
};
