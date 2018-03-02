// ==UserScript==
// @name           Tribal Wars Server in titel
// @namespace      http://home.deds.nl/~lekensteyn/p/
// @description    Weergeeft de server in de titelbalk
// @include        https://nl*.tribalwars.nl/*
// @grant		   none
// ==/UserScript==
/**
 * Tribal Wars BB code enhancer (c) 2009 Lekensteyn <lekensteyn@gmail.com>
 * Support: www.tribetool.nl
 * Created: 05052009-1
 * Version: 22052009-2
 * Please retain this original copyright.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 */
if(top == self){
 var s = location.host.match(/^[^.]+/);
 if(s=s[0]) document.title = s+'] '+document.title;
}
/*
     FILE ARCHIVED ON 22:14:15 Apr 08, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:49:39 Jan 20, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/