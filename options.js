// Load the current value
window.addEventListener('DOMContentLoaded', function() {
  const perPageInput = document.getElementById('perPage');
  const status = document.getElementById('status');

  // Load saved value
  if (chrome && chrome.storage && chrome.storage.sync) {
    chrome.storage.sync.get({ perPage: '100' }, function(items) {
      perPageInput.value = items.perPage;
    });
  } else {
    perPageInput.value = '100';
  }

  // Save on submit
  document.getElementById('options-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const value = perPageInput.value;
    if (chrome && chrome.storage && chrome.storage.sync) {
      chrome.storage.sync.set({ perPage: value }, function() {
        status.textContent = 'Saved!';
        setTimeout(() => status.textContent = '', 1500);
      });
    }
  });
});
