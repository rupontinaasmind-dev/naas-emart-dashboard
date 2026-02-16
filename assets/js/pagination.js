$(document).ready(function() {
    const itemsPerPage = 10;
    let currentPage = 1;
    const totalItems = 200; // Total number of orders
    
    // Generate more sample data for demonstration
    function generateSampleData() {
        const tbody = $('.orders-table tbody');
        const sampleNames = ['Alex Johnson', 'Maria Garcia', 'James Wilson', 'Jennifer Lee', 'Michael Brown', 
                            'Sarah Davis', 'Robert Miller', 'Linda Anderson', 'William Taylor', 'Patricia Thomas',
                            'Christopher Jackson', 'Barbara White', 'Daniel Harris', 'Susan Martin', 'Matthew Thompson',
                            'Jessica Garcia', 'Joseph Martinez', 'Karen Robinson', 'Thomas Clark', 'Nancy Rodriguez'];
        
        const statuses = ['Pending', 'Confirmed', 'Processing', 'Ready for delivery', 'Item on the way', 'Delivered'];
        const statusClasses = ['pending', 'confirmed', 'processing', 'ready', 'on-way', 'delivered'];
        
        tbody.empty();
        
        for (let i = 1; i <= totalItems; i++) {
            const randomName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
            const randomStatusIndex = Math.floor(Math.random() * statuses.length);
            const randomStatus = statuses[randomStatusIndex];
            const randomStatusClass = statusClasses[randomStatusIndex];
            const randomQuantity = Math.floor(Math.random() * 10) + 1;
            const randomAmount = (Math.random() * 300 + 20).toFixed(2);
            const randomDay = Math.floor(Math.random() * 28) + 1;
            const randomMonth = Math.floor(Math.random() * 2) + 1; // Feb or Jan
            const monthText = randomMonth === 1 ? 'Jan' : 'Feb';
            
            const row = `
                <tr>
                    <td>${i}</td>
                    <td>#ORD${String(i).padStart(3, '0')}</td>
                    <td>${randomDay} ${monthText} 2026</td>
                    <td>
                        <div class="customer-info">
                            <div class="customer-name">${randomName}</div>
                            <div class="customer-phone">+${Math.floor(Math.random() * 9000000000) + 1000000000}</div>
                        </div>
                    </td>
                    <td>${randomQuantity}</td>
                    <td>
                        <div class="amount-info">
                            <div class="amount">$${randomAmount}</div>
                            <div class="paid-status">paid</div>
                        </div>
                    </td>
                    <td>
                        <span class="status-badge ${randomStatusClass}">${randomStatus}</span>
                    </td>
                    <td>
                        <button class="action-btn">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                    </td>
                </tr>
            `;
            tbody.append(row);
        }
    }
    
    // Initialize with sample data
    generateSampleData();
    
    function showPage(page) {
        const rows = $('.orders-table tbody tr');
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        
        // Hide all rows immediately
        rows.hide();
        
        // Show new rows with animation
        const newRows = rows.slice(startIndex, endIndex);
        newRows.css({
            'opacity': '0',
            'transform': 'translateY(-30px)',
            'transition': 'all 0.4s ease-out'
        }).show();
        
        // Animate to normal position
        setTimeout(() => {
            newRows.css({
                'opacity': '1',
                'transform': 'translateY(0)'
            });
        }, 50);
        
        updatePaginationInfo(page);
        updatePaginationControls(page);
    }
    
    function updatePaginationInfo(page) {
        const startIndex = (page - 1) * itemsPerPage + 1;
        const endIndex = Math.min(page * itemsPerPage, totalItems);
        $('.item-count').text(`${startIndex}-${endIndex} of ${totalItems} items`);
    }
    
    function updatePaginationControls(page) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const paginationControls = $('.pagination-controls');
        
        // Remove only page number buttons (keep the first and last - the arrows)
        paginationControls.find('.pagination-btn').slice(1, -1).remove();
        
        // Determine which page numbers to show
        let startPage = Math.max(1, page - 2);
        let endPage = Math.min(totalPages, startPage + 4);
        
        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }
        
        // Add page number buttons before the right arrow
        for (let i = startPage; i <= endPage; i++) {
            const button = $(`<button class="pagination-btn">${i}</button>`);
            if (i === page) {
                button.addClass('active');
            }
            paginationControls.find('.pagination-btn:last').before(button);
        }
        
        // Disable left arrow on first page
        $('.pagination-btn:first').prop('disabled', page === 1);
        
        // Disable right arrow on last page
        $('.pagination-btn:last').prop('disabled', page === totalPages);
    }
    
    // Initial page display
    showPage(1);
    
    // Pagination button click handlers
    $('.pagination-controls').on('click', '.pagination-btn', function() {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        
        // Check if it's the left arrow (has chevron-left icon)
        if ($(this).find('.fa-chevron-left').length > 0) {
            // Left arrow - go to previous page
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
            }
        }
        // Check if it's the right arrow (has chevron-right icon)
        else if ($(this).find('.fa-chevron-right').length > 0) {
            // Right arrow - go to next page
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage);
            }
        }
        // Check if it's a page number button
        else {
            // Page number button - go to that page
            const pageNum = parseInt($(this).text());
            if (!isNaN(pageNum)) {
                currentPage = pageNum;
                showPage(currentPage);
            }
        }
    });
    
    // Items per page change functionality
    $('.pagination-info span:first').text(`${itemsPerPage} items per page`);
});
