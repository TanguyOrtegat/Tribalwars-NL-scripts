// ==UserScript==
// @name		Overlevende troepen @berichten
// @namespace		none
// @author		Heinzel
// @description		Geeft een nieuwe kolom weer in een bericht, met de overlevende troepen
// @include		https://nl*.tribalwars.nl/game.php*mode=all*screen=report*
// @grant		   none
// ==/UserScript==
/* Updated 3-12-2012 by Tuam for TW version 8.9*/
/* get the right tables */
var tabs = document.getElementsByTagName("table");
var tables = [];
for(var x = 0; x < tabs.length; x++)
{
  if(tabs[x].innerHTML.match(/Aantal:/) && !tabs[x].getElementsByTagName("table")[0])
  {
	tables.push(tabs[x]);
  }
}

var len, clone, newTr, newTd;
var unitsWent, unitsLose, unitsSurv;
for(var x = 0; x < tables.length; x++)
{
  len = tables[x].getElementsByTagName("tr")[1].getElementsByTagName("td").length;
  newTr = tables[x].getElementsByTagName("tr")[1].cloneNode(true);
  newTd = newTr.getElementsByTagName("td")[0].cloneNode(true);
	newTd.setAttribute('style','text-align:center');
  newTr.innerHTML = "";
  newTd.innerHTML = "Overlevend: ";
  newTr.appendChild(newTd);
  
  for(var y = 1; y < len; y++)
  {
	/* calc survived Units */
	unitsWent = tables[x].getElementsByTagName("tr")[1].getElementsByTagName("td")[y].innerHTML;
	unitsLose = tables[x].getElementsByTagName("tr")[2].getElementsByTagName("td")[y].innerHTML;
	unitsSurv = (parseInt(unitsWent)-parseInt(unitsLose));
	
	/* set survied Units */
	newTd = newTd.cloneNode(true);
	newTd.innerHTML = unitsSurv;
	newTd.className = (unitsSurv == 0) ? "hidden" : "";
	newTr.appendChild(newTd);
  }
  
  tables[x].getElementsByTagName('tbody')[0].appendChild(newTr);
}
/*
     FILE ARCHIVED ON 22:14:33 Apr 08, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:48:49 Jan 20, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/