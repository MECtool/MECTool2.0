import React from 'react';
import { Alert } from 'react-bootstrap';

export default function SafetyWarnings({ warnings, meq }) {
    if (!warnings || warnings.length === 0) {
        return null;
    }

    const hasHighRisk = meq >= 90;
    const variant = hasHighRisk ? 'danger' : (meq >= 50 ? 'warning' : 'info');

    return (
        <div className="mt-4">
            <Alert variant={variant} className="shadow-sm">
                <Alert.Heading className="h5">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    Safety Warnings & Considerations
                </Alert.Heading>
                <ul className="mb-3">
                    {warnings.map((warning, index) => (
                        <li key={index} className="mb-1">{warning}</li>
                    ))}
                </ul>

                <hr />

                <div className="small">
                    <strong>⚕️ Medical Disclaimer:</strong> This calculator is a clinical guide only
                    and does not replace professional medical judgment. All opioid conversions require
                    individualization based on patient-specific factors, clinical context, and ongoing
                    monitoring. Consult with a pain specialist or addiction medicine specialist for
                    complex cases.
                </div>
            </Alert>

            {hasHighRisk && (
                <Alert variant="danger" className="shadow-sm">
                    <Alert.Heading className="h6">
                        🚨 High-Dose Alert
                    </Alert.Heading>
                    <p className="mb-0">
                        Daily MME ≥90 mg requires careful justification, enhanced patient monitoring,
                        and consideration of specialist consultation per CDC guidelines. Document
                        rationale and obtain informed consent.
                    </p>
                </Alert>
            )}
        </div>
    );
}
