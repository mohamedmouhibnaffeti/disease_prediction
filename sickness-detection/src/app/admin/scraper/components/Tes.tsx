import React, { useState } from 'react';

const StopButton: React.FC = () => {


    const stopScraper = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/stop-scraping', { method: 'POST' });
            if (response.ok) {
                // Download the file
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'data.csv';
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
                // Update stop message
                const message = await response.text();
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error stopping scraper:', error);
        }
    };

    return (
        <div>
        </div>
    );
};

export default StopButton;
