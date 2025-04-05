import { classNames } from "../../utils/classNames";

function Button({
  children,
  variant = "default",
  size = "default",
  className = "",
  rounded = false,
  icon = false,
  ...props
}) {
  const variantClasses = {
    default: "bg-gray-200 hover:bg-gray-300",
    primary: "btn-primary",
    outline: "btn-outline",
    ghost: "hover:bg-gray-100",
  };

  const sizeClasses = {
    default: "py-2 px-4",
    sm: "py-1 px-3 text-sm",
    lg: "py-2.5 px-5 text-lg",
  };

  return (
    <button
      className={classNames(
        "btn",
        variantClasses[variant] || variantClasses.default,
        sizeClasses[size] || sizeClasses.default,
        rounded ? "btn-rounded" : "",
        icon ? "btn-icon" : "",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
