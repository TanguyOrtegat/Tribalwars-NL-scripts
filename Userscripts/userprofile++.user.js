// ==UserScript==
// @name           Spice up the profile
// @namespace      none
// @author				 Laoujin / De Goede Fee
// @version			1.2
// @include https://nl*.tribalwars.nl/game.php?*screen=info_player*
// @include https://nl*.tribalwars.nl/game.php?*screen=info_ally*
// @include https://nl*.tribalwars.nl/game.php?*mode=profile&screen=ally*
// @grant		   none
// ==/UserScript==

//Aangepast door Lekensteyn, heb er veel plezier mee :)
// 2013 09 16 Aangepast door Tuam

function addJQuery(callback) {
	var script = document.createElement('script');
	script.setAttribute("src", "//web.archive.org/web/20170408135821/http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "window.$=jQuery.noConflict(true);(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function main() {
	// instellingen
	// Verander true in false om de instelling uit te zetten
	// true om de instelling in te schakelen (let op: hoofdlettergevoelig)
	var weergeefKopjesBovenPlaatjes = true;
	var weergeefScheidingsLijn = true;
	// einde extra opties

	var server = 'nl';
	var srv = location.host.match(/\w+/)[0];
	try {
		var id = location.href.match(/[?&]id=(\d+)/)[1];
	} catch (e) {
		var id = game_data.player.ally_id;
	}
	var isPlayer = !!location.href.match(/[?&]screen=info_player/), saveName = 'profielpp_'+(isPlayer ? 'p' : 't');
	var tblb = document.getElementsByTagName('th')[isPlayer?4:0].parentNode.offsetParent.nextSibling,
	table = document.createElement('table');
	table.className = 'vis';
	table.width = '100%';
	tblb.parentNode.insertBefore(table, tblb);
	var twLink = 'http://'+server+'.twstats.com/image.php?type='+(isPlayer?'player':'tribe')+'graph&id='+id+'&s='+srv+'&graph=';

	var graphs = {
		'points': ['Punten', 2],
		'villages': ['Dorpen', 4],
		'od': ['OD Totaal', 8],
		'oda': ['OD Aanval', 16],
		'odd': ['OD Verdediging', 32],
		'rank': ['Rang', 64]
	};
	if(!isPlayer) graphs['members'] = ['Leden', 128];
	// persistence functions
	var win=window,doc=win.document;
	function getCookie(n){var c='; '+doc.cookie+';',s='; '+encodeURIComponent(n)+'=',b=c.indexOf(s),e;if(b==-1)return'';b=b+s.length;e=c.indexOf(';',b);return decodeURIComponent(c.substring(b,e))}
	function setCookie(n,v,l){var e=encodeURIComponent,L=parseInt(l)||0,c=doc.cookie;if(L&&c.length+e(n+v).length-e(('; '+c).indexOf('; '+n+'=')+1?n+getCookie(n):'').length>4027)throw alert('Cookie "'+n+'" kon niet opgeslagen worden: te weinig vrije ruimte voor cookies!');doc.cookie=e(n)+'='+e(v)+'; max-age='+L}
	var loSt=win.localStorage,
	getValue=loSt?function(n){return loSt.getItem(n)||''}:getCookie,setValue=loSt?function(n,v){v===0||v?loSt.setItem(n,v):loSt.removeItem(n)}:function(n,v){setCookie(n,v,1e7)},getValueC=loSt?function(n){var v=getCookie(n);if(v!=''){setValue(n,v);setCookie(n,0)}else return getValue(n);return v}:getCookie;

	var th = document.createElement('th'), ca = document.createElement('a');
	ca.title = 'TW Stats veroveringen';
	ca.target = '_blank';
	ca.href = 'http://'+server+'.twstats.com/'+srv+'/index.php?page='+(isPlayer?'player':'tribe')+'&mode=conquers&id='+id;
	ca.innerHTML = 'TW Stats';
	th.appendChild(ca);
	table.insertRow(-1).appendChild(th);

	// retrieve display preferences
	var graphshow = parseInt(getValue(saveName)) || (isPlayer ? 127 : 255), desc, d, img;
	var prefsrow = table.insertRow(-1), prefs = prefsrow.insertCell(0);
	prefs.appendChild(document.createTextNode('Weergeef: '));

	var db = document.createElement('a'), hideCb = getValue(saveName+'_h') != '';
	db.style.cssText = 'font-size:small;float:right';
	db.title = 'Weergeef/verberg de weergave-instellingen';
	db.href = 'javascript:void("'+db.title+'")';
	db.addEventListener('click', function(){
		setValue(saveName+'_h', hideCb = hideCb == '' ? '1' : '');
		prefsrow.style.display = hideCb ? 'none' : '';
	}, false);
	db.innerHTML = 'Weergaveinstellingen';
	if(hideCb){
		prefsrow.style.display = 'none';
	}
	th.appendChild(db);
	function togvis(i, show){
		var c = graphs[i][2];
		c.parentNode.style.display = show ? '' : 'none';
		if(show){
			var g = document.createElement('img');
			g.alt = 'TWStats graph';
			g.src = twLink+i;
		}
		else{
			var g = document.createElement('span');
		}
		c = c.firstChild;
		if(c.childNodes.length > 1) c.replaceChild(g, c.lastChild);
		else c.appendChild(g);
	}
	var j = 0, show;
	for(var i in graphs){
		graphs[i][2] = table.insertRow(-1).insertCell(0);
		d = document.createElement('div');
		if(weergeefScheidingsLijn){
			d.style.cssText = 'margin-top:5px;border-top:1px solid #000';
		}
		desc = document.createElement('h4');
		if(!weergeefKopjesBovenPlaatjes){
			desc.style.display = 'none';
		}
		desc.innerHTML = graphs[i][0];
		d.appendChild(desc);
		graphs[i][2].appendChild(d);
		var lbl = document.createElement('label'), inpc = document.createElement('input');
		inpc.type = 'checkbox';
		inpc.value = i;
		inpc.addEventListener('click', function(){
			var what = this.value, c = graphs[what][2], show = c.firstChild.lastChild.tagName != 'IMG';
			if(show) graphshow |= graphs[what][1];
			else graphshow = (graphshow | graphs[what][1]) - graphs[what][1];
			setValue(saveName, graphshow);
			togvis(what, show);
		}, false);
		if((show=graphshow & graphs[i][1])) inpc.checked = true;
		lbl.appendChild(inpc);
		lbl.appendChild(document.createTextNode(' '+graphs[i][0]));
		if(++j % 3 == 0) prefs.appendChild(document.createElement('br'));
		prefs.appendChild(lbl);
		togvis(i, show);
	}
}
addJQuery(main);
/*
     FILE ARCHIVED ON 13:58:21 Apr 08, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:50:04 Jan 20, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/