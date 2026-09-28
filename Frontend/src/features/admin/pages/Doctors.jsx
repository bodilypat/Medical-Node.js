/* ******************************************* */
/* File: #src/features/admin/pages/Doctors.jsx */
/* ******************************************* */

import { useMemo, useState } from "react";

const initialDoctors = [];

const emptyDoctor = { name: "", specialty: "", email: "", phone: "", status: "Active" };

export default function Doctors() {
	const [doctors, setDoctors] = useState(initialDoctors);
	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState("All");
	const [form, setForm] = useState(emptyDoctor);
	const [editingId, setEditingId] = useState(null);
	const [isOpen, setIsOpen] = useState(false);

	const results = useMemo(() => doctors.filter((doctor) => {
		const term = search.trim().toLowerCase();
		const matchesSearch = !term || [doctor.name, doctor.specialty, doctor.email, doctor.phone].some((value) => value.toLowerCase().includes(term));
		return matchesSearch && (filter === "All" || doctor.status === filter);
	}), [doctors, search, filter]);

	function addDoctor() {
		setEditingId(null);
		setForm(emptyDoctor);
		setIsOpen(true);
	}

	function editDoctor(doctor) {
		setEditingId(doctor.id);
		setForm({ name: doctor.name, specialty: doctor.specialty, email: doctor.email, phone: doctor.phone, status: doctor.status });
		setIsOpen(true);
	}

	function saveDoctor(event) {
		event.preventDefault();
		const doctor = { ...form, name: form.name.trim(), specialty: form.specialty.trim(), email: form.email.trim(), phone: form.phone.trim() };
		if (editingId === null) setDoctors((list) => [{ id: Date.now(), ...doctor }, ...list]);
		else setDoctors((list) => list.map((item) => item.id === editingId ? { ...item, ...doctor } : item));
		setIsOpen(false);
	}

	function deleteDoctor(id) {
		if (window.confirm("Delete this doctor? This action cannot be undone.")) {
			setDoctors((list) => list.filter((doctor) => doctor.id !== id));
		}
	}

	return (
		<main style={styles.page}>
			<header style={styles.header}>
				<div><p style={styles.eyebrow}>ADMINISTRATION</p><h1 style={styles.title}>Doctors</h1><p style={styles.subtitle}>Manage your medical staff and their details.</p></div>
				<button type="button" style={styles.primaryButton} onClick={addDoctor}>＋ Add doctor</button>
			</header>

			<section style={styles.card} aria-label="Doctor management">
				<div style={styles.toolbar}>
					<div><h2 style={styles.sectionTitle}>Doctor directory</h2><p style={styles.muted}>{doctors.length} registered doctor{doctors.length === 1 ? "" : "s"}</p></div>
					<div style={styles.controls}>
						<label style={styles.searchBox}><span aria-hidden="true">⌕</span><input aria-label="Search doctors" style={styles.searchInput} placeholder="Search doctors..." value={search} onChange={(event) => setSearch(event.target.value)} /></label>
						<select aria-label="Filter by status" style={styles.select} value={filter} onChange={(event) => setFilter(event.target.value)}><option>All</option><option>Active</option><option>On leave</option></select>
					</div>
				</div>
				<div style={styles.tableScroll}><table style={styles.table}>
					<thead><tr>{["Doctor", "Specialty", "Contact", "Status", "Actions"].map((label) => <th key={label} style={styles.th}>{label}</th>)}</tr></thead>
					<tbody>
						{results.map((doctor) => <tr key={doctor.id}>
							<td style={styles.td}><div style={styles.person}><span style={styles.avatar}>{doctor.name.split(" ").filter(Boolean).slice(1).map((part) => part[0]).join("").slice(0, 2)}</span><strong style={styles.name}>{doctor.name}</strong></div></td>
							<td style={styles.td}>{doctor.specialty}</td>
							<td style={styles.td}><a href={`mailto:${doctor.email}`} style={styles.email}>{doctor.email}</a><div style={styles.phone}>{doctor.phone}</div></td>
							<td style={styles.td}><span style={doctor.status === "Active" ? styles.activeBadge : styles.leaveBadge}><i style={styles.dot} />{doctor.status}</span></td>
							<td style={styles.td}><div style={styles.actions}><button type="button" style={styles.actionLink} onClick={() => editDoctor(doctor)}>Edit</button><button type="button" style={styles.deleteLink} onClick={() => deleteDoctor(doctor.id)}>Delete</button></div></td>
						</tr>)}
						{results.length === 0 && <tr><td colSpan="5" style={styles.empty}>No doctors found. Try another search or filter.</td></tr>}
					</tbody>
				</table></div>
				<footer style={styles.footer}>Showing {results.length} of {doctors.length} doctors</footer>
			</section>

			{isOpen && <div style={styles.overlay} onMouseDown={(event) => { if (event.target === event.currentTarget) setIsOpen(false); }}>
				<section role="dialog" aria-modal="true" aria-labelledby="doctor-form-title" style={styles.dialog}>
					<div style={styles.dialogHeader}><div><h2 id="doctor-form-title" style={styles.sectionTitle}>{editingId === null ? "Add doctor" : "Edit doctor"}</h2><p style={styles.muted}>Enter the doctor's information.</p></div><button type="button" aria-label="Close dialog" style={styles.close} onClick={() => setIsOpen(false)}>×</button></div>
					<form onSubmit={saveDoctor}><div style={styles.formGrid}>
						<label style={styles.field}>Full name<input required autoFocus style={styles.input} placeholder="Dr. Alex Morgan" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
						<label style={styles.field}>Specialty<input required style={styles.input} placeholder="Cardiology" value={form.specialty} onChange={(event) => setForm({ ...form, specialty: event.target.value })} /></label>
						<label style={styles.field}>Email<input required type="email" style={styles.input} placeholder="doctor@medicare.com" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
						<label style={styles.field}>Phone<input required style={styles.input} placeholder="+1 (555) 000-0000" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></label>
						<label style={styles.field}>Status<select style={styles.input} value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}><option>Active</option><option>On leave</option></select></label>
					</div><div style={styles.dialogActions}><button type="button" style={styles.secondaryButton} onClick={() => setIsOpen(false)}>Cancel</button><button type="submit" style={styles.primaryButton}>{editingId === null ? "Add doctor" : "Save changes"}</button></div></form>
				</section>
			</div>}
		</main>
	);
}

const styles = {
	page: { minHeight: "100vh", boxSizing: "border-box", padding: "40px clamp(20px, 5vw, 64px)", background: "#f5f7fb", color: "#182230", fontFamily: "Inter, system-ui, -apple-system, sans-serif" },
	header: { maxWidth: 1200, margin: "0 auto 28px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20 },
	eyebrow: { margin: "0 0 8px", color: "#667085", fontSize: 11, fontWeight: 700, letterSpacing: ".12em" }, title: { margin: 0, fontSize: 30, letterSpacing: "-.04em" }, subtitle: { margin: "8px 0 0", color: "#667085", fontSize: 14 },
	card: { maxWidth: 1200, margin: "0 auto", background: "white", border: "1px solid #e6eaf0", borderRadius: 12, boxShadow: "0 2px 8px rgba(16,24,40,.03)" }, toolbar: { padding: "22px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 18, flexWrap: "wrap" }, sectionTitle: { margin: 0, fontSize: 17, fontWeight: 650 }, muted: { margin: "5px 0 0", color: "#7b8494", fontSize: 13 },
	controls: { display: "flex", gap: 10, flexWrap: "wrap" }, searchBox: { height: 38, minWidth: 220, padding: "0 11px", display: "flex", alignItems: "center", gap: 8, border: "1px solid #dfe4ec", borderRadius: 7, color: "#8791a2" }, searchInput: { width: "100%", border: 0, outline: 0, fontSize: 13 }, select: { height: 38, padding: "0 28px 0 11px", border: "1px solid #dfe4ec", borderRadius: 7, background: "white", color: "#344054", fontSize: 13 },
	primaryButton: { border: 0, borderRadius: 7, background: "#2675dc", color: "white", padding: "10px 15px", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }, tableScroll: { overflowX: "auto", borderTop: "1px solid #edf0f4" }, table: { width: "100%", minWidth: 760, borderCollapse: "collapse", textAlign: "left" }, th: { padding: "12px 24px", color: "#7b8494", background: "#fafbfc", fontSize: 11, fontWeight: 650, letterSpacing: ".04em", textTransform: "uppercase" }, td: { padding: "15px 24px", borderTop: "1px solid #edf0f4", color: "#475467", fontSize: 13, verticalAlign: "middle" },
	person: { display: "flex", alignItems: "center", gap: 11 }, avatar: { width: 34, height: 34, borderRadius: "50%", display: "grid", placeItems: "center", color: "#2467bb", background: "#eaf2fc", fontSize: 11, fontWeight: 700, flexShrink: 0 }, name: { color: "#253044", whiteSpace: "nowrap" }, email: { color: "#475467", textDecoration: "none" }, phone: { marginTop: 4, color: "#929aaa", fontSize: 12 }, activeBadge: { display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 9px", borderRadius: 20, color: "#177245", background: "#e9f7ef", fontSize: 12 }, leaveBadge: { display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 9px", borderRadius: 20, color: "#9a6700", background: "#fff5d6", fontSize: 12 }, dot: { width: 6, height: 6, borderRadius: "50%", background: "currentColor" }, actions: { display: "flex", gap: 14 }, actionLink: { border: 0, padding: 0, color: "#2675dc", background: "transparent", fontSize: 13, fontWeight: 600, cursor: "pointer" }, deleteLink: { border: 0, padding: 0, color: "#c33d48", background: "transparent", fontSize: 13, cursor: "pointer" }, empty: { padding: 40, textAlign: "center", color: "#7b8494", fontSize: 13 }, footer: { padding: "14px 24px", borderTop: "1px solid #edf0f4", color: "#7b8494", fontSize: 12 },
	overlay: { position: "fixed", inset: 0, zIndex: 10, display: "grid", placeItems: "center", padding: 20, background: "rgba(16,24,40,.45)" }, dialog: { width: "min(100%, 560px)", boxSizing: "border-box", padding: 24, borderRadius: 12, background: "white", boxShadow: "0 20px 60px rgba(0,0,0,.2)" }, dialogHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }, close: { border: 0, background: "transparent", color: "#667085", fontSize: 24, cursor: "pointer" }, formGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 16 }, field: { display: "grid", gap: 7, color: "#344054", fontSize: 12, fontWeight: 600 }, input: { width: "100%", boxSizing: "border-box", height: 39, padding: "0 11px", border: "1px solid #dfe4ec", borderRadius: 6, outlineColor: "#2675dc", background: "white", color: "#344054", fontSize: 13 }, dialogActions: { display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 }, secondaryButton: { border: "1px solid #dfe4ec", borderRadius: 7, background: "white", color: "#344054", padding: "9px 14px", fontSize: 13, cursor: "pointer" },
};
