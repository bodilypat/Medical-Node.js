/* ************************************************************************ */
/* File: #src/features/doctors/components/prescriptions/MedicineRecords.jsx */
/* ************************************************************************ */

import React, { useMemo, useState } from 'react';

const emptyForm = {
  patientName: '',
  doctorName: '',
  medicineName: '',
  dosage: '',
  frequency: '',
  duration: '',
  status: 'Active',
  notes: '',
};

export default function MedicineRecords() {
  const [records, setRecords] = useState(initialRecords);
  const [formData, setFormData] = useState(emptyForm);

  const stats = useMemo(() => {
    const total = records.length;
    const active = records.filter((record) => record.status === 'Active').length;
    const pending = records.filter((record) => record.status === 'Pending').length;
    const completed = records.filter((record) => record.status === 'Completed').length;

    return { total, active, pending, completed };
  }, [records]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { patientName, doctorName, medicineName, dosage, frequency, duration, status, notes } = formData;

    if (!patientName || !doctorName || !medicineName || !dosage || !frequency || !duration) {
      alert('Please fill in all required prescription details.');
      return;
    }

    const newRecord = {
      id: Date.now(),
      patientName,
      doctorName,
      medicineName,
      dosage,
      frequency,
      duration,
      status: status || 'Active',
      date: new Date().toISOString().split('T')[0],
      notes: notes || 'No extra notes',
    };

    setRecords((prev) => [newRecord, ...prev]);
    setFormData(emptyForm);
  };

  const handleDelete = (id) => {
    setRecords((prev) => prev.filter((record) => record.id !== id));
  };

  return (
    <div style={styles.page}>
      <div style={styles.headerRow}>
        <div>
          <p style={styles.eyebrow}>Doctor Management</p>
          <h2 style={styles.title}>Prescription Records</h2>
        </div>
        <button style={styles.primaryButton} type="button">+ New Prescription</button>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Total</span>
          <strong style={styles.statValue}>{stats.total}</strong>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Active</span>
          <strong style={styles.statValue}>{stats.active}</strong>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Pending</span>
          <strong style={styles.statValue}>{stats.pending}</strong>
        </div>
        <div style={styles.statCard}>
          <span style={styles.statLabel}>Completed</span>
          <strong style={styles.statValue}>{stats.completed}</strong>
        </div>
      </div>

      <div style={styles.contentGrid}>
        <form onSubmit={handleSubmit} style={styles.formCard}>
          <h3 style={styles.sectionTitle}>Add Prescription</h3>

          <div style={styles.formGrid}>
            <label style={styles.field}>
              <span>Patient Name</span>
              <input
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                placeholder="Enter patient name"
                style={styles.input}
              />
            </label>

            <label style={styles.field}>
              <span>Doctor Name</span>
              <input
                name="doctorName"
                value={formData.doctorName}
                onChange={handleChange}
                placeholder="Enter doctor name"
                style={styles.input}
              />
            </label>

            <label style={styles.field}>
              <span>Medicine</span>
              <input
                name="medicineName"
                value={formData.medicineName}
                onChange={handleChange}
                placeholder="Medication name"
                style={styles.input}
              />
            </label>

            <label style={styles.field}>
              <span>Dosage</span>
              <input
                name="dosage"
                value={formData.dosage}
                onChange={handleChange}
                placeholder="500mg"
                style={styles.input}
              />
            </label>

            <label style={styles.field}>
              <span>Frequency</span>
              <input
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                placeholder="Twice daily"
                style={styles.input}
              />
            </label>

            <label style={styles.field}>
              <span>Duration</span>
              <input
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="7 days"
                style={styles.input}
              />
            </label>

            <label style={styles.field}>
              <span>Status</span>
              <select name="status" value={formData.status} onChange={handleChange} style={styles.input}>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </label>

            <label style={{ ...styles.field, gridColumn: '1 / -1' }}>
              <span>Notes</span>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any special instructions"
                rows={4}
                style={{ ...styles.input, resize: 'vertical' }}
              />
            </label>
          </div>

          <div style={styles.actionRow}>
            <button type="button" style={styles.secondaryButton} onClick={() => setFormData(emptyForm)}>
              Clear
            </button>
            <button type="submit" style={styles.primaryButton}>
              Save Prescription
            </button>
          </div>
        </form>

        <div style={styles.tableCard}>
          <h3 style={styles.sectionTitle}>Recent Prescriptions</h3>
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Patient</th>
                  <th style={styles.th}>Medicine</th>
                  <th style={styles.th}>Dosage</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    <td style={styles.td}>{record.patientName}</td>
                    <td style={styles.td}>{record.medicineName}</td>
                    <td style={styles.td}>{record.dosage}</td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.statusBadge,
                          background:
                            record.status === 'Active'
                              ? '#e0f7ea'
                              : record.status === 'Pending'
                              ? '#fff4d6'
                              : '#e5e7eb',
                          color:
                            record.status === 'Active'
                              ? '#166534'
                              : record.status === 'Pending'
                              ? '#92400e'
                              : '#374151',
                        }}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td style={styles.td}>{record.date}</td>
                    <td style={styles.td}>
                      <button type="button" style={styles.deleteButton} onClick={() => handleDelete(record.id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: '28px',
    background: '#f3f6fb',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, sans-serif',
    color: '#1f2937',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
    gap: '16px',
    flexWrap: 'wrap',
  },
  eyebrow: {
    margin: '0 0 6px',
    fontSize: '12px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#3b82f6',
    fontWeight: 700,
  },
  title: {
    margin: 0,
    fontSize: '30px',
    color: '#111827',
  },
  primaryButton: {
    border: 'none',
    background: '#2563eb',
    color: '#fff',
    borderRadius: '10px',
    padding: '12px 18px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 600,
    boxShadow: '0 8px 20px rgba(37, 99, 235, 0.18)',
  },
  secondaryButton: {
    border: '1px solid #d1d5db',
    background: '#fff',
    color: '#374151',
    borderRadius: '10px',
    padding: '12px 18px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 600,
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '16px',
    marginBottom: '22px',
  },
  statCard: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '14px',
    padding: '18px 16px',
    boxShadow: '0 8px 18px rgba(15, 23, 42, 0.04)',
  },
  statLabel: {
    display: 'block',
    fontSize: '12px',
    color: '#6b7280',
    marginBottom: '8px',
  },
  statValue: {
    fontSize: '28px',
    color: '#111827',
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(320px, 430px) minmax(0, 1fr)',
    gap: '22px',
    alignItems: 'start',
  },
  formCard: {
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 8px 18px rgba(15, 23, 42, 0.04)',
  },
  tableCard: {
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 8px 18px rgba(15, 23, 42, 0.04)',
  },
  sectionTitle: {
    margin: '0 0 16px',
    fontSize: '20px',
    color: '#111827',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '14px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    color: '#374151',
    fontSize: '13px',
    fontWeight: 600,
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '10px',
    fontSize: '14px',
    background: '#fff',
    color: '#111827',
    boxSizing: 'border-box',
  },
  actionRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    marginTop: '18px',
  },
  tableWrap: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '600px',
  },
  th: {
    textAlign: 'left',
    padding: '12px 10px',
    borderBottom: '1px solid #e5e7eb',
    fontSize: '12px',
    textTransform: 'uppercase',
    color: '#6b7280',
  },
  td: {
    padding: '12px 10px',
    borderBottom: '1px solid #f1f5f9',
    fontSize: '14px',
    color: '#374151',
  },
  statusBadge: {
    display: 'inline-block',
    padding: '6px 10px',
    borderRadius: '999px',
    fontSize: '12px',
    fontWeight: 700,
  },
  deleteButton: {
    border: 'none',
    background: '#fee2e2',
    color: '#b91c1c',
    borderRadius: '8px',
    padding: '7px 10px',
    cursor: 'pointer',
    fontWeight: 600,
  },
};
