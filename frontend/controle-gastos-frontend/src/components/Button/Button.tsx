import type { ButtonHTMLAttributes } from "react";
import "./Button.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "danger";
};

function Button({
    variant = "primary",
    className = "",
    children,
    ...props
}: ButtonProps) {

    return (

        <button
            className={`button ${variant} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;