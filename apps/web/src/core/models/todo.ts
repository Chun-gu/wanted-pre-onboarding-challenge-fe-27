export interface Todo {
	id: string;
	title: string;
	content: string;
	createdAt: Date;
	updatedAt: Date;
}

export type TodoInput = Pick<Todo, "title" | "content">;
