import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/page";
import Footer from "@/components/footer/page";
import Providers from "./sessionProviders";
// import 'vis-timeline/styles/vis-timeline-graph2d.css';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "KliniKtracK",
  description: "A seamless, software solution designed for tracking anyone's health histroy: from surgical operations to medicines taken to genetic diseases. Additionally, doctors are able to request permissions from users to view such history for accurate medical diagnosis.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Providers>
          <div className="navbarLayoutContainer">
            <Navbar />
          </div>
          {children}
          <div className="footerLayoutContainer">
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
