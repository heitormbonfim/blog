interface PageContainerProps {
  children?: React.ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="min-h-screen overflow-auto mx-auto w-full max-w-screen-xl px-3 relative border-l-2 border-r-2">
      {children}
    </div>
  );
}
