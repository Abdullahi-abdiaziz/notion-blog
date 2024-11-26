"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, ArrowRight, Home, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  const [isSpinning, setIsSpinning] = useState(false);

  const spin = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[92vh] bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900  px-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="text-6xl mb-8"
      >
        <AlertCircle className="w-24 h-24 text-red-500" />
      </motion.div>
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center"
      >
        Oops! Page Not Found
      </motion.h1>
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xl text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md"
      >
        The page you're looking for doesn't exist or has been moved.
      </motion.p>
      <div className="flex flex-col sm:flex-row gap-4 relative z-10000">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/"
            className="flex items-center justify-center bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors hover:bg-blue-600"
          >
            <Home className="mr-2" />
            Go Home
          </Link>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={spin}
          className="flex items-center justify-center bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold text-lg transition-colors hover:bg-gray-300"
        >
          <motion.div
            animate={{ rotate: isSpinning ? 360 : 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <RefreshCcw className="mr-2" />
          </motion.div>
          Try Again
        </motion.button>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-gray-600"
      >
        <p className="flex items-center">
          Lost? Check out our sitemap <ArrowRight className="ml-2" />
        </p>
      </motion.div>
    </div>
  );
}
