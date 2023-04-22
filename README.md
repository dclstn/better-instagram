![image](https://user-images.githubusercontent.com/43322006/233504555-ff21cff9-8d26-406e-bfe6-6e2d0e619f25.png)

![example workflow](https://github.com/dclstn/better-instagram/actions/workflows/node.js.yml/badge.svg)

## Better Instagram
This browser extension enhances your instagram.com experience by adding several essential privacy features.

+ User-friendly flush interface: Easy to navigate and utilize.
+ Preserve Complete Conversation Records: Export chat logs as convenient text or JSON files.
+ Disable Read Receipts: Prevent recipients from knowing when you've read their messages.
+ Block Story Viewed Notifications: Stop recipients from seeing that you've viewed their stories.

Additional features coming soon...

## User Script
To get access to the latest features, you can install this user-script with tools like TamperMonkey.
```
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
```
