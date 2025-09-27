'use client'
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  confirm: () => void;
  isOpen: boolean;
  onClose: () => void;
};

const DeletePopup: React.FC<Props> = ({ confirm, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex justify-center items-center z-999"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg p-6 w-80 flex flex-col items-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p className="mb-6 text-center">Are you sure you want to delete this item?</p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  confirm();
                  onClose();
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={onClose}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeletePopup;
