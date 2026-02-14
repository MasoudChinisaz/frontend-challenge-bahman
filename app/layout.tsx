import Providers from "./providers";
import "./globals.css";

export const metadata = {
  title: 'Frontend Challenge Bahman',
  description: 'A powerful dashboard application built with Next.js, React, TypeScript, Chakra UI, and Tailwind CSS. Explore products, manage users, and discover games.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
