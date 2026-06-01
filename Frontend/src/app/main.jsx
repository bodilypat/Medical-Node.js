//src/app/main.jsx 
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import AppProvider from './context/AppProvider';

import './styles/global.css';
import './styles/variables.css';
import './styles/typography.css';
import './styles/animations.css';
import './styles/utilities.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </React.StrictMode>
);

