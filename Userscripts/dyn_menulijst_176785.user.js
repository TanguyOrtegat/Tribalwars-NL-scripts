// ==UserScript==
  
// @name            GM dynamische menu verwijderen
  
// @author          Tjeerdo
// @version         1.0i   
// @description     verwijderd het dynamische menu
// @include         https://nl*.tribalwars.nl/game.php?*
  
// @grant		   none
// ==/UserScript==

function dynamicMenu()
{
$(".menu_column").remove();
}
function injectScript(func) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + func + ')();';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}

injectScript(dynamicMenu);

/*
     FILE ARCHIVED ON 22:14:03 Apr 08, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:46:57 Jan 20, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/