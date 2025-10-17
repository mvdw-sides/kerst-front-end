import React from 'react';
import StarRating from './StarRating';
import PriceIndicator from './PriceIndicator';
import './ModernTable.css';

const ModernTable = ({ items, onPurchase, showPurchaseButton = false, showRequester = false, title = 'Jouw wenslijstje' }) => {
  if (!items || items.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🎁</div>
        <h3>{title} is nog leeg</h3>
        <p>Voeg je eerste wens toe om te beginnen! ✨</p>
      </div>
    );
  }

  return (
    <div className="modern-table-container">
      <div className="table-header">
        <h3>{title}</h3>
        <span className="item-count">{items.length} item{items.length !== 1 ? 's' : ''}</span>
      </div>
      
      {/* Desktop table */}
      <div className="table-wrapper">
        <table className="modern-table">
          <thead>
            <tr>
              {showRequester && <th>Aangevraagd door</th>}
              <th>Product</th>
              <th>Link</th>
              <th>Prijs</th>
              <th>Prioriteit</th>
              {showPurchaseButton && <th>Actie</th>}
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} className="table-row">
                {showRequester && (
                  <td className="requester-cell">
                    <div className="requester">
                      <div 
                        className="requester-img" 
                        style={{ 
                          backgroundImage: `url(${item.__user?.image})`, 
                          borderColor: item.__user?.color || '#e5e7eb'
                        }}
                      />
                      <span className="requester-name" style={{ color: item.__user?.color || '#374151' }}>
                        {item.__user?.name || '-'}
                      </span>
                    </div>
                  </td>
                )}
                <td className="product-cell">
                  <div className="product-info">
                    <span className="product-name">{item.product}</span>
                  </div>
                </td>
                <td className="link-cell">
                  {item.link ? (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="link-button"
                    >
                      🔗 Bekijk
                    </a>
                  ) : (
                    <span className="no-link">-</span>
                  )}
                </td>
                <td className="price-cell">
                  <PriceIndicator 
                    price={item.price} 
                    readOnly={true} 
                    size="small"
                  />
                </td>
                <td className="rating-cell">
                  <StarRating 
                    rating={parseInt(item.factor) || 0} 
                    readOnly={true} 
                    size="small"
                  />
                </td>
                {showPurchaseButton && (
                  <td className="action-cell">
                    <button 
                      className="purchase-button"
                      onClick={() => {
                        if (window.confirm('Weet je zeker dat je dit als gekocht wilt melden?')) {
                          onPurchase(item._id);
                        }
                      }}
                    >
                      Meld als gekocht
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="mobile-cards">
        {items.map((item, idx) => (
          <div key={idx} className="mobile-card">
            {showRequester && (
              <div className="mobile-card-header">
                <div 
                  className="mobile-card-avatar" 
                  style={{ 
                    backgroundImage: `url(${item.__user?.image})`, 
                    borderColor: item.__user?.color || '#e5e7eb'
                  }}
                />
                <span className="mobile-card-name" style={{ color: item.__user?.color || '#374151' }}>
                  {item.__user?.name || '-'}
                </span>
              </div>
            )}
            <div className="mobile-card-product">{item.product}</div>
            <div className="mobile-card-details">
              <div className="mobile-card-price">
                <PriceIndicator 
                  price={item.price} 
                  readOnly={true} 
                  size="small"
                />
              </div>
              <div className="mobile-card-rating">
                <StarRating 
                  rating={parseInt(item.factor) || 0} 
                  readOnly={true} 
                  size="small"
                />
              </div>
            </div>
            <div className="mobile-card-actions">
              {item.link && (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mobile-card-link"
                >
                  🔗 Bekijk
                </a>
              )}
              {showPurchaseButton && (
                <button 
                  className="mobile-card-purchase"
                  onClick={() => {
                    if (window.confirm('Weet je zeker dat je dit als gekocht wilt melden?')) {
                      onPurchase(item._id);
                    }
                  }}
                >
                  Meld als gekocht
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModernTable;
