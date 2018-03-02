// ==UserScript==
// @name        vorigevolgende
// @namespace   jefio
// @include     *.tribalwars.*/*
// @exclude     screen=mail*
// @exclude     *screen=mail*
// @exclude     *screen=mail
// @exclude     *screen=forum*
// @exclude     *screen=forum
// @exclude     screen=forum*
// @version     1
// @grant       none
// ==/UserScript==

javascript:void

$(document).keydown(function(event)
{
    console.log(event.keyCode);
    if (event.keyCode==37)
    {
        var url = $("a#village_switch_left").attr("href");
        
        if (url)
        {
        window.location = url;
        }
    }
    
    if (event.keyCode==39)
    {
        var url = $("a#village_switch_right").attr("href");
        
        if (url)
        {
        window.location = url;
        }
    }
    
    if (event.keyCode==49)
    {
    $("a#open_groups").click();
    }
    
    if (event.keyCode==50)
    {
    $("a#closelink_group_popup").click();
    }
    
});
/*
     FILE ARCHIVED ON 22:12:07 Apr 08, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:50:29 Jan 20, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/