// import { useSearchParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

import { todoQuery } from "@/features/todo/queries";
import { useSearchParams } from "@/lib/search-params-store";
import { wrap } from "@/lib/wrap";
import { getTodoListOptionSchema } from "@/types/todo";

import { TodoListEmpty } from "../todo-list-empty";
import { TodoListItem } from "../todo-list-item";

const TodoList_ = () => {
	const [searchParams] = useSearchParams();
	console.log("list comp", searchParams.toString());
	const {
		success,
		data: filters,
		error,
	} = getTodoListOptionSchema.safeParse(
		Object.fromEntries(searchParams.entries()),
	);

	if (success === false) {
		console.log(error);
	}

	const { data: todos } = useSuspenseQuery(todoQuery.list(filters));

	if (todos.length === 0) return <TodoListEmpty />;

	return (
		<>
			<ul className="flex-col gap-2">
				{todos.map((todo) => (
					<li key={todo.id}>
						<TodoListItem todo={todo} />
					</li>
				))}
			</ul>
		</>
	);
};

const ErrorFallback = () => {
	return <div>Error</div>;
};

export const TodoList = wrap
	.onError({ fallback: <ErrorFallback /> })
	.onSuspense({ fallback: <div>Loading...</div> })
	.on(() => <TodoList_ />);
