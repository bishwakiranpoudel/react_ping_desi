import React from "react";

export const Button = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? React.Fragment : "button";

    const variantClasses = {
      default:
        "bg-[#7b189f] text-primary-foreground hover:bg-[#7b189f]/90 font-afacad ",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90 font-afacad",
      outline:
        "border border-bg-[#7b189f] border-input bg-background hover:bg-accent hover:text-accent-foreground font-afacad",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 font-afacad",
      ghost:
        "bg-transparent hover:bg-accent hover:text-accent-foreground font-afacad",
      link: "bg-transparent underline-offset-4 hover:underline text-primary font-afacad",
    };

    const sizeClasses = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-9 w-9",
    };

    const classes = [
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      variantClasses[variant],
      sizeClasses[size],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return <Comp className={classes} ref={ref} {...props} />;
  }
);

Button.displayName = "Button";
