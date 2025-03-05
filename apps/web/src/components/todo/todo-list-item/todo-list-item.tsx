import { Link } from "react-router-dom";

import type { Todo } from "@/types/todo";

import style from "./todo-list-item.module.css";

type TodoListItem = { todo: Todo };

export const TodoListItem = ({ todo }: TodoListItem) => {
	return (
		<Link to={todo.id} className={style["todo-list-item"]}>
			<strong className={style["todo-title"]}>{todo.title}</strong>
			<span>{todo.createdAt.toLocaleString()}</span>
		</Link>
	);
};
