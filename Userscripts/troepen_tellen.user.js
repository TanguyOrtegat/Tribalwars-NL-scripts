// ==UserScript==
// @name           TW troepen tellen op rekruteerscherm
// @namespace      http://home.deds.nl/~lekensteyn/p/
// @description    Telt troepen bij Kazerne, Stal en Werkplaats
// @include        https://nl*.tribalwars.nl/game.php?*screen=barracks*
// @include        https://nl*.tribalwars.nl/game.php?*screen=stable*
// @include        https://nl*.tribalwars.nl/game.php?*screen=garage*
// @include        https://nl*.tribalwars.nl/game.php?*screen=train*
// @grant		   none
// ==/UserScript==
/**
 * (c) 2011 Lekensteyn <lekensteyn@gmail.com>
 * Support: www.tribetool.nl
 * Created: 0.1.20081124
 * Version: 0.4.20111209.2
 * Please retain this original copyright.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 */

(function (fn) {
	var script = document.createElement("script");
	script.textContent = "(" + fn.toString() + ")();";
	(document.body || document.documentElement).appendChild(script);
})(function () {
	// Maak enkelvoud en verwijder spaties ervoor/erna: Rammen -> Ram
	function normalizeUnitName(unitName) {
		return unitName.replace(/^\s+|\s+$/g, "").replace(/(s|m?en)$/, "")
	}
	var trainqueues = document.getElementsByClassName("trainqueue_wrap"),
		form = document.getElementById("train_form"),
		trainTableRows,
		/**
		 * units is een object, met als index de naam van de eenheid, en als
		 * waarden een array: [ beschikbaar, in_opleiding ]
		 */
		units = {},
		infoTable;
	if (form) trainTableRows = form.getElementsByTagName("table")[0].rows;
	var update_counter = function () {
		// loop alle eenheden na in de rekruteertabel
		for (var i=1; i<trainTableRows.length - 1; i++) {
			var cells = trainTableRows[i].cells;
			if (cells.length < 6)
				continue;
			var unitName = normalizeUnitName(cells[0].textContent);
			unitCount = cells[6].textContent.split("/");
			// tenzij een andere script dit verandert moet de cel altijd in de
			// vorm "1/2" zijn. Controleer voor de zekerheid
			if (unitCount.length == 2) {
				units[unitName] = [ 1 * unitCount[1], 0 ];
			}
		}
		for (var i=0; i<trainqueues.length; i++) {
			var queueTableRows = trainqueues[i].getElementsByTagName("tr");
			for (var j=0; j<queueTableRows.length; j++) {
				var unitCountAndName = queueTableRows[j].cells[0].textContent;
				// haal het nummer uit 123 Rammen
				var unitCount = unitCountAndName.match(/\d+/);
				if (!unitCount) continue;
				unitCount = unitCount[0];
				// Haal de eenheidnaam eruit, waarbij het aantal wordt verwijderd
				var unitName = normalizeUnitName(unitCountAndName.replace(unitCount, ""));
				units[unitName][1] += 1 * unitCount;
			}
		}
		infoTable.innerHTML = '<colgroup span="4">' +
			'<col style="background-color:#ffffee"></col>' +
			'<col style="background-color:#ddddcc"></col>' +
			'<col style="background-color:#ffffee"></col>' +
			'<col style="background-color:#ddddcc"></col>' +
			"</colgroup>" +
			"<tr><th>Eenheid</th><th>Aanwezig</th><th>In opleiding</th><th>Totaal</th></tr>";
		for (var unitName in units) {
			var unitInfo = units[unitName],
				unitRow = infoTable.insertRow(-1);
			unitRow.insertCell(0).textContent = unitName;
			unitRow.insertCell(1).textContent = unitInfo[0];
			unitRow.insertCell(2).textContent = unitInfo[1];
			unitRow.insertCell(3).textContent = unitInfo[0] + unitInfo[1];
		}
	};
	if (trainTableRows) {
		infoTable = document.createElement("table");
		var insertAfter = document.getElementById("content_value").getElementsByTagName("table")[0];
		// voegt het element /na/ de eerste tabel van #content_value in
		insertAfter.parentNode.insertBefore(infoTable, insertAfter.nextSibling);
		update_counter();
		var _updateAll = TrainOverview.updateAll;
		TrainOverview.updateAll = function () {
			try {
				_updateAll.apply(null, arguments);
			} finally {
				update_counter();
			}
		};
	}
});
/*
     FILE ARCHIVED ON 22:14:07 Apr 08, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:49:46 Jan 20, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/