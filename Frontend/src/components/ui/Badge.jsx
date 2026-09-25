/* ********************************** */
/* File: #src/components/ui/Badge.jsx */
/* ********************************** */

const badgeVariants = {
	default: "bg-primary text-primary-foreground hover:bg-primary/80",
	secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
	destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
	outline: "text-foreground",
	success: "bg-emerald-100 text-emerald-800",
	warning: "bg-amber-100 text-amber-800",
};

export function Badge({ variant = "default", className = "", children, ...props }) {
	const styles = badgeVariants[variant] ?? badgeVariants.default;

	return (
		<span
			className={`inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${styles} ${className}`.trim()}
			{...props}
		>
			{children}
		</span>
	);
}

export default Badge;

