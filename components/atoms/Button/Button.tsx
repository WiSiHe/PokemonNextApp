import { cn } from "utils/utility"

interface Button {
    children: React.ReactNode
    isDisabled?: boolean
    isOutlined?: boolean
    color?: "primary" | "secondary" | "tertiary" | "dark" | "light" | "default"
    size?: "small" | "medium" | "large"
}

const Button = ({
    children,
    color = "default",
    size = "medium",
    isDisabled,
    isOutlined,
}: Button) => {
    const buttonStyle = {
        primary: "bg-primary text-white",
        secondary: "bg-secondary text-white",
        tertiary: "bg-tertiary text-white",
        dark: "bg-dark text-white",
        light: "bg-light text-black",
        default: "bg-primary text-white",
    }[color]

    const buttonSize = {
        small: "py-1 px-2 text-sm",
        medium: "py-2 px-4 text-base",
        large: "py-3 px-6 text-lg",
    }[size]

    const isDisabledStyle = {
        primary: "bg-primary text-white opacity-50 cursor-not-allowed",
        secondary: "bg-secondary text-white opacity-50 cursor-not-allowed",
        tertiary: "bg-tertiary text-white opacity-50 cursor-not-allowed",
        dark: "bg-dark text-white opacity-50 cursor-not-allowed",
        light: "bg-light text-black opacity-50 cursor-not-allowed",
        default: "bg-primary text-white opacity-50 cursor-not-allowed",
    }[color]

    const outlineStyle = {
        primary: "bg-transparent border-primary text-primary",
        secondary: "bg-transparent border-secondary text-secondary",
        tertiary: "bg-transparent border-tertiary text-tertiary",
        dark: "bg-transparent border-dark text-dark",
        light: "bg-transparent border-light text-light",
        default: "bg-transparent border-primary text-primary",
    }[color]

    return (
        <button
            className={cn(
                buttonStyle,
                buttonSize,
                outlineStyle,
                isOutlined && "border-2",
                isDisabled && isDisabledStyle,
            )}
            disabled={isDisabled}
        >
            {children}
        </button>
    )
}

export default Button
