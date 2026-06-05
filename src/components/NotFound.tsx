import { motion } from "framer-motion";

const NotFound: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-gray-950 via-purple-950 to-indigo-950 flex items-center justify-center"
    >
      <div className="text-center px-4">
        {/* 404 با انیمیشن */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="relative"
        >
          <h1 className="text-[150px] md:text-[250px] font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
            404
          </h1>

          {/* خط تزئینی زیر 404 */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4"
          />
        </motion.div>

        {/* متن‌ها */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 space-y-3"
        >
          <p className="text-purple-400 text-sm font-mono tracking-wider">
            PAGE NOT FOUND
          </p>

          <p className="text-gray-400 text-base max-w-sm mx-auto">
            The page you are looking for doesn't exist or has been moved
          </p>
        </motion.div>

        {/* انیمیشن نقطه‌های شناور */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-1.5 h-1.5 bg-purple-500/50 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;
