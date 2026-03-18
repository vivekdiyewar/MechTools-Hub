import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, History, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { HistoryEntry } from "../types";

interface HistoryPanelProps {
  history: HistoryEntry[];
  onClear: () => void;
}

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

const typeColors: Record<HistoryEntry["type"], string> = {
  Stress: "#2F6FB8",
  Strain: "#0E8A6D",
  Power: "#7B4FA6",
  Torque: "#C0562A",
  BeamDeflection: "#2A7A6C",
  FluidPressure: "#1E6FA8",
  ThermalExpansion: "#B85A2F",
  KineticEnergy: "#7B4FA6",
  ReynoldsNumber: "#2C7A3E",
  GearRatio: "#5A4A8A",
};

export function HistoryPanel({ history, onClear }: HistoryPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
    >
      <Card
        className="shadow-card border-border"
        style={{ borderRadius: "12px" }}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5" style={{ color: "#2F6FB8" }} />
            <CardTitle
              className="text-base font-bold"
              style={{ color: "#1B2430" }}
            >
              Calculation History
            </CardTitle>
            {history.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {history.length}
              </Badge>
            )}
          </div>
          {history.length > 0 && (
            <Button
              data-ocid="history.delete_button"
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="text-xs text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1" />
              Clear
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
            <div data-ocid="history.empty_state" className="py-12 text-center">
              <Clock
                className="w-10 h-10 mx-auto mb-3"
                style={{ color: "#D7DEE6" }}
              />
              <p className="text-sm text-muted-foreground">
                No calculations yet.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Your results will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <AnimatePresence>
                {history.map((entry, idx) => (
                  <motion.div
                    key={entry.id}
                    data-ocid={`history.item.${idx + 1}`}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.2, delay: idx * 0.03 }}
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{
                      background: "#F8FAFC",
                      border: "1px solid #E6EBF0",
                    }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: typeColors[entry.type] }}
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className="text-xs font-bold uppercase tracking-wide"
                            style={{ color: typeColors[entry.type] }}
                          >
                            {entry.type}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {Object.values(entry.inputs).join(" / ")}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {timeAgo(entry.timestamp)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-1.5 flex-shrink-0 ml-4">
                      <span
                        className="text-sm font-bold"
                        style={{ color: "#1B2430" }}
                      >
                        {entry.result % 1 === 0
                          ? entry.result.toFixed(0)
                          : entry.result.toPrecision(5)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {entry.unit}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
