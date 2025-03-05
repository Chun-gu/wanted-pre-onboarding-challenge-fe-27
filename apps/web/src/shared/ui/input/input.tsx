import { classNames } from "@/lib/class-names";

import type { HTMLAttributes } from "react";

import style from "./input.module.css";

type InputProps = HTMLAttributes<HTMLInputElement>;

export const Input = ({ className, ...props }: InputProps) => {
	return <input className={classNames(style["input"], className)} {...props} />;
};
