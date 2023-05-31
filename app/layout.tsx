import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Sacramento Slippi",
  description: "Sacramento Melee's Slippi Power Rankings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="w-full h-full px-4 xs:px-10 sm:px-24 md:px-64 2xl:px-96 mt-24">
          {children}
        </div>
      </body>
    </html>
  );
}
