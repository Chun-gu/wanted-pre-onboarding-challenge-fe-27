import type { Todo } from "@/core/models/todo";

type CreateTodoParams = Pick<Todo, "title" | "content">;
type GetTodoListParams = object;
type GetTodoDetailParams = { id: Todo["id"] };
type UpdateTodoParams = { id: Todo["id"] };
type DeleteTodoParams = { id: Todo["id"] };

export interface TodoRepository {
	createTodo: (payload: CreateTodoParams) => Promise<Todo>;
	getAllTodo: (payload: GetTodoListParams) => Promise<Array<Todo>>;
	getOneTodo: (payload: GetTodoDetailParams) => Promise<Todo>;
	updateTodo: (payload: UpdateTodoParams) => Promise<Todo>;
	deleteTodo: (payload: DeleteTodoParams) => Promise<void>;
}
