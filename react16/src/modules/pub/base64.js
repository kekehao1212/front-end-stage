/**
	https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/btoa

	Usage:
	utoa('✓ à la mode'); // 4pyTIMOgIGxhIG1vZGU=
	atou('4pyTIMOgIGxhIG1vZGU='); // "✓ à la mode"

	utoa('I \u2661 Unicode!'); // SSDimaEgVW5pY29kZSE=
	atou('SSDimaEgVW5pY29kZSE='); // "I ♡ Unicode!"
**/

// ucs-2 string to base64 encoded ascii
export function utoa(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}
// base64 encoded ascii to ucs-2 string
export function atou(str) {
    return decodeURIComponent(escape(window.atob(str)));
}
