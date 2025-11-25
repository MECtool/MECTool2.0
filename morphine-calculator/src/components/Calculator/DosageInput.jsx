import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { drugs } from '../../data/conversionRates';

export default function DosageInput({
    drugId,
    value,
    onChange,
    disabled = false
}) {
    const drug = drugs.find(d => d.id === drugId);

    if (!drug) {
        return (
            <Form.Group className="mb-3">
                <Form.Label className="fw-bold text-primary">Daily Dose</Form.Label>
                <Form.Control
                    type="number"
                    disabled
                    placeholder="Select a drug first"
                    size="lg"
                />
            </Form.Group>
        );
    }

    const minValue = drug.id === 'methadone' ? 1 : 0.1;

    return (
        <Form.Group className="mb-3">
            <Form.Label className="fw-bold text-primary">
                Daily Dose ({drug.unit})
            </Form.Label>
            <InputGroup size="lg" className="shadow-sm">
                <Form.Control
                    type="number"
                    step="0.1"
                    min={minValue}
                    value={value}
                    onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
                    disabled={disabled}
                    placeholder={`Enter dose in ${drug.unit}`}
                />
                <InputGroup.Text className="bg-light">{drug.unit}</InputGroup.Text>
            </InputGroup>
            {drug.note && (
                <Form.Text className="text-info d-block mt-2">
                    ℹ️ {drug.note}
                </Form.Text>
            )}
            {drug.description && (
                <Form.Text className="text-muted d-block mt-1">
                    {drug.description}
                </Form.Text>
            )}
        </Form.Group>
    );
}
