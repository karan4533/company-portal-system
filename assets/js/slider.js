// Enhanced Slider with jQuery integration
(function() {
    'use strict';
    
    // Wait for jQuery to be available
    function waitForjQuery(callback) {
        if (typeof window.jQuery !== 'undefined' && typeof window.$ !== 'undefined') {
            callback();
        } else {
            setTimeout(function() { waitForjQuery(callback); }, 50);
        }
    }
    
    function initSlider() {
        console.log('🎚️ Slider functionality loading...');
    
    // Enhanced slider functionality
    window.initSliders = function() {
        var $ = window.jQuery || window.$;
        
        if ($) {
            setupJQuerySliders();
        } else {
            setupVanillaSliders();
        }
    };
    
    function setupJQuerySliders() {
        $(document).ready(function() {
            console.log('🎯 Setting up jQuery sliders...');
            
            // Range sliders
            $('input[type="range"]').each(function() {
                var $slider = $(this);
                var $output = $slider.siblings('.slider-value');
                
                // Update display value
                function updateValue() {
                    var value = $slider.val();
                    if ($output.length) {
                        $output.text(value);
                    }
                    
                    // Update progress bar if present
                    var min = parseFloat($slider.attr('min') || 0);
                    var max = parseFloat($slider.attr('max') || 100);
                    var percent = ((value - min) / (max - min)) * 100;
                    
                    $slider.css('background', 
                        'linear-gradient(to right, #007bff 0%, #007bff ' + percent + '%, #e9ecef ' + percent + '%, #e9ecef 100%)'
                    );
                }
                
                // Initialize
                updateValue();
                
                // Handle input events
                $slider.on('input change', updateValue);
            });
            
            // Bootstrap carousel alternative
            $('.carousel').each(function() {
                var $carousel = $(this);
                var $indicators = $carousel.find('.carousel-indicators li');
                var $items = $carousel.find('.carousel-item');
                var currentIndex = 0;
                
                function showSlide(index) {
                    $items.removeClass('active');
                    $indicators.removeClass('active');
                    
                    $($items[index]).addClass('active');
                    $($indicators[index]).addClass('active');
                    
                    currentIndex = index;
                }
                
                // Previous button
                $carousel.find('.carousel-control-prev').on('click', function(e) {
                    e.preventDefault();
                    var prevIndex = currentIndex > 0 ? currentIndex - 1 : $items.length - 1;
                    showSlide(prevIndex);
                });
                
                // Next button
                $carousel.find('.carousel-control-next').on('click', function(e) {
                    e.preventDefault();
                    var nextIndex = currentIndex < $items.length - 1 ? currentIndex + 1 : 0;
                    showSlide(nextIndex);
                });
                
                // Indicators
                $indicators.on('click', function(e) {
                    e.preventDefault();
                    var index = $(this).index();
                    showSlide(index);
                });
                
                // Auto-play if data-ride="carousel"
                if ($carousel.data('ride') === 'carousel') {
                    var interval = parseInt($carousel.data('interval') || 5000);
                    setInterval(function() {
                        var nextIndex = currentIndex < $items.length - 1 ? currentIndex + 1 : 0;
                        showSlide(nextIndex);
                    }, interval);
                }
            });
            
            // Custom slider components
            $('.custom-slider').each(function() {
                var $slider = $(this);
                var $track = $slider.find('.slider-track');
                var $thumb = $slider.find('.slider-thumb');
                var $fill = $slider.find('.slider-fill');
                
                var min = parseFloat($slider.data('min') || 0);
                var max = parseFloat($slider.data('max') || 100);
                var value = parseFloat($slider.data('value') || min);
                
                function updateSlider(newValue) {
                    var percent = ((newValue - min) / (max - min)) * 100;
                    $thumb.css('left', percent + '%');
                    $fill.css('width', percent + '%');
                    $slider.data('value', newValue);
                    $slider.trigger('slider:change', [newValue]);
                }
                
                // Initialize
                updateSlider(value);
                
                // Handle mouse interactions
                var isDragging = false;
                
                $thumb.on('mousedown', function(e) {
                    isDragging = true;
                    e.preventDefault();
                });
                
                $(document).on('mousemove', function(e) {
                    if (!isDragging) return;
                    
                    var rect = $track[0].getBoundingClientRect();
                    var percent = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                    var newValue = min + (percent / 100) * (max - min);
                    
                    updateSlider(newValue);
                });
                
                $(document).on('mouseup', function() {
                    isDragging = false;
                });
                
                // Handle track clicks
                $track.on('click', function(e) {
                    var rect = this.getBoundingClientRect();
                    var percent = ((e.clientX - rect.left) / rect.width) * 100;
                    var newValue = min + (percent / 100) * (max - min);
                    updateSlider(newValue);
                });
            });
            
            console.log('✅ jQuery sliders initialized');
        });
    }
    
    function setupVanillaSliders() {
        document.addEventListener('DOMContentLoaded', function() {
            console.log('🎯 Setting up vanilla JS sliders...');
            
            // Range sliders
            var sliders = document.querySelectorAll('input[type="range"]');
            sliders.forEach(function(slider) {
                var output = slider.nextElementSibling;
                if (output && output.classList.contains('slider-value')) {
                    
                    function updateValue() {
                        var value = slider.value;
                        output.textContent = value;
                        
                        // Update progress bar
                        var min = parseFloat(slider.min || 0);
                        var max = parseFloat(slider.max || 100);
                        var percent = ((value - min) / (max - min)) * 100;
                        
                        slider.style.background = 
                            'linear-gradient(to right, #007bff 0%, #007bff ' + percent + '%, #e9ecef ' + percent + '%, #e9ecef 100%)';
                    }
                    
                    // Initialize
                    updateValue();
                    
                    // Handle events
                    slider.addEventListener('input', updateValue);
                    slider.addEventListener('change', updateValue);
                }
            });
            
            // Bootstrap carousel alternative
            var carousels = document.querySelectorAll('.carousel');
            carousels.forEach(function(carousel) {
                var indicators = carousel.querySelectorAll('.carousel-indicators li');
                var items = carousel.querySelectorAll('.carousel-item');
                var currentIndex = 0;
                
                function showSlide(index) {
                    items.forEach(function(item) { item.classList.remove('active'); });
                    indicators.forEach(function(indicator) { indicator.classList.remove('active'); });
                    
                    if (items[index]) items[index].classList.add('active');
                    if (indicators[index]) indicators[index].classList.add('active');
                    
                    currentIndex = index;
                }
                
                // Previous button
                var prevBtn = carousel.querySelector('.carousel-control-prev');
                if (prevBtn) {
                    prevBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        var prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
                        showSlide(prevIndex);
                    });
                }
                
                // Next button
                var nextBtn = carousel.querySelector('.carousel-control-next');
                if (nextBtn) {
                    nextBtn.addEventListener('click', function(e) {
                        e.preventDefault();
                        var nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
                        showSlide(nextIndex);
                    });
                }
                
                // Indicators
                indicators.forEach(function(indicator, index) {
                    indicator.addEventListener('click', function(e) {
                        e.preventDefault();
                        showSlide(index);
                    });
                });
                
                // Auto-play
                if (carousel.dataset.ride === 'carousel') {
                    var interval = parseInt(carousel.dataset.interval || 5000);
                    setInterval(function() {
                        var nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
                        showSlide(nextIndex);
                    }, interval);
                }
            });
            
            console.log('✅ Vanilla JS sliders initialized');
        });
    }
    
    }
    
    // Auto-initialize when jQuery is ready
    waitForjQuery(function() {
        initSlider();
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                if (typeof window.initSliders === 'function') {
                    window.initSliders();
                }
            });
        } else {
            if (typeof window.initSliders === 'function') {
                window.initSliders();
            }
        }
    });
    
})();
