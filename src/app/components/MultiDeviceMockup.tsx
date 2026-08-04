import { motion } from "framer-motion";

const desktop = "/mockups/desktop.svg";
const laptop = "/mockups/laptop.png";
const tablet = "/mockups/tablet.png";
const phone = "/mockups/phone.svg";

type Props = {
  url?: string;
};

export default function MultiDeviceMockup({ url }: Props) {
  if (!url) {
    return (
      <div className="flex items-center justify-center h-full text-white/40">
        Live Preview Coming Soon
      </div>
    );
  }

  return (
    <div className="relative w-full h-[700px] overflow-visible">
      {/* Desktop (Back) */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="
        absolute
        left-1/2
        -translate-x-1/2
        top-[160px]
        w-[78%]
        z-10
        "
      >
        <img
          src={desktop}
          alt=""
          draggable={false}
          className="w-full select-none pointer-events-none"
        />
      </motion.div>

      {/* Tablet */}

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
        className="
        absolute
        left-[5%]
        top-[280px]
        w-[25%]
        z-30
        "
      >
        <img src={tablet} alt="" draggable={false} className="w-full" />
      </motion.div>

      {/* Laptop */}

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="
        absolute
        right-[2%]
        bottom-[150px]
        w-[56%]
        z-40
        "
      >
        <img src={laptop} alt="" draggable={false} className="w-full" />
      </motion.div>

      {/* Phone */}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="
        absolute
        left-[30%]
        -translate-x-1/2
        bottom-[180px]
        w-[12%]
        z-50
        "
      >
        <img src={phone} alt="" draggable={false} className="w-full" />
      </motion.div>
    </div>
  );
}
