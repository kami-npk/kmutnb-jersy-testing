'use client';
import { motion, AnimatePresence } from 'framer-motion';
const AddOrderPopup = ({ isOpen}: { isOpen: boolean;}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="h-full w-full z-999 flex justify-center items-center top-0 left-0 fixed bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white shadow-2xl rounded-2xl p-3 h-fit w-40 flex flex-col items-center text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="w-full flex justify-center">
              <video
                src="/addtocart.mp4"
                autoPlay
                muted
                playsInline
                className="w-[70%] h-auto rounded"
              ></video>
            </div>
            <p className="text-[20px] font-bold">Added to Cart</p>
            <p>You can keep adding other shirt options</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddOrderPopup;
