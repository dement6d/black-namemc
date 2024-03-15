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

function setAccent(color) {
    const root = document.querySelector(':root');
    const prevStyle = root.getAttribute('style');
    console.log(prevStyle)
    root.style = prevStyle + `; --link-color: ${color} !important; --link-color-transparent: ${color}27;`
    localStorage.setItem('themeAccent', color)
}

function setDarkness(darkness) {
    const addition = (100 - darkness) / 2;
    const bg = 5 + addition;
    const main = 5 + addition;
    const card = 10 + addition;
    const inpGrp = 15 + addition;
    const inpGrpBrd = 20 + addition;
    const inpGrpBrdHov = 30 + addition;
    const inpGrpBrdFoc = 40 + addition;
    const root = document.querySelector(':root');
    const prevStyle = root.getAttribute('style');
    root.style = prevStyle + `; --bg: rgb(${bg}, ${bg}, ${bg});` +
        `--main: rgb(${main}, ${main}, ${main});` +
        `--card: rgb(${card}, ${card}, ${card});` +
        `--input-group: rgb(${inpGrp}, ${inpGrp}, ${inpGrp});` +
        `--input-group-border: rgb(${inpGrpBrd}, ${inpGrpBrd}, ${inpGrpBrd});` +
        `--input-group-border-hover: rgb(${inpGrpBrdHov}, ${inpGrpBrdHov}, ${inpGrpBrdHov});` +
        `--input-group-border-focus: rgb(${inpGrpBrdFoc}, ${inpGrpBrdFoc}, ${inpGrpBrdFoc});`;
    localStorage.setItem('themeDarkness', darkness);
}

function setCookie(name, value, expiration = 3.15576e+11) {
    document.cookie = `${name}=${value}; domain=.namemc.com; path=/; expires=${(new Date(Date.now() + expiration)).toUTCString()}`;
}

function setThemeState(enabled) {
    if (!enabled) document.getElementById('blackTheme')?.setAttribute('disabled', true)
    else {
        document.getElementById('blackTheme')?.removeAttribute('disabled')
        setCookie('theme', 'dark');
    }
    localStorage.setItem('themeEnabled', enabled)
}


const usernames = ['insane']
const customEmoji = 'https://s.namemc.com/img/emoji/twitter/26d3-fe0f.svg'

document.querySelectorAll('.ad-container').forEach(e => e.remove())
document.querySelectorAll('[id^="nn_player"]').forEach(e => e.parentElement.remove())

const ad = document.createElement('div');
ad.classList = 'col-6 col-sm-4 col-lg py-1'
ad.innerHTML =
    '<small style="display: flex; flex-direction: row; gap: 3pt; align-items: center; justify-content: center;">' +
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
settings.innerHTML =
    '<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">⚙️</a>' +
    '<div class="dropdown-menu dropdown-menu-right">' +
        '<h2 class="dropdown-header">Theme Settings</h7>' +
        '<div class="dropdown-divider"></div>' +
        '<h8 class="dropdown-header">Accent</h8>' +
        '<input class="dropdown-item" type="color" id="accentColor" value="#ff0000">' +
        '<h8 class="dropdown-header">Darkness</h8>' +
        '<div class="dropdown-item">' +
            '<input type="range" min="1" max="100" value="100" class="slider" id="darkness">' +
        '</div>'  +
        '<h8 class="dropdown-header">Toggle Theme <input type="checkbox" id="toggleBlack"/></h8>' +
    '</div>';
document.querySelector('header > nav')?.lastElementChild.lastElementChild.after(settings)

// Theme toggle
const toggleBlack = document.getElementById('toggleBlack')
if (toggleBlack) {
    toggleBlack.addEventListener('change', e => setThemeState(e.target.checked))
    toggleBlack.checked = localStorage.getItem('themeEnabled') == 'true'
}

// Accent
document.getElementById('accentColor')?.addEventListener('change', e => setAccent(e.target.value))
const themeAccent = localStorage.getItem('themeAccent');
if (themeAccent) {
    setAccent(themeAccent)
    const accentInput = document.querySelector('#accentColor');
    if (accentInput) accentInput.value = themeAccent;
}

// Darkness
document.getElementById('darkness')?.addEventListener('change', e => setDarkness(e.target.value));
let themeDarkness = localStorage.getItem('themeDarkness');
if (themeDarkness == undefined || themeDarkness == null) {
    themeDarkness = 100;
}
setDarkness(themeDarkness);
const darknessInput = document.querySelector('#darkness');
if (darknessInput) darknessInput.value = themeDarkness;

// dropping names
const statusBar = document.querySelector('#status-bar.bg-info')
if (statusBar) {
    // statusBar.classList.remove('bg-info')
    // statusBar.classList.add('dropping')
}

// opens the settings if its the first time using the extension
if (
    localStorage.getItem('bnFirstTime') !== 'true' &&
    document.querySelector('#themeSettings a') !== null
) {
    localStorage.setItem('bnFirstTime', 'true');
    document.querySelector('#themeSettings a')?.click();
}