import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTodo, deleteTodo, updateTodo } from "@/apis/todo";

import { todoQuery } from "./queries";

export function useCreateTodo() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createTodo,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: todoQuery.list().queryKey,
			});
		},
	});
}

export function useUpdateTodo() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateTodo,
		onSuccess: (todo) => {
			queryClient.invalidateQueries({
				queryKey: todoQuery.detail(todo.id).queryKey,
			});
		},
	});
}

export function useDeleteTodo() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteTodo,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: todoQuery.list().queryKey,
				exact: true,
			});
		},
	});
}
