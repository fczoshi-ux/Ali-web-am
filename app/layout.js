import "./globals.css";

export const metadata = {
  title: "Ali Store",
  description: "Ali Store - Alight Motion Premium",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
    }
