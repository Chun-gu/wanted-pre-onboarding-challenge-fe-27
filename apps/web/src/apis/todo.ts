import { url } from "@/core/route";
import { todoSchema } from "@/types/todo";

import { httpWithAuth } from "./http";

import type {
	CreateTodoRequest,
	DeleteTodoPayload,
	GetTodoDetailRequest,
	GetTodoListOption,
	Todo,
	UpdateTodoRequest,
} from "@/types/todo";

type Res<T> = { data: T };

// class TodoDTO{
// 	constructor(
// 		public readonly id:string,
// 		public readonly title:string,
// 		public readonly content:string,
// 		public readonly createdAt:string,
// 		public readonly updatedAt:string,
// 	){
// 		// this.createdAt = new Date(createdAt)
// 		// this.updatedAt = new Date(updatedAt)
// 	}
// }

function TodoDTO(value: unknown): Todo {
	// const { isValid, data: todo, error } = validate(value, todoSchema);
	const todo = todoSchema.parse(value);

	return {
		id: todo.id,
		title: todo.title,
		content: todo?.content,
		priority: todo.priority,
		createdAt: todo.createdAt,
		updatedAt: todo.updatedAt,
	};
}

// MARK: Create Todo
export async function createTodo(payload: CreateTodoRequest): Promise<Todo> {
	const { data } = await httpWithAuth
		.post<Res<Todo>>(url.api.todos.all(), { json: payload })
		.json();

	return TodoDTO(data);
}

// MARK: Get Todo List
export async function getTodoList(
	options?: GetTodoListOption,
): Promise<Array<Todo>> {
	const queryString = options ? new URLSearchParams(options).toString() : "";

	const { data } = await httpWithAuth
		.get<Res<Array<Todo>>>(url.api.todos.all() + "?" + queryString)
		.json();

	return data.map(TodoDTO);
}

// MARK: Get One Todo
export async function getTodoDetail({
	id,
}: GetTodoDetailRequest): Promise<Todo> {
	const { data: todo } = await httpWithAuth
		.get<Res<Todo>>(url.api.todos.id(id))
		.json();

	return TodoDTO(todo);
}

// MARK: Update Todo
export async function updateTodo({
	id,
	...payload
}: UpdateTodoRequest): Promise<Todo> {
	const { data } = await httpWithAuth
		.put<Res<Todo>>(url.api.todos.id(id), { json: payload })
		.json();

	return TodoDTO(data);
}

// MARK: Delete Todo
export async function deleteTodo({ id }: DeleteTodoPayload): Promise<void> {
	await httpWithAuth.delete(url.api.todos.id(id));
}
