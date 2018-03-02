// ==UserScript==
// @name           1Command
// @version        1.11.3
// @description    1Command
// @author         Tuam <tuam@tuam.nl> http://www.tuam.nl/
// @updateURL      http://www.tuam.nl/scripts/scripts/1Command.user.js
// @homepageURL    http://www.tuam.nl/scripts/
// @include        https://*tribalwars*away_detail*
// @include        https://*tribalwars*screen=place*
// @include        https://*tribalwars*screen=overview_villages*
// @include        https://*die-staemme*away_detail*
// @include        https://*die-staemme*screen=place*
// @include        https://*die-staemme*screen=overview_villages*
// @include        https://*voyna-plemyon*away_detail*
// @include        https://*voyna-plemyon*screen=place*
// @include        https://*voyna-plemyon*screen=overview_villages*
// @exclude        https://*tribalwars*mode=call*
// @require        https://media.innogamescdn.com/com_DS_NL/taffy.js
// @grant          none
// @noframes
// @run-at         document-end
// ==/UserScript==


/* KNOWN ERRORS:
- snap links don't work -> I don't care, this script has it's own snap links implemented...
- 1Command will crash if one of below scripts is installed. Just remove them during your need of 1C.
---Support Checker (previous 1C, just remove it),
---multiple versions of this script,
---SloopApp,
---DEI forum pack.

/* Copyright
THIS SCRIPT IS FREE TO USE AS A WHOLE AND COMPLETE SCRIPT.
DO NOT MODIFY THE SCRIPT OR REUSE PARTS OF IT WITHOUT PERMISSION.
CREATING THIS SCRIPT REQUIRED A HUGE AMOUNT OF TIME, BUT I DID CHOSE TO GIVE EVERYONE THE POSSIBILITY TO USE THE SCRIPT WITHOUT A PAYMENT.
  ANY MODIFICATIONS OF THIS SCRIPT SHOULD BE SHEARED ON THESE SAME CONDITIONS.
See http://www.tuam.nl for script information, support and a complete change log.

This script might not be legal on your community. Contact your local community management for information.
*/

(function (f) {
	var d = document,
	s = d.createElement('script');
	s.textContent = '(' + f.toString() + ')()';
	(d.head || d.documentElement || d.body).appendChild(s);
	s.parentNode.removeChild(s)
})(function () {
	var ONE_active = true, world_settings, script_version = '1.11.3';
	function call(url, /*dataType, */last_call, current_call){
		$.ajax({
			url: url/*,
			dataType: 'html'*/
		}).done(function (data) {
			return data;
		});
	};
	
	function get_settings(){
		var units_available = [], unit_speed = [];
		$.ajax({
			url: 'https://'+location.host+'/interface.php?func=get_unit_info',
			success: function (xml) {
				$(xml).find('config').children().each(function(k,v){
					units_available.push($(this).prop('nodeName'));
					unit_speed.push($(this).find('speed').text());
				});
				$.ajax({
					url: 'https://'+location.host+'/interface.php?func=get_building_info',
					success: function (xml2) {
						var church = ($(xml2).find('church').length>0?true:false);
						var militia = ($(xml2).find('militia').length>0?true:false);
						$.ajax({
							url: 'https://'+location.host+'/interface.php?func=get_config',
							success: function (xml3) {
								var speed = parseFloat($(xml3).find('speed').text())*parseFloat($(xml3).find('unit_speed').text());
								var start_night = 0, end_night = 0;
								if ($(xml3).find('night active').text() == '1') {
									start_night = $(xml3).find('start_hour').text();
									end_night = $(xml3).find('end_hour').text();
								}
								world_settings = {
									'units'    : units_available,
									'unit_spd' : unit_speed,
									'church'   : church,
									'militia'  : militia,
									'speed'    : speed,
									'n_start'  : start_night,
									'n_end'    : end_night,
									'version'  : '1.3'
								};
								localStorage.Tuam_settings = JSON.stringify(world_settings);
							}
						});
					}
				});
			}
		});
	}
	/* ---Primary functions--- */
	if (!localStorage.Tuam_settings) get_settings();
	else world_settings = JSON.parse(localStorage.Tuam_settings);
	if (world_settings.version != '1.3') get_settings();
	String.prototype.hashCode = function(){ // source: Wes @ http://werxltd.com
		var hash = 0, i, c;
		if (this.length == 0) return hash;
		for (i = 0, l = this.length; i < l; i++) {
			c  = this.charCodeAt(i);
			hash  = ((hash<<5)-hash)+c;
			hash |= 0;
		}
		return hash;
	};
	function array_search (k, a) {
		for (var i = 0; i < a.length; i++) {
			if (a[i] == k) return true;
		}	
		return false;
	}
	$.cachedScript = function( url, options ) {
		options = $.extend( options || {}, {
			dataType: "script",
			cache: true,
			url: url
		});
		return $.ajax( options );
	};
	function get_groups(initial, one, groups, first_loop){
		if (first_loop != false) {
			delete settings.groups.count;
			$('#innerSC').html(msg[lang].updating);
		}
		if (initial == false) delete localStorage[storageName].groups;
		try {var current_group = groups[0].link.match(/group=(.*?)&screen/)[1];} catch(e) {}
		if (groups[0].type != 'group_static') {
			groups.shift();
			if (first_loop != false) localStorage[storageName] = JSON.stringify(settings); // stores data to prevent malfunction with no storable groups.
			if (groups.length > 0) get_groups(true, one, groups, false);
		}
		else {
			$.ajax({url: game_data.link_base_pure+'train&mode=mass&group='+current_group})
			.success(function(data){
				groups.shift();
				if (groups.length > 0) get_groups(true, one, groups, false); // a lousy ajax loop, but it offers best performance within tw.nl's rules since async support is depreciated. Anyway, this script needs some time to calculate so I won't create other functionality for other communities.
				var group = $(data).find('.vis_item strong').text().slice(1,-2);
				var temp_storage={'number':current_group,'name':group};
				var amount_def_units = 0;
				$.each($(data).find('#mr_all_form input'), function(i){
					if ($(this).attr('value') != 0 && settings.units[$(this).attr('name')] != undefined) {
						temp_storage[$(this).attr('name')] = $(this).attr('value');
						amount_def_units += parseInt($(this).attr('value'));
					}
					if (i == ($(data).find('#mr_all_form input').length-1) && amount_def_units > 1000) {							
						var count = (settings.groups.count?settings.groups.count:0);
						settings.groups[count] = temp_storage;
						settings.groups.index[group] = count;
						count++;
						settings.groups.count = count;
						settings.groups.info[group] = current_group;
						if (settings.cross[current_group] == undefined) settings.cross[current_group] = 100;
						localStorage[storageName] = JSON.stringify(settings);
					}
					
				});
			})
			.error(function(){console.log("to be continued...");})
		}
		if (groups.length <= 1){
			if (initial == true && game_data.mode == 'units') show_targets();
			else oneCommand();
		}
	}
	
	
	/* ---Settings--- */
	var h_mode = ''; //holiday mode
	if (document.URL.match('t=')) h_mode = '&'+document.URL.match(/t=[0-9]*/);
	
	var lang = game_data.market;
	if (lang != 'nl') lang = 'int';
	var msg = {
		'nl'  : {
			'name'          : '1Command',
			'one'           : '1Command',
			'settings'      : 'Instellingen',
			'end'           : 'Sluiten',
			'choose_target' : 'Selecteer je target',
			'load'          : 'Activeer ',
			'commands'      : 'Commando\'s',
			'command'       : 'Bevel ',
			'own_units'     : 'Eigen_troepen',
			'nothing_to_do' : 'Er is niks te doen voor ',
			'min'           : 'Minimum aantal inwoners voor een bevel',
			'city_defence'  : 'Aantal troepen dat thuis moet blijven',
			'time4commands' : 'Minuten nodig om bevelen te versturen',
			'tabs'          : 'Aantal gelijktijdig te openen tabs',
			'cross'         : 'Kruisdef instellingen',
			'cross_perc'    : 'Percentage',
			'group'         : 'Groep',
			'units'         : 'Troepen',
			'update'        : 'Update de groepsinformatie',
			'updating'      : 'Even geduld, 1Command leert je account kennen...',
			'initial'       : 'Jouw ultieme Tribal Wars ervaring wordt ge&iuml;nstalleerd.',
			'store'         : 'Terug',
			'all_units'     : ['Speervechters','Zwaardvechters','Boogschutters','Verkenners','Zware cavalerie','Katapulten'],
			'no_action'     : 'Er is geen actie nodig op deze pagina.',
			'off'           : '1Command uitschakelen',
			'autoClose'     : '1Command zal dit scherm voor je sluiten.',
			'inc_target'    : 'Aantal bevelen per target',
			'no_night'      : 'Geen nachtelijke bezoekjes',
			'support'       : 'Stuur ondersteuning',
			'help'          : 'Klik hier voor hulp',
			'village_memory': 'dorpen opgeslagen',
			'all'           : 'Allemaal',
			'min_one'       : 'Minum aantal',
			'belief'        : 'Alleen gelovige dorpen gebruiken',
			'selected'      : 'dorpen geselecteerd',
			'insert_targets': 'Voer hier de targets in',
			'get_commands'  : 'Klik hier om je bevelen te berekenen',
			'one_submit1'   : 'Stap 1/3: Mogelijke combinaties uitzoeken',
			'one_submit2'   : 'Stap 2/3: sorteren op aankomsttijd',
			'one_submit3'   : 'Stap 3/3: bevelen berekenen: ',
			'missing_comm'  : 'Niet alle bevelen zijn mogelijk met de gekozen instellingen, scroll naar beneden voor een lijstje met onmogelijke targets',
			'error'         : 'Er ging iets mis... probeer het nog eens.',
			'ONE_enter'     : 'Dit is 1Command,\n\nJe hoeft alleen op enter te drukken :)',
			'cancel'        : 'terug',
			'target_error'  : 'Voer targets in!',
			'legal' : {
				'a' : 'Aantal verstuurde aanvallen in de afgelopen ',
				'b' : ' minuten: ',
				'c'	: ', nog toegestaan: ',
				'd' : 'Over ',
				'e' : ' minuten mag je weer.',
				'f' : 'Door dit aantal tabs te openen ga je meer aanvallen versturen dan je de komende minuten mag, wil je doorgaan?'
			},
			'get_crun'		: 'Eerdere bevelen afmaken?',
			'continue_crun'	: 'De gegevens van de bevelen die je nog niet geopend had zijn geladen. Let op dat je het aantal bevelen per dorp op 1 laat staan, als dorpen meer bevelen nodig zijn dan komen ze nu vaker in het invoervak voor.',
			'imp_targets'	: 'De targets waarvoor nu geen bevelen gevonden zijn (meerdere vermeldingen zijn mogelijk)',
			'imp_support'	: 'Je kan niet het hele lijstje voorzien, dit is wat er van het lijstje overblijft',
			'first'			: 'Vroegste aankomsttijd',
			'last'			: 'Laatste aankomsttijd',
			'continue_imp'	: 'Wil je ook de eerdere onmogelijke targets toevoegen?',
			'wrong_target' 	: 'De targetlist klopt niet.',
			'or'			: 'of',
			'unknown_group' : 'De groep is onbekend, kruisdef zal niet werken!',
			'script_update' : '1Command is geupdate naar de laatste versie.<br/><br/>Het verschil ten opzichte van de vorige versie is:<br/>- Fix voor TW\'s https protocol.',
			'update_ok'     : 'Top, nu snel aan de slag!',
			'update_nok'    : 'Ik wil geen updates en bugfixes :(',
			'u_delete'      : 'Jammer dat je niet meegaat met de vernieuwing.\n\nOmdat Tribal Wars een continu vernieuwend spel is zal 1Command daarin mee moeten gaan. Doordat jij ervoor koos om niet met vernieuwing mee te doen kan je helaas 1Command niet gebruiken, maar is het spel ook niet langer geschikt.\n1Command en je account worden nu verwijderd.\n\nMocht je je toch bedenken, druk dan op annuleren.',
			'u_joke'        : 'Welkom terug :p',
			'limit'         : 'Aanvalsbeperkende functionaliteit inschakelen',
			'fastest'       : 'Snelste mogelijkheden uitzoeken',
			'slowest'       : 'Langzaamste mogelijkheden uitzoeken',
			'no_sort'       : 'Willekeurige volgorde',
			'removeStorage' : 'Verwijder de opslag per account (soms nodig om het script te resetten)',
			'new_formula'   : 'Test de nieuwe formule.',
			'reload'        : 'Herlaad de pagina om 1Command opnieuw te starten.'
		},
		'int' : {
			'name'          : '1Command',
			'one'           : '1Command',
			'settings'      : 'Settings',
			'end'           : 'Close',
			'choose_target' : 'Select your target',
			'load'          : 'Activate ',
			'commands'      : 'Commands',
			'command'       : 'Command ',
			'own_units'     : 'Own_units',
			'nothing_to_do' : 'No action required for ',
			'min'           : 'Minimum amount of people for a command',
			'city_defence'  : 'Amount of units which should always be at home',
			'time4commands' : 'Minutes needed to send commands',
			'tabs'          : 'Amount of tabs to be opened simultanously',
			'cross'         : 'Cross def settings',
			'cross_perc'    : 'Percentage',
			'group'         : 'Group',
			'units'         : 'Units',
			'update'        : 'Update the group data',
			'updating'      : 'Please wait for 1Command getting to know your account...',
			'initial'       : 'One moment, your new experience is installing.',
			'store'         : 'Continue',
			'all_units'     : ['Spear fighters','Sword fighters','Archers','Spies','Heavy cavalry','Catapult'],
			'no_action'     : 'This page doesn\'t require attention.',
			'off'           : 'Turn 1Command off',
			'autoClose'     : '1Command will close this window for you.',
			'inc_target'    : 'Amount of commands per target',
			'no_night'      : 'No visitors during the night',
			'support'       : 'Send support',
			'help'          : 'Click here for help',
			'village_memory': 'villages in memory',
			'all'           : 'All',
			'min_one'       : 'Minum amount',
			'belief'        : 'Villages with belief only',
			'selected'      : 'villages selected',
			'insert_targets': 'Insert targets here',
			'get_commands'  : 'Click here to receive your commands',
			'one_submit1'   : 'Stage 1/3: Determining possible combinations',
			'one_submit2'   : 'Stage 2/3: sorting',
			'one_submit3'   : 'Stage 3/3: Calculating commands: ',
			'missing_comm'  : 'Not all needed commands are possible with the chosen settings, scroll down for a list off impossible targets.',
			'error'         : 'Something went wrong... please try again.',
			'ONE_enter'     : 'This is 1Command,\n\nYou\'d only need to press enter :)',
			'cancel'        : 'cancel',
			'target_error'  : 'Add targets here!',
			'legal' : {
				'a' : 'Amount of send attacks during the last ',
				'b' : ' minutes: ',
				'c'	: ', you still have left: ',
				'd' : 'In ',
				'e' : ' minutes you can go on.',
				'f' : 'By opening this amount of tabs you will send more commands than you are allowed to. Do you really want to continue?'
			},
			'get_crun'		: 'Finish earlier commands?',
			'continue_crun'	: 'The data for the tabs which you haven\'t opened yet is restored. Do not change the amount of targets, if a target needs more commands it\'s coords are in te list more often.',
			'imp_targets'	: 'Commands have not been found for the next targets (multiple times the same is possible)',
			'imp_support'	: 'You can\'t fill the whole list, this is what\'s left',
			'first'			: 'First arival',
			'last'			: 'Last arival',
			'continue_imp'	: 'Do you like too also add the earlier impossible targets?',
			'wrong_target' 	: 'The target list isn\'t correct filled.',
			'or'			: 'or',
			'unknown_group' : 'Unknown group, cross def will not work!',
			'script_update' : '1Command has been updated.<br/><br/>These are the changes:<br/>- Fix for TW`s https update.',
			'update_ok'     : 'Great, let\'s start!',
			'update_nok'    : 'Please, no changes :(',
			'u_delete'      : 'I\'m sorry to see you go.\n1Command will delete itself and your account. Thanks for spending some time here.\n\nIf you change your mind, please click cancel.',
			'u_joke'        : 'Welcome back :p',
			'limit'         : 'Use this scripts limits in sending offensive commands.',
			'fastest'       : 'Fastest first',
			'slowest'       : 'Slowest first',
			'no_sort'       : 'Don\'t sort',
			'removeStorage' : 'Remove saved data of an account (sometimes needed to reset this scripts settings)',
			'new_formula'   : 'Try the new formula.',
			'reload'        : 'Reload the page to start 1Command again.'
		}
	},
	settings = {
		'units' 	: {
			'spear'    : 0,
			'sword'    : 0,
			'spy'      : 0,
			'heavy'    : 0,
			'archer'   : 0,
			'catapult' : 0,
			'min'      : 250
		},
		'groups' 	: {
			'info'  : {},
			'index' : {}
		},
		'cross'  : {
		},
		'one'    	: {
			'time' : 5,
			'tabs' : 25,
			'crun' : {}
		},
		'first_run' : true
	},
	sessings = {},
	today = $('#serverDate').text().split('/'),
	timestamp = (Date.parse(today[1]+' '+today[0]+', '+today[2]+' '+$('#serverTime').text())),
	storageName = 'Tuam_1C_'+game_data.player.name;
	if (sessionStorage[storageName]) $.extend(true, sessings, JSON.parse(sessionStorage[storageName]));
	else sessings = {'active':false};
	if (localStorage[storageName]) {
		$.extend(true, settings, JSON.parse(localStorage[storageName]));
		settings.first_run = false;
		if (settings.version == undefined) settings.version = script_version;
	}
	else if (h_mode == '') sessings = {'active':true}; // start @ initial run
	
	//migration code, remove in version 1.11
	if (settings.version != script_version && settings.version != undefined) {
		delete (localStorage['Tuam_commands']); // cleans old limit data
	}
	// end migration code
	
	/* ---Main functions--- */
	function show_startLink(one, reload){
		if (reload == true) $('#overview_menu').after('<tr><td><span id="SCswitch">'+msg[lang].reload+'</span></td></tr>');
		else {
			if (!one) one = false;
			$('#overview_menu').after('<tr><td><a href="#" id="SCswitch">'+(one==true?msg[lang].one:msg[lang].load+msg[lang].name)+'</a></td></tr>');
			$('#SCswitch').click(function(){
				sessings.active = true;
				sessionStorage[storageName] = JSON.stringify(sessings);
				show_screen(one);
				$('#SCswitch').remove();
			});
		}
	}
	function show_screen(one){
		window.name = ''; // prevents opening a command on the main page, which happens after running the script in an old command tab.
		var a = document.createElement('div');
		a.id = 'SCscreen';
		if (one==true){
			a.style.cssText = "background-color:#ecd6ad;border:2px solid #7d510f;z-index:5;top:5%;right:5%;position:fixed;padding-top:7px;padding-left:7px;width:1000px;height:80%;max-height:600px;border-radius:7px;box-shadow:0 0 50px 15px #000000;z-index:100;"
			a.innerHTML = '<h2 style="text-align: center;">'+msg[lang].one+'</h2><div style="height:85%;max-height:500px;padding:2px 2px 0px 2px; overflow:auto;"id="innerSC"></div>';
		}
		else {
			a.style.cssText = "background-color:#ecd6ad;border:2px solid #7d510f;z-index:5;top:10%;right:5px;position:fixed;padding-top:7px;padding-left:7px;width:200px;height:80%;max-height:625px;border-radius:7px;box-shadow:0 0 50px 15px #000000;z-index:100;";
			a.innerHTML = '<h2 style="text-align: center;">'+msg[lang].name+'</h2><div style=":height:70%;max-height:500px;padding:2px 2px 0px 2px; overflow:auto;"id="innerSC"></div>';
		}
		a.innerHTML += '<div style="padding:2px 2px 2px 2px;position:absolute;bottom:0px;right:25px;" id="SCbottom"><a id="SCsettings" href="javascript:void(0)">'+msg[lang].settings+'</a>&nbsp;&nbsp;&nbsp;<a id="SCclose" href="javascript:void(0)">'+msg[lang].end+'</a></div>';
		document.body.appendChild(a);
		$('#SCsettings').click(function() {
			function enlarge(){
				$('#SCscreen').css('width','+=10');
				if ($('#SCscreen').css('width').match(/\d+/) < 1000) setTimeout(enlarge,1);
				else show_settings(one);
			}
			function shrink(){
				$('#SCscreen').css('width','-=10');
				if ($('#SCscreen').css('width').match(/\d+/) > 200) setTimeout(shrink,1);
				else {
					$('#SCscreen').css('width','200px');
					show_targets();
				}
			}
			if ($('.one').length > 0) {
				if (one == true) oneCommand();
				else shrink();
			}
			else {
				if (one == true) show_settings(one);
				else enlarge();
			}
		});
		$('#SCclose').click(function() {
			$('#SCscreen').remove();
			show_startLink(one, true);
			sessings.active = false;
			sessionStorage[storageName] = JSON.stringify(sessings);
		});
		if (settings.version != script_version && settings.version != undefined) show_update(one);
		else if (Object.keys(settings.groups).length == 2 && h_mode == '') TribalWars.get('groups',{ajax:'load_group_menu'},function(data){get_groups(true, one, data.result);});
		else if (one == true) oneCommand();
		else show_targets();
	}
	function show_update(one){
		var text = msg[lang].script_update;
		text += '<br/><br/><a href="javascript:void(0)" id="u_ok">'+msg[lang].update_ok+'</a><br/><br/><a href="javascript:void(0)" id="u_nok">'+msg[lang].update_nok+'</a>';
		$('#innerSC').html(text);
		$('#u_ok').click(function(){
			settings.version = script_version;
			localStorage[storageName] = JSON.stringify(settings);
			if (Object.keys(settings.groups).length == 2 && h_mode == '') TribalWars.get('groups',{ajax:'load_group_menu'},function(data){get_groups(true, one, data.result);});
			else if (one == true) oneCommand();
			else show_targets();
		});
		$('#u_nok').click(function(){
			alert(msg[lang].u_delete);
			alert(msg[lang].u_joke);
		});
	}
	function show_targets(){
		$('#SCsettings').text(msg[lang].settings);
		var targets = [], ctx;
		($('a[class="ctx"]').length > 0 ? ctx = 2 : ctx = 1); // fix for accounts without ctx. Can you disable that function?
		$('#units_table').find('tr[class^="row_"]').each(function(){
			var found_player = $(this).find('a:eq('+ctx+')').text();
			if (found_player=='') found_player = msg[lang].own_units;
			if (!array_search(found_player, targets)) targets.push(found_player);
		});
		if (targets.length > 0){
			var text = msg[lang].choose_target+'<br/><select id="SCselect" style="min-width:100px;"><option value="">&nbsp;</option>';
			$.each(targets, function(i,v){text+='<option value="'+v+'">'+v.replace('_',' ')+'</option>';});
			text += '</select>';
		}
		else var text = msg[lang].no_action;
		$('#innerSC').html(text);
		$('#SCselect').on('change', function(){handle_target($(this).val(),ctx);});
	}
	function handle_target(target,ctx){
		var commands={index:{}}, count=0, loop=0, loops=parseInt(settings.one.tabs),
		group = settings.groups.info[$('#paged_view_content strong:eq(0)').text().slice(1,-2)],
		cross_perc = settings.cross[group]/100;
		if (cross_perc == undefined || isNaN(cross_perc)) cross_perc = 1;
		$('#SClist').remove();
		var text = '<div id="SClist"><br/><br/>'+msg[lang].updating+'<br/><div id="SCupdate">0 %</div>';
		$('#innerSC').append(text);
		$('#units_table tr[class^="row_"]').each(function(){
			$('#SCupdate').html(Math.floor(100/$('#units_table tr[class^="row_"]').size()*count)+' %');
			var result = $(this).find('a'), units_available=0, units, ownVID, tVID, checkTDs=[], current_tds=$(this).find('td'),
			units_in_target=[],units_in_village=[];
			if (result.length==2 && target != msg[lang].own_units) return;
			if (result.length==4 && target != result.eq(ctx).html()) return;
			units = $(this).prevAll('tr[class$="units_away"]:first').find('td');
			if (!units.find('a:first').attr('href').match('screen=overview')) return;
			if (units.length == 15) checkTDs=[[2,'spear',1],[3,'sword',1],[5,'archer',1],[6,'spy',0],[9,'heavy',5],[11,'cata',3]];
			else checkTDs=[[2,'spear',1],[3,'sword',1],[5,'spy',0],[7,'heavy',5],[9,'cata',3]];
			$.each(checkTDs,function(i,v){
				try {
					if (current_tds.eq(v[0]-1).html() >= settings.groups[settings.groups.index[$('#paged_view_content strong:eq(0)').text().slice(1,-2)]][v[1]]*cross_perc) { 
						current_tds.eq(v[0]-1).css('color','red');
						units_in_village.push('0');
						units_in_target.push(current_tds.eq(v[0]-1).html());
						return;
					}
				}
				catch (e) {/*units_in_village.push('0');*/}
				units_available += (Math.floor(parseInt(units.eq(v[0]).html())*cross_perc)>settings.units[v[1]]?Math.floor(parseInt(units.eq(v[0]).html())*cross_perc)-settings.units[v[1]]:0)*v[2];
				units_in_village.push(parseInt(units.eq(v[0]).html()));
				units_in_target.push(current_tds.eq(v[0]-1).html());
			});
			if (units_available < settings.units.min) {
				current_tds.eq(0).find('a:first').css('color','red');
				current_tds.eq(-1).html(units_available).css('color','red');
				return;
			}
			ownVID = $(this).find('input:first').attr('name').match(/\d+/);
			tVID = $(this).find('a:first').attr('href').match(/id=[0-9]*/).toString().split('=')[1];
			if (!commands[ownVID]) commands[ownVID]=[{'target':tVID,'ownUnits':units_in_village,'targetUnits':units_in_target,'group':$('#paged_view_content strong:eq(0)').text().slice(1,-2)}];
			else commands[ownVID].push({'target':tVID,'ownUnits':units_in_village,'targetUnits':units_in_target,'group':$('#paged_view_content strong:eq(0)').text().slice(1,-2)});
			commands.index[count]=ownVID+'|'+tVID;
			count++;
			current_tds.eq(0).find('a:first').css('color','green');
			current_tds.eq(-1).html(units_available).css('color','green');
		});
		sessings.commands = commands;
		sessings.no = 0;
		sessings.count = count;
		sessings.active = true;
		sessings.cross = cross_perc;
		sessionStorage[storageName] = JSON.stringify(sessings);
		$('#SClist').remove();
		if (count > 0) {
			var text = '<div id="SClist"><br/><br/>'+msg[lang].commands+'<br/>';
			for (var i = 0; i<count; i++){
				var temp_url = 'https://'+location.host+'/game.php?village='+sessings.commands.index[i].split('|')[0]+'&target='+sessings.commands.index[i].split('|')[1]+'&screen=place'+h_mode;
				text += '<a href="'+temp_url+'" target="_blank">'+msg[lang].command+(i+1)+'<br />';
			}
			text += '</div>';
			$('#innerSC').append(text);
			$(document).keypress(function(e) {
				if (e.keyCode == 13) {
					for (loop;loop<(loops>count?count:loops);loop++) {
						window.open('https://'+location.host+'/game.php?village='+commands.index[loop].split('|')[0]+'&target='+commands.index[loop].split('|')[1]+'&screen=place'+h_mode,'SCwindow_'+loop+'_blank');
						$('#SClist a:eq('+loop+')').css('color', 'grey');
					}
					loops+=parseInt(settings.one.tabs);
					$('#SCselect').blur();
				}
			});
		}
		else $('#innerSC').append('<div id="SClist"><br/><br/>'+msg[lang].nothing_to_do+target.replace('_',' ')+'.</div>');
	}
	function oneCommand(){
		$.cachedScript( 'https://web.archive.org/web/20170408221421/https://media.innogamescdn.com/com_DS_NL/taffy.js' ).done(function( script, textStatus ) {
			var commands_db = TAFFY(); //db:(own STRING, target STRING, distance INT, landing_minute INT);
			var support_list_db = TAFFY(); //db:(target STRING, needed_commands INT, landing_date STRING, landing_time STRING);
			var impossible_targets = []; //Array met targets die niet bediend kunnen worden.
			$('#SCsettings').text(msg[lang].settings); //fix return from settings menu
			var notes = ($('.note-icon').length > 0?true:false);//increases searching for units with one td.

			function find_villages(kind_of_group, group, manual){
				$('#innerSC').html('updating... 0%');
				sessings[kind_of_group][group] = {};
				function handle_tr(data){
					var belief = true;
					if (world_settings.church == true) var belief = ($(data).find('td:eq('+(6+(notes==true?1:0))+') img[src*="running"]').length == 0 && $(data).find('td:eq('+(6+(notes==true?1:0))+') span[class="running"]').length == 0?false:true);
					var village = $(data).find('td:eq('+(notes==true?1:0)+')').text().match(/\(\d+\|\d+\)\s(C|K)/)[0].match(/\d+\|\d+/);
					var villageID = $(data).find('td:eq('+(notes==true?1:0)+') span').attr('data-id').match(/\d+/);
					units = [villageID, belief];
					var firstTD = 7+(notes==true?1:0)+(world_settings.church==true?1:0),
					lastTD = 1+(world_settings.militia==true?1:0);
					$(data).find('td').slice(firstTD,-lastTD).each(function(){
						units.push($(this).text());
					});
					sessings[kind_of_group][group][village] = units;
				}
				$('#combined_table tr:not(:first)').each(function(){handle_tr($(this));});
				//Below: finding village info from other pages using as less as possible requests
				if ($('.paged-nav-item').length>0){
					if ($('.paged-nav-item[href*="page=-1"]').length==0 /*&& $('input[name="page_size"]').val() > $('#combined_table tr:not(:first)').length */|| $('input[name="page_size"]').val()*$('.paged-nav-item').length > 1000){
						// if (page containing all villages is available OR amount of villages on this page * amount of pages (=total amount of villages in group) is larger than 1000
						if ($('select').has('option[value*="screen=overview_villages"]').length>0){
							$('select').has('option[value*="screen=overview_villages"]').find('option:not(:checked)').each(function(i){
								var percentage = Math.floor(1/$('select').has('option[value*="screen=overview_villages"]').find('option:not(:checked)').length*i*100);
								$('#innerSC').html('updating... '+percentage+'%');
								$.ajax({
									url: $(this).val(),
									async: false,
									success: function (data) {
										$(data).find('#combined_table tr:not(:first)').each(function(){handle_tr($(this));});
									}
								});
							});
						}
						else {
							$('.paged-nav-item').each(function(i){
								if ($(this).text().match(/all/)) return false;
								var percentage = Math.floor(1/$('.paged-nav-item').length*i*100);
								$('#innerSC').html('updating... '+percentage+'%');
								$.ajax({
									url: $(this).attr('href'),
									async: false,
									success: function (data) {
										$(data).find('#combined_table tr:not(:first)').each(function(){handle_tr($(this));});
									}
								});
							});
						}
					}
					else {
						$.ajax({
							url: $('.paged-nav-item[href*="page=-1"]').attr('href'),
							async: false,
							success: function (data) {
								$(data).find('#combined_table tr:not(:first)').each(function(){handle_tr($(this));});
							}
						});
					}
				}
				sessionStorage[storageName] = JSON.stringify(sessings);
				fill_screen();
			}
			
			function get_targets(data){
				commands_db().remove(); //verwijdert oude data indien aanwezig
				support_list_db().remove();//idem
				impossible_targets = [];//idem

				var possibilities_db = TAFFY(),	landing_time_db = TAFFY(),
				ownVillages = data.ownVillages.split(/,/), targets = data.targets.split(/,/),
				cpv = (data.settings.cpv>0 ? data.settings.cpv : 1),
				servertime = data.settings.timestamp,
				first = data.settings.first, last = data.settings.last,
				speed = world_settings.speed, slowest_unit = data.settings.unit_spd,
				no_night = false,
				timespan = settings.one.time,
				support_list = false;
				//try_new_formula = $('#ONE_new_formula').prop('checked');
				if (data.settings.no_night == true){
					no_night = true, night_start = data.settings.n_start, night_end = data.settings.n_end, timespan = settings.one.time
				}
				if (targets[0].split(/\s/).length > 1) support_list = true;
				
				$('#ONEsubmit').html(msg[lang].one_submit1);
				for (var i=0;i<targets.length;i++){ //Mogelijke combinaties uitzoeken
					target_in_function = targets[i].replace(/[A-Za-z]/, '').split(/\s/); // verwijdert de toegevoegde x en de extra info voor OS lijsten (indien aanwezig)
					var targetXY = target_in_function[0].split(/\|/);
					for (var ownCoord in ownVillages){ //Geeft elk target in de array(distances) een array met looptijden vanaf elk eigen dorp
						var ownXY = ownVillages[ownCoord].split(/\|/);
						if (ownXY === targetXY) continue; // prevents a village from attacking it self
						var distance = Math.sqrt(Math.pow(ownXY[0]-targetXY[0],2)+Math.pow(ownXY[1]-targetXY[1],2)); // distance != walk time, unit speed and kind of units is needed
						var walk_time = Math.round(distance*slowest_unit*60*1000);
						var landing_time = servertime+walk_time;
						var landing_hour = parseInt(new Date(landing_time).getHours());
						var landing_minute = parseInt(new Date(landing_time).getMinutes());
						if (no_night == true && landing_hour < parseInt(world_settings.n_end) && (landing_hour >= parseInt(world_settings.n_start) || ((landing_hour+1) == parseInt(world_settings.n_start) && (60-landing_minute) <= timespan))) continue;
						if (first > 1000 && landing_time < first) continue; // check op aankomst voor vroegste aankomst
						if (last > 1000 && landing_time > last+timespan*60) continue; // check op aankomst na laatste aankomst
						if (support_list == true){ // check op tijdige aankomst OS
							var support_date = target_in_function[2].split(/\./);
							var support_timestamp = Date.parse(support_date[1]+'/'+support_date[0]+'/'+support_date[2]+' '+target_in_function[3]);
							if (landing_time > (support_timestamp-timespan*60)) continue;
						}
						landing_time_db.insert({
							own:ownVillages[ownCoord],
							target:target_in_function[0],
							landing_time:landing_time
						});
					}
				}
				$('#ONEsubmit').html(msg[lang].one_submit2);
				switch (data.settings.sort){
					case 'slowest':
						landing_time_db.sort("landing_time desc");
						break;
					case 'no_sort':
						break;
					default:
						landing_time_db.sort("landing_time");
						break;
				}
				
				for (x in targets){ // bevelen berekenen
					$('#ONEsubmit').html(msg[lang].one_submit3+Math.round((x)/targets.length*100)+'%');
					var target = targets[x].split(/\s/); // OS lijstje splitsen
					function get_command(i){
						var sort = -1;
						if (landing_time_db({target:target[0]}).count() > 0) {
							landing_time_db({target:target[0]}).limit(1).each(function (r) {
								if (parseInt(new Date(r.landing_time).getHours())+1 == world_settings.n_start) {
									sort = parseInt(new Date(r.landing_time).getMinutes());
								}
								commands_db.insert({
									own:r.own,
									target:target[0],
									eta:r.landing_time,
									landing_minute:sort
								});
								landing_time_db({own:r.own}).remove();
								if ((support_list == true && i < target[1]) || (support_list != true && cpv > 1 && i < cpv)) get_command(i+1);
								else {
									landing_time_db({target:target[0],own:r.own}).remove();
									landing_time_db({own:r.own}).remove();
								}
							});
						}
						else {
							impossible_targets.push(target[0]);
							if ((support_list == true && target[1] > 1 && target[1] < cpv) || (cpv > 1 && i < cpv)) get_command(i+1);
						}
					}
					if (support_list == true){
						if (support_list_db({target:target[0]}).count() == 0){ // save current command
							support_list_db.insert({
								target:target[0],
								needed_commands:target[1],
								landing_date:target[2],
								landing_time:target[3]
							});
						}
						else {
							var needed_support = parseInt(support_list_db({target:target[0]}).first().needed_commands)-1;
							support_list_db({target:target[0]}).update({needed_commands:needed_support+target[1]});
						}
					}
					get_command(1);
				}
				
				if (support_list == true){ // OS-lijstje bijwerken
					commands_db().each(function(r){
						support_list_db({target:r["target"]}).each(function(r2){
							if (parseInt(r2["needed_commands"]) > 1) {
								var needed_support = parseInt(r2["needed_commands"])-1;
								support_list_db({target:r["target"]}).update({needed_commands:needed_support});
							}
							else support_list_db({target:r["target"]}).remove();
						});
					});
				}
				
				/*
				Add code to communicate with online DB -> bug report, stats. -> postponed to VP (2015)
				*/
			}
			
			function fill_screen(data){
				var villages_in_memory = Object.keys(sessings[kind_of_group][group]).length, no_night, support, sort='fastest';
				contents = '<div style="float:left;width:290px;height:425px;padding:10px;border-right:1px solid #85550D;margin-right:10px;">';
					contents += msg[lang].inc_target+': <input type="text" id="ONE_incomings_per_target" value="'+(data?data.settings.cpv:'1')+'" size="4"><br/><hr/><br/>';
					contents += msg[lang].first+': <input type="text" id="ONE_first_arival" value="'+(data?(data.settings.first?data.settings.first:"dd mm yyyy hh:mm"):"dd mm yyyy hh:mm")+'" style="color:grey;" class="ONEtime"><br/>';
					contents += msg[lang].last+': <input type="text" id="ONE_last_arival" value="'+(data?(data.settings.last?data.settings.last:"dd mm yyyy hh:mm"):"dd mm yyyy hh:mm")+'" style="color:grey;" class="ONEtime"><br/>';
					if (data) no_night = data.settings.no_night;
					else no_night = (kind_of_group=="off"?true:false);
					contents += '<label><input type="checkbox" id="ONE_no_night"'+(no_night==true?" CHECKED":"")+'> '+msg[lang].no_night+'</label><br/>';
					if (data) support = sessings.support;
					else support = (kind_of_group=="def"?true:false);
					contents += '<label><input type="checkbox" id="ONE_send_support"'+(support==true?" CHECKED":"")+'> '+msg[lang].support+'</label><br/><br/>';
					contents += '<label><input type="checkbox" id="fastest" class="sort" checked> '+msg[lang].fastest+'</label><br/>';
					contents += '<label><input type="checkbox" id="slowest" class="sort"> '+msg[lang].slowest+'</label><br/>';
					contents += '<label><input type="checkbox" id="no_sort" class="sort"> '+msg[lang].no_sort+'</label><br/>';
					if (settings.one.crun.commands || settings.one.crun.impossible) contents += '<br/><hr/><br/><a href="javascript:void(0)" id="ONEcrun">'+msg[lang].get_crun+'</a>';
					contents += '<div style="position:absolute;bottom:2px;width:290px;"><a href="https://web.archive.org/web/20170408221421/http://www.tuam.nl/index.php?page=1Command" target="_blank">'+msg[lang].help+'</a></div>';
				contents += '</div>';
				contents += '<div style="float:left;width:290px;height:425px;padding:10px;border-right:1px solid #85550D;margin-right:10px">';
					contents+= villages_in_memory+' '+msg[lang].village_memory+'.<br/>';
					contents += '<br/><table><tr><th>'+msg[lang].all+'</th><th>'+msg[lang].min_one+'</th></tr>';
					units = {
						'def' : ['spear','sword','archer','spy','heavy','cata'],
						'off' : ['axe','spy','light','marcher','ram','catapult']
					};
					var i = 2; //start @ 2 because first values will be the villageID and belief
					$('#combined_table tr:first img[src*="unit"]').each(function(){
						if ($(this).attr('src').match(/unit_(.*?).png/)[1] == 'militia') return;
						var checked = (units[kind_of_group].indexOf($(this).attr('src').match(/unit_(.*?).png/)[1]) == -1?'':'CHECKED'), units_temp;
						if (h_mode != '') checked = '';
						if (data && sessings.selected_units[$(this).attr('src').match(/unit_(.*?).png/)[1]]) {
							checked = (sessings.selected_units[$(this).attr('src').match(/unit_(.*?).png/)[1]].split('|')[0]=='all'?'CHECKED':'');
							units_temp = (checked=='CHECKED'?sessings.selected_units[$(this).attr('src').match(/unit_(.*?).png/)[1]].split('|')[1]:sessings.selected_units[$(this).attr('src').match(/unit_(.*?).png/)[1]]);
						}
						else units_temp = '0';
						contents += '<tr><td align="center">'+$(this).parent().html()+'&nbsp;<input type="checkbox" id="ONE_all_'+$(this).attr("title")+'" '+checked+'></td><td><input type="text" id="ONE_units_'+i+'" class="ONE_units" value="'+units_temp+'"></td></tr>';
						i++;
					});
					contents += '</table><br/>'+(world_settings.church==true?'<label><input type="checkbox" id="ONE_church" CHECKED> '+msg[lang].belief+'</label><br/>':'')+'<hr/><br/><span id="ONE_validVillages">'+(data?selected_villages.split(',').length:'0')+'</span> '+msg[lang].selected+'.';
				contents += '</div>';
				contents += '<div style="float:left;width:290px;height:425px;padding:10px;">';
					contents += msg[lang].insert_targets+'<br/><textarea id="ONE_targets" style="resize:vertical;min-height:150px;width:275px;'+(data?'':'color:grey;')+'">'+(data?data.targets:'123|456\n\n'+msg[lang].or+'\n\n123|456 # dd.mm.yyyy hh:mm')+'</textarea><br/><br/>';
					//contents += '<label><input type="checkbox" id="ONE_new_formula" CHECKED>'+msg[lang].new_formula+'</label><br/><br/>';
					contents += '<a href="javascript:void(0)" id="ONEsubmit">'+msg[lang].get_commands+'</a>';
				contents += '</div>';
				$('#innerSC').html(contents);
				$('#ONE_targets').click(function(){if ($(this).css('color') != 'rgb(0, 0, 0)') $('#ONE_targets').css({color:''}).val('');});
				$('.ONEtime')
					.click(function(){if ($(this).val() == 'dd mm yyyy hh:mm') $(this).css({color:''}).val('');})
					.focus(function(){if ($(this).val() == 'dd mm yyyy hh:mm') $(this).css({color:''}).val('');})
					.blur(function(){if ($(this).val() == '') $(this).css({color:'grey'}).val('dd mm yyyy hh:mm');});
				$('#ONE_incomings_per_target').click(function(){$(this).val('');}).blur(function(){if ($(this).val() == '') $(this).val('1');});
				$('.ONE_units').click(function(){$(this).val('');});
				$('.sort').click(function(){
					$('.sort').not('#'+this.id).removeAttr('checked');
					sort = this.id;
				});
				$('#ONEcrun').click(function(){ // restore last run if it was not finished.
					if ($(this).text() == msg[lang].continue_imp) {
						$('#ONE_targets').val($('#ONE_targets').val()+','+settings.one.crun.impossible);
						$('#ONEcrun').hide();
					}
					else {
						$('#ONE_incomings_per_target').val('1');
						$('#ONE_first_arival').val(settings.one.crun.saved_settings[3]);
						$('#ONE_last_arival').val(settings.one.crun.saved_settings[4]);
						$('#ONE_no_night').prop('checked',settings.one.crun.saved_settings[0]);
						$('#ONE_send_support').prop('checked',settings.one.crun.saved_settings[1]);
						$.each(world_settings.units, function(k,v){
							if (settings.one.crun.selected_units[this]) {
								if (settings.one.crun.selected_units[this].match(/all/)!=undefined){
									$('#ONE_units_'+(k+2)).val(settings.one.crun.selected_units[this].split('|')[1]);
									$('#ONE_units_'+(k+2)).closest('tr').find('input :first').prop('checked', true);
								}
								else {
									$('#ONE_units_'+(k+2)).val(settings.one.crun.selected_units[this]);
									$('#ONE_units_'+(k+2)).closest('tr').find('input :first').prop('checked', false);
								}
							}
							else {
								$('#ONE_units_'+(k+2)).val('0');
								$('#ONE_units_'+(k+2)).closest('tr').find('input :first').prop('checked', false);
							}
						});
						$('#ONE_church').prop('checked',settings.one.crun.saved_settings[2]);
						var unfinished_command_list = settings.one.crun.commands.splice(settings.one.crun.send), new_commands=[];
						$.each(unfinished_command_list, function(k,v){
							new_commands.push(v);
						});
						$('#ONE_targets').val(new_commands);
						$('#ONE_targets').css({color:''});
						if (settings.one.crun.impossible) $('#ONEcrun').before(msg[lang].continue_crun+'<br/><br/>').text(msg[lang].continue_imp);
						else $('#ONEcrun').before(msg[lang].continue_crun+'<br/><br/>').hide();
						$('#innerSC input[type="text"] :last').blur();
					}
				});
				$('#innerSC input[type="text"]').blur(function(){ // update array with the villages containing enough units.
					if (!$.isArray(selected_villages)) selected_villages=selected_villages.split(',');
					var changed_unit = $(this).attr('id').split('_')[2];
					if ($(this).val() == '') $(this).val(0);
					var current_check = parseInt($(this).val());
					$.each(sessings[kind_of_group][group], function(k,v){
						var position_in_array = $.inArray(k, selected_villages);
						if (position_in_array > -1){
							if (parseInt(v[changed_unit]) < current_check) {
								selected_villages.splice(position_in_array,1);
								return;
							}
						}
						else if (parseInt(v[changed_unit]) >= current_check) {
							var add = true;
							if ($('#ONE_church').prop('checked') == false || ($('#ONE_church').prop('checked') == true && v[1] == true) || world_settings.church!=true) {//belief
								$.each($('.ONE_units'), function(i){
									if (parseInt($(this).val()) > parseInt(v[i+2])) {add = false; return;} //v[0] = villageID v[1] = church
								});
								if (add == true) {selected_villages.push(k);}
							}
						}
					});
					$('#ONE_validVillages').text(selected_villages.length).css('color','');
				});
				$('#ONE_church').click(function(){
					selected_villages = [];
					$.each(sessings[kind_of_group][group], function(k,v){
						var add = true;
						if ($('#ONE_church').prop('checked') == false || ($('#ONE_church').prop('checked') == true && v[1] == true)) {//belief
							$.each($('.ONE_units'), function(i){
								if (parseInt($(this).val()) > parseInt(v[i+2])) {add = false; return;} //v[0] = villageID v[1] = church
							});
							if (add == true) {selected_villages.push(k);}
						}
					});
					$('#ONE_validVillages').text(selected_villages.length).css('color','');
				});
				$('#ONEsubmit').click(function(){
					if ($('#ONE_targets').val() != '' && selected_villages != ''){
						var cpv = $('#ONE_incomings_per_target').val(), //commands per village, will need it later
						selected_units = {},
						slowest_unit = 0;
						$.each($('.ONE_units'), function(){
							if ($(this).val() > 0) {
								var current_unit = $(this).prop('id').split('_')[2],
								all_units_selected = $(this).parent().parent().find('input:first').prop('checked')
								selected_units[world_settings.units[current_unit-2]] = (all_units_selected==true?'all|'+$(this).val():$(this).val());
								if (parseFloat(world_settings.unit_spd[current_unit-2]) > slowest_unit) slowest_unit = parseFloat(world_settings.unit_spd[current_unit-2]);
							}
						});
						selected_villages = selected_villages.toString();
						try {
							var targets = $('#ONE_targets').val().match(/\d+\|\d+ \d+ \d+\.\d+\.\d+ \d+:\d+/g).toString();
						}
						catch(e){
							try {
								var targets = $('#ONE_targets').val().match(/\d+\|\d+/g).toString();
							}
							catch(e) {
								alert(msg[lang].wrong_target);
								return;
							}
						}
						var no_night = ($('#ONE_send_support').prop('checked') == true?false:$('#ONE_no_night').prop('checked')), first_command, last_command;
						if ($('#ONE_first_arival').val() == 'dd mm yyyy hh:mm') first_command = '';
						else {
							var first_command = $('#ONE_first_arival').val().split(' ');
							if (first_command.length == 4) {
								try {first_command = (Date.parse(first_command[1]+' '+first_command[0]+' '+first_command[2]+' '+first_command[3]));}
								catch(e) {return;}
							}
							else first_command = parseInt($('#ONE_first_arival').val());
						}
						if ($('#ONE_last_arival').val() == 'dd mm yyyy hh:mm') last_command = '';
						else {
							var last_command = $('#ONE_last_arival').val().split(' ');
							if (last_command.length == 4) {
								try {last_command = (Date.parse(last_command[1]+' '+last_command[0]+' '+last_command[2]+' '+last_command[3]));}
								catch(e) {return;}
							}
							else last_command = parseInt($('#ONE_last_arival').val());
						}
						try {parseInt(sort);}
						catch(e) {sort = 1;}
						var command_data = {
							ownVillages : selected_villages,
							targets     : targets,
							settings    : {
								cpv       : cpv, // commands per village
								timestamp : timestamp, // current timestamp
								sort      : sort,
								n_start   : world_settings.n_start,
								n_end     : world_settings.n_end,
								no_night  : no_night,
								first     : first_command,
								last      : last_command,
								unit_spd  : slowest_unit
							}
						};
						var amount_of_targets = targets.split('|').length-1;
						get_targets(command_data);
						
						
						var count=0, commands={index:{}}, loop=0, loops=parseInt(settings.one.tabs), crun_commands = [];

						commands_db.sort("landing_minute desc, eta asc");
						commands_db().each(function(record, i){
							var villageID = sessings[kind_of_group][group][record['own']][0]
							commands[villageID]=[{'target':record['target'],'ownUnits':null,'targetUnits':null,'group':group,'distance':record['distance']}];
							commands.index[count]=villageID+'|'+record['target']+'|'+record['eta'];
							crun_commands.push(record['target']);
							count++;
						});
						sessings.commands = commands;
						sessings.support = $('#ONE_send_support').prop('checked');
						sessings.selected_units = selected_units; //like: spear:5
						sessionStorage[storageName] = JSON.stringify(sessings);
						var data = {};
						data.saved_settings = [no_night, sessings.support, $('#ONE_church').prop('checked'), command_data.settings.first, command_data.settings.last]
						data.selected_units = sessings.selected_units;
						data.send = 0;
						data.commands = crun_commands;
						settings.one.crun = data;
						localStorage[storageName] = JSON.stringify(settings);
						if (count > 0) {
							var text = '<div id="SClist">';
							if (count < cpv*amount_of_targets) text += '<b>'+msg[lang].missing_comm+':</b><br/>';
							text += '<br/><br/>'+msg[lang].commands+'<br/>';
							var temp_commands = {};
							for (var i = 0; i<count; i++){
								var url_data = sessings.commands.index[i].split('|');
								var temp_url = 'https://'+location.host+'/game.php?village='+url_data[0]+'&oneX='+url_data[1]+'&oneY='+url_data[2]+'&screen=place'+h_mode;
								var hour = new Date(url_data[3]).getHours();
								var min = (new Date(url_data[3]).getMinutes()<10?'0'+new Date(url_data[3]).getMinutes():new Date(url_data[3]).getMinutes());
								text += '<a href="'+temp_url+'" target="_blank" name="'+(hour==0?'24'+min:hour+''+min)+'">'+msg[lang].command+(i+1)+' ETA: '+new Date(parseInt(url_data[3]))+'</a><br />';
							}
							if (support_list_db().count() > 0){
								var impossible='';
								support_list_db().each(function(record){
									impossible += record['target']+' '+record['needed_commands']+' '+record['landing_date']+' '+record['landing_time']+'\n';
								});
								text += '<hr/><br/>'+msg[lang].imp_support+':<br/><textarea id="1Cimp_supp" style="width:40%;min-height:50px;" onFocus="this.select();">'+impossible+'</textarea>';
								settings.one.crun.impossible = impossible;
							}
							else if (impossible_targets.length > 0) {
								text += '<hr/><br/>'+msg[lang].imp_targets+':<br/><textarea style="width:90%;min-height:200px;" onFocus="this.select();">'+impossible_targets+'</textarea>';
								settings.one.crun.impossible = impossible_targets;
							}
							//else settings.one.crun.impossible = null;
							
							text += '</div>';
							text += '<div style="position:absolute;bottom:2px;"><a href="javascript:void(0)" id="one_cancel">'+msg[lang].cancel+'</a></div>';
							$('#innerSC').html(text);
							$('#one_cancel').click(function(){
								fill_screen(command_data);
							});
							function open_Tabs(){
								for (loop;loop<(loops>count?count:loops);loop++) {//loop: current first loop, loops: amount of opened tabs, count: all commands
									window.open('https://'+location.host+'/game.php?village='+commands.index[loop].split('|')[0]+'&oneX='+commands.index[loop].split('|')[1]+'&oneY='+commands.index[loop].split('|')[2]+'&screen=place'+h_mode,'SCwindow_'+loop+'_blank');
									$('#SClist a:eq('+loop+')').css('color', 'grey');
								}
								$('#innerSC').scrollTop($('#innerSC').scrollTop()+settings.one.tabs*15);// was 11.5
								loops+=parseInt(settings.one.tabs);
								if (loops>=count && settings.one.crun.impossible == undefined) settings.one.crun={};
								else settings.one.crun.send += parseInt(settings.one.tabs);
								localStorage[storageName] = JSON.stringify(settings);
								$('#SCselect').blur();
							}
							$(document).keypress(function(e) {
								if (e.keyCode == 13) open_Tabs();
							});
						}
						else alert('geen enkel bevel mogelijk');
					}
					else if ($('#ONE_targets').val() == '') $('#ONE_targets').val(msg[lang].target_error).css('color','red');
					else $('#ONE_validVillages').html('<b>0</b>').css('color','red');
				});
			}
			
			var group = $('strong[class~="group_tooltip"]').text().slice(1,-2),
			kind_of_group = (settings.groups.index[group]>-1?'def':'off'),
			selected_villages = [];
			if (!sessings[kind_of_group]) sessings[kind_of_group] = {};
			find_villages(kind_of_group, group, true);
			//fill_screen();
		});
	}
	function show_settings(one){
		var img=['spear','sword','archer','spy','heavy','catapult'],
		url='https://web.archive.org/web/20170408221421/https://cdn.tribalwars.nl/8.18/19283/graphic/unit/unit_';
		function update(val){
			if ($(val).attr('id').match(/group/)) {
				var group_number = $(val).attr('id').split('_')[1];
				var i = $(val).attr('id').split('_')[2];
				settings.cross[group_number] = $(val).val();
				$('tr[id="'+group_number+'"]').replaceWith(create_tr(i));
				$('#innerSC input[id$="'+i+'"]').blur(function(){update($(this));});
			}
			else settings.units[$(val).attr('id').split('_')[1]] = $(val).val();
			localStorage[storageName] = JSON.stringify(settings);
		}
		function create_tr(i){
			var tr = '<tr id="'+settings.groups[i].number+'"><td>'+settings.groups[i].name+'</td>';
			$.each(img, function(x){
				tr+='<td><img src="'+url+img[x]+'.png" title="'+msg[lang].all_units[x]+'" alt=""/> '+(settings.groups[i][img[x]] != undefined ? Math.floor(settings.groups[i][img[x]]*settings.cross[settings.groups[i].number]/100):0)+'</td>';
			});
			tr += '</td><td><input type="text" id="group_'+settings.groups[i].number+'_'+i+'" value="'+settings.cross[settings.groups[i].number]+'" size="7"> %</td></tr>';
			return tr;
		}
		
		var text = '<div style="width:48%;height:150px;float:left;padding:5px;"><br/><br/><table>';
		text += '<tr><td>'+msg[lang].time4commands+'&nbsp;</td><td><input type="text" class="one" id="time" value="'+settings.one.time+'" size="7"></td></tr>';
		text += '<tr><td>'+msg[lang].tabs+'&nbsp;</td><td><input type="text" class="one" id="tabs" value="'+settings.one.tabs+'" size="7"></td></tr>';
		text += '</table></div>';
		
		text += '<div style="width:48%;float:left;padding:5px;">';
		// units to stay at home:
		text += '<table style="padding:2px;"><tr><th colspan="6">'+msg[lang].city_defence+'</th></tr><tr>';
		$.each(img, function(i){
			text += '<td><img src="'+url+img[i]+'.png" title="'+msg[lang].all_units[i]+'" alt=""/></td><td><input type="text" id="SC_'+img[i]+'" value="'+settings.units[img[i]]+'" size="7"></td>';
			((i+1)/3 == Math.ceil((i+1)/3)?text+='</tr><tr>':text+='');
		});
		// min amount of units:
		text += '</tr><tr><td colspan="5">'+msg[lang].min+'&nbsp;</td><td><input type="text" id="SC_min" value="'+settings.units.min+'" size="7"></td></tr></table></div>';
		// Cross def:
		text += '<div style="width:90%;float:left;border-top:1px solid #85550D;padding:5px;"><br/><b>'+msg[lang].cross+'</b><br/>';
		text += '<table><tr><th>'+msg[lang].group+'</th><th colspan="6" width="400px">'+msg[lang].units+'</th><th>'+msg[lang].cross_perc+'</th></tr>';
		for (var i=0;i<settings.groups.count;i++) text+=create_tr(i);
		text += '</table>';
		text += '<a href="javascript:void(0)" id="SCupdate">'+msg[lang].update+'</a></div>';
		// Remove LS
		text += '<div style="width:90%;float:left;border-top:1px solid #85550D;padding:5px;margin:10px 0px;"><br/><b>'+msg[lang].removeStorage+'</b><br/>';
		for (var i=0;i<localStorage.length;i++){
			if (localStorage.key(i).match(/Tuam_1C/)) text += '<a href="javascript:void(0)" class="removeStorage" id="'+localStorage.key(i).split('_')[2]+'">'+localStorage.key(i).split('_')[2]+'</a><br/>'; 
		}
		text += '</div>';
		text += '<div style="position:absolute;bottom:2px;left:400px;">1Command v'+script_version+' &copy;Tuam 2010 - 2015</div>';
		
		
		$('#innerSC').html(text);
		$('#innerSC input').blur(function(){update($(this));});
		$('#SCupdate').click(function(){TribalWars.get('groups',{ajax:'load_group_menu'},function(data){get_groups(false, one, data.result);})});
		$('.one').blur(function(){
			settings.one[$(this).attr('id')] = $(this).val()
			localStorage[storageName] = JSON.stringify(settings);
		});
		$('.removeStorage').click(function(){
			delete(localStorage['Tuam_1C_'+$(this).attr('id')]);
			delete(sessionStorage['Tuam_1C_'+$(this).attr('id')]);
			$(this).hide();
		});
		$('#SCsettings').text(msg[lang].store);
	}
	
	/* ---Page handlers--- */
	if (document.URL.match('away_detail')) {
		if (sessings.active != true) show_startLink();
		else show_screen();
	}
	else if (game_data.screen=='place' && sessings.active == true) {
		if (!document.URL.match('try=confirm')){
			$(document).keypress(function(e) { // fix preventing to attack when support is needed.
				if (e.keyCode == 13) e.preventDefault();
			});
			
			if (document.URL.match('&target=') && !document.URL.match(/oneX/)) { // support checker
				var field=$('input[id^="unit_input_"]'), units=[], crossDef=(sessings.cross==1?false:true), units_away = [0,0,0,0,0,0], percentage_to_send=[], village=document.URL.match(/village=\d+/).toString().split('=')[1], this_village_number;
				if (field.length == 12) {
					units = ['spear','sword','archer','spy','heavy','catapult'];
				}
				else units = ['spear','sword','spy','heavy','catapult'];
					$.each(sessings.commands[village], function(i,v){
						$.each(sessings.commands[village][i].targetUnits, function(i,v){
							units_away[i]+=parseInt(v);
						});
						if (v.target == document.URL.match(/target=\d+/).toString().split('=')[1]) this_village_number = i;
					});
					$.each(units_away, function(i,v){
						var percentage = 1-(sessings.commands[village][this_village_number].targetUnits[i]/(v));
						if (isNaN(percentage) || percentage == 0) percentage = (sessings.cross == 1 ? sessings.cross/sessings.commands[village].length : sessings.cross);
						percentage_to_send.push(percentage);
					});
				$.each(units, function(i,v){
					var units_to_stay_at_home = settings.units[v],
					units_in_target = parseInt(sessings.commands[village][this_village_number].targetUnits[i]),
					group = sessings.commands[village][0].group,
					units_secified_in_group;
					try {units_secified_in_group = parseInt(settings.groups[settings.groups.index[group]][v]);}
					catch (e) {$('h3 :eq(0)').text(msg[lang].unknown_group).css('color','red');}
					var units_needed = sessings.commands[village][0].ownUnits[i]-units_to_stay_at_home,//(units_to_stay_at_home*sessings.cross),
					requested_units = Math.floor((units_needed>0?units_needed:0)*(percentage_to_send[i] > 0 ? percentage_to_send[i] : 0)),
					max_units;
					if (sessings.cross != 1){
						try {max_units = parseInt((units_secified_in_group-units_to_stay_at_home)*sessings.cross);}
						catch (e) {max_units = 99999;}
					}
					//requested_units = (requested_units+units_in_target > max_units && units_in_target<max_units? units_in_target-max_units : requested_units);
					requested_units = (requested_units+units_in_target > max_units ? max_units-units_in_target : requested_units);
					insertUnit($('#unit_input_'+v), (requested_units>0?requested_units:0));
				});
				$('#target_support').focus(); //fix for Opera12
				$(document).keypress(function(e) { // work around for this script's bot check
					if (e.keyCode == 13) $('#target_support').click();
				});
			}
			else if (document.URL.match(/oneX/)){ // one
				$(document).keypress(function(e) { // fix for Chrome, works fine in other browsers
					if (e.keyCode == 13) (sessings.support == true ? $('#target_support').click() : $('#target_attack').click());
				});
				var target = document.URL.match(/oneX=(.*?)&oneY=(.*?)&screen/);
				$('#place_target input').val(target[1]+'|'+target[2]);
				$.each(sessings.selected_units, function(k,v){
					insertUnit($('#unit_input_'+k), (v.match(/all/)!=undefined?$('#unit_input_'+k).next('a').html().match(/\d+/):v));
				});
			}
			else if (window.name.match(/SCwindow/) && $('#bot_check').length == 0) $(document).ready(function(){close()});
		}
		else if (window.name.match(/SCwindow/)) $('#troop_confirm_go').focus();
		if (settings.first_run == false){
			$('#quickbar_inner .main :eq(1)').append('<ul class="menu quickbar" style="background:red;"><b><a id="1Coff"><span style="color:white;">'+msg[lang].autoClose+' => </span>'+msg[lang].off+'</a></b></ul>');
			$('#1Coff').click(function(){
				sessings.active = false;
				sessionStorage[storageName] = JSON.stringify(sessings);
				location.reload();
			});
		}
	}
	else if (game_data.screen=='overview_villages' && $('#combined_table').length > 0){
		if (sessings.active != true) show_startLink(true);
		else show_screen(true);
	}
});
/*
     FILE ARCHIVED ON 22:14:21 Apr 08, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:45:37 Jan 20, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/