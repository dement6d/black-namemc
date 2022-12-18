const usernames = [ 'insane' ]
const customEmoji = 'https://s.namemc.com/img/emoji/twitter/26d3-fe0f.svg'

document.querySelectorAll('.ad-container').forEach(e => e.remove())
document.querySelectorAll('[id^="nn_player"]').forEach(e => e.parentElement.remove())

const ad = document.createElement('div');
ad.classList = 'col-6 col-sm-4 col-lg py-1'
ad.innerHTML =
  '<small style="display: flex; flex-direction: row; gap: 3pt; align-items: center;">' +
    '<a href="https://github.com/dement6d/black-namemc">Black theme</a> by' +
    '<p style="font-family: \'oldLondon\'; font-size: 12pt; margin-bottom: 0.5rem;">demented</p>' +
  '</small>';
document.querySelector('footer > div.row')?.lastChild.after(ad)

// toggle skinart gaps
if (document.URL.includes('/profile/')) {
  const skinsHeader = document.querySelector('.col-md-auto.order-md-1 > .card.mb-3 > .card-header.py-1')
  skinsHeader?.setAttribute('style', 'display: flex; flex-direction: row;')
  const skinArtMode = document.createElement('strong')
  skinArtMode.style = 'margin-left: auto;'
  skinArtMode.innerHTML = 'Skinart Mode <input id="toggleSkinart" type="checkbox"/>'
  skinsHeader?.lastChild.after(skinArtMode)

  document.getElementById('toggleSkinart')?.addEventListener('change', e => changeSkinart(e.target.checked))
}

/**
 * Changes the skinart mode
 * @param {boolean} skinartMode 
 */
function changeSkinart(skinartMode) {
  localStorage.setItem('skinartMode', skinartMode)
  const container = document.querySelector('.skin-2d.align-top.title-time.skin-button')?.parentElement?.parentElement
  if (container) {
    container.style.width = skinartMode ? '312px !important' : '324px !important'
    document.querySelectorAll('.skin-button').forEach(e => {
      if (skinartMode) e.classList.add('skinart')
      else if (e.classList.contains('skinart')) e.classList.remove('skinart')
    })
    document.querySelectorAll('.skin-2d.skin-button').forEach(e => {
      if (skinartMode) e.classList.add('skinart')
      else if (e.classList.contains('skinart')) e.classList.remove('skinart')
    })
    container.style.width = skinartMode ? '312px' : '324px'
  }
}

if (localStorage.getItem('skinartMode') === 'true') {
  changeSkinart(true)
  const toggle = document.getElementById('toggleSkinart')
  if (toggle) toggle.checked = true;
}

// add emoji to specified usernames
if (customEmoji && usernames?.length) {
  if (usernames.includes(document.querySelector('h1.text-nowrap')?.textContent))
    document.querySelectorAll('h1 > img.emoji, .nav-link.dropdown-toggle.pl-0 > img.emoji').forEach(e => e.setAttribute('src', customEmoji))
}

// add theme accent color picker
const settings = document.createElement('li')
settings.id = 'themeSettings'
settings.classList = 'nav-item dropdown'
settings.innerHTML = '<a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">⚙️</a>' +
  '<div class="dropdown-menu dropdown-menu-right">' + 
    '<h7 class="dropdown-header">Theme Settings</h7>' +
    '<div class="dropdown-divider"></div>' +
    '<h8 class="dropdown-header">Accent</h8>' +
    '<input class="dropdown-item" type="color" id="accentColor" value="#ff0000">' +
    '<h8 class="dropdown-header">Toggle Theme <input type="checkbox" id="toggleBlack"/></h8>' +
  '</div>'
document.querySelector('header > nav')?.lastElementChild.lastElementChild.after(settings)
document.getElementById('accentColor')?.addEventListener('change', e => setAccent(e.target.value))
const toggleBlack = document.getElementById('toggleBlack')
if (toggleBlack) {
  toggleBlack.addEventListener('change', e => toggleTheme(e.target.checked))
  toggleBlack.checked = localStorage.getItem('themeEnabled') == 'true'
}

const themeAccent = localStorage.getItem('themeAccent');
if (themeAccent) {
  setAccent(themeAccent)
  const accentInput = document.querySelector('#accentColor')
  if (accentInput) accentInput.value = themeAccent
}

function setAccent(color) {
  const root = document.querySelector(':root')
  root.style = root.style + `; --link-color: ${color} !important; --link-color-transparent: ${color}27;`
  localStorage.setItem('themeAccent', color)
}

function toggleTheme(enabled) {
  if (!enabled) document.getElementById('blackTheme')?.setAttribute('disabled', true)
  else document.getElementById('blackTheme')?.removeAttribute('disabled')
  localStorage.setItem('themeEnabled', enabled)
}