import React from "react";
import "./ServiceItem.css";

const ServiceItem = ({ name, description, price, onEdit, onDelete }) => {
  return (
    <div className="service-item">
      <div className="service-content">
        <h2 className="service-title">{name}</h2>
        <p className="service-description">{description}</p>
        <p className="service-price">Price: ₹{price}</p>
      </div>
      <div className="service-buttons">
        <button className="edit-button" onClick={onEdit}>
          Edit
        </button>
        <button className="delete-button" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ServiceItem;
