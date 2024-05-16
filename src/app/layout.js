import "./globals.css";

export default function Layout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <main className="flex min-h-screen flex-col items-center justify-between p-3 sm:p-24 dark:bg-gray-800 dark:text-white">
          <div className="max-w-5xl w-full">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
