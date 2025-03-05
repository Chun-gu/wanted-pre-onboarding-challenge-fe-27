import { z } from "zod";

export interface Todo {
	id: string;
	title: string;
	content?: string;
	priority: Priority;
	createdAt: Date;
	updatedAt: Date;
}

enum Priority {
	Urgent = "urgent",
	Normal = "normal",
	Low = "low",
}

enum Sort {
	CreatedAt = "createdAt",
	UpdatedAt = "updatedAt",
	Priority = "priority",
}

enum Order {
	Asc = "asc",
	Desc = "desc",
}

const ERR_MSG = {
	title: {
		required: "제목을 입력해 주세요.",
	},
	priority: {
		required: "우선순위를 선택해 주세요.",
	},
};

export const todoSchema = z.object({
	id: z.string(),
	title: z.string().min(1, { message: ERR_MSG.title.required }),
	content: z.string().optional(),
	priority: z.nativeEnum(Priority, {
		message: ERR_MSG.priority.required,
	}),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
}) satisfies z.ZodType<Todo>;

export const createTodoSchema = z.object({
	// id: z.string(),
	title: z.string().min(1, { message: ERR_MSG.title.required }),
	content: z.string().optional(),
	priority: z.nativeEnum(Priority, {
		message: ERR_MSG.priority.required,
	}),
	// createdAt: z.coerce.date(),
	// updatedAt: z.coerce.date(),
});

export const updateTodoSchema = createTodoSchema;

export const getTodoListOptionSchema = z.object({
	sort: z.nativeEnum(Sort).catch(Sort.CreatedAt),
	order: z.nativeEnum(Order).catch(Order.Desc),
	priority: z.nativeEnum(Priority).optional(),
	keyword: z.string().optional(),
	countOnly: z.boolean().optional(),
	// .transform((val) => (val ? String(val) : undefined)),
});

export type GetTodoDetailRequest = Pick<Todo, "id">;
export type CreateTodoRequest = Pick<Todo, "title" | "content" | "priority">;
export type UpdateTodoRequest = Pick<
	Todo,
	"id" | "title" | "content" | "priority"
>;
export type DeleteTodoPayload = Pick<Todo, "id">;
export type GetTodoListOption = z.infer<typeof getTodoListOptionSchema>;
export type CreateTodoSchema = z.infer<typeof createTodoSchema>;
export type UpdateTodoSchema = z.infer<typeof updateTodoSchema>;
// export type DeleteTodoRequest = z.infer<typeof deleteTodoSchema>;
