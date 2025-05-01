export type EnduranceModality = 'run' | 'row' | 'assault_bike';
export type EnduranceLevel = 'principiante' | 'intermedio' | 'avanzado';

export interface EnduranceTargetOption {
  level: EnduranceLevel;
  target: string;          // ej: "5:00"
  targetSec: number;       // ej: 300
  weeksMin: number;
  weeksMax: number;
}

export const enduranceTargets: Record<EnduranceModality, EnduranceTargetOption[]> = {
  run: [
    { level: 'principiante', target: '6:00', targetSec: 360, weeksMin: 2, weeksMax: 4 },
    { level: 'intermedio', target: '5:00', targetSec: 300, weeksMin: 4, weeksMax: 6 },
    { level: 'avanzado', target: '4:00', targetSec: 240, weeksMin: 6, weeksMax: 8 },
  ],
  row: [
    { level: 'principiante', target: '5:00', targetSec: 300, weeksMin: 2, weeksMax: 4 },
    { level: 'intermedio', target: '4:15', targetSec: 255, weeksMin: 4, weeksMax: 6 },
    { level: 'avanzado', target: '3:45', targetSec: 225, weeksMin: 6, weeksMax: 8 },
  ],
  assault_bike: [
    { level: 'principiante', target: '4:30', targetSec: 270, weeksMin: 2, weeksMax: 4 },
    { level: 'intermedio', target: '3:45', targetSec: 225, weeksMin: 4, weeksMax: 6 },
    { level: 'avanzado', target: '3:15', targetSec: 195, weeksMin: 6, weeksMax: 8 },
  ],
};
