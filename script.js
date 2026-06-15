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

  // Pre-fill contact form when a package was selected on the homepage
  // (e.g. contact.html?package=Gold)
  try {
    var params = new URLSearchParams(window.location.search);
    var pkg = params.get('package');
    var validPackages = ['Silver', 'Gold', 'Platinum', 'Custom'];
    if (pkg && validPackages.indexOf(pkg) !== -1) {
      var select = document.getElementById('package-select');
      var msg = document.getElementById('message-field');
      var banner = document.getElementById('package-banner');
      var bannerName = document.getElementById('package-banner-name');

      if (select) { select.value = pkg; }
      if (msg && !msg.value) {
        if (pkg === 'Custom') {
          msg.value = "I'd like a quote for a custom bookkeeping package. My needs are: ";
        } else {
          msg.value = "I'm interested in signing up for the " + pkg + " bookkeeping package. Please get in touch.";
        }
      }
      if (banner && bannerName) {
        bannerName.textContent = pkg;
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
