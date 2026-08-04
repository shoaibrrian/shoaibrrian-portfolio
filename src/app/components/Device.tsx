import { motion } from "framer-motion";

type Props = {
  frame: string;
  url: string;
  className: string;
  screen: {
    left: string;
    top: string;
    width: string;
    height: string;
    scale: number;
  };
};

export default function Device({ frame, url, className, screen }: Props) {
  return (
    <motion.div
      className={`absolute ${className}`}
      whileHover={{
        scale: 1.03,
        y: -8,
      }}
      transition={{
        type: "spring",
        stiffness: 180,
      }}
    >
      <div className="relative w-full">
        {/* Screen */}
        <div
          className="absolute overflow-hidden"
          style={{
            left: screen.left,
            top: screen.top,
            width: screen.width,
            height: screen.height,
          }}
        >
          <iframe
            src={url}
            loading="lazy"
            className="border-0 origin-top-left"
            style={{
              width: "1440px",
              height: "900px",
              transform: `scale(${screen.scale})`,
              transformOrigin: "top left",
            }}
          />
        </div>

        {/* Frame */}
        <img
          src={frame}
          draggable={false}
          className="relative z-10 w-full pointer-events-none select-none"
        />
      </div>
    </motion.div>
  );
}
