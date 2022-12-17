
document.querySelectorAll('.ad-container').forEach(e => e.remove())
document.querySelectorAll('[id^="nn_player"]').forEach(e => e.parentElement.remove())

// skin art
const container = document.querySelector('.skin-2d.align-top.title-time.skin-button')?.parentElement?.parentElement
if (container) container.setAttribute(
  'style', container.getAttribute('style') + '; width: 300px !important;'
)