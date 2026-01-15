import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline cursor-pointer",
        auth: "bg-primary text-primary-foreground shadow hover:bg-primary/90 rounded-[28.5px] w-[250px] font-bold m-auto text-xl uppercase",
        google:
          "bg-white text-black shadow-[4px_4px_7px_0_rgba(0,0,0,0.1)] rounded-[28.5px] w-[250px] h-[150px] font-bold m-auto text-xl uppercase border-t-0 border-l-0 border-b border-r",
        header:
          "rounded-[12px] w-[38px] min-h-[35px] bg-white shadow-[5px_10px_20px_#D3D1D84D]",
          cart:"bg-primary hover:bg-primary/80 rounded-[100px] p-1 inline-flex justify-start text-white uppercase font-bold",
          cartroundedminus:"bg-white border-2 border-primary rounded-full w-5 h-5 p-2 text-primary cursor-pointer hover:bg-primaryGray/10",
          cartroundedplus:"bg-primary rounded-full text-white w-6 h-5 p-2 text-sm font-bold cursor-pointer hover:bg-opacity-80"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" />
          </>
        ) : (
          props.children
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
