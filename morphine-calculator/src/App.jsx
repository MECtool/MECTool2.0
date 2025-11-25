import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import DrugSelector from './components/Calculator/DrugSelector';
import DosageInput from './components/Calculator/DosageInput';
import ConversionResults from './components/Calculator/ConversionResults';
import SafetyWarnings from './components/Calculator/SafetyWarnings';
import { convertDrug, validateConversion } from './utils/calculations';
import './styles/theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [fromDrug, setFromDrug] = useState('');
  const [toDrug, setToDrug] = useState('');
  const [dose, setDose] = useState('');
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState([]);

  const handleCalculate = () => {
    // Validate inputs
    const validation = validateConversion(fromDrug, toDrug, parseFloat(dose));

    if (!validation.isValid) {
      setErrors(validation.errors);
      setResult(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Perform conversion
    const conversionResult = convertDrug(fromDrug, toDrug, parseFloat(dose));
    setResult(conversionResult);
    setErrors([]);

    // Scroll to results
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setFromDrug('');
    setToDrug('');
    setDose('');
    setResult(null);
    setErrors([]);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1 py-5">
        <Container>
          {/* Hero Section */}
          <Card className="shadow-lg border-0 mb-4 medical-gradient">
            <Card.Body className="p-5 text-center">
              <h1 className="display-5 fw-bold text-primary mb-3">
                Opioid Conversion Calculator
              </h1>
              <p className="lead text-muted mb-0">
                Evidence-based morphine milligram equivalent calculations for safe opioid conversions
              </p>
            </Card.Body>
          </Card>

          {/* Error Messages */}
          {errors.length > 0 && (
            <Alert variant="danger" dismissible onClose={() => setErrors([])}>
              <Alert.Heading>Please correct the following errors:</Alert.Heading>
              <ul className="mb-0">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </Alert>
          )}

          {/* Calculator Card */}
          <Row>
            <Col lg={6}>
              <Card className="shadow-lg border-0 mb-4">
                <Card.Header className="bg-primary text-white py-3">
                  <h4 className="mb-0">
                    <i className="bi bi-calculator-fill me-2"></i>
                    Current Medication
                  </h4>
                </Card.Header>
                <Card.Body className="p-4">
                  <DrugSelector
                    label="Current Drug (Converting FROM)"
                    value={fromDrug}
                    onChange={setFromDrug}
                    excludeDrugId={toDrug}
                  />
                  <DosageInput
                    drugId={fromDrug}
                    value={dose}
                    onChange={setDose}
                  />
                </Card.Body>
              </Card>
            </Col>

            <Col lg={6}>
              <Card className="shadow-lg border-0 mb-4">
                <Card.Header className="bg-success text-white py-3">
                  <h4 className="mb-0">
                    <i className="bi bi-arrow-right-circle-fill me-2"></i>
                    Target Medication
                  </h4>
                </Card.Header>
                <Card.Body className="p-4">
                  <DrugSelector
                    label="Target Drug (Converting TO)"
                    value={toDrug}
                    onChange={setToDrug}
                    excludeDrugId={fromDrug}
                  />

                  <div className="d-grid gap-2 mt-4">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleCalculate}
                      disabled={!fromDrug || !toDrug || !dose}
                    >
                      Calculate Conversion
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={handleReset}
                    >
                      Reset Calculator
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Results Section */}
          <div id="results-section">
            <ConversionResults result={result} />
            {result && !result.error && (
              <SafetyWarnings
                warnings={result.warning}
                meq={result.meq}
              />
            )}
          </div>

          {/* Information Cards */}
          <Row className="mt-5">
            <Col md={4} className="mb-3">
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <div className="text-center mb-3">
                    <div className="fs-1">📋</div>
                  </div>
                  <Card.Title className="text-center">Evidence-Based</Card.Title>
                  <Card.Text className="text-muted text-center small">
                    Conversion factors based on current Canadian and international
                    clinical guidelines for safe opioid management.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <div className="text-center mb-3">
                    <div className="fs-1">🛡️</div>
                  </div>
                  <Card.Title className="text-center">Safety First</Card.Title>
                  <Card.Text className="text-muted text-center small">
                    Automatic dose reductions (25-50%) account for incomplete cross-tolerance
                    when switching between opioids.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <div className="text-center mb-3">
                    <div className="fs-1">🎯</div>
                  </div>
                  <Card.Title className="text-center">Clinical Guidance</Card.Title>
                  <Card.Text className="text-muted text-center small">
                    Real-time safety warnings and dosing recommendations help guide
                    clinical decision-making.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>

      <Footer />
    </div>
  );
}

export default App;
