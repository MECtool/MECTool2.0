/**
 * Opioid Conversion Data for Canadian Methadone Clinics
 * Based on user-provided conversion rates
 */

export const drugs = [
  {
    id: 'morphine-oral',
    name: 'Morphine (Oral)',
    displayName: 'Morphine',
    route: 'Oral',
    unit: 'mg',
    conversionFactor: 1.0,
    isReference: true,
    description: 'Reference standard for opioid conversions',
    formula: 'MEQ = morphine × 1',
  },
  {
    id: 'hydromorphone-oral',
    name: 'Hydromorphone (Oral)',
    displayName: 'Hydromorphone',
    route: 'Oral',
    unit: 'mg',
    conversionFactor: 4.0,
    description: 'Oral Hydromorphone to Oral Morphine ratio is 1:4',
    formula: 'MEQ = hydromorphone × 4',
    brandNames: ['Dilaudid'],
  },
  {
    id: 'hydromorphone-iv',
    name: 'Hydromorphone (IV)',
    displayName: 'Hydromorphone',
    route: 'IV',
    unit: 'mg',
    conversionFactor: 5.0,
    description: 'IV Hydromorphone to Oral Morphine ratio is 1:5',
    formula: 'MEQ = hydromorphone × 5',
    brandNames: ['Dilaudid'],
  },
  {
    id: 'kadian',
    name: 'Kadian (Morphine SR)',
    displayName: 'Kadian',
    route: 'Oral',
    unit: 'mg',
    conversionFactor: 1.0,
    description: 'Morphine Sulfate Extended-Release - 1:1 conversion to Oral Morphine',
    formula: 'MEQ = kadian × 1',
    brandNames: ['MS Contin', 'M-Eslon'],
  },
  {
    id: 'methadone',
    name: 'Methadone',
    displayName: 'Methadone',
    route: 'Oral',
    unit: 'mg',
    specialConversion: 'dose-dependent',
    description: 'Uses dose-dependent conversion factor',
    formula: 'MEQ = methadone × factor',
    note: 'Conversion ratio varies by current methadone dose. Requires clinical judgment.',
    warningLevel: 'high',
  },
  {
    id: 'fentanyl',
    name: 'Fentanyl',
    displayName: 'Fentanyl',
    route: 'Transdermal/IV',
    unit: 'mg',
    conversionFactor: 4.0,
    description: 'Fentanyl to Oral Morphine ratio is 1:4',
    formula: 'MEQ = fentanyl × 4',
    note: 'For transdermal patches, use mcg/hr dose',
    warningLevel: 'high',
  },
  {
    id: 'oxycodone',
    name: 'Oxycodone',
    displayName: 'Oxycodone',
    route: 'Oral',
    unit: 'mg',
    conversionFactor: 1.5,
    description: 'Oxycodone to Oral Morphine ratio is 1:1.5',
    formula: 'MEQ = oxycodone × 1.5',
    brandNames: ['OxyContin', 'OxyNEO'],
  },
  {
    id: 'sufentanil',
    name: 'Sufentanil',
    displayName: 'Sufentanil',
    route: 'IV',
    unit: 'μg',
    conversionFactor: 3.0,
    description: '1 mcg of Sufentanil is equivalent to 3 mg of Oral Morphine',
    formula: 'MEQ = sufentanil × 3',
    note: 'Dose entered in micrograms (μg)',
    warningLevel: 'high',
  },
];

/**
 * Methadone dose-dependent conversion factors
 * Based on standard clinical guidelines
 */
export const methadoneConversionTable = [
  { minDose: 1, maxDose: 20, factor: 4 },
  { minDose: 21, maxDose: 40, factor: 8 },
  { minDose: 41, maxDose: 60, factor: 10 },
  { minDose: 61, maxDose: 80, factor: 12 },
  { minDose: 81, maxDose: Infinity, factor: 15 },
];

/**
 * Safety thresholds for Morphine Milligram Equivalents (MME)
 * Based on CDC and Canadian guidelines
 */
export const safetyThresholds = {
  low: { max: 50, label: 'Low Risk', color: 'success', description: 'Standard monitoring recommended' },
  moderate: { max: 90, label: 'Moderate Risk', color: 'warning', description: 'Increased monitoring and caution advised' },
  high: { max: 200, label: 'High Risk', color: 'danger', description: 'Specialist consultation recommended' },
  critical: { max: Infinity, label: 'Critical Risk', color: 'danger', description: 'Immediate specialist consultation required' },
};
