export const ISIO_BRAND = {
  name: 'Isio',
  fullName: 'Isio — Web Agency',
  email: 'contact@isio.ro',
  website: 'isio.ro',
  // Admin fills these in via a settings page or they're hardcoded for now
  address: '',
  cui: '',
  iban: '',
  bankName: '',
} as const;

export const BRAND_COLORS = {
  primary: [59, 130, 246] as [number, number, number],     // blue-500
  dark: [30, 30, 30] as [number, number, number],          // near-black
  gray: [107, 114, 128] as [number, number, number],       // gray-500
  lightGray: [243, 244, 246] as [number, number, number],  // gray-100
  white: [255, 255, 255] as [number, number, number],
  red: [220, 38, 38] as [number, number, number],          // red-600
  green: [22, 163, 74] as [number, number, number],        // green-600
  yellow: [202, 138, 4] as [number, number, number],       // yellow-600
} as const;
