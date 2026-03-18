import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { HistoryEntry } from "../types";

export interface FieldConfig {
  id: string;
  label: string;
  placeholder: string;
  unit: string;
}

interface CalculatorCardProps {
  title: string;
  description: string;
  fields: FieldConfig[];
  calculate: (...args: number[]) => number | null;
  resultUnit: string;
  resultLabel: string;
  icon: React.ReactNode;
  delay?: number;
  onResult: (entry: Omit<HistoryEntry, "id" | "timestamp">) => void;
  calcType: HistoryEntry["type"];
}

export function CalculatorCard({
  title,
  description,
  fields,
  calculate,
  resultUnit,
  resultLabel,
  icon,
  delay = 0,
  onResult,
  calcType,
}: CalculatorCardProps) {
  const initialValues = Object.fromEntries(fields.map((f) => [f.id, ""]));
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    const nums = fields.map((f) => Number.parseFloat(values[f.id]));
    if (nums.some((n) => Number.isNaN(n))) {
      setError("Please enter valid numeric values.");
      setResult(null);
      return;
    }
    const res = calculate(...nums);
    if (res === null) {
      setError("Division by zero — please check your inputs.");
      setResult(null);
      return;
    }
    setError(null);
    setResult(res);
    onResult({
      type: calcType,
      inputs: Object.fromEntries(
        fields.map((f) => [f.label, `${values[f.id]} ${f.unit}`]),
      ),
      result: res,
      unit: resultUnit,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      <Card
        className="h-full shadow-card border-border"
        style={{ borderRadius: "12px" }}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(47,111,184,0.1)", color: "#2F6FB8" }}
            >
              {icon}
            </div>
            <div>
              <CardTitle
                className="text-base font-bold"
                style={{ color: "#1B2430" }}
              >
                {title}
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {description}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {fields.map((field) => (
            <div key={field.id} className="space-y-1.5">
              <Label
                htmlFor={`${calcType}-${field.id}`}
                className="text-sm font-medium"
              >
                {field.label}
              </Label>
              <div className="flex">
                <Input
                  id={`${calcType}-${field.id}`}
                  data-ocid={`${calcType.toLowerCase()}.input`}
                  type="number"
                  placeholder={field.placeholder}
                  value={values[field.id]}
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      [field.id]: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
                  className="rounded-r-none border-r-0 text-sm"
                  style={{ borderColor: "#D7DEE6" }}
                />
                <div
                  className="flex items-center px-3 text-xs font-medium rounded-r-md border"
                  style={{
                    background: "#E9EEF3",
                    borderColor: "#D7DEE6",
                    color: "#4A5568",
                    minWidth: "52px",
                    justifyContent: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  {field.unit}
                </div>
              </div>
            </div>
          ))}

          <Button
            data-ocid={`${calcType.toLowerCase()}.primary_button`}
            className="w-full font-semibold tracking-wide text-sm uppercase mt-2"
            style={{ background: "#2F6FB8", color: "white" }}
            onClick={handleCalculate}
          >
            Calculate
          </Button>

          {error && (
            <div
              data-ocid={`${calcType.toLowerCase()}.error_state`}
              className="flex items-center gap-2 p-3 rounded-lg text-sm"
              style={{ background: "rgba(220,38,38,0.07)", color: "#DC2626" }}
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          {result !== null && !error && (
            <motion.div
              data-ocid={`${calcType.toLowerCase()}.success_state`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-between p-3 rounded-lg"
              style={{
                background: "rgba(47,111,184,0.08)",
                border: "1px solid rgba(47,111,184,0.2)",
              }}
            >
              <div
                className="flex items-center gap-2 text-sm font-medium"
                style={{ color: "#2F6FB8" }}
              >
                <CheckCircle2 className="w-4 h-4" />
                {resultLabel}
              </div>
              <div className="flex items-baseline gap-1.5">
                <span
                  className="text-xl font-bold"
                  style={{ color: "#1B2430" }}
                >
                  {result % 1 === 0 ? result.toFixed(0) : result.toPrecision(6)}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {resultUnit}
                </Badge>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
