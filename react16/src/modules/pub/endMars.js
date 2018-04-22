var Cookies = require("js-cookie/src/js.cookie.js");
window.Cookies = Cookies;
export function readEndMars() {
  let sc_ext_val = Cookies.getJSON("end_mars_sc_ext");
  return sc_ext_val;
}
export function writeEndMars(sc, ext) {
  let domain = document.domain;
  let i = domain.indexOf(".");
  domain = domain.substr(i);
  let lfdData = {
    sc: sc,
    ext: ext,
    timestamp: +new Date().getTime()
  };
  let expires = new Date();
  let now = expires.getTime();
  now += 15 * 60 * 1000;
  expires.setTime(now);
  Cookies.set("end_mars_sc_ext", lfdData, {
    expires: expires,
    path: "",
    domain: domain,
    secure: true
  });
}
export function writeEndMarsFromUrl(query) {
  if (query && query._stat_sc && query._stat_ext) {
    writeEndMars(query._stat_sc, query._stat_ext);
    window.__acquiringId = query._stat_ext
  }else if(query.acquiringId||query.acquiring_id){
    window.__acquiringId = query.acquiringId||query.acquiring_id
    let mars = readEndMars() 
    if(!mars||!mars.sc||!mars.ext){
      let acquiringId = query.acquiringId||query.acquiring_id
      writeEndMars('cashier_h5', acquiringId);
    }
  }
}
export function clearEndMars() {
  Cookies.remove("end_mars_sc_ext", { path: "" });
}
