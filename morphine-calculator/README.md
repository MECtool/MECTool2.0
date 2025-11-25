# Opioid Conversion Calculator

A sophisticated, medical-themed web application for calculating opioid conversion rates and morphine milligram equivalents (MME) for methadone clinics across Canada.

## Features

- 🧮 **Evidence-Based Calculations**: Accurate MME calculations using current clinical guidelines
- 💊 **Comprehensive Drug Database**: Supports hydromorphone, methadone, fentanyl, oxycodone, sufentanil, and more
- ⚠️ **Safety Warnings**: Real-time safety alerts based on MME thresholds (≥50, ≥90 mg/day)
- 🎯 **Dose Reduction Recommendations**: Automatic 25-50% reductions for incomplete cross-tolerance
- 📊 **Visual Safety Indicators**: Color-coded risk levels (green, orange, red)
- 🏥 **Medical Theme**: Professional, accessible design optimized for clinical use
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Technology Stack

- **React 18** - Modern component-based UI
- **Vite** - Fast development and optimized builds
- **React Bootstrap** - Responsive components and styling
- **Bootstrap 5** - Professional medical theme

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

This application is configured for free deployment on **Vercel**:

1. Push code to GitHub repository
2. Import project in Vercel dashboard
3. Deploy automatically (zero configuration needed)

## Clinical Guidelines

Conversion factors and safety thresholds are based on:
- CDC Clinical Practice Guideline for Prescribing Opioids for Pain
- Health Canada opioid prescribing guidelines
- Canadian pain management best practices

## Disclaimer

This calculator is a clinical guide only and does not replace professional medical judgment. All opioid conversions must be individualized based on patient-specific factors, clinical context, and ongoing monitoring.

## License

For use by Canadian methadone clinics and healthcare providers.
