import { mergeClasses } from "../../utils/string-manipulations";
import Navbar from "./navbar";

interface PageContainerProps {
  children?: React.ReactNode;
  className?: string;
  navbar?: boolean;
  navMobileOnly?: boolean;
  navTransparentWhenTop?: boolean;
}

export function PageContainer({
  children,
  navMobileOnly,
  className,
  navTransparentWhenTop,
  navbar,
}: PageContainerProps) {
  return (
    <>
      {navbar && <Navbar mobileOnly={navMobileOnly} transparentWhenTop={navTransparentWhenTop} />}
      <div
        className={mergeClasses(
          `min-h-screen overflow-auto mx-auto w-full max-w-screen-xl px-3 pt-16 pb-10 relative border-l-2 border-r-2`,
          className
        )}
      >
        {children}
      </div>
    </>
  );
}
