/**
 * Small loader to display page after folder-box has been fully added
 * to the page. Future: Add lazy loading as well as some sort 
 * of splash screen functinality. 
 */
function showSplash() {
  let content = document.querySelector('#content');
  content.addEventListener('box-loaded', function () {
    document.body.classList.remove('loading');
  });
}

showSplash();