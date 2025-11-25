import { drugs, methadoneConversionTable, safetyThresholds } from '../data/conversionRates';

/**
 * Calculate Morphine Milligram Equivalent (MEQ/MME) for a given drug and dose
 * @param {string} drugId - Drug identifier
 * @param {number} dose - Daily dose amount
 * @returns {object} - Calculation result with MEQ and details
 */
export function calculateMME(drugId, dose) {
    if (!dose || dose <= 0) {
        return { meq: 0, error: 'Dose must be greater than 0' };
    }

    const drug = drugs.find(d => d.id === drugId);
    if (!drug) {
        return { meq: 0, error: 'Drug not found' };
    }

    // Handle methadone special case
    if (drug.specialConversion === 'dose-dependent') {
        return calculateMethadoneMME(dose);
    }

    // Standard conversion
    const meq = dose * drug.conversionFactor;

    return {
        meq: Math.round(meq * 10) / 10, // Round to 1 decimal place
        drug: drug,
        dose: dose,
        formula: drug.formula,
        conversionFactor: drug.conversionFactor,
    };
}

/**
 * Calculate MME for methadone using dose-dependent conversion
 * @param {number} methadoneDose - Daily methadone dose
 * @returns {object} - Calculation result
 */
export function calculateMethadoneMME(methadoneDose) {
    if (methadoneDose < 1) {
        return { meq: 0, error: 'Methadone dose must be at least 1 mg' };
    }

    // Find appropriate conversion factor
    const conversionRule = methadoneConversionTable.find(
        rule => methadoneDose >= rule.minDose && methadoneDose <= rule.maxDose
    );

    if (!conversionRule) {
        return { meq: 0, error: 'Unable to determine conversion factor' };
    }

    const meq = methadoneDose * conversionRule.factor;
    const drug = drugs.find(d => d.id === 'methadone');

    return {
        meq: Math.round(meq * 10) / 10,
        drug: drug,
        dose: methadoneDose,
        conversionFactor: conversionRule.factor,
        formula: `MEQ = ${methadoneDose} × ${conversionRule.factor}`,
        doseRange: `${conversionRule.minDose}-${conversionRule.maxDose === Infinity ? '∞' : conversionRule.maxDose} mg`,
        warning: 'Methadone conversion requires clinical judgment due to complex pharmacokinetics',
    };
}

/**
 * Convert from one opioid to another
 * @param {string} fromDrugId - Source drug
 * @param {string} toDrugId - Target drug
 * @param {number} currentDose - Current daily dose
 * @returns {object} - Conversion result
 */
export function convertDrug(fromDrugId, toDrugId, currentDose) {
    // First, convert to morphine equivalent
    const meqResult = calculateMME(fromDrugId, currentDose);

    if (meqResult.error) {
        return { error: meqResult.error };
    }

    const toDrug = drugs.find(d => d.id === toDrugId);
    if (!toDrug) {
        return { error: 'Target drug not found' };
    }

    // Convert from MEQ to target drug
    let targetDose;
    if (toDrug.specialConversion === 'dose-dependent') {
        return {
            error: 'Cannot automatically convert TO methadone due to dose-dependent factors. Clinical consultation required.',
            meq: meqResult.meq,
        };
    } else {
        targetDose = meqResult.meq / toDrug.conversionFactor;
    }

    // Apply incomplete cross-tolerance reduction (25-50% reduction recommended)
    const reducedDose25 = targetDose * 0.75;
    const reducedDose50 = targetDose * 0.50;

    // Calculate breakthrough dose (1/6 to 1/10 of total daily dose)
    const breakthroughMin = targetDose / 10;
    const breakthroughMax = targetDose / 6;

    return {
        fromDrug: meqResult.drug,
        toDrug: toDrug,
        currentDose: currentDose,
        meq: meqResult.meq,
        calculatedDose: Math.round(targetDose * 10) / 10,
        recommendedDose25: Math.round(reducedDose25 * 10) / 10,
        recommendedDose50: Math.round(reducedDose50 * 10) / 10,
        breakthroughDoseRange: {
            min: Math.round(breakthroughMin * 10) / 10,
            max: Math.round(breakthroughMax * 10) / 10,
        },
        safetyLevel: getSafetyLevel(meqResult.meq),
        warning: getConversionWarnings(meqResult.drug, toDrug, meqResult.meq),
    };
}

/**
 * Get safety level based on MME value
 * @param {number} meq - Morphine Milligram Equivalent
 * @returns {object} - Safety level details
 */
export function getSafetyLevel(meq) {
    if (meq <= safetyThresholds.low.max) {
        return { ...safetyThresholds.low, value: meq };
    } else if (meq <= safetyThresholds.moderate.max) {
        return { ...safetyThresholds.moderate, value: meq };
    } else if (meq <= safetyThresholds.high.max) {
        return { ...safetyThresholds.high, value: meq };
    } else {
        return { ...safetyThresholds.critical, value: meq };
    }
}

/**
 * Generate warnings for specific drug conversions
 * @param {object} fromDrug - Source drug
 * @param {object} toDrug - Target drug
 * @param {number} meq - Calculated MEQ
 * @returns {array} - Array of warning messages
 */
export function getConversionWarnings(fromDrug, toDrug, meq) {
    const warnings = [];

    // High-risk drugs
    const highRiskDrugs = ['methadone', 'fentanyl', 'sufentanil'];
    if (highRiskDrugs.includes(fromDrug.id) || highRiskDrugs.includes(toDrug.id)) {
        warnings.push('⚠️ High-risk conversion: Methadone and fentanyl require specialist oversight');
    }

    // High MEQ warnings
    if (meq >= 90) {
        warnings.push('⚠️ Daily MME ≥90: CDC guidelines recommend careful justification and specialist consultation');
    } else if (meq >= 50) {
        warnings.push('⚠️ Daily MME ≥50: Increased monitoring recommended');
    }

    // Incomplete cross-tolerance
    warnings.push('✓ Apply 25-50% dose reduction when switching opioids to account for incomplete cross-tolerance');

    // Benzodiazepine warning
    warnings.push('⚠️ Avoid concurrent benzodiazepine prescriptions when possible');

    return warnings;
}

/**
 * Validate conversion inputs
 * @param {string} fromDrugId - Source drug
 * @param {string} toDrugId - Target drug
 * @param {number} dose - Dose amount
 * @returns {object} - Validation result
 */
export function validateConversion(fromDrugId, toDrugId, dose) {
    const errors = [];

    if (!fromDrugId) {
        errors.push('Please select a source drug');
    }

    if (!toDrugId) {
        errors.push('Please select a target drug');
    }

    if (fromDrugId === toDrugId) {
        errors.push('Source and target drugs must be different');
    }

    if (!dose || dose <= 0) {
        errors.push('Dose must be greater than 0');
    }

    const fromDrug = drugs.find(d => d.id === fromDrugId);
    if (fromDrug?.id === 'methadone' && dose < 1) {
        errors.push('Methadone dose must be at least 1 mg');
    }

    return {
        isValid: errors.length === 0,
        errors: errors,
    };
}
