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
        <div className="w-full h-full px-4 md:px-10 lg:px-24 xl:px-64 2xl:px-72 mt-24">
          {children}
        </div>
      </body>
    </html>
  );
}
