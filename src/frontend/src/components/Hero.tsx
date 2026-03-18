import { Calculator } from "lucide-react";
import { motion } from "motion/react";

const TOOLS = [
  { label: "Stress (Pa)" },
  { label: "Strain (ε)" },
  { label: "Power (W)" },
];

export function Hero() {
  return (
    <section
      className="pt-16"
      style={{
        background:
          "linear-gradient(160deg, #071A2A 0%, #0B2A3D 60%, #0D3050 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{
              background: "rgba(47,111,184,0.2)",
              color: "#7BAEDE",
              border: "1px solid rgba(47,111,184,0.3)",
            }}
          >
            <Calculator className="w-4 h-4" />
            Precision Engineering Calculations
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
            Mechanical Engineering
            <br />
            <span style={{ color: "#5B9FD4" }}>Calculators</span>
          </h1>
          <p
            className="text-lg md:text-xl font-normal max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Precision tools for stress, strain, and power calculations — built
            for engineers who demand accuracy.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex justify-center gap-8 mt-10 pb-2"
        >
          {TOOLS.map((tool) => (
            <div key={tool.label} className="text-center">
              <div className="text-2xl font-bold" style={{ color: "#5B9FD4" }}>
                ⚙
              </div>
              <div
                className="text-xs font-medium mt-1"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {tool.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
