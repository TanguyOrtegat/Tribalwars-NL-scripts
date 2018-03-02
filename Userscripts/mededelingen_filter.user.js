// ==UserScript==
// @name           Mededelingen filter
// @namespace      http://home.deds.nl/~lekensteyn/p/
// @author         Lekensteyn <lekensteyn@gmail.com>
// @version        20022010-1
// @description    Geeft je de mogelijkheid om mededelingen te filteren
// @include        https://nl*.tribalwars.nl/game.php*screen=mail*
// @grant		   none
// ==/UserScript==
function $x(p,c){return document.evaluate(p,c||document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue}
function $X(p,c){var d=document,i,r=[],x=d.evaluate(p,c||d,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);for(i=0;e=x.snapshotItem(i);i++)r.push(e);return r}
function trim(s){return s.replace(/^\s+/,'').replace(/\s+$/,'')}

var msgtable = $x('//web.archive.org/web/20170408203532/http://form/[contains(@action, "action=del_move_multiple")]/table/tbody/tr/th/../../..'),
	messages = $X('//a[contains(@href, "view=")]', msgtable), fields,
	searchbox, searchinput, searchplayer, searchtimer;
if(msgtable && messages.length){
	function search(){
		var query = searchinput.value.toLowerCase(), player = searchplayer.value.toLowerCase(), i, tr;
		if(!fields){
			fields = [];
			for(i=0; i<messages.length; i++){
				tr = messages[i].parentNode.parentNode;
				fields.push([tr, trim(messages[i].textContent).toLowerCase(),
							trim(tr.cells[1].textContent).toLowerCase()]);
			}
		}
		for(i=0; i<fields.length; i++){
			tr = fields[i];
			tr[0].style.display = (tr[1].indexOf(query) | tr[2].indexOf(player)) == -1 ? 'none' : '';
		}
	}
	function keyhandler(ev){
		clearTimeout(searchtimer);
		if(ev.keyCode == 13){
			search();
			ev.preventDefault();
		}
		else{
			searchtimer = setTimeout(search, 300);
		}
	}
	searchbox = document.createElement('div');
	searchinput = document.createElement('input');
	searchplayer = searchinput.cloneNode(false);
	searchinput.addEventListener('keypress', keyhandler, false);
	searchplayer.addEventListener('keypress', keyhandler, false);
	searchbox.appendChild(document.createTextNode('Filter; Onderwerp:'));
	searchbox.appendChild(searchinput);
	searchbox.appendChild(document.createTextNode('; Gesprekspartner:'));
	searchbox.appendChild(searchplayer);
	msgtable.parentNode.insertBefore(searchbox, msgtable);
}
/*
     FILE ARCHIVED ON 20:35:32 Apr 08, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:48:12 Jan 20, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/