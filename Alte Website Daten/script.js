// script.js - Performance optimiert und mit neuen Effekten

document.addEventListener('DOMContentLoaded', () => {
    const bodyElement = document.body;

    // GSAP Plugin einmalig registrieren
    gsap.registerPlugin(ScrollTrigger);

    // Globale Hintergrundfarb-Animation Setup
    let globalBgState = {
        color1: getComputedStyle(bodyElement).getPropertyValue('--bg-grad-color-1').trim() || '#0a0a0a',
        color2: getComputedStyle(bodyElement).getPropertyValue('--bg-grad-color-2').trim() || '#121218',
        angle: parseFloat(getComputedStyle(bodyElement).getPropertyValue('--bg-grad-angle')) || 180
    };

    function updateBodyBackground() {
        bodyElement.style.setProperty('--bg-grad-color-1', globalBgState.color1);
        bodyElement.style.setProperty('--bg-grad-color-2', globalBgState.color2);
        bodyElement.style.setProperty('--bg-grad-angle', globalBgState.angle + 'deg');
    }
    updateBodyBackground();

    // In script.js

// Definition der Farbübergänge für die Sektionen
const sectionColorTransitions = [
    // 1. Hero Sektion: Startet sehr dunkel
    {
        trigger: "#hero",
        colors: ["#050508", "#0a0a10"], // Sehr dunkles Anthrazit/fast Schwarz
        angle: 180
    },
    // 2. "Über Mich" Sektion: Übergang von fast Schwarz zu tiefem Blau
    {
        trigger: "#ueber-mich",
        colors: ["#0a0a10", "#182030"], // Von fast Schwarz/sehr dunklem Blau zu einem etwas helleren, tiefen Blau
        angle: 190
    },
    // 3. Übergang von "Über Mich" (dunkelblau) zu "Meine Musik" (weiß) - "Zwielicht"-Phase
    {
        trigger: "#meine-musik", // Trigger ist der Beginn der Musik-Sektion
        colors: ["#182030", "#606070"], // Von tiefem Blau zu einem mittleren Grau/Blaustich (1. Teil des Übergangs zu Weiß)
        angle: 185,
        // Dieser Trigger sorgt für den ersten Teil des Übergangs ZU Weiß.
        // Der eigentliche Wechsel zu Weiß passiert im nächsten Trigger-Block für #meine-musik.
        // Daher kein isSolidWhite hier.
    },
    // 4. "Meine Musik" Sektion: Sanfter Übergang vom "Zwielicht" zu Weiß
    {
        trigger: "#meine-musik", // Ein zweiter Trigger für #meine-musik für den Endzustand
        colors: ["#606070", "#FFFFFF"], // Vom mittleren Grau/Blaustich zu reinem Weiß
        angle: 180,
        isSolidWhite: true, // Markiert, dass diese Sektion am Ende weiß ist
        // Dieser Trigger muss später starten oder den vorherigen überlagern/ablösen.
        // Wir nutzen unterschiedliche Start/End-Punkte.
    },
    // 5. "Meine Stats" Sektion: Bleibt weiß
    {
        trigger: "#meine-stats",
        colors: ["#FFFFFF", "#F8F8FA"], // Weiß zu einem sehr hellen Grau
        angle: 180,
        isSolidWhite: true
    },
    // 6. "Meine Labels" Sektion: Bleibt ebenfalls hell
    {
        trigger: "#meine-labels",
        colors: ["#F8F8FA", "#FFFFFF"], // Sehr helles Grau zurück zu Weiß
        angle: 180,
        isSolidWhite: true
    },
    // 7. "Meine Clubs" Sektion: Bleibt hell
    {
        trigger: "#meine-clubs",
        colors: ["#FFFFFF", "#F5F8FF"], // Weiß zu einem anderen sehr hellen, leicht bläulichen Weißton
        angle: 180,
        isSolidWhite: true
    },
    // Beispiel für nächste Sektion (wenn wieder dunkel)
    /*
    {
        trigger: "#fotos", // Hypothetische nächste dunkle Sektion
        colors: ["#EAEAEA", "#303040"], // Von hellem Grau (Ende #meine-clubs) zu Dunkelgrau
        angle: 190
    },
    {
        trigger: "#fotos", // Zweiter Trigger für #fotos, um die volle dunkle Farbe zu erreichen
        colors: ["#303040", "#181820"],
        angle: 200
    }
    */
];

// Die `lastAnimatedIndex` Logik wird hier beibehalten, kann aber bei Bedarf durch eine robustere State-Machine ersetzt werden.
let lastAnimatedIndex = -1;

sectionColorTransitions.forEach((transitionDef, index) => {
    let startPoint, endPoint;

    // Spezifische Start/End-Punkte für die Übergänge um #meine-musik
    if (transitionDef.trigger === "#meine-musik") {
        if (transitionDef.colors[1] === "#FFFFFF") { // Der Trigger, der zu Weiß wird
            startPoint = "top 70%"; // Beginnt, wenn #meine-musik zu 70% von oben sichtbar ist
            endPoint = "top 40%";   // Soll weiß sein, wenn die Sektion zu 40% von oben sichtbar ist
        } else { // Der Trigger, der von Dunkelblau zum "Zwielicht"-Grau übergeht
            startPoint = "top bottom"; // Beginnt, wenn #meine-musik gerade erst von unten erscheint
            endPoint = "top 70%";      // Endet, wenn #meine-musik zu 70% von oben sichtbar ist
        }
    } else if (index > 0 && sectionColorTransitions[index - 1].trigger === "#meine-musik" && sectionColorTransitions[index - 1].isSolidWhite) {
        // Übergang *aus* der weißen Musik-Sektion (oder einer anderen weißen Sektion davor)
        // zu einer nicht-weißen Sektion danach (hier #meine-stats, die aber auch weiß ist, also greift diese Logik nicht stark)
        // Diese Logik müsste angepasst werden, wenn nach #meine-clubs eine dunkle Sektion käme.
        startPoint = "top bottom"; // Standard für den Beginn einer neuen Sektion
        endPoint = "top center";
    }
    else {
        // Standard-Triggerpunkte
        startPoint = "top bottom"; // Beginnt, wenn Oberkante des Triggers unten im Viewport erscheint
        endPoint = "center center";  // Endet, wenn Mitte des Triggers in der Mitte des Viewports ist
    }


    ScrollTrigger.create({
        trigger: transitionDef.trigger,
        start: startPoint,
        end: endPoint,
        scrub: 1.2,
        // markers: {startColor: "blue", endColor: "red", fontSize: "10px", indent: index * 150 + (transitionDef.colors[1] === "#FFFFFF" ? 20 : 0)}, // Zum Debuggen
        onUpdate: self => {
            let isActiveTransition = true;
            // Vereinfachte Logik zur Vermeidung von Überschreibungen bei schnellem Scrollen
            // (kann bei komplexen Überlappungen immer noch an Grenzen stoßen)
            if (self.direction === 1 && index < lastAnimatedIndex && self.progress < 0.05) isActiveTransition = false;
            if (self.direction === -1 && index > lastAnimatedIndex && self.progress < 0.05) isActiveTransition = false;

            if(isActiveTransition){
                gsap.to(globalBgState, {
                    color1: transitionDef.colors[0],
                    color2: transitionDef.colors[1],
                    angle: transitionDef.angle,
                    duration: 0.3,
                    ease: "none",
                    onUpdate: updateBodyBackground,
                    overwrite: 'auto' // Wichtig, um konkurrierende Tweens auf globalBgState zu managen
                });
            }
        },
        onToggle: self => {
            if (self.isActive) {
                lastAnimatedIndex = index;
                // Setzt die Zielfarben des aktiven Bereichs sofort,
                // falls man direkt in eine Sektion springt oder sehr schnell scrollt.
                gsap.set(globalBgState, {
                    color1: transitionDef.colors[0],
                    color2: transitionDef.colors[1],
                    angle: transitionDef.angle,
                    onUpdate: updateBodyBackground
                });
            }
        }
    });
});

    // Hero Section spezifische Logik
    const djNameLetters = document.querySelectorAll('.dj-name-letter');
    djNameLetters.forEach((letter, idx) => {
        letter.style.setProperty('--letter-index', idx);
    });

    // Custom Cursor
    const customCursor = document.querySelector('.custom-cursor');
    if (customCursor) {
        let targetCursorX = 0, targetCursorY = 0, currentCursorX = 0, currentCursorY = 0;
        let animationId = null;
        const smoothingFactor = 0.12;
        
        document.addEventListener('mousemove', (e) => {
            targetCursorX = e.clientX;
            targetCursorY = e.clientY;
            if (!animationId) { animationId = requestAnimationFrame(animateCursor); }
        });
        
        function animateCursor() {
            const deltaX = Math.abs(targetCursorX - currentCursorX);
            const deltaY = Math.abs(targetCursorY - currentCursorY);
            if (deltaX < 0.5 && deltaY < 0.5) {
                customCursor.style.transform = `translate(${Math.round(targetCursorX)}px, ${Math.round(targetCursorY)}px)`;
                animationId = null; 
                return;
            }
            currentCursorX += (targetCursorX - currentCursorX) * smoothingFactor;
            currentCursorY += (targetCursorY - currentCursorY) * smoothingFactor;
            customCursor.style.transform = `translate(${currentCursorX}px, ${currentCursorY}px)`;
            animationId = requestAnimationFrame(animateCursor);
        }
        
        const interactiveElements = document.querySelectorAll('button, a, .dj-name-letter, .circular-player, .zoom-list-item');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => { customCursor.classList.add('hover-interactive'); });
            element.addEventListener('mouseleave', () => { customCursor.classList.remove('hover-interactive'); });
        });
    }

    // Parallax für Profilbild
    const bioContentElement = document.querySelector('.bio-content');
    const bioImageWrapper = document.querySelector('.bio-image-wrapper');
    if (bioContentElement && bioImageWrapper) {
        let parallaxAnimationId = null; 
        const parallaxIntensityImage = 10; 
        const liftAmountImage = 10;
        
        bioContentElement.addEventListener('mousemove', (e) => {
            if(document.getElementById('ueber-mich').classList.contains('is-visible')) {
                if (parallaxAnimationId) return; 
                parallaxAnimationId = requestAnimationFrame(() => {
                    const rect = bioContentElement.getBoundingClientRect();
                    const mouseXpercent = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2));
                    const mouseYpercent = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2));
                    const rotateY = mouseXpercent * parallaxIntensityImage; 
                    const rotateX = -mouseYpercent * parallaxIntensityImage * 0.6;
                    bioImageWrapper.style.transition = 'transform 0.05s linear';
                    bioImageWrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${liftAmountImage}px)`;
                    parallaxAnimationId = null;
                });
            }
        });
        
        bioContentElement.addEventListener('mouseleave', () => {
            if (parallaxAnimationId) { 
                cancelAnimationFrame(parallaxAnimationId); 
                parallaxAnimationId = null; 
            }
            bioImageWrapper.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            bioImageWrapper.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    }

    // Intersection Observer für Sektionen
    const sectionsToObserve = document.querySelectorAll('.page-section');
    if (sectionsToObserve.length > 0) {
        const generalObserverOptions = { 
            root: null, 
            rootMargin: '-10% 0px -10% 0px', 
            threshold: [0.1, 0.5, 0.8] 
        };
        const musikObserverOptions = { 
            root: null, 
            rootMargin: '0px 0px -20% 0px', 
            threshold: 0.6 
        };
        
        const observerCallback = (entries, observerInstance) => {
            entries.forEach(entry => {
                const section = entry.target;
                if (entry.isIntersecting) {
                    if (entry.intersectionRatio >= 0.1) { 
                        section.classList.add('is-visible'); 
                    }
                    
                    if (section.id === 'hero' && entry.intersectionRatio >= 0.5) {
                        const heroParticleContainer = section.querySelector('.hero-particles');
                        if (heroParticleContainer && !heroParticleContainer.dataset.initialized) { 
                            setTimeout(() => { 
                                initHeroParticles(heroParticleContainer); 
                                heroParticleContainer.dataset.initialized = 'true'; 
                            }, 300); 
                        }
                    }
                    
                    if (section.id === 'ueber-mich' && entry.intersectionRatio >= 0.5) {
                        // Versuche verschiedene mögliche Partikel-Container IDs
                        let particleContainer = document.getElementById('particles-ueber-mich') || 
                                              document.querySelector('#ueber-mich .particles') ||
                                              document.querySelector('.ueber-mich-particles');
                        
                        if (particleContainer && !particleContainer.dataset.initialized) { 
                            setTimeout(() => { 
                                initUeberMichParticles(particleContainer); 
                                particleContainer.dataset.initialized = 'true'; 
                            }, 200); 
                        }
                    }
                    
                    if (section.id === 'meine-musik' && entry.intersectionRatio >= 0.6) {
                        initMusicPlayersOptimized(section);
                        if (section.dataset.playersInitialized === 'true') { 
                            observerInstance.unobserve(section); 
                        }
                    }
                } else {
                    if (entry.intersectionRatio < 0.1) {
                        if (section.id === 'meine-musik') { 
                            pauseAllAudioPlayers(); 
                        }
                    }
                }
            });
        };
        
        sectionsToObserve.forEach(section => {
            let currentObserver = (section.id === 'meine-musik') ? 
                new IntersectionObserver(observerCallback, musikObserverOptions) : 
                new IntersectionObserver(observerCallback, generalObserverOptions);
            currentObserver.observe(section);
        });
    }

    // ==== GSAP ScrollTrigger Animationen ====
    
    // Basis Sektionen Animation
    gsap.utils.toArray(".page-section").forEach((section) => {
        gsap.fromTo(section, 
            { opacity: 0, y: 80 }, 
            {
                opacity: 1, 
                y: 0, 
                duration: 1, 
                ease: "power2.out",
                scrollTrigger: { 
                    trigger: section, 
                    start: "top 80%", 
                    toggleActions: "play none none reverse" 
                }
            }
        );
    });

    // Titel Animationen
    gsap.utils.toArray(".title-line").forEach((el, i) => {
        gsap.fromTo(el, 
            { opacity: 0, y: 50 }, 
            {
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                delay: i * 0.15,
                scrollTrigger: { 
                    trigger: el, 
                    start: "top 85%", 
                    toggleActions: "play none none reverse" 
                }
            }
        );
    });

    gsap.utils.toArray(".title-underline").forEach((el) => {
        gsap.fromTo(el, 
            { opacity: 0, scaleX: 0 }, 
            {
                opacity: 1, 
                scaleX: 1, 
                duration: 0.6,
                scrollTrigger: { 
                    trigger: el, 
                    start: "top 85%", 
                    toggleActions: "play none none reverse" 
                }
            }
        );
    });

    // ÜBER MICH SEKTION - Bio Bild und Text Animationen
    const bioImage = document.querySelector('.bio-image');
    if (bioImage) {
        gsap.fromTo(bioImage,
            { 
                opacity: 0, 
                scale: 0.8, 
                rotateY: -15, 
                x: -50 
            },
            {
                opacity: 1,
                scale: 1,
                rotateY: 0,
                x: 0,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: bioImage,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }

    // Bio Paragraphen Animation
    gsap.utils.toArray('.bio-paragraph').forEach((paragraph, index) => {
        gsap.fromTo(paragraph,
            { 
                opacity: 0, 
                y: 30, 
                x: 20 
            },
            {
                opacity: 1,
                y: 0,
                x: 0,
                duration: 0.8,
                delay: index * 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: paragraph,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Stats Zahlen Animation
    function formatNumberDE(value) {
        return Math.round(value).toLocaleString('de-DE');
    }

    const statsItemsForNumberAnimation = document.querySelectorAll('#meine-stats .stat-item');
    if (statsItemsForNumberAnimation.length > 0) {
        statsItemsForNumberAnimation.forEach(item => {
            const statNumberElement = item.querySelector('.stat-number');
            if (statNumberElement) {
                const targetValue = parseFloat(statNumberElement.dataset.targetValue);
                let startValue = parseFloat(statNumberElement.dataset.startValue);
                if (isNaN(targetValue)) return;
                if (isNaN(startValue)) { startValue = 0; }

                statNumberElement.textContent = formatNumberDE(startValue);
                let animatedValue = { val: startValue };

                gsap.to(animatedValue, {
                    val: targetValue,
                    duration: 2.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: statNumberElement,
                        start: "top 90%",
                        toggleActions: "play none none none",
                    },
                    onUpdate: () => { 
                        statNumberElement.textContent = formatNumberDE(animatedValue.val); 
                    },
                    onComplete: () => { 
                        statNumberElement.textContent = formatNumberDE(targetValue); 
                    }
                });
            }
        });
    }
    
    // Zoom-In Animation für Listen
    gsap.utils.toArray('.zoom-list-item').forEach(item => {
        gsap.fromTo(item,
            { opacity: 0, scale: 0.5, y: 20 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                }
            }
        );
    });

    // Musik Player Funktionen
    function initMusicPlayersOptimized(musikSection) {
        if (musikSection.dataset.playersInitialized === 'true') return;
        const audioElementsToLoad = musikSection.querySelectorAll('.circular-player audio[data-src]');
        audioElementsToLoad.forEach((audio, index) => {
            setTimeout(() => {
                if (audio.dataset.src && audio.getAttribute('src') !== audio.dataset.src) {
                    audio.src = audio.dataset.src;
                }
            }, index * 150); 
        });
        musikSection.dataset.playersInitialized = 'true';
    }

    const circularPlayers = document.querySelectorAll('.circular-player');
    const allAudioElements = document.querySelectorAll('.circular-player audio');

    circularPlayers.forEach(player => {
        const audio = player.querySelector('audio');
        const playPauseBtn = player.querySelector('.play-pause-button');

        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (audio.paused || audio.ended) {
                    allAudioElements.forEach(otherAudio => {
                        if (otherAudio !== audio && !otherAudio.paused) {
                            otherAudio.pause();
                        }
                    });
                    if (audio.src && (audio.preload !== 'auto' || audio.readyState < 2)) { 
                        audio.preload = 'auto'; 
                        audio.load();         
                    }
                    audio.play().catch(err => console.warn("Audio play failed for " + audio.src + ":", err));
                } else {
                    audio.pause();
                }
            });
        }

        if (audio) {
            audio.addEventListener('play', () => updatePlayerUI(player, true));
            audio.addEventListener('pause', () => updatePlayerUI(player, false));
            audio.addEventListener('ended', () => { 
                updatePlayerUI(player, false); 
                audio.currentTime = 0; 
            });
        }
    });

    function updatePlayerUI(player, isPlaying) {
        const playIcon = player.querySelector('.play-icon');
        const pauseIcon = player.querySelector('.pause-icon');
        if (isPlaying) {
            player.classList.add('is-playing');
            if (playIcon) playIcon.style.display = 'none';
            if (pauseIcon) pauseIcon.style.display = 'block';
        } else {
            player.classList.remove('is-playing');
            if (playIcon) playIcon.style.display = 'block';
            if (pauseIcon) pauseIcon.style.display = 'none';
        }
    }

    function pauseAllAudioPlayers() {
        allAudioElements.forEach(audio => { 
            if (!audio.paused) { 
                audio.pause(); 
            } 
        });
    }

    // Parallax für Musik Player
    const musikSectionParallax = document.getElementById('meine-musik');
    const playersForParallaxGlobal = document.querySelectorAll('.circular-players-container .circular-player');
    if (musikSectionParallax && playersForParallaxGlobal.length > 0 && window.matchMedia("(min-width: 769px)").matches) {
        let parallaxAnimationIdPlayer = null; 
        const parallaxIntensityPlayer = 0.05; 
        let isPlayerParallaxAnimating = false;
        
        musikSectionParallax.addEventListener('mousemove', (e) => {
            if (!musikSectionParallax.classList.contains('is-visible') || isPlayerParallaxAnimating) return;
            isPlayerParallaxAnimating = true;
            parallaxAnimationIdPlayer = requestAnimationFrame(() => {
                const rect = musikSectionParallax.getBoundingClientRect();
                const mouseXInSection = e.clientX - rect.left; 
                const mouseYInSection = e.clientY - rect.top;
                const centerX = rect.width / 2; 
                const centerY = rect.height / 2;
                const moveX = (mouseXInSection - centerX) * parallaxIntensityPlayer; 
                const moveY = (mouseYInSection - centerY) * parallaxIntensityPlayer;
                
                playersForParallaxGlobal.forEach((player, index) => {
                    const factorX = (index % 3 - 1) * 0.3 + 1; 
                    const factorY = (index % 2 === 0) ? 0.95 : 1.05; 
                    let currentScale = player.matches(':hover') || player.classList.contains('is-playing') ? 1.05 : 1;
                    player.style.transform = `translate3d(${-moveX * factorX}px, ${-moveY * factorY}px, 0) scale(${currentScale})`;
                });
                isPlayerParallaxAnimating = false;
            });
        });
        
        musikSectionParallax.addEventListener('mouseleave', () => {
            if (parallaxAnimationIdPlayer) { 
                cancelAnimationFrame(parallaxAnimationIdPlayer); 
                parallaxAnimationIdPlayer = null; 
                isPlayerParallaxAnimating = false; 
            }
            playersForParallaxGlobal.forEach(player => {
                let currentScale = player.matches(':hover') || player.classList.contains('is-playing') ? 1.05 : 1;
                player.style.transform = `translate3d(0px, 0px, 0) scale(${currentScale})`;
            });
        });
    }

    // Smooth Scroll
    function smoothScrollTo(targetSelector) { 
        const targetElement = document.querySelector(targetSelector); 
        if (!targetElement) return;
        targetElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start', 
            inline: 'nearest' 
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) { 
            e.preventDefault(); 
            smoothScrollTo(this.getAttribute('href')); 
        });
    });

    // Partikel Funktionen
    function createGenericParticles(container, count, particleClass, animationNamePrefix, options = {}) {
        if (!container) return;
        const fragment = document.createDocumentFragment();
        const defaults = { 
            minDuration: 4, 
            maxDuration: 8, 
            minDelay: 0, 
            maxDelay: 3, 
            minSize: 1, 
            maxSize: 3 
        };
        const settings = { ...defaults, ...options };
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div'); 
            particle.classList.add(particleClass);
            const size = settings.minSize + Math.random() * (settings.maxSize - settings.minSize);
            
            let cssProps = `
                width: ${size}px; 
                height: ${size}px; 
                left: ${Math.random() * 100}%; 
                top: ${Math.random() * 100}%; 
                animation-duration: ${settings.minDuration + Math.random() * (settings.maxDuration - settings.minDuration)}s; 
                animation-delay: ${settings.minDelay + Math.random() * (settings.maxDelay - settings.minDelay)}s; 
                will-change: transform, opacity;
            `; 
            
            if (particleClass === 'particle') { 
                cssProps += `
                    background: rgba(64, 224, 208, ${0.4 + Math.random() * 0.4}); 
                    box-shadow: 0 0 ${Math.random() * 8 + 2}px rgba(64, 224, 208, ${0.3 + Math.random() * 0.3});
                `; 
            } else if (particleClass === 'hero-particle') { 
                cssProps += `background: rgba(255, 255, 255, ${0.05 + Math.random() * 0.1});`; 
                particle.style.setProperty('--x-drift', `${(Math.random() - 0.5) * 20}vw`); 
            }
            
            particle.style.cssText = cssProps; 
            fragment.appendChild(particle);
        }
        container.innerHTML = ''; 
        container.appendChild(fragment);
    }

    function initUeberMichParticles(container) { 
        createGenericParticles(container, 20, 'particle', 'ueberMichParticleFloat'); 
    }

    function initHeroParticles(container) { 
        createGenericParticles(container, 30, 'hero-particle', 'heroParticleFloat', {minSize: 1, maxSize: 2}); 
    }

    // Resize Handler
    let globalResizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(globalResizeTimeout);
        globalResizeTimeout = setTimeout(() => {
            const ueberMichSection = document.getElementById('ueber-mich');
            const heroSectionElement = document.getElementById('hero'); 
            const ueberMichParticles = document.getElementById('particles-ueber-mich') || 
                                     document.querySelector('#ueber-mich .particles') ||
                                     document.querySelector('.ueber-mich-particles');
            const heroPcles = document.querySelector('.hero-particles');
            
            if (ueberMichParticles && ueberMichParticles.dataset.initialized === 'true' && ueberMichSection && ueberMichSection.classList.contains('is-visible')) { 
                initUeberMichParticles(ueberMichParticles); 
            }
            if (heroPcles && heroPcles.dataset.initialized === 'true' && heroSectionElement && heroSectionElement.classList.contains('is-visible')) { 
                initHeroParticles(heroPcles); 
            }
            
            const musikSectionResize = document.getElementById('meine-musik');
            const playersForParallaxResize = document.querySelectorAll('.circular-players-container .circular-player');
            if (musikSectionResize && playersForParallaxResize.length > 0) {
                const isMobile = !window.matchMedia("(min-width: 769px)").matches;
                const isMusicVisible = musikSectionResize.classList.contains('is-visible');
                if (!isMobile) {
                     playersForParallaxResize.forEach(player => {
                        let currentScale = player.matches(':hover') || player.classList.contains('is-playing') ? 1.05 : 1;
                        player.style.transform = `translate3d(0px, 0px, 0) scale(${currentScale})`;
                     });
                } else { 
                    playersForParallaxResize.forEach(player => {
                        let currentScale = 1; 
                        if (player.matches(':hover') || player.classList.contains('is-playing')) { 
                            currentScale = 1.05; 
                        } else if (!isMusicVisible) { 
                            currentScale = 0.8; 
                        }
                        const translateY = isMusicVisible ? '0' : '50px'; 
                        player.style.transform = `translateY(${translateY}) scale(${currentScale})`;
                    });
                }
            }
        }, 300);
    });

});