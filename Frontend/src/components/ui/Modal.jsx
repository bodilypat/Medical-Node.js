/* ********************************** */
/* File: #src/components/ui/Modal.jsx */ 
/* ********************************** */

import { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({
	isOpen = false,
	onClose,
	title,
	children,
	footer,
	size = 'md',
	closeOnOverlayClick = true,
	closeOnEscape = true,
}) {
	const titleId = useId();

	useEffect(() => {
		if (!isOpen) return undefined;

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		const handleKeyDown = (event) => {
			if (event.key === 'Escape' && closeOnEscape) onClose?.();
		};
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.body.style.overflow = previousOverflow;
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, closeOnEscape, onClose]);

	if (!isOpen || typeof document === 'undefined') return null;

	const widths = { sm: '24rem', md: '40rem', lg: '56rem' };
	const handleOverlayClick = (event) => {
		if (closeOnOverlayClick && event.target === event.currentTarget) onClose?.();
	};

	return createPortal(
		<div
			className="modal-overlay"
			onMouseDown={handleOverlayClick}
			style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'grid', placeItems: 'center', padding: '1rem', background: 'rgba(15, 23, 42, 0.55)' }}
		>
			<section
				className={`modal-dialog modal-dialog--${size}`}
				role="dialog"
				aria-modal="true"
				aria-labelledby={title ? titleId : undefined}
				aria-label={title ? undefined : 'Dialog'}
				style={{ width: '100%', maxWidth: widths[size] || widths.md, maxHeight: 'calc(100vh - 2rem)', overflow: 'auto', borderRadius: '0.75rem', background: '#fff', boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)' }}
			>
				{(title || onClose) && (
					<header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1rem 1.25rem', borderBottom: '1px solid #e5e7eb' }}>
						{title && <h2 id={titleId} style={{ margin: 0, fontSize: '1.125rem' }}>{title}</h2>}
						{onClose && <button type="button" onClick={onClose} aria-label="Close dialog" style={{ border: 0, background: 'transparent', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>}
					</header>
				)}
				<div className="modal-content" style={{ padding: '1.25rem' }}>{children}</div>
				{footer && <footer style={{ padding: '1rem 1.25rem', borderTop: '1px solid #e5e7eb' }}>{footer}</footer>}
			</section>
		</div>,
		document.body,
	);
}

