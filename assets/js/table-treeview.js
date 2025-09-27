// Enhanced Table Treeview with jQuery integration
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
    
    function initTableTreeview() {
        console.log('🌲 Table treeview loading...');
    
    // Enhanced table treeview functionality
    window.tableTreeview = {
        init: function() {
            console.log('✓ Table treeview initialized');
            
            // Wait for jQuery or use fallback
            this.setupTreeview();
        },
        
        setupTreeview: function() {
            var $ = window.jQuery || window.$;
            
            if (!$) {
                console.warn('jQuery not available for treeview, using vanilla JS');
                this.setupVanillaTreeview();
                return;
            }
            
            // jQuery-based treeview setup
            $(document).ready(function() {
                // Handle expandable rows
                $('.table-treeview .treegrid-expander').on('click', function(e) {
                    e.preventDefault();
                    var $expander = $(this);
                    var $row = $expander.closest('tr');
                    var level = parseInt($row.data('level') || 0);
                    var isExpanded = $expander.hasClass('expanded');
                    
                    if (isExpanded) {
                        // Collapse
                        $expander.removeClass('expanded').addClass('collapsed');
                        $expander.find('i').removeClass('fa-minus').addClass('fa-plus');
                        
                        // Hide child rows
                        $row.nextAll('tr').each(function() {
                            var $childRow = $(this);
                            var childLevel = parseInt($childRow.data('level') || 0);
                            if (childLevel > level) {
                                $childRow.hide();
                                $childRow.find('.treegrid-expander').removeClass('expanded').addClass('collapsed');
                                $childRow.find('.treegrid-expander i').removeClass('fa-minus').addClass('fa-plus');
                            } else {
                                return false; // Stop when we reach same or lower level
                            }
                        });
                    } else {
                        // Expand
                        $expander.removeClass('collapsed').addClass('expanded');
                        $expander.find('i').removeClass('fa-plus').addClass('fa-minus');
                        
                        // Show immediate child rows
                        $row.nextAll('tr').each(function() {
                            var $childRow = $(this);
                            var childLevel = parseInt($childRow.data('level') || 0);
                            if (childLevel === level + 1) {
                                $childRow.show();
                            } else if (childLevel <= level) {
                                return false; // Stop when we reach same or lower level
                            }
                        });
                    }
                });
                
                // Initialize tree state
                $('.table-treeview tr[data-level]').each(function() {
                    var $row = $(this);
                    var level = parseInt($row.data('level') || 0);
                    
                    if (level > 0) {
                        $row.hide(); // Hide child rows initially
                    }
                    
                    // Style based on level
                    var indent = level * 20;
                    $row.find('.treegrid-indent').css('padding-left', indent + 'px');
                });
                
                console.log('✅ jQuery table treeview setup complete');
            });
        },
        
        setupVanillaTreeview: function() {
            // Vanilla JavaScript fallback
            document.addEventListener('DOMContentLoaded', function() {
                var expanders = document.querySelectorAll('.table-treeview .treegrid-expander');
                
                expanders.forEach(function(expander) {
                    expander.addEventListener('click', function(e) {
                        e.preventDefault();
                        
                        var row = expander.closest('tr');
                        var level = parseInt(row.dataset.level || 0);
                        var isExpanded = expander.classList.contains('expanded');
                        
                        if (isExpanded) {
                            // Collapse
                            expander.classList.remove('expanded');
                            expander.classList.add('collapsed');
                            
                            var icon = expander.querySelector('i');
                            if (icon) {
                                icon.classList.remove('fa-minus');
                                icon.classList.add('fa-plus');
                            }
                            
                            // Hide child rows
                            var nextRow = row.nextElementSibling;
                            while (nextRow) {
                                var childLevel = parseInt(nextRow.dataset.level || 0);
                                if (childLevel > level) {
                                    nextRow.style.display = 'none';
                                    var childExpander = nextRow.querySelector('.treegrid-expander');
                                    if (childExpander) {
                                        childExpander.classList.remove('expanded');
                                        childExpander.classList.add('collapsed');
                                        var childIcon = childExpander.querySelector('i');
                                        if (childIcon) {
                                            childIcon.classList.remove('fa-minus');
                                            childIcon.classList.add('fa-plus');
                                        }
                                    }
                                    nextRow = nextRow.nextElementSibling;
                                } else {
                                    break;
                                }
                            }
                        } else {
                            // Expand
                            expander.classList.remove('collapsed');
                            expander.classList.add('expanded');
                            
                            var icon = expander.querySelector('i');
                            if (icon) {
                                icon.classList.remove('fa-plus');
                                icon.classList.add('fa-minus');
                            }
                            
                            // Show immediate child rows
                            var nextRow = row.nextElementSibling;
                            while (nextRow) {
                                var childLevel = parseInt(nextRow.dataset.level || 0);
                                if (childLevel === level + 1) {
                                    nextRow.style.display = '';
                                    nextRow = nextRow.nextElementSibling;
                                } else if (childLevel <= level) {
                                    break;
                                } else {
                                    nextRow = nextRow.nextElementSibling;
                                }
                            }
                        }
                    });
                });
                
                // Initialize tree state
                var rows = document.querySelectorAll('.table-treeview tr[data-level]');
                rows.forEach(function(row) {
                    var level = parseInt(row.dataset.level || 0);
                    
                    if (level > 0) {
                        row.style.display = 'none'; // Hide child rows initially
                    }
                    
                    // Style based on level
                    var indent = level * 20;
                    var indentEl = row.querySelector('.treegrid-indent');
                    if (indentEl) {
                        indentEl.style.paddingLeft = indent + 'px';
                    }
                });
                
                console.log('✅ Vanilla JS table treeview setup complete');
            });
        }
    };
    
    }
    
    // Auto-initialize when jQuery is ready
    waitForjQuery(function() {
        initTableTreeview();
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                if (typeof window.tableTreeview !== 'undefined') {
                    window.tableTreeview.init();
                }
            });
        } else {
            if (typeof window.tableTreeview !== 'undefined') {
                window.tableTreeview.init();
            }
        }
    });
    
})();
