// ==UserScript==
// @name          TW Duidelijke miliseconden
// @include       https://*.die-staemme.de/*
// @exclude       https://forum.die-staemme.de/*
// @include       https://*.tribalwars.net/*
// @exclude       https://forum.tribalwars.net/*
// @include       https://*.tribalwars.nl/*
// @exclude       https://forum.tribalwars.nl/*
// @description   Millisekunden sichtbar ; Unpale milliseconds ; Zichtbaarheid miliseconden
// @grant		   none
// ==/UserScript==
/* Updated 3-12-2012 by Tuam for TW version 8.9*/

// ds.GM_unpaleMS.user.js

// version = 1.0
// screenshot: http://c1b1se.c1.funpic.de/newhp_userscripts_screens/

// (c) by C1B1SE

var color = 'black';
var size = '100%';

var elist = document.getElementsByClassName('grey small')
for(var i = 0; i < elist.length; i++)
  {
  elist[i].style.color = color;
  elist[i].style.fontSize = size;
  }
/*
     FILE ARCHIVED ON 19:19:08 Apr 08, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:46:43 Jan 20, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/