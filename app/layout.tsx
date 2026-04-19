import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Life Robo | Robotics Club — FOET, University of Lucknow",
  description:
    "Life Robo is the student-led robotics club at FOET, University of Lucknow. We build robots, run workshops, and compete in national-level competitions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
