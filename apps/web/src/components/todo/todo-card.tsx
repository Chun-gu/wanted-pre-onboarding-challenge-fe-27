import { useCallback, useState } from "react";

import { TodoDetail } from "./todo-detail";
import { TodoUpdateForm } from "./todo-update-form";

import type { Todo } from "@/types/todo";

type TodoCardProps = { todo: Todo };

export const TodoCard = ({ todo }: TodoCardProps) => {
	const [isEditorMode, setIsEditorMode] = useState<boolean>(false);

	const toggleUpdateMode = useCallback(() => {
		setIsEditorMode((prev) => !prev);
	}, []);

	return isEditorMode ? (
		<TodoUpdateForm todo={todo} toggleUpdateMode={toggleUpdateMode} />
	) : (
		<TodoDetail todo={todo} toggleUpdateMode={toggleUpdateMode} />
	);
};
