import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#161616",
            color: "#f4f4f5",
            border: "1px solid rgba(255,255,255,0.08)",
          },
        }}
      />
      <div className="nf-noise" />
      <Navbar />
      <main className="min-h-screen bg-[var(--background)]">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
