// ==UserScript==
// @name                 TW OD in berichten
// @namespace            c1b1.de
// @author               C1B1SE | Changed by Tuam for TW.nl v8.8
// @description          Voegt een regel met de Verslagen tegenstanders punten toe aan berichten
// @include              https://nl*.tribalwars.nl/game.php*mode=all*screen=report*
// @grant		   none
// ==/UserScript==

// ds.bashpointsInReports.user.js

/*
DS Bashpoints in Berichten

(c) by C1B1SE
         info@c1b1.de
         http://c1b1.de

Do not republish, use in other scripts, change or reproduce this code nor a part of this code without permission from C1B1SE.
You may change string values if it's necessary for your language area.

This script may be forbidden in some language areas.
Please look in the respective forum for further information!
I won't take responsibility.

Version 1.3.3

Screenshot: http://img231.imageshack.us/my.php?image=unbenanntpn3.png
*/

const url = document.location.href;
const lang = url.split('.')[0].split(/\/\/(\D+)\d+/)[1];
const world = parseInt(url.split('.').shift().split(lang).pop());

function stringInt(int) { var string = parseInt(int).toString(10); var reo = new RegExp('(-?[0-9]+)([0-9]{3})'); while(reo.test(string)) string = string.replace(reo,'$1.$2'); return string; };
function GTFW (type)
  {
  if( (lang == 'de' && (world < 20 || world == 40 || world == 42)) || (lang == 'ch' && world < 2) ||  (lang == 'en' && world < 14)  ||  (lang == 'nl' && world < 6))
    return 2;
  else
    if(type == 'att')
      return 1;
  return 0;
  }

// Strings
const lstrings =
  {
  'quantity' : {
    'de' : 'Anzahl:',
    'ch' : 'Azau:',
    'en' : 'Quantity:',
    'nl' : 'Aantal:'}

  }

// Bashpoints
const unit_points =
  {            //  def   att   w19
  'spear'     :  [   4,    1,    1],
  'sword'     :  [   5,    2,    1],
  'axe'       :  [   1,    4,    1],
  'archer'    :  [   5,    2,    1],
  'spy'       :  [   1,    2,    2],
  'light'     :  [   5,   13,    4],
  'marcher'   :  [   6,   12,    5],
  'heavy'     :  [  23,   15,    6],
  'ram'       :  [   4,    8,    5],
  'catapult'  :  [  12,   10,    8],
  'knight'    :  [  40,   20,  100],
  'priest'    :  [   0,    0,  100],
  'snob'      :  [ 200,  200,   10],
	'militia'		:	 [   4,    1,    1]
  };

// Get Tables
var tables = findByInner(document,lstrings.quantity[lang]);
attacker_table = tables[0].parentNode.parentNode;
defender_table = tables[1].parentNode.parentNode;

// Get Units
var units = new Array('empty');
var elist = attacker_table.getElementsByTagName('tr')[0].getElementsByTagName('td');
for(var i = 1; i < elist.length; i++)
  {
  // graphic/unit/unit_spear.png?1
  var unit = elist[i].getElementsByTagName('img')[0].getAttribute('src').match(/_(.+).png/)[1];
  void units.push( unit );
  };

// Get Attacker's Lost Units
var index = GTFW('att');
var attackers_points = 0;
var elist = attacker_table.getElementsByTagName('tr')[2].getElementsByTagName('td');
for(var i = 1; i < elist.length; i++)
  {
  var unit_att_lost = parseInt(elist[i].firstChild.data);
  attackers_points += unit_att_lost * unit_points[units[i]][index];
  };

// Get Defender's Lost Units
var index = GTFW('def');
var defender_points = 0;
var elist = defender_table.getElementsByTagName('tr')[2].getElementsByTagName('td');
if (world > 20) { void units.push('militia'); }
for(var i = 1; i < elist.length; i++)
 	{
  var unit_def_lost = parseInt(elist[i].firstChild.data);
 	defender_points += unit_def_lost * unit_points[units[i]][index];
  };

// Insert Defender Points
var tr = document.createElement('tr');
var td = document.createElement('td');
td.setAttribute('colspan','2');
td.appendChild(document.createTextNode('ODA: '+stringInt(defender_points)));
tr.appendChild(td);
attacker_table.parentNode.parentNode.parentNode.parentNode.appendChild(tr);

// Insert Attacker Points
var tr = tr.cloneNode(true);
tr.firstChild.replaceChild(document.createTextNode('ODD: '+stringInt(attackers_points)),tr.firstChild.firstChild);
defender_table.parentNode.parentNode.parentNode.parentNode.appendChild(tr);


function findByInner(obj,value) {
    var len = obj.getElementsByTagName('*').length;
    var list = new Object();
    var  a = 0;
    for(var i = 0; i < len; i++) {
      if(obj.getElementsByTagName('*')[i].firstChild) {
        if(obj.getElementsByTagName('*')[i].firstChild.data) {
          if(obj.getElementsByTagName('*')[i].firstChild.data.indexOf(value) != -1) {
            list[a] = obj.getElementsByTagName('*')[i];
            a++; } } } }
    list['length'] = a;
    return list; }
/*
     FILE ARCHIVED ON 20:03:04 Apr 08, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:48:22 Jan 20, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/