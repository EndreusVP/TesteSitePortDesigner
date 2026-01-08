document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('skill-item')) {
                    const fill = entry.target.querySelector('.progress-bar-fill');
                    const percent = entry.target.querySelector('.skill-percentage').innerText;
                    fill.style.width = percent;
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.timeline-item, .skill-item, .client-box, .exp-card').forEach(el => observer.observe(el));

    const mini = document.querySelector('.mini-float');
    const hero = document.querySelector('.hero');
    const footer = document.querySelector('.cyber-footer');
    const comicOverlay = document.querySelector('.comic-overlay');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;
        const heroHeight = hero.offsetHeight;
        const footerRect = footer.getBoundingClientRect();

        if (scrollY > heroHeight - 300) { mini.style.opacity = "1"; } else { mini.style.opacity = "0"; }

        // Ajuste da posição da mini persona para não cobrir o footer
        if (footerRect.top < (windowHeight / 2) + 100) { 
            mini.style.position = 'absolute';
            mini.style.top = (footer.offsetTop - 120) + "px";
        } else {
            mini.style.position = 'fixed';
            mini.style.top = "50%";
        }

        const scrollRange = fullHeight - heroHeight - footer.offsetHeight;
        const scrollPercent = Math.max(0, Math.min(1, (scrollY - heroHeight) / scrollRange));
        mini.style.right = (5 + (scrollPercent * 80)) + "%";

        if (comicOverlay) {
            comicOverlay.style.backgroundPosition = `0px 0px, 0px ${scrollY * 0.1}px`;
        }
    });

    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('video-frame');
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('click', () => {
            const id = item.getAttribute('data-video');
            iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    document.querySelector('.close-modal').onclick = () => {
        modal.style.display = 'none';
        iframe.src = '';
        document.body.style.overflow = 'auto';
    };
});