// ==UserScript==
// @name		TW dorpen met volle opslagplaats markeren
// @description	Geeft dorpen een kleur bij een bepaalde hoeveelheid grondstoffen
// @author		Lekensteyn
// @version     0.2.20100505
// @namespace	http://osor.de/
// @include		https://nl*.tribalwars.nl/game.php?*screen=overview_villages*
// @include		https://nl*.tribalwars.nl/game.php?*screen=snob&mode=reserve*
// @include		https://nl*.tribalwars.nl/game.php?*screen=snob&mode=coin*
// @grant		   none
// ==/UserScript==

(function(){

	// Hier kunnen oneindig veel kleuren bijgezet worden.
	// Een nieuwe markering is in de volgende formaat:
	// [ percentage , 'engelse kleur of #hexadecimale kleur' ]
	// ongeldige percentages worden genegeerd
	var settings = [
		[ 100	, 'red'],
		[  87.5	, 'orange'],
		[  75.5	, 'blue'],
	];
	// einde instellingen

	for(var i=settings.length-1; i>=0; i--){
		if(settings[i].length != 2 || isNaN(settings[i][0]=1*settings[i][0]) || settings[i][0] > 100 || settings[i][0] < 0){
			settings.splice(i, 1);
		}
	}
	settings.sort(function(x, y){return x[0]<y[0]});
	function $x(p,c){return document.evaluate(p,c||document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue}
	var tbl = $x('//web.archive.org/web/20170408222349/http://table/tbody/tr/th[contains(text(), "Grondstoffen")]/../../..');
	if(!tbl) {
		return;
	}
	var rows = tbl.rows,
		th = rows[0].getElementsByTagName('th'),
		gsindex;
	if(!th.length) th = rows[1].cells;
	for(var i=0; i<th.length; i++){
		if(th[i].innerHTML.indexOf('Grondstoffen') != -1){
			gsindex = i;
			break;
		}
	}
	if(!gsindex){
		return;
	}
	for(var i=1; i<rows.length; i++) {
		var gscell = rows[i].cells[gsindex],
			storage = rows[i].cells[gsindex+1];
		if(!storage || isNaN(storage=1*storage.textContent)) continue;
		gscell.innerHTML = gscell.innerHTML.replace(/(?:\d+<span class="grey">\.<\/span>)*\d+/g, function(num){
			var ratio = 100 * (1*num.replace(/\D+/g, '')) / storage;
			for(var j=0; j<settings.length; j++){
				if(ratio >= settings[j][0]){
					return '<span style="color:'+settings[j][1]+'">'+num+'</span>';
				}
			}
			return num;
		});
	}
})();
/*
     FILE ARCHIVED ON 22:23:49 Apr 08, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:48:26 Jan 20, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/