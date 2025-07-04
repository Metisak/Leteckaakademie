// Mobilní menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Zavření menu při kliknutí na odkaz
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Plynulé scrollování
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Odečítáme výšku navigace
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animace při scrollování
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animace pro service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// Animace pro gallery items
document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.8)';
    item.style.transition = 'all 0.6s ease-out';
    observer.observe(item);
});

// Animace pro stats
document.querySelectorAll('.stat').forEach(stat => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(20px)';
    stat.style.transition = 'all 0.6s ease-out';
    observer.observe(stat);
});

// Změna navigace při scrollování
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Formulář
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Získání hodnot z formuláře
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const message = formData.get('message');
    
    // Validace
    if (!name || !email || !message) {
        alert('Prosím vyplňte všechna povinná pole.');
        return;
    }
    
    // Simulace odeslání
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Odesílám...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        alert(`Děkujeme za Vaši zprávu, ${name}!\nBudeme Vás kontaktovat na emailu ${email} co nejdříve.`);
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
});

// Počítadlo pro stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// Spuštění počítadla při zobrazení stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            const text = statNumber.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            
            if (number && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                animateCounter(statNumber, number);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Parallax efekt pro hero sekci
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const plane = document.querySelector('.plane-animation');
    
    if (hero && plane) {
        const rate = scrolled * -0.5;
        plane.style.transform = `translateY(${rate}px)`;
    }
});

// Přidání třídy pro aktivní odkaz v navigaci
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Přidání CSS pro aktivní odkaz
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: #2563eb !important;
    }
    .nav-menu a.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Přepínání světlý/tmavý režim
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

function setTheme(dark) {
    document.body.classList.toggle('dark', dark);
    themeIcon.classList.toggle('fa-moon', !dark);
    themeIcon.classList.toggle('fa-sun', dark);
}

// Uložit preferenci do localStorage
function saveThemePref(dark) {
    localStorage.setItem('theme', dark ? 'dark' : 'light');
}

// Načíst preferenci z localStorage nebo podle systému
function getPreferredTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Inicializace
setTheme(getPreferredTheme());

themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark');
    setTheme(!isDark);
    saveThemePref(!isDark);
});

// Rozbalení detailu služby "Pilotní výcvik"
document.addEventListener('DOMContentLoaded', function() {
    // Modal pro služby
    const modal = document.getElementById('service-modal');
    const modalTitle = document.getElementById('service-modal-title');
    const modalText = document.getElementById('service-modal-text');
    const modalClose = document.querySelector('.service-modal-close');
    const modalBackdrop = document.querySelector('.service-modal-backdrop');
    const modalScrollArrow = document.getElementById('modal-scroll-arrow');
    const modalContent = document.querySelector('.service-modal-content');
    const scrollButton = modalScrollArrow.querySelector('button');

    function updateScrollArrow() {
        if (!modalContent) return;
        // Zobrazit šipku jen pokud je co scrollovat
        if (modalContent.scrollHeight > modalContent.clientHeight && modalContent.scrollTop + modalContent.clientHeight < modalContent.scrollHeight - 10) {
            modalScrollArrow.style.display = 'flex';
        } else {
            modalScrollArrow.style.display = 'none';
        }
    }
    // Posunout obsah dolů po kliknutí na šipku
    scrollButton.addEventListener('click', function(e) {
        e.stopPropagation();
        modalContent.scrollBy({ top: modalContent.clientHeight * 0.7, behavior: 'smooth' });
    });
    // Aktualizace šipky při scrollování
    modalContent.addEventListener('scroll', updateScrollArrow);

    // Obsah pro jednotlivé služby
    const serviceContents = {
        pilot: `<div class=\"modal-section\"><p>Průkaz pilota ultralehkých letadel opravňuje k pilotáži aerodynamicky řízených dvoumístných letadel do celkové vzletové hmotnosti 450 kg. Jedná se o nejdostupnější a nejčastěji absolvovaný kurz.</p></div><div class=\"modal-section\"><h4>Požadavky na žáka</h4><ul><li>Věk minimálně 15 let, u osob mladších 18 let nutný souhlas zákonného zástupce.</li><li>Osvědčení o zdravotní způsobilosti od pověřeného lékaře.</li><li>Doporučujeme členství v LAA ČR</li></ul></div><div class=\"modal-section\"><h4>Průběh kurzu</h4><b>Teoretická část</b><p>Přednáší se v učebně letecké školy na letišti v Miroslavi. Teorie je rozdělena do dvou částí. Po absolvování první části (21 hod) začíná praktická část – létání.</p><p>Osnovami UL je předepsáno celkem 45 hodin výuky aerodynamiky a mechaniky letu, stavby a konstrukce SLZ (sportovní létající zařízení), postupy UL1, UL2, UL3, spojovací předpis, navigace, meteorologie, motory, vrtule a přístroje. Součástí teoretické přípravy je kurz radiooperatérů letadlových stanic.</p><b>Praktická část</b><p>Pro získání pilotní licence ULL je předepsaných minimálně 20 letových hodin. Létání se klasifikuje čtyřmi stupni. Při známce 1 a 2 pokračuje žák na další lekci, při známce 3 opakuje lekci znovu, a pokud se podaří dosáhnout stupně 4, je nutné vrátit se ve výcviku o jednu lekci zpět.</p></div><div class=\"modal-section\"><h4>Ukončení kurzu a získání licence</h4><p>Pro splnění základní osnovy celého kurzu, pokud je podle instruktora žák připraven, přistupuje ke složení závěrečných zkoušek. O vydání pilotního průkazu rozhoduje na základě výsledků teoretické a praktické zkoušky inspektor LAA ČR.</p><div class=\"modal-warning\"><b>Důležité!</b> Podle výcvikové osnovy je nutno absolvovat minimálně 20 letových hodin. Jde však pouze o předepsané minimum, jehož absolvování automaticky neopravňuje k získání pilotního průkazu! K závěrečným zkouškám nepustíme nikoho, kdo opravdu nebude umět létat.</div></div><div class=\"modal-section\"><h4>Cena</h4><table class=\"modal-table\"><tr><th>Letoun / Instruktor</th><th>Cena za 1 hod</th><th>Min. 20 hod</th></tr><tr><td>EV 97 SL+ EUROSTAR</td><td>2 650 Kč</td><td>53 000 Kč</td></tr><tr><td>Instruktor nebo vlastní UL letoun</td><td>500 Kč</td><td>8 000 Kč</td></tr></table><p class=\"modal-note\">Pro naše žáky nabízíme teoretickou výuku nad rámec výcviku, předletovou přípravu a konzultace zdarma.<br>Pro zájemce nabízíme výcvik v Anglickém jazyce.</p><p class=\"modal-note\">K ceně výcviku je třeba započítat kurzovné pro krytí administrativních výloh v ceně 2 500 Kč bez DPH.</p></div>`,
        teorie: `<div class=\"modal-section\"><h4>Teoretická příprava pilota</h4><p>Osnovami UL je předepsáno celkem 45 hodin výuky aerodynamiky a mechaniky letu, stavby a konstrukce SLZ (sportovní létající zařízení), postupy UL1, UL2, UL3, spojovací předpis, navigace, meteorologie, motory, vrtule a přístroje. Součástí teoretické přípravy je kurz radiooperatérů letadlových stanic.</p><div class=\"modal-note\">Teoretická výuka 45 hod &nbsp; <b>9 000 Kč / os.</b></div></div>`,
        vfr: `<div class=\"modal-section\"><h4>Výcvik – řízené lety VFR</h4><p>Text k výcviku řízené lety VFR bude doplněn.</p></div>`,
        kondicni: `<div class=\"modal-section\"><h4>Kondiční létání</h4><p>Text ke kondičnímu létání bude doplněn.</p></div>`,
        zaletavaci: `<div class=\"modal-section\"><h4>Práce zalétávacího pilota</h4><p>Text k práci zalétávacího pilota bude doplněn.</p></div>`,
        fotolety: `<div class=\"modal-section\"><h4>Fotolety</h4><p>Text k fotolety bude doplněn.</p></div>`,
        zazitkove: `<div class=\"modal-section\"><h4>Zážitkové akce</h4><p>Text k zážitkovým akcím bude doplněn.</p></div>`,
        vlekani: `<div class=\"modal-section\"><h4>Vlekání transparentů / vlekání větrňů</h4><p>Text k vlekání bude doplněn.</p></div>`,
        roadshow: `<div class=\"modal-section\"><h4>Roadshow pro firmy a obchodní partnery</h4><p>Text k roadshow bude doplněn.</p></div>`
    };

    // Otevření modalu pro libovolnou službu
    document.querySelectorAll('.service-card.service-expandable').forEach(card => {
        card.addEventListener('click', function (e) {
            const service = this.getAttribute('data-service');
            const title = this.querySelector('h3').textContent;
            modalTitle.textContent = title;
            modalText.innerHTML = serviceContents[service] || '<div class="modal-section"><p>Text bude doplněn.</p></div>';
            modal.style.display = 'block';
            setTimeout(updateScrollArrow, 200);
        });
    });

    // Zavření modalu
    function closeModal() {
        modal.style.display = 'none';
    }
    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
}); 