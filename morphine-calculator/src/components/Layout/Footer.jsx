import React from 'react';
import { Container } from 'react-bootstrap';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-light border-top mt-5 py-4">
            <Container>
                <div className="row">
                    <div className="col-md-6 mb-3 mb-md-0">
                        <h6 className="fw-bold text-primary">Important Disclaimer</h6>
                        <p className="small text-muted mb-0">
                            This calculator is a clinical guide and does not replace professional
                            medical judgment. All conversions must be individualized based on patient-specific
                            factors and clinical context.
                        </p>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <h6 className="fw-bold text-primary">Resources</h6>
                        <ul className="list-unstyled small">
                            <li className="mb-1">
                                <a href="https://www.canada.ca/en/health-canada/services/substance-use/problematic-prescription-drug-use/opioids.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-decoration-none">
                                    Health Canada - Opioid Information
                                </a>
                            </li>
                            <li className="mb-1">
                                <a href="https://www.cdc.gov/opioids/hcp/prescribing/clinical-tools.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-decoration-none">
                                    CDC Opioid Prescribing Guidelines
                                </a>
                            </li>
                        </ul>
                        <div className="text-muted small mt-3">
                            © {currentYear} Opioid Conversion Calculator
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
