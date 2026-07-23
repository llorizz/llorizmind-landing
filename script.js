/* ============================================================
   LLORIZZMIND — interacción
   Demo del hero, reveals al scroll y formulario.
   ============================================================ */

/* [REVISAR] URL del webhook de n8n para recibir los leads directamente en
   tu pipeline. Si se deja vacío, el formulario envía por FormSubmit
   (email a montero@llorizzmind.com). */
const FORM_ENDPOINT = 'https://new-project-n8n.b5eoo1.easypanel.host/webhook/FormularioLlorizzMind';

const FORMSUBMIT_AJAX = 'https://formsubmit.co/ajax/montero@llorizzmind.com';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

document.documentElement.classList.remove('no-js');

/* ---------- Nav: hairline al hacer scroll + menú móvil ---------- */

const nav = $('#nav');

const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const navToggle = $('#nav-toggle');
const navMobile = $('#nav-mobile');

function setMenu(open) {
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    navMobile.hidden = !open;
}

navToggle.addEventListener('click', () => {
    setMenu(navToggle.getAttribute('aria-expanded') !== 'true');
});

$$('a', navMobile).forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !navMobile.hidden) {
        setMenu(false);
        navToggle.focus();
    }
});

/* ---------- Reveal al scroll (una sola vez, stagger 60ms) ---------- */

const revealTargets = [];
$$('[data-reveal]').forEach((el) => revealTargets.push([el, 0]));
$$('[data-reveal-group]').forEach((group) => {
    Array.from(group.children).forEach((child, i) => revealTargets.push([child, i * 60]));
});

if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    io.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );
    revealTargets.forEach(([el, delay]) => {
        el.classList.add('reveal');
        if (delay) el.style.setProperty('--d', delay + 'ms');
        io.observe(el);
    });
}

/* ---------- Cómo funciona: la tinta sube/baja con el scroll ----------
   La línea se rellena de coral, un punto viaja sobre ella y cada número
   se enciende al ser alcanzado. Todo es función de la posición de scroll,
   así que al subir se revierte exactamente igual que al bajar. */

const howPath = $('#how-path');
const howWrap = $('.how-wrap');
const howDot = $('.how-dot');
const howSteps = $$('.how-step', howWrap || document);

if (howPath && howWrap && howDot && !reducedMotion.matches) {
    howWrap.classList.add('how-progress');

    const LINE_TOP = 8; // debe coincidir con .how-line { top: 8px }
    const LINE_INSET = 16; // debe coincidir con .how-line { height: calc(100% - 16px) }

    // Umbral de cada número medido con getBoundingClientRect (no offsetTop):
    // .how-step lleva un transform para su propia animación de aparición, y
    // un transform en un ancestro convierte a ese ancestro en offsetParent,
    // así que offsetTop daba 0 para los tres números (todos "tocaban" a la vez).
    let thresholds = [];

    const measureThresholds = () => {
        const wrapRect = howWrap.getBoundingClientRect();
        const lineHeight = wrapRect.height - LINE_INSET;
        if (lineHeight <= 0) return;
        thresholds = howSteps.map((step) => {
            const num = $('.how-num', step);
            const numRect = num.getBoundingClientRect();
            const center = numRect.top + numRect.height / 2 - wrapRect.top;
            return (center - LINE_TOP) / lineHeight;
        });
    };

    let ticking = false;

    const drawLine = () => {
        ticking = false;
        const rect = howWrap.getBoundingClientRect();
        const lineHeight = rect.height - LINE_INSET;
        if (lineHeight <= 0) return;

        const visible = Math.min(Math.max(window.innerHeight * 0.75 - rect.top - LINE_TOP, 0), lineHeight);
        const progress = visible / lineHeight;

        howPath.style.strokeDashoffset = String(100 - progress * 100);

        const fillPx = LINE_TOP + progress * lineHeight;
        howDot.style.transform = `translateY(${fillPx}px)`;
        howDot.classList.toggle('visible', progress > 0.01 && progress < 0.995);

        howSteps.forEach((step, i) => {
            step.classList.toggle('is-active', progress >= thresholds[i]);
        });
    };

    const requestDraw = () => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(drawLine);
        }
    };

    measureThresholds();
    drawLine();
    window.addEventListener('scroll', requestDraw, { passive: true });
    window.addEventListener('resize', () => {
        measureThresholds();
        requestDraw();
    }, { passive: true });
}

/* ---------- Panel sticky de "Cómo funciona" ----------
   Nada de scrubbing píxel a píxel: un IntersectionObserver con la banda
   reducida al centro del viewport (rootMargin -45%/-45%) avisa cuando un
   paso llega al medio, y el panel solo cambia de data-state. La transición
   entre estados la resuelve el CSS. */

const howPanel = $('#how-panel');

if (howPanel && howWrap && howSteps.length && !reducedMotion.matches && 'IntersectionObserver' in window) {
    howWrap.classList.add('how-focus');

    // Con la banda tan estrecha normalmente solo hay un paso dentro, pero al
    // hacer scroll rápido pueden solaparse: nos quedamos con el más cercano
    // al centro, así el resultado no depende del orden de las entradas.
    const inBand = new Set();

    const syncState = () => {
        if (!inBand.size) return;

        const center = window.innerHeight / 2;
        let current = null;
        let best = Infinity;

        inBand.forEach((step) => {
            const rect = step.getBoundingClientRect();
            const distance = Math.abs(rect.top + rect.height / 2 - center);
            if (distance < best) {
                best = distance;
                current = step;
            }
        });

        howPanel.dataset.state = current.dataset.panelState;
        howSteps.forEach((step) => step.classList.toggle('is-current', step === current));
    };

    // El sticky se suelta cuando el fondo de su columna alcanza al panel. Para
    // que eso no ocurra antes de tiempo (con el paso 03 aún en el centro), la
    // columna del panel necesita llegar hasta el centro del último paso más
    // media altura de panel. Depende del alto del viewport, así que se mide.
    const panelCol = howPanel.parentElement;
    const desktop = window.matchMedia('(min-width: 901px)'); // igual que el CSS del sticky

    // Margen: al medir en carga los pasos aún llevan el translateY de su
    // animación de aparición y las fuentes pueden no haber cambiado todavía.
    const PANEL_SAFETY = 32;

    const sizePanelColumn = () => {
        if (!desktop.matches) {
            panelCol.style.minHeight = '';
            return;
        }
        const last = howSteps[howSteps.length - 1].getBoundingClientRect();
        const wrapTop = howWrap.getBoundingClientRect().top;
        const lastCenter = last.top + last.height / 2 - wrapTop;
        panelCol.style.minHeight = `${Math.ceil(lastCenter + howPanel.offsetHeight / 2) + PANEL_SAFETY}px`;
    };

    sizePanelColumn();
    window.addEventListener('load', sizePanelColumn);
    window.addEventListener('resize', sizePanelColumn, { passive: true });

    const panelObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) inBand.add(entry.target);
                else inBand.delete(entry.target);
            });
            syncState();
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    howSteps.forEach((step) => panelObserver.observe(step));
}

/* ---------- Elemento firma: la conversación que se escribe sola ---------- */

const demoPanel = $('#demo-panel');
const demoReplay = $('#demo-replay');

if (demoPanel && !reducedMotion.matches) {
    const steps = Array.from($('#demo-chat').children);
    const fields = Array.from($('#demo-fields').children);

    // Pausa entre pasadas del bucle
    const REPLAY_DELAY = 5000;

    let playing = false;
    let loopTimer = 0;
    let inView = false;

    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const isVisible = (el) => el.offsetParent !== null;

    async function play() {
        if (playing) return;
        playing = true;
        clearTimeout(loopTimer);
        loopTimer = 0;
        demoReplay.hidden = true;

        demoPanel.classList.add('is-animating');
        steps.forEach((el) => el.classList.remove('shown', 'typing'));
        fields.forEach((el) => el.classList.remove('filled'));
        await wait(200);

        // El dato de un mensaje oculto en móvil se rellena igual: la ficha
        // nunca queda a medias
        const fill = (el) => {
            const i = Number(el.dataset.field);
            if (fields[i]) fields[i].classList.add('filled');
        };

        for (const el of steps) {
            if (!isVisible(el)) {
                if (el.dataset.field) fill(el);
                continue;
            }
            await wait(Number(el.dataset.delay || 800));
            const typing = Number(el.dataset.typing || 0);
            if (typing) {
                el.classList.add('typing', 'shown');
                await wait(typing);
                el.classList.remove('typing');
            } else {
                el.classList.add('shown');
            }
            // El agente extrae el dato justo después de leer el mensaje
            if (el.dataset.field) {
                await wait(350);
                fill(el);
            }
        }

        // Un respiro con la ficha ya completa antes de ofrecer el repetir
        await wait(900);

        playing = false;
        demoReplay.hidden = false;
        queueReplay();
    }

    // La conversación se repite en bucle: 5 s de pausa entre pasadas
    function queueReplay() {
        clearTimeout(loopTimer);
        loopTimer = setTimeout(() => {
            loopTimer = 0;
            // Fuera de pantalla o pestaña en segundo plano: espera a resume()
            if (inView && !document.hidden) play();
        }, REPLAY_DELAY);
    }

    // Único punto de arranque: primera pasada y reanudación del bucle
    function resume() {
        if (playing || loopTimer || !inView || document.hidden) return;
        play();
    }

    const io = new IntersectionObserver(
        (entries) => {
            inView = entries.some((entry) => entry.isIntersecting);
            resume();
        },
        { threshold: 0.3 }
    );
    io.observe(demoPanel);

    document.addEventListener('visibilitychange', resume);
    demoReplay.addEventListener('click', play);
}

/* ---------- FAQ: un solo panel abierto ---------- */

$$('.faq-item').forEach((item) => {
    item.addEventListener('toggle', () => {
        if (!item.open) return;
        $$('.faq-item[open]').forEach((other) => {
            if (other !== item) other.open = false;
        });
    });
});

/* ---------- Formulario: validación inline + envío ---------- */

const form = $('#form-demo');
const formResult = $('.form-result');
const submitBtn = $('#form-submit');

const FIELDS = {
    nombre: {
        input: 'f-nombre',
        error: 'err-nombre',
        check: (v) => (v.trim() ? '' : 'Falta tu nombre')
    },
    inmobiliaria: {
        input: 'f-inmobiliaria',
        error: 'err-inmobiliaria',
        check: (v) => (v.trim() ? '' : 'Falta el nombre de tu inmobiliaria')
    },
    email: {
        input: 'f-email',
        error: 'err-email',
        check: (v) => {
            if (!v.trim()) return 'Falta el email';
            return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Ese email no parece válido';
        }
    },
    whatsapp: {
        input: 'f-whatsapp',
        error: 'err-whatsapp',
        check: (v) => {
            if (!v.trim()) return 'Falta tu número de WhatsApp';
            return v.replace(/\D/g, '').length >= 7 ? '' : 'Ese número no parece válido';
        }
    },
    leads_mes: {
        input: 'f-leads',
        error: 'err-leads',
        check: (v) => (v ? '' : 'Elige un rango de leads')
    }
};

let formAttempted = false;

function validateField(name) {
    const field = FIELDS[name];
    const input = document.getElementById(field.input);
    const errorEl = document.getElementById(field.error);
    const message = field.check(input.value);

    if (message) {
        errorEl.textContent = message;
        errorEl.hidden = false;
        input.setAttribute('aria-invalid', 'true');
        input.setAttribute('aria-describedby', field.error);
    } else {
        errorEl.hidden = true;
        input.removeAttribute('aria-invalid');
        input.removeAttribute('aria-describedby');
    }
    return !message;
}

function validateForm() {
    let firstInvalid = null;
    Object.keys(FIELDS).forEach((name) => {
        const valid = validateField(name);
        if (!valid && !firstInvalid) firstInvalid = document.getElementById(FIELDS[name].input);
    });
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
}

Object.keys(FIELDS).forEach((name) => {
    const input = document.getElementById(FIELDS[name].input);
    input.addEventListener('input', () => {
        if (formAttempted) validateField(name);
    });
});

function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (c) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}

function showSuccess(nombre) {
    form.hidden = true;
    const primerNombre = nombre ? escapeHtml(nombre.trim().split(/\s+/)[0]) : '';
    formResult.innerHTML =
        '<div class="form-result-ok">' +
        '<h3>Recibido' + (primerNombre ? ', ' + primerNombre : '') + '.</h3>' +
        '<p>Te escribimos por WhatsApp en menos de 24 horas para confirmar día y hora de la demo.</p>' +
        '<p>Si quieres adelantar trabajo, ten a mano un par de leads recientes: la demo se hace con ellos.</p>' +
        '</div>';
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    formAttempted = true;
    formResult.innerHTML = '';

    if (!validateForm()) return;

    // Honeypot: los bots lo rellenan; fingimos éxito sin enviar
    if (form.elements._honey.value) {
        showSuccess(form.elements.nombre.value);
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando…';

    try {
        const data = new FormData(form);
        let response;
        if (FORM_ENDPOINT) {
            data.delete('_honey');
            response = await fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(Object.fromEntries(data))
            });
        } else {
            response = await fetch(FORMSUBMIT_AJAX, {
                method: 'POST',
                headers: { Accept: 'application/json' },
                body: data
            });
        }
        if (!response.ok) throw new Error('send-failed');
        showSuccess(form.elements.nombre.value);
    } catch (err) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Reservar demo';
        formResult.innerHTML =
            '<p class="form-result-err">No se ha podido enviar. Prueba otra vez o escríbenos a montero@llorizzmind.com.</p>';
    }
});
