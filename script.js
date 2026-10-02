// Reveal on scroll
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add('in'));
}

// Share: native sheet on phones, copy link elsewhere
const toast = document.getElementById('toast');
function notify(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(notify.t);
  notify.t = setTimeout(() => toast.classList.remove('show'), 2200);
}

document.getElementById('share').addEventListener('click', async () => {
  const data = { title: 'Gavin Ho — Aviation Planning at CHIN', url: location.href.split('#')[0] };
  if (navigator.share) {
    try { await navigator.share(data); } catch (_) { /* dismissed */ }
    return;
  }
  try {
    await navigator.clipboard.writeText(data.url);
    notify('Link copied');
  } catch (_) {
    notify(data.url);
  }
});
