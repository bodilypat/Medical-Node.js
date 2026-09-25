/* *********************************** */
/* File: #src/components/ui/Button.jsx */ 
/* *********************************** */

import { forwardRef } from 'react';

const Button = forwardRef(function Button(
	{ type = 'button', className = '', children, ...props },
	ref,
) {
	return (
		<button ref={ref} type={type} className={className} {...props}>
			{children}
		</button>
	);
});

export default Button;

