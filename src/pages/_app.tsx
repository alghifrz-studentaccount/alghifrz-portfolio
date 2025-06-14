import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import { Toaster } from 'react-hot-toast'
import Footer from '@/components/Footer'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      <main className="min-h-screen">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  )
}
