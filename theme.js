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

if (getCookie('theme') === 'dark') {
  var link = document.createElement("link");
  link.href = "chrome-extension://" + chrome.runtime.id + "/theme.css"
  link.type = "text/css";
  link.rel = "stylesheet";
  link.media = "screen,print";
  console.log(localStorage.getItem('themeEnabled'))
  link.disabled = localStorage.getItem('themeEnabled') != 'true' || undefined
  link.id = 'blackTheme'
  const html = document.getElementsByTagName("html")
  if (html.length) html[0].appendChild(link);
}