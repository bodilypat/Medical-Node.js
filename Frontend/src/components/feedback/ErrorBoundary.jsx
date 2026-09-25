/* ************************************************ */
/* File: #src/components/feedback/ErrorBoundary.jsx */
/* ************************************************ */

import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    if (process.env.NODE_ENV !== 'production') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      const { fallback, fallbackTitle = 'Something went wrong.' } = this.props;

      if (fallback) {
        if (typeof fallback === 'function') {
          return fallback(this.state.error, this.resetErrorBoundary);
        }

        return fallback;
      }

      return (
        <div
          role="alert"
          style={{
            padding: '20px',
            margin: '16px 0',
            border: '1px solid #f5c2c7',
            borderRadius: '8px',
            backgroundColor: '#f8d7da',
            color: '#842029',
            fontFamily: 'Arial, sans-serif',
          }}
        >
          <h3 style={{ margin: '0 0 8px' }}>{fallbackTitle}</h3>
          <p style={{ margin: '0 0 12px' }}>
            Please refresh the page or try again later.
          </p>

          {process.env.NODE_ENV !== 'production' && this.state.error && (
            <pre
              style={{
                whiteSpace: 'pre-wrap',
                margin: 0,
                fontSize: '12px',
                overflowX: 'auto',
              }}
            >
              {this.state.error.toString()}
            </pre>
          )}

          <button
            type="button"
            onClick={this.resetErrorBoundary}
            style={{
              marginTop: '12px',
              padding: '8px 12px',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: '#842029',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
