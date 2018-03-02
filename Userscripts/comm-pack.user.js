// ==UserScript==
// @name           Comm pack
// @version        1
// @description    Improves communication on Tribal Wars
// @author         Tuam <tuam@tuam.nl> http://www.tuam.nl/
// @homepageURL    http://www.tuam.nl/
// @include        https://*.tribalwars.*
// @include        https://*.die-staemme.*
// @exclude        *t=*
// @run-at         document-end
// @grant          none
// @noframes
// ==/UserScript==

/* Changelog
*  (...)
*  2013-11-23 first Comm pack, replacing Forumfilter 2.1. Due to this years' increased functionality the original name doesn't fit the package any longer.
*  0.1.3 : chat finished
*  0.1.4 : beta added, rewritten older functions
*  1.0pre: .net and .de added.
			InnoGames granted permission for live testing and further development of this script and it's current technics.
			chat's been made draggable and will not be larger than your screen.
			improved loading within Chrome
			multiple quotes can now be undone.
			possibility to mark all messages read.
			bug fix: a removed chat topic made the chat impossible to re-install
			auto forcing the chat to start after initialising

* TO DO - sometimes, ever?:
* Change all time storage to timestamps
* add an update url for the whole script
*/

(function (f) {
	var d = document,
	s = d.createElement('script');
	s.textContent = '(' + f.toString() + ')()';
	(d.head || d.documentElement || d.body).appendChild(s);
	s.parentNode.removeChild(s)
})(function () {
	var datum = new Date(),	time, settings, sessings, lang=game_data.market,
	date=(datum.getDate()<10?'0'+datum.getDate():datum.getDate()),
	month=((datum.getMonth()+1)<10?'0'+(datum.getMonth()+1):datum.getMonth()+1);
	if (!localStorage.Tuam_commPack) {settings = {'chat':{active:false,url:false},'ignore_forums':{},'topics_read':{},'mail_read':{}};localStorage.Tuam_commPack = JSON.stringify(settings);}
	else settings = JSON.parse(localStorage.Tuam_commPack);
	if (!sessionStorage.Tuam_commPack) {sessings = {'chat':{last_time:0,mean_time:5000},'quotes':{},'index':{}};}
	else sessings = JSON.parse(sessionStorage.Tuam_commPack);
	if (lang != 'nl') lang = 'int';
	msg = {
		'nl'  : {
			'name'     : 'Comm-Pack',
			'th_forum' : 'Gelezen',
			'time'     : {
				'today'  : 'vandaag',
				'at'     : ' om',
				'on'     : 'op ',
				'hour'   : ' uur'
			},
			'forum_td'   : '<br/>Comm-pack&nbsp;&raquo;&nbsp;<a class="clear_storage">opruimen</a>&nbsp;&raquo;&nbsp;',
			'forum_td_2' : ['<a class="ignore_forums">Ik verveel me...</a>','<a class="ignore_forums">Negeer dit forumdeel</a>'],
			'clear_ls'   : 'Door je lokale opslag te verwijderen worden alle topics of mail ongelezen gemarkeerd.\nWil je doorgaan?',
			'cancel_ls'  : 'Er is niks gedaan.',
			'quotes'     : '&nbsp;Quote meerdere berichten',
			'clear_mail' : 'opruimen',
			'read_mail'  : 'Alles gelezen',
			'chat'       : {
				'name'		: 'Chat',
				'activate'	: 'Ga naar het forum en druk daar op het blauwe bolletje voor het topic dat je als chat wil gebruiken.',
				'loading'	: 'laden...',
				'btn_send'	: 'Versturen',
				'btn_close'	: 'Afsluiten',
				'btn_footer': 'Activeer de chat'
				}
		},
		'int': {
			'name'     : 'Comm Pack',
			'th_forum' : 'Read',
			'time'     : {
				'today'  : 'today',
				'at'     : ' at',
				'on'     : 'on ',
				'hour'   : ' hour'
			},
			'forum_td'   : '<br/>Comm pack&nbsp;&raquo;&nbsp;<a class="clear_storage">cleaner</a>&nbsp;&raquo;&nbsp;',
			'forum_td_2' : ['<a class="ignore_forums">I\'m bored...</a>','<a class="ignore_forums">Ignore these forums</a>'],
			'clear_ls'   : 'By removing your local storage all topics or mail will be marked unread.\nWould you like to continue?',
			'cancel_ls'  : 'Thanks for making this decision, we\'ve kept your settings.',
			'quotes'     : '&nbsp;Quote multiple posts',
			'clear_mail' : 'cleaner',
			'read_mail'  : 'All read',
			'chat'       : {
				'name'		: 'Chat',
				'activate'	: 'Press the blue signal in front off the topic you\'d like to use.',
				'loading'	: 'loading...',
				'btn_send'	: 'Send',
				'btn_close'	: 'Close chat',
				'btn_footer': 'Activate the chat'
				}
		}
	};
/* ---Forum functionality--- */
	if(document.URL.match('forum')) {
		if (!document.URL.match('view_thread')) {
			/* ---Insert the TD containing Comm Pack settings--- */
			var commPack_td = msg[lang].forum_td, newTD='';
			try {
				var forum_id=document.URL.match(/forum_id=\d+/)[0].split('=')[1];
				if (forum_id != 0) (settings.ignore_forums[forum_id] == true ? newTD = msg[lang].forum_td_2[0] : newTD = msg[lang].forum_td_2[1]);
			}
			catch (e) {/*do nothing*/}
			$("td[align='right']:has(br)").append(msg[lang].forum_td+newTD);
			
			/* ---Marking topics as read--- */
			$('<col width="65"/>').prependTo("colgroup");
			$('<th>'+msg[lang].th_forum+'</th>').insertBefore("table[class='vis nowrap'] tr th:first");
			$("table[class='vis nowrap'] tr:has(td)").each(function(){
				var thread_id = $(this).find('a:first').attr('href').match(/thread_id=\d+/).toString().split('=')[1],
				last_reply = $(this).find('td:eq(2)').text();
				(last_reply.match(msg[lang].time.today) ? time = date+'.'+month+'.'+datum.getFullYear()+last_reply.split(msg[lang].time.today)[1] : time = last_reply.split(msg[lang].time.on)[1]);
				(settings.topics_read[thread_id] == time ? newtd = '<img src="graphic/dots/green.png">' : newtd = '<img src="graphic/dots/red.png">');
				if (settings.chat.active == true){
					if (settings.chat.url == false) {
						newtd += '&nbsp;<img src="graphic/ally_forum.png" class="install_chat">';
					}
					else if (settings.chat.url.toString().match(thread_id)) newtd += '&nbsp;<img src="graphic/ally_forum.png" class="delete_chat">';
				}
				$('<td>'+newtd+'</td>').insertBefore($(this).find('td:first'));
			});
			
			/* ---Functions--- */
			$('.clear_storage').click(function(){
				if (confirm(msg[lang].clear_ls)){
					settings.topics_read={};
					localStorage.Tuam_commPack = JSON.stringify(settings);
				}
				else alert(msg[lang].cancel_ls);
			});
			$('.ignore_forums').click(function(){
				(settings.ignore_forums[forum_id] == true ? delete settings.ignore_forums[forum_id] : settings.ignore_forums[forum_id] = true);
				localStorage.Tuam_commPack = JSON.stringify(settings);
				$('.ignore_forums').remove();
			});
			$('.install_chat').click(function () {
				settings.chat.url = $(this).closest('tr').find('a:first').attr('href').match(/forum_id=\d+&thread_id=\d+/);
				localStorage.Tuam_commPack = JSON.stringify(settings);
				get_chat(settings.chat.url, false, true);
			});
			$('.delete_chat').click(function () {
				settings.chat.url = false;
				localStorage.Tuam_commPack = JSON.stringify(settings);
				$('#chat_topics').text('Selecteer een chattopic.');
			});
			$('a[href*="action=mark_read"]').click(function(){
				$("table[class='vis nowrap'] tr:has(td)").each(function(){
					var thread_id = $(this).find('a:first').attr('href').match(/thread_id=\d+/).toString().split('=')[1],
					last_reply = $(this).find('td:eq(3)').text();
					(last_reply.match(msg[lang].time.today) ? time = date+'.'+month+'.'+datum.getFullYear()+last_reply.split(msg[lang].time.today)[1] : time = last_reply.split(msg[lang].time.on)[1]);
					settings.topics_read[thread_id] = time;
				});
				localStorage.Tuam_commPack = JSON.stringify(settings);
			});
		}
		else if (document.URL.match('answer=true') && Object.keys(sessings.quotes).length > 0) { // Replying on a thread with multiple quotes
			var quotes='';
			for (i in sessings.quotes){
				quotes += sessings.quotes[i].post + '\n';
			}
			$("textarea[id='message']").val(quotes);
			sessings.quotes = {};
			sessings.index = {};
			sessionStorage.Tuam_commPack = JSON.stringify(sessings);
		}
		else { //Viewing a thread
			/* Marking thread as read */
			var last_reply = $("span[class='postheader_left']:last").text(),
			thread_id = document.URL.match('thread_id=[0-9]+').toString().split('=')[1];
			(last_reply.match(msg[lang].time.today) ? time = date+'.'+month+'.'+datum.getFullYear()+last_reply.split(msg[lang].time.today)[1] : time = last_reply.split(msg[lang].time.on)[1]);
			settings.topics_read[thread_id] = time;
			localStorage.Tuam_commPack = JSON.stringify(settings);
			
			/* Adding multiple quotes functionality */
			$('.postheader_right').prepend('<a class="m_quotes">[<img src="graphic/dots/red.png">'+msg[lang].quotes+']</a>').css('cursor','pointer');
			$("div[class='post']").each(function(){
				for (i in sessings.quotes){
					if (sessings.quotes[i].id == $(this).find('a:first').attr('name')) {
						$(this).find('a[class="m_quotes"] img').attr('src','graphic/dots/green.png');
						continue;
					}
				}
			});
			$('.m_quotes').click(function(){
				var topic = $(this).closest('div[class="post"]'),
				quote_id = topic.find('a:first').attr('name'),
				player = topic.find('a[target="_blank"]:first').text().slice(1, -1),
				url = topic.find('a[href*="quote_id="]').attr('href');
				if (!$.isNumeric(sessings.index[quote_id])) {
					$.ajax({
						url: url,
						success: function (data) {
							var post = (data.split(/\<textarea.*\>/)[1]).split(/\<\/textarea\>/)[0].replace(/&quot;/g,'"').replace(/&#039;/g,"'");
							var i = Object.keys(sessings.quotes).length;
							sessings.quotes[i] = {
								'id'   : quote_id,
								'name' : player,
								'post' : post
							};
							sessings.index[quote_id] = i;
							sessionStorage.Tuam_commPack = JSON.stringify(sessings);
							topic.find('img:first').attr('src','graphic/dots/green.png');
						}
					})
				}
				else {
					delete sessings.quotes[sessings.index[quote_id]];
					delete sessings.index[quote_id];
					topic.find('img:first').attr('src','graphic/dots/red.png');
				}
			});
		}
	}
/* ---Marking read messages--- */
	else if(document.URL.match('screen=mail')){
		if (!document.URL.match('mode=view')){
			$('<th>'+msg[lang].th_forum+'</th>').insertBefore('form[action*="del_move_multiple"] th:first');
			$('form[action*="del_move_multiple"] tr:has(td):has(input[name!="del"])').not(':has(select)').each(function(){
				var newtd,
				mail_id = $(this).find('input:first').attr('name').match(/\d+/);
				if (lang == 'nl'){
					var time = $(this).find('td:last').text().split('.');
					time = time[0]+'.'+time[1]+'. '+time[2].split(' ')[1];
				}
				else {
					var time = new Date($(this).find('td:last').text());
					time = time.getTime()/60000;
				}
				(settings.mail_read[mail_id] == time ? newtd = '<img src="graphic/dots/green.png">' : newtd = '<img src="graphic/dots/red.png">');
				$('<td>'+newtd+'</td>').insertBefore($(this).find('td:first'));
			});
			$("#select_all").closest('th').attr('colspan',5);
			$('<tr><td><a class="clear_storage">'+msg[lang].name+' '+msg[lang].clear_mail+'</a></td></tr>').insertAfter('.modemenu tr:last');
			$('<tr><td><a class="read_all">'+msg[lang].name+' '+msg[lang].read_mail+'</a></td></tr>').insertAfter('.modemenu tr:last');
			$('.clear_storage').click(function(){
				if (confirm(msg[lang].clear_ls)) {
					settings.mail_read = {};
					localStorage.Tuam_commPack = JSON.stringify(settings);
					$('form[action*="del_move_multiple"] tr:has(td):has(input[name!="del"]) img[src*="green.png"]').attr('src','graphic/dots/red.png');
				}
				else alert(msg[lang].cancel_ls);
			});
			$('.read_all').click(function(){
				$('form[action*="del_move_multiple"] tr:has(td):has(input[name!="del"])').not(':has(select)').each(function(){
					var newtd,
					mail_id = $(this).find('input:first').attr('name').match(/\d+/);
					if (lang == 'nl'){
						var time = $(this).find('td:last').text().split('.');
						time = time[0]+'.'+time[1]+'. '+time[2].split(' ')[1];
					}
					else {
						var time = new Date($(this).find('td:last').text());
						time = time.getTime()/60000;
					}
					settings.mail_read[mail_id] = time;
				});
				localStorage.Tuam_commPack = JSON.stringify(settings);
				$('form[action*="del_move_multiple"] tr:has(td):has(input[name!="del"]) img[src*="red.png"]').attr('src','graphic/dots/green.png');
			});
		}
		else {
			if (lang == 'nl'){
				var time = $("span[class='date']:first").text().split(msg[lang].time.at);
				(time[0].match(msg[lang].time.today) ? time = date+'.'+month+'.'+time[1].split(msg[lang].time.hour)[0] : time = time[0].split('op ')[1] + time[1].split(msg[lang].time.hour)[0]);
			}
			else {
				var time = $("span[class='date']:first").text();
				if (time.match(/today/)) time = new Date(datum.getFullYear()+','+month+','+date+','+time.split(msg[lang].time.at)[1]);
				else {
					time=time.split(msg[lang].time.on)[1].split(msg[lang].time.at);
					time = new Date(datum.getFullYear()+','+time[0].split('.')[1]+','+time[0].split('.')[0]+time[1]);
				}
				time = time.getTime()/60000; // Only minutes are needed
			}
			var mail_id = document.URL.match(/view=\d+/).toString().split('=')[1];
			settings.mail_read[mail_id] = time;
			localStorage.Tuam_commPack = JSON.stringify(settings);
		}
	}
	
/* ---Functionality to ignore certain forums to light up the new post indicator--- */
	if (!document.URL.match('forum') && settings.ignore_forums.active != false) {
		if ($('.new_post').length > 0) {
			$('#tribe_forum_indicator').prop('class','icon header no_new_post');
			$.ajax({
				url: game_data.link_base_pure+'forum',
				success: function (data) {
					$(data).find('#forum_box span img[title^="Nieuwe"]').each(function(){
						var forum_id = $(this).closest('a').attr('href').match(/forum_id=\d+/)[0].split('=')[1];
						if (settings.ignore_forums[forum_id] != true) {
							settings.ignore_forums.active = false;
							localStorage.Tuam_commPack = JSON.stringify(settings);
							$('#tribe_forum_indicator').prop('class','icon header new_post');
							return false;
						}
					});
				}
			})
		}
	}
	else if (!document.URL.match('forum')) {
		$('#tribe_forum_indicator').prop('class','icon header new_post');
	}
	else {
		delete settings.ignore_forums.active;
		localStorage.Tuam_commPack = JSON.stringify(settings);
	}
	
/* ---Chat--- */
	if (!document.URL.match('forum.php')) {
		var poster=[], time=[], post=[];
		
		function ajax_chat(url, force){
			$.ajax({
				url: url,
				cache: false,
				success: function (data) {
					$($(data).find('.post').get().reverse()).each(function(){
						if (poster.length < 10){
							poster.push($(this).find('.small a:first').text());
							time.push($(this).find('.postheader_left').text().match(/\d+:\d+/));
							var text = $(this).find('.text').text().split('___')[0];
							text = text.replace(/\n/g, '<br />');
							post.push(text);
						}
					});
					if ($(data).find('.error').length > 0) {
						settings.chat.url = false;
						localStorage.Tuam_commPack = JSON.stringify(settings);
					}
					var previous_url = $(data).find('.paged-nav-item:last').attr('href');
					get_chat (false, (previous_url?previous_url:false), force);
				}
			});
		}
		
		function show_chat(poster, time, post){
			var chat_contents='';
			for(var i=(poster.length-1); i>=0; i--){
				chat_contents += '<b>'+poster[i]+'</b> <i>('+time[i]+')</i><br/>';
				chat_contents += post[i]+'<br/><hr/>';
			}
			$('#chat_topics').html(chat_contents);
			$('#chat_topics').scrollTop(9999);
		}

		function get_chat(url, previous_url, force){
			var timestamp = new Date().getTime();
			if (settings.chat.active == false) return;
			else if (timestamp < (sessings.chat.last_time + sessings.chat.mean_time) && force !=true) {
				show_chat(sessings.chat.poster, sessings.chat.time, sessings.chat.post);
				setTimeout(get_chat,sessings.chat.mean_time,settings.chat.url,false,false);
			}
			else if (url != false && previous_url==false) {
				poster=[], time=[], post=[];
				ajax_chat(game_data.link_base_pure+'forum&page=last&screenmode=view_thread&'+url, force);
			}
			else if (poster.length < 10 && previous_url != false) ajax_chat(previous_url, force);
			else {
				show_chat(poster, time, post);
				/*Preparing setTimeout() to run without causing trouble to the game.
				* The idea is that the chat only reloads when it needs to do so, therefore this script does:
				* - calculate the time since the last activity
				* - calculate the mean time from last five posts
				* - Sets it's time to reload according to those results. */
				var timestamps=[], mean_time=0, count=0;
				for (var i=4;i>=0;i--){ //5 loops: trying to prevent really old posts from interfering
					timestamps.push(Date.parse("Thu, 01 Jan 1970 "+time[i]+":00 GMT")); //Getting # of seconds since 0:00 today.
				}
				var current_time = Date.parse("Thu, 01 Jan 1970 "+$('#serverTime').text()+" GMT");
				var first_time_difference = current_time-timestamps[timestamps.length-1];
				if (first_time_difference > 0){
					mean_time = first_time_difference;
					count = 1;
					for (var i=timestamps.length-1; i>=0; i--){
						if (timestamps[i] >= timestamps[i-1]){
							mean_time+=(timestamps[i]-timestamps[i-1]);
							count++;
						}
						else break;
					}
				}
				if (count>0) mean_time = mean_time/count;
				else if (current_time < 30000) mean_time = current_time*2;
				else mean_time = 60000;
				if (mean_time > 60000 && first_time_difference > 120000) mean_time = 60000;
				else if (mean_time > 60000 && first_time_difference < 120000) mean_time = first_time_difference/2;
				else if (mean_time < 2000) mean_time = 2000;
				sessings.chat.last_time = timestamp;
				sessings.chat.mean_time = mean_time;
				sessings.chat.poster = poster;
				sessings.chat.time = time;
				sessings.chat.post = post;
				sessionStorage.Tuam_commPack = JSON.stringify(sessings);
				setTimeout(get_chat,mean_time,settings.chat.url,false,false);
			}
		}
		
		function send_chat(){
			var thread_id = settings.chat.url.toString().match(/thread_id=\d+/);
			var forum_id = settings.chat.url.toString().match(/forum_id=\d+/);
			url = 'forum.php?&screen=view_thread&action=new_post&'+thread_id+'&answer=true&page=last&'+forum_id+'#';
			$.post(url,{message:$('#chat_message').val()})
			.done(function() {
				$('#chat_message').val('');
				$('#send_chat').blur();
				get_chat(settings.chat.url,false,true);
			});
		}
		
		function close_chat(){
			settings.chat.active = false;
			localStorage.Tuam_commPack = JSON.stringify(settings);
			$('#Chat').remove();
			create_start_link();
		}
		
		function start_chat(){
			var a = document.createElement("div");
			a.id = msg[lang].chat.name;
			a.style.cssText = "background-color:#ecd6ad;border:2px solid #7d510f;z-index:5;top:"+(settings.chat.top>0?settings.chat.top+'px':'10%')+";left:"+(settings.chat.left>0?settings.chat.left+'px':'5px')+";position:fixed;padding-top:7px;padding-left:7px;width:15%;height:80%;max-height:625px;border-radius:7px;box-shadow:0 0 50px 15px #000000;cursor:pointer;z-index:100;";
			a.innerHTML = '<h2 style="text-align: center;">Chat</h2><div style="word-wrap:break-word;overflow:auto;height:70%;max-height:500px;padding:2px 2px 0px 2px;"id="chat_topics">'+(settings.chat.url == false ? msg[lang].chat.activate:msg[lang].chat.loading)+'</div>';
			a.innerHTML += '<div style="padding:2px 5px 0px 2px;position:absolute;bottom:20px;"><textarea id="chat_message" style="width:90%;" cols="50" tabindex="1001"></textarea></div>';
			a.innerHTML += '<div style="padding:2px 2px 2px 2px;position:absolute;bottom:0;right:0;" id="chat_bottom"><a id="send_chat" href="javascript:void(0)" tabindex="1002">'+msg[lang].chat.btn_send+'</a>&nbsp;&nbsp;&nbsp;<a id="close_chat" href="javascript:void(0)" tabindex="1003">'+msg[lang].chat.btn_close+'</a></div>';
			document.body.appendChild(a);
			$('#send_chat').click(function() {send_chat();});
			$('#chat_message').keypress(function(e) {if(e.keyCode == 13 && !e.shiftKey) send_chat();});
			$('#close_chat').click(function() {close_chat();});
			if (settings.chat.url != false) get_chat(settings.chat.url, false, false);
			$('#'+msg[lang].chat.name).draggable({
				stop: function(e,o) {
					settings.chat.top = o.position.top;
					settings.chat.left = o.position.left;
					localStorage.Tuam_commPack = JSON.stringify(settings);
				}
			});
		}
		
		function create_start_link(){
			$('#footer div:first').append('<a href="#" id="chat_link" class="footer-link">&nbsp-&nbsp'+msg[lang].chat.btn_footer+'</a>');
			$('#chat_link').click(function () {
				settings.chat.active = true;
				localStorage.Tuam_commPack = JSON.stringify(settings);
				start_chat();
				$('#chat_link').remove();
			});
		}
		
		if (settings.chat.active == true) start_chat();
		else create_start_link();
	}
	
});
/*
     FILE ARCHIVED ON 20:51:27 Apr 08, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:46:39 Jan 20, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/