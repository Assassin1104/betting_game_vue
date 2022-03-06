const inBrowser = typeof window !== "undefined";
const UA = inBrowser && window.navigator.userAgent.toLowerCase();

export const isIE = UA && /msie|trident/.test(UA);
export const isIE11 = isIE && UA.indexOf('11.0') > 0;
export const isEdge = UA && UA.indexOf('edge/') > 0;
export const isAndroid = UA && UA.indexOf('android') > 0;
export const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
export const isGoogleChrome = isChrome && !!window.googleapis;
export const isChromeDerivate = isChrome && !isGoogleChrome;
export const isFirefox = UA && !!UA.indexOf("firefox/");