import { queryOptions } from "@tanstack/react-query";

import { getTodoDetail, getTodoList } from "@/apis/todo";

import type { GetTodoListOption, Todo } from "@/types/todo";

export const todoQuery = {
	// key: {
	// 	base: () => ["todos"] as const,
	// 	list: () => [...todoQuery.key.base()] as const,
	// 	detail: (id: Todo["id"]) => [...todoQuery.key.list(), id] as const,
	// },
	all: () => ["todos"] as const,
	list: (options?: GetTodoListOption) =>
		queryOptions({
			queryKey: [...todoQuery.all(), "list", options] as const,
			queryFn: () => getTodoList(options),
		}),
	detail: (id: Todo["id"]) =>
		queryOptions({
			queryKey: [...todoQuery.list().queryKey, id] as const,
			queryFn: () => getTodoDetail({ id }),
		}),
};
