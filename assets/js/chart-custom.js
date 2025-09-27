// Custom Charts Fallback
(function() {
    'use strict';
    
    window.initCharts = function() {
        console.log('Charts initialized');
    };
    
    document.addEventListener('DOMContentLoaded', function() {
        if (typeof window.initCharts === 'function') {
            window.initCharts();
        }
    });
})();
