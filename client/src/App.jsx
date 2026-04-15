import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApplicationForm from './components/ApplicationForm';
import ApplicationList from './components/ApplicationList';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/applications';

function App() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingApp, setEditingApp] = useState(null);
  const [filter, setFilter] = useState('All');

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setApplications(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Could not fetch applications. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleSave = async (formData) => {
    setLoading(true);
    try {
      if (editingApp) {
        await axios.put(`${API_URL}/${editingApp._id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setEditingApp(null);
      await fetchApplications();
    } catch (err) {
      console.error('Error saving application:', err);
      if (err.code === 'ERR_NETWORK') {
        setError('Cannot connect to the backend server. Please check if it is running on port 5000.');
      } else {
        setError(err.response?.data?.message || 'Error saving application. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      setLoading(true);
      try {
        await axios.delete(`${API_URL}/${id}`);
        await fetchApplications();
      } catch (err) {
        console.error('Error deleting application:', err);
        setError('Error deleting application. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1>Placement Tracker</h1>
        <p>Keep track of your job applications in one place.</p>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="content">
        <div className="form-section">
          <ApplicationForm
            onSave={handleSave}
            editingApp={editingApp}
            onCancel={() => setEditingApp(null)}
          />
        </div>

        <div className="list-section">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <ApplicationList
              applications={applications}
              onEdit={(app) => setEditingApp(app)}
              onDelete={handleDelete}
              filter={filter}
              setFilter={setFilter}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
