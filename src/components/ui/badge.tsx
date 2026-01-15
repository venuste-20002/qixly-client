import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        price:
          "bg-white text-black px-3 py-1 flex items-center justify-center gap-1 rounded-xl min-w-[50%] text-center",
        button: "rounded-full bg-primary text-white p-1 cursor-pointer",
        location:
          "bg-[#F1F5F9] uppercase  max-w-full text-sm flex items-center",
        status:
          "font-bold h-10 rounded-2xl text-center flex justify-center items-center uppercase text-[10px] rounded-full ",
        statusOrders:
          "rounded-full font-bold flex justify-center items-center text-center uppercase w-16",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
