(() => {
const C = HOTEL_CONFIG, $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
let L = localStorage.getItem('lang') || 'ar', cur = 'iqd', mode = 'night', tab = 'all';
const T = k => C.i18n[L][k] ?? k, img = n => `assets/images/${n}.jpg`, fmt = n => Math.round(n).toLocaleString('en-US');
const rate = r => r.price * (mode === 'week' ? C.weekendFactor : 1) / (cur === 'usd' ? C.usdRate : 1);
const room = id => C.rooms.find(r => r.id === id);

/* Rolling counter */
function count(el, to) {
  const from = +el.dataset.v || 0, t0 = performance.now(); el.dataset.v = to;
  const f = t => { const k = Math.min(1, (t - t0) / 900); el.textContent = fmt(from + (to - from) * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f); };
  requestAnimationFrame(f);
}
const unit = () => cur === 'usd' ? T('usd') : T('iqd');
function prices() { $$('.price [data-r]').forEach(e => { if (e.closest('.card').classList.contains('seen')) count(e, rate(room(e.dataset.r))); }); $$('.price em').forEach(e => e.textContent = unit()); }

/* Rendering */
function rooms() {
  $('#roomGrid').innerHTML = C.rooms.map(r => `<article class="card tilt reveal" data-id="${r.id}">
    <div class="ph" data-g="${r.id}"><img src="${img(r.imgs[0])}" alt="${T(r.id)}" loading="lazy"></div>
    <div class="body"><h3>${T(r.id)}</h3><p>${T(r.id + 'D')}</p>
    <div class="price"><span data-r="${r.id}" data-v="0">0</span> <em>${unit()}</em><small>${T('perNight')}</small></div>
    <div class="acts"><button class="btn sm" data-book="${r.id}">${T('book')}</button><button class="btn sm ghost" data-g="${r.id}">${T('gallery')}</button></div></div></article>`).join('');
  $('#cRoom').innerHTML = C.rooms.map(r => `<option value="${r.id}">${T(r.id)}</option>`).join('');
  observe();
}
function services() {
  const cats = ['all', 'stay', 'dine', 'events', 'well'];
  $('#tabs').innerHTML = cats.map(c => `<button data-t="${c}" class="${c === tab ? 'on' : ''}">${T(c)}</button>`).join('');
  $('#servGrid').innerHTML = C.services.filter(s => tab === 'all' || s.cat === tab).map(s => `<article class="card sv tilt reveal">
    <div class="bg" style="background-image:url(${img(s.img)})"></div><span class="badge">${T(s.cat)}</span><div class="ico">${s.ico}</div><h3>${T(s.id)}</h3><p>${T(s.id + 'd')}</p></article>`).join('');
  observe();
}
function addons() {
  const old = $$('#addons input:checked').map(i => i.value);
  $('#addons').innerHTML = C.addons.map(a => `<label><input type="checkbox" value="${a.id}" ${old.includes(a.id) ? 'checked' : ''}>${T(a.id)} (${fmt(a.price)} ${T('iqd')})</label>`).join('');
}

/* Language */
function lang(l, anim) {
  L = l; localStorage.setItem('lang', l);
  const d = document.documentElement; d.lang = l; d.dir = l === 'ar' ? 'rtl' : 'ltr';
  if (anim) document.body.classList.add('swap');
  setTimeout(() => {
    $$('[data-i18n]').forEach(e => e.textContent = T(e.dataset.i18n));
    document.title = `${T('hotel')} | ${l === 'ar' ? 'White Tower Hotel' : 'فندق البرج الأبيض'}`;
    $('#langBtn').textContent = l === 'ar' ? 'EN' : 'عربي';
    rooms(); services(); addons(); calc(); prices();
    document.body.classList.remove('swap');
  }, anim ? 220 : 0);
}

/* Reveal + tilt */
let io;
function observe() {
  io = io || new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in', 'seen'); io.unobserve(e.target); const p = e.target.querySelector('[data-r]'); if (p) count(p, rate(room(p.dataset.r))); } }), { threshold: .15 });
  $$('.reveal:not(.in)').forEach(e => io.observe(e));
}
document.addEventListener('pointermove', e => {
  const c = e.target.closest?.('.tilt'); if (!c || e.pointerType === 'touch') return;
  const b = c.getBoundingClientRect(), x = (e.clientX - b.left) / b.width, y = (e.clientY - b.top) / b.height;
  c.style.setProperty('--ry', ((x - .5) * 10) + 'deg'); c.style.setProperty('--rx', ((.5 - y) * 10) + 'deg');
  c.style.setProperty('--mx', x * 100 + '%'); c.style.setProperty('--my', y * 100 + '%');
});
document.addEventListener('pointerout', e => { const c = e.target.closest?.('.tilt'); if (c && !c.contains(e.relatedTarget)) { c.style.setProperty('--rx', '0'); c.style.setProperty('--ry', '0'); } });

/* Hover image cycling on room cards */
let cyc;
document.addEventListener('pointerover', e => {
  const p = e.target.closest?.('.ph'); if (!p || p.dataset.cy) return; p.dataset.cy = 1;
  const r = room(p.dataset.g), im = p.querySelector('img'); let i = 0;
  cyc = setInterval(() => { i = (i + 1) % r.imgs.length; im.src = img(r.imgs[i]); }, 1400);
  p.addEventListener('pointerleave', () => { clearInterval(cyc); delete p.dataset.cy; im.src = img(r.imgs[0]); }, { once: true });
});

/* Lightbox */
let set = [], idx = 0;
function show(i) {
  idx = (i + set.length) % set.length; $('#lbImg').src = img(set[idx]);
  $('#lbT').innerHTML = set.map((s, k) => `<img src="${img(s)}" data-k="${k}" class="${k === idx ? 'on' : ''}" alt="">`).join('');
}
function openLB(id) { set = room(id).imgs; $('#lb').hidden = false; show(0); $('#lbX').focus(); }
const closeLB = () => $('#lb').hidden = true;
$('#lbX').onclick = closeLB; $('#lbP').onclick = () => show(idx - 1); $('#lbN').onclick = () => show(idx + 1);
$('#lbT').onclick = e => e.target.dataset.k && show(+e.target.dataset.k);
$('#lb').onclick = e => e.target.id === 'lb' && closeLB();
document.addEventListener('keydown', e => {
  if ($('#lb').hidden) return; const rtl = document.dir === 'rtl' || document.documentElement.dir === 'rtl';
  if (e.key === 'Escape') closeLB();
  if (e.key === 'ArrowRight') show(idx + (rtl ? -1 : 1)); if (e.key === 'ArrowLeft') show(idx + (rtl ? 1 : -1));
});

/* Calculator + WhatsApp */
const nights = () => { const a = new Date($('#cIn').value), b = new Date($('#cOut').value); const n = Math.round((b - a) / 864e5); return n > 0 ? n : 0; };
function totalIQD() {
  const n = nights(), r = room($('#cRoom').value), k = +$('#cRooms').value || 1;
  const base = r.price * (mode === 'week' ? C.weekendFactor : 1) * n * k;
  const ex = $$('#addons input:checked').reduce((s, i) => { const a = C.addons.find(x => x.id === i.value); return s + a.price * (a.perNight ? n : 1); }, 0);
  return base + ex;
}
function calc() { $('#sN').textContent = nights(); const t = totalIQD() / (cur === 'usd' ? C.usdRate : 1); count($('#sT'), t); $('em[data-i18n=iqd]').textContent = unit(); }
function message() {
  const t = k => T(k), r = room($('#cRoom').value), v = id => $(id).value.trim() || '—';
  const ex = $$('#addons input:checked').map(i => T(i.value)).join('، ') || t('none');
  return [`${t('greet')} ${t('hotel')}`, `${t('gName')}: ${v('#cName')}`, `${t('gPhone')}: ${v('#cPhone')}`, `${t('gRoom')}: ${t(r.id)}`,
    `${t('gIn')}: ${v('#cIn')} | ${t('gOut')}: ${v('#cOut')} | ${t('gN')}: ${nights()}`, `${t('gR')}: ${v('#cRooms')} | ${t('gG')}: ${v('#cG')}`,
    `${t('gX')}: ${ex}`, `${t('gT')}: ${fmt(totalIQD())} ${t('iqd') === 'IQD' ? 'IQD' : 'د.ع'}`, `${t('gNote')}: ${v('#cNotes')}`].join('\n');
}
const wa = () => window.open(`https://wa.me/${C.wa}?text=${encodeURIComponent(message())}`, '_blank', 'noopener');

/* Events */
document.addEventListener('click', e => {
  const b = e.target.closest('button,a'); if (!b) return;
  if (b.dataset.g) openLB(b.dataset.g);
  if (b.dataset.book) { $('#cRoom').value = b.dataset.book; calc(); wa(); }
  if (b.dataset.t) { tab = b.dataset.t; services(); }
  if (b.dataset.m) { mode = b.dataset.m; $$('#modeSeg button').forEach(x => x.classList.toggle('on', x === b)); prices(); calc(); }
  if (b.dataset.c) { cur = b.dataset.c; $$('#curSeg button').forEach(x => x.classList.toggle('on', x === b)); prices(); calc(); }
  if (b.closest('#links')) { $('#links').classList.remove('open'); $('#burger').setAttribute('aria-expanded', 'false'); }
});
$('#langBtn').onclick = () => lang(L === 'ar' ? 'en' : 'ar', true);
$('#burger').onclick = () => { const o = $('#links').classList.toggle('open'); $('#burger').setAttribute('aria-expanded', o); };
$('#calc').addEventListener('input', calc);
$('#send').onclick = () => { if (!nights()) { $('#err').textContent = T('needDates'); return; } $('#err').textContent = ''; wa(); };
$('#waBtn').onclick = e => { e.preventDefault(); wa(); };
$('#qGo').onclick = () => { $('#cIn').value = $('#qIn').value; $('#cOut').value = $('#qOut').value; $('#cG').value = $('#qG').value; calc(); $('#book').scrollIntoView({ behavior: 'smooth' }); };
const today = new Date().toISOString().slice(0, 10); $$('input[type=date]').forEach(i => i.min = today);

/* Hero slides + golden dust */
$('#slides').innerHTML = C.hero.map((h, i) => `<div class="${i ? '' : 'on'}" style="background-image:url(${img(h)})"></div>`).join('');
let s = 0; setInterval(() => { const a = $$('#slides div'); a[s].classList.remove('on'); s = (s + 1) % a.length; a[s].classList.add('on'); }, 7000);
const cv = $('#dust'), cx = cv.getContext('2d'); let ps = [];
function size() { cv.width = cv.offsetWidth; cv.height = cv.offsetHeight; ps = Array.from({ length: Math.min(60, cv.width / 20) }, () => ({ x: Math.random() * cv.width, y: Math.random() * cv.height, r: Math.random() * 1.8 + .4, v: Math.random() * .4 + .1, a: Math.random() })); }
function dust() { cx.clearRect(0, 0, cv.width, cv.height); ps.forEach(p => { p.y -= p.v; p.a += .02; if (p.y < -5) { p.y = cv.height + 5; p.x = Math.random() * cv.width; } cx.fillStyle = `rgba(245,226,156,${.25 + .35 * Math.abs(Math.sin(p.a))})`; cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 6.3); cx.fill(); }); requestAnimationFrame(dust); }
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) { size(); dust(); addEventListener('resize', size); }

lang(L, false);
})();
