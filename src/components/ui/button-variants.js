import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "block text-center rounded-lg py-3 font-semibold text-sm no-underline mt-2 transition duration-300", // base styles
  {
    variants: {
      variant: {
        default:
          "cursor-pointer bg-white text-gray-900 border-2 border-gray-900 hover:-translate-y-1 hover:shadow-[0_4px_0_rgba(0,0,0,1)]",
        primary:
          "cursor-pointer bg-gray-900 text-white border-2 border-gray-900 hover:-translate-y-1 hover:shadow-[0_4px_0_rgba(0,0,0,1)]",
        outline:
          "cursor-pointer bg-transparent text-gray-900 border-2 border-transparent hover:border-gray-900",
      },
      size: {
        default: "",
        sm: "py-2 px-4 text-sm",
        lg: "py-4 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export { buttonVariants };
