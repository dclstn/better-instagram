// ==UserScript==
// @name         Better Instagram
// @version      1.0.0
// @description  This browser extension enhances your instagram.com experience by adding several essential privacy features.
// @author       VaspDev
// @match        https://www.instagram.com/*
// @icon         https://better-instagram.pages.dev/logo128.png
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// @connect      better-instagram.vasp.dev
// ==/UserScript==

GM_xmlhttpRequest({
    method : "GET",
    url : "https://better-instagram.vasp.dev/build/script.js",
    onload : (response) =>
    {
        const element = document.createElement('script');
        element.innerText = response.responseText;
        document.head.appendChild(element);
    }
});
