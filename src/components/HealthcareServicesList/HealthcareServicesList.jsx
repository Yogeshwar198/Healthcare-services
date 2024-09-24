import React, { useState } from 'react';
import ServiceItem from '../ServiceItem/ServiceItem';
import './HealthcareServicesList.css'; // Import external CSS

const HealthcareServicesList = () => {
  const [services, setServices] = useState([
    {
      name: 'General Consultation',
      description: 'A comprehensive consultation with a general physician to assess your overall health.',
      price: 100,
    },
    {
      name: 'Blood Test',
      description: 'Basic blood tests to monitor general health markers such as blood sugar, cholesterol, and more.',
      price: 50,
    },
    {
      name: 'MRI Scan',
      description: 'Magnetic Resonance Imaging (MRI) scan to help diagnose and monitor various medical conditions.',
      price: 500,
    },
    {
      name: 'Physiotherapy Session',
      description: 'Therapeutic sessions to help recover from injury, surgery, or manage chronic pain.',
      price: 75,
    },
  ]);

  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      const updatedServices = services.map((service, index) =>
        index === editingIndex ? { ...newService, price: parseFloat(newService.price) } : service
      );
      setServices(updatedServices);
      setIsEditing(false);
    } else {
      setServices([...services, { ...newService, price: parseFloat(newService.price) }]);
    }

    setNewService({
      name: '',
      description: '',
      price: '',
    });
  };

  const handleEdit = (index) => {
    const serviceToEdit = services[index];
    setNewService(serviceToEdit);
    setIsEditing(true);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedServices = services.filter((_, serviceIndex) => serviceIndex !== index);
    setServices(updatedServices);
  };

  return (
    <div className="container">
      <h1 className="title">Healthcare Services</h1>

      {/* Form to add or update a service */}
      <div className="form-container">
        <h2 className="form-title">{isEditing ? 'Update Service' : 'Add New Service'}</h2>
        <form onSubmit={handleFormSubmit} className="service-form">
          <div className="form-group">
            <label htmlFor="name">Service Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newService.name}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter service name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={newService.description}
              onChange={handleInputChange}
              className="form-input"
              rows="3"
              placeholder="Enter description"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={newService.price}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter price"
              required
            />
          </div>
          <button type="submit" className={`submit-button ${isEditing ? 'edit-mode' : ''}`}>
            {isEditing ? 'Update Service' : 'Add Service'}
          </button>
        </form>
      </div>

      {/* List of services */}
      <div className="services-list">
        {services.map((service, index) => (
          <ServiceItem
            key={index}
            name={service.name}
            description={service.description}
            price={service.price}
            onEdit={() => handleEdit(index)}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HealthcareServicesList;
