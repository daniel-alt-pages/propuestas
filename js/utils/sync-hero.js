/**
 * Syncs Hero data from localStorage to index.html elements
 */
document.addEventListener('DOMContentLoaded', () => {
    const data = localStorage.getItem('sg-admin-data');
    if (!data) return; // No custom data saved yet
    
    try {
        const parsedData = JSON.parse(data);
        
        // --- 1. HERO SECTION ---
        if (parsedData.hero) {
            const heroData = parsedData.hero;
            
            // Badge
            const badgeEl = document.querySelector('.hero-badge .badge-text');
            if (badgeEl && heroData.badge) badgeEl.textContent = heroData.badge;
            
            // Titles (using typical selectors for the hero text)
            const titleEl = document.querySelector('.hero-title');
            if (titleEl && (heroData.title1 || heroData.title2)) {
                titleEl.innerHTML = `${heroData.title1}<br><span class="text-gradient">${heroData.title2}</span>`;
            }
            
            const subtitleEl = document.querySelector('.hero-subtitle');
            if (subtitleEl && heroData.subtitle) subtitleEl.textContent = heroData.subtitle;
            
            const descEl = document.querySelector('.hero-description');
            if (descEl && heroData.desc) descEl.textContent = heroData.desc;
        }

    } catch (e) {
        console.error('Error synchronizing hero local data:', e);
    }
});
