import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import { Navbar } from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hridey Marwah | Full-Stack Developer",
  description:
    "Full-stack developer crafting performant, aesthetic web experiences. Open-source contributor to JAX/Google DeepMind. Explore my projects, stats, and story.",
  keywords: [
    "Hridey Marwah",
    "Full Stack Developer",
    "Next.js",
    "React",
    "Portfolio",
    "Open Source",
  ],
  openGraph: {
    title: "Hridey Marwah | Full-Stack Developer",
    description:
      "Crafting performant, aesthetic web experiences. Explore my projects and story.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${roboto.variable} font-sans antialiased bg-[var(--color-background)] text-[var(--color-foreground)]`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
