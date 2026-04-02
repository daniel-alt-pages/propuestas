import { db } from "../core/firebase-config.js";
import { collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

function setText(selector, value) {
    if (!value && value !== 0) return;
    const el = document.querySelector(selector);
    if (el) el.textContent = value;
}

function applyCMSData(data) {
    // ─── HERO ───
    if (data.hero) {
        const h = data.hero;
        setText('#hero-badge', h.badge);
        setText('#hero-title1', h.titleLine1);
        // Note: index.html has hero-title1 and hero-title2 inside hero-title-wrapper -> h1 
        // Or wait, does index.html have titleLine2 mapping inside stats?
        setText('#hero-title2', h.titleLine2);
        
        if (h.subtitle) {
            const subEl = document.getElementById('hero-subtitle');
            if (subEl) subEl.innerHTML = h.subtitle;
        }
        if (h.description) {
            const descEl = document.getElementById('hero-desc');
            if (descEl) descEl.innerHTML = h.description;
        }
        
        if (h.cta1Text) {
            const cta1 = document.getElementById('hero-cta1');
            if (cta1) {
                cta1.innerHTML = h.cta1Text + (h.cta1Price ? ` <span class="price-tag">${h.cta1Price}</span>` : '');
            }
        }
        if (h.cta2Text) {
            const cta2 = document.getElementById('hero-cta2');
            if (cta2) {
                const svgPart = cta2.querySelector('svg')?.outerHTML || '';
                cta2.innerHTML = svgPart + ' ' + h.cta2Text;
            }
        }
        
        setText('#live-count', h.liveCount);
        
        if (h.countdownTitle) {
            const cdHeader = document.querySelector('.exam-countdown-header h3');
            if (cdHeader) cdHeader.textContent = h.countdownTitle;
        }
    }
    
    // ─── ABOUT ───
    if (data.about) {
        const a = data.about;
        const aboutBadge = document.querySelector('#about .section-badge span');
        if (aboutBadge) aboutBadge.textContent = a.badge;
        
        const aboutTitle = document.querySelector('#about .section-title');
        if (aboutTitle && a.title) aboutTitle.innerHTML = a.title;
        
        const aboutDesc = document.querySelector('#about .section-description');
        if (aboutDesc) aboutDesc.textContent = a.description;
        
        if (a.tagline) {
            const tagline = document.querySelector('.bento-logo-tagline');
            if (tagline) tagline.innerHTML = a.tagline;
        }
        
        if (a.trust && a.trust.length) {
            const trustItems = document.querySelectorAll('.trust-item span');
            a.trust.forEach((text, i) => {
                if (trustItems[i]) trustItems[i].textContent = text;
            });
        }
    }
    
    // ─── PLANS ───
    if (data.plans) {
        const p = data.plans;
        const plansBadges = document.querySelectorAll('#planes .section-badge span, #simulacros .section-badge span');
        plansBadges.forEach(b => { if (p.badge) b.textContent = p.badge; });
        
        const plansTitles = document.querySelectorAll('#planes .section-title, #simulacros .section-title');
        plansTitles.forEach(t => { if (p.title) t.innerHTML = p.title; });
    }
    
    // ─── FOOTER ───
    if (data.footer) {
        const f = data.footer;
        const footerTagline = document.querySelector('.footer-brand p, footer .tagline');
        if (footerTagline && f.tagline) footerTagline.textContent = f.tagline;
        
        const copyright = document.querySelector('.footer-bottom p, .copyright');
        if (copyright && f.copyright) copyright.textContent = f.copyright;
    }

    // ─── STATS ───
    if (data.stats) {
        const s = data.stats;
        if (s.hero) {
            const heroStatsCards = document.querySelectorAll('#hero-stats .stat-card');
            if (s.hero[0] && heroStatsCards[0]) {
                const num = heroStatsCards[0].querySelector('.stat-number');
                const lbl = heroStatsCards[0].querySelector('.stat-label');
                if (num) num.textContent = s.hero[0].num;
                if (lbl) lbl.textContent = s.hero[0].label;
            }
            if (s.hero[1] && heroStatsCards[1]) {
                const num = heroStatsCards[1].querySelector('.stat-number');
                const lbl = heroStatsCards[1].querySelector('.stat-label');
                if (num) num.textContent = s.hero[1].num;
                if (lbl) lbl.textContent = s.hero[1].label;
            }
        }

        if (s.bento) {
            const bentoStatsItems = document.querySelectorAll('.bento-stats-grid .bento-stat-item');
            s.bento.forEach((item, index) => {
                if (item && bentoStatsItems[index]) {
                    const num = bentoStatsItems[index].querySelector('.bento-stat-number');
                    const lbl = bentoStatsItems[index].querySelector('.bento-stat-label');
                    if (num) num.textContent = item.num;
                    if (lbl) lbl.textContent = item.label;
                }
            });
        }
    }
}

async function loadSections() {
    try {
        const refs = {
            hero: getDoc(doc(db, "sections", "hero")),
            about: getDoc(doc(db, "sections", "about")),
            plans: getDoc(doc(db, "sections", "plans")),
            footer: getDoc(doc(db, "sections", "footer")),
            stats: getDoc(doc(db, "sections", "stats"))
        };

        const [heroDoc, aboutDoc, plansDoc, footerDoc, statsDoc] = await Promise.all([
            refs.hero, refs.about, refs.plans, refs.footer, refs.stats
        ]);

        const data = {};
        if (heroDoc.exists()) data.hero = heroDoc.data();
        if (aboutDoc.exists()) data.about = aboutDoc.data();
        if (plansDoc.exists()) data.plans = plansDoc.data();
        if (footerDoc.exists()) data.footer = footerDoc.data();
        if (statsDoc.exists()) data.stats = statsDoc.data();

        applyCMSData(data);
    } catch (error) {
        console.error("Error loading sections from CMS:", error);
    }
}

async function loadTutors() {
    const container = document.querySelector('.tutors-slider-track');
    if (!container) return;

    try {
        const tutorsSnapshot = await getDocs(collection(db, "tutors"));
        if (tutorsSnapshot.empty) {
            console.log("No tutors found in CMS.");
            return;
        }

        // Clear existing static content if any (we could leave one as a template but let's build from JS)
        container.innerHTML = '';

        tutorsSnapshot.forEach((doc) => {
            const data = doc.data();
            
            const badgeClassStr = data.badgeClass ? ` ${data.badgeClass}` : '';
            
            // Build the achievements HTML
            let achievementsHtml = '';
            if (data.achievements?.length > 0) {
                achievementsHtml = data.achievements.map((ach) => `
                    <div class="achievement-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <span>${ach}</span>
                    </div>
                `).join('');
            }

            const tutorCard = `
                <div class="tutor-card tutor-slide">
                    <div class="tutor-badge${badgeClassStr}">${data.badge || ''}</div>
                    <div class="tutor-image">
                        <img src="${data.imgUrl || ''}" alt="${data.name || ''}">
                        <div class="tutor-overlay"></div>
                    </div>
                    <div class="tutor-content">
                        <h3 class="tutor-name">${data.name || ''}</h3>
                        <div class="tutor-role">${data.role || ''}</div>

                        <div class="tutor-info-grid">
                            <div class="info-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                                    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                                </svg>
                                <div>
                                    <div class="info-label">Universidad / Especialidad</div>
                                    <div class="info-value">${data.university || ''}</div>
                                </div>
                            </div>
                        </div>

                        <div class="tutor-achievements">
                            ${achievementsHtml}
                        </div>

                        <a href="${data.profileUrl || '#'}" class="tutor-profile-btn" style="display:inline-flex;text-decoration:none;">
                            Ver Perfil Completo
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </a>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', tutorCard);
        });

    } catch (error) {
        console.error("Error loading tutors from CMS:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadSections();
    loadTutors();
});
