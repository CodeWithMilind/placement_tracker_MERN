import React, { useState, useEffect } from 'react';

const ApplicationForm = ({ onSave, editingApp, onCancel }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    role: '',
    status: 'Applied',
    dateApplied: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (editingApp) {
      setFormData({
        ...editingApp,
        dateApplied: new Date(editingApp.dateApplied).toISOString().split('T')[0],
      });
    } else {
      setFormData({
        companyName: '',
        role: '',
        status: 'Applied',
        dateApplied: new Date().toISOString().split('T')[0],
      });
    }
  }, [editingApp]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    if (!editingApp) {
      setFormData({
        companyName: '',
        role: '',
        status: 'Applied',
        dateApplied: new Date().toISOString().split('T')[0],
      });
    }
  };

  return (
    <form className="application-form" onSubmit={handleSubmit}>
      <h2>{editingApp ? 'Update' : 'Add New'} Application</h2>
      <div className="form-group">
        <label>Company Name</label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Role</label>
        <input
          type="text"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Selected">Selected</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <div className="form-group">
        <label>Date Applied</label>
        <input
          type="date"
          name="dateApplied"
          value={formData.dateApplied}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-submit">
          {editingApp ? 'Update' : 'Add'}
        </button>
        {editingApp && (
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ApplicationForm;
