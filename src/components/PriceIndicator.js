import React from 'react';
import './PriceIndicator.css';

const PriceIndicator = ({ price, readOnly = false, onPriceChange, size = 'medium' }) => {
  const priceOptions = [
    { value: '€1-€10', label: '€', level: 1 },
    { value: '€10-€25', label: '€€', level: 2 },
    { value: '€25-€50', label: '€€€', level: 3 },
    { value: '€50-€100', label: '€€€€', level: 4 },
    { value: '€100+', label: '€€€€€', level: 5 }
  ];

  const handleChange = (event) => {
    if (onPriceChange) {
      onPriceChange(event.target.value);
    }
  };

  if (readOnly) {
    const selectedOption = priceOptions.find(option => option.value === price);
    return (
      <div className={`price-indicator ${size} read-only`}>
        <span className="price-symbols">
          {selectedOption ? selectedOption.label : '€'}
        </span>
        <span className="price-range">
          {selectedOption ? selectedOption.value : price}
        </span>
      </div>
    );
  }

  return (
    <div className={`price-indicator ${size}`}>
      <select 
        value={price || ''} 
        onChange={handleChange}
        className="price-select"
      >
        <option value="">Select price range</option>
        {priceOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label} - {option.value}
          </option>
        ))}
      </select>
      {price && (
        <div className="price-preview">
          <span className="price-symbols">
            {priceOptions.find(opt => opt.value === price)?.label}
          </span>
          <span className="price-range">{price}</span>
        </div>
      )}
    </div>
  );
};

export default PriceIndicator;
