// src/components/uiComponents.js
import React from 'react';

export const Badge = ({ children, variant, className }) => (
  <span className={`badge badge-${variant} ${className}`}>{children}</span>
);

export const Button = ({ children, onClick, className }) => (
  <button onClick={onClick} className={`button ${className}`}>
    {children}
  </button>
);

export const Card = ({ children, className }) => (
  <div className={`card ${className}`}>{children}</div>
);

export const CardContent = ({ children, className }) => (
  <div className={`card-content ${className}`}>{children}</div>
);

export const CardHeader = ({ children, className }) => (
  <div className={`card-header ${className}`}>{children}</div>
);
