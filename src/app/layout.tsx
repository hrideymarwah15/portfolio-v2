import "@/app/globals.css";
import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import { Navbar } from "@/components/Navbar";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-body",
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
        className={`${pressStart.variable} ${vt323.variable} font-sans antialiased bg-[var(--color-background)] text-[var(--color-foreground)]`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
