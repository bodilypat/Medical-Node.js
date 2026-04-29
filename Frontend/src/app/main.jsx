//src/app/main.jsx 

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

/* Global styles */
import "../assets/styles/global.css";

/* Optional: Error Boundary (recommended for production) */
import ErrorBoundary from "../components/feedback/ErrorBoundary";

ReactDOM.createRoot(document.getElementById("root")).rendary(
    <React.StrictMode>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </React.StrictMode>
);

