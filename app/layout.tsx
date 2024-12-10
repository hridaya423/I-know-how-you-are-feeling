import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "I know how you are feeling",
  description: "Sentiment analyzer who cares for you :D!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
