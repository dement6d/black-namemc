const usernames = [ 'insane' ]
const customEmoji = 'https://s.namemc.com/img/emoji/twitter/26d3-fe0f.svg'

function getCookie(name) {
  // Split cookie string and get all individual name=value pairs in an array
  var cookieArr = document.cookie.split(";");
  // Loop through the array elements
  for(var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");
      /* Removing whitespace at the beginning of the cookie name
      and compare it with the given string */
      if(name == cookiePair[0].trim()) {
          // Decode the cookie value and return
          return decodeURIComponent(cookiePair[1]);
      }
  }
  // Return null if not found
  return null;
}

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

  document.getElementById('toggleSkinart').addEventListener('change', e => changeSkinart(e.target.checked))
}

/**
 * Changes the skinart mode
 * @param {boolean} skinartMode 
 */
function changeSkinart(skinartMode) {
  document.cookie = 'skinartMode=' + skinartMode
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

if (getCookie('skinartMode') === 'true') {
  changeSkinart(true)
  const toggle = document.getElementById('toggleSkinart')
  if (toggle) toggle.checked = true;
}

// add emoji to specified usernames
if (customEmoji && usernames?.length) {
  if (usernames.includes(document.querySelector('h1.text-nowrap')?.textContent))
    document.querySelectorAll('h1 > img.emoji, .nav-link.dropdown-toggle.pl-0 > img.emoji').forEach(e => e.setAttribute('src', customEmoji))
}