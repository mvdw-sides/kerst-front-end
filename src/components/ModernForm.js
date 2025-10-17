import React, { useState } from 'react';
import StarRating from './StarRating';
import PriceIndicator from './PriceIndicator';
import './ModernForm.css';

const ModernForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    product: initialData.product || '',
    link: initialData.link || '',
    price: initialData.price || '',
    factor: initialData.factor || 0
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.product.trim()) {
      onSubmit(formData);
      // Reset form
      setFormData({
        product: '',
        link: '',
        price: '',
        factor: 0
      });
    }
  };

  return (
    <form className="modern-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="product" className="form-label">
          Wat wil je graag hebben? *
        </label>
        <input
          type="text"
          id="product"
          className="form-input"
          value={formData.product}
          onChange={(e) => handleInputChange('product', e.target.value)}
          placeholder="Beschrijf wat je graag wilt hebben..."
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="link" className="form-label">
          Link (optioneel)
        </label>
        <input
          type="url"
          id="link"
          className="form-input"
          value={formData.link}
          onChange={(e) => handleInputChange('link', e.target.value)}
          placeholder="https://..."
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          Prijsklasse
        </label>
        <PriceIndicator
          price={formData.price}
          onPriceChange={(value) => handleInputChange('price', value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">
          Hoe graag wil je dit hebben?
        </label>
        <div className="rating-container">
          <StarRating
            rating={formData.factor}
            onRatingChange={(rating) => handleInputChange('factor', rating)}
          />
          <div className="rating-help">
            <span className="help-text">⭐ = niet zo belangrijk</span>
            <span className="help-text">⭐⭐⭐⭐⭐ = super graag!</span>
          </div>
        </div>
      </div>

      <button type="submit" className="submit-button">
        <span className="button-icon">✨</span>
        Toevoegen aan mijn lijstje
      </button>
    </form>
  );
};

export default ModernForm;
