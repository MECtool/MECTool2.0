import React from 'react';
import { Form } from 'react-bootstrap';
import { drugs } from '../../data/conversionRates';

export default function DrugSelector({
    label,
    value,
    onChange,
    excludeDrugId = null,
    disabled = false
}) {
    const filteredDrugs = excludeDrugId
        ? drugs.filter(d => d.id !== excludeDrugId)
        : drugs;

    return (
        <Form.Group className="mb-3">
            <Form.Label className="fw-bold text-primary">{label}</Form.Label>
            <Form.Select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                size="lg"
                className="shadow-sm"
            >
                <option value="">-- Select Drug --</option>
                {filteredDrugs.map(drug => (
                    <option key={drug.id} value={drug.id}>
                        {drug.name} {drug.brandNames ? `(${drug.brandNames.join(', ')})` : ''}
                    </option>
                ))}
            </Form.Select>
            {value && (
                <Form.Text className="text-muted d-block mt-2">
                    <strong>Route:</strong> {drugs.find(d => d.id === value)?.route} |
                    <strong> Unit:</strong> {drugs.find(d => d.id === value)?.unit}
                </Form.Text>
            )}
        </Form.Group>
    );
}
