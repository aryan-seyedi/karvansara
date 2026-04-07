export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-white dark:bg-black text-black dark:text-white">
      <main className="flex flex-col gap-8 items-center text-center">
        <h1 className="text-5xl font-bold tracking-tight tracking-wide">Karvansara.org</h1>
        <h2 className="text-5xl font-medium py-4">کاروانسرا</h2>
        <p className="max-w-md text-xl opacity-80 mt-2">
          The Silk Road neighborhood digital library.
        </p>
        <div className="mt-12 px-8 py-3 border border-black dark:border-white rounded-full text-sm font-mono uppercase tracking-widest">
          System Status: Online
        </div>
      </main>
    </div>
  );
}
