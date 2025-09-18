import { motion } from 'motion/react';
import { HelpCircle, Phone, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

interface FloatingActionButtonProps {
  onEmergency: () => void;
}

export function FloatingActionButton({ onEmergency }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Secondary buttons */}
      <motion.div
        className="flex flex-col items-end space-y-3 mb-4"
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: {
            opacity: 1,
            scale: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.1
            }
          },
          closed: {
            opacity: 0,
            scale: 0.8,
            transition: {
              staggerChildren: 0.05,
              staggerDirection: -1
            }
          }
        }}
      >
        <motion.div
          variants={{
            open: { opacity: 1, x: 0, scale: 1 },
            closed: { opacity: 0, x: 20, scale: 0.8 }
          }}
        >
          <Button
            size="sm"
            className="bg-blue-500 hover:bg-blue-600 shadow-lg rounded-full h-12 w-12 p-0"
            onClick={() => {}}
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
          <span className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Help & FAQ
          </span>
        </motion.div>

        <motion.div
          variants={{
            open: { opacity: 1, x: 0, scale: 1 },
            closed: { opacity: 0, x: 20, scale: 0.8 }
          }}
        >
          <Button
            size="sm"
            className="bg-green-500 hover:bg-green-600 shadow-lg rounded-full h-12 w-12 p-0"
            onClick={() => {}}
          >
            <Phone className="h-5 w-5" />
          </Button>
        </motion.div>

        <motion.div
          variants={{
            open: { opacity: 1, x: 0, scale: 1 },
            closed: { opacity: 0, x: 20, scale: 0.8 }
          }}
        >
          <Button
            size="sm"
            className="bg-purple-500 hover:bg-purple-600 shadow-lg rounded-full h-12 w-12 p-0"
            onClick={() => {}}
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Main FAB */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Button
          onClick={isOpen ? onEmergency : toggleOpen}
          className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 shadow-lg rounded-full h-16 w-16 p-0 relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            initial={false}
          />
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <div className="h-6 w-6 relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-0.5 bg-white"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-4 bg-white"></div>
            </div>
          </motion.div>
        </Button>
      </motion.div>
    </div>
  );
}