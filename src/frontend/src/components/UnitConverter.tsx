import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeftRight, Ruler } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

type ConversionCategory = {
  name: string;
  units: string[];
  toBase: Record<string, (v: number) => number>;
  fromBase: Record<string, (v: number) => number>;
  description: string;
};

const categories: ConversionCategory[] = [
  {
    name: "Length",
    description: "Distance & size measurements",
    units: ["m", "km", "cm", "mm", "in", "ft", "yd", "miles"],
    toBase: {
      m: (v) => v,
      km: (v) => v * 1000,
      cm: (v) => v / 100,
      mm: (v) => v / 1000,
      in: (v) => v * 0.0254,
      ft: (v) => v * 0.3048,
      yd: (v) => v * 0.9144,
      miles: (v) => v * 1609.344,
    },
    fromBase: {
      m: (v) => v,
      km: (v) => v / 1000,
      cm: (v) => v * 100,
      mm: (v) => v * 1000,
      in: (v) => v / 0.0254,
      ft: (v) => v / 0.3048,
      yd: (v) => v / 0.9144,
      miles: (v) => v / 1609.344,
    },
  },
  {
    name: "Mass",
    description: "Weight & mass quantities",
    units: ["kg", "g", "mg", "lb", "oz", "tonne"],
    toBase: {
      kg: (v) => v,
      g: (v) => v / 1000,
      mg: (v) => v / 1e6,
      lb: (v) => v * 0.453592,
      oz: (v) => v * 0.0283495,
      tonne: (v) => v * 1000,
    },
    fromBase: {
      kg: (v) => v,
      g: (v) => v * 1000,
      mg: (v) => v * 1e6,
      lb: (v) => v / 0.453592,
      oz: (v) => v / 0.0283495,
      tonne: (v) => v / 1000,
    },
  },
  {
    name: "Force",
    description: "Mechanical forces",
    units: ["N", "kN", "lbf", "kgf"],
    toBase: {
      N: (v) => v,
      kN: (v) => v * 1000,
      lbf: (v) => v * 4.44822,
      kgf: (v) => v * 9.80665,
    },
    fromBase: {
      N: (v) => v,
      kN: (v) => v / 1000,
      lbf: (v) => v / 4.44822,
      kgf: (v) => v / 9.80665,
    },
  },
  {
    name: "Pressure",
    description: "Stress & pressure values",
    units: ["Pa", "kPa", "MPa", "bar", "psi", "atm"],
    toBase: {
      Pa: (v) => v,
      kPa: (v) => v * 1000,
      MPa: (v) => v * 1e6,
      bar: (v) => v * 100000,
      psi: (v) => v * 6894.76,
      atm: (v) => v * 101325,
    },
    fromBase: {
      Pa: (v) => v,
      kPa: (v) => v / 1000,
      MPa: (v) => v / 1e6,
      bar: (v) => v / 100000,
      psi: (v) => v / 6894.76,
      atm: (v) => v / 101325,
    },
  },
  {
    name: "Temperature",
    description: "Thermal measurements",
    units: ["°C", "°F", "K"],
    toBase: {
      "°C": (v) => v,
      "°F": (v) => (v - 32) * (5 / 9),
      K: (v) => v - 273.15,
    },
    fromBase: {
      "°C": (v) => v,
      "°F": (v) => v * (9 / 5) + 32,
      K: (v) => v + 273.15,
    },
  },
  {
    name: "Energy",
    description: "Work & heat energy",
    units: ["J", "kJ", "cal", "kcal", "BTU", "kWh"],
    toBase: {
      J: (v) => v,
      kJ: (v) => v * 1000,
      cal: (v) => v * 4.184,
      kcal: (v) => v * 4184,
      BTU: (v) => v * 1055.06,
      kWh: (v) => v * 3.6e6,
    },
    fromBase: {
      J: (v) => v,
      kJ: (v) => v / 1000,
      cal: (v) => v / 4.184,
      kcal: (v) => v / 4184,
      BTU: (v) => v / 1055.06,
      kWh: (v) => v / 3.6e6,
    },
  },
  {
    name: "Power",
    description: "Rate of work or heat transfer",
    units: ["W", "kW", "MW", "hp", "BTU/hr"],
    toBase: {
      W: (v) => v,
      kW: (v) => v * 1000,
      MW: (v) => v * 1e6,
      hp: (v) => v * 745.7,
      "BTU/hr": (v) => v * 0.293071,
    },
    fromBase: {
      W: (v) => v,
      kW: (v) => v / 1000,
      MW: (v) => v / 1e6,
      hp: (v) => v / 745.7,
      "BTU/hr": (v) => v / 0.293071,
    },
  },
  {
    name: "Velocity",
    description: "Speed of motion",
    units: ["m/s", "km/h", "mph", "ft/s", "knot"],
    toBase: {
      "m/s": (v) => v,
      "km/h": (v) => v / 3.6,
      mph: (v) => v * 0.44704,
      "ft/s": (v) => v * 0.3048,
      knot: (v) => v * 0.514444,
    },
    fromBase: {
      "m/s": (v) => v,
      "km/h": (v) => v * 3.6,
      mph: (v) => v / 0.44704,
      "ft/s": (v) => v / 0.3048,
      knot: (v) => v / 0.514444,
    },
  },
  {
    name: "Torque",
    description: "Rotational force",
    units: ["N·m", "kN·m", "lbf·ft", "lbf·in", "kgf·m"],
    toBase: {
      N·m: (v) => v,
      kN·m: (v) => v * 1000,
      lbf·ft: (v) => v * 1.35582,
      lbf·in: (v) => v * 0.112985,
      kgf·m: (v) => v * 9.80665,
    },
    fromBase: {
      N·m: (v) => v,
      kN·m: (v) => v / 1000,
      lbf·ft: (v) => v / 1.35582,
      lbf·in: (v) => v / 0.112985,
      kgf·m: (v) => v / 9.80665,
    },
  },
  {
    name: "Volume",
    description: "Capacity & fluid volume",
    units: ["m³", "L", "mL", "cm³", "ft³", "in³", "gal (US)"],
    toBase: {
      "m³": (v) => v,
      L: (v) => v / 1000,
      mL: (v) => v / 1e6,
      "cm³": (v) => v / 1e6,
      "ft³": (v) => v * 0.0283168,
      "in³": (v) => v * 1.6387e-5,
      "gal (US)": (v) => v * 0.00378541,
    },
    fromBase: {
      "m³": (v) => v,
      L: (v) => v * 1000,
      mL: (v) => v * 1e6,
      "cm³": (v) => v * 1e6,
      "ft³": (v) => v / 0.0283168,
      "in³": (v) => v / 1.6387e-5,
      "gal (US)": (v) => v / 0.00378541,
    },
  },
  {
    name: "Area",
    description: "Surface measurements",
    units: ["m²", "km²", "cm²", "mm²", "ft²", "in²", "acre"],
    toBase: {
      "m²": (v) => v,
      "km²": (v) => v * 1e6,
      "cm²": (v) => v / 1e4,
      "mm²": (v) => v / 1e6,
      "ft²": (v) => v * 0.092903,
      "in²": (v) => v * 0.00064516,
      acre: (v) => v * 4046.86,
    },
    fromBase: {
      "m²": (v) => v,
      "km²": (v) => v / 1e6,
      "cm²": (v) => v * 1e4,
      "mm²": (v) => v * 1e6,
      "ft²": (v) => v / 0.092903,
      "in²": (v) => v / 0.00064516,
      acre: (v) => v / 4046.86,
    },
  },
  {
    name: "Angle",
    description: "Angular measurements",
    units: ["deg", "rad", "grad"],
    toBase: {
      deg: (v) => v,
      rad: (v) => (v * 180) / Math.PI,
      grad: (v) => v * 0.9,
    },
    fromBase: {
      deg: (v) => v,
      rad: (v) => (v * Math.PI) / 180,
      grad: (v) => v / 0.9,
    },
  },
];

export function UnitConverter() {
  const [categoryName, setCategoryName] = useState("Length");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  const category = categories.find((c) => c.name === categoryName)!;

  const handleCategoryChange = (name: string) => {
    const cat = categories.find((c) => c.name === name)!;
    setCategoryName(name);
    setFromUnit(cat.units[0]);
    setToUnit(cat.units[1] ?? cat.units[0]);
    setFromValue("");
    setToValue("");
  };

  const convert = (value: string, from: string, to: string): string => {
    const num = Number.parseFloat(value);
    if (Number.isNaN(num) || value.trim() === "") return "";
    const base = category.toBase[from](num);
    const result = category.fromBase[to](base);
    return result % 1 === 0
      ? result.toFixed(0)
      : result.toPrecision(7).replace(/\.?0+$/, "");
  };

  const handleFromChange = (val: string) => {
    setFromValue(val);
    setToValue(convert(val, fromUnit, toUnit));
  };

  const handleToChange = (val: string) => {
    setToValue(val);
    setFromValue(convert(val, toUnit, fromUnit));
  };

  const handleFromUnitChange = (unit: string) => {
    setFromUnit(unit);
    setToValue(convert(fromValue, unit, toUnit));
  };

  const handleToUnitChange = (unit: string) => {
    setToUnit(unit);
    setToValue(convert(fromValue, fromUnit, unit));
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
    setToValue(fromValue);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card
        className="shadow-card border-border"
        style={{ borderRadius: "16px" }}
      >
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(47,111,184,0.1)", color: "#2F6FB8" }}
            >
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <CardTitle
                className="text-lg font-bold"
                style={{ color: "#1B2430" }}
              >
                Unit Converter
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Convert between all mechanical engineering units
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category Selector */}
          <div className="space-y-2">
            <Label
              className="text-sm font-semibold"
              style={{ color: "#1B2430" }}
            >
              Category
            </Label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat.name}
                  data-ocid="converter.tab"
                  onClick={() => handleCategoryChange(cat.name)}
                  className="text-xs font-medium px-3 py-2 rounded-lg border transition-all"
                  style={{
                    background: categoryName === cat.name ? "#2F6FB8" : "white",
                    color: categoryName === cat.name ? "white" : "#4A5568",
                    borderColor:
                      categoryName === cat.name ? "#2F6FB8" : "#D7DEE6",
                    fontWeight: categoryName === cat.name ? 600 : 400,
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Category description */}
          <p className="text-sm text-muted-foreground -mt-2">
            {category.description}
          </p>

          {/* Converter inputs */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
            {/* From */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">From</Label>
              <Select value={fromUnit} onValueChange={handleFromUnitChange}>
                <SelectTrigger
                  data-ocid="converter.select"
                  className="border-border"
                  style={{ borderColor: "#D7DEE6" }}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {category.units.map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                data-ocid="converter.input"
                type="number"
                placeholder="Enter value"
                value={fromValue}
                onChange={(e) => handleFromChange(e.target.value)}
                className="text-lg font-semibold"
                style={{ borderColor: "#D7DEE6" }}
              />
            </div>

            {/* Swap button */}
            <div className="flex justify-center pb-1">
              <button
                type="button"
                data-ocid="converter.toggle"
                onClick={handleSwap}
                className="w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:scale-110"
                style={{
                  background: "rgba(47,111,184,0.08)",
                  borderColor: "#2F6FB8",
                  color: "#2F6FB8",
                }}
                title="Swap units"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            {/* To */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">To</Label>
              <Select value={toUnit} onValueChange={handleToUnitChange}>
                <SelectTrigger
                  data-ocid="converter.select"
                  className="border-border"
                  style={{ borderColor: "#D7DEE6" }}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {category.units.map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                data-ocid="converter.input"
                type="number"
                placeholder="Result"
                value={toValue}
                onChange={(e) => handleToChange(e.target.value)}
                className="text-lg font-semibold"
                style={{
                  borderColor: "#D7DEE6",
                  background: "rgba(47,111,184,0.04)",
                }}
              />
            </div>
          </div>

          {/* Result highlight */}
          {fromValue && toValue && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              data-ocid="converter.success_state"
              className="p-4 rounded-xl text-center"
              style={{
                background: "rgba(47,111,184,0.08)",
                border: "1px solid rgba(47,111,184,0.2)",
              }}
            >
              <p className="text-sm text-muted-foreground mb-1">Conversion</p>
              <p
                className="text-base font-semibold"
                style={{ color: "#1B2430" }}
              >
                <span style={{ color: "#2F6FB8" }}>
                  {fromValue} {fromUnit}
                </span>
                <span className="mx-2 text-muted-foreground">=</span>
                <span style={{ color: "#2F6FB8" }}>
                  {toValue} {toUnit}
                </span>
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
