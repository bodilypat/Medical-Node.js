/* ************************************************************** */
/* File: #src/features/admin/components/doctors/DoctorDetails.jsx */
/* ************************************************************** */

import React from 'react';

const styles = {
	page: { maxWidth: 960, margin: '0 auto', padding: 24, color: '#172033' },
	header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 24 },
	card: { background: '#fff', border: '1px solid #e4e8ef', borderRadius: 12, padding: 24, boxShadow: '0 4px 16px rgba(20,35,60,.05)' },
	button: { border: '1px solid #cbd3df', borderRadius: 7, padding: '9px 14px', background: '#fff', cursor: 'pointer', font: 'inherit' },
	grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20 },
};

const displayValue = (value) => value === undefined || value === null || value === '' ? 'Not provided' : value;

export default function DoctorDetails({ doctor, onBack, onEdit, onDelete }) {
	if (!doctor) {
		return <main style={styles.page}><section style={styles.card} role="status">Doctor details are unavailable.</section></main>;
	}

	const name = doctor.name || [doctor.firstName, doctor.lastName].filter(Boolean).join(' ') || 'Doctor';
	const status = doctor.status || (doctor.isActive === false ? 'Inactive' : 'Active');
	const details = [
		['Email', doctor.email],
		['Phone', doctor.phone || doctor.phoneNumber],
		['Specialization', doctor.specialization || doctor.specialty],
		['License number', doctor.licenseNumber || doctor.license],
		['Department', doctor.department],
		['Experience', doctor.experience ? `${doctor.experience} years` : null],
		['Address', doctor.address],
		['Joined', doctor.createdAt ? new Date(doctor.createdAt).toLocaleDateString() : null],
	];

	return (
		<main style={styles.page}>
			<header style={styles.header}>
				<div>
					<div style={{ color: '#687386', fontSize: 14, marginBottom: 5 }}>Administration / Doctors / Details</div>
					<h1 style={{ margin: 0, fontSize: 26 }}>Doctor details</h1>
				</div>
				<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
					{onBack && <button type="button" style={styles.button} onClick={onBack}>Back</button>}
					{onEdit && <button type="button" style={{ ...styles.button, background: '#2457c5', borderColor: '#2457c5', color: '#fff' }} onClick={() => onEdit(doctor)}>Edit doctor</button>}
					{onDelete && <button type="button" style={{ ...styles.button, color: '#b42318', borderColor: '#f0c5c1' }} onClick={() => onDelete(doctor)}>Delete</button>}
				</div>
			</header>
			<section style={styles.card} aria-labelledby="doctor-name">
				<div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
					{doctor.avatar || doctor.profileImage
						? <img src={doctor.avatar || doctor.profileImage} alt="" style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', background: '#eef2f8' }} />
						: <div aria-hidden="true" style={{ width: 72, height: 72, borderRadius: '50%', background: '#eef2f8', display: 'grid', placeItems: 'center', fontSize: 26 }}>{name.charAt(0).toUpperCase()}</div>}
					<div>
						<h2 id="doctor-name" style={{ margin: '0 0 6px', fontSize: 22 }}>{name}</h2>
						<span style={{ borderRadius: 20, padding: '4px 10px', background: status.toLowerCase() === 'active' ? '#e7f6ed' : '#fff3df', color: status.toLowerCase() === 'active' ? '#18794e' : '#945b00', fontSize: 13 }}>{status}</span>
					</div>
				</div>
				<div style={styles.grid}>
					{details.map(([label, value]) => <div key={label}><div style={{ color: '#687386', fontSize: 13, marginBottom: 5 }}>{label}</div><div style={{ fontWeight: 600, overflowWrap: 'anywhere' }}>{displayValue(value)}</div></div>)}
				</div>
				{doctor.bio && <div style={{ marginTop: 24 }}><div style={{ color: '#687386', fontSize: 13, marginBottom: 5 }}>Biography</div><p style={{ margin: 0, lineHeight: 1.6 }}>{doctor.bio}</p></div>}
			</section>
		</main>
	);
}
