/* ************************************* */
/* File: #src/components/ui/Skeleton.jsx */ 
/* ************************************* */

import React from "react";

/** Placeholder shown while content is loading. */
export default function Skeleton({ className = "", ...props }) {
	return (
		<div
			aria-hidden="true"
			className={`animate-pulse rounded-md bg-gray-200 ${className}`.trim()}
			{...props}
		/>
	);
}


