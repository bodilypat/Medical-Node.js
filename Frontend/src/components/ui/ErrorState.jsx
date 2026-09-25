/* *************************************** */
/* File: #src/components/ui/ErrorState.jsx */ 
/* *************************************** */

import PropTypes from 'prop-types';

/**
 * Displays a consistent error state for failed data requests or page sections.
 */
const ErrorState = ({
	title = 'Something went wrong',
	message = 'We could not load this information. Please try again.',
	onRetry,
}) => (
	<div
		role="alert"
		className="flex flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-6 text-center"
	>
		<div
			aria-hidden="true"
			className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl font-bold text-red-600"
		>
			!
		</div>
		<h2 className="text-lg font-semibold text-red-800">{title}</h2>
		<p className="mt-2 max-w-md text-sm text-red-700">{message}</p>
		{onRetry && (
			<button
				type="button"
				onClick={onRetry}
				className="mt-4 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
			>
				Try again
			</button>
		)}
	</div>
);

ErrorState.propTypes = {
	title: PropTypes.string,
	message: PropTypes.string,
	onRetry: PropTypes.func,
};

export default ErrorState;

