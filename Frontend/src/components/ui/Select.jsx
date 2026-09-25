/* *********************************** */
/* File: #src/components/ui/Select.jsx */ 
/* *********************************** */

import React from 'react';

const Select = React.forwardRef(function Select(
	{
		options = [],
		value,
		defaultValue,
		onChange,
		placeholder,
		className = '',
		disabled = false,
		id,
		name,
		required = false,
		...props
	},
	ref,
) {
	return (
		<select
			ref={ref}
			id={id}
			name={name}
			value={value}
			defaultValue={defaultValue}
			onChange={onChange}
			disabled={disabled}
			required={required}
			className={className}
			{...props}
		>
			{placeholder && (
				<option value="" disabled>
					{placeholder}
				</option>
			)}
			{options.map((option) => {
				const item = typeof option === 'string' ? { label: option, value: option } : option;
				return (
					<option key={item.value} value={item.value} disabled={item.disabled}>
						{item.label ?? item.value}
					</option>
				);
			})}
		</select>
	);
});

export default Select;

