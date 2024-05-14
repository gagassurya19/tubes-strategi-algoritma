import "./globals.css";
import Header from "./components/header.js";
import Footer from "./components/footer.js";

export default function Layout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <main className="flex min-h-screen flex-col items-center justify-between p-24 dark:bg-gray-800 dark:text-white">
          <div className="max-w-5xl w-full">
            <Header />
            {children}
            <Footer />
          </div>
        </main>
      </body>
    </html>
  );
}
