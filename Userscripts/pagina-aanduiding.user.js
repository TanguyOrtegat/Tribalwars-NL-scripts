// ==UserScript==
// @name           TW Pagina-aanduiding onderaan weergeven
// @namespace      http://home.deds.nl/~lekensteyn/p/
// @description    Plaatst de paginalinks boven de berichtenpagina ook onderaan
// @include        https://nl*.tribalwars.nl/game.php*screen=report*
// @grant		   none
// ==/UserScript==
/* Updated 4-12-2012 by Tuam for TW version 8.9*/
(function () {
	// XPath single result
	var $x = function (p,c){return document.evaluate(p,c||document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue};
	
	var pages_row = $x('//web.archive.org/web/20160509123323/http://table/tbody/tr/td[@colspan=3 and @align="center"]/a[@class="paged-nav-item" and contains(., "[") and contains(., "]")]/..');
	if (pages_row) {
		var footer_table = $x('//web.archive.org/web/20160509123323/http://table/[@id="report_list"]/tbody');
		var pages_table = document.createElement("tr");
		pages_table.className = "vis";
		pages_table.width = "100%";
		pages_table.appendChild(pages_row.cloneNode(true));
		footer_table.insertBefore(pages_table, footer_table.lastChild.nextSibling);
	}
})()
/*
     FILE ARCHIVED ON 12:33:23 May 09, 2016 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:48:49 Jan 20, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/