interface PageContainerProps {
  children?: React.ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return <div className="mx-auto w-full max-w-screen-xl px-3 relative">{children}</div>;
}
