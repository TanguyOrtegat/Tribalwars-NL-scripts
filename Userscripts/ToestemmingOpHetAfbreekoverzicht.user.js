// ==UserScript==
// @name           Mood
// @version        1
// @description    Shows the current mood of a village in the buildings overview
// @author         Tuam <tuam@tuam.nl> http://www.tuam.nl/
// @homepageURL    http://www.tuam.nl/
// @include        https://*.tribalwars.*mode=buildings*
// @include        https://*.die-staemme.*mode=buildings*
// @exclude        *t=*
// @run-at         document-end
// @grant          none
// @noframes
// ==/UserScript==

(function (f) {
	var d = document,
	s = d.createElement('script');
	s.textContent = '(' + f.toString() + ')()';
	(d.head || d.documentElement || d.body).appendChild(s);
	s.parentNode.removeChild(s)
})(function () {
/* Global settings function, used in all my scripts. Here it's only needed for the world's speed.
** Do not change this code, it will cause malfunction to all scripts using it. */
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
	if (!localStorage.Tuam_settings) get_settings();
	else world_settings = JSON.parse(localStorage.Tuam_settings);
	if (world_settings.version != '1.2') get_settings();
/* End of global settings */

	var timestamp = new Date().getTime();
	if (!localStorage.Tuam_mood) {settings = {'time':timestamp};localStorage.Tuam_mood = JSON.stringify(settings);}
	else settings = JSON.parse(localStorage.Tuam_mood);
	/* Cleaning LS every fortnight*/
	if (timestamp>(settings.time+1209600000)) {settings = {'time':timestamp};localStorage.Tuam_mood = JSON.stringify(settings);}
	/* End of cleaning */
		
	function find_mood(village_id, tr){
		$.ajax({
			url: 'game.php?village='+village_id+'&screen=overview',
			async: false,
			success: function (data) {
				data = $(data).find('div[id="show_mood"]').find('div[class="widget_content"]').html();
				if (data !== undefined){
					$(tr).hide();
					//$(tr).find('td:eq(1)').text($(data).text());
					$('#get_all_possible_build').on('click',function(){
						$('tbody[id="villages"] tr').css('display','');
					});
					settings[village_id] = {
						'mood' : $(data).text().match(/\d+/),
						'time' : timestamp
					}
				}
				else {
					settings[village_id] = {
						'mood' : '100',
						'time' : timestamp
					}
				}
			}
		});
		localStorage.Tuam_mood = JSON.stringify(settings);
	}
	
	$('#get_all_possible_destroy').on('click', function(){
		$('tbody[id="villages"] tr').each(function(){
			var tr = $(this);
			var village_id = $(this).find('.quickedit-vn').attr('data-id');
			if (settings[village_id]){
				if (parseInt(settings[village_id].mood)+Math.floor((timestamp-settings[village_id].time)/3600000)*world_settings.speed==99) find_mood(village_id, tr);
				else if (settings[village_id].mood != 100) {
					$(tr).hide();
					//$(tr).find('td:eq(1)').text(settings[village_id].mood);
					$('#get_all_possible_build').on('click',function(){
						$('tbody[id="villages"] tr').css('display','');
					});
				}
			}
			else find_mood(village_id, tr);
		});
	});
	
});
/*
     FILE ARCHIVED ON 22:14:11 Apr 08, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:49:28 Jan 20, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/