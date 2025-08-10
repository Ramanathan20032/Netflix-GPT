import React from 'react';
import { Toaster } from 'react-hot-toast';

const Toast = () => {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                duration: 4000,
                style: {
                    background: '#1e1e1e',
                    color: '#fefefe',
                    fontSize: '16px',
                    fontWeight: '500',
                    padding: '12px 16px',
                    borderRadius: '80px',
                },
                success: {
                    duration: 3000,
                    iconTheme: {
                        primary: '#10B981',
                        secondary: '#fff',
                    },
                },
                error: {
                    duration: 3000,
                    iconTheme: {
                        primary: '#EF4444',
                        secondary: '#fff',
                    },
                },
            }}
        />
    );
};

export default Toast; 