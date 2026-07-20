document.addEventListener('DOMContentLoaded', () => {
  const includes = document.querySelectorAll('[data-include]');
  includes.forEach(async (el) => {
    const url = el.getAttribute('data-include');
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${url} not found (${res.status})`);
      const html = await res.text();
      el.innerHTML = html;

      // Execute any scripts inside the included fragment
      const scripts = el.querySelectorAll('script');
      scripts.forEach((oldScript) => {
        const s = document.createElement('script');
        if (oldScript.src) s.src = oldScript.src;
        else s.textContent = oldScript.textContent;
        if (oldScript.type) s.type = oldScript.type;
        document.head.appendChild(s);
        oldScript.remove();
      });
    } catch (err) {
      console.error('Include failed:', err);
      el.innerHTML = '';
    }
  });
});
