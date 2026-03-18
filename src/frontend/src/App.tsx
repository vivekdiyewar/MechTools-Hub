import { Toaster } from "@/components/ui/sonner";
import {
  Activity,
  Flame,
  Gauge,
  RotateCw,
  Settings2,
  Thermometer,
  Waves,
  Wind,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { AuthModal } from "./components/AuthModal";
import { CalculatorCard } from "./components/CalculatorCard";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HistoryPanel } from "./components/HistoryPanel";
import { Navbar } from "./components/Navbar";
import { UnitConverter } from "./components/UnitConverter";
import { useAuth } from "./hooks/useAuth";
import { useHistory } from "./hooks/useHistory";

type Tab = "calculators" | "converter";

export default function App() {
  const { user, login, register, logout } = useAuth();
  const { history, addEntry, clearHistory } = useHistory();
  const [authOpen, setAuthOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("calculators");

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#F2F5F8" }}
    >
      <Toaster />
      <Navbar
        user={user}
        onLoginClick={() => setAuthOpen(true)}
        onLogout={logout}
      />
      <Hero />

      {/* Tab navigation */}
      <div
        className="sticky top-0 z-20 w-full border-b"
        style={{ background: "#071A2A", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex gap-2 py-3">
          <button
            type="button"
            data-ocid="nav.calculators.tab"
            onClick={() => setActiveTab("calculators")}
            className="px-6 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{
              background:
                activeTab === "calculators" ? "#2F6FB8" : "transparent",
              color:
                activeTab === "calculators" ? "white" : "rgba(255,255,255,0.6)",
              border:
                activeTab === "calculators"
                  ? "1px solid #2F6FB8"
                  : "1px solid rgba(255,255,255,0.15)",
            }}
          >
            ⚙️ Calculators
          </button>
          <button
            type="button"
            data-ocid="nav.converter.tab"
            onClick={() => setActiveTab("converter")}
            className="px-6 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{
              background: activeTab === "converter" ? "#2F6FB8" : "transparent",
              color:
                activeTab === "converter" ? "white" : "rgba(255,255,255,0.6)",
              border:
                activeTab === "converter"
                  ? "1px solid #2F6FB8"
                  : "1px solid rgba(255,255,255,0.15)",
            }}
          >
            📐 Unit Converter
          </button>
        </div>
      </div>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-6 py-10">
        {activeTab === "calculators" && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold" style={{ color: "#1B2430" }}>
                Engineering Calculators
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                10 calculators covering core mechanical engineering formulas
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <CalculatorCard
                title="Stress Calculator"
                description="σ = F / A"
                calcType="Stress"
                icon={<Activity className="w-5 h-5" />}
                fields={[
                  {
                    id: "force",
                    label: "Force",
                    placeholder: "e.g. 1000",
                    unit: "N",
                  },
                  {
                    id: "area",
                    label: "Area",
                    placeholder: "e.g. 0.05",
                    unit: "m²",
                  },
                ]}
                calculate={(force, area) => (area === 0 ? null : force / area)}
                resultUnit="Pa"
                resultLabel="Stress"
                delay={0.05}
                onResult={addEntry}
              />
              <CalculatorCard
                title="Strain Calculator"
                description="ε = ΔL / L"
                calcType="Strain"
                icon={<Gauge className="w-5 h-5" />}
                fields={[
                  {
                    id: "deltaL",
                    label: "Change in Length",
                    placeholder: "e.g. 2",
                    unit: "mm",
                  },
                  {
                    id: "L",
                    label: "Original Length",
                    placeholder: "e.g. 200",
                    unit: "mm",
                  },
                ]}
                calculate={(deltaL, L) => (L === 0 ? null : deltaL / L)}
                resultUnit="ε"
                resultLabel="Strain"
                delay={0.1}
                onResult={addEntry}
              />
              <CalculatorCard
                title="Power Calculator"
                description="P = W / t"
                calcType="Power"
                icon={<Zap className="w-5 h-5" />}
                fields={[
                  {
                    id: "work",
                    label: "Work",
                    placeholder: "e.g. 500",
                    unit: "N·m",
                  },
                  {
                    id: "time",
                    label: "Time",
                    placeholder: "e.g. 10",
                    unit: "s",
                  },
                ]}
                calculate={(work, time) => (time === 0 ? null : work / time)}
                resultUnit="W"
                resultLabel="Power"
                delay={0.15}
                onResult={addEntry}
              />
              <CalculatorCard
                title="Torque Calculator"
                description="T = F × r"
                calcType="Torque"
                icon={<RotateCw className="w-5 h-5" />}
                fields={[
                  {
                    id: "force",
                    label: "Force",
                    placeholder: "e.g. 500",
                    unit: "N",
                  },
                  {
                    id: "radius",
                    label: "Moment Arm",
                    placeholder: "e.g. 0.3",
                    unit: "m",
                  },
                ]}
                calculate={(f, r) => f * r}
                resultUnit="N·m"
                resultLabel="Torque"
                delay={0.2}
                onResult={addEntry}
              />
              <CalculatorCard
                title="Beam Deflection"
                description="δ = FL³ / (48EI)"
                calcType="BeamDeflection"
                icon={<Waves className="w-5 h-5" />}
                fields={[
                  {
                    id: "F",
                    label: "Force F",
                    placeholder: "e.g. 5000",
                    unit: "N",
                  },
                  {
                    id: "L",
                    label: "Length L",
                    placeholder: "e.g. 3",
                    unit: "m",
                  },
                  {
                    id: "E",
                    label: "Elastic Modulus E",
                    placeholder: "e.g. 200e9",
                    unit: "Pa",
                  },
                  {
                    id: "I",
                    label: "Second Moment I",
                    placeholder: "e.g. 8.33e-6",
                    unit: "m⁴",
                  },
                ]}
                calculate={(F, L, E, I) =>
                  E * I === 0 ? null : (F * L ** 3) / (48 * E * I)
                }
                resultUnit="m"
                resultLabel="Deflection"
                delay={0.25}
                onResult={addEntry}
              />
              <CalculatorCard
                title="Fluid Pressure"
                description="P = ρgh"
                calcType="FluidPressure"
                icon={<Waves className="w-5 h-5" />}
                fields={[
                  {
                    id: "rho",
                    label: "Density ρ",
                    placeholder: "e.g. 1000",
                    unit: "kg/m³",
                  },
                  {
                    id: "h",
                    label: "Height h",
                    placeholder: "e.g. 10",
                    unit: "m",
                  },
                ]}
                calculate={(rho, h) => rho * 9.81 * h}
                resultUnit="Pa"
                resultLabel="Pressure"
                delay={0.3}
                onResult={addEntry}
              />
              <CalculatorCard
                title="Thermal Expansion"
                description="ΔL = α × L × ΔT"
                calcType="ThermalExpansion"
                icon={<Thermometer className="w-5 h-5" />}
                fields={[
                  {
                    id: "alpha",
                    label: "Coefficient α",
                    placeholder: "e.g. 12e-6",
                    unit: "1/°C",
                  },
                  {
                    id: "L",
                    label: "Original Length L",
                    placeholder: "e.g. 5",
                    unit: "m",
                  },
                  {
                    id: "dT",
                    label: "Temp Change ΔT",
                    placeholder: "e.g. 100",
                    unit: "°C",
                  },
                ]}
                calculate={(alpha, L, dT) => alpha * L * dT}
                resultUnit="m"
                resultLabel="Expansion ΔL"
                delay={0.35}
                onResult={addEntry}
              />
              <CalculatorCard
                title="Kinetic Energy"
                description="KE = ½mv²"
                calcType="KineticEnergy"
                icon={<Flame className="w-5 h-5" />}
                fields={[
                  {
                    id: "mass",
                    label: "Mass m",
                    placeholder: "e.g. 70",
                    unit: "kg",
                  },
                  {
                    id: "velocity",
                    label: "Velocity v",
                    placeholder: "e.g. 15",
                    unit: "m/s",
                  },
                ]}
                calculate={(m, v) => 0.5 * m * v * v}
                resultUnit="J"
                resultLabel="Kinetic Energy"
                delay={0.4}
                onResult={addEntry}
              />
              <CalculatorCard
                title="Reynolds Number"
                description="Re = ρvD / μ"
                calcType="ReynoldsNumber"
                icon={<Wind className="w-5 h-5" />}
                fields={[
                  {
                    id: "rho",
                    label: "Density ρ",
                    placeholder: "e.g. 1000",
                    unit: "kg/m³",
                  },
                  {
                    id: "v",
                    label: "Velocity v",
                    placeholder: "e.g. 2",
                    unit: "m/s",
                  },
                  {
                    id: "D",
                    label: "Diameter D",
                    placeholder: "e.g. 0.05",
                    unit: "m",
                  },
                  {
                    id: "mu",
                    label: "Dynamic Viscosity μ",
                    placeholder: "e.g. 0.001",
                    unit: "Pa·s",
                  },
                ]}
                calculate={(rho, v, D, mu) =>
                  mu === 0 ? null : (rho * v * D) / mu
                }
                resultUnit="—"
                resultLabel="Reynolds No."
                delay={0.45}
                onResult={addEntry}
              />
              <CalculatorCard
                title="Gear Ratio"
                description="GR = N₂ / N₁"
                calcType="GearRatio"
                icon={<Settings2 className="w-5 h-5" />}
                fields={[
                  {
                    id: "N2",
                    label: "Driven Teeth N₂",
                    placeholder: "e.g. 60",
                    unit: "teeth",
                  },
                  {
                    id: "N1",
                    label: "Driver Teeth N₁",
                    placeholder: "e.g. 20",
                    unit: "teeth",
                  },
                ]}
                calculate={(N2, N1) => (N1 === 0 ? null : N2 / N1)}
                resultUnit="ratio"
                resultLabel="Gear Ratio"
                delay={0.5}
                onResult={addEntry}
              />
            </div>
            <HistoryPanel history={history} onClear={clearHistory} />
          </>
        )}

        {activeTab === "converter" && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold" style={{ color: "#1B2430" }}>
                Unit Converter
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                12 categories — convert all mechanical engineering units
                instantly
              </p>
            </div>
            <UnitConverter />
          </>
        )}
      </main>

      <Footer />

      <AuthModal
        open={authOpen}
        onOpenChange={setAuthOpen}
        onLogin={login}
        onRegister={register}
      />
    </div>
  );
}
