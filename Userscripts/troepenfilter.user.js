// ==UserScript==
// @name           TW Troepenfilter
// @version        2.0
// @description    Filtert de troepen van het dorp uit het totale aantal troepen.
// @namespace      www.45622066.nl | Tuam
// @include        https://nl*.tribalwars.nl/*screen=overview*
// @grant          none
// ==/UserScript==

/*	Changelog version 2
*		13-12-2012 v2.0i first version for TW8.9
*/

(function(){
	var settings = {
		"version" : "2.0",
		"units"		: {"spear"		:	{"name" : "Speervechter",					"img" : "unit_spear.png?1",			"own" : 0,	"in_village" : 0},
								 "sword"		: {"name" : "Zwaardvechter",				"img" : "unit_sword.png?1",			"own" : 0,	"in_village" : 0},
								 "axe"			: {"name" : "Bijlstrijder",					"img" : "unit_axe.png?1",				"own" : 0,	"in_village" : 0},
								 "archer"		: {"name" : "Boogschutter",					"img" : "unit_archer.png?1",		"own" : 0,	"in_village" : 0},
								 "spy"			: {"name" : "Verkenner",						"img" : "unit_spy.png?1",				"own" : 0,	"in_village" : 0},
								 "light"		: {"name" : "Lichte cavalerie",			"img" : "unit_light.png?1",			"own" : 0,	"in_village" : 0},
								 "marcher"	: {"name" : "Bereden boogschutter",	"img" : "unit_marcher.png?1",		"own" : 0,	"in_village" : 0},
								 "heavy"		: {"name" : "Zware cavalerie",			"img" : "unit_heavy.png?1",			"own" : 0,	"in_village" : 0},
								 "ram"			:	{"name" : "Ram",									"img" : "unit_ram.png?1",				"own" : 0,	"in_village" : 0},
								 "catapult"	: {"name" : "Katapult",							"img" : "unit_catapult.png?1",	"own" : 0,	"in_village" : 0},
								 "knight"		: {"name" : "Ridder",								"img" : "unit_knight.png?1",		"own" : 0,	"in_village" : 0},
								 "snob"			: {"name" : "Edelman",							"img" : "unit_snob.png?1",			"own" : 0,	"in_village" : 0},
								 "militia"	: {"name" : "Burgerwacht",					"img" : "unit_militia.png?1",		"own" : 0,	"in_village" : 0}
		}
	},
	units_available = new Array(),
	Sangu;
	($("a[href$='changeStatus=false']").length != 0 ? Sangu = true : Sangu = false);
	if (!localStorage.Tuam_units_at_world) {
		var xmlhttp=new XMLHttpRequest();
		var url = 'https://'+location.host+'/interface.php?func=get_unit_info';
		xmlhttp.open("GET",url,true);
		xmlhttp.send();
		xmlhttp.onreadystatechange=function() {
			if (xmlhttp.readyState==4 && xmlhttp.status==200) {
				var unit_data=xmlhttp.responseXML;
				unit_data = unit_data.getElementsByTagName('config')[0].children;
				for (var i = 0; i < unit_data.length; i++){
					units_available.push(unit_data[i].nodeName);
				}
				localStorage.Tuam_units_at_world = units_available;
			}
		}
	}
	else if (Sangu != true){ // cancels the script if Sangu is active
		units_available = localStorage.Tuam_units_at_world.split(','); //loading world settings of available units
		var units_td = $('#show_units').find('tbody').find('td');
		var units_amount = units_td.find('strong'); //amount of available units in village -> units_amount[0].innerHTML

		function split_units(url) {
			var xmlhttp;
			xmlhttp=new XMLHttpRequest();
			xmlhttp.onreadystatechange=function() {
				if (xmlhttp.readyState==4 && xmlhttp.status==200) {
					var xml_doc = xmlhttp.responseText;
					var unit_string = xml_doc.split('<a href="javascript:insertUnit($(\'#unit_input_');
					for (var i = 1; i < unit_string.length; i++) {
						var unit_name = unit_string[i].split('\'),')[0];
						var own_unit = unit_string[i].split('(')[1].split(')')[0];
						settings.units[unit_name].own = own_unit; // loading own units
					}
					$('#show_units').find('h4')[0].innerHTML = 'Eigen eenheden';
						var units_img = units_td.find('img');//units_img[1].src
						for (var i = 0; i < units_img.length; i++){ // loading available units in settings
							var current_unit = units_img[i].src.split('unit_')[1].split('.png')[0];
							(units_amount[i].innerHTML ? settings.units[current_unit].in_village = units_amount[i].innerHTML : settings.units[current_unit].in_village = 1);
							(settings.units[current_unit].own > 0 ? units_amount[i].innerHTML = settings.units[current_unit].own : units_amount[i].parentNode.style.display = 'none');
						}
					$('#show_units').find('h4').clone().appendTo('#show_units');
					$('#show_units').find('h4')[1].innerHTML = 'Ondersteunende eenheden';
					$('#show_units').find('div').clone().appendTo('#show_units'); // creates new table for supporting units
					$('#show_units').find('tbody')[1].innerHTML = '';
					for (var i = 0; i < units_available.length-1; i++){
						if (settings.units[units_available[i]].in_village - settings.units[units_available[i]].own != 0 /*&& own_units[i]*/){
							var multi = '';
							if (settings.units[units_available[i]].in_village - settings.units[units_available[i]].own > 0){
								switch (settings.units[units_available[i]].name){
									case'Lichte cavalerie':case'Zware cavalerie':break;
									case'Ram':multi = 'men';break;
									case'Katapult':multi = 'en';break;
									case'Edelman':multi = 'nen';break;
									default:multi = 's';
								}
							}
							$('#show_units').find('tbody')[1].innerHTML += '<tr><td><img src="https://web.archive.org/web/20170408203417/https://cdn2.tribalwars.net/graphic/unit/' + settings.units[units_available[i]].img + '" alt=""/> <strong>' + (settings.units[units_available[i]].in_village -settings.units[units_available[i]].own) + '</strong> ' + settings.units[units_available[i]].name + multi + '</td></tr>';
						}
					}
				}
			}
			xmlhttp.open("GET",url,true);
			xmlhttp.send();
		}
		
		var url = document.URL.replace('overview','place');
		split_units(url);
	}
})()
/*
     FILE ARCHIVED ON 20:34:17 Apr 08, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:47:38 Jan 20, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/