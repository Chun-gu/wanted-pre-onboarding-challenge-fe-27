import {
	queryOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";

import {
	createTodo,
	deleteTodo,
	getTodoDetail,
	getTodoList,
	updateTodo,
} from "@/apis/todo";

import type { Todo } from "@/types/todo";

export function useTodo() {
	const queryClient = useQueryClient();

	const todoQuery = {
		// key: {
		// 	base: () => ["todos"] as const,
		// 	list: () => [...todoQuery.key.base()] as const,
		// 	detail: (id: Todo["id"]) => [...todoQuery.key.list(), id] as const,
		// },
		all: () => ["todos"] as const,
		list: () =>
			queryOptions({
				queryKey: [...todoQuery.all(), "list"] as const,
				queryFn: getTodoList,
			}),
		detail: (id: Todo["id"]) =>
			queryOptions({
				queryKey: [...todoQuery.list().queryKey, id] as const,
				queryFn: () => getTodoDetail({ id }),
			}),
	};

	const create = useMutation({
		mutationFn: createTodo,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: todoQuery.list().queryKey,
			});
		},
	});

	const update = useMutation({
		mutationFn: updateTodo,
		onSuccess: (todo) => {
			queryClient.invalidateQueries({
				queryKey: todoQuery.detail(todo.id).queryKey,
			});
		},
	});

	const _delete = useMutation({
		mutationKey: ["todos"],
		mutationFn: deleteTodo,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: todoQuery.list().queryKey,
				exact: true,
			});
		},
	});

	return { todoQuery, create, update, delete: _delete };
}
