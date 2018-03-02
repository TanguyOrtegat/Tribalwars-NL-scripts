// ==UserScript==
// @name           TW Forumfilter
// @version        2.1
// @description    Marks topics which are not new
// @namespace      Tuam | www.tuam.nl
// @include        https://nl*.tribalwars.nl/*screen=forum*
// @include        https://nl*.tribalwars.nl/*screen=mail*
// @include        https://nl*.tribalwars.nl/*forum.php*
// @grant          none
// ==/UserScript==

/* Changelog
*  2012-12-19, v2.0i  : completely rewritten
*  2013-01-05, v2.0i.1: bugs fixed: zero added for first 9 days/months, time splitting changed for names matching 'om', repositioned clear LS function on mail page, fix for quoting quotes (not sure if this is okay, original code is still after slashes)
*						new features: repositioned FF colom on forum, pointer cursor for MQ, possibility to mark a forum read.
*  2013-03-28, v2.1   : supports Chrome
*/

function addJQuery(callback) {
	var script = document.createElement('script');
	script.setAttribute("src", "//web.archive.org/web/20170408144439/http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "window.$=jQuery.noConflict(true);(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function main(){
	var datum = new Date(),
	time,
	date=(datum.getDate()<10?'0'+datum.getDate():datum.getDate()),
	month=((datum.getMonth()+1)<10?'0'+(datum.getMonth()+1):datum.getMonth()+1);
	if(document.URL.match('forum')) {
		var topics_read=(localStorage.Tuam_FF ? JSON.parse(localStorage.Tuam_FF) : {});
		if (!document.URL.match('view_thread')) {
			$('<col width="65"/>').prependTo("colgroup");
			var tr = $("table[class='vis nowrap']").find('tr');
			tr.find('th:contains(:)').clone().prependTo(tr[0]).text('Gelezen').css('width','65px');
			for (var i=1; i<(tr.find('th:contains(alles)')[0]? tr.length-1 : tr.length);i++){
				var td = tr[i].getElementsByTagName('td');
				var newtd = document.createElement('td');
				newtd.style.textAlign='center';
				var thread_id = (td[0].getElementsByTagName('a')[0].href).match('thread_id=[0-9]+').toString().split('=')[1];
				(td[2].innerHTML.match('vandaag') ? time = date+'.'+month+'.'+datum.getFullYear()+' om '+td[2].innerHTML.split(' om ')[1].split('</div')[0] : time = td[2].innerHTML.split('op ')[1].split('</div>')[0]);
				(topics_read[thread_id] == time ? newtd.innerHTML = '<img src="graphic/dots/green.png">' : newtd.innerHTML = '<img src="graphic/dots/red.png">');
				td[3].parentNode.insertBefore(newtd, td[0]);
			}
			var td = $("td[align='right']:contains(Forum)").append('<br/>Forumfilter&nbsp;&raquo;&nbsp;<a class="clear_storage">Opslag leegmaken</a>');
			$('.clear_storage').click(function(){
				(confirm('Door je lokale opslag te verwijderen worden alle topics ongelezen gemarkeerd.\nWil je doorgaan?') ? localStorage.removeItem('Tuam_FF') : alert('Er is niks gedaan.'));
			});
			$('a:contains(gelezen markeren)').click(function(){
				for (var i=1; i<(tr.find('th:contains(alles)')[0]? tr.length-1 : tr.length);i++){
					var td = tr[i].getElementsByTagName('td');
					var thread_id = (td[1].getElementsByTagName('a')[0].href).match('thread_id=[0-9]+').toString().split('=')[1];
					(td[3].innerHTML.match('vandaag') ? time = date+'.'+month+'.'+datum.getFullYear()+' om '+td[3].innerHTML.split(' om ')[1].split('</div')[0] : time = td[3].innerHTML.split('op ')[1].split('</div>')[0]);
					topics_read[thread_id] = time;
				}
				localStorage.Tuam_FF = JSON.stringify(topics_read);
			});
		}
		else if (document.URL.match('answer=true') && sessionStorage.Tuam_FFQ) { /*multiple quotes */
			var ls=JSON.parse(sessionStorage.Tuam_FFQ), quotes='';
			for (i in ls){
				//quotes += '[quote="' + ls[i].name + '"]' + ls[i].post + '[/quote]\n\n';
				quotes += ls[i].post + '\n';
			}
			$("textarea[id='message']").val(quotes);
			sessionStorage.removeItem('Tuam_FFQ')
		}
		else {
			if ($("span[class='postheader_left']:last").text().match('vandaag')){
				time = date+'.'+month+'.'+datum.getFullYear()+' om '+$("span[class='postheader_left']:last").text().split(' om ')[1];
			}
			else {
				time = $("span[class='postheader_left']:last").text().split('op ')[1];
			}
			var thread_id = document.URL.match('thread_id=[0-9]+').toString().split('=')[1];
			topics_read[thread_id] = time;
			localStorage.Tuam_FF = JSON.stringify(topics_read);
			var quotes; /*multiple quotes till end of loaded page*/
			(sessionStorage.Tuam_FFQ? quotes=JSON.parse(sessionStorage.Tuam_FFQ) : quotes = {});
			$('.postheader_right').prepend('<a class="m_quotes"><img src="graphic/dots/red.png">&nbsp;Multi quotes</a>').css('cursor','pointer');
			var posts = $("div[class='post']").find("a:first");
			for (var i=0;i<posts.length;i++){
				for (y in quotes){
					if (quotes[y].id == posts[i].name){
						posts.closest('div').find('a[class="m_quotes"]').find('img')[i].src="graphic/dots/green.png";
						continue;
					}
				}
			}
			$('.m_quotes').click(function(){
				
				
				var topic = $(this).closest("div[class='post']");
				var quote_id = topic.find("a:first")[0].name;
				var player = topic.find("a[target='_blank']:first").text().slice(1, -1);
				var url = topic.find("a:contains(Citaat)")[0];
				$.ajax({
					url: url,
					timeout: 5000,
					success: function (data) {
						//var post = (data.split(/\[quote=&quot;.*&quot;\]/)[1].split(/\[\/quote\]/)[0]);
						var post = (data.split(/\<textarea.*\>/)[1]).split(/\<\/textarea\>/)[0].replace(/&quot;/g,'"').replace(/&#039;/g,"'");
						var i = Object.keys(quotes).length;
						quotes[i] = {};
						quotes[i].id=quote_id;
						quotes[i].name=player;
						quotes[i].post=post;
						sessionStorage.Tuam_FFQ = JSON.stringify(quotes);
						topic.find("img")[0].src="graphic/dots/green.png";
					}
				})
			});
		}
	}
	else if(document.URL.match('screen=mail')){
		var mail_read=(localStorage.Tuam_FFM ? JSON.parse(localStorage.Tuam_FFM) : {});
		if (!document.URL.match('mode=view')){
			var tr = $("table[class='vis']:contains(Onderwerp)").find('tr');
			tr.find('th:contains(Laatste)').clone().appendTo(tr[0]).text('Gelezen').css('width','65px');
			for (var i=5; i<tr.length-1;i++){
				var td = tr[i].getElementsByTagName('td');
				var newtd = document.createElement('td');
				newtd.style.textAlign='center';
				var mail_id = (td[0].getElementsByTagName('input')[0].name).match('[0-9]+');
				time = td[2].innerHTML.split('.');
				time = time[0]+'.'+time[1]+'. '+time[2].split(' ')[1];
				(mail_read[mail_id] == time ? newtd.innerHTML = '<img src="graphic/dots/green.png">' : newtd.innerHTML = '<img src="graphic/dots/red.png">');
				td[2].parentNode.insertBefore(newtd, td[3]);
			}
			$("#select_all").closest('th').attr('colspan',5);
			var cs = $("strong:contains(Postvak In)").closest('td').append('&nbsp;&brvbar;&nbsp;<a class="clear_storage">Mailfilter&nbsp;&raquo;&nbsp;Opslag leegmaken</a>');
			$('.clear_storage').click(function(){
				(confirm('Door je lokale opslag te verwijderen worden alle medelingen ongelezen gemarkeerd.\nWil je doorgaan?') ? localStorage.removeItem('Tuam_FFM') : alert('Er is niks gedaan.'));
			});
		}
		else {
			time = $("span[class='date']:first").text().split(' om');
			(time[0].match('vandaag') ? time = date+'.'+month+'.'+time[1].split(' uur')[0] : time = time[0].split('op ')[1] + time[1].split(' uur')[0]);
			var mail_id = document.URL.match('view=[0-9]+').toString().split('=')[1];
			mail_read[mail_id] = time;
			localStorage.Tuam_FFM = JSON.stringify(mail_read);
		}
	}
}

addJQuery(main);
/*
     FILE ARCHIVED ON 14:44:39 Apr 08, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:45:51 Jan 20, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/