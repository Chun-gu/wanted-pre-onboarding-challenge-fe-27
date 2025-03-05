import { deleteTodo } from "@/apis/todo";

import type { Todo } from "@/types/todo";

type TodoDetailProps = { todo: Todo; toggleUpdateMode: () => void };

export const TodoDetail = ({ todo, toggleUpdateMode }: TodoDetailProps) => {
	async function handleClickUpdate() {
		await deleteTodo({ id: todo.id });
	}

	return (
		<div>
			<strong>{todo.title}</strong>
			<p>{todo.content}</p>
			<span>{todo.createdAt.toLocaleString()}</span>

			<button onClick={toggleUpdateMode}>수정</button>
			<button onClick={handleClickUpdate}>삭제</button>
		</div>
	);
};
