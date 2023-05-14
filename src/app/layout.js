import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import Providers from "../components/Providers";
import "./globals.css";

export const metadata = {
  title: "NEXQUIZ",
  description: "Semakin pintar dengan uji kemampuanmu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-slate-50 dark:bg-slate-900">
        <Providers>
          <Navbar />
          {children}
          <Modal />
        </Providers>
      </body>
    </html>
  );
}
