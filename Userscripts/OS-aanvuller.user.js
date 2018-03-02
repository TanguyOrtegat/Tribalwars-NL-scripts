// ==UserScript==
// @name           Support Checker
// @version        1.6.3.1
// @description    1Command alpha version
// @author         Tuam <tuam@tuam.nl> http://www.tuam.nl/
// @updateURL      http://www.tuam.nl/scripts/supportChecker.user.js
// @homepageURL    http://www.tuam.nl/scripts/
// @include        https://*tribalwars*away_detail*
// @include        https://*tribalwars*screen=place*
// @include        https://*tribalwars*screen=overview_villages*
// @exclude        https://*tribalwars*mode=call*
// @grant          none
// @noframes
// ==/UserScript==

/* Recent changes
* 1.6.1: - 1Command alpha code added
         - update in cross def formula, thnx Da Stewie
* 1.6.2: - some small fixes
         - improved lay-out ready for the whole package,
		 - support created for all kinds of worlds,
		 - multiple commands option developed,
		 - activation added, fix for tw8.20
* 1.6.3: - night check added,
         - support activated,
		 - fix: village won't attack it's self any more,
		 - world_settings upgraded to 1.2,
		 - fix: tw8.20: groups are hidden, update and initial run did crash
		 - fix: support checker didn't refill villages when it's first units where 100% (due to cross-def check)
		 - fix: support checker tried to send not available units when player already did send more than wished max units to target
		 - support checker's formula now shows it's findings, created for testing but I do like the view
* 1.6.3.1: fix in cross def formula

* TO DO:
* - opening amount of commands based on settings
* - building an extension for Chrome which opens tabs in stead of windows -> cancelled: onewindow works fine.
* - fix on back-up server

* KNOWN ERRORS:
* - snap links don't work -> I don't care, this script has it's own snap links implemented...

* Wishes:
* - Check on each command page for units on their way to target. This prevents sending to many units when using cross def
*
* Test crew:
* Godness of Insomnia., Dr. Hannibal Lecter, Howlin, McMartens, dannyh53, axe0
*/

(function (f) {
	var d = document,
	s = d.createElement('script');
	s.textContent = '(' + f.toString() + ')()';
	(d.head || d.documentElement || d.body).appendChild(s);
	s.parentNode.removeChild(s)
})(function () {
	var ONE_active = false, world_settings, script_version = '1.6.3';
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
								var speed = parseInt($(xml3).find('speed').text())*parseInt($(xml3).find('unit_speed').text());
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
									'version'  : '1.2'
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
	if (world_settings.version != '1.2') get_settings();
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
	Array.prototype.contains = function (e) { //source: www.roseindia.net
		for (var i = 0; i < this.length; i++) {
			if (this[i] == e) return true;
		}	
		return false;
	}
	function get_groups(initial, one){
		if (initial == true) $('#innerSC').html(msg[lang].initial+'<div id="SCupdate">0 %</div>');
		else {
			$('#innerSC').html(msg[lang].updating+'<div id="SCupdate">0 %</div>');
			delete localStorage[storageName].groups;
		}
		var count = 0, count_total=0;
		$.ajax({ // double request needed to fix tw8.20, groups aren't available on unit views any more.
			url: game_data.link_base_pure+'overview_villages&mode=groups&group=0',
			async: false,
			dataType: 'html',
			success: function (html) {
				var groups = $(html).find('.group_tooltip').not(':last');
				$.each(groups, function(){
					var number = $(this).attr('href').match(/group=(.*?)&screen/)[1],
					url=game_data.link_base_pure+'train&mode=mass&group='+number;
					$.ajax({
						url: url,
						async: false,
						success: function (data) {
							var group = $(data).find('.vis_item strong').text().slice(1,-2), store=false;
							settings.groups[count]={'number':number,'name':group};
							$(data).find('#mr_all_form input').each(function(){
								var count_units = 0;
								if ($(this).attr('value') != 0 && settings.units[$(this).attr('name')] != undefined) {
									settings.groups[count][$(this).attr('name')] = $(this).attr('value');
									count_units += $(this).attr('value');
									if (count_units > 1000) store=true;
								}
							});
							if (store == true) {
								settings.groups.index[group] = count;
								count++;
								settings.groups.count = count;
								settings.groups.info[group] = number;
								if (settings.cross[number] == undefined) settings.cross[number] = 100;
								localStorage[storageName] = JSON.stringify(settings);
							}
							count_total++;
							$('#SCupdate').html(Math.round(100/groups.length*count_total)+' %');
						}
					});
				});
			}
		});
		if (initial == true) show_targets();
		else show_settings(one);
	}
	
	/* ---Settings--- */
	var h_mode = ''; //holiday mode
	if (document.URL.match('t=')) h_mode = '&'+document.URL.match(/t=[0-9]*/);
	
	var lang=game_data.market;
	if (lang != 'nl') lang = 'int';

	var msg = {
		'nl'  : {
			'name'          : 'OS aanvuller',
			'one'           : '1Command',
			'settings'      : 'Instellingen',
			'end'           : 'Sluiten',
			'choose_target' : 'Selecteer je target',
			'load'          : 'Activeer de ',
			'commands'      : 'Commando\'s',
			'command'       : 'Bevel ',
			'own_units'     : 'Eigen_troepen',
			'nothing_to_do' : 'Er is niks te doen voor ',
			'min'           : 'Minimum aantal inwoners voor een bevel',
			'city_defence'  : 'Aantal troepen dat thuis moet blijven',
			'cross'         : 'Kruisdef instellingen',
			'cross_perc'    : 'Percentage',
			'group'         : 'Groep',
			'units'         : 'Troepen',
			'update'        : 'Update de groepsinformatie',
			'updating'      : 'Even geduld...',
			'initial'       : 'Jouw ultieme Tribal Wars ervaring wordt ge&iuml;nstalleerd.',
			'store'         : 'Terug',
			'all_units'     : ['Speervechters','Zwaardvechters','Boogschutters','Verkenners','Zware cavalerie','Katapulten'],
			'no_action'     : 'Er is geen actie nodig op deze pagina.',
			'off'           : 'OS aanvuller uitschakelen',
			'autoClose'     : 'De OS aanvuller zal dit scherm voor je sluiten.'
		},
		'int' : {
			'name'          : 'Support checker',
			'one'           : '1Command',
			'settings'      : 'Settings',
			'end'           : 'Close',
			'choose_target' : 'Select your target',
			'load'          : 'Activate the ',
			'commands'      : 'Commands',
			'command'       : 'Command ',
			'own_units'     : 'Own_units',
			'nothing_to_do' : 'No action required for ',
			'min'           : 'Minimum amount of people for a command',
			'city_defence'  : 'Amount of units which should always be at home',
			'cross'         : 'Cross def settings',
			'cross_perc'    : 'Percentage',
			'group'         : 'Group',
			'units'         : 'Units',
			'update'        : 'Update the group data',
			'updating'      : 'Please wait...',
			'initial'       : 'One moment, your new experience is installing.',
			'store'         : 'Continue',
			'all_units'     : ['Spear fighters','Sword fighters','Archers','Spies','Heavy cavalry','Catapult'],
			'no_action'     : 'This page doesn\'t require attention.',
			'off'           : 'Turn SC off',
			'autoClose'     : 'The support checker will close this window for you.'
		}
	},
	settings = {
		'units' : {
			'spear'    : 0,
			'sword'    : 0,
			'spy'      : 0,
			'heavy'    : 0,
			'archer'   : 0,
			'catapult' : 0,
			'min'      : 250
		},
		'groups' : {
			'info'  : {},
			'index' : {}
		},
		'cross'  : {
		}
	},
	sessings = {},
	_0x6aaa=["\x68\x61\x73\x68\x43\x6F\x64\x65","\x54\x75\x61\x6D\x5F\x73\x75\x70\x70\x6F\x72\x74\x5F\x63\x68\x65\x63\x6B\x65\x72\x5F","\x6E\x61\x6D\x65","\x70\x6C\x61\x79\x65\x72"],
	storageName=(_0x6aaa[1]+game_data[_0x6aaa[3]][_0x6aaa[2]])[_0x6aaa[0]]();
	if (sessionStorage[storageName]) $.extend(true, sessings, JSON.parse(sessionStorage[storageName]));
	else sessings = {'active':false};
	if (localStorage[storageName]) $.extend(true, settings, JSON.parse(localStorage[storageName]));
	else sessings = {'active':true}; // start @ initial run
	
	/* ---Main functions--- */
	function show_startLink(one){
		if (!one) one = false;
		$('#overview_menu').after('<tr><td><a href="#" id="SCswitch">'+(one==true?msg[lang].one:msg[lang].load+msg[lang].name)+'</a></td></tr>');
		$('#SCswitch').click(function(){
			sessings.active = true;
			sessionStorage[storageName] = JSON.stringify(sessings);
			show_screen(one);
			$('#SCswitch').remove();
		});
	}
	function show_screen(one){
		var a = document.createElement('div');
		a.id = 'SCscreen';
		if (one==true){
			a.style.cssText = "background-color:#ecd6ad;border:2px solid #7d510f;z-index:5;top:5%;right:5%;position:fixed;padding-top:7px;padding-left:7px;width:1000px;height:625px;border-radius:7px;box-shadow:0 0 50px 15px #000000;z-index:100;";
			a.innerHTML = '<h2 style="text-align: center;">'+msg[lang].one+'</h2><div style="height:500px;padding:2px 2px 0px 2px; overflow:auto;"id="innerSC">text here</div>';
		}
		else {
			a.style.cssText = "background-color:#ecd6ad;border:2px solid #7d510f;z-index:5;top:10%;right:5px;position:fixed;padding-top:7px;padding-left:7px;width:200px;height:80%;max-height:625px;border-radius:7px;box-shadow:0 0 50px 15px #000000;z-index:100;";
			a.innerHTML = '<h2 style="text-align: center;">'+msg[lang].name+'</h2><div style=":height:70%;max-height:500px;padding:2px 2px 0px 2px; overflow:auto;"id="innerSC">text here</div>';
		}
		a.innerHTML += '<div style="padding:2px 2px 2px 2px;position:absolute;bottom:0;right:0;" id="SCbottom"><a id="SCsettings" href="javascript:void(0)">'+msg[lang].settings+'</a>&nbsp;&nbsp;&nbsp;<a id="SCclose" href="javascript:void(0)">'+msg[lang].end+'</a></div>';
		document.body.appendChild(a);
		$('#SCsettings').click(function() {
			function enlarge(){
				$('#SCscreen').css('width','+=10');
				if ($('#SCscreen').css('width').match(/\d+/) < 600) setTimeout(enlarge,1);
				else show_settings(one);
			}
			enlarge();
		});
		$('#SCclose').click(function() {
			$('#SCscreen').remove();
			show_startLink(one);
			sessings.active = false;
			sessionStorage[storageName] = JSON.stringify(sessings);
		});
		if (Object.keys(settings.groups).length == 2) get_groups(true);
		else if (one == true) oneCommand();
		else show_targets();
	}
	function show_targets(){
		$('#SCsettings').text(msg[lang].settings); //fix return from settings menu
		var targets = [], ctx;
		($('a[class="ctx"]').length > 0 ? ctx = 2 : ctx = 1); // fix for accounts without ctx. Can you disable that function?
		$('#units_table').find('tr[class^="row_"]').each(function(){
			var found_player = $(this).find('a:eq('+ctx+')').text();
			if (found_player=='') found_player = msg[lang].own_units;
			if (!targets.contains(found_player)) targets.push(found_player);
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
		var commands={index:{}}, count=0, loop=0, loops=25,
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
			/*if (cross_perc != 1)*/ units = $(this).prevAll('tr[class$="units_away"]:first').find('td');
			//else units = $(this).prev('tr').find('td'); //REMOVE THIS IN v1.6 WHEN NO COMPLAINTS ARE MADE
			if (!units.find('a:first').attr('href').match('screen=overview')) return;
			if (units.length == 15) checkTDs=[[2,'spear',1],[3,'sword',1],[5,'archer',1],[6,'spy',0],[9,'heavy',5],[11,'cata',3]];
			else checkTDs=[[2,'spear',1],[3,'sword',1],[5,'spy',0],[7,'heavy',5],[9,'cata',3]];
			$.each(checkTDs,function(i,v){
				try {
					if (current_tds.eq(v[0]-1).html() >= settings.groups[settings.groups.index[$('#paged_view_content strong:eq(0)').text().slice(1,-2)]][v[1]]*cross_perc) { //if ([units in target] >= groups.[current group].[current unit]*cross_perc)
						current_tds.eq(v[0]-1).css('color','red');// testing purposes
						units_in_village.push('0');
						units_in_target.push(current_tds.eq(v[0]-1).html());
						return /*false*/; // fixed in 1.6.3
					}
				}
				catch (e) {units_in_village.push('0');/*do nothing*/}
				units_available += (Math.floor(parseInt(units.eq(v[0]).html())*cross_perc)>settings.units[v[1]]?Math.floor(parseInt(units.eq(v[0]).html())*cross_perc)-settings.units[v[1]]:0)*v[2];
				units_in_village.push(parseInt(units.eq(v[0]).html()));
				units_in_target.push(current_tds.eq(v[0]-1).html());
			});
			if (units_available < settings.units.min) {
				current_tds.eq(0).find('a:first').css('color','red');// testing purposes
				current_tds.eq(-1).html(units_available).css('color','red')// testing purposes
				return;
			}
			ownVID = $(this).find('input:first').attr('name').match(/\d+/);
			tVID = $(this).find('a:first').attr('href').match(/id=[0-9]*/).toString().split('=')[1];
			if (!commands[ownVID]) commands[ownVID]=[{'target':tVID,'ownUnits':units_in_village,'targetUnits':units_in_target,'group':$('#paged_view_content strong:eq(0)').text().slice(1,-2)}];
			else commands[ownVID].push({'target':tVID,'ownUnits':units_in_village,'targetUnits':units_in_target,'group':$('#paged_view_content strong:eq(0)').text().slice(1,-2)});
			commands.index[count]=ownVID+'|'+tVID;
			count++;
			current_tds.eq(0).find('a:first').css('color','green');// testing purposes
			current_tds.eq(-1).html(units_available).css('color','green')// testing purposes
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
					loops+=25;
					$('#SCselect').blur();
				}
			});
		}
		else $('#innerSC').append('<div id="SClist"><br/><br/>'+msg[lang].nothing_to_do+target.replace('_',' ')+'.</div>');
	}
	function oneCommand(){
		$('#SCsettings').text(msg[lang].settings); //fix return from settings menu
		var notes = ($('.note-icon').length > 0?true:false),//increases searching for units with one td.
		today = $('#serverDate').text().split('/'),
		timestamp = (Date.parse(today[1]+' '+today[0]+', '+today[2]+' '+$('#serverTime').text()))/1000;
		function find_villages(kind_of_group, group, manual){
			$('#innerSC').html('updating...');
			sessings[kind_of_group][group] = {};
			$('#combined_table tr:not(:first)').each(function(){
				if (world_settings.church == true && $(this).find('td:eq('+(6+(notes==true?1:0))+') img[src*="running"]').length == 0 && $(this).find('td:eq('+(6+(notes==true?1:0))+') span[class="running"]').length == 0) return;
				var village = $(this).find('td:eq('+(notes==true?1:0)+')').text().match(/\d+\|\d+/),
				villageID = $(this).find('td:eq('+(notes==true?1:0)+') span').attr('data-id').match(/\d+/);
				units = [villageID];
				var firstTD = 7+(notes==true?1:0)+(world_settings.church==true?1:0),
				lastTD = 1+(world_settings.militia==true?1:0);
				$(this).find('td').slice(firstTD,-lastTD).each(function(){
					units.push($(this).text());
				});
				sessings[kind_of_group][group][village] = units;
			});
			sessionStorage[storageName] = JSON.stringify(sessings);
			fill_screen((manual == true?false:true));
		}
		function fill_screen(update){
			var villages_in_memory = Object.keys(sessings[kind_of_group][group]).length,
			contents = '<div style="float:left;width:300px;height:475px;padding:10px;border-right:1px solid #85550D;margin-right:10px">';
				contents += '# incomings/target: <input type="text" id="ONE_incomings_per_target" value="1" size="4"><br/><hr/><br/>';
				contents += '<font color="white">First arival: <input type="text" id="ONE_first_arival" value="dd-mm-yyyy hh:mm" style="color:grey;" class="ONEtime"><br/>';
				contents += 'Last arival: <input type="text" id="ONE_last_arival" value="dd-mm-yyyy hh:mm" style="color:grey;" class="ONEtime"><br/></font>';
				contents += 'Just no incomings during night <input type="checkbox" id="ONE_no_night" CHECKED><hr/><br/>';
				contents += 'Send support: <input type="checkbox" id="ONE_send_support"><br/><hr/><br/>';
				contents += '<div style="position:absolute;bottom:2px;"><a href="https://web.archive.org/web/20170409020938/http://www.tuam.nl/scripts/1command.php" target="_blank">Click here for help</a></div>';
			contents += '</div>';
			contents += '<div style="float:left;width:300px;height:475px;padding:10px;border-right:1px solid #85550D;margin-right:10px">';
				contents+= villages_in_memory+' villages in memory.<br/>';
				if (update == false) contents += '<font color="grey">Info for these villages is fresh</font>';
				else contents += '<a href="javascript:void(0)" id="ONEupdate">Update info on current villages</a>';
				contents += '<br/><hr/><br/><table><tr><th>units</th><th>all</th><th>min units</th></tr>';
				units = {
					'def' : ['spear','sword','archer','spy','heavy','cata'],
					'off' : ['axe','spy','light','marcher','ram','catapult']
				};
				var i = 1; //start @ 1 because first value will be the villageID
				$('#combined_table tr:first img[src*="unit"]').each(function(){
					if ($(this).attr('src').match(/unit_(.*?).png/)[1] == 'militia') return;
					var checked = (units[kind_of_group].indexOf($(this).attr('src').match(/unit_(.*?).png/)[1]) == -1?'':'CHECKED');
					contents += '<tr><td>'+$(this).parent().html()+'</td><td><input type="checkbox" id="ONE_all_'+$(this).attr("title")+'" '+checked+'></td><td><input type="text" id="ONE_units_'+i+'" class="ONE_units" value="0"></td></tr>';
					i++;
				});
				contents += '</table><br/><label><input type="checkbox" id="ONE_church" CHECKED> villages with belief only</label><br/><hr/><br/><span id="ONE_validVillages">0</span> villages selected.<hr/>';
			contents += '</div>';
			contents += '<div style="float:left;width:300px;height:475px;padding:10px;">';
				contents += 'Insert targets here<br/><textarea id="ONE_targets" style="resize:vertical;min-height:150px;width:275px;color:grey;">123|456\nor\n123|456(dd-mm-yyyy hh:mm)</textarea><br/><br/>';
				contents += '<a href="javascript:void(0)" id="ONEsubmit">Click here to get your commands</a><hr/><br/><br/>';
			contents += '</div>';
			$('#innerSC').html(contents);
			$('#ONEupdate').click(function(){find_villages(kind_of_group, group, true);});
			$('#ONE_targets').click(function(){if ($(this).css('color') != 'rgb(0, 0, 0)') $('#ONE_targets').css({color:''}).val('');});
			$('.ONEtime').click(function(){$(this).css({color:''}).val('');}).blur(function(){if ($(this).val() == '') $(this).css({color:'grey'}).val('dd-mm-yyyy hh:mm');});
			$('#ONE_incomings_per_target').click(function(){$(this).val('');}).blur(function(){if ($(this).val() == '') $(this).val('1');});
			$('.ONE_units').click(function(){$(this).val('');});
			$('#innerSC input[type="text"]').blur(function(){ // update array with the villages containing enough units.
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
						$.each($('.ONE_units'), function(i){
							if (parseInt($(this).val()) > parseInt(v[i+1])) {add = false; return;} //v[0] = villageID
						});
						if (add == true) {selected_villages.push(k);}
					}
				});
				$('#ONE_validVillages').text(selected_villages.length).css('color',''); //-> SAVE TO SS -> why?
			});
			$('#ONEsubmit').click(function(){
				if ($('#ONE_targets').val() != '' && selected_villages != ''){
					var cpv = $('#ONE_incomings_per_target').val(), //commands per village, will need it later
					selected_units = {},
					slowest_unit = 0;
					$.each($('.ONE_units'), function(){
						if ($(this).val() > 0) {
							var current_unit = $(this).prop('id').split('_')[2];
							selected_units[world_settings.units[current_unit-1]] = $(this).val();
							if (world_settings.unit_spd[current_unit-1] > slowest_unit) slowest_unit = world_settings.unit_spd[current_unit-1];
						}
					});
					var no_night = ($('#ONE_send_support').prop('checked') == true?false:$('#ONE_no_night').prop('checked')); //prevents no support during night
					var data = {
						ownVillages : selected_villages,
						targets     : $('#ONE_targets').val().match(/\d+\|\d+/g),
						settings    : {
							cpv       : cpv,
							timestamp : timestamp,
							speed     : world_settings.speed,
							n_start   : world_settings.n_start,
							n_end     : world_settings.n_end,
							no_night  : no_night,
							unit_spd  : slowest_unit,
							name      : game_data.player.name,
							world     : game_data.world,
							version   : script_version
						}
					}

				}
				else if ($('#ONE_targets').val() == '') $('#ONE_targets').val('Add targets here!').css('color','red');
				else $('#ONE_validVillages').html('<b>0</b>').css('color','red');
			});
		}
		var group = $('strong[class="group_tooltip"]').text().slice(1,-2),
		kind_of_group = (settings.groups.index[group]>-1?'def':'off'),
		selected_villages = [],commands={index:{}}, count=0, loop=0, loops=25;
		if (!sessings[kind_of_group]) sessings[kind_of_group] = {};
		if (!sessings[kind_of_group][group]) {
			find_villages(kind_of_group, group);
		}
		fill_screen();
	}
	function show_settings(one){
		var img=['spear','sword','archer','spy','heavy','catapult'],
		url='https://web.archive.org/web/20170409020938/https://cdn.tribalwars.nl/8.18/19283/graphic/unit/unit_';
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
		var text = msg[lang].min+': <input type="text" id="SC_min" value="'+settings.units.min+'" size="7"><br/><hr/>';
		text += '<br/><b>'+msg[lang].city_defence+'</b><br/>';
		$.each(img, function(i){
			text += '<img src="'+url+img[i]+'.png" title="'+msg[lang].all_units[i]+'" alt=""/><input type="text" id="SC_'+img[i]+'" value="'+settings.units[img[i]]+'" size="7"><br/>';
		});
		text += '<hr/><br/><b>'+msg[lang].cross+'</b><br/>';
		text += '<table><tr><th>'+msg[lang].group+'</th><th colspan="6" width="400px">'+msg[lang].units+'</th><th>'+msg[lang].cross_perc+'</th></tr>';
		for (var i=0;i<settings.groups.count;i++) text+=create_tr(i);
		text += '</table>';
		text += '<a href="javascript:void(0)" id="SCupdate">'+msg[lang].update+'</a>';
		$('#innerSC').html(text);
		$('#innerSC input').blur(function(){update($(this));});
		$('#SCupdate').click(function(){get_groups(false, one);});
		
		$('#SCsettings').text(msg[lang].store);
		$('#SCsettings').click(function(){
			function shrink(){
				$('#SCscreen').css('width','-=10');
				if ($('#SCscreen').css('width').match(/\d+/) > 200) setTimeout(shrink,1);
				else {
					$('#SCscreen').css('width','200px');
					show_targets();
				}
			}
			if (one == true) oneCommand();
			else shrink();
		});
	}
	
	/* ---Page handlers--- */
	if (document.URL.match('away_detail')) {
		$('a:not("#SCswitch")').not($('div .SCscreen')).click(function(){
				sessings.active = false;
				sessionStorage[storageName] = JSON.stringify(sessings);
			});
		if (sessings.active != true) show_startLink();
		else show_screen();
	}
	else if (document.URL.match('screen=place') && !document.URL.match('try=confirm') && sessings.active == true/* && window.name.match(/SCwindow/)*/) {
		$('.modemenu').append('<tr><td><a href="javascript:void(0)" id="SCoff">'+msg[lang].off+'</a></td></tr>');
		$('.modemenu').append('<tr><td><font color="red">'+msg[lang].autoClose+'</font></td></tr>');
		$('#SCoff').click(function(){
			sessings.active = false;
			sessionStorage[storageName] = JSON.stringify(sessings);
			$(this).remove();
		});
		if (document.URL.match('&target=')) { // support checker
			var field=$('input[id^="unit_input_"]'), units=[], crossDef=(sessings.cross==1?false:true), units_away = [0,0,0,0,0,0], percentage_to_send=[], village=document.URL.match(/village=\d+/).toString().split('=')[1], this_village_number;
			if (field.length == 12) {
				units = ['spear','sword','archer','spy','heavy','catapult'];
			}
			else units = ['spear','sword','spy','heavy','catapult'];
			//if (sessings.commands[village].length > 1 || sessings.cross != 1) { //Cross def calculation
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
			/*//}
			//else percentage_to_send = [1,1,1,1,1,1];*/
			$.each(units, function(i,v){
				var units_in_target = parseInt(sessings.commands[village][this_village_number].targetUnits[i]),
				group = sessings.commands[village][0].group,
				units_needed = sessings.commands[village][0].ownUnits[i]-settings.units[v],
				requested_units = Math.floor((units_needed>0?units_needed:0)*(percentage_to_send[i] > 0 ? percentage_to_send[i] : 0)),
				max_units;
				if (sessings.cross != 1){
					try {max_units = parseInt((settings.groups[settings.groups.index[group]][v]-settings.units[v])*sessings.cross);}
					catch (e) {max_units = 99999;}
				}
				requested_units = (requested_units+units_in_target > max_units && units_in_target<max_units? units_in_target-max_units : requested_units);
				insertUnit($('#unit_input_'+v), (requested_units>0?requested_units:0));
			});
			$('#target_support').focus();
		}
		else if (document.URL.match(/oneX/)){ // one
			var target = document.URL.match(/oneX=(.*?)&oneY=(.*?)&screen/);
			$('#inputx').val(target[1]);
			$('#inputy').val(target[2]);
			$.each(sessings.selected_units, function(k,v){
				insertUnit($('#unit_input_'+k), v);
			});
			(sessings.support == true?$('#target_support').focus():$('#target_attack').focus());
		}
		else if (window.name.match(/SCwindow/)) $(document).ready(function(){close()});
		$('a').click(function(){
			sessings.active = false;
			sessionStorage[storageName] = JSON.stringify(sessings);
		});
	}
	else if (game_data.screen=='overview_villages' && ONE_active==true && $('#combined_table').length > 0){
		$('a:not("#SCswitch")').not($('div .SCscreen')).not($('.paged-nav-item')).click(function(){
			sessings.active = false;
			sessionStorage[storageName] = JSON.stringify(sessings);
		});
		if (sessings.active != true) show_startLink(true);
		else show_screen(true);
	}
});
/*
     FILE ARCHIVED ON 02:09:38 Apr 09, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:48:47 Jan 20, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/