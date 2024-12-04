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
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="text-4xl sm:text-6xl mb-8"
      >
        <AlertCircle className="w-24 h-24 text-red-500" />
      </motion.div>
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-2xl sm:text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center"
      >
        Oops! Page Not Found
      </motion.h1>
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.05 }}
        className="text-base sm:text-xl text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md"
      >
        The page you're looking for doesn't exist or has been moved.
      </motion.p>
      <div className="flex flex-col   sm:flex-row gap-4 relative z-10000">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/"
            className="flex items-center  justify-center w-full bg-blue-500 text-white px-4 py-2 rounded-md font-semibold text-base sm:text-lg  transition-colors hover:bg-blue-600"
          >
            <Home className="mr-2" />
            Go Home
          </Link>
        </motion.div>
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
