function getLocationHref(url) {
  var newUrl = url || ''
  if (location.hostname.indexOf('.vpal.com') > -1) {
    newUrl = url.replace(/(.vpal.com)/g, '.vpal.com')
  } else if (location.hostname.indexOf('.vpal.com')) {
    newUrl = url.replace(/(.vpal.com)/g, '.vpal.com')
  }
  return newUrl
}

function locationHref(href) {
  location.href = getLocationHref(href || '')
}
window.locationHref = locationHref
window.getLocationHref = getLocationHref