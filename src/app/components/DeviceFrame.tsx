import { motion } from "framer-motion";

type DeviceFrameProps = {
  frame: string;
  url: string;
  className: string;
  screen: {
    left: string;
    top: string;
    width: string;
    height: string;
    radius?: string;
  };
  z?: number;
};

export default function DeviceFrame({
  frame,
  url,
  className,
  screen,
  z = 10,
}: DeviceFrameProps) {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ zIndex: z }}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.3 },
      }}
    >
      <div className="relative w-full">
        {/* Live Website */}
        <iframe
          src={url}
          loading="lazy"
          title="preview"
          className="absolute border-0 bg-white"
          style={{
            left: screen.left,
            top: screen.top,
            width: screen.width,
            height: screen.height,
            borderRadius: screen.radius ?? "12px",
          }}
        />

        {/* Device */}
        <img
          src={frame}
          draggable={false}
          className="relative z-10 w-full pointer-events-none select-none"
        />
      </div>
    </motion.div>
  );
}
