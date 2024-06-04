export function LoadingScreen() {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 z-20 bg-zinc-50 bg-opacity-80 flex flex-col justify-center items-center">
      <div className="text-xl font-bold animate-pulse">Loading...</div>
    </div>
  );
}
