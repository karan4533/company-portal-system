// Enhanced Admin Dashboard JavaScript with comprehensive jQuery support
(function() {
    'use strict';
    
    console.log('🚀 Admin Dashboard app.js loading...');
    
    // Wait for jQuery to be available
    function waitForjQuery(callback) {
        if (typeof window.jQuery !== 'undefined' && typeof window.$ !== 'undefined') {
            callback();
        } else {
            setTimeout(function() { waitForjQuery(callback); }, 50);
        }
    }
    
    // Enhanced jQuery fallback with more methods
    function ensureJQuery() {
        if (typeof window.jQuery === 'undefined' || typeof window.$ === 'undefined') {
            console.log('⚠️ jQuery not found, creating enhanced fallback...');
            
            // Create comprehensive jQuery-like object
            var jQueryFallback = function(selector) {
                if (typeof selector === 'function') {
                    // Document ready handler
                    if (document.readyState === 'loading') {
                        document.addEventListener('DOMContentLoaded', selector);
                    } else {
                        selector();
                    }
                    return jQueryFallback;
                }
                
                // Return fake jQuery object for chaining
                var elements = selector ? document.querySelectorAll(selector) : [];
                
                return {
                    length: elements.length,
                    elements: elements,
                    eq: function(index) { return this; },
                    find: function() { return this; },
                    addClass: function(className) { 
                        Array.from(elements).forEach(el => el.classList.add(className)); 
                        return this; 
                    },
                    removeClass: function(className) { 
                        Array.from(elements).forEach(el => el.classList.remove(className)); 
                        return this; 
                    },
                    toggleClass: function(className) {
                        Array.from(elements).forEach(el => el.classList.toggle(className));
                        return this;
                    },
                    hasClass: function(className) {
                        return elements[0] ? elements[0].classList.contains(className) : false;
                    },
                    hide: function() { 
                        Array.from(elements).forEach(el => el.style.display = 'none'); 
                        return this; 
                    },
                    show: function() { 
                        Array.from(elements).forEach(el => el.style.display = ''); 
                        return this; 
                    },
                    fadeOut: function(callback) {
                        Array.from(elements).forEach(el => {
                            el.style.transition = 'opacity 0.3s';
                            el.style.opacity = '0';
                            setTimeout(() => {
                                el.style.display = 'none';
                                if (callback) callback.call(el);
                            }, 300);
                        });
                        return this;
                    },
                    fadeIn: function() {
                        Array.from(elements).forEach(el => {
                            el.style.display = '';
                            el.style.transition = 'opacity 0.3s';
                            el.style.opacity = '1';
                        });
                        return this;
                    },
                    slideDown: function() {
                        Array.from(elements).forEach(el => {
                            el.style.display = '';
                            el.style.overflow = 'hidden';
                            el.style.height = '0';
                            el.style.transition = 'height 0.3s';
                            setTimeout(() => el.style.height = el.scrollHeight + 'px', 10);
                        });
                        return this;
                    },
                    slideUp: function() {
                        Array.from(elements).forEach(el => {
                            el.style.overflow = 'hidden';
                            el.style.transition = 'height 0.3s';
                            el.style.height = '0';
                            setTimeout(() => el.style.display = 'none', 300);
                        });
                        return this;
                    },
                    toggle: function() {
                        Array.from(elements).forEach(el => {
                            el.style.display = el.style.display === 'none' ? '' : 'none';
                        });
                        return this;
                    },
                    val: function(value) {
                        if (value === undefined) {
                            return elements[0] ? elements[0].value : '';
                        }
                        Array.from(elements).forEach(el => el.value = value);
                        return this;
                    },
                    text: function(text) {
                        if (text === undefined) {
                            return elements[0] ? elements[0].textContent : '';
                        }
                        Array.from(elements).forEach(el => el.textContent = text);
                        return this;
                    },
                    html: function(html) {
                        if (html === undefined) {
                            return elements[0] ? elements[0].innerHTML : '';
                        }
                        Array.from(elements).forEach(el => el.innerHTML = html);
                        return this;
                    },
                    attr: function(attr, value) {
                        if (value === undefined) {
                            return elements[0] ? elements[0].getAttribute(attr) : null;
                        }
                        Array.from(elements).forEach(el => el.setAttribute(attr, value));
                        return this;
                    },
                    data: function(key, value) {
                        if (value === undefined) {
                            return elements[0] ? elements[0].dataset[key] : null;
                        }
                        Array.from(elements).forEach(el => el.dataset[key] = value);
                        return this;
                    },
                    css: function(prop, value) {
                        if (typeof prop === 'object') {
                            Array.from(elements).forEach(el => {
                                Object.keys(prop).forEach(key => {
                                    el.style[key] = prop[key];
                                });
                            });
                        } else if (value !== undefined) {
                            Array.from(elements).forEach(el => el.style[prop] = value);
                        }
                        return this;
                    },
                    on: function(event, handler) {
                        Array.from(elements).forEach(el => el.addEventListener(event, handler));
                        return this;
                    },
                    off: function(event, handler) {
                        Array.from(elements).forEach(el => el.removeEventListener(event, handler));
                        return this;
                    },
                    click: function(handler) {
                        if (handler) {
                            return this.on('click', handler);
                        } else {
                            Array.from(elements).forEach(el => el.click());
                            return this;
                        }
                    },
                    submit: function(handler) {
                        if (handler) {
                            return this.on('submit', handler);
                        } else {
                            Array.from(elements).forEach(el => {
                                if (el.tagName === 'FORM') el.submit();
                            });
                            return this;
                        }
                    },
                    each: function(callback) {
                        Array.from(elements).forEach((el, index) => callback.call(el, index, el));
                        return this;
                    },
                    append: function(content) {
                        Array.from(elements).forEach(el => {
                            if (typeof content === 'string') {
                                el.insertAdjacentHTML('beforeend', content);
                            } else {
                                el.appendChild(content);
                            }
                        });
                        return this;
                    },
                    remove: function() {
                        Array.from(elements).forEach(el => el.remove());
                        return this;
                    },
                    parent: function() {
                        var parents = Array.from(elements).map(el => el.parentElement).filter(Boolean);
                        return jQueryFallback(parents);
                    },
                    next: function() {
                        var nextElements = Array.from(elements).map(el => el.nextElementSibling).filter(Boolean);
                        return jQueryFallback(nextElements);
                    }
                };
            };
            
            // Add static methods
            jQueryFallback.ready = function(fn) {
                if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', fn);
                } else {
                    fn();
                }
            };
            
            jQueryFallback.fn = {};
            
            window.jQuery = window.$ = jQueryFallback;
            console.log('✅ Enhanced jQuery fallback installed');
        }
    }
    
    function initAdminDashboard() {
        console.log('🎯 Initializing admin dashboard...');
        
        // Ensure jQuery is available
        ensureJQuery();
        
        // Wait for backend bundle to be ready before initializing components
        function initializeComponents() {
            // Enhanced form validation with jQuery
            $(document).ready(function() {
                console.log('📋 Setting up form validation...');
            
            // Form validation
            $('form').on('submit', function(e) {
                var form = this;
                var $form = $(form);
                var requiredFields = $form.find('[required]');
                var isValid = true;
                
                requiredFields.each(function() {
                    var $field = $(this);
                    if (!$field.val().trim()) {
                        isValid = false;
                        $field.css('border-color', '#dc3545');
                    } else {
                        $field.css('border-color', '#28a745');
                    }
                });
                
                if (!isValid) {
                    e.preventDefault();
                    alert('Please fill in all required fields');
                    return false;
                }
            });
            
            // Auto-hide alerts
            $('.alert').each(function() {
                var $alert = $(this);
                setTimeout(function() {
                    $alert.fadeOut(function() {
                        $alert.remove();
                    });
                }, 5000);
            });
            
            // Initialize tooltips if present
            $('[data-toggle="tooltip"]').each(function() {
                if (typeof $.fn.tooltip === 'function') {
                    $(this).tooltip();
                } else {
                    console.log('⚠️ Tooltip function not available, waiting for backend bundle...');
                    // Wait a bit longer for backend bundle to load
                    setTimeout(function() {
                        if (typeof $.fn.tooltip === 'function') {
                            $('[data-toggle="tooltip"]').tooltip();
                            console.log('✅ Tooltips initialized after delay');
                        }
                    }, 500);
                }
            });
            
            // Initialize popovers if present
            $('[data-toggle="popover"]').each(function() {
                if (typeof $.fn.popover === 'function') {
                    $(this).popover();
                } else {
                    console.log('⚠️ Popover function not available, waiting for backend bundle...');
                    // Wait a bit longer for backend bundle to load
                    setTimeout(function() {
                        if (typeof $.fn.popover === 'function') {
                            $('[data-toggle="popover"]').popover();
                            console.log('✅ Popovers initialized after delay');
                        }
                    }, 500);
                }
            });
            
            // Handle dropdown toggles
            $(document).on('click', '[data-toggle="dropdown"]', function(e) {
                e.preventDefault();
                var $toggle = $(this);
                var $dropdown = $toggle.next('.dropdown-menu');
                
                // Close other dropdowns
                $('.dropdown-menu').not($dropdown).hide().parent().removeClass('show');
                
                // Toggle current dropdown
                $dropdown.toggle();
                $toggle.parent().toggleClass('show');
            });
            
            // Close dropdowns when clicking outside
            $(document).on('click', function(e) {
                if (!$(e.target).closest('.dropdown').length) {
                    $('.dropdown-menu').hide();
                    $('.dropdown').removeClass('show');
                }
            });
            
            // Handle modal triggers
            $(document).on('click', '[data-toggle="modal"]', function(e) {
                e.preventDefault();
                var target = $(this).attr('data-target') || $(this).attr('href');
                if (target && $(target).length) {
                    if (typeof $.fn.modal === 'function') {
                        $(target).modal('show');
                    } else {
                        $(target).show().addClass('show');
                        $('body').addClass('modal-open');
                    }
                }
            });
            
            // Handle modal close
            $(document).on('click', '[data-dismiss="modal"]', function(e) {
                e.preventDefault();
                var $modal = $(this).closest('.modal');
                if (typeof $.fn.modal === 'function') {
                    $modal.modal('hide');
                } else {
                    $modal.hide().removeClass('show');
                    $('body').removeClass('modal-open');
                }
            });
            
            console.log('✅ Admin dashboard initialization complete');
        });
        
        } // End of initializeComponents
        
        // Check if backend bundle is ready, if not wait for it
        if (typeof window.backendBundleReady !== 'undefined' && window.backendBundleReady) {
            initializeComponents();
        } else {
            console.log('⏳ Waiting for backend bundle to be ready...');
            window.addEventListener('backendBundleReady', function() {
                console.log('✅ Backend bundle ready, initializing components...');
                initializeComponents();
            });
            
            // Fallback: initialize after a delay even if event doesn't fire
            setTimeout(function() {
                if (!window.backendBundleReady) {
                    console.log('⚠️ Backend bundle event timeout, initializing anyway...');
                    initializeComponents();
                }
            }, 1000);
        }
    }
    
    // Initialize admin dashboard when jQuery is ready
    waitForjQuery(function() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initAdminDashboard);
        } else {
            initAdminDashboard();
        }
    });
    
})()
