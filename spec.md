# MechTools Hub

## Current State
The app has 3 calculators (Stress, Strain, Power) displayed in a 3-column grid, a history panel, auth modal, navbar, hero, and footer. CalculatorCard accepts exactly 2 fields. All UI is in React + TypeScript + Tailwind.

## Requested Changes (Diff)

### Add
- 7 new calculators: Torque (T = F × r), Beam Deflection (δ = FL³/48EI), Fluid Pressure (P = ρgh), Thermal Expansion (ΔL = α × L × ΔT), Kinetic Energy (KE = ½mv²), Reynolds Number (Re = ρvD/μ), Gear Ratio (GR = N2/N1 = T2/T1)
- Full Unit Converter page/section with categories: Length, Mass, Force, Pressure, Temperature, Energy, Power, Velocity, Torque, Volume, Area, Angle
- Navigation tabs or section tabs to switch between "Calculators" and "Unit Converter"

### Modify
- CalculatorCard may need to support more than 2 fields (Beam Deflection needs 4, Reynolds needs 4, Thermal needs 3, Kinetic needs 2)
- App layout: add tab navigation between Calculators and Unit Converter sections
- types.ts: expand HistoryEntry type to support new calculator types

### Remove
- Nothing removed

## Implementation Plan
1. Extend CalculatorCard to support variable number of fields (array of FieldConfig, not just tuple of 2)
2. Update HistoryEntry type to include new calc types
3. Create UnitConverter component with category selector, from/to unit dropdowns, and value input
4. Add tab navigation (Calculators / Unit Converter) in App.tsx
5. Add 7 new CalculatorCard instances in App.tsx with correct formulas
6. Ensure responsive grid layout handles more cards gracefully
