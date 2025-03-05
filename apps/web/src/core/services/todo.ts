import type { Todo } from "@/core/models/todo";

interface TodoService {
	createTodo: () => Promise<Todo>;
	getTodoList: () => Promise<Array<Todo>>;
	getTodoDetail: (id: Todo["id"]) => Promise<Todo>;
}
