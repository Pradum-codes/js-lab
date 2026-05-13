import "./globals.css";

export const metadata = {
  title: "Js Lab",
  description: "Learn JavaScript with MDX lessons",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
