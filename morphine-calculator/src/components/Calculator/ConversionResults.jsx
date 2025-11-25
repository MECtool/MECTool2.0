import React from 'react';
import { Card, Badge, Alert, Table, ProgressBar } from 'react-bootstrap';

export default function ConversionResults({ result }) {
    if (!result) {
        return (
            <Card className="shadow-lg border-0 mt-4">
                <Card.Body className="text-center py-5">
                    <div className="text-muted">
                        <i className="bi bi-calculator fs-1 d-block mb-3"></i>
                        <p>Enter drug information above to calculate conversion</p>
                    </div>
                </Card.Body>
            </Card>
        );
    }

    if (result.error) {
        return (
            <Alert variant="danger" className="mt-4 shadow-sm">
                <Alert.Heading>❌ Calculation Error</Alert.Heading>
                <p>{result.error}</p>
            </Alert>
        );
    }

    const { safetyLevel, meq, calculatedDose, recommendedDose25, recommendedDose50, breakthroughDoseRange } = result;
    const percentage = Math.min((meq / 200) * 100, 100);

    return (
        <Card className="shadow-lg border-0 mt-4 conversion-results">
            <Card.Header className={`bg-${safetyLevel.color} text-white py-3`}>
                <h4 className="mb-0">
                    <i className="bi bi-patch-check-fill me-2"></i>
                    Conversion Results
                </h4>
            </Card.Header>

            <Card.Body className="p-4">
                {/* MME Display */}
                <div className="text-center mb-4 p-4 bg-light rounded">
                    <h6 className="text-muted mb-2">Morphine Milligram Equivalent (MME)</h6>
                    <div className="display-3 fw-bold text-primary">{meq}</div>
                    <div className="mt-2">
                        <Badge bg={safetyLevel.color} className="px-3 py-2 fs-6">
                            {safetyLevel.label}
                        </Badge>
                    </div>
                    <ProgressBar
                        now={percentage}
                        variant={safetyLevel.color}
                        className="mt-3"
                        style={{ height: '8px' }}
                    />
                    <small className="text-muted d-block mt-2">{safetyLevel.description}</small>
                </div>

                {/* Conversion Details */}
                <Table bordered hover className="mb-4">
                    <tbody>
                        <tr>
                            <td className="fw-bold bg-light">Current Drug</td>
                            <td>{result.fromDrug.name}</td>
                        </tr>
                        <tr>
                            <td className="fw-bold bg-light">Current Dose</td>
                            <td>{result.currentDose} {result.fromDrug.unit}/day</td>
                        </tr>
                        <tr>
                            <td className="fw-bold bg-light">Target Drug</td>
                            <td>{result.toDrug.name}</td>
                        </tr>
                        <tr className="table-warning">
                            <td className="fw-bold">Calculated Dose</td>
                            <td className="fw-bold">{calculatedDose} {result.toDrug.unit}/day</td>
                        </tr>
                        <tr className="table-success">
                            <td className="fw-bold">Recommended (25% reduction)</td>
                            <td className="fw-bold text-success">{recommendedDose25} {result.toDrug.unit}/day</td>
                        </tr>
                        <tr className="table-success">
                            <td className="fw-bold">Recommended (50% reduction)</td>
                            <td className="fw-bold text-success">{recommendedDose50} {result.toDrug.unit}/day</td>
                        </tr>
                        <tr className="table-info">
                            <td className="fw-bold">Breakthrough Dose Range</td>
                            <td>{breakthroughDoseRange.min} - {breakthroughDoseRange.max} {result.toDrug.unit}</td>
                        </tr>
                    </tbody>
                </Table>

                {/* Clinical Notes */}
                <Alert variant="info" className="mb-0">
                    <Alert.Heading className="h6">
                        <i className="bi bi-info-circle-fill me-2"></i>
                        Clinical Guidance
                    </Alert.Heading>
                    <ul className="mb-0 small">
                        <li>Start with the <strong>25-50% reduced dose</strong> to account for incomplete cross-tolerance</li>
                        <li>Titrate gradually based on patient response</li>
                        <li>Monitor closely for signs of over/under-dosing</li>
                        <li>Consider patient-specific factors (age, renal/hepatic function)</li>
                    </ul>
                </Alert>
            </Card.Body>
        </Card>
    );
}
