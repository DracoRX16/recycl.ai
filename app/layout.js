import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-green-900 to-black text-gray-100 min-h-screen">
        <Navbar />
        <main className="container mx-auto px-6 pt-20">{children}</main>
      </body>
    </html>
  );
}
