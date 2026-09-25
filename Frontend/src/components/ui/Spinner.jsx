/* ************************************ */
/* File: #src/components/ui/Spinner.jsx */ 
/* ************************************ */

const Spinner = ({ size = 24, className = '', label = 'Loading' }) => (
	<span
		role="status"
		aria-label={label}
		className={`inline-block animate-spin rounded-full border-2 border-current border-r-transparent ${className}`}
		style={{ width: size, height: size }}
	>
		<span className="sr-only">{label}</span>
	</span>
);

export default Spinner;

