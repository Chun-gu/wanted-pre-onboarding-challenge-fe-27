// import { useCreateTodo } from "@/features/todo/mutations";
import { useRef } from "react";

import { useTodo } from "@/features/todo/use-todo";
import { validateFormData } from "@/lib/validate";
import { createTodoSchema } from "@/types/todo";

export const TodoCreateForm = () => {
	// const { mutate: createTodo } = useCreateTodo();
	const { mutate: createTodo, isPending: isCreating } = useTodo().create;
	const formRef = useRef<HTMLFormElement>(null);

	async function handleSubmitNewTodoForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const { isValid, data, error } = validateFormData(
			new FormData(e.currentTarget),
			createTodoSchema,
		);

		if (isValid === false) {
			console.log(error);
			return;
		}

		createTodo(data, {
			onSuccess: () => formRef.current?.reset(),
			onError: (error) => alert(error),
		});
	}

	return (
		<form ref={formRef} onSubmit={handleSubmitNewTodoForm}>
			<label htmlFor="title">제목</label>
			<input type="text" name="title" id="title" />

			<label htmlFor="content">내용</label>
			<textarea name="content" id="content" className="resize-none" />

			<fieldset>
				<legend>우선 순위</legend>
				<div className="flex gap-2">
					<div>
						<input type="radio" name="priority" id="urgent" value="urgent" />
						<label htmlFor="urgent">긴급</label>
					</div>
					<div>
						<input type="radio" name="priority" id="normal" value="normal" />
						<label htmlFor="normal">일반</label>
					</div>
					<div>
						<input type="radio" name="priority" id="low" value="low" />
						<label htmlFor="low">낮음</label>
					</div>
				</div>
			</fieldset>

			<button type="submit" disabled={isCreating}>
				추가
			</button>
		</form>
	);
};
