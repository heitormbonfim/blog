import { FaX } from "react-icons/fa6";
import { mergeClasses } from "../../utils/string-manipulations";

interface ModalProps {
  children?: React.ReactNode;
  id: string;
  className?: string;
}

export function Modal({ children, id, className }: ModalProps) {
  return (
    <dialog
      id={id}
      className={mergeClasses(
        "w-full max-w-screen-sm min-h-36 max-h-[600px] overflow-auto border border-black p-2 z-10 backdrop:bg-black/20 backdrop:backdrop-blur-sm",
        className
      )}
    >
      <div className="relative">
        <form method="dialog">
          <button className="font-bold absolute top-0 right-0 p-2 hover:bg-zinc-200 duration-300">
            <FaX size={15} />
          </button>
        </form>

        <div className="p-6">{children}</div>
      </div>
    </dialog>
  );
}
