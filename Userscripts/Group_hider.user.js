// ==UserScript==
// @name            Group hider
// @author          iwantwin93
// @version         1.1
// @description     Hides groups on the group overview
// @include         https://nl*.tribalwars.nl/game.php?*screen=overview_villages*mode=groups*
// @include         https://nl*.tribalwars.nl/game.php?*screen=overview_villages*
// @grant		   none
// ==/UserScript==

(function ( f ) {
  var d = document,
    s = d.createElement( 'script' );
  s.textContent = '$(document).ready(' + f.toString() + ')';
  (d.body || d.head || d.documentElement).appendChild( s );
})( function () {
  if ( $( "#group_table" ).length == 1 ) {
    $( '#group_table' ).find( 'tr' ).not( ':first' ).hide();
    $( '#group_table' ).find( 'tr:first' ).append( '<img src="/graphic/rename.png" title="Groep herbenoemen" onclick="$(\'#group_table\').find(\'tr\').not(\':first\').toggle();" />' );
  }
} );
/*
     FILE ARCHIVED ON 03:07:20 Apr 09, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:47:36 Jan 20, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/