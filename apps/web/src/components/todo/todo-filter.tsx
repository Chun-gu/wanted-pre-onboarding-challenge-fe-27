// import { useSearchParams } from "react-router-dom";

import { useSearchParams } from "@/lib/search-params-store";
import { getTodoListOptionSchema } from "@/types/todo";

import type { ChangeEvent } from "react";

export const TodoFilter = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	console.log("filter comp", searchParams.toString());

	function handleChangeFilters(e: ChangeEvent<HTMLFormElement>) {
		const formData = new FormData(e.currentTarget);
		const options = Object.fromEntries(formData);

		const { success, data, error } = getTodoListOptionSchema.safeParse(options);

		if (success) {
			console.log({ data });
			setSearchParams(data);
		} else {
			console.log(error);
		}
	}

	return (
		<form onChange={handleChangeFilters} onReset={handleChangeFilters}>
			<fieldset>
				<legend>정렬</legend>
				<div className="flex gap-4">
					<div>
						<label htmlFor="sort" className="mr-1">
							기준
						</label>
						<select name="sort" id="sort">
							<option value="createdAt" defaultChecked>
								생성 시간
							</option>
							<option value="updatedAt">수정 시간</option>
							<option value="priority">우선 순위</option>
						</select>
					</div>
					<div>
						<label htmlFor="order" className="mr-1">
							순서
						</label>
						<select name="order" id="order">
							<option value="asc">오름차순</option>
							<option value="desc" defaultChecked>
								내림차순
							</option>
						</select>
					</div>
				</div>
			</fieldset>

			{/* <input type="checkbox" name="priority" id="urgent" value='urgent' />
					<label htmlFor="urgent">긴급</label>
					<input type="checkbox" name="priority" id="normal" value='normal' />
					<label htmlFor="normal">일반</label>
					<input type="checkbox" name="priority" id="low" value='low' />
					<label htmlFor="low">낮음</label> */}

			<fieldset>
				<legend>우선순위</legend>
				<div className="flex gap-2">
					<div>
						<input
							type="radio"
							name="priority"
							id="opt-urgent"
							value="urgent"
						/>
						<label htmlFor="opt-urgent">긴급</label>
					</div>
					<div>
						<input
							type="radio"
							name="priority"
							id="opt-normal"
							value="normal"
						/>
						<label htmlFor="opt-normal">일반</label>
					</div>
					<div>
						<input type="radio" name="priority" id="opt-low1" value="low" />
						<label htmlFor="opt-low1">낮음</label>
					</div>
					<div>
						<input type="radio" name="priority" id="opt-low1" value="low" />
						<label htmlFor="opt-low1">낮음</label>
					</div>
				</div>
			</fieldset>

			<button type="reset">초기화</button>
		</form>
	);
};
