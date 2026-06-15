// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  // Services dropdown: tapping/clicking the toggle opens the submenu
  // (instead of navigating away), so submenu items are reachable on touch.
  document.querySelectorAll('.nav .has-drop').forEach(function (drop) {
    var dropToggle = drop.querySelector('.drop-toggle');
    if (dropToggle) {
      dropToggle.addEventListener('click', function (e) {
        e.preventDefault();
        drop.classList.toggle('open');
      });
    }
  });

  // Close the mobile menu when a real destination link is clicked,
  // but NOT when the Services toggle itself is clicked.
  if (nav) {
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (a.classList.contains('drop-toggle')) { return; }
        nav.classList.remove('open');
      });
    });
  }

  // Close any open dropdown when clicking outside of it
  document.addEventListener('click', function (e) {
    document.querySelectorAll('.nav .has-drop.open').forEach(function (drop) {
      if (!drop.contains(e.target)) { drop.classList.remove('open'); }
    });
  });
  // (e.g. contact.html?package=Gold or contact.html?service=Personal+Taxes)
  try {
    var params = new URLSearchParams(window.location.search);
    var pick = params.get('package') || params.get('service');
    var valid = {
      'Silver': 'the Silver bookkeeping plan',
      'Gold': 'the Gold bookkeeping plan',
      'Platinum': 'the Platinum bookkeeping plan',
      'Custom': 'a custom bookkeeping package',
      'Personal Taxes': 'Personal Tax filing',
      'Corporate Taxes': 'Corporate Tax filing',
      'Consultation': 'a consultation'
    };
    if (pick && valid[pick]) {
      var select = document.getElementById('package-select');
      var msg = document.getElementById('message-field');
      var banner = document.getElementById('package-banner');
      var bannerName = document.getElementById('package-banner-name');

      if (select) { select.value = pick; }
      if (msg && !msg.value) {
        if (pick === 'Custom') {
          msg.value = "I'd like a quote for a custom bookkeeping package. My needs are: ";
        } else if (pick === 'Consultation') {
          msg.value = "I'd like to book a consultation. Please get in touch to arrange a time.";
        } else {
          msg.value = "I'm interested in " + valid[pick] + ". Please get in touch.";
        }
      }
      if (banner && bannerName) {
        bannerName.textContent = pick;
        banner.style.display = 'block';
      }
    }
  } catch (e) { /* no-op if URL parsing unsupported */ }

  // Submit forms to Formspree via AJAX so the user stays on the page
  document.querySelectorAll('form.ajax-form').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = f.querySelector('.form-status');
      var btn = f.querySelector('button[type="submit"]');
      var data = new FormData(f);

      if (note) {
        note.style.display = 'block';
        note.style.color = 'var(--slate)';
        note.textContent = 'Sending…';
      }
      if (btn) { btn.disabled = true; }

      fetch(f.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          f.reset();
          if (note) {
            note.style.color = 'var(--teal)';
            note.textContent = 'Thank you! Your message has been sent — we\'ll be in touch soon.';
          }
          var banner = document.getElementById('package-banner');
          if (banner) { banner.style.display = 'none'; }
        } else {
          response.json().then(function (d) {
            if (note) {
              note.style.color = '#b3261e';
              note.textContent = (d && d.errors && d.errors.length)
                ? d.errors.map(function (x) { return x.message; }).join(', ')
                : 'Something went wrong. Please call (647) 877-8637 or email jandmtaxsolutions@gmail.com.';
            }
          }).catch(function () {
            if (note) { note.style.color = '#b3261e'; note.textContent = 'Something went wrong. Please call (647) 877-8637 or email jandmtaxsolutions@gmail.com.'; }
          });
        }
      }).catch(function () {
        if (note) {
          note.style.color = '#b3261e';
          note.textContent = 'Network error. Please call (647) 877-8637 or email jandmtaxsolutions@gmail.com.';
        }
      }).finally(function () {
        if (btn) { btn.disabled = false; }
      });
    });
  });
});
