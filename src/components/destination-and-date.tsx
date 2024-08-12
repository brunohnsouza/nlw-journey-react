interface DestinationAndDateProps {
  children: React.ReactNode;
  isInputActive: boolean;
}

export function DestinationAndDate({
  children,
  isInputActive,
}: DestinationAndDateProps) {
  return (
    <div
      className={`${
        isInputActive ? "outline outline-1 outline-lime-300" : ""
      } bg-zinc-900 rounded-xl p-4 gap-y-5 flex flex-col shadow-shape md:h-16 md:px-4 md:flex-row md:items-center md:gap-x-5`}
    >
      {children}
    </div>
  );
}
