export const colors = {
  brand: {
    primary: '#B6006C', // AEON signature magenta
    primaryDark: '#8F0055',
    primaryLight: '#D81B88',
    subtle: '#FDF2F8',
    gradientStart: '#B6006C',
    gradientEnd: '#6B0040',
  },
  financial: {
    credit: '#059669', // Money in / incoming / profit (Emerald)
    creditSoft: '#ECFDF5',
    creditBorder: '#A7F3D0',
    debit: '#E11D48', // Money out / outgoing / payment (Rose)
    debitSoft: '#FFF1F2',
    debitBorder: '#FECDD3',
    neutral: '#475569',
  },
  bg: {
    root: '#F8FAFC', // Slate 50
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',
    muted: '#F1F5F9', // Slate 100
    hero: '#111827', // Dark navy / midnight header
    cardDark: '#1E293B',
  },
  text: {
    primary: '#0F172A', // Slate 900
    secondary: '#475569', // Slate 600
    muted: '#94A3B8', // Slate 400
    inverse: '#FFFFFF',
    inverseMuted: '#CBD5E1',
    brand: '#B6006C',
  },
  border: {
    subtle: '#E2E8F0', // Slate 200
    default: '#CBD5E1', // Slate 300
    brand: '#B6006C',
  },
  status: {
    success: '#059669',
    successBg: '#ECFDF5',
    pending: '#D97706',
    pendingBg: '#FEF3C7',
    failed: '#DC2626',
    failedBg: '#FEF2F2',
  },
} as const;

export type ColorTokens = typeof colors;
