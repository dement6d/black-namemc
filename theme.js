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

function setAccent(color) {
    const root = document.querySelector(':root');
    const prevStyle = root.getAttribute('style');
    console.log(prevStyle)
    root.style = prevStyle + `; --link-color: ${color} !important; --link-color-transparent: ${color}27;`
    localStorage.setItem('themeAccent', color)
}

var link = document.createElement("link");
link.href = "chrome-extension://" + chrome.runtime.id + "/theme.css"
link.type = "text/css";
link.rel = "stylesheet";
link.media = "screen,print";
link.disabled = localStorage.getItem('themeEnabled') != 'true' || getCookie('theme') === 'light' || undefined
link.id = 'blackTheme'
const html = document.getElementsByTagName("html")
if (html.length) html[0].appendChild(link);

// Darkness
document.getElementById('darkness')?.addEventListener('change', e => setDarkness(e.target.value));
let themeDarkness = localStorage.getItem('themeDarkness');
if (themeDarkness == undefined || themeDarkness == null) {
    themeDarkness = 100;
}
setDarkness(themeDarkness);
const darknessInput = document.querySelector('#darkness');
if (darknessInput) darknessInput.value = themeDarkness;

// Accent
document.getElementById('accentColor')?.addEventListener('change', e => setAccent(e.target.value))
const themeAccent = localStorage.getItem('themeAccent');
if (themeAccent) {
    setAccent(themeAccent)
    const accentInput = document.querySelector('#accentColor');
    if (accentInput) accentInput.value = themeAccent;
}