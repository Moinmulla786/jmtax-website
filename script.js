// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // Pre-fill contact form when a service or package was selected on another page
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

  // Simple non-functional form guard (static backup — no backend)
  document.querySelectorAll('form[data-static]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = f.querySelector('.form-status');
      if (note) {
        note.textContent = 'This is a backup copy of the site — to send your message, please call (647) 877-8637 or email jandmtaxsolutions@gmail.com.';
        note.style.display = 'block';
      }
    });
  });
});
