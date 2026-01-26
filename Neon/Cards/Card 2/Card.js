document.addEventListener('DOMContentLoaded', function() {
    const card = document.getElementById('card');
    const cardHeader = document.getElementById('cardHeader');
    const expandBtn = document.getElementById('expandBtn');
    const icon = expandBtn.querySelector('i');
    
    // Toggle card expansion on header click
    cardHeader.addEventListener('click', function() {
        card.classList.toggle('expanded');
        
        // Toggle between plus-circle and x-circle icons
        if (card.classList.contains('expanded')) {
            icon.classList.remove('ph-plus-circle');
            icon.classList.add('ph-x-circle');
        } else {
            icon.classList.remove('ph-x-circle');
            icon.classList.add('ph-plus-circle');
        }
    });
    
    // Also allow clicking just the button
    expandBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        card.classList.toggle('expanded');
        
        // Toggle between plus-circle and x-circle icons
        if (card.classList.contains('expanded')) {
            icon.classList.remove('ph-plus-circle');
            icon.classList.add('ph-x-circle');
        } else {
            icon.classList.remove('ph-x-circle');
            icon.classList.add('ph-plus-circle');
        }
    });
});