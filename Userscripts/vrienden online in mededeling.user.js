// ==UserScript==
// @name          	Da Stewie's vrienden online op mededelingen script
// @version       	1.0
// @namespace      	Da Stewie
// @homepage      	https://userscripts.org/
// @delay 1000
// @include       	*.tribalwars.nl/game.php*screen=mail*
// @grant		   none
// ==/UserScript==

jQuery.ajax({
    url: game_data.link_base_pure + 'buddies',
    success: function success(data) {
        $('#content_value ' + (game_data.mode == "view" ? 'form tr:eq(1) a' : 'tr a') ).each(function () {
            $(this).before(($('a[href*="screen=info_player"]:contains("' + this.textContent + '")', data).closest("tr").find("td:eq(1)").html() || "") + " ");
        });
    }
});
void(0);
/*
     FILE ARCHIVED ON 17:58:53 Apr 08, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:50:35 Jan 20, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/