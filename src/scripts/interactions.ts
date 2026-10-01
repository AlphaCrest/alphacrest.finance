/**
 * Site-wide interaction runtime, bundled once per page by Layout.astro.
 * Everything here is progressive enhancement: content and navigation never depend on it.
 */

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));

/* --header-h mirrors the fixed header's real height (anchor offsets, subpage spacing, mobile menu).
   ResizeObserver reports the initial size too, so no separate first write is needed. */
function syncHeaderHeight() {
  const header = document.getElementById('site-header');
  if (!header) return;
  new ResizeObserver(() => {
    document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`);
  }).observe(header);
}

/* Blur-rise reveal: elements with .reveal get .is-visible once they scroll into view. */
function initReveals() {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

/* Count-ups: <span data-count="100" data-suffix="%" aria-hidden="true">100%</span> next to an sr-only copy. */
function initCountUps() {
  const counters = document.querySelectorAll<HTMLElement>('[data-count]');
  if (!counters.length || reducedMotion.matches) return;

  const format = (el: HTMLElement, value: number) => {
    const decimals = Number(el.dataset.decimals ?? 0);
    el.textContent = `${el.dataset.prefix ?? ''}${value.toFixed(decimals)}${el.dataset.suffix ?? ''}`;
  };

  const run = (el: HTMLElement) => {
    const target = Number(el.dataset.count);
    const duration = 1800;
    const start = performance.now();
    const frame = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      format(el, target * easeOutExpo(t));
      if (t < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        run(entry.target as HTMLElement);
      }
    },
    { threshold: 0.6 },
  );

  counters.forEach((el) => {
    format(el, 0);
    observer.observe(el);
  });
}

/* Spotlight panels: one delegated listener writes the pointer position into --mx/--my. */
function initSpotlights() {
  if (!finePointer.matches) return;
  document.addEventListener(
    'pointermove',
    (event) => {
      const panel = (event.target as Element | null)?.closest<HTMLElement>('.spotlight');
      if (!panel) return;
      const rect = panel.getBoundingClientRect();
      panel.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      panel.style.setProperty('--my', `${event.clientY - rect.top}px`);
    },
    { passive: true },
  );
}

/* Magnetic buttons lean a few pixels toward the cursor. */
function initMagnetic() {
  if (!finePointer.matches || reducedMotion.matches) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty('--mag-x', `${(x * 10).toFixed(2)}px`);
      el.style.setProperty('--mag-y', `${(y * 8).toFixed(2)}px`);
    });
    el.addEventListener('pointerleave', () => {
      el.style.removeProperty('--mag-x');
      el.style.removeProperty('--mag-y');
    });
  });
}

syncHeaderHeight();
initReveals();
initCountUps();
initSpotlights();
initMagnetic();
