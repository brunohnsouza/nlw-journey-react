import { VariantProps, tv } from "tailwind-variants";

const inputVariants = tv({
  base: "h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2",

  variants: {
    size: {
      full: "flex-1",
    },
  },
});

interface InputProps extends VariantProps<typeof inputVariants> {
  children: React.ReactNode;
}

export function Input({ children, size }: InputProps) {
  return <div className={inputVariants({ size })}>{children}</div>;
}
