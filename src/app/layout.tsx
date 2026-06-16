import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jayrajsinh Jadav — Software Engineer & Frontend Developer",
  description:
    "Software Engineer specializing in React.js, Next.js, and Tailwind CSS. Building fast, beautiful, and human web experiences. Based in Ahmedabad, India.",
  keywords: [
    "Jayrajsinh Jadav",
    "Software Engineer",
    "Frontend Developer",
    "React.js",
    "Next.js",
    "Tailwind CSS",
    "Portfolio",
    "Ahmedabad",
  ],
  authors: [{ name: "Jayrajsinh Jadav" }],
  openGraph: {
    title: "Jayrajsinh Jadav — Software Engineer",
    description: "Building web experiences that are fast, beautiful, and human.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise text-text bg-bg" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
