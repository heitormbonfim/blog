import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { mergeClasses } from "../../utils/string-manipulations";

interface MenuButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => any;
  href?: string;
  _blank?: boolean;
}

export function MenuButton({ className, children, onClick, href, _blank }: MenuButtonProps) {
  if (href && _blank) {
    return (
      <a href={href} target="_blank">
        <button
          onClick={onClick}
          className={mergeClasses(
            "text-lg border-b-[2px] border-transparent hover:border-sky-500 hover:text-sky-500 transition-all duration-300",
            className
          )}
        >
          {children}
        </button>
      </a>
    );
  } else if (href) {
    const pathname = useRef(window.location.pathname.slice(1));
    const [isCurrentWindow, setIsCurrentWindow] = useState(false);

    useEffect(() => {
      const currentPage = href.slice(1);

      if (pathname.current.toLowerCase() == currentPage.toLowerCase()) {
        setIsCurrentWindow(true);
      }
    }, [pathname]);

    return (
      <Link to={href}>
        <button
          onClick={onClick}
          className={mergeClasses(
            `text-lg border-b-[2px] border-transparent ${
              isCurrentWindow
                ? "border-zinc-900 text-zinc-900 lg:text-zinc-900 font-semibold"
                : "text-zinc-500"
            } hover:border-zinc-900 hover:text-zinc-900 transition-all duration-300`,
            className
          )}
        >
          {children}
        </button>
      </Link>
    );
  } else {
    return (
      <button
        onClick={onClick}
        className={mergeClasses(
          "text-lg border-b-[2px] border-transparent hover:border-zinc-500 hover:text-zinc-900 transition-all duration-300",
          className
        )}
      >
        {children}
      </button>
    );
  }
}
