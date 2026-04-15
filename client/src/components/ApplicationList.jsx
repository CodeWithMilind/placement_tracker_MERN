import React from 'react';

const ApplicationList = ({ applications, onEdit, onDelete, filter, setFilter }) => {
  const filteredApps = filter === 'All'
    ? applications
    : applications.filter((app) => app.status === filter);

  return (
    <div className="application-list">
      <div className="list-header">
        <h2>Your Applications</h2>
        <div className="filter-group">
          <label>Filter by Status:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
              <th>Date Applied</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.length > 0 ? (
              filteredApps.map((app) => (
                <tr key={app._id}>
                  <td>{app.companyName}</td>
                  <td>{app.role}</td>
                  <td>
                    <span className={`status-badge status-${app.status.toLowerCase()}`}>
                      {app.status}
                    </span>
                  </td>
                  <td>{new Date(app.dateApplied).toLocaleDateString()}</td>
                  <td className="actions">
                    <button className="btn-edit" onClick={() => onEdit(app)}>
                      Edit
                    </button>
                    <button className="btn-delete" onClick={() => onDelete(app._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationList;
