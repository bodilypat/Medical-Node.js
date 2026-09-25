/* ********************************* */
/* File: #src/components/ui/Card.jsx */
/* ********************************* */

import React from "react";

function Card({ title, children, className = "", ...props }) {
	return (
		<div
			className={`rounded-lg border border-gray-200 bg-white p-5 shadow-sm ${className}`.trim()}
			{...props}
		>
			{title ? (
				<h2 className="mb-4 text-lg font-semibold text-gray-900">{title}</h2>
			) : null}
			{children}
		</div>
	);
}

export default Card;
