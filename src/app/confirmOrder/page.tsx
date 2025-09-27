"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
const Page = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(20);

  useEffect(() => {
    sessionStorage.clear();

    setCountdown(20); 

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timer = setTimeout(() => {
        router.push('/');
    }, 20000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 font-barlow-regular"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white h-full w-full p-6 text-center flex flex-col items-center shadow-xl justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="w-full flex justify-center">
            <video
              src="/confirmed.mp4"
              autoPlay
              muted
              playsInline
              className="w-[60%] md:w-[15%] h-auto "
            ></video>
          </div>
          <div className="-translate-y-15">
            <h2 className="text-2xl font-bold mb-4">Order Confirmed!</h2>
          <p className="text-gray-700 mb-4">
            Your order has been successfully placed. Please check announcements
            from our page.
          </p>
          <p className="text-gray-500 text-sm">
            Redirecting to home in {countdown} second{countdown > 1 ? "s" : ""}
            ...
          </p>
          <Link href={'/'}>Or click here to go Home</Link>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Page;
