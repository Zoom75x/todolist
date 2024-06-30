import clsx from "clsx";
import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import css from "./BaseButton.module.css"

type Variant = "primary" | "secondary" | "outline" | "danger"

interface PropsType extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    variant?: Variant
}

export const BaseButton = ({variant = "primary", children, className, ...props}: PropsType) => {
    return (
        <button
            {...props}
            className={
                clsx(
                    css.button,
                    className,
                    css[variant])}
        >{children}
        </button>)
}