import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/router";
import { useEffect } from "react";

const NotFound = () => {
  const router = useRouter();
  const path = router.asPath;

  useEffect(() => {
    if (path === "/404" && !path.endsWith("=404notfound")) {
      router.replace(`${path}=404notfound`);
    }
  }, [path, router]);

  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Head>

      <div className="flex min-h-screen items-center justify-center px-4 text-white">
        <div className="max-w-lg text-center">
          <p className="nf-eyebrow mb-4">Error</p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-8xl md:text-9xl"
          >
            404
          </motion.h1>
          <p className="mt-4 text-xl text-zinc-400">This page never reached production.</p>
          <p className="mt-3 text-sm text-[var(--muted)]">
            The page you’re looking for doesn’t exist or has been moved.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 md:flex-row">
            <Link href="/" className="nf-btn-primary">
              <FaHome /> Back to home
            </Link>
            <button onClick={() => window.history.back()} className="nf-btn-secondary">
              <FaArrowLeft /> Go back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
