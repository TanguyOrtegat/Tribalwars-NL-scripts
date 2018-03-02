// ==UserScript==
// @name			Simulator-invuller
// @author			Heinzel
// @namespace		http://userscripts.org
// @version			0.2.20100504
// @description		Geeft je de opties om verschillende groepen in de simulator in te voegen.
// @include			https://nl*.tribalwars.nl/game.php?*screen=place&mode=sim*
// @grant		   none
// ==/UserScript==



(function(){
	function _evaluate(path, context) {
		if(!context) {
			context = document;
		}
		
		var XPath = document.evaluate(path, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var nodes = [];
		for(var x = 0; x < XPath.snapshotLength; x++) {
			nodes.push(XPath.snapshotItem(x));
		}
		
		return nodes;
	}
	
	function _$(kind) {
		return document.createElement(kind);
	}
	var win=window,doc=document;
	function getCookie(n){var c='; '+doc.cookie+';',s='; '+encodeURIComponent(n)+'=',b=c.indexOf(s),e;if(b==-1)return'';b=b+s.length;e=c.indexOf(';',b);return decodeURIComponent(c.substring(b,e))}
	function setCookie(n,v,l){var e=encodeURIComponent,L=parseInt(l)||0,c=doc.cookie;if(L&&c.length+e(n+v).length-e(('; '+c).indexOf('; '+n+'=')+1?n+getCookie(n):'').length>4027)throw alert('Cookie "'+n+'" kon niet opgeslagen worden: te weinig vrije ruimte voor cookies!');doc.cookie=e(n)+'='+e(v)+'; max-age='+L}
	var loSt=win.localStorage,
	getValue=loSt?function(n){return loSt.getItem(n)||''}:getCookie,setValue=loSt?function(n,v){v===0||v?loSt.setItem(n,v):loSt.removeItem(n)}:function(n,v){setCookie(n,v,1e7)},getValueC=loSt?function(n){var v=getCookie(n);if(v!=''){setValue(n,v);setCookie(n,0)}else return getValue(n);return v}:getCookie;
	
	
	function getGroupInfos() {
		var cookie = getValueC("DSwriteUnitsInSim_groupinfos"),
			groups = [];
		cookie = cookie ? cookie.split(',') : [];
		
		for(var x = 0; x < cookie.length; x++) {
			var group = {};
			group.name = unescape(cookie[x].split(":")[0]);
			
			var units = cookie[x].split(":")[1].split("&");
			for(var y = 0; y < units.length; y++) {
				var key = units[y].split(">")[0];
				var value = units[y].split(">")[1];
				
				group[key] = value;
			}
			
			groups.push(group);
		}
		
		return groups;
	}
	
	
	function insertUnits() {
		// nachschauen, was ausgewaehlt ist
		var selected = document.getElementById("group_select").value;
		if(!selected) {
			return;
		} else {
			var hidden = _$("input");
			hidden.type = "hidden";
			hidden.id = "selected";
			hidden.value = selected;
			document.body.appendChild(hidden);
		}
		
		// Speicherungen einlesen
		var group = getGroupInfos()[selected];
		
		// Kopf setzen
		head.innerHTML = group.name;
		
		// Grafik zum loeschen des Eintrags setzen
		var link = _$("a");
		link.style.marginLeft = "7px";
		link.href = "javascript:void('Verwijder opgeslagen vermelding')";
		link.addEventListener("click", deleteEntry, false);
		head.appendChild(link);
		
		var image = _$("img");
		image.style.height = "9px";
		image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGBQTFRFwradsqaOi39xxsCwKR4rjZWIo5V4f3BTcnxwl5yRpZyOzcWu1sy00Mexk4l9lp2OkJiKm4pqurWr1Muz3dK42M61mqCRlJuN0sivhY+Cf3Vwl42Dc19EeG1mjYN7AAAAg3R8aAAAACB0Uk5T/////////////////////////////////////////wBcXBvtAAAAhklEQVR42kzPVxaDIBBA0VGqYAIoiKY4+99lqBr+3mWAAywk4LVmsgBhce2t2aQhWNlFM7l5wIeVZu0dELBL7QxVcs9YoUjrClkOU7oDO+Q/pIFo7yOBt0sNbxOjiOVZ8axw0pH7NOi+VCUARd+4py2/+xcdCLiPuj7rT8FhcHB/P8VPgAEAd7IVfpMZXvYAAAAASUVORK5CYII=";
		link.appendChild(image);
		
		// Grafik zum bearbeiten des Eintrags setzen
		var link = _$("a");
		link.style.marginLeft = "7px";
		link.href = "javascript:void('Bewerk naam')";
		link.addEventListener("click", openEditMode, false);
		head.appendChild(link);
		
		var image = _$("img");
		image.style.height = "9px";
		image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAMAAABstdySAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAMBQTFRFo5CH7pIW18m96ObdjFVIdXFjylEI9e3kraad9+3eundr6rOUtDgK3drOxG8D/fr5xMG11M/Ccm5h2tbMrKmg/f39/fz86+jfzYUo8LR7393Rs0getUok+vn119THixUI/Pz8r2Yl2IUb5X8F94w003wEx6ain2Rbzb654bmBzcS0zcq/3sTE2s3N5+XcgHpq16Zs5N7SvUsBopyNv1kAxbmoo0Aw9NrAvlMjp3RxwWgD9/f0ymEC2tHQ13QpAAAAZFsvlwAAAEB0Uk5T////////////////////////////////////////////////////////////////////////////////////AMJ7sUQAAAB6SURBVHjaYuBlZtYzNFWUlrdn0BMVVbA2sGKT1wExxcwlTHhYjEFMWU0+IzMGfRCTU8mKh0uLFcSUVLWRYRJkZWAWY2dUZePiBDH5uRmVLZikBIRATBU7dSY5EFNMjcVSQ1hYG6RWl8NWXJxdmJVBQAQEODiMhQACDABikQveh7ocXwAAAABJRU5ErkJggg==";
		link.appendChild(image);
		
		// Daten setzen
		var inputs = document.getElementsByTagName("input");
		for(var x = 0; x < inputs.length; x++) {
			var name = inputs[x].name;
			if(!name) {
				continue;
			}
			
			if(group[name]) {
				if(inputs[x].type == "checkbox") {
					inputs[x].checked = eval(group[name]);
				} else {
					inputs[x].value = group[name];
				}
			}
		}
	}
	
	function openEditMode() {
		// nachschauen, ob ein Eintrag editiert werden soll (wenn ja, dann dessen Index auslesen) oder ein neuer Eintrag erstellt werden soll
		if(document.getElementById("selected")) {
			var selected = document.getElementById("selected").value;
			var group = getGroupInfos()[selected];
		} else {
			var group = false;
		}
		
		// Anzeigen, dass man sich im Editierungsmodus befindet
		head.innerHTML = "Edit-modus";
		head.style.color = "red";
		
		// Textfeld fuer den Namen des Speichercontainers erzeugen
		cell.innerHTML = "Naam: ";
		
		var name_field = _$("input");
		name_field.type = "text";
		name_field.id = "name";
		name_field.name = "name";
		name_field.value = (group) ? group.name : "";
		cell.appendChild(name_field);
		
		// Button aendern
		var button = _evaluate('//web.archive.org/web/20170408160954/http://input/[@type = "submit"]')[0];
		button.addEventListener("click", saveEdits, false);
		button.value = "Opslaan en Simuleren";
	}
	
	function saveEdits() {
		// nachschauen, ob ein Eintrag editiert werden soll (wenn ja, dann dessen Index auslesen) oder ein neuer Eintrag erstellt werden soll
		if(document.getElementById("selected")) {
			var selected = document.getElementById("selected").value;
		} else {
			var selected = false;
		}
		
		var inputs = document.getElementsByTagName("input");
		var entry = "";
		
		loop: for(var x = 0; x < inputs.length; x++) {
			var name = inputs[x].name;
			
			switch(inputs[x].type) {
				case "text":
					var value = escape(inputs[x].value);
					break;
				case "checkbox":
					var value = escape(inputs[x].checked);
					break;
				default:
					continue loop;
			}
			
			if(name == "name") {
				if(value == "") {
					return;
				}
				entry = value + ":";
				continue;
			}
			
			entry += (x == inputs.length-1) ? name + ">" + value : name + ">" + value + "&";
		}
		var cookie = getValueC("DSwriteUnitsInSim_groupinfos");
		cookie = cookie ? cookie.split(',') : [];
		if(selected) {
			cookie[selected] = entry;
		} else {
			cookie.push(entry);
		}
		
		setValue("DSwriteUnitsInSim_groupinfos", cookie.join(','));
	}
	
	function deleteEntry() {
		// aktuelle Auswahl ermitteln
		var selected = document.getElementById("selected").value;
		
		// cookie einlesen
		var cookie = getValueC("DSwriteUnitsInSim_groupinfos");
		cookie = cookie ? cookie.split(',') : [];
		
		// aktuelle Auswahl rausloeschen
		cookie.splice(selected, 1);
		
		// speichern
		if(cookie.length == 0) {
			if(!loSt) setCookie('DSwriteUnitsInSim_groupinfos', '', 0);
		} else {
			setValue("DSwriteUnitsInSim_groupinfos", cookie.join(","));
		}
	}
	
	
	function addSelectField() {
		var select = _$("select");
		select.id = "group_select";
		select.addEventListener("change", insertUnits, false);
		cell.appendChild(select);
		
		var groups = getGroupInfos();
		if(groups.length == 0) {
			var option = _$("option");
			option.value = "false";
			option.innerHTML = " -- Geen ingave -- ";
			select.appendChild(option);
			
			return;
		}
		
		var option = _$("option");
		option.value = "false";
		option.innerHTML = " -- Maak een keuze -- ";
		select.appendChild(option);
		
		for(var x = 0; x < groups.length; x++) {
			var option = _$("option");
			option.value = x;
			option.innerHTML = groups[x].name;
			select.appendChild(option);
		}
	}
	
	function addEditLink() {
		var link = _$("a");
		link.style.marginLeft = "7px";
		link.href = "javascript:void('Opslaan als...')";
		cell.appendChild(link);
		
		var image = _$("img");
		image.addEventListener("click", openEditMode, false);
		image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAMAAABstdySAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAMBQTFRFo5CH7pIW18m96ObdjFVIdXFjylEI9e3kraad9+3eundr6rOUtDgK3drOxG8D/fr5xMG11M/Ccm5h2tbMrKmg/f39/fz86+jfzYUo8LR7393Rs0getUok+vn119THixUI/Pz8r2Yl2IUb5X8F94w003wEx6ain2Rbzb654bmBzcS0zcq/3sTE2s3N5+XcgHpq16Zs5N7SvUsBopyNv1kAxbmoo0Aw9NrAvlMjp3RxwWgD9/f0ymEC2tHQ13QpAAAAZFsvlwAAAEB0Uk5T////////////////////////////////////////////////////////////////////////////////////AMJ7sUQAAAB6SURBVHjaYuBlZtYzNFWUlrdn0BMVVbA2sGKT1wExxcwlTHhYjEFMWU0+IzMGfRCTU8mKh0uLFcSUVLWRYRJkZWAWY2dUZePiBDH5uRmVLZikBIRATBU7dSY5EFNMjcVSQ1hYG6RWl8NWXJxdmJVBQAQEODiMhQACDABikQveh7ocXwAAAABJRU5ErkJggg==";
		link.appendChild(image);
	}
	
	head = _evaluate('//web.archive.org/web/20170408160954/http://th/[. = "Aanvaller"]/preceding-sibling::th')[0];
	head.style.textAlign = "center";
	
	cell = _evaluate('//a[@href = "javascript:unit_att();"]/parent::td/preceding-sibling::td')[0];
	cell.style.textAlign = "center";
	
	addSelectField();
	addEditLink();
})();
/*
     FILE ARCHIVED ON 16:09:54 Apr 08, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:49:08 Jan 20, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/