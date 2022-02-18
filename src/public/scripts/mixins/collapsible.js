document.addEventListener('DOMContentLoaded', function (event) {
  const collapsible = document.getElementById('collapsible');

  collapsible.addEventListener('click', function () {
    const content = this.nextElementSibling;
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  });
});
