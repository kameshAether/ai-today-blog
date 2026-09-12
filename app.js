document.addEventListener('DOMContentLoaded', () => {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.card, .reveal').forEach(el => el.classList.add('no-js'));
  }
  const revealer = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('vis'); revealer.unobserve(e.target); }
  }), { threshold: 0.12 });
  const pending = new Set();
  document.querySelectorAll('.card, .reveal').forEach(el => { pending.add(el); revealer.observe(el); });
  // Safety net: if the observer never fires (broken/headless IO), never leave content invisible
  setTimeout(() => pending.forEach(el => {
    if (!el.classList.contains('vis')) { el.classList.add('vis'); revealer.unobserve(el); }
  }), 2500);

  const chips = document.querySelectorAll('.chip');
  const cards = document.querySelectorAll('#grid .card');
  const search = document.getElementById('q');
  let desk = 'All';
  function apply() {
    const q = ((search && search.value) || '').toLowerCase();
    let visible = 0;
    cards.forEach(c => {
      const okD = desk === 'All' || c.dataset.desk === desk;
      const okQ = !q || (c.dataset.search || '').toLowerCase().includes(q);
      const show = okD && okQ;
      c.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    const countEl = document.getElementById('search-count');
    if (countEl) {
      countEl.textContent = q ? visible + ' result' + (visible === 1 ? '' : 's') : '';
    }
  }
  chips.forEach(ch => ch.addEventListener('click', () => {
    chips.forEach(x => x.classList.remove('on'));
    ch.classList.add('on'); desk = ch.dataset.desk; apply();
  }));
  if (search) search.addEventListener('input', apply);

  const bar = document.getElementById('progress');
  if (bar) addEventListener('scroll', () => {
    const h = document.documentElement;
    bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
  }, { passive: true });

  const form = document.getElementById('nl');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    form.innerHTML = '<p style="font-weight:600">You are on the list. First edition lands tomorrow morning.</p>';
  });

  try {
    if (localStorage.getItem('aitoday-theme') === 'dark') document.body.classList.add('dark');
  } catch (e) {}
  const tgl = document.getElementById('theme-toggle');
  function paint() { tgl.textContent = document.body.classList.contains('dark') ? '☀ Light' : '◑ Dark'; }
  if (tgl) {
    paint();
    tgl.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      try { localStorage.setItem('aitoday-theme', document.body.classList.contains('dark') ? 'dark' : 'light'); } catch (e) {}
      paint();
    });
  }
});
