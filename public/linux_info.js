// Enrollment form for linux_info.html.
// Kept as a separate file because the site's CSP (script-src 'self') blocks inline scripts.
// Posts to the same /api/contacts endpoint as the main admission form (src/app/components/Contact.tsx).
(function () {
  var HELPLINE = '01835350647';
  var form = document.getElementById('lead-form');
  if (!form) return;

  var submit = document.getElementById('lead-submit');
  var status = document.getElementById('lead-status');
  var submitLabel = submit.textContent;

  function showStatus(kind, text) {
    status.className = 'form-status ' + kind;
    status.textContent = text;
    status.hidden = false;
  }

  form.addEventListener('input', function () {
    if (status.classList.contains('err')) status.hidden = true;
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;

    var data = new FormData(form);
    var field = function (name) { return String(data.get(name) || '').trim(); };

    var message = [
      'Course: ' + field('course'),
      'Phone: ' + field('phone'),
      'Linux experience: ' + field('level'),
      'Source: linux_info.html',
    ].join('\n');
    if (field('message')) message += '\n\n' + field('message');

    submit.disabled = true;
    submit.textContent = 'Sending...';
    status.hidden = true;

    fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: field('name'),
        email: field('email'),
        message: message,
        website: field('website'),
      }),
      signal: typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(15000) : undefined,
    })
      .then(function (res) {
        if (res.ok) return;
        // Error pages from the proxy (502/504) are HTML, not JSON
        return res.json().catch(function () { return {}; }).then(function (body) {
          var fallback = res.status === 429
            ? 'Too many submissions. Please try again later or call ' + HELPLINE + '.'
            : 'Could not submit right now. Please try again or call ' + HELPLINE + '.';
          throw new Error(body.error || fallback);
        });
      })
      .then(function () {
        form.reset();
        showStatus('ok', 'Thank you! Our admission team will call you soon.');
      })
      .catch(function (err) {
        var text;
        if (err && (err.name === 'TimeoutError' || err.name === 'AbortError')) {
          text = 'The server is taking too long to respond. Please try again or call ' + HELPLINE + '.';
        } else if (err instanceof TypeError) {
          text = 'Network error. Please check your connection and try again.';
        } else {
          text = (err && err.message) || 'Something went wrong. Please call ' + HELPLINE + '.';
        }
        showStatus('err', text);
      })
      .finally(function () {
        submit.disabled = false;
        submit.textContent = submitLabel;
      });
  });
})();
