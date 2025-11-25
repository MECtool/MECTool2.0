import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

export default function Header() {
    return (
        <Navbar bg="primary" variant="dark" className="shadow-sm py-3">
            <Container>
                <Navbar.Brand className="d-flex align-items-center">
                    <div className="me-3 fs-2">💊</div>
                    <div>
                        <div className="fw-bold fs-4">Opioid Conversion Calculator</div>
                        <small className="text-white-50">For Canadian Methadone Clinics</small>
                    </div>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}
