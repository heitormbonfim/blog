import { appendClasses } from "../../utils/string-manipulations";

interface SeparatorProps {
  className?: string;
}

export function Separator({ className }: SeparatorProps) {
  return <div className={appendClasses("w-full h-[1px] bg-zinc-300", className)}></div>;
}
