/* ******************************************* */
/* File: #src/components/navigation/Navbar.jsx */ 
/* ******************************************* */

import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
	["Dashboard", "/dashboard"],
	["Patients", "/patients"],
	["Appointments", "/appointments"],
	["Doctors", "/doctors"],
	["Medicines", "/medicines"],
];

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header className="navbar">
			<NavLink className="navbar__brand" to="/" onClick={() => setMenuOpen(false)}>
				<span className="navbar__brand-icon" aria-hidden="true">+</span>
				<span>Medical Management</span>
			</NavLink>

			<button
				className="navbar__toggle"
				type="button"
				aria-label={menuOpen ? "Close menu" : "Open menu"}
				aria-expanded={menuOpen}
				aria-controls="navbar-links"
				onClick={() => setMenuOpen((open) => !open)}
			>
				<span />
				<span />
				<span />
			</button>

			<nav
				id="navbar-links"
				className={`navbar__links${menuOpen ? " navbar__links--open" : ""}`}
				aria-label="Main navigation"
			>
				{links.map(([label, to]) => (
					<NavLink
						key={to}
						to={to}
						onClick={() => setMenuOpen(false)}
						className={({ isActive }) =>
							`navbar__link${isActive ? " navbar__link--active" : ""}`
						}
					>
						{label}
					</NavLink>
				))}
			</nav>
		</header>
	);
}
