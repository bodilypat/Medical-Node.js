/* ********************************** */
/* File: #src/components/ui/Input.jsx */ 
/* ********************************** */

import { forwardRef } from "react";

const Input = forwardRef(function Input(
	{ className = "", type = "text", ...props },
	ref,
) {
	return (
		<input
			ref={ref}
			type={type}
			className={`input ${className}`.trim()}
			{...props}
		/>
	);
});

export default Input;


