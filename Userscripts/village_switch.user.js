// ==UserScript==
// @name Sneltoetsen voor volgend en vorig dorp (pijltjestoetsen)
// @include https://nl*.tribalwars.nl/game.php*
// @description Als je op het pijltje naar rechts drukt ga je naar het volgende dorp, als je op het pijltje naar links drukt naar het vorige.
// @version 1.0
// @author Harderstyles
// @Date 11 Augustus 2012
// @grant		   none
// ==/UserScript==
function myKeyDownHandler() {
    if (document.activeElement.tagName !== "TEXTAREA" && document.activeElement.tagName !== "INPUT") {
        if (event.which == 39) {
            window.location.href = document.getElementById("village_switch_right").href;
        }
        if (event.which == 37) {
            window.location.href = document.getElementById("village_switch_left").href;
        }
    }
}

document.onkeydown = myKeyDownHandler;
/*
     FILE ARCHIVED ON 22:04:21 Apr 08, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:50:21 Jan 20, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/