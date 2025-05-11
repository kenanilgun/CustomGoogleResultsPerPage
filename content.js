(function() {
  function applyPerPage(perPage) {
    const url = new URL(window.location.href);

    // Only run on main search results, not images, news, etc.
    if (url.pathname === "/search" && !url.searchParams.has("num")) {
      url.searchParams.set("num", perPage);
      window.location.replace(url.toString());
      return;
    }

    // If on the Google homepage, intercept the search form
    if (url.pathname === "/") {
      document.addEventListener("DOMContentLoaded", function() {
        const form = document.querySelector('form[action="/search"]');
        if (form) {
          form.addEventListener("submit", function(e) {
            const input = form.querySelector('input[name="num"]');
            if (!input) {
              const numInput = document.createElement("input");
              numInput.type = "hidden";
              numInput.name = "num";
              numInput.value = perPage;
              form.appendChild(numInput);
            } else {
              input.value = perPage;
            }
          }, true);
        }
      });
    }
  }

  // Get per-page value from storage, default to 100
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
    chrome.storage.sync.get({ perPage: '100' }, function(items) {
      applyPerPage(items.perPage);
    });
  } else {
    applyPerPage('100');
  }
})();
