// import { useDeleteTodo, useUpdateTodo } from "@/features/todo/mutations";
import { useNavigate, useParams } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

import { todoQuery } from "@/features/todo/queries";
import { useTodo } from "@/features/todo/use-todo";

export const TodoDetailPage = () => {
	const { id } = useParams() as { id: string };
	const { data: todo } = useSuspenseQuery(todoQuery.detail(id!));
	const navigate = useNavigate();
	console.log({ todo });

	// const { mutate: deleteTodo } = useDeleteTodo();
	// const { mutate: updateTodo } = useUpdateTodo();
	const { mutate: updateTodo } = useTodo().update;
	const { mutate: deleteTodo } = useTodo().remove;

	function handleClickUpdate() {
		// updateTodo()
	}

	function handleClickDelete() {
		deleteTodo(
			{ id },
			{
				onSuccess: () => {
					navigate("/todos", { replace: true });
				},
			},
		);
	}

	return (
		<>
			<h1>{todo.title}</h1>
			<p>{todo.content}</p>
			<div>
				<span>{todo.createdAt.toLocaleDateString()}</span>
			</div>
			<div>
				<button onClick={handleClickUpdate}>수정</button>
				<button onClick={handleClickDelete}>삭제</button>
			</div>
		</>
	);
};
