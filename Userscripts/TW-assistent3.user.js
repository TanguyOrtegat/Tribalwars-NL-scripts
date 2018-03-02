// ==UserScript==
// @name            TW-assistent3
// @description    Baas tool :D
// @author           Hypix 
// @developer      Hans Solo & sake
// @version          8.15-1.0.0
// @namespace   Dei 2012
// @include         https://nl*.tribalwars.nl/game.php?*
// @include         https://nl*.tribalwars.nl/game.php?*screen=main*
// @include         https://nl*.tribalwars.nl/game.php?*screen=overview*
// @include         https://nl*.tribalwars.nl/*screen=report*	
// @include         https://nl*.tribalwars.nl/game.php*screen=place*
// @include         https://nl*.tribalwars.nl/game.php?*screen=map*
// @include         https://nl*.tribalwars.nl/game.php*screen=info_command&id*
// @exclude        https://nl*.tribalwars.nl/game.php?*screen=train*
// @include        https://nl*.tribalwars.nl/game.php?*mode=prod*
// @icon             https://www.tribalwars.nl/graphic/klee.png
// @grant		   none
// ==/UserScript==
// @run-at window-load


// dank aan DGF voor aan/uit zetten script
function Dei_ready()
{
    var TW_assistent_versie = "3";
    var DEBUG = false;
    var aanuit = 	{
	activatePack: "TW_Assistent Aanzetten",
	deactivatePack: "TW_Assistent Uitzetten"
	};
	   function getQueryStringParam(name, url)
    {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(url == undefined ? window.location.href : url);
        if (results == null)
            return "";
        else
            return results[1];
    }

    function getUrlString(url, villageId)
    {
        if (url.indexOf("?") == -1)
        {
            var link = location.href.substr(0, location.href.indexOf("?"));
            link += "?village=" + (villageId ? villageId : getQueryStringParam("village"));
            var isSit = getQueryStringParam("t");
            if (isSit) link += "&t=" + isSit;

            if (url.indexOf("=") == -1)
                return link + "&screen=" + url;
            else
                return link + "&" + url;
        }
        else
        {
            return url;
        }
    }

    function ajax(screen, strategy, opts)
    {
        opts = $.extend({}, { villageId: false, contentValue: true }, opts);

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange =
		function ()
		{
		    if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
		    {
		        var text = xmlhttp.responseText;
		        text = opts.contentValue ? $("#content_value", text) : text;
		        strategy(text);
		    }
		};

        xmlhttp.open("GET", getUrlString(screen, opts.villageId), true);
        xmlhttp.send();
    }
	
    function getCookie(name, isGlobalWorlds)
    {
        if ( true || localStorage === undefined)
        {
            if (document.cookie.match(/;/))
            {
                var cooks = document.cookie.split("; ");
                for (var x = 0; x < cooks.length; x++)
                {
                    var cookie = cooks[x];
                    if (cookie.match(name + "="))
                        return cookie.replace(name + "=", "");
                }
            }
            else
            {
                if (document.cookie.match(name + "="))
                    return document.cookie.replace(name + "=", "");
            }

            return '';
        }
        else
        {
            var item = localStorage.getItem(name);
            if (item == null) return '';
        }
    }

    function setCookie(name, value, expireMinutes)
    {
        var date_obj = new Date();
        time = date_obj.getTime();
        if (expireMinutes == undefined)
        {
            time += 1 * 60 * 1000 * 24 * 356;
        }
        else
        {
            time += expireMinutes * 1000 * 60;
        }
        date_obj.setTime(time);

        var expires = "expires=" + date_obj.toGMTString() + ";";

        document.cookie = name + "=" + value + ";" + expires;
    }
    var isTWAActive = getCookie("TWAActive") == "true";
    if (location.href.indexOf('changeStatusy=') > -1)
    {
        isTWAActive = location.href.indexOf('changeStatusy=true') > -1;
        setCookie("TWAActive", isTWAActive);
    };

	var link = "<a href='" + location.href.replace("&changeStatusy="  + isTWAActive, "") + "&changeStatusy=" + (!isTWAActive) + "'>";
	link += " - ";
	link += "<img src='graphic/" + (isTWAActive ? 'klee' : 'klee_grau') + ".png' title='" + (!isTWAActive? aanuit.activatePack  : aanuit.deactivatePack) + " (rev. " + TW_assistent_versie+ ")' />";
	link += "</a>";
	$("#linkContainer").append(link);
    if (isTWAActive)
	{
//	alert("yaye");
(function() {
var start = new Date().getTime();
var win = typeof(unsafeWindow) != "undefined" ? unsafeWindow : window;
var msg = "";
var ownPid,curVillage;
var dsVersion = "8.8";
var version = "8.8-1.0.2";
var dsaTechnischeVersion = version.split("-")[1].split(".")[0];
var dsaProgrammVersion = version.split("-")[1].split(".")[1];
var dsaBugfixVersion = version.split("-")[1].split(".")[2];
var texts = {
  de: {
    unit: {
      spear: "Speerträger",
      sword: "Schwertkämpfer",
      axe: "Axtkämpfer",
      archer: "Bogenschütze",
      spy: "Späher",
      light: "Leichte Kavallerie",
      marcher: "Berittener Bogenschütze",
      heavy: "Schwere Kavallerie",
      ram: "Rammbock",
      catapult: "Katapult",
      knight: "Paladin",
      snob: "Adelsgeschlecht"
    },
    units: {
      spear: "Speerträger",
      sword: "Schwertkämpfer",
      axe: "Axtkämpfer",
      archer: "Bogenschützen",
      spy: "Späher",
      light: "Leichte Kavallerie",
      marcher: "Berittene Bogenschützen",
      heavy: "Schwere Kavallerie",
      ram: "Rammböcke",
      catapult: "Katapulte",
      knight: "Paladin",
      snob: "Adelsgeschlechter"
    },
    buildings: {
      main: "Hauptgebäude",
      barracks: "Kaserne",
      stable: "Stall",
      garage: "Werkstatt",
      church: "Kirche",
      church_f: "Erste Kirche",
      snob: "Adelshof",
      smith: "Schmiede",
      place: "Versammlungsplatz",
      statue: "Statue",
      market: "Marktplatz",
      wood: "Holzfäller",
      stone: "Lehmgrube",
      iron: "Eisenmine",
      farm: "Bauernhof",
      storage: "Speicher",
      hide: "Versteck",
      wall: "Wall",
    },
    resources: {
      wood: "Holz",
      stone: "Lehm",
      iron: "Eisen"
    },
    gui: {
      title: "TW-Assistent",
      settings: {
        titles: { map: "Kaart", place: "Verzamelplaats", hotKeys: "Hotkeys", units: "Troepen", prod: "Productie_Overzicht", storage: "Opslagplaats", report: "Raporten", buildAssist: "Dorp_uitbouw", recruit: "Rekrutering", sounds: "Sounds", misc: "Andere"},
        colRangeTitle: { 
          resource:"Kleuren voor volstaande opslagplaats",
          farm:"Kleuren voor boerderij bezetting",
          defense:"Kleuren voor stack kracht",
        },
        map: {
          villageGroups: "Lijst van spelers en stammen op de zichtbare kaart tonen",
          vgShowAlly: " - Naam in lijst van spelers de stam toevoegen",
          rememberPos: "Kaart positie onthouden",
          redirActive: "\"Klik op dorp\"-gekozen actie wordt actief",
          sumHours: ["Buit van de laatste ", "  Uren tonen" ],
          saveHours: ["Buit van de laatste ", " Uren opslaan"],
          minAgeTransparency: ["Overlay van","Dagen berichtleeftijd langzaam dimmen"],
          opacityMin: "Min. Dekking van Farminfo (0-100)",
          opacityMaxRes: "Min. verwacht bronnen voor volle Dekking",
          showRessis: "Aktuele grondstoffen tonen",
          playerColored: "Grondstoffen bij spelers dorpen kleuren",
          showBars: "Opslagplaats volstand tonen",
          showWall: "muur/Troepen tonen",
          showPoints: "Punten van andere dorpen tonen",
          groupsOnTopo: "Kleur de eerste dorpsgroepen op de minimap kaart tonen",
          shadowTopo: " - Alle andere dorpen iets donkerder weergeven",
          topoBorderOwn: "- Eigen dorpen een geel kader geven",
          defense: "Algemene DEF-score",
          defense_cavalry: "Punten ZC-score",
          defense_archer: "Punten  BBoog-score",
          defTitle: "Stack voor Def-beoordeling",
        },
        popup: {
          showRessis: "Verwacht grondstoffen tonen",
          minReportAge: ["Berichtleeftijd tonen vanaf", "Uuren"],
          showBuildings: "Gebouwlevels tonen",
          showBuildingChange: "Gebouw level veranderingen tonen",
          showMining: "Statusvolstand en grote van opslagplaats tonen",
          showUnitsIn: "Eenheden in het dorp tonen",
          showUnitsOut: "Eenheden buiten het dorp tonen",
          showLoyalty: "Toestemming tonen",
        },
        place: {
          minRamWall: ["Rammen mee sturen, als muur min. op level", "is"],
          minRamsNeeded: "Rammen alleen sturen, als er genoeg rammen zijn, om de muur te vernietigen",
          minKataLevel: ["Kata's mee sturen, als het gebouw minstens Level", "heeft"],
          minKatasNeeded: "Kata's alleen mee sturen, als er genoeg Kata's zijn, om dat gebouw te vernietigen",
          kataOrderTitle: ["Kata volgorde op de gebouwen","Prioritijd","Gebouwen","kata doel"],
          noReportLoad: ["Eenheden met ", "draagkracht toevoegen, als er geen bericht voorhanden is" ],
          showRessis: "Verwachte grondstoffen tonen",
          showUnitsIn: "Troepen in het dorp tonen",
          showUnitsOut: "Eenheden buiten tonen",
          showBuildings: ["Gebouwen tonen", "Nee", "Alleen muur", "Alle"],
          showBuildingChange: "  - Gebouw level veranderingen tonen",
          showCatas: " - Benodigde kata's om gebouw naar 0 te brengen tonen",
          okOnPlayer: ["Ok-Button op de bevestiging pagina bij aanval op een medespeler- Of gereserveerd dorp", "achterlaten", "Rood kleuren", "deactiveren", "deactiveren en dorp blokkeren" ],
          disableOnUnits: "Aanval-Button deactiveren, indien in het aangevallen dorp eenheden waren gesignaleerd",
          minLoad: "Aanval-Button deactiveren, als de eenheden minder dan de minimale hoeveelheid kunnen dragen",
          farmlist: ["Farmlijst", "Farmen met de meeste grondstoffen meer dan", "binnen","velden"],
          maxAttAge: "max. Leeftijd van de aanval marker in Uren",
          minEQ: "Minimale succes quotiënt",
          colorFLRes: "De volle GS farms kleur verwijderen",
          unitStates: ["Kleuren voor het gebruik van de staat van eenheden","Status","Rand","Achtergrond"],
          confirmTitle: "bevestiging pagina:",
          confirmTitleBgColor: ["Achtergrondkleur van de titel","bij aanvalen","bij ondersteunen"],
          spyNoReport: "Farmen, Gebouwen waar voor geen informatie bestaat, Alleen verkennen",
          spyAge: ["Als de farm Info ouder als "," Uren enkel verkennen"],
          showCarry: "GS draagkracht tonen",
          showRunTime: "Looptijd tonen",
          showArrivalTime: "Aankomsttijd tonen",
          fakeSpys: ["Bij Fakes","Speer mee sturen"],
        },
        storage: {
          titleHead: "Titel",
          titleResColored: "Grondstoffen in de titel naar volstand kleur aanpassen",
          titleFarmColored: "Boerderijplaatsen in de titel na volstand de kleur aanpassen",
          titleCoins: "Goudmunten slaan",
          modSnob: "Grondstof kolommen splitsen die kenmerkend zijn voor munten",
          snobResColored: " - Grondstoffen voor elk niveau worden gekleurd",
          resourceColorTitle: "Kleuren voor opslagplaats:",
          farmColorTitle: "Kleuren voor boerderij bezetting:",
        },
        report: {
          enableReorder: "Hergroepering van berichten activieren",
          showBPs: "Bashpoints tonen",
          showSurvivors: "Overlevende Eenheden tonen",
          showLostCost: "Kosten voor verloren Eenheden tonen",
        },
        recruit: {
          drillQueueMode: ["Opleiding overzicht wachtrij","nee","middel","sterk"],
          shrinkRecruitmentMode: ["Recruiting symbolen combineren in het overzicht","nee","middel","sterk"],
          showRecruitSums: "Totaal van alle troepen in aanbouw Bekijken",
          showRecruitTotal: "Toon de troepen die na afbouw voorhanden zijn",          
          shrinkSmallOnly: "Alleen geminimaliseerd van de troepen wachtrij",
        },
        misc: {
          reportMaxAge: "Max. Berichtleeftijd in Dagen",
          modGroupPopup: "Dorpsgroepen selectie reeks in Dorpoverzicht vast zetten",
          coordSelector: "Coördinaten-selecteren activeren",
          slSwitcher: ["snellijst","altijd tonen","tonen/verbergen maken","automatisch verbergen (mouseover=tonen)"],
          useHotKeys: "Hotkeys gebruiken",
          navBarSwitcher: "TW menu automatisch verbergen (mouseover=tonen)",
          fixHead: "Snellijst- en TW menu op vaste plaats (dorpen scrollen onder deze menu's door)",
          newLineSort: "Sorteer pijlen van tabel bijschriften op een nieuwe regel schrijven",
          runTimeToolTips: "Looptijden tooltips tonen",
          rtttDelay: [ "  - na ", " Seconden tonen" ],
          ctxCtrl: "contextmenu's aleen bij Ctrl+Rechtsklik tonen",
          moveAtts: ["Positsie symbool, Aanval/Ondersteuning ", "links", "midden links", "midden", "midden rechts", "rechts" ],
          removeAMIcons: "Icons van Account-Managers uit het menu halen",
          privateNames: "Eigen dorpnamen toevoegen(niet te zien voor anderen)",
        },
        prod: {
          runtimeCol: "Kollom coördinaten in te voeren afstand toevoegen",
          resColored: "Grondstoffen voor elk niveau worden gekleurd",
          farmColored: "Boerderijplaatsen voor elk niveau worden gekleurd",
          farmTotal: "Maximale bevolking tonen",
          showSums: "Totalen tonen",
          removeBuildTime: "Datum van voltooiing van opdrachtenKolom verwijderen",
          shrinkRecruitmentMode: ["Recruitment symbolen samen te vatten","nee","middel","sterk","De resterende tijd tot aan de voltooiing","Voltooiing"],
          showRecruitSums: "Totaal van alle eenheden in aanbouw tonen",
        },
        sounds: {
          active: "Sounds aan",
          volume: "Volume",
          url: "URL",
          loop: "LOOP",
          attOwnAcc: "Aanval op eigen Account",
          attUVAccs: "Aanval op VV-Accounts",
          attDone: "Aanval binnen gekomen",
          report: "Nieuw bericht",
          igm: "IGM",
          forum: "Forum",
          session: "Sessie afgelopen",
          support: "Ondersteuning onderweg",
          supportDone: "Ondersteuning binnen gekomen",
        },
        build: {
          showOVLoyalty: "Toestemming van dorpen tonen in bouwoverzicht",
          showMissingRes: "Tekort aan middelen achter de kosten rij tonen",
          enhancedOV: "Variaties voor gebouwen overzicht Gebruiken",
          toBuildColor: "Achtergrondkleur uitgebouwde gebouwen",
          toDestroyColor: "Achtergrondkleur voor de af te breken gebouwen",
          queueCostColor: "Achtergrondkleur voor de bouw wachtrij, als extra kosten zullen optreden",
        },
      },
      colorEditTitles:  [ "Procent", "Kleur" ],
      hotKeyLabels: { common: { title: "Algemeen",
                                hks: { place: "naar verzamelplaats", map: "naar kaart", market: "naar marktplaats", nextVillage: "volgend Dorp", prevVillage: "vorig Dorp", lastVillage: "terug naar laatste dorp", close: "Popup sluiten", ok: "OK drukken" }
                              },
                      map: { title: "Kaart",
                                hks: { title0: "Actie bij \"Klik op dorp\" kiezen:", villageinfo: "Dorpsinformatie", sendunits: "Troepen sturen", getunits: "Troepen Aanvragen", market: "Grondstoffen sturen", getress: "Grondstoffen Aanvragen", centermap: "Kaart centreren", removeinfo: "Info verwijderen", selectvillage: "daar selecteert u", togglenofarm: "Farm lijst vergrendeling wijzigen", coordlist: "Coördinatenlijst", 
                                       title1: "Overlay voor eigen dorpen kiezen:", ownNone: "Niets", ownUnits: "Troepen", ownGroups: "Groepen", ownCoords: "Coördinaten", ownName: "Naam", ownPoints: "Punten", ownResource: "Grondstoffen", ownDef: "Stack-wardering", ownAttsNSups: "Aanval en Ondersteuning",
                                       title2: "Overlay voor andere dorpen kiezen:", otherNone: "Niets", otherFarmInfo: "Farminfo", otherPlayer: "Speler", otherCoords: "Coördinaten", otherName: "Naam", otherPoints: "Punten", /*otherMoral: "Moral",*/ otherAlly: "Stam", otherAttsNSups: "Aanval en Ondersteuning",
                                       title3: "Andere", eq: "Succes quotiënt overwegen", addbb2fl: "Barbarendorpen in Farmlijst toevoegen", stats: "Grondstoffen van de laatste x uren tonen" },
                              },
                      place: { title: "Verzamelplaats",
                                hks: { allUnits: "Alle Eenheden invullen", insertUnits: "Benodigde Eenheden invullen", farmList: "Farmlijst openen", getAtts: "Lopende aanvallen inlezen", eq: "Succes quotiënt overwegen", attack: "Aanvallen", support: "Ondersteunen", "unitSelect": "Eenheden selectie te wijzigen", "lastTarget": "Naar laatste aangevallen doelen invoeren", "lastUnits": "Eenheden van de laatste aanval invoegen", enableAttack: "Aanval vrijgeven", fake: "Minimum eenheden voor een fakeAanval invoeren" }
                              },
                      reports: { title: "Berichten",
                                hks: { forward: "Doorsturen", move: "Verschuiven", del: "verwijderen", next: "volgende bericht", prev: "vorige bericht"}
                              },
                      villageinfo: { title: "Dorpsinformatie",
                                     hks: { centermap: "Kaart centreren", sendunits: "Troepen sturen", getunits: "Aanvragen", market: "Grondstoffen sturen", getress: "Aanvragen", reserve: "Dorp claimen", togglefav: "Aan favorieten toevoegen / verwijderen", markonmap: "Op de kaart markeren", removeinfos: "Farmmanager-Info verwijderen", togglenofarm: "Farmlijsten blokeren", reseteq: "EQ resetten", overview: "Dorpoverzicht", modgroups: "Groepen aansluiting bewerken", ap: "Naar Adelsplanner" }  
                                   },
                    },
      reportGroups: {
        attack_luck:      "Geluk",
        attack_moral:     "Moral",
        attack_info_att:  "Aanvaller-Troepen",
        attack_info_def:  "Verdediger-Troepen",
        attack_spy:       "Spionage",
        attack_results:   "Resultaten",
        attack_away_units: "Troepen buiten het dorp",
        attack_running_units: "Troepen onderweg",
      },
      redir_context: "Kontextmenu",
      redir_villageinfo: "Dorpinfo pagina",
      redir_sendunits: "Troepen stuuren",
      redir_getunits: "Troepen aanvragen",
      redir_market: "Grondstoffen sturen",
      redir_centermap: "Kaart centreren",
      redir_removeinfo: "Info verwijderen",
      redir_selectvillage: "Dorp selecteren",
      redir_togglenofarm: "Farm STOP marker weg halen",
      redir_getress: "Grondstoffen aanvragen",
      redir_coordlist: "Coördinatenlijst",
      delinfos: "Farmmanager-Info verwijderen",
      confirm_delinfos: "Deze Farmmanager-Info echt verwijderen?",
      delattmark: "Aanvalmarker verwijderen",
      addfarmlist: "In farmlijst opnemen",
      sum: "Totaal",
      unitsin: "in het dorp",
      unitsout: "elders",
      buildings: "Gebouwen",
      load: "Nominale draagcapaciteit",
      insertunits: "Troepen invullen",
      farmlist: "",//Onbruikbaar gemaakt door dat deze functie FA dingen kan doen(ook een stukje code er uitgehaald zodat deze niet simpel weer aan kan gesproken worden)
      delfromfarmlist: "Block voor farmlijst",
      resources: "Grondstoffen",
      spy: "Spionage",
      current: "huidige",
      atArrival: "Bij aankomst",
      coords: "x|y",
      dist: "Afstand",
      redirTitle: "Klik op dorp",
      statsTitle: ["GS van de laatste ", " Uur"],
      addbb2fl: "BB-Dorpen in farmlijst voegen",
      reports: "Berichten",
      close: "Sluiten",
      infoTitle: "DS-Farmmanager-Info",
      noInfos: "Geen info beschikbaar",
      mining: "Vordering/opslagplaats",
      loyalty: "Toestemming",
      confirm_delinfosxy: ["Data van Dorp "," verwijderen?"],
      catas: "Katas",
      level: "Level",
      age: "Tijd geleden",
      days: ["Dag", "Dagen"],
      hours: "h",
      minutes: "min",
      stateTitle: "Farmmanager Info",
      ownVillage: "Eigendorp",
      lostVillage: "Verloren Dorp",
      oldReport: "Dit bericht is veroudert",
      reportRead: "Bericht ingelezen",
      reportKnown: "Inlezen...",
      confirm_delAll: "Werkelijk alle gegevens verwijderen van de huidige wereld?",
      allDataDeleted: "Alle gegevens worden verwijderd van de huidige wereld!",
      useHotKeys: "Hotkeys aktivieren",
      overlayTitle: "Overlays bij Farminfo",
      popupTitle: "Dorp-Popup",
      hotkeySettings: "Hotkeys",
      savebutton: "Opslaan",
      importbutton: "Data Importeren",
      exportbutton: "Data exporteren",
      deletebutton: "Data verwijderen",
      startimport: "Importeren",
      importTitle: "Import",
      exportTitle: "Export",
      exportGroups: { title: "Welke Data exporteren?", 
                      serverCfg: "Server Configuratie", 
                      settings: "Instellingen", 
                      farmUnits: "Eenheidconfiguratie", 
                      colors: "Kleuren", 
                      hotkeys: "Hotkeys", 
                      userGroups: "Groepen", 
                      variants: "uitbouw varianten",
                      ownVillage: "Data eigen dorpen", 
                      farminfos: "Farminfo" ,
                      churches: "Gesimuleerde kerken"
                    },
      importDone: "De data id ge importerd",
      unknowVersion: "Onbekende Versie",
      wrongFormat: "Verkeerd Format",
      settingsSaved: "TW-assistent, Instellingen zijn opgeslagen!",
      farmUnitsConfig: "Eenheden",
      priority: "Prioriteit",
      groupName: "Groepnaam",
      higherPrio: "Hoge Prioriteit",
      lowerPrio: "Minder hoge Prioriteit",
      enableAttack: "Aanval vrijgeven",
      attackAgain: "Nog een keer aanvallen",
      quotient: "moraal ratio",
      usequotient: "Succes quotiënt overwegen",
      incompleteExp: "De gegevens lijken niet geheel juist te zijn (Afloop identificatie ontbreekt)!",
      reportStates: ["Bericht bekend", "Bericht verouderd", "Bericht onbekend" ],
      loadServerCfg: "Server Configuratie wordt geladen...",
      serverCfgKnown: "Server Configuratie geladen!",
      loadServerCfg: "Server Configuratie wordt geladen...",
      serverCfgKnown: "Server Configuratie geladen!",
      loadUnitInfo: "Eeheden worden geladen...",
      unitInfoKnown: "Eeheden geladen!",
      error: "Error",
      ok: "Ok",
      fl_sum: "&totaal;",
      fl_eq: "EQ",
      ok_btn: "Ok",
      cancel_btn: "Afbreken",
      all: "Alle",
      unsupportedVersion: "De data formaat van deze versie wordt niet ondersteund",
      unknownBaseConfig: "onbekend configuratie!",
      getatts: "Lopende Aanvallen inlezen",
      attsparsed: "Lopende Aanvalen zijn ingelezen",
      unitGroups: "Eenheden groepen",
      delGroup: "Groep verwijderen",
      newGroup: "Nieuwe groep",
      minUnits: "Minimum aantal eenheden",
      stayOrderTitle: "Prioriteit eenheden / Eenheden die in het dorp kunnen ",
      stayUnits: "laten staan",
      unit: "Eenheid",
      unitSelect: ["Troepen invullen","Automatisch","Zelf invullen"],
      wrongworld: "Deze Data is voor een andere Server",
      attackOwnVillage: "Werkelijk de aanval op eigen dorp vrijgeven?",
      unitStates: ["Geen eenheden beschikbaar", "Eenheden worden benut", "Te wijnig eenheden beschikbaar", "De troepen zijn te lang onderweg", "Eenheid zit niet in actuele groep", "Eenheid is niet vereist"],
      maxTime: "Max. Looptijd",
      unitColor: "Kleur",
      unitMax: "100%",
      keys: [], // Key-Texte s.u.
      ovlSelect: "(niets)",
      ovlGroups: "Groepen",
      ovlPoints: "Punten",
      ovlName: "Naam",
      ovlResource: "Grondstoffen",
      ovlUnits: "Troepen",
      ovlCoords: "Coördinaten",
      ovlAlly: "Stam",
      ovlFarmInfo: "Farminfo",
      ovlPlayer: "Speler",
//      ovlMoral: "Moral",
      ovlDef: "Stack-beoordeling",
      ovlAttsNSups: "Aanvallen/Ondersteuningen",
      otherVillage: "Andere dorpen",
      unitsHome: "eigen",
      unitsThere: "in Dorp",
      unitsAway: "buiten",
      unitsMoving: "onderweg",
      delHokey: "Hotkey verwijderen",
      ownUnits: "Aanvaller:",
      lastOwnAttackPage: "Oudere onbekende aanval op een aparte pagina:",
      bbcode: "BB-Code",
      note: "Notitie",
      remove: "Verwijderen",
      edit: "bewerken",
      insert: "Invullen",
      fgCol: "Textkleur",
      bgCol: "Achtergrond kleur:",
      icon: "Symbol",
      confirm_delNote: "Notitie verwijderen?",
      recruitment: "Rekrutering",
      overview: "Dorp Overzicht",
      saveOrderLink: "Sortering opslaan/ links boven(kaart) x voor opheffen",
      gotoFirstGroupVillage: "Naar eerste dorp in groep",
      resetVillageOrder: "Standaard volgorde herstellen",
      destVillage: "Doeldorp",
      freeRes: "Vrij",
      arrival: "Aankomst:",
      startTime: "Starttijd",
      runtime: "Looptijd",
      runtimes: "Looptijden",
      capture: "Buit",
      nightbonus: "(Nachtbonus aktief)",
      returnTitle: "terugkeer:",
      returnAtCancel: "terugkeer bij af breken",
      lastTarget: "Vorige doel",
      lastUnits: "Vorige eenheden",
      of: "van",
      promptPercent: "Percentage",
      survivors: "Overlevende",
      lostCost: "verlorenkosten",
      bpTitle: ["ODA aanvaller","ODD verdediger"],
      order: "Volgorde",
      allys: "Stammen",
      player: "Speler",
      name: "Naam",
      villages: "Dorpen",
      points: "Punten",
      cancelDrill: "Annuleer training",
      restore: "Herstellen",
      minimize: "Minimaliseren",
      showRow: "regel tonen",
      showOwnGroups: " Eigen groepen tonen",
      moveOwnUnits: "Eigen Troepen bewegingen",
      unitGroup: "Groep",
      cataTarget: "Kata doel",
      valueError: "Onjuiste waarde, met de standaardinstellingen",
      cancel: "Afbreken",
      loadBuildingInfo: "Gebouwen worden geladen...",
      buildingInfoKnown: "Gebouwen geladen",
      setGroups: "Groep instellen",
      allGroups: "alle",
      selectGroup: "Groep kiezen",
      offersVil: [" Aangeboden uit ", " Dorpen"],
      unitsTitle: "daar/Huidige/totaal",
      
      selectVariantOption: "(Keuzes)",
      needs: "Behoefte",
      buildOption: "Bouwopties",
      buildingCompleted: "Gebouw uitgebouwd naar target level",
      buildingMaxLevel: "Gebouw volledig uitgebouwd",
      destroyLevel: "Afbraak van één level",
      buildingOverbuild: "Gebouw is tever uitgebouwd",
      resTitle: [ "Hout", "Leem", "IJzer", "Bevolking" ],
      buildingLevelUp: "Uitbouwen tot level ",
      buildUp: "Bouwen",
      building: "Gebouw",
      level: "Level",
      points: "Punten",
      population: "Boerderij plaatsen",
      targetPoints: "Gewenste punten aantal",
      resAvailable: "Grondstoffen voldoende beschikbaar",
      resAvailableAt: "Grondstoffen beschikbaar ",
      farmToSmall: "De boerderij is te klein",
      storageToSmall: "De opslagplaats is te klein",
      knockDown: "Afbreken loopt",
      buildingUp: "uitbouwen loopt",
      buildTime: "Bouwtijd (hh:mm:ss)",
      required: "Benodigd:",
      hideCompletedBuildings: "Volledig uitgebouwde gebouwen verbergen",
      noDestroy: "Het gebouw kan niet verder worden afgebroken",
      destroyQueueFull: "De afbraak lijst is vol",
      confirmQueue: "Bouw lijst is vol, de volgenden kosten extra. Door bouwen?",
      variantName: "Naam",
      edit: "bewerken",
      delVariant: "Variatie verwijderen",
      addVariant: "Variatie toevoegen",
      confirmDeleteVariant: "Variatie verwijderen ?",
      missingRes: "Totaal van de GS die te kort is voor de volgend bouwopdracht",
      buildQueueTitle: "Bouwopdrachten",
      destroy: "Afbreken:",
      queueCost: "Extra kosten",
      workers: "arbeiders",
      enterInRange: ["Graag een waarde van ", " tot ", " invullen!"],
      enterName: "Een naam geven!",
      nameExists: "Naam bestaat al!!",
      recruDone: "Troepen aantallen bereikt",
      keep_pop: "Vrij",
      maxPop: "De boerderij is te klein",
      fillIn: "Invullen",
      recruit: "Rekrutieren",
      confirmAssignUnitVariant: "Deze troepen configuratie voor alle dorpen vast legen in deze groep?",
      confirmAssignBuildVariant: "Deze gebouwen configuratie voor alle dorpen vast legen in deze groep??",
      colFloating: "Kleurverloop tussen niveaus",
      slOn: "Snellijst tonen",
      slOff: "Snellijst verbergen",
      slTitle: "SL ",
      donate: "",
      timespan: ["Aankomsttijd:", "Dag: ", " Maand: ", " van: ", " tot: ", " uur looptijd: "],
      unitFilter: "Troepenfilter:",
      filterBtn: "Filteren",
      topo: "Minimap-tonen/verbergen",
      optionsSuffix: " - Functie",
      simChurches: " Kerk simulator",
      churches: ["Kerk", "Eerste kerk", "Kerk 1", "Kerk 2", "Kerk 3"],
      color: "Kleur",
      errorCoords: "Verkeerde Coördinaten",
      village: "Dorp",
      support_detail: "Ondersteuning van:",
      away_detail: "Ondersteuning bij:",
      all_detail: "Alle",
      muster: "Aankomst",
      noMusterTime: "Eerst de aankomst tijd invullen! Format: (TT.MM. hh:mm)",
      reset: "reset",
      fake: "Fake",
      groupTitle: ["Kaart", "volgorde", "Afbeelding", "Naam", "Kleur", "Symbool", "TOP aan lijst", "Verwijderen"],
      doesntExist: "(niet beschikbaar)",
      requires: "Vereist: ",
      publicName: "Publieke naam",
      privateName: "Privé Naam",
      showAllBuildings: "Alle gebouwen tonen",
      hideCompletedBuildings: "Volledig uitgebouwde gebouwen uitschakelen",
      lastAtt: "Laatste",
      forumThread: "////", //link maken voor forum TW
      forumWiki: "https://web.archive.org/web/20170408204311/https://forum.tribalwars.nl/showthread.php?154445-8-8-GM-TW-assistent3",
      forumDonate: "https://web.archive.org/web/20170408204311/https://www.paypal.com/", 
      forumLinkToDSAssistent: "////", 
    },
    regex: {
      reportTitle: /<[Hh]3>De aanvaller|De verdediger|heeft gewonnen<\/[Hh]3>/,
      reportSupport: /Je ondersteuning/,
      villageLink: /\((\d{1,3})\|(\d{1,3})\) C(\d+)\s*$/, 
      sendDate: /Verzonden<\/td><td>([^<]+)<\/td>/,
      loyaltyChange: /Gedaald van <[Bb]>\d+<\/[Bb]> naar <[Bb]>(-?\d+)/,
      attack: /Aanval/,
      spy: /Spionage/,
      spyres: /Ontdekte grondstoffen/,
      building: /Gebouwen/,
      buildinglevel: /\s*([^\)]*)\(level (\d+)/,
      defunits: /Eenheden buiten het dorp:/,
      beute: /Buit:/,
      settings: /Instellingen/,
      damage: /[^>]+>(.+) beschadigd van level <[Bb]>\d+<\/[Bb]> naar level <[Bb]>(\d+)/,
      arrivalTitle: /Aankomst/,
      durationTitle: /Duur:/,
      completion: /Voltooiing/,
      queueCost: /Kosten wachtrij/,
      resAvailable: /Ontdekte grondstoffen/,
      buildDestroy: /([^\(]+)\(level ([^\)]+|afbreken)\)/,
      reserved: /let op!+Geclaimd!/,
      loyalty: /Toestemming:/,
      visit: /<h3>bezoekt<\/h3>/i,
      commands: {
        attacked: /Aanvaller (.*) \((\d{1,3})\|(\d{1,3})\) C(\d{1,2}) an\s*$/,
        conquer: /verovert (.*) \((\d{1,3})\|(\d{1,3})\) C(\d{1,2})\s*$/,
        attack: /Aanval uit (.*) \((\d{1,3})\|(\d{1,3})\) C(\d{1,2})\s*$/,
        comeback: /Terugkeer van (.*) \((\d{1,3})\|(\d{1,3})\) C(\d{1,2})\s*$/, 
        abort: /Afgebroken bevel naar (.*) \((\d{1,3})\|(\d{1,3})\) C(\d{1,2})\s*$/,
        support: /Ondersteuning voor (.*) \((\d{1,3})\|(\d{1,3})\) C(\d{1,2})\s*$/,
        callback: /Terugkeer van (.*) \((\d{1,3})\|(\d{1,3})\) C(\d{1,2})\s*$/,
        sentback: /Terug gestuurd uit (.*) \((\d{1,3})\|(\d{1,3})\) C(\d{1,2})\s*$/,
      },
    },
    locale: {
      nrgroupsign: ".",
      timeStr2Sec: function(str) {
        var res = str.match(/(op (\d{2})\.(\d{2})\.(\d{2})?|morgen|vandaag) om (\d{2}):(\d{2}):?(\d{2})?:?(\d{3})?/);
        if( !res )
          res = str.match(/((\d{2})\.(\d{2})\.(\d{2})?) (\d{2}):(\d{2}):?(\d{2})?:?(\d{3})?/);
        sec = 0;
        if( res ) {
          if( isNaN(res[7]) )
            res[7] = 0;
          if( typeof( res[3] ) == "undefined" ) {
            var today = lib.serverTime.getTime() / 1000;
            today = today - today % 86400;
            sec = today + res[5] * 3600 + res[6] * 60 + parseInt(res[7],10);
            if( res[1] == "morgen" )
              sec += 86400;
          }
          else {
            res[3] = parseInt(res[3],10);
            res[4] = parseInt(res[4],10);
            res[5] = parseInt(res[5],10);
            res[6] = parseInt(res[6],10);
            res[7] = parseInt(res[7],10);
            if( isNaN(res[4]) )
              res[4] = lib.serverTime.getUTCFullYear();
            if( res[4] < 100 )
              res[4] += 2000;
            var dt = new Date();
            dt.setUTCFullYear(res[4]);
            dt.setUTCMonth(res[3]-1);
            dt.setUTCDate(res[2]);
            dt.setUTCHours(res[5]);
            dt.setUTCMinutes(res[6]);
            dt.setUTCSeconds(res[7]);
            sec = dt.getTime() / 1000;
          }
        }
        return sec;
      },
      date2timeStr : function(date,small,secs) {
        var ret;
        if( small === true ) {
          ret = lib.padLeft(date.getUTCDate(),"0",2) + "." + lib.padLeft(date.getUTCMonth()+1,"0",2)+". " + lib.padLeft(date.getUTCHours(),0,2) + ":" + lib.padLeft(date.getUTCMinutes(),0,2);
          if( secs == true )
            ret += ":" + lib.padLeft(date.getUTCSeconds(),0,2)
        }
        else {
          var today = new Date(lib.getTime() * 1000);
          var tomorrow = new Date(today.getTime() + 86400000);
          var v;
          if( date.getUTCDate() == today.getUTCDate() && date.getUTCMonth() == today.getUTCMonth() )
            ret = "vandaag";
          else if( date.getUTCDate() == tomorrow.getUTCDate() && date.getUTCMonth() == tomorrow.getUTCMonth() )
            ret = "morgen";
          else {
            v = date.getUTCDate();
            ret = "op " + (v < 10 ? "0"+v : v);
            v = date.getUTCMonth()+1;
            ret += "." + (v < 10 ? "0"+v : v);
            ret += "."; // + showTime.getFullYear();
          }
          v = date.getUTCHours();
          ret += " om " + (v < 10 ? "0"+v : v);
          v = date.getUTCMinutes();
          ret += ":" + (v < 10 ? "0"+v : v);
          v = date.getUTCSeconds();
          ret += ":" + (v < 10 ? "0"+v : v);
          ret += " uur";
        }
        return ret;
      },
      formatDuration : function(time,showdays) {
        if( isNaN(time))
          time = 0;
        var days = 0;
        var hours = Math.floor(time / 3600);
        if( showdays && hours > 23 ) {
          days = parseInt(hours / 24,10);
          hours = hours % 24;
          time -= days * 86400;
        }
        var minutes = Math.floor(time/60) - (hours * 60);
        var seconds = Math.round(time  % 60,0);
        var ret = ""
        if( days || hours || minutes || seconds ) {
          if( days > 0 ) {
            ret = days + " ";
            if( days == 1 )
              ret += "Dag ";
            else
              ret += "Dagen ";
          }
          ret += hours + ':' + (minutes < 10 ? '0'+minutes : minutes) + ':' + (seconds < 10 ? '0'+seconds : seconds);
        }
        else
          ret = "---";
        return ret;
      },
      parseDuration : function(str) {
        var s = 0;
        var res = str.match(/((\d+)[^\d]+)?(\d+):(\d+):(\d+)/);
        if( res ) {
          s = res[2] * 86400;
          if( isNaN(s) )
            s = 0;
          s += parseInt(res[3],10)*3600+parseInt(res[4],10)*60+parseInt(res[5],10);
        }
        return s;
      },
    }
  },
  nl: {
    unit: {
      spear: "Speervechter",
      sword: "Zwaardvechter",
      axe: "Bijlstrijder",
      archer: "Boogschutter",
      spy: "Verkenner",
      light: "Lichte cavalerie",
      marcher: "Bereden boogschutter",
      heavy: "Zware cavalerie",
      ram: "Ram",
      catapult: "Katapult",
      knight: "Ridder",
      snob: "Edelman"
    },
    units: {
      spear: "Speervechters",
      sword: "Zwaardvechters",
      axe: "Bijlstrijders",
      archer: "Boogschutters",
      spy: "Verkenners",
      light: "Lichte cavalerie",
      marcher: "Bereden boogschutters",
      heavy: "Zware cavalerie",
      ram: "Rammen",
      catapult: "Katapulten",
      knight: "Ridder",
      snob: "Edelmannen"
    },
    buildings: {
      main: "Hoofdgebouw",
      barracks: "Kazerne",
      stable: "Stal",
      garage: "Werkplaats",
      church: "Kerk",
      church_f: "Eerste kerk",
      snob: "Adelshoeve",
      smith: "Smederij",
      place: "Verzamelplaats",
      statue: "Standbeeld",
      market: "Marktplaats",
      wood: "Houthakkers",
      stone: "Leemgroeve",
      iron: "IJzermijn",
      farm: "Boerderij",
      storage: "Opslagplaats",
      hide: "Schuilplaats",
      wall: "Muur"
    },
    resources: {
      wood: "Hout",
      stone: "Leem",
      iron: "IJzer"
    },
    gui: {},
    regex: {
      reportTitle: /<h3>De aanvaller|De verdediger |heeft gewonnen<\/h3>/,
      villageLink: /\((\d{1,3})\|(\d{1,3})\) C(\d+)\s*$/, 
      loyaltyChange: /Gedaald van <b>\d+<\/b> naar <b>(-?\d+)/,
      sendDate: /Verzonden<\/td><td>([^<]+)<\/td>/,
      attack: /Aanval/,
      spy: /Spionage/,
      spyres: /Ontdekte grondstoffen/,
      building: /Gebouwen/,
      buildinglevel: /\s*([^\)]*)\(Level (\d+)/,
      defunits: /Troepen van de verdediger/,
      beute: /Buiti:/,
      settings: /Instellingen/,
      damage: /[^>]+>(.+) beschadigd van level  <[Bb]>\d+<\/[Bb]> naar Level <[Bb]>(\d+)/,
      arrivalTitle: /Aankomst/,
      durationTitle: /Duur:/,
      completion: /Voltooiing/,
      queueCost: /Kosten wachtrij/,
      resAvailable: /Grondstoffen beschikbaar/,
      buildDestroy: /([^\(]+)\(Level ([^\)]+|afbreken)\)/,
      reserved: /Let op.+reserviert!$/,
      loyalty: /Toestemming:/,
      visit: /<h3>Bezoekt<\/h3>/i,
      commands: {
        attacked: /val (.*) \((\d{1,3})\|(\d{1,3})\) C(\d{1,2}) a\s*$/,
        conquer: /overt (.*) \((\d{1,3})\|(\d{1,3})\) C(\d{1,2})\s*$/,
        attack: /Aanval op (.*) \((\d{1,3})\|(\d{1,3})\) C(\d{1,2})\s*$/,
        comeback: /Terugkeer van (.*) \((\d{1,3})\|(\d{1,3})\) C(\d{1,2})\s*$/, 
        abort: /Afgebroken bevel naar (.*) \((\d{1,3})\|(\d{1,3})\) C(\d{1,2})\s*$/,
        support: /Ondersteuning voor (.*) \((\d{1,3})\|(\d{1,3})\) C(\d{1,2})\s*$/,
        callback: /Terugkeer van (.*) \((\d{1,3})\|(\d{1,3})\) C(\d{1,2})\s*$/,
        sentback: /Teruggestuurd door (.*) \((\d{1,3})\|(\d{1,3})\) C(\d{1,2})\s*$/,
      },
    },
    locale: {
      nrgroupsign: ".",
      timeStr2Sec: function(str) {
        var res = str.match(/(op (\d{2})\.(\d{2})\.(\d{2})?|morgen|vandaag) om (\d{2}):(\d{2}):?(\d{2})?:?(\d{3})?/);
        if( !res )
          res = str.match(/((\d{2})\.(\d{2})\.(\d{2})?) (\d{2}):(\d{2}):?(\d{2})?:?(\d{3})?/);
        sec = 0;
        if( res ) {
          if( isNaN(res[7]) )
            res[7] = 0;
          if( typeof( res[3] ) == "undefined" ) {
            var today = lib.serverTime.getTime() / 1000;
            today = today - today % 86400;
            sec = today + res[5] * 3600 + res[6] * 60 + parseInt(res[7],10);
            if( res[1] == "morgen" )
              sec += 86400;
          }
          else {
            res[3] = parseInt(res[3],10);
            res[4] = parseInt(res[4],10);
            res[5] = parseInt(res[5],10);
            res[6] = parseInt(res[6],10);
            res[7] = parseInt(res[7],10);
            if( isNaN(res[4]) )
              res[4] = lib.serverTime.getUTCFullYear();
            if( res[4] < 100 )
              res[4] += 2000;
            var dt = new Date();
            dt.setUTCFullYear(res[4]);
            dt.setUTCMonth(res[3]-1);
            dt.setUTCDate(res[2]);
            dt.setUTCHours(res[5]);
            dt.setUTCMinutes(res[6]);
            dt.setUTCSeconds(res[7]);
            sec = dt.getTime() / 1000;
          }
        }
        return sec;
      },
      date2timeStr : function(date,small,secs) {
        var ret;
        if( small === true ) {
          ret = lib.padLeft(date.getDate(),"0",2) + "." + lib.padLeft(date.getMonth()+1,"0",2)+". " + lib.padLeft(date.getHours(),0,2) + ":" + lib.padLeft(date.getMinutes(),0,2);
          if( secs )
            ret += ":" + lib.padLeft(date.getUTCSeconds(),0,2)
        }
        else {
          var today = new Date(lib.getTime()* 1000);
          var tomorrow = new Date(today.getTime() + 86400000);
          var v;
          if( date.getDate() == today.getDate() && date.getMonth() == today.getMonth() )
            ret = "vandaag";
          else if( date.getDate() == tomorrow.getDate() && date.getMonth() == tomorrow.getMonth() )
            ret = "morgen";
          else {
            v = date.getDate();
            ret = "op " + (v < 10 ? "0"+v : v);
            v = date.getMonth()+1;
            ret += "." + (v < 10 ? "0"+v : v);
            ret += "."; // + showTime.getFullYear();
          }
          v = date.getHours();
          ret += " om " + (v < 10 ? "0"+v : v);
          v = date.getMinutes();
          ret += ":" + (v < 10 ? "0"+v : v);
          v = date.getSeconds();
          ret += ":" + (v < 10 ? "0"+v : v);
          ret += " uur";
        }
        return ret;
      },
      formatDuration : function(time,showdays) {
        if( isNaN(time))
          time = 0;
        var days = 0;
        var hours = Math.floor(time / 3600);
        if( showdays && hours > 23 ) {
          days = parseInt(hours / 24,10);
          hours = hours % 24;
          time -= days * 86400;
        }
        var minutes = Math.floor(time/60) - (hours * 60);
        var seconds = Math.round(time  % 60,0);
        var ret = ""
        if( days || hours || minutes || seconds ) {
          if( days > 0 ) {
            ret = days + " ";
            if( days == 1 )
              ret += "Dag ";
            else
              ret += "Dagen ";
          }
          ret += hours + ':' + (minutes < 10 ? '0'+minutes : minutes) + ':' + (seconds < 10 ? '0'+seconds : seconds);
        }
        else
          ret = "---";
        return ret;
      },
      parseDuration : function(str) {
        var s = 0;
        var res = str.match(/((\d+)[^\d]+)?(\d+):(\d+):(\d+)/);
        if( res ) {
          s = res[2] * 86400;
          if( isNaN(s) )
            s = 0;
          s += parseInt(res[3],10)*3600+parseInt(res[4],10)*60+parseInt(res[5],10);
        }
        return s;
      },
    }
  },
};
{ // Key-Text
texts.de.gui.keys[8] = "?"; // &lArr; (Backspace)
texts.de.gui.keys[9] = "?"; // &hArr; (Tab)
texts.de.gui.keys[13] = "?"; // &crarr; Enter
texts.de.gui.keys[16] = "?"; // &uArr;(Shift)
texts.de.gui.keys[17] = "Strg";
texts.de.gui.keys[18] = "Alt";
texts.de.gui.keys[19] = "Pause";
texts.de.gui.keys[27] = "Esc";
texts.de.gui.keys[32] = "Spatiebalk";
texts.de.gui.keys[33] = "Bild ?"; // &uarr;
texts.de.gui.keys[34] = "Bild ?"; // &darr;
texts.de.gui.keys[35] = "Ende";
texts.de.gui.keys[36] = "Pos1";
texts.de.gui.keys[37] = "?"; // &larr;
texts.de.gui.keys[38] = "?"; // &uarr;
texts.de.gui.keys[39] = "?"; // &rarr;
texts.de.gui.keys[40] = "?"; // &darr;
texts.de.gui.keys[45] = "Einfg";
texts.de.gui.keys[46] = "Entf";
texts.de.gui.keys[96] = "Num 0";
texts.de.gui.keys[97] = "Num 1";
texts.de.gui.keys[98] = "Num 2";
texts.de.gui.keys[99] = "Num 3";
texts.de.gui.keys[100] = "Num 4";
texts.de.gui.keys[101] = "Num 5";
texts.de.gui.keys[102] = "Num 6";
texts.de.gui.keys[103] = "Num 7";
texts.de.gui.keys[104] = "Num 8";
texts.de.gui.keys[105] = "Num 9";
texts.de.gui.keys[110] = "Num ,";
texts.de.gui.keys[112] = "F1";
texts.de.gui.keys[113] = "F2";
texts.de.gui.keys[114] = "F3";
texts.de.gui.keys[115] = "F4";
texts.de.gui.keys[116] = "F5";
texts.de.gui.keys[117] = "F6";
texts.de.gui.keys[118] = "F7";
texts.de.gui.keys[119] = "F8";
texts.de.gui.keys[120] = "F9";
texts.de.gui.keys[121] = "F10";
texts.de.gui.keys[122] = "F11";
texts.de.gui.keys[123] = "F12";
texts.de.gui.keys[145] = "Rollen";
}
texts.nl.gui = texts.de.gui;

var lib = new HypixDSLib("hpxdsfm",true,false);

if( lib.game_data ) {
  var res = lib.game_data.version.match(/\d+ (\d+)\.(\d+)/);
  if( res && res[1] < 7) 
    return;
};
if( typeof(texts[lib.lang]) == "undefined" ) {
  alert( "TW-assistent:\nLanguage not supported!" );
  return;
};
if( !lib.hasPA ) {
  return;
};

var boni = { "none": 0, "wood": 1, "stone": 2, "iron": 3, "farm": 4, "barracks": 5, "stable": 6, "garage": 7, "all": 8, "storage": 9 };
var colBgColor = ['rgb(248, 244, 232)', 'rgb(222, 211, 185)' ];

Array.prototype.indexOf = function(val) {
	for(var i=0; i<this.length; i++){
		if(this[i] === val)
			return i;
	}
	return -1;
};
function removeNearest(arr, val) {
  var minDif = val;
  var idx = -1;
  for( var i = 0; i < arr.length; i++ ) {
    var dif = val-arr[i];
    if( dif >= 0 && dif < minDif ) {
      minDif = dif;
      idx = i;
    }
  }
  var ret;
  if( idx > -1 ) {
    ret = arr[idx];
    arr.splice(idx,1);
  }
  return ret;
};

var cmds = {};
var isUV = !isNaN(parseInt(lib.params.t,10));
var curTime = lib.getTime();
var Village = function(coords) {
  this.load = function() {
    var vKey = this.coords.x + "_" + this.coords.y;
    var data = otherVillages[vKey];
    if( !data )
      data = "NaN,;100;0,0;0,0,100;0,0,0,0,0;0,0,;0,0,;0,0,";
    this.fromString(data);
    return this;
  };
  this.fromString = function(str) {
    var ts = lib.getTime();
    var minTS = ts - Settings.settings.misc.reportMaxAge * 86400;
    var data = str.split(";");
    var parts = data[0].split(",");
    this.bonus = parseInt(parts[0],10);
    this.color = parts[1];
    this.eq = parseInt(data[1],10);
    if( this.eq > 100 )
      this.eq = 100;
    parts = data[2].split(",");
    this.lastreport.rid = parseInt(parts[0],10);
    this.lastreport.timestamp = parseInt(parts[1],10);
    parts = data[3].split(",");
    this.loyalty.rid = parseInt(parts[0],10);
    this.loyalty.timestamp = parseInt(parts[1],10);
    this.loyalty.value = parseInt(parts[2],10);
    parts = data[4].split(",");
    this.res.rid = parseInt(parts[0],10);
    var ts = parseInt(parts[1],10);
    this.res.timestamp = ts < minTS ? 0 : ts;
    this.res.wood = parseInt(parts[2],10);
    this.res.stone = parseInt(parts[3],10);
    this.res.iron = parseInt(parts[4],10);
    parts = data[5].split(",");
    this.buildings.rid = parseInt(parts[0],10);
    ts = parseInt(parts[1],10);
    this.buildings.timestamp = ts < minTS ? 0 : ts;
    var i = 0;
    for( var key in serverInfo.buildingInfo ) {
      var level = parseInt(parts[i*2+2],10);
      this.buildings[key] = { level: isNaN(level) ? 0 : level, change: parseInt(parts[i*2+3],10) };
      i++;
    }
    parts = data[6].split(",");
    this.unitsin.rid = parseInt(parts[0],10);
    ts = parseInt(parts[1],10);
    this.unitsin.timestamp = ts < minTS ? 0 : ts;
    i = 2;
    for( var key in serverInfo.unitInfo ) {
      var val = parseInt(parts[i++]);
      this.unitsin[key] = isNaN(val) ? 0 : val;
      if( this.unitsin[key] > 0 )
        this.unitsin.hasUnits = this.unitsin.timestamp > 0;
    }
    parts = data[7].split(",");
    this.unitsout.rid = parseInt(parts[0],10);
    ts = parseInt(parts[1],10);
    this.unitsout.timestamp = ts < minTS ? 0 : ts;
    i = 2;
    for( var key in serverInfo.unitInfo ) {
      var val = parseInt(parts[i++]);
      this.unitsout[key] = isNaN(val) ? 0 : val;
      if( this.unitsout[key] > 0 )
        this.unitsout.hasUnits = this.unitsout.timestamp > 0;
    }
    if( this.res.timestamp == 0 && this.buildings.timestamp == 0 && this.unitsin.timestamp == 0 && this.unitsout.timestamp == 0 ) {
      delete otherVillages[this.coords.x + "_" + this.coords.y];
      lib.storage.setValue("otherVillages",otherVillages);
    }
    return this;
  };

  this.toString = function(str) {
    if( this.eq > 100 )
      this.eq = 100;
    var str = this.bonus+","+this.color+";"+this.eq+";"+this.lastreport.rid+","+this.lastreport.timestamp+";";
    str += this.loyalty.rid + "," + this.loyalty.timestamp + ","  + this.loyalty.value + ";";
    str += this.res.rid + "," + this.res.timestamp + ",";
    str += this.res.wood + ",";
    str += this.res.stone + ",";
    str += this.res.iron + ";";
    str += this.buildings.rid + "," + this.buildings.timestamp + ",";
    if( this.buildings.timestamp > 0 ) {
      var i = 0;
      for( var key in serverInfo.buildingInfo ) {
        if( i > 0 )
          str += ",";
        str += this.buildings[key].level + "," + this.buildings[key].change;
        i++;
      }
    }
    str += ";";
    str += this.unitsin.rid + "," + this.unitsin.timestamp + ",";
    if( this.unitsin.timestamp > 0 ) {
      var units = "";
      for( var key in serverInfo.unitInfo )
        units += "," + this.unitsin[key];
      str += units.substring(1);
    }
    str += ";";
    str += this.unitsout.rid + "," + this.unitsout.timestamp + ",";
    if( this.unitsout.timestamp > 0 ) {
      var units = "";
      for( var key in serverInfo.unitInfo )
        units += "," + this.unitsout[key];
      str += units.substring(1);
    }
    return str;
  };

  this.save = function() {
    otherVillages[this.coords.x+"_"+this.coords.y] = this.toString();
    lib.storage.setValue("otherVillages",otherVillages);
    return this;
  };

  this.merge = function(vil) {
    if( this.lastreport.timestamp < vil.lastreport.timestamp ) {
      this.bonus = vil.bonus;
      this.color = vil.color;
      this.lastreport = vil.lastreport;
      this.eq = vil.eq;
    }
    if( this.loyalty.timestamp < vil.loyalty.timestamp )
      this.loyalty = vil.loyalty;
    if( this.res.timestamp < vil.res.timestamp )
      this.res = vil.res;
    if( this.buildings.timestamp < vil.buildings.timestamp )
      this.buildings = vil.buildings;
    if( this.unitsin.timestamp < vil.unitsin.timestamp )
      this.unitsin = vil.unitsin;
    if( this.unitsout.timestamp < vil.unitsout.timestamp )
      this.unitsout = vil.unitsout;
    return this;
  };

  this.updateMapData = function(bonus,color) {
    var modified = false;
    if( this.bonus != bonus ) {
      this.bonus = bonus;
      modified = true;
    }
    if( color == "" )
      color = "rgb(150,150,150)";
    if( this.color != color ) {
      this.color = color;
      modified = true;
    }
    if( this.lastreport.timestamp > 0 && modified )
      this.save();
    return this;
  }

  var value;
  if( typeof(coords) == "string" ) {
    coords = coords.split("_");
    x = parseInt(coords[0],10);
    if( coords.length == 1 ) {
      if( arguments.length > 1 ) {
        y = parseInt(arguments[1],10);
        if( arguments.length == 3 )
          value = arguments[2];
      }
      else
        throw("Village: Invalid Coordinates");
    }
    else {
      y = parseInt(coords[1],10);
      if( arguments.length == 2 )
        value = arguments[1];
    }
  }
  else {
    x = parseInt(coords,10);
    y = parseInt(arguments[1],10);
    if( arguments.length == 3 )
      value = arguments[2];
  }
  if( isNaN(x) || isNaN(y) )
    throw("Village: Invalid Coordinates");

  this.coords = { x: x, y: y };
  this.bonus = Number.NaN;
  this.color = "";
  this.eq = 100;
  this.lastreport = {rid : 0, timestamp: 0};
  this.loyalty = { rid: 0, timestamp: 0, value: 100 };
  this.res = { rid: 0, timestamp: 0 };
  this.buildings = { rid: 0, timestamp: 0 };
  this.unitsin = { rid: 0, timestamp: 0, hasUnits: false };
  this.unitsout = { rid: 0, timestamp: 0, hasUnits: false };
  if( value )
    this.fromString(value);
  else
    this.load();
}
var MyVillage = function(id,value) {
  this.load = function() {
    var data = myVillages["vil"+this.id];
    if( !data )
      data = "0;0,NaN,NaN,NaN,NaN,NaN,NaN;0,NaN,NaN;0|;NaN,NaN";
    this.fromString(data);
    return this;
  }
  this.save = function() {
    var str = this.toString();
    myVillages["vil"+this.id] = this.toString();
    lib.storage.setValue("myVillages"+ownPid,myVillages);
    return this;
  }
  this.fromString = function(str) {
    var ts = lib.getTime();
    var minTS = ts - 864000; // max. 10 dagen oud
    
    var data = str.split(";");
    var parts = data[0].split(",");
    ts = parseInt(parts[0],10);
    this.units.timestamp = ts < minTS ? 0 : ts;
    if( parts.length > 1 ) {
      var i = 0;
      for( var key in serverInfo.unitInfo ) {
        i++;
        this.units.home[key] = parseInt(parts[i],10);
        this.units.there[key] = parseInt(parts[i+serverInfo.unitAnz],10);
        this.units.away[key] = parseInt(parts[i+serverInfo.unitAnz*2],10);
        this.units.moving[key] = parseInt(parts[i+serverInfo.unitAnz*3],10);
      }
    }
    parts = data[1].split(",");
    ts = parseInt(parts[0],10);
    this.res.timestamp = ts < minTS ? 0 : ts;
    this.res.wood = parseInt(parts[1],10);
    this.res.stone = parseInt(parts[2],10);
    this.res.iron = parseInt(parts[3],10);
    this.res.storage = parseInt(parts[4],10);
    this.res.pop = { current: parseInt(parts[5],10), max: parseInt(parts[6],10) };
    parts = data[2].split(",");
    ts = parseInt(parts[0],10);
    this.map.timestamp = ts < minTS ? 0 : ts;
    this.map.x = parseInt(parts[1],10);
    this.map.y = parseInt(parts[2],10);
    if( data.length > 3 ) {
      parts = data[3].split("|");
      this.groups.timestamp = parseInt(parts[0],10);
      this.groups.list = parts[1].split(", ");
    }
    if( data.length > 4 ) {
      parts = data[4].split(",");
      this.coords.x = parseInt(parts[0],10);
      this.coords.y = parseInt(parts[1],10);
    }
    if( data.length > 5 ) {
      parts = data[5].split(",");
      this.loyalty.timestamp = parseInt(parts[0],10);
      this.loyalty.value = parseInt(parts[1],10);
    }
    if( data.length > 6 ) {
      parts = data[6].split(",");
      this.muster.active = parseInt(parts[0],10) == 1;
      this.muster.time = parseInt(parts[1],10);
    }
  }
  this.toString = function() {
    var str = "";
    str += this.units.timestamp;
    var home = "";
    var there = "";
    var away = "";
    var moving = "";
    for( var key in serverInfo.unitInfo ) {
      home += "," + parseInt(this.units.home[key],10);
      there += "," + parseInt(this.units.there[key],10);
      away += "," + parseInt(this.units.away[key],10);
      moving += "," + parseInt(this.units.moving[key],10);
    }
    str += home + there + away + moving + ";";
    str += this.res.timestamp + ",";
    str += this.res.wood+",";
    str += this.res.stone+",";
    str += this.res.iron+",";
    str += this.res.storage+",";
    str += this.res.pop.current+","
    str += this.res.pop.max+";"
    str += this.map.timestamp + ",";
    str += this.map.x + ",";
    str += this.map.y + ";";
    str += this.groups.timestamp + "|";
    str += this.groups.list.join(", ") + ";";
    str += this.coords.x + "," + this.coords.y + ";";
    str += this.loyalty.timestamp + "," + this.loyalty.value + ";";
    str += (this.muster.active ? "1":"0") + ",";
    str += this.muster.time;
    return str;
  }
  this.merge = function(vil) {
    if( this.units.timestamp < vil.units.timestamp )
      this.units = vil.units;
    if( this.res.timestamp < vil.res.timestamp )
      this.res = vil.res;
    if( this.map.timestamp < vil.map.timestamp )
      this.map = vil.map;
    if( this.groups.timestamp < vil.groups.timestamp )
      this.groups = vil.groups;
    if( this.loyalty.timestamp < vil.loyalty.timestamp )
      this.loyalty = vil.loyalty;
  }
  this.getUnitSum = function(unit,unitSum) {
    var val = 0;
    if( unitSum & 1 )
      val += this.units.home[unit];
    if( unitSum & 2 )
      val += this.units.there[unit];
    if( unitSum & 4 )
      val += this.units.away[unit];
    if( unitSum & 8 )
      val += this.units.moving[unit];
    return val;
  }
  this.id = parseInt(id,10);
  if( isNaN( this.id ) ) 
    throw "MyVillage: Invalid id:"+id;
  this.units = { timestamp: 0, home: { }, there: {}, away: { }, moving: { } };
  this.res = { timestamp: 0, wood: Number.NaN, stone: Number.NaN, iron: Number.NaN, storage: Number.NaN };
  this.groups = { timestamp: 0, list: [] };
  this.map = { timestamp: 0 };
  this.coords = { x: NaN, y: NaN };
  this.loyalty = { timestamp: 0, value: 0 };
  this.muster = { active: false, time: 0 };
  this.returns = [];
  if( value )
    this.fromString(value);
  else
    this.load();
}
var ContextMenu = function(id,callBack) {
  this.addMenuItem = function(mi) {
    var row = THIS.menutab.insertRow(THIS.menutab.rows.length);
    var hasId = typeof(mi.id) != "undefined";
    var type = hasId || mi.href ? "td" : "th";
    var cell = row.appendChild(ce(type));
    if( mi === null ) {
      cell.colSpan = 2;
      cell.appendChild(ce("hr"));
    }
    else {
      if( mi.icon )
        cell.appendChild(ce("img")).src = mi.icon;
      if( mi.text ) {
        cell = row.appendChild(ce(type));
        var el = cell;
        if( hasId || mi.href ) {
          el = cell.appendChild(ce("a"));
          el.href = mi.href ? mi.href : "javascript:;";
          if( hasId && THIS.callBack )
            el.addEventListener("click", THIS.onMenuItemClicked, false );
        }
        el.appendChild(document.createTextNode(mi.text));
      }
      unwrap(row).ctxData = mi;
    }
    return row;
  }
  this.removeMenuItem = function(id) {
    for( var i = 1; i < THIS.menutab.rows.length; i++ ) {
      var row = unwrap(THIS.menutab.rows[i]);
      if( row.ctxData && row.ctxData.id && row.ctxData.id == id ) {
        THIS.menutab.tBodies[0].removeChild(row);
        return;
      }
    }
  }
  this.addTarget = function(target,title,data) {
    this.targets.push( { node: target, title: title, data: data });
  }
  this.onContextMenu = function(e) {
    if( Settings.settings.misc.ctxCtrl && !CoordSelector.ctrlDown ) return;
    for( var i = 0; i < THIS.targets.length; i++ ) {
      if( THIS.targets[i].node == e.target ) {
        THIS.show(e.pageX,e.pageY,THIS.targets[i].title, THIS.targets[i].data);
        e.preventDefault();
        return false;
      }
    }
    if( THIS.callBack ) {
      var res = THIS.callBack(THIS.id, "show", e );
      if( res ) {
        THIS.show(e.pageX,e.pageY,res.title,res.data);
        e.preventDefault();
        return false;
      }
    }
  }
  this.show = function(x,y,title,targetData) {
    THIS.targetData = targetData;
    for( var j = 1; j < THIS.menutab.rows.length; j++ ) {
      var ctxData = unwrap(THIS.menutab.rows[j]).ctxData;
      var hasId = ctxData && typeof(ctxData.id) != "undefined";
      if( ctxData && hasId ) {
        var a = THIS.menutab.rows[j].cells[1].firstChild;
        if( hasId && THIS.callBack ) {
          var href = THIS.callBack(THIS.id, "modHref", ctxData, targetData);
          if( href )
            a.href = href;
          else if( ctxData.href )
            a.href = ctxData.href
          else
            a.href = "javascript:;"
        }
        else
          a.href = ctxData.href;
        a.style.color = a.href == "" ? "#999999":"";
      }
    }
    document.body.appendChild(THIS.menu);
    var tp = [x,y]
    var ts = [0, 0]
    var vp = [window.pageXOffset, window.pageYOffset]; // view pos
    var vs = [window.innerWidth, window.innerHeight]; // view size
    var ms = [ THIS.menutab.offsetWidth, THIS.menutab.offsetHeight ];
    var l = (ts[1]+ms[1])/2;
    var mp = [
      -vp[0]+tp[0]+ms[0] > vs[0] ?
        (-vp[0]+tp[0]+ts[0]/2 > vs[0]/2 && tp[0]+ts[0]-ms[0] >= 0 ? tp[0]+ts[0]-ms[0] : tp[0]) :
        tp[0],
      -vp[1]+tp[1]+ts[1]+ms[1]-l+l > vs[1] ?
        (-vp[1]+tp[1]+ts[1]/2 > vs[1]/2 && tp[1]+ts[1]-l-l >= 0 ? tp[1]+ts[1]-l-l : tp[1]+ts[1]-l+l) :
        (tp[1]+ts[1]-l+l >= 0 ? tp[1]+ts[1]-l+l : tp[1]+ts[1]-l-l)
    ];
    THIS.menu.style.left = mp[0] + "px";
    THIS.menu.style.top = mp[1] + "px";
    THIS.menutab.rows[0].cells[0].innerHTML = title;
    var res = title.match(/(\d{1,3})\|(\d{1,3})/);
    if( res ) {
      var cell = THIS.menutab.rows[0].cells[0];
      cell.setAttribute("coords", res[1]+"_"+res[2]);
      RunTimes.createToolTip(cell);
    }
    document.body.addEventListener("mousedown", THIS.onMouseDown, false );
  }
  this.onMouseDown = function(e) {
    if(!THIS.mouseOverMenu) {
      THIS.hide();
      e.preventDefault();
      return false;
    }
  }
  this.onMenuItemClicked = function(e) {
    THIS.hide();
    THIS.callBack(THIS.id, "click", unwrap(this.parentNode.parentNode).ctxData, THIS.targetData);
    return false;
  }
  this.hide = function() {
    document.body.removeEventListener("mousedown", THIS.onMouseDown, false );
    document.body.removeChild(THIS.menu);
  }
  var THIS = this;
  this.callBack = callBack;
  this.id = id;
  this.targets = [];
  this.mouseOverMenu = false;
  document.body.addEventListener("contextmenu", this.onContextMenu, false);
  this.menu = ce("div");
  this.menu.addEventListener("mouseover", function(e) { THIS.mouseOverMenu = true; }, false );
  this.menu.addEventListener("mouseout", function(e) { THIS.mouseOverMenu = false; }, false );
  this.menu.style.zIndex = 10000;
  this.menu.style.position = "absolute";
  this.menu.style.width = "100px";
  this.menu.style.height = "100px";
  this.menu.style.whiteSpace = "nowrap";
  this.menutab = this.menu.appendChild(ce("table"));
  this.menutab.className = "popup_content";
  this.menutab.style.border = "2px solid #804000";
  this.menutab.insertRow(0).appendChild(ce("th")).colSpan=2;
  this.targetData = null;
}
var TableSorter = function(tab,evenClass,oddClass,bodySorter,fnIsGroupStart) {
  var THIS = this;
  var up = String.fromCharCode(9650);
  var down = String.fromCharCode(9660);
  var sortNotifier;
  
  var header = 0;
  if( typeof( evenClass ) == "undefined" )
    evenClass = "";
  if( typeof( oddClass ) == "undefined" )
    oddClass = "";
  var classes = [evenClass,oddClass];
  var cnre = new RegExp( classes[0] + "|" + classes[1] );
  var hasCallback = typeof(fnIsGroupStart) != "undefined";

  this.addSortColumn = function(idx,compareFn,sorted,getValueCellFn) {
    var cell = unwrap(tab.tHead.rows[header].cells[idx]);
    cell.compareFn = compareFn;
    if( typeof(getValueCellFn) == "undefined" )
      if( bodySorter )
        cell.getValueCellFn = function(body,idx) { return body.rows[0].cells[idx]; };
      else
        cell.getValueCellFn = function(row,idx) { return row.cells[idx]; };
    else
      cell.getValueCellFn = getValueCellFn;
    if( Settings.settings.misc.newLineSort ) 
      tab.tHead.rows[header].cells[idx].appendChild(ce("br"));
    tab.tHead.rows[header].cells[idx].appendChild(document.createTextNode(String.fromCharCode(160)));
    var a = tab.tHead.rows[header].cells[idx].appendChild(ce("a"));
    a.style.color = sorted == 1 ? "black" : "grey";
    a.innerHTML = up;
    a.href = "javascript:;";
    a.addEventListener("click",this.sort,false);
    a = tab.tHead.rows[header].cells[idx].appendChild(ce("a"));
    a.style.color = sorted == -1 ? "black" : "grey";
    a.innerHTML = down;
    a.href = "javascript:;";
    a.addEventListener("click",this.sort,false);
    if( sorted )
      sortCol = (idx+1)*sorted;
  }
  this.setSortMarker = function(col,dir) {
    if(col != 0 ) {
      col = Math.abs(col)-1;
      var nodes = tab.tHead.rows[header].cells[col].childNodes.length;
      var aUp = tab.tHead.rows[header].cells[col].childNodes[nodes-2];
      var aDn = tab.tHead.rows[header].cells[col].childNodes[nodes-1];
      aUp.style.color = dir <= 0 ? "grey" : "black";
      aDn.style.color = dir >= 0 ? "grey" : "black";
    }
  },
  this.setSortColumn = function(col,dir) {
    var start = new Date().getTime();
    dir = dir.toUpperCase();
    var toSort = (col+1);
    if( dir == "DESC" )
      toSort *= -1;
    else if( dir != "ASC" )
      throw ("Unknown sort direction \""+dir+"\"");
    if( toSort != sortCol ) {
      if( toSort == -sortCol ) {
        rows.reverse();
      }
      else {
        THIS.setSortMarker(sortCol,0);
        rows.sort(function(a,b) {
            var cellHead = unwrap(tab.tHead.rows[header].cells[col]); 
            var ret = 0; 
            if( cellHead.getValueCellFn ) 
              ret = cellHead.compareFn(cellHead.getValueCellFn(a,col),cellHead.getValueCellFn(b,col)); 
            else 
              ret = cellHead.compareFn(a.cells[col],b.cells[col]); 
            if( toSort < 0 ) 
              ret *= -1; 
            return ret;
          });
        lib.debug.log("Sort: " + (new Date().getTime()-start) + " ms");
      }
      for( var i = 0; i < rows.length; i++ ) {
        var rowIdx = rows[i].rowIndex;
        THIS.modClassName(tab.appendChild(rows[i]), i&1 );
        if( hasCallback ) {
          while( !fnIsGroupStart(tab.rows[rowIdx]) ) {
            THIS.modClassName(tab.appendChild(tab.rows[rowIdx]), i&1);
          }
        }
      }
      THIS.setSortMarker(toSort,toSort);
      sortCol = toSort;
    }
    //lib.debug.log("Table sorted in " + (new Date().getTime()-start) + " ms");
    if( typeof( sortNotifier ) != "undefined" )
      sortNotifier(Math.abs(toSort)-1,toSort < 0 ? "DESC":"ASC");
  }
  this.sort = function(e) {
    THIS.setSortColumn(this.parentNode.cellIndex,this.textContent == down ? "DESC" : "ASC");
  }
  this.modClassName = function(row,odd) {
//    row.className = row.className.replace(classes[0],"").replace(classes[1],"");
    row.className = row.className.replace(cnre,"");
    row.className = classes[odd] + " " + row.className;
  }
  this.reloadRows = function(noResort) {
    rows = [];
    if( bodySorter ) {
      for( var i = 0; i < tab.tBodies.length; i++ )
        rows.push(tab.tBodies[i]);
    }
    else {
      for( var i = 0; i < tab.tBodies[0].rows.length; i++ ) {
        if( !hasCallback || fnIsGroupStart(tab.tBodies[0].rows[i]) )
          rows.push(tab.tBodies[0].rows[i]);
      }
      if( !noResort ) {
        var idx = sortCol;
        sortCol = NaN;
        THIS.setSortColumn(Math.abs(idx),idx > 0 ? "ASC" : "DESC");
      }
    }
  }
  this.setSortNotifier = function(fn) {
    sortNotifier = fn;
  }
  
  if( tab.tHead === null ) {
    tab.insertBefore(ce("thead"),tab.tBodies[0]);
    tab.tHead.appendChild(tab.tBodies[0].rows[0]);
    for( var i = 0; i < tab.tBodies.length; i++ ) {
      if( tab.tBodies[i].rows.length == 0 )
        tab.removeChild(tBodies[i--]);
    }
  }
  for( header = 0; header < tab.tHead.rows.length; header++ ) {
    if( tab.tHead.rows[header].cells[0].nodeName.toUpperCase() == "TH" )
      break;
  }

  tab.tHead.rows[header].style.whiteSpace = "nowrap";
  var rows;
  var sortCol = 0;
  THIS.reloadRows(true);
}
var Color = function() {
  var THIS = this;
  this.r = 0;
  this.g = 0;
  this.b = 0;
  this.fromString = function(str) {
    var res = str.match( /rgb\((\d+), (\d+), (\d+)\)/);
    if( res ) {
      this.r = res[1];
      this.g = res[2];
      this.b = res[3];
    }
    else {
      var off = str[0] == "#" ? 1 : 0;
      if( str.length == off+3 ) {
        this.r = parseInt(str.substring(off,1+off),16);
        this.g = parseInt(str.substring(1+off,2+off),16);
        this.b = parseInt(str.substring(2+off),16);
      }
      else if( str.length == off+6 ) {
        this.r = parseInt(str.substring(off,2+off),16);
        this.g = parseInt(str.substring(2+off,4+off),16);
        this.b = parseInt(str.substring(4+off),16);
      }
    }
    return this;
  }
  this.toString = function(rgb,a) {
    if( rgb ) {
      if( a === undefined )
        return "rgb("+this.r+", "+this.g+", "+this.b+")";
      else
        return "rgba("+this.r+", "+this.g+", "+this.b+", " + a + ")";
    }
    else
      return "#" + (0x100 | this.r).toString(16).substr(1) + (0x100 | this.g).toString(16).substr(1) + (0x100 | this.b).toString(16).substr(1);
  }
  this.invert = function() {
    this.r = Math.abs(255-this.r);
    this.g = Math.abs(255-this.g);
    this.b = Math.abs(255-this.b);
    return this;
  }
  this.getContrastColor = function() {
    return 0.213 * this.r + 0.715 * this.g + 0.072 * this.b < 128 ? new Color(255,255,255) : new Color(0,0,0);
  }
  this.fadeTo = function(p,color) {
    if( p < 0 ) p = 0;
    if( p > 100 ) p = 100;
      return new Color( Math.round(this.r+(color.r-this.r)*p), Math.round(this.g+(color.g-this.g)*p), Math.round(this.b+(color.b-this.b)*p) );
  }
  switch( arguments.length ) {
    case 0:
      break;
    case 1:
      this.fromString(arguments[0]);
      break;
    case 3:
      this.r = arguments[0];
      this.g = arguments[1];
      this.b = arguments[2];
      break;
    default:
      throw( "Color: invalid parameters" );
  }
}
/** var DrillQueue = function(tab, mode)
/*
*/
var DrillQueue = function(tab, mode)  {
  var ctxMenu = [];
  var cancelLnks = [];
  this.cancel = function(e) {
    var idx = parseInt(this.getAttribute("idx"),10);
    if( cancelLnks[idx].length == 1 )
      lib.fireEvent(cancelLnks[idx][0].a,"click");
    else {
      if(!ctxMenu[idx]) {
        ctxMenu[idx] = new ContextMenu(idx,function(id,type) { if(type=="click") { lib.fireEvent(cancelLnks[id][arguments[2].id].a,"click"); }} );
        var unit = this.getAttribute("unit");
        for( var i = 0; i < cancelLnks[idx].length; i++ )
          ctxMenu[idx].addMenuItem({ id: i, text: cancelLnks[idx][i].count + " " + (cancelLnks[idx][i].count == 1 ? texts[lib.lang].unit[unit] : texts[lib.lang].units[unit])});
      }
      ctxMenu[idx].show(e.pageX,e.pageY,texts[lib.lang].gui.cancelDrill);
    }
  }
  this.show = function(mode) {
    THIS.completionTab.style.display = mode == 1 ? "none" : "";
    THIS.queue.style.display = THIS.completionTab.style.display;
    THIS.smallQueue.style.display = mode == 0 ? "none" : "";
    setTimeout( function() { lib.storage.setValue("drillqueuemode"+ownPid,mode);}, 0 );
  }
  this.createSmallQueue = function()  {
    this.smallQueue = this.completionTab.parentNode.insertBefore(ce("table"),this.completionTab);
    this.smallQueue.className = "vis";
    var row = this.smallQueue.insertRow(-1);
    var cell = row.appendChild(ce("th"));
    cell.appendChild(document.createTextNode(this.queue.rows[0].cells[0].innerHTML+" "));
    var a = cell.appendChild(ce("a"));
    a.href = "javascript:;";
    a.addEventListener("click", function() { THIS.show(0); }, false);
    a.textContent = String.fromCharCode(9660);
    cell.appendChild(document.createTextNode(" "));
    var span = cell.appendChild(ce("span"));
    span.innerHTML = this.completionTab.rows[0].cells[1].firstChild.innerHTML;
    row.appendChild(ce("th")).innerHTML = this.queue.rows[this.queue.rows.length-1].cells[2].innerHTML;
    setInterval(function() { span.innerHTML = THIS.completionTab.rows[0].cells[1].firstChild.innerHTML; }, 1000);
    row = this.smallQueue.insertRow(-1);
    cell = row.insertCell(-1);
    cell.colSpan = 2;
    var curUnit = "";
    var sum = 0;
    var idx = 0;
    var unitLnks = {};
    var rows = this.queue.rows.length;
    for( var i = 1; i < rows; i++ ) {
      var vals = this.queue.rows[i].cells[0].innerHTML.match(/(\d+) (.*)/);
      for( var key in texts[lib.lang].unit ) {
        if( texts[lib.lang].unit[key] == vals[2] || texts[lib.lang].units[key] == vals[2] ) {
          var a;
          if( curUnit != key ) {
            if( Settings.settings.recruit.drillQueueMode < 2 || unitLnks[key] == null ) {
              a = cell.appendChild(ce("a"));
              a.href = "javascript:;";
              var img = a.appendChild(ce("img"));
              img.src = "graphic/unit/unit_"+key+".png";
              sum = 0;
              cancelLnks.push([]);
              if( Settings.settings.recruit.drillQueueMode == 1 )
                curUnit = key;
              var idx = cancelLnks.length-1
              a.setAttribute("idx",idx);
              a.setAttribute("unit",key);
              a.addEventListener("click", this.cancel, false);
              var queueRow = null;
              if( Settings.settings.recruit.drillQueueMode > 0 && !Settings.settings.recruit.shrinkSmallOnly) {
                queueRow = this.queue.insertRow(-1);
                queueRow.className = "nowrap";
                queueRow.insertCell(-1);
                queueRow.insertCell(-1);
                var cancelCell = queueRow.insertCell(-1);
                var aText = cancelCell.appendChild(ce("a"));
                aText.href = "javascript:;";
                aText.innerHTML = texts[lib.lang].gui.cancel;
                aText.setAttribute("idx",idx);
                aText.setAttribute("unit",key);
                aText.addEventListener("click", this.cancel, false);
              }
              unitLnks[key] = { a: a, row: queueRow, sum: 0, idx: idx };
            }
          }
          var count = parseInt(vals[1],10);
          unitLnks[key].sum += count;
          Recruitment.unitSum[key] += count;
          cancelLnks[unitLnks[key].idx].push( { count: count, a: this.queue.rows[i].cells[3].getElementsByTagName("a")[0] } );
          unitLnks[key].a.title = unitLnks[key].sum + " " + (unitLnks[key].sum == 1 ? texts[lib.lang].unit[key] : texts[lib.lang].units[key]);
          if( cancelLnks[unitLnks[key].idx].length > 1 )
            unitLnks[key].a.title += " (" + cancelLnks[unitLnks[key].idx].length + ")";
          if( unitLnks[key].row )
            unitLnks[key].row.cells[0].innerHTML = unitLnks[key].a.title;
          unitLnks[key].a.title += " - " + this.queue.rows[i].cells[2].innerHTML;
          if( unitLnks[key].row )
            unitLnks[key].row.cells[1].innerHTML = this.queue.rows[i].cells[2].innerHTML;
        }
      }
      if( Settings.settings.recruit.drillQueueMode > 0 && !Settings.settings.recruit.shrinkSmallOnly )
        this.queue.rows[i].style.display = "none";
    }
    this.queue.rows[0].cells[0].appendChild(document.createTextNode(" "));
    a = this.queue.rows[0].cells[0].appendChild(ce("a"));
    a.addEventListener("click", function() { THIS.show(1); }, false);
    a.textContent = String.fromCharCode(9650);
    if( Settings.settings.recruit.drillQueueMode > 0 )
      this.queue.rows[0].removeChild(this.queue.rows[0].cells[1]);
  }

  var THIS = this;
  this.completionTab = tab;
  this.queue = getByTagName(getByTagName(tab,"div","nextSibling"),"table","firstChild");
  this.createSmallQueue();
  
  this.show(mode);
}
/** var VariantEdit = function(parent,fields,fieldWidth,varKey,calcedCols,calcFn)
/*
*/
var VariantEdit = function(parent,fields,fieldWidth,varKey,calcedCols,calcFn) {
  var THIS = this;
  this.insertHeadCol = function(obj) {
    cell = row.appendChild(ce("th"));
    if( obj.img ) {
      var img = cell.appendChild(ce("img"));
      img.src = obj.img;
      img.alt = obj.title;
      img.title = obj.title;
      cell.style.textAlign = "center";
    }
    else
      cell.innerHTML = obj.title;
  }
  this.insertRow = function(variant) {
    var name = "";
    if( !variant ) {
      var title = texts[lib.lang].gui.enterName;
      for(;;) {
        name = prompt(title);
        if( name === null )
          return;
        if( name.length > 0 ) {
          for( var i = 1; i < tab.rows.length; i++ ) {
            if( tab.rows[i].cells[0].lastChild.value == name ) {
              title = texts[lib.lang].gui.nameExists;
              break;
            }
          }
          if( i == tab.rows.length )
            break;
        }
        else
          title = texts[lib.lang].gui.enterName;
      }
    }
    else
      name = variant.name;
    row = tab.insertRow(-1);
    if( variant )
      row.id = "dsfm_"+varKey+"_"+(row.rowIndex-1);
    row.style.whiteSpace = "nowrap";
    cell = row.insertCell(-1);
    if( hasDefVar ) {
      input = cell.appendChild(ce("input"));
      input.type = "radio";
      input.name = varKey+"Default";
      if( variant ) {
        input.checked = Settings[varKey].defVar == variant.id;
        input.value = variant.id;
      }
      else
        input.value = 10000 + row.rowIndex;
      input.addEventListener("click",function(e) { 
          var val = parseInt(this.value,10);
          if(  val == Settings[varKey].defVar ) {
            this.checked = false;
            val = 0;
          }
          Settings[varKey].defVar = val;
        }, false );
    }
    input = cell.appendChild(ce("input"));
    input.type = "text";
    input.style.width = "60px";
    input.value = name;
    input.addEventListener("change", function(e) {
        if( this.value.length == 0 ) {
          alert( texts[lib.lang].gui.enterName );
          return false;
        }
        var tab = getByTagName(this,"table","parentNode");
        var row = getByTagName(this,"tr","parentNode");
        for( var i = 1; i < tab.rows.length; i++ ) {
          if( row.rowIndex != i && this.value == tab.rows[i].cells[0].lastChild.value ) {
            alert( texts[lib.lang].gui.nameExists );
          }
        }        
      }, false );
    if( !variant )
      input.focus();
    for( j = 0; j < fields.length; j++ ) {
      cell = row.insertCell(-1);
      cell.style.width = fieldWidth;
      input = ce("input");
      input.type = "text";
      input.name = fields[j].key;
      input.value = variant ? variant[fields[j].key] : fields[j].newVal;
      cell.appendChild(input);
      input.addEventListener("change",function(e){ 
        var idx = this.parentNode.cellIndex-1;
        var val = parseInt(this.value,10); 
        if( val < fields[idx].minVal || val > fields[idx].maxVal ) {
          alert(texts[lib.lang].gui.enterInRange[0] + fields[idx].minVal + texts[lib.lang].gui.enterInRange[1] + fields[idx].maxVal + texts[lib.lang].gui.enterInRange[2] );
          return false;
        }
        if( calcFn )
          calcFn(getByTagName(this,"tr","parentNode")); 
      },false);
      input.style.width = fieldWidth;
    }
    if( calcedCols ) {
      for( var j = 0; j < calcedCols.length; j++ )
        row.insertCell(-1).style.textAlign = "right";
    }
    
    cell = row.insertCell(row.cells.length);
    a = cell.appendChild(ce("a"));
    a.innerHTML = "X";
    a.style.color = "#FF0000";
    a.href = "javascript:;";
    a.title = texts[lib.lang].gui.delVariant;
    a.addEventListener("click", THIS.deleteVariant, false);
    
    if( calcFn )
      calcFn(row);
  }
  this.deleteVariant = function(e) {
    var row = getByTagName(e.target,"tr","parentNode");
    if( row.id != "" ) {
      var idx = row.id.split("_");
      idx = parseInt(idx[idx.length-1],10);
      Settings[varKey].assigns = Settings[varKey].assigns.replace(new RegExp(";\\d+,"+Settings[varKey].variants[idx].id+";"),";");
    }
    row.parentNode.removeChild(row);
    Settings[varKey].variants.splice(idx,1);
  }
  this.save = function() {
    var nextId = 1;
    for( var i = 0; i < Settings[varKey].variants.length; i++ ) {
      if( Settings[varKey].variants[i].id >= nextId )
        nextId = Settings[varKey].variants[i].id + 1;
    }
    for( var i = 1; i < tab.rows.length; i++ ) {
      if( i-1 == Settings[varKey].variants.length )
        Settings[varKey].variants.push( {id: nextId++ } );
      Settings[varKey].variants[i-1].name = tab.rows[i].cells[0].lastChild.value;
      for( var j = 0; j < fields.length; j++ )
        Settings[varKey].variants[i-1][fields[j].key] = parseInt(tab.rows[i].cells[j+1].firstChild.value,10);
      if( hasDefVar && tab.rows[i].cells[0].firstChild.checked )
        Settings[varKey].defVar = Settings[varKey].variants[i-1].id;
      for( var j = 0; j < calcedCols.length; j++ ) {
        if( calcedCols[j].propName )
          Settings[varKey].variants[i-1][calcedCols[j].propName] = parseInt(tab.rows[i].cells[fields.length+j+1].innerHTML.replace(/<[^>]+>|\./g,""),10);
      }
    }
    Settings[varKey].variants.sort(function(a,b) { return compare(a.name,b.name); });
    lib.storage.setValue(varKey+ownPid,Settings[varKey]);
  }
  
  var tab = parent.appendChild(ce("table"));
  tab.className = "vis";
  var row = tab.insertRow(-1);
  row.style.whiteSpace = "nowrap";
  cell = row.appendChild(ce("th"));
  cell.innerHTML = texts[lib.lang].gui.variantName;
  
  for( var i = 0; i < fields.length; i++ )
    this.insertHeadCol(fields[i]);
  if( calcedCols ) {
    for( i = 0; i < calcedCols.length; i++ )
      this.insertHeadCol(calcedCols[i]);
  }
  cell = row.appendChild(document.createElement("th"));
  cell.innerHTML = "X";
  cell.style.color = "#FF0000";

  var input;
  var hasDefVar = typeof(Settings[varKey].defVar) != "undefined";
  for( i = 0;  i < Settings[varKey].variants.length; i++ )
    this.insertRow(Settings[varKey].variants[i]);
  var a = parent.appendChild(ce("a"));
  a.href = "javascript:;";
  a.innerHTML = "&raquo; " + texts[lib.lang].gui.addVariant;
  a.addEventListener("click", function(e) { THIS.insertRow(); }, false );
}

var Settings = {
  keyPress : "",
  keyDown : 0,
  settings: {},
  defSettings : {
    "misc": {
      "reportMaxAge":5,
      "useHotKeys":true,
      "coordSelector":true,
      "modGroupPopup":true,
      confirmQueue: true,
      slSwitcher: 1,
      navBarSwitcher: false,
      newLineSort: false,
      runTimeToolTips: true,
      rtttDelay: 0,
      ctxCtrl: false,
      moveAtts: 4,
      fixHead: false,
      removeAMIcons: false,
      privateNames: true,
    },
    "build": {
      showOVLoyalty: true,
      enhancedOV: true,
      showMissingRes: true,
    },
    "map": {
      "villageGroups":true,
      "vgShowAlly":true,
      "rememberPos":false,
      "saveHours":24,
      "sumHours":3,
      "opacityMin":40,
      "opacityMaxRes":2000,
      "ageTransparency":1,
      "minAgeTransparency":1,
      "showBars":true,
      "showRessis":true,
      "playerColored":true,
      "showWall":true,
      "redirActive":true,
      "showPoints":true,
      "groupsOnTopo":true,
      "shadowTopo": false,
      "topoBorderOwn": true,
      "defense": 5188750,
      "defense_cavalry": 3898790,
      "defense_archer": 3699255,
    },
    "popup": {
      "minReportAge":24,
      "showRessis":true,
      "showReportAge":true,
      "showBuildings":true,
      "showMining":true,
      "showUnitsIn":true,
      "showUnitsOut":true,
      "showLoyalty":true,
      "showBuildingChange":true,
    },
    "place": {
      "showRessis":true,
      "showUnitsIn":true,
      "showUnitsOut":true,
      "showBuildings":2,
      "showCatas":true,
      "noReportLoad":500,
      "maxFarms":10,
      "farmDist":20,
      "okOnPlayer":1,
      "incRangeRes":500,
      "showBuildingChange":true,
      "minLoad":true,
      "minRamWall":1,
      "minKataLevel":1,
      "minRamsNeeded":false,
      "minKatasNeeded":false,
      "maxAttAge":24,
      "spyNoReport":true,
      showCarry: true,
      showRunTime: true,
      showArrivalTime: true,
      minEQ: 30,
      disableOnUnits: true,
      fakeSpys: 1,
      spyOlder: true,
      spyAge: 24,
      colorFLRes: true,
    },
    "storage": {
      titleResColored: true,
      titleFarmColored: true,
      modSnob: true,
      snobResColored: true,
//      resourceColFloating: true,
//      farmColFloating: true,
    },
    "report": {
      showBPs: true,
      showSurvivors: true,
      showLostCost: true,
      enableReorder: true,
    },
    "recruit": {
      "drillQueueMode":2,
      "shrinkSmallOnly":false,
      "shrinkRecruitmentMode":2,
      showRecruitSums: true,
      showRecruitTotal: true,
    },
    "prod": {
      runtimeCol: true,
      resColored: true,
      farmColored: true,
      farmTotal: true,
      showSums: true,
      removeBuildTime: true,
      shrinkRecruitmentMode: 2,
      showRecruitSums: true,
    },
  },
  defColors: { range:   { resource:        [ true, { val: 0, color: "#00FF00" }, { val: 75, color: "#FFFF00" }, { val:100, color: "#FF0000" } ],
                          farm:            [ true, { val: 0, color: "#00FF00" }, { val: 75, color: "#FFFF00" }, { val:100, color: "#FF0000" } ], 
                          defense:         [ true, {val: 0, color: "#FF0000"}, {val: 75, color: "#FFFF00"}, { val:100, color: "#00FF00" } ],
                          defense_cavalry: [ true, {val: 0, color: "#FF0000"}, {val: 75, color: "#FFFF00"}, { val:100, color: "#00FF00" } ],
                          defense_archer:  [ true, {val: 0, color: "#FF0000"}, {val: 75, color: "#FFFF00"}, { val:100, color: "#00FF00" } ] },
            place:   { unitStates: [ {background: "#CFCFCF", border: "#808080"},
                                     {background: "#D6FF5B", border: "#008000"}, 
                                     {background: "#FFFC7A", border: "#FF0000"}, 
                                     {background: "#FFD36D", border: "#FF0000"},
                                     {background: "#FFBC9E", border: "#FF0000"},
                                     {background: "#D6FF5B", border: "#FF0000"} ],
                        confirmTitle: {attack: "#FF0000", support: "#00FF00"} },
            ov: { buildings: { toBuild: "#55FF42", toDestroy: "#FF5E23", queueCost: "#FFFF00" } },
          },
  defHotKeys : {
    "common": {
      "place": {"keyCode":80,"text":" [P]","modifier":0},
      "map": {"keyCode":75,"text":" [K]","modifier":0},
      "market": {"keyCode":77,"text":" [M]","modifier":0},
      "nextVillage": {"keyCode":107,"text":" [+]","modifier":0},
      "prevVillage": {"keyCode":109,"text":" [-]","modifier":0},
      "lastVillage": {keyCode:106, text:" [*]", modifier:0},
      "close": {"keyCode":27,"text":" [Esc]","modifier":0},
      "ok": {"keyCode":13,"text":" [?]","modifier":0}},
    "map": {
      "villageinfo": {"keyCode":73,"text":" [I]","modifier":0},
      "sendunits": {"keyCode":84,"text":" [T]","modifier":0},
      "getunits": {"keyCode":83,"text":" [S]","modifier":0},
      "market": {"keyCode":82,"text":" [R]","modifier":0},
      "getress": {"keyCode":72,"text":" [H]","modifier":0},
      "centermap": {"keyCode":90,"text":" [Z]","modifier":0},
      "removeinfo": {"keyCode":88,"text":" [X]","modifier":0},
      "selectvillage": {"keyCode":65,"text":" [A]","modifier":0},
      "togglenofarm": {"keyCode":70,"text":" [F]","modifier":0},
      "coordlist": {"keyCode":76,"text":" [L]","modifier":0},
      "eq": {"keyCode":81,"text":" [Q]","modifier":0},
      "stats": {"keyCode":191,"text":" [#]","modifier":0},
      "addbb2fl": {"keyCode":66,"text":" [B]","modifier":0},
      "ownNone": {"keyCode":32,"text":" [Spatiebalk]","modifier":0},
      "ownUnits": {"keyCode":69,"text":" [E]","modifier":0},
      "ownGroups": {"keyCode":71,"text":" [G]","modifier":0},
      "ownCoords": {"keyCode":67,"text":" [C]","modifier":0},
      "ownName": {"keyCode":78,"text":" [N]","modifier":0},
      "ownPoints": {"keyCode":85,"text":" [U]","modifier":0},
      "ownResource": {"keyCode":79,"text":" [O]","modifier":0},
      "ownDef": {"keyCode":68,"text":" [D]","modifier":0},
      "ownAttsNSups": { "keyCode": 77, "text": " [M]", "modifier":0}, 
      "otherNone": {"keyCode":32,"text":" [? + spatiebalk]","modifier":3},
      "otherFarmInfo": {"keyCode":73,"text":" [? + I]","modifier":3},
      "otherPlayer": {"keyCode":83,"text":" [? + S]","modifier":3},
      "otherCoords": {"keyCode":67,"text":" [? + C]","modifier":3},
      "otherName": {"keyCode":78,"text":" [? + N]","modifier":3},
      "otherPoints": {"keyCode":85,"text":" [? + U]","modifier":3},
      "otherAlly": {"keyCode":79,"text":" [? + O]","modifier":3},
      "otherAttsNSups": { "keyCode": 77, "text": " [? + M]", "modifier":3}, 
    },
    "place": {
      "allUnits": {"keyCode":65,"text":" [A]","modifier":0},
      "insertUnits": {"keyCode":69,"text":" [E]","modifier":0},
      "farmList": {"keyCode":70,"text":" [F]","modifier":0},
      "getAtts": {"keyCode":76,"text":" [L]","modifier":0},
      "eq": {"keyCode":81,"text":" [Q]","modifier":0},
      "attack": {"keyCode":13,"text":" [?]","modifier":0},
      "support": {"keyCode":83,"text":" [S]","modifier":0},
      "unitSelect": {"keyCode":87,"text":" [W]","modifier":0},
      "lastTarget": {"keyCode":67,"text":" [C]","modifier":0},
      "lastUnits": {"keyCode":85,"text":" [U]","modifier":0},
      "enableAttack": {"keyCode":79,"text":" [O]","modifier":0},
      "fake": {"keyCode":191,"text":" [#]","modifier":0},
    },
    "reports": {
      "forward": {"keyCode":87,"text":" [W]","modifier":0},
      "move": {"keyCode":86,"text":" [V]","modifier":0},
      "del": {"keyCode":76,"text":" [L]","modifier":0},
      "next": {"keyCode":37,"text":" [?]","modifier":0},
      "prev": {"keyCode":39,"text":" [?]","modifier":0}
    },
    "villageinfo":{
      "centermap":{"keyCode":90,"text":" [Z]","modifier":0},
      "sendunits":{"keyCode":84,"text":" [T]","modifier":0},
      "getunits":{"keyCode":83,"text":" [S]","modifier":0},
      "market":{"keyCode":82,"text":" [R]","modifier":0},
      "getress":{"keyCode":72,"text":" [H]","modifier":0},
      "reserve":{"keyCode":68,"text":" [D]","modifier":0},
      "togglefav":{"keyCode":86,"text":" [V]","modifier":0},
      "markonmap":{"keyCode":85,"text":" [U]","modifier":0},
      "removeinfos":{"keyCode":88,"text":" [X]","modifier":0},
      "togglenofarm":{"keyCode":70,"text":" [F]","modifier":0},
      "reseteq":{"keyCode":69,"text":" [E]","modifier":0},
      "overview":{"keyCode":79,"text":" [O]","modifier":0},
      "modgroups":{"keyCode":71,"text":" [G]","modifier":0},
      "ap":{"keyCode":65,"text":" [A]","modifier":0},
    },
  },
  defSounds : { 
    attOwnAcc:   { active: true, volume: 100, url: "https://web.archive.org/web/20170408204311/http://www.mediacollege.com/downloads/sound-effects/star-trek/tos/tos-redalert.wav", loop: true },
    attUVAccs:   { active: true, volume: 75, url: "https://web.archive.org/web/20170408204311/http://www.mediacollege.com/downloads/sound-effects/vehicle/siren/firetrucks-01.wav", loop: true },
    attDone:     { active: true, volume: 75, url: "https://web.archive.org/web/20170408204311/http://www.mediacollege.com/downloads/sound-effects/weapons/bulletricochet-01.wav", loop: false },
    support:     { active: true, volume: 75, url: "https://web.archive.org/web/20170408204311/http://www.mediacollege.com/downloads/sound-effects/crowd/marching-01.wav", loop: false },
    supportDone: { active: true, volume: 75, url: "https://web.archive.org/web/20170408204311/http://www.mediacollege.com/downloads/sound-effects/office/elevator-door-01.wav", loop: false },
    igm:         { active: true, volume: 75, url: "https://web.archive.org/web/20170408204311/http://www.mediacollege.com/downloads/sound-effects/star-trek/tng/tng-worf-incomingmessage.wav", loop: false },
    report:      { active: true, volume: 75, url: "https://web.archive.org/web/20170408204311/http://www.mediacollege.com/downloads/sound-effects/audience/kids-cheer-01.wav", loop: false },
    forum:       { active: true, volume: 75, url: "https://web.archive.org/web/20170408204311/http://www.mediacollege.com/downloads/sound-effects/star-trek/tng/tng-doorbell.wav", loop: false },
    session:     { active: true, volume: 75, url: "https://web.archive.org/web/20170408204311/http://www.mediacollege.com/downloads/sound-effects/star-trek/voy/voy-comp-01.wav", loop: false },
  },
  kataOrder : null,
  farmUnitCfg : null,
  userGroups : null,
  impExpPopup : null,
  exportPopup : null,
  defUnitColor : { spear: "#3E2C1A", sword: "#ABA3A0", axe: "#D5C5D3", archer: "#5B1B14", spy: "#DDDDDD", light: "#98612E", marcher: "#7E6F50", heavy: "#111111", ram: "#524A44", catapult: "#6C4224", knight: "#010175", snob: "#A69671" },
  exportGroups : { serverCfg: "buildinginfo|unitinfo|svrcfg", settings: "flSort\\d+|showFl\\d+|coordlist\\d+|exportGroups\\d+|settings\\d+|kataOrder\\d+|checkedUnits\\d+|drillqueueMode\\d+|dst\\d+|farmsort\\d+|groupsOnTopo\\d+|otherOvl\\d+|ownOvl\\d+|redirTarget\\d+|reportorder\\d+|smallQueue\\d+|unitSelect\\d+|unitSum\\d+|useeq\\d+|vilgrp\\d+|villageorder\\d+|bbcode\\d+|topo\\d+|mapopts\\d+|unitFilter\\d+|sounds", colors: "colors", hotkeys: "hotKeys", farmUnits: "farmUnitCfg\\d+", userGroups: "userGroups\\d+", ownVillage: "myVillages\\d+", farminfos: "otherVillages|commands|beute|nofarms\\d+|rids", variants: "buildAssist\\d+|recruAssist\\d+", churches: "churches\\d+", },
  buildAssist: { variants:[], assigns: "", defVar: 0 },
  recruAssist: { variants:[], assigns: "" },
  variantEdit : { buildAssist: null, recruAssist: null },
  points : {
    "main":[0,10,12,14,17,21,25,30,36,43,52,62,74,89,107,128,154,185,222,266,319,383,460,552,662,795,954,1145,1374,1648,1978],
    "barracks":[0,16,19,23,28,33,40,48,57,69,83,99,119,143,171,205,247,296,355,426,511,613,736,883,1060,1272],
    "stable":[0,20,24,29,35,41,50,60,72,86,103,124,149,178,214,257,308,370,444,532,639],
    "garage":[0,24,29,35,41,50,60,72,86,103,124,149,178,214,257,308],
    "church":[0,10,12,14],
    "church_f":[0,10],
    "snob":[0,512,614,737],
    "smith":[0,19,23,27,33,39,47,57,68,82,98,118,141,169,203,244,293,351,422,506,607],
    "place":[0,0],
    "statue":[0,24],
    "market":[0,10,12,14,17,21,25,30,36,43,52,62,74,89,107,128,154,185,222,266,319,383,460,552,662,795],
    "wood":[0,6,7,9,10,12,15,18,21,26,31,37,45,53,64,77,92,111,133,160,192,230,276,331,397,477,572,687,824,989,1187],
    "stone":[0,6,7,9,10,12,15,18,21,26,31,37,45,53,64,77,92,111,133,160,192,230,276,331,397,477,572,687,824,989,1187],
    "iron":[0,6,7,9,10,12,15,18,21,26,31,37,45,53,64,77,92,111,133,160,192,230,276,331,397,477,572,687,824,989,1187],
    "farm":[0,5,6,7,9,10,12,15,18,21,26,31,37,45,53,64,77,92,111,133,160,192,230,276,331,397,477,572,687,824,989],
    "storage":[0,6,7,9,10,12,15,18,21,26,31,37,45,53,64,77,92,111,133,160,192,230,276,331,397,477,572,687,824,989,1187],
    "hide":[0,5,6,7,9,10,12,15,18,21,26],
    "wall":[0,8,10,12,14,17,20,24,29,34,41,50,59,71,86,103,123,148,177,213,256]
  },

  doIt : function() {
    Settings.settings = lib.storage.getValue("settings"+ownPid,Settings.defSettings);
    Settings.userGroups = lib.storage.getValue("userGroups"+ownPid, []);
    Settings.sounds = lib.storage.getValue("sounds",Settings.defSounds);
    Settings.hotKeys = lib.storage.getValue("hotKeys",Settings.defHotKeys);
    Settings.colors = lib.storage.getValue("colors",Settings.defColors);
    if( typeof( Settings.colors.units ) == "undefined" ) {
      Settings.colors.units = {};
      var i = 0;
      for( var key in serverInfo.unitInfo ) {
        Settings.colors.units[key] = Settings.defUnitColor[key];
        i++;
      }
      if( i > 0 )
        lib.storage.setValue("colors",Settings.colors);
    }
    Settings.kataOrder = lib.storage.getValue("kataOrder"+ownPid,[]);
    if( Settings.kataOrder.length == 0 ) {
      var i = 1;
      for( var key in serverInfo.buildingInfo ) {
        if( !isOneOf(key,"church","church_f","hide") ) {
          var data = { key: key, isTarget: !isOneOf(key, "storage","wood","stone","iron") };
          if( key == "wall" )
            Settings.kataOrder.splice(0,0,data);
          else
            Settings.kataOrder.push( data );
        }
      }
      lib.storage.setValue("kataOrder"+ownPid,Settings.kataOrder);
    }
    
    Settings.buildAssist = lib.storage.getValue("buildAssist"+ownPid, Settings.buildAssist);
    Settings.recruAssist = lib.storage.getValue("recruAssist"+ownPid, Settings.recruAssist);
    
    if( Settings.recruAssist.variants.length > 0 ) {
      for( var i = 0; i < Settings.recruAssist.variants.length; i++ ) {
        if( typeof Settings.recruAssist.variants[i].keepWood != "undefined" ) {
          Settings.recruAssist.variants[i].keep_wood = Settings.recruAssist.variants[i].keepWood;
          Settings.recruAssist.variants[i].keep_stone = Settings.recruAssist.variants[i].keepStone;
          Settings.recruAssist.variants[i].keep_iron = Settings.recruAssist.variants[i].keepIron;
          Settings.recruAssist.variants[i].keep_pop = Settings.recruAssist.variants[i].freePop;
          delete Settings.recruAssist.variants[i].keepWood;
          delete Settings.recruAssist.variants[i].keepStone;
          delete Settings.recruAssist.variants[i].keepIron;
          delete Settings.recruAssist.variants[i].freePop;
        }
      }
      lib.storage.setValue("recruAssist"+ownPid, Settings.recruAssist);
    }
    
    serverInfo.unitAnz = 0;
    var bit = 1;
    for( var key in serverInfo.unitInfo ) {
      serverInfo.unitAnz++;
      if( key != "snob" && key != "militia" ) {
        serverInfo.unitInfo[key].bit = bit;
        bit <<= 1;
      }
      else
        serverInfo.unitInfo[key].bit = 0;
      if( typeof Settings.settings.map[key] == "undefined" )
        Settings.settings.map[key]="";
    }
    if( serverInfo.config ) {
      switch( serverInfo.config.game_base_config ) {
        case 1:
          serverInfo.getMining = function(level) { return Math.round((level == 0 ? 5 : Math.round(15 * Math.pow(1.1849979,(level-1)))) * serverInfo.config.speed) };
          serverInfo.getStorageSize = function(village) { var ret = 1000*Math.pow(1.23,village.buildings.storage.level-1); if( village.bonus == 9 ) ret *= 1.5; return Math.round(ret); };
          serverInfo.getHideSize = function(level) { return level == 0 ? 0 : Math.round(100*Math.pow(1.3511,level-1)); };
          serverInfo.getMaxPop = function(level) { return Math.round(240*Math.pow(1.17,level-1)); };
          break;
        case 3:
          serverInfo.getMining = function(level) { return Math.round((level == 0 ? 5 : Math.round(30 * Math.pow(1.149999,(level-1)))) * serverInfo.config.speed); };
          serverInfo.getStorageSize = function(village) { var ret = 1000*Math.pow(1.23,village.buildings.storage.level-1); if( village.bonus == 9 ) ret *= 1.5; return Math.round(ret); };
          serverInfo.getHideSize = function(level) { return level == 0 ? 0 : Math.round(100*Math.pow(1.3511,level-1)); };
          serverInfo.getMaxPop = function(level) { return Math.round(240*Math.pow(1.17,level-1)); };
          break;
        case 4:
        case 5:
        case 6:
          serverInfo.getMining = function(level) { return Math.round((level == 0 ? 5 : Math.round(30 * Math.pow(1.163118,(level-1)))) * serverInfo.config.speed) };
          serverInfo.getStorageSize = function(village) { var ret = 1000*Math.pow(1.2294934,village.buildings.storage.level-1); if( village.bonus == 9 ) ret *= 1.5; return Math.round(ret); };
          serverInfo.getHideSize = function(level) { return level == 0 ? 0 : Math.round(150*Math.pow(1.3335,level-1)); };
          serverInfo.getMaxPop = function(level) { return level == 0 ? 0 : Math.round(240*Math.pow(1.1721024,level-1)); };
          break;
        default:
          alert( texts[lib.lang].gui.unknownBaseConfig );
          return;
          break;
      }
      serverInfo.getRessource = function(village, name, ts) {
        if( village.buildings.timestamp > 0 ) {
          if( !ts )
            ts = lib.getTime();
          var mins = (ts - village.buildings.timestamp) / 60;
          var max = serverInfo.getStorageSize(village) - serverInfo.getHideSize(village.buildings.hide.level);
          var factor = 1;
          if( village["bonus"] == resInfos[name].bonus )
            factor = 2;
          else if( village["bonus"] == 8 )
            factor = 1.30;
          var minprod = serverInfo.getMining(village.buildings[name].level) / 60.0 * factor;
          return Math.min(max, Math.floor(village.res[name] + minprod * mins));
        }
        return -1;
      }
    }
    Settings.farmUnitCfg = Settings.loadFarmUnitConfig();
    
    if( lib.storage.getValue("version"+ownPid,"") != version ) {
      Settings.updateSettings();
    }
    
    if( lib.params.screen == "settings" && lib.params.mode == "settings" ) {
      Settings.updateSettings();
      var val = Settings.settings.misc.confirmQueue;
      var chk = document.getElementsByName("confirm_queue")[0];
      if( chk )
        Settings.settings.misc.confirmQueue = chk.checked;
      if( val != Settings.settings.misc.confirmQueue )
        lib.storage.setValue("settings"+ownPid,Settings.settings);
      Settings.showSettings();
      bindColorPicker();
    }
  },
  updateSettings : function() {
    for( var grp in Settings.defSettings ) {
      if( typeof Settings.settings[grp] == "undefined" )
        Settings.settings[grp] = {};
      for( var key in Settings.defSettings[grp] ) {
        if( typeof Settings.settings[grp][key] == "undefined" )
          Settings.settings[grp][key] = Settings.defSettings[grp][key];
      }
    }
    for( var grp in Settings.defHotKeys ) {
      if( typeof Settings.hotKeys[grp] == "undefined" )
        Settings.hotKeys[grp] = {};
      for( var key in Settings.defHotKeys[grp] ) {
        if( typeof Settings.hotKeys[grp][key] == "undefined" ) {
          Settings.hotKeys[grp][key] = { keyCode:0,text:"",modifier:0};
        }
      }
    }
    for( var grp in Settings.defSounds ) {
      if( typeof Settings.sounds[grp] == "undefined" )
        Settings.sounds[grp] = Settings.defSounds[grp];
    }
    if( typeof Settings.colors.ov == "undefined" ) {
      Settings.colors.ov = Settings.defColors.ov;
      lib.storage.setValue("colors", Settings.colors);
    };
    
    lib.storage.setValue("version"+ownPid,version);
    lib.storage.setValue("settings"+ownPid, Settings.settings);
    lib.storage.setValue("hotKeys", Settings.hotKeys);
    lib.storage.setValue("sounds", Settings.sounds);
  },
  showSettings : function() {
    var e = document.getElementsByTagName("h3");
    for( var i = 0; i < e.length; e++ ) {
      if( texts[lib.lang].regex.settings.test(e[i].innerHTML) ) {
        e = e[i].parentNode;
        break;
      }
    }
    var p = e.appendChild(ce("p"));
    e = p.appendChild(ce("form"));
    e.name="dsfm_settingsFrm";
    e.action = "javascript:;";
    e = e.appendChild(ce("table"));
    e.style.border = "1px solid rgb(222, 211, 185)";
    e.className = "vis";
    e.style.width = "100%";
    var row = e.insertRow(e.rows.length);
    var cell = row.appendChild(ce("th"));
    var a = cell.appendChild(ce("a"));
    a.href = texts[lib.lang].gui.forumThread;;
    a.textContent = texts[lib.lang].gui.title + " " + version;
    a.target = "_blank";
    cell.colSpan = 2;

    row = e.insertRow(e.rows.length);
    var tabsCell = row.insertCell(0);

    row = e.insertRow(e.rows.length);
    var divCell = row.insertCell(0);
    divCell.style.verticalAlign = "top";

    for( var key in texts[lib.lang].gui.settings.titles ) {
      var span = tabsCell.appendChild(ce("span"));
      span.style.paddingRight = "20px";
      var a = span.appendChild(ce("a"));
      a.href = "javascript:;";
      a.id = "dsfm_"+key;
      a.innerHTML = texts[lib.lang].gui.settings.titles[key];
      a.addEventListener("click", Settings.showTab, false);
      var tab = divCell.appendChild(ce("table"));
      tab.id = "dsfm_"+key+"_tab";
      tab.className="vis";
      tab.style.width = "100%";
      tab.style.display = "none";
      Settings["create_"+key+"Form"]();
    }

    row = e.insertRow(e.rows.length);
    cell = row.insertCell(0);
    cell.colSpan = 5;
    var input = cell.appendChild(ce("input"));
    input.type = "button";
    input.value = texts[lib.lang].gui.savebutton;
    input.name = "dsfm_save";
    input.addEventListener("click", Settings.save, false);
    input = cell.appendChild(ce("input"));
    input.type = "button";
    input.value = texts[lib.lang].gui.exportbutton;
    input.name = "dsfm_export";
    input.addEventListener("click", function() { Settings.exportPopup.show(); }, false);

    input = cell.appendChild(ce("input"));
    input.type = "button";
    input.value = texts[lib.lang].gui.importbutton;
    input.name = "dsfm_import";
    input.addEventListener("click", function() { Settings.showImpExpForm(true) }, false);
    input = cell.appendChild(ce("input"));
    input.type = "button";
    input.value = texts[lib.lang].gui.deletebutton;
    input.name = "dsfm_delete";
    input.addEventListener("click", function() { clearAllInfos(); }, false);
    
    a = cell.appendChild(ce("a"));
    a.href = texts[lib.lang].gui.forumWiki;
    a.innerHTML = "&raquo; Uitleg";
    a.target = "_blank";
    
    Settings.impExpPopup = new lib.Popup("impexp_popup","",true,600,400);
    html = '<table style="width:600px; height:400px;">';
    html += '<tr height="100%"><td><textarea onclick="this.select()" id="dsfm_impexp_report" style="width:595px; height:100%;"></textarea></td></tr>';
    html += '<tr><td id="dsfm_impexp_desc"></td></tr>';
    html += '<tr id="dsfm_impbtn_row"><td style="text-align:center"><input id="dsfm_import_btn" type="button" value="'+texts[lib.lang].gui.startimport+'"/></td></tr>';
    html += '</table>';
    Settings.impExpPopup.content.innerHTML = html;
    $("dsfm_import_btn").addEventListener("click", Settings.importData, false);

    tab = p.appendChild(document.createElement("table"));
    row = tab.insertRow(-1);
    row.insertCell(-1).innerHTML = '<a href='+ texts[lib.lang].gui.forumDonate +' target="_blank">'+texts[lib.lang].gui.donate+'</a>'; //HSX
    lib.fireEvent($("dsfm_"+lib.storage.getValue("settingsTab"+ownPid,"map")),"click");
    
    Settings.exportPopup = new lib.Popup("exportGroups",texts[lib.lang].gui.exportGroups.title,true,400,300);
    var tab = Settings.exportPopup.content.appendChild(ce("table"));
    var exportGroups = lib.storage.getValue("exportGroups"+ownPid,"serverCfg,settings,colors,hotkeys,farmUnits,userGroups,ownVillage,farminfos,variants,churches");
    for( var key in Settings.exportGroups ) {
      if( key != "churches" || serverInfo.buildingInfo.church ) {
        row = tab.insertRow(-1);
        cell = row.insertCell(-1);
        input = cell.appendChild(ce("input"));
        input.type = "checkbox";
        input.value = key;
        input.checked = exportGroups.indexOf(key+",")>-1;
        cell.appendChild(document.createTextNode(texts[lib.lang].gui.exportGroups[key]));
      }
    }
    row = tab.insertRow(-1);
    cell = row.insertCell(-1);
    input = cell.appendChild(ce("input"));
    input.type = "button";
    input.value = texts[lib.lang].gui.exportbutton;
    input.addEventListener("click",Settings.exportData,false);
  },
  create_mapForm : function() {
    var tab = $("dsfm_map_tab");
   
    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    Settings.insertCheckBox(cell,"map","rememberPos");
    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    Settings.insertCheckBox(cell,"map","redirActive");
    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    Settings.insertInput(cell,"misc","reportMaxAge",1);
    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    Settings.insertInput(cell,"map","saveHours",2);
    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    Settings.insertInput(cell,"map","sumHours",2);
    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    Settings.insertCheckBox(cell,"map","villageGroups");
    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    Settings.insertCheckBox(cell,"map","vgShowAlly");
    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    Settings.insertCheckBox(cell,"map","groupsOnTopo");
    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    Settings.insertCheckBox(cell,"map","shadowTopo");
    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    Settings.insertCheckBox(cell,"map","topoBorderOwn");

    row = tab.insertRow(-1);
    row.insertCell(-1).appendChild(ce("b")).appendChild(document.createTextNode(texts[lib.lang].gui.overlayTitle));
    row.insertCell(-1).appendChild(ce("b")).appendChild(document.createTextNode(texts[lib.lang].gui.popupTitle));

    row = tab.insertRow(-1);
    Settings.insertCheckedInput(row.insertCell(-1),"map","ageTransparency","minAgeTransparency",1);
    Settings.insertCheckBox(row.insertCell(-1),"popup","showRessis");

    row = tab.insertRow(-1);
    Settings.insertInput(row.insertCell(-1),"map","opacityMin",4);
    Settings.insertCheckBox(row.insertCell(-1),"popup","showMining");

    row = tab.insertRow(-1);
    Settings.insertInput(row.insertCell(-1),"map","opacityMaxRes",5);
    Settings.insertCheckBox(row.insertCell(-1),"popup","showBuildings");

    row = tab.insertRow(-1);
    Settings.insertCheckBox(row.insertCell(-1),"map","showRessis");
    Settings.insertCheckBox(row.insertCell(-1),"popup","showBuildingChange",true);

    row = tab.insertRow(-1);
    Settings.insertCheckBox(row.insertCell(-1),"map","playerColored");
    Settings.insertCheckBox(row.insertCell(-1),"popup","showLoyalty");

    row = tab.insertRow(-1);
    Settings.insertCheckBox(row.insertCell(-1),"map","showBars");
    Settings.insertCheckBox(row.insertCell(-1),"popup","showUnitsIn");

    row = tab.insertRow(-1);
    Settings.insertCheckBox(row.insertCell(-1),"map","showWall");
    Settings.insertCheckBox(row.insertCell(-1),"popup","showUnitsOut");

    row = tab.insertRow(-1);
    Settings.insertCheckBox(row.insertCell(-1),"map","showPoints");
    Settings.insertCheckedInput(row.insertCell(-1),"popup","showReportAge","minReportAge",2);

    
    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    cell.innerHTML = "<b>"+texts[lib.lang].gui.settings.map.defTitle+"</b>";
    
    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    var unitTab = cell.appendChild(ce("table"));
    var rowTitle = unitTab.insertRow(-1);
    row = unitTab.insertRow(-1);
    for( var key in serverInfo.unitInfo ) {
      cell = rowTitle.appendChild(ce("th"));
      cell.style.textAlign = "center";
      var img = cell.appendChild(ce("img"));
      img.title = texts[lib.lang].units[key];
      img.src = "/graphic/unit/unit_"+key+".png";
      cell = row.insertCell(-1);
      var input = cell.appendChild(ce("input"));
      input.type = "text";
      input.size = "5";
      if( !isNaN(Settings.settings.map[key]) )
        input.value = Settings.settings.map[key];
      input.name=key;
      input.id = "dsfm_map"+key;
      input.addEventListener("change", function() {
          var def = { defense: 0, defense_cavalry: 0, defense_archer: 0 };
          var inputs = this.parentNode.parentNode.getElementsByTagName("input");
          for( var i = 0; i < inputs.length; i++ ) {
            var anz = parseInt(inputs[i].value,10);
            if( isNaN(anz) ) {
              inputs[i].value = 0;
              anz = 0;
            }
            for( var key in def )
              def[key] += anz * serverInfo.unitInfo[inputs[i].name][key];
          }
          for( var key in def )
            $("dsfm_map"+key).value = def[key];
        }, false );
    }
    
    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    Settings.insertInput(cell,"map","defense");

    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    Settings.insertInput(cell,"map","defense_cavalry");

    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    Settings.insertInput(cell,"map","defense_archer");

    cell = tab.insertRow(-1).insertCell(-1);
    cell.colSpan = 2;
    Settings.createColorEdit("defense",cell);
  },
  create_placeForm  : function() {
    var tab = $("dsfm_place_tab");

    Settings.insertInput(tab.insertRow(-1).insertCell(-1),"place","minRamWall",2);
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"place","minRamsNeeded");
    
    Settings.insertInput(tab.insertRow(-1).insertCell(-1),"place","minKataLevel",2);
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"place","minKatasNeeded");
    
    var bTab = tab.insertRow(-1).insertCell(-1).appendChild(ce("table"));
    bTab.id = "dsfm_kataOrder";
    var row = bTab.insertRow(-1);
    var cell = row.appendChild(ce("th"));
    cell.colSpan = 3;
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.settings.place.kataOrderTitle[0]));
    row = bTab.insertRow(-1);
    row.appendChild(ce("th")).appendChild(document.createTextNode(texts[lib.lang].gui.settings.place.kataOrderTitle[1]));
    row.appendChild(ce("th")).appendChild(document.createTextNode(texts[lib.lang].gui.settings.place.kataOrderTitle[2]));
    row.appendChild(ce("th")).appendChild(document.createTextNode(texts[lib.lang].gui.settings.place.kataOrderTitle[3]));
    
    for( var i = 0; i < Settings.kataOrder.length; i++ ) {
      row = bTab.insertRow(-1);
      row.insertCell(-1);
      row.insertCell(-1).appendChild(document.createTextNode(texts[lib.lang].buildings[Settings.kataOrder[i].key]));
      var input = row.insertCell(-1).appendChild(ce("input"));
      input.type = "checkbox";
      input.value = Settings.kataOrder[i].key;
      input.checked = Settings.kataOrder[i].isTarget;
    }
    createPrioLinks(bTab,2,0,0);
    tab.insertRow(-1).insertCell(-1).appendChild(ce("hr"));
    Settings.insertInput(tab.insertRow(-1).insertCell(-1),"place","noReportLoad",5);
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"place","disableOnUnits");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"place","spyNoReport");
    Settings.insertCheckedInput(tab.insertRow(-1).insertCell(-1),"place","spyOlder","spyAge",3);
    Settings.insertInput(tab.insertRow(-1).insertCell(-1),"place","fakeSpys",3);
    
    tab.insertRow(-1).insertCell(-1).appendChild(ce("hr"));
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"place","showCarry");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"place","showRunTime");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"place","showArrivalTime");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"place","showRessis");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"place","showUnitsIn");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"place","showUnitsOut");
    Settings.insertCombo(tab.insertRow(-1).insertCell(-1),"place","showBuildings");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"place","showBuildingChange");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"place","showCatas");
    
    tab.insertRow(-1).insertCell(-1).appendChild(ce("hr"));
    var colTab = tab.insertRow(-1).insertCell(-1).appendChild(ce("table"));
    cell = colTab.insertRow(-1).appendChild(ce("th"));
    cell.colSpan = 3;
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.settings.place.unitStates[0]));
    row = colTab.insertRow(-1);
    row.appendChild(ce("th")).appendChild(document.createTextNode(texts[lib.lang].gui.settings.place.unitStates[1]));
    row.appendChild(ce("th")).appendChild(document.createTextNode(texts[lib.lang].gui.settings.place.unitStates[2]));
    row.appendChild(ce("th")).appendChild(document.createTextNode(texts[lib.lang].gui.settings.place.unitStates[3]));
    for( var i = 0; i < 5; i++ ) {
      row = colTab.insertRow(-1);
      row.insertCell(-1).appendChild(document.createTextNode(texts[lib.lang].gui.unitStates[i]));
      var input = row.insertCell(-1).appendChild(ce("input"));
      input.type = "text";
      input.id = "dsfm_placeUnitStateBorder"+i;
      input.size = 8;
      input.className = "dsfm_color {required:false}";
      input.value = Settings.colors.place.unitStates[i].border;

      input = row.insertCell(-1).appendChild(ce("input"));
      input.type = "text";
      input.id = "dsfm_placeUnitStateBg"+i;
      input.size = 8;
      input.className = "dsfm_color {required:false}";
      input.value = Settings.colors.place.unitStates[i].background;
    }
    tab.insertRow(-1).insertCell(-1).appendChild(ce("hr"));
    tab.insertRow(-1).insertCell(-1).appendChild(ce("b")).appendChild(document.createTextNode(texts[lib.lang].gui.settings.place.farmlist[0]+':'));
    cell = tab.insertRow(-1).insertCell(-1);
    cell.appendChild(document.createTextNode(" "+texts[lib.lang].gui.settings.place.farmlist[1]+" "));
    input = cell.appendChild(ce("input"));
    input.type="text";
    input.id = "dsfm_placeincRangeRes";
    input.size = 5;
    input.value = Settings.settings.place.incRangeRes;
    cell.appendChild(document.createTextNode(" "+texts[lib.lang].gui.settings.place.farmlist[2]+" "));
    input = cell.appendChild(ce("input"));
    input.type="text";
    input.id = "dsfm_placefarmDist";
    input.size = 2;
    input.value = Settings.settings.place.farmDist;
    cell.appendChild(document.createTextNode(" "+texts[lib.lang].gui.settings.place.farmlist[3]));
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"place","colorFLRes");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"place","minLoad");
    Settings.insertInput(tab.insertRow(-1).insertCell(-1),"place","maxAttAge",2);
    Settings.insertInput(tab.insertRow(-1).insertCell(-1),"place","minEQ",2);
    
    tab.insertRow(-1).insertCell(-1).appendChild(ce("hr"));
    tab.insertRow(-1).insertCell(-1).appendChild(ce("b")).appendChild(document.createTextNode(texts[lib.lang].gui.settings.place.confirmTitle));
    Settings.insertCombo(tab.insertRow(-1).insertCell(-1),"place","okOnPlayer");
    row = tab.insertRow(-1);
    cell = row.insertCell(-1);
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.settings.place.confirmTitleBgColor[0]+" "));
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.settings.place.confirmTitleBgColor[1]+": "));
    input = cell.appendChild(ce("input"));
    input.type = "text";
    input.id = "dsfm_placeConfirmBgAttack";
    input.size = 8;
    input.className = "dsfm_color {required:false}";
    input.value = Settings.colors.place.confirmTitle.attack;
    cell.appendChild(document.createTextNode(" "+texts[lib.lang].gui.settings.place.confirmTitleBgColor[2]+": "));
    input = cell.appendChild(ce("input"));
    input.type = "text";
    input.id = "dsfm_placeConfirmBgSupport";
    input.size = 8;
    input.className = "dsfm_color {required:false}";
    input.value = Settings.colors.place.confirmTitle.support;
  },
  create_hotKeysForm : function() {
    var tab = $("dsfm_hotKeys_tab");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"misc","useHotKeys");
    for( var grp in texts[lib.lang].gui.hotKeyLabels ) {
      var row = tab.insertRow(tab.rows.length);
      var cell = row.appendChild(ce("th"));
      cell.colSpan = 4;
      cell.innerHTML = texts[lib.lang].gui.hotKeyLabels[grp].title;
      for( var hk in texts[lib.lang].gui.hotKeyLabels[grp].hks ) {
        row = tab.insertRow(tab.rows.length);
        cell = row.insertCell(0);
        if( hk.substring(0,5) == "title" ) {
          cell.colSpan = 4;
          cell.innerHTML = texts[lib.lang].gui.hotKeyLabels[grp].hks[hk];
          cell.style.fontWeight = "bold";
        }
        else {
          var input = cell.appendChild(ce("input"));
          input.id = "dsfm_hk_"+grp+"_"+hk;
          input.type = "text";
          input.size = 20;
          input.value = Settings.hotKeys[grp][hk].text;
          input.addEventListener("keypress",Settings.keyPressHandler,false);
          input.addEventListener("keyup",Settings.keyUpHandler,false);
          input.addEventListener("keydown",Settings.keyDownHandler,false);

          input = cell.appendChild(ce("input"));
          input.id = "dsfm_hk_"+grp+"_"+hk+"_modifier";
          input.type = "hidden";
          input.value = Settings.hotKeys[grp][hk].modifier;
          input = cell.appendChild(ce("input"));
          input.id = "dsfm_hk_"+grp+"_"+hk+"_keyCode";
          input.type = "hidden";
          input.value = Settings.hotKeys[grp][hk].keyCode;
          input = cell.appendChild(ce("a"));
          input.href = "javascript:;";
          input.innerHTML = "X";
          input.style.color = "red";
          input.style.fontWeight = "bold";
          input.title = texts[lib.lang].gui.delHotkey;
          input.addEventListener("click",function() { var inputs = this.parentNode.getElementsByTagName("input"); inputs[0].value = ""; input[1].value = 0; input[2].value = 0; }, false);
          cell = row.insertCell(1);
          cell.colSpan = 3;
          cell.innerHTML = texts[lib.lang].gui.hotKeyLabels[grp].hks[hk];
        }
      }
    }
  },
  create_unitsForm : function() {
    var anz = 0;
    for( var key in serverInfo.unitInfo )
      if( serverInfo.unitInfo[key].bit > 0 )
        anz++;
    var tabCfg = $("dsfm_units_tab");
    tabCfg.className="vis";
    tabCfg.style.width = "100%";
    var row = tabCfg.insertRow(tabCfg.rows.length);
    var cell = row.appendChild(ce("th"));
    cell.innerHTML = texts[lib.lang].gui.unitGroups;

    row = tabCfg.insertRow(tabCfg.rows.length);
    cell = row.insertCell(0);
    tab = cell.appendChild(ce("table"));
    tab.id="dsfm_unitgrpconfig";
    tab.style.width = "100%";
    row = tab.insertRow(tab.rows.length);
    cell = row.appendChild(ce("th"));
    cell.innerHTML = texts[lib.lang].gui.priority;
    cell = row.appendChild(ce("th"));
    cell.innerHTML = texts[lib.lang].gui.groupName;
    for( var key in serverInfo.unitInfo ) {
      if( serverInfo.unitInfo[key].bit > 0 && key != "spy") {
        cell = row.appendChild(ce("th"));
        cell.style.textAlign = "center";
        cell.innerHTML = '<img src="graphic/unit/unit_'+key+'.png" alt="'+texts[lib.lang].units[key]+'" title="'+texts[lib.lang].units[key]+'"/>';
      }
    }
    cell = row.appendChild(ce("th"));
    cell.innerHTML = "X";
    cell.style.fontWeight = "bold";
    cell.style.color = "red";
    row = tab.insertRow(tab.rows.length);
    cell = row.insertCell(0);
    cell.colSpan = anz + 3;
    cell.style.textAlign="center";
    input = cell.appendChild(ce("input"));
    input.type = "button";
    input.value = texts[lib.lang].gui.newGroup;
    input.addEventListener("click", function() { var tab = this.parentNode.parentNode.parentNode; Settings.appendGroup(tab,texts[lib.lang].gui.newGroup,0); createPrioLinks(tab,1,1,0); }, false );

    for( var i = 0; i < Settings.farmUnitCfg.groups.length; i++ ) {
      Settings.appendGroup(tab,Settings.farmUnitCfg.groups[i].name,Settings.farmUnitCfg.groups[i].units);
    }
    createPrioLinks(tab,1,1,0);

    row = tabCfg.insertRow(tabCfg.rows.length);
    cell = row.appendChild(ce("th"));
    cell.innerHTML = texts[lib.lang].gui.minUnits;

    row = tabCfg.insertRow(-1);
    cell = row.insertCell(0);
    tab = cell.appendChild(ce("table"));
    tab.id="dsfm_minunits";
    tab.style.width = "100%";
    var rowTitle = tab.insertRow(-1);
    row = tab.insertRow(-1);
    for( var key in Settings.farmUnitCfg.minUnits ) {
      if( key.indexOf("_") == -1 ) {
        cell = rowTitle.appendChild(ce("th"));
        cell.style.textAlign = "center";
        var img = cell.appendChild(ce("img"));
        img.src = "graphic/unit/unit_"+key+".png";
        img.alt = texts[lib.lang].units[key];
        img.title = texts[lib.lang].units[key];
        cell = row.insertCell(row.cells.length);
        cell.style.textAlign = "center";
        input = cell.appendChild(ce("input"));
        input.type = "text";
        input.name=key;
        input.style.width = "30px";
        input.value = Settings.farmUnitCfg.minUnits[key];
      }
    }
    for( var key in Settings.farmUnitCfg.minUnits ) {
      if( key.indexOf("_" ) > -1 ) {
        cell = row.insertCell(row.cells.length);
        cell.style.textAlign = "center";
        input = cell.appendChild(ce("input"));
        input.type = "text";
        input.name=key;
        input.size = 4;
        input.value = Settings.farmUnitCfg.minUnits[key];
        cell = rowTitle.appendChild(ce("th"));
        cell.style.textAlign = "center";
        var units = key.split("_");
        for( var i = 0; i < units.length; i++ ) {
          var img = cell.appendChild(ce("img"));
          img.src = "graphic/unit/unit_"+units[i]+".png";
          img.alt = texts[lib.lang].units[units[i]];
          img.title = texts[lib.lang].units[units[i]];
        }
      }
    }

    row = tabCfg.insertRow(tabCfg.rows.length);
    cell = row.appendChild(ce("th"));
    cell.innerHTML = texts[lib.lang].gui.stayOrderTitle;
    row = tabCfg.insertRow(tabCfg.rows.length);
    cell = row.insertCell(0);
    tab = cell.appendChild(ce("table"));
    tab.id="dsfm_stayNOrder";
    tab.style.width = "100%";
    row = tab.insertRow(tab.rows.length);
    cell = row.appendChild(ce("th"));
    cell.innerHTML = texts[lib.lang].gui.priority;
    cell = row.appendChild(ce("th"));
    cell.innerHTML = texts[lib.lang].gui.unit;
    cell = row.appendChild(ce("th"));
    cell.innerHTML = texts[lib.lang].gui.stayUnits;
    cell = row.appendChild(ce("th"));
    cell.innerHTML = texts[lib.lang].gui.maxTime;
    cell = row.appendChild(ce("th"));
    cell.innerHTML = texts[lib.lang].gui.unitColor;
    cell = row.appendChild(ce("th"));
    cell.innerHTML = texts[lib.lang].gui.unitMax;

    var withload = 1;
    for( var key in Settings.farmUnitCfg.stayNOrder) {
      var idx = tab.rows.length;
      if( serverInfo.unitInfo[key].bit > 0 && serverInfo.unitInfo[key].carry > 0 )
        idx = withload++;
      row = tab.insertRow(idx);
      Settings.createConfigRow(row,key);
    }
    row = tab.insertRow(tab.rows.length);
    Settings.createConfigRow(row,"snob");
    createPrioLinks(tab,1,tab.rows.length-withload,0);
  },
  create_storageForm : function() {
    var tab = $("dsfm_storage_tab");
    tab.insertRow(-1).insertCell(-1).appendChild(ce("b")).appendChild(document.createTextNode(texts[lib.lang].gui.settings.storage.titleHead));
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"storage","titleResColored");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"storage","titleFarmColored");
    tab.insertRow(-1).insertCell(-1).appendChild(ce("b")).appendChild(document.createTextNode(texts[lib.lang].gui.settings.storage.titleCoins));
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"storage","modSnob");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"storage","snobResColored");
    var row = tab.insertRow(-1);
    var cell = row.insertCell(0);
    Settings.createColorEdit("resource",cell);
    row = tab.insertRow(-1);
    cell = row.insertCell(0);
    Settings.createColorEdit("farm",cell);
  },
  create_reportForm : function() {
    var tab = $("dsfm_report_tab");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"report","enableReorder");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"report","showBPs");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"report","showSurvivors");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"report","showLostCost");
  },
  create_miscForm : function() {
    var tab = $("dsfm_misc_tab");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"misc","coordSelector");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"misc","newLineSort");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"misc","navBarSwitcher");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"misc","removeAMIcons");
    Settings.insertCombo(tab.insertRow(-1).insertCell(-1),"misc","slSwitcher");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"misc","fixHead");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"misc","runTimeToolTips");
    Settings.insertInput(tab.insertRow(-1).insertCell(-1),"misc","rtttDelay",1);
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"misc","ctxCtrl");
    Settings.insertCombo(tab.insertRow(-1).insertCell(-1),"misc","moveAtts");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"misc","privateNames");
  },
  create_prodForm : function() {
    var tab = $("dsfm_prod_tab");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"prod","runtimeCol");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"prod","resColored");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"prod","farmColored");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"prod","farmTotal");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"prod","removeBuildTime");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"prod","showSums");
    Settings.insertCombo(tab.insertRow(-1).insertCell(-1),"prod","shrinkRecruitmentMode");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"prod","showRecruitSums");
  },
  create_buildAssistForm : function() {
    var tab = $("dsfm_buildAssist_tab");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"build","showOVLoyalty");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"build","showMissingRes");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"build","enhancedOV");
    var row = tab.insertRow(-1);
    var cell = row.insertCell(-1);
    cell.appendChild(document.createTextNode(" "+texts[lib.lang].gui.settings.build.toBuildColor+": "));
    input = cell.appendChild(ce("input"));
    input.type = "text";
    input.id = "dsfm_buildToBuild";
    input.size = 8;
    input.className = "dsfm_color {required:false}";
    input.value = Settings.colors.ov.buildings.toBuild;
    
    row = tab.insertRow(-1);
    cell = row.insertCell(-1);
    cell.appendChild(document.createTextNode(" "+texts[lib.lang].gui.settings.build.toDestroyColor+": "));
    input = cell.appendChild(ce("input"));
    input.type = "text";
    input.id = "dsfm_buildToDestroy";
    input.size = 8;
    input.className = "dsfm_color {required:false}";
    input.value = Settings.colors.ov.buildings.toDestroy;

    row = tab.insertRow(-1);
    cell = row.insertCell(-1);
    cell.appendChild(document.createTextNode(" "+texts[lib.lang].gui.settings.build.queueCostColor+": "));
    input = cell.appendChild(ce("input"));
    input.type = "text";
    input.id = "dsfm_buildQueueCost";
    input.size = 8;
    input.className = "dsfm_color {required:false}";
    input.value = Settings.colors.ov.buildings.queueCost;
    
    var fields = [];
    for( var key in serverInfo.buildingInfo )
      fields.push( { img: "graphic/buildings/" + key.replace("_f", "") + ".png", 
                     title: texts[lib.lang].buildings[key], 
                     key: key, 
                     minVal: serverInfo.buildingInfo[key].min_level, 
                     maxVal: serverInfo.buildingInfo[key].max_level, 
                     newVal: serverInfo.buildingInfo[key].max_level } );
    var calcedFields = [ {title: texts[lib.lang].gui.points, propName: "points"}, {title:texts[lib.lang].gui.population,propName:"pop"} ];
    Settings.variantEdit.buildAssist = new VariantEdit(tab,fields,"25px","buildAssist",calcedFields,BuildAssist.updateVariantValues);
  },
  create_recruitForm : function() {
    var tab = $("dsfm_recruit_tab");

    Settings.insertCombo(tab.insertRow(-1).insertCell(-1),"recruit","drillQueueMode");
    Settings.insertCombo(tab.insertRow(-1).insertCell(-1),"recruit","shrinkRecruitmentMode");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"recruit","shrinkSmallOnly");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"recruit","showRecruitSums");
    Settings.insertCheckBox(tab.insertRow(-1).insertCell(-1),"recruit","showRecruitTotal");

    var fields = [];
    for( var key in serverInfo.unitInfo ) {
      if( key != "snob" && key != "knight" && key != "militia" ) {
        fields.push( { img: "graphic/unit/unit_" + key + ".png", 
                       title: texts[lib.lang].units[key],
                       key: key, 
                       minVal: 0, 
                       maxVal: 999999, 
                       newVal: 0 } );
      }
    }
    fields.push( { title: texts[lib.lang].gui.keep_pop, key: "keep_pop", minVal: 0 , maxVal: 24000, newVal: 0 } );
    fields.push( { title: texts[lib.lang].resources.wood, key: "keep_wood", minVal: 0 , maxVal: 999999, newVal: 0 } );
    fields.push( { title: texts[lib.lang].resources.stone, key: "keep_stone", minVal: 0 , maxVal: 999999, newVal: 0 } );
    fields.push( { title: texts[lib.lang].resources.iron, key: "keep_iron", minVal: 0 , maxVal: 999999, newVal: 0 } );
    var calcedFields = [ {title:texts[lib.lang].gui.population,propName:"pop"} ];
    Settings.variantEdit.recruAssist = new VariantEdit(tab,fields,"40px","recruAssist",calcedFields,Recruitment.updateVariantValues);
  },
  create_soundsForm : function() {
    var stest = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAANuSURBVHjaXNO9bxtlAMfx3z3P2Wf77MTUzvklidOXNAMgRUqcCqQGMbEwgIqqspS5XVgQ4l9gQJUYKgESExKIDgy8DEBUoENTSOIEpbYDJE5qR+f4bN+de8nd47t77mEoE9/t+wd8pM8+/QQAEAYh/DB4aczYbd/3rzDG0pZpGn/vNdca9cd3K3Pn28+/8CLCMIQQAmEYgHMOGQAkSYIA3g2D4KNCoRDLZDIYj8c46XZnCsXi0kxl7p3Dg/33hRBPADgR53UhRAAAMqUUYcivy5R8vLq6CsYYnKcO8vkpLC4uolFvgHNeVBTli5gsY2JyMgJQOzps3eKcb8myLGeDILizvLSM2nYNRq+HicksEgkFqVQK1eoKEkkFD357AMs0cWl+nnDOq6qqfrO1ufEyYYy9deH8hZnd3V0YhoGZ2VmUyyWUyiWcy+Ww8cfvmL+8gIsXLyESApZlIa4oKBaLlVwuf5tQQl6HBHSOOygWS8hMZJBOp5HNPgdZlqHrXTx6uI6VKytQVRW9kxPk83mEnKM8XX6NJJPJBdseIRaLI5lKQokrSKkqkskUurqO6koVrueCUgpN0+A4DszhEJ12G5Zll2RCaYaxMSRCceYyREKCRGXE4wp2ajV0dR17zSYWLi9A0zTsbNewubkBSihc1x2RwPd9QinGAcfY9xGPx5BOq8jlctA0DV9/9SX+3N7CaGRDSSTAeQTbsjAa2TB6J2uy4zi6VijOJ2IUU+eySCoKLMtGRk3j+o0bgCThr2YDE5OT0HUdnIfwXBeMeX3P9e7IpmU9LE9Pv0IpgWU/xcAaQZvKw/fHcBwJb167BqN3Fel0GsedDjzXg9E7MSMh3qaEdIjv+/e6uh6VymV0e32ISECJybBtG8PhEO0nbXiei8Ggj+PjYwz6xg5j7FVCyH1JkkA459sHrdY9SQhMl4oYe2cwLQu2baPfN2CaQ2haAb/+ch+Dfj80zeHNKIp2wyBAEAQgnuuCc/7eo/X1QyVGUKnMIgo5GGNIqSrm5ubww/ffoVFvoNM5+lAI8TgIApydnsJxHNDq8hKiKHI45z/v7/+z6p6dFVRVhUwp+oaBtZ9+RKNeR/vo8O7IHn1AKRV4JhCSJD3T+N83JIlcbR20bu01m2+EYVjxXM8/PXXqg77xOWPet5RS/L9/BwDYGsraJJa3swAAAABJRU5ErkJggg==';
    document.body.appendChild(ce("audio")).id="dsfm_audio";
    var tab = $("dsfm_sounds_tab");
    
    tab = tab.insertRow(-1).insertCell(-1).appendChild(ce("table"));
    tab.id = "dsfm_sounds_vals";
    var row = tab.insertRow(-1);
    cell = row.appendChild(ce("th"));
    row.appendChild(ce("th")).innerHTML = texts[lib.lang].gui.settings.sounds.url;
    row.appendChild(ce("th")).innerHTML = texts[lib.lang].gui.settings.sounds.volume;
    row.appendChild(ce("th")).innerHTML = texts[lib.lang].gui.settings.sounds.loop;
    
    for( var key in Settings.sounds ) {
      row = tab.insertRow(-1);    
      cell = row.insertCell(-1);
      input = cell.appendChild(ce("input"));
      input.type = "checkbox"
      input.checked = Settings.sounds[key].active;
      cell.appendChild(document.createTextNode(texts[lib.lang].gui.settings.sounds[key]));
      cell = row.insertCell(-1);
      input = cell.appendChild(ce("input"));
      input.type = "text";
      input.value = Settings.sounds[key].url;
      input.size=10;
      input = cell.appendChild(ce("a"));
      input.href = "javascript:;";
      input.appendChild(ce("img")).src = stest;
      input.addEventListener("click",function(e) { var inputs = this.parentNode.parentNode.getElementsByTagName("input"); var audio = new Audio(); audio.src=inputs[1].value; audio.volume = Math.min(parseInt(inputs[2].value)/100,1); audio.play(); }, false );
      cell = row.insertCell(-1);
      input = cell.appendChild(ce("input"));
      input.type = "text";
      input.size = "4";
      input.value = Settings.sounds[key].volume;
      cell = row.insertCell(-1);
      input = cell.appendChild(ce("input"));
      input.type = "checkbox";
      input.checked = Settings.sounds[key].loop;
    }
  },
  insertCheckBox : function(parent,grp,key) {
    var input = parent.appendChild(ce("input"));
    input.type = "checkbox";
    input.id = "dsfm_"+grp+key;
    input.checked = Settings.settings[grp][key];
    parent.appendChild(document.createTextNode(texts[lib.lang].gui.settings[grp][key]));
  },
  insertInput : function(parent,grp,key,size) {
    var input = ce("input");
    input.type = "text";
    input.id = "dsfm_"+grp+key;
    if( size )
      input.size = size;
    input.value = Settings.settings[grp][key];
    if( typeof( texts[lib.lang].gui.settings[grp][key] ) == "string" ) {
      parent.appendChild(document.createTextNode(texts[lib.lang].gui.settings[grp][key]+" "));
      parent.appendChild(input);
    }
    else {
      parent.appendChild(document.createTextNode(texts[lib.lang].gui.settings[grp][key][0]+" "));
      parent.appendChild(input);
      parent.appendChild(document.createTextNode(" " + texts[lib.lang].gui.settings[grp][key][1]));
    }
  },
  insertCheckedInput : function(parent,grp,keyChk,keyVal,size) {
    var input = parent.appendChild(ce("input"));
    input.type = "checkbox";
    input.id = "dsfm_"+grp+keyChk;
    input.checked = Settings.settings[grp][keyChk];
    Settings.insertInput(parent,grp,keyVal,size);
  },
  insertCombo : function(parent,grp,key) {
    parent.appendChild(document.createTextNode(texts[lib.lang].gui.settings[grp][key][0] + ': '));
    var select = parent.appendChild(ce("select"));
    select.id = "dsfm_"+grp+key;
    select.size = 1;
    for( var i = 0; i < texts[lib.lang].gui.settings[grp][key].length-1; i++ ) {
      //sake-->
      //select.options[i] = new Option(texts[lib.lang].gui.settings[grp][key][i+1], i, false, false);
      select.options.add( new Option(texts[lib.lang].gui.settings[grp][key][i+1], i, false, false) );
      //sake<--
    };
    select.value = Settings.settings[grp][key];
  },
  keyDownHandler : function(e) {
    Settings.keyDown = 0;
    if( !(e.keyCode >= 16 && e.keyCode <= 18))
      Settings.keyDown = e.keyCode;
    Settings.keyPress = "";
    //e.stopPropagation();
    //e.preventDefault();
  },
  keyPressHandler : function(e) {
    Settings.keyPress = "";
    if( e.charCode > 0 )
      Settings.keyPress = String.fromCharCode(e.charCode).toUpperCase();
    e.stopPropagation();
    e.preventDefault();
  },
  keyUpHandler : function(e) {
    if( !(e.keyCode >= 16 && e.keyCode <= 18) && e.keyCode == Settings.keyDown ) {
      var mod = HotKeys.getModifierKeys(e);
      var modInput = $(this.id+"_modifier");
      var kcInput = $(this.id+"_keyCode");
      modInput.value = mod.val;
      kcInput.value = e.keyCode;
      if( Settings.keyPress.length == 0 || texts[lib.lang].gui.keys[e.keyCode]) {
        if( texts[lib.lang].gui.keys[e.keyCode] )
          this.value = " [" + mod.text + texts[lib.lang].gui.keys[e.keyCode] +"]";
        else {
          this.value = "";
          modInput.value = 0;
          kcInput.value = 0;
        }
      }
      else
        this.value = " ["+mod.text + Settings.keyPress+"]";
      if( this.value != "0" ) {
        var parts = this.id.split("_");
        for( var hk in Settings.hotKeys[parts[2]] ) {
          if( hk != parts[3] ) {
            var modInputHK = $("dsfm_hk_"+parts[2]+"_"+hk+"_modifier");
            var kcInputHK = $("dsfm_hk_"+parts[2]+"_"+hk+"_keyCode");
            if( modInputHK.value == modInput.value && kcInputHK.value == kcInput.value ) {
              modInputHK.value = 0;
              kcInputHK.value = 0;
              $("dsfm_hk_"+parts[2]+"_"+hk).value = "";
            }
          }
        }
      }
    }
    Settings.keyDown = 0;
    Settings.keyPress = "";
    e.stopPropagation();
    e.preventDefault();
  },
  showTab : function() {
    var tab = this.parentNode.parentNode.parentNode.parentNode;
    var curTab = tab.getElementsByClassName("selected")[0];
    if( curTab )
      curTab = curTab.firstChild;
    if( !curTab || this.id != curTab.id ) {
      if( curTab ) {
        curTab.parentNode.className = "";
        $(curTab.id+"_tab").style.display = "none";
      }
      this.parentNode.className = "selected";
      $(this.id+"_tab").style.display = "";
      lib.storage.setValue("settingsTab"+ownPid,this.id.substr(5));
    }
  },
  showImpExpForm : function(isImport) {
    Settings.impExpPopup.setTitle(texts[lib.lang].gui.title + " - " + (isImport ? texts[lib.lang].gui.importTitle : texts[lib.lang].gui.exportTitle));
    $("dsfm_impexp_report").innerHTML = "";
    $("dsfm_impbtn_row").style.display = isImport ? "" : "none";
    Settings.impExpPopup.show();
  },
  importData : function() {
    var lines = $("dsfm_impexp_report").value.replace(/\r\n/g,"\n").replace(/\n\r/g,"\n").split("\n");
    if( lines[0] == "hpxdsasexp" ) {      
      //HS _ SE 002-->     
      var partA = lines[1].split('-');
      if (partA == '8.0.1.0.0IA' || partA == '8.0.1.0.0') {
        var dsaTechnischeVersionImport = 1; //Falls alte Version nach alter Versionierung. Diese ist identisch mit der technischen Version 1
      } else {
        if (typeof partA[1] != 'undefined') {
          var dsaTechnischeVersionImport = parseInt(partA[1].split(".")[0],10);
        } else {
          var dsaTechnischeVersionImport = 0;
        };
      };
      if( dsaTechnischeVersionImport == 1) {
      //HS _ SE 002<--
        if( lines[2] == lib.server ) {
          if( lines[lines.length-1] != "hpxdsasexp" )
            alert(texts[lib.lang].gui.incompleteExp);
          for( var i = 2; i < lines.length; i++ ) {
            var parts = lines[i].split(":");
            if( parts.length > 1 ) {
              var name = parts[0];
              parts = parts.splice( 1 );
              var value = parts.join(":");
              if( /\d{1,3}_\d{1,3}/.test(name) ) {
                var curVil = new Village(name);
                var impVil = new Village(name,value);
                impVil.fromString(value);
                curVil.merge(impVil);
                curVil.save();
              }
              else if( /^vil\d+$/.test(name) ) {
                var id = name.substring(3);
                var curVil = new MyVillage(id);
                var impVil = new MyVillage(id,value);
                curVil.merge(impVil);
                curVil.save();
              }
              else if( name == "rids" ) {
                var cur = lib.storage.getValue(name,"");
                var imp = value.split(";");
                for( var j = 0; j < imp.length; j++ ) {
                  if( cur.indexOf(imp[j]) == -1 )
                    cur += imp[j]+";";
                }
                lib.storage.setValue(name,cur);
              }
              else
                lib.storage.setString(name,value);
            }
          }
          lib.storage.setValue("version"+ownPid,"");
          alert( texts[lib.lang].gui.importDone );
          $("dsfm_impexp_div").style.display="none";
          $("dsfm_shadow_div").style.display="none";
        }
        else
          alert(texts[lib.lang].gui.wrongworld);
      }
      else
        alert( texts[lib.lang].gui.unsupportedVersion );
    }
    else {
      alert( texts[lib.lang].gui.wrongFormat );
    }
  },
  exportData : function() {
    var str = "hpxdsasexp\n"+version+"\n"+lib.server+"\n";
    var inputs = Settings.exportPopup.content.getElementsByTagName("input");
    var re = "";
    var groups = "";
    for( var i = 0;  i < inputs.length - 1; i++ ) {
      if( inputs[i].checked ) {
        if( re.length > 0 )
          re+= "|";
        re += Settings.exportGroups[inputs[i].value];
        groups += inputs[i].value+",";
      }
    }
    lib.storage.setValue("exportGroups"+ownPid,groups);
    Settings.exportPopup.hide();
    var vals = lib.storage.listValues("^"+re+"$");
    for(var i = 0; i < vals.length; i++ )
      str += vals[i]+":"+lib.storage.getString(vals[i])+"\n";
    str += "hpxdsasexp";
    var div = $("dsfm_impexp_div");
    Settings.showImpExpForm(false);
    $("dsfm_impexp_report").value = str;
  },
  save : function() {
    Settings.saveSettings();
    Settings.saveFarmUnitConfig();
    Settings.variantEdit.buildAssist.save();
    Settings.variantEdit.recruAssist.save();
    alert( texts[lib.lang].gui.settingsSaved );
  },
  saveSettings : function() {
    for( var grp in Settings.settings ) {
      if( grp != "hotKeys" ) {
        for( var key in Settings.settings[grp] ) {
          var input = $("dsfm_"+grp+key);
          if( !input ) {
            if( !(grp == "storage" && key == "colors") )
              delete Settings.settings[grp][key];
          }
          else {
            if( input.type == "checkbox" )
              Settings.settings[grp][key] = input.checked;
            else {
              Settings.settings[grp][key] = parseInt(input.value, 10);
              if( isNaN(Settings.settings[grp][key]) )
                Settings.settings[grp][key] = 0;
            }
          }
        }
      }
    }
    var tab = $("dsfm_sounds_vals");
    var row = 1;
    for( var key in Settings.sounds ) {
      if( key != "active" ) {
        var inputs = tab.rows[row++].getElementsByTagName("input");
        Settings.sounds[key].active = inputs[0].checked;
        Settings.sounds[key].url = inputs[1].value;
        Settings.sounds[key].volume = Math.min(parseInt(inputs[2].value,10),100);
        Settings.sounds[key].loop = inputs[3].checked;
      }
    }
    for( var grp in Settings.hotKeys ) {
      for( var hk in Settings.hotKeys[grp] ) {
        var input = $("dsfm_hk_"+grp+"_"+hk);
        if( input ) {
          Settings.hotKeys[grp][hk].text = input.value;
          Settings.hotKeys[grp][hk].keyCode = parseInt($("dsfm_hk_"+grp+"_"+hk+"_keyCode").value,10);
          Settings.hotKeys[grp][hk].modifier = parseInt($("dsfm_hk_"+grp+"_"+hk+"_modifier").value,10);
        }
      }
    }
    Settings.colors.range.defense_cavalry = Settings.colors.range.defense;
    Settings.colors.range.defense_archer = Settings.colors.range.defense;
    lib.storage.setValue("settings"+ownPid,Settings.settings);
    lib.storage.setValue("sounds",Settings.sounds);
    lib.storage.setValue("hotKeys",Settings.hotKeys);
    for( var i = 0; i < 5; i++ ) {
      Settings.colors.place.unitStates[i].border = $("dsfm_placeUnitStateBorder"+i).value;
      Settings.colors.place.unitStates[i].background = $("dsfm_placeUnitStateBg"+i).value;
    }
    Settings.colors.place.confirmTitle.attack = $("dsfm_placeConfirmBgAttack").value;
    Settings.colors.place.confirmTitle.support = $("dsfm_placeConfirmBgSupport").value;
    Settings.colors.ov.buildings.toBuild = $("dsfm_buildToBuild").value;
    Settings.colors.ov.buildings.toDestroy = $("dsfm_buildToDestroy").value;
    Settings.colors.ov.buildings.queueCost = $("dsfm_buildQueueCost").value;
    lib.storage.setValue("colors",Settings.colors);
    var tab = $("dsfm_kataOrder");
    Settings.kataOrder = [];
    for( var i = 2; i < tab.rows.length; i++ ) {
      var input = tab.rows[i].cells[2].firstChild;
      Settings.kataOrder.push( { key: input.value, isTarget: input.checked } );
    }
    lib.storage.setValue("kataOrder"+ownPid,Settings.kataOrder);
  },
  loadFarmUnitConfig : function() {
    var farmUnitCfg = lib.storage.getValue("farmUnitCfg"+ownPid);
    if( !farmUnitCfg ) {
      var defGraphMax = { spear: 5000, sword: 5000, axe: 5000, archer: 5000, spy: 500, light: 3000, marcher:  500, heavy: 1000,  ram: 300, catapult:  200, knight: 1, snob: 4 };
      farmUnitCfg = { groups: [], minUnits: {}, stayNOrder: {}, graphMax: {} };
      var bits = 0;
      for( var key in serverInfo.unitInfo )
        bits |= serverInfo.unitInfo[key].bit;
      farmUnitCfg.groups.push( { name: texts[lib.lang].gui.all, units: bits } );

      var units = [];
      for( var key in serverInfo.unitInfo ) {
        if( serverInfo.unitInfo[key].bit > 0 )
          units.push( { name: key, speed: serverInfo.unitInfo[key].speed, carry: serverInfo.unitInfo[key].carry } );
        farmUnitCfg.graphMax[key] = defGraphMax[key];
      }
      var speed = 0;
      var key = "";
      units.sort( function(a,b) { return b.speed-a.speed; } );
      for( var i = 0; i < units.length; i++ ) {
        if( speed != units[i].speed ) {
          if( speed > 0 )
            farmUnitCfg.minUnits[key] = 0;
          speed = units[i].speed;
          key = "";
        }
        if( key.length > 0 )
          key += "_";
        key += units[i].name;
        farmUnitCfg.minUnits[units[i].name] = 0;
      }
      if( key.indexOf("_") > -1 )
        farmUnitCfg.minUnits[key] = 0;
      for( i = 0; i < units.length; i++ )
        farmUnitCfg.stayNOrder[units[i].name] = { stay: 0, maxTime: 0 };
    }
    if( farmUnitCfg.minUnits.spy == 0 )
      farmUnitCfg.minUnits.spy = 1;
    return farmUnitCfg;
  },
  saveFarmUnitConfig : function() {
    var tab = $("dsfm_unitgrpconfig");
    Settings.farmUnitCfg = { groups: [], minUnits: {}, stayNOrder: {}, graphMax: {} };
    for( var i = 1; i < tab.rows.length-1; i++ ) {
      var units = 0;
      for( var c = 2; c < tab.rows[i].cells.length-1; c++ ) {
        var chk = tab.rows[i].cells[c].firstChild;
        if( chk.checked )
          units |= parseInt(chk.value,10);
      }
      if( serverInfo.unitInfo.spy )
        units |= serverInfo.unitInfo.spy.bit;
      Settings.farmUnitCfg.groups.push( { name: tab.rows[i].cells[1].firstChild.value.replace(/\\/g, "\\\\") .replace(/"/g,"\\\""), units: units } );
    }
    tab = $("dsfm_minunits");
    for( var i = 0; i < tab.rows[1].cells.length; i++ ) {
      var input = tab.rows[1].cells[i].firstChild;
      var val = parseInt(input.value,10);
      if( isNaN(val) )
        val = 0;
      Settings.farmUnitCfg.minUnits[input.name] = val;
    }
    tab = $("dsfm_stayNOrder");
    for( var i = 1; i < tab.rows.length; i++ ) {
      var input = tab.rows[i].cells[2].firstChild;
      if( input ) {
        var stay = parseInt(input.value,10);
        if( isNaN(stay) )
          stay = 0;
      }
      input = tab.rows[i].cells[3].firstChild;
      if( input ) {
        var maxTime = 0;
        var parts = input.value.split(":");
        maxTime = parseInt(parts[0],10)*60;
        maxTime += parseInt(parts[1],10);
        if( isNaN(maxTime) )
          maxTime = 0;
        Settings.farmUnitCfg.stayNOrder[input.name] = { stay: stay, maxTime: maxTime }
      }
      var inputCol = tab.rows[i].cells[4].firstChild;
      var inputMax = tab.rows[i].cells[5].firstChild;
      Settings.farmUnitCfg.graphMax[inputCol.name] = parseInt(inputMax.value,10);
      Settings.colors.units[inputCol.name] = inputCol.value;
    }
    lib.storage.setValue("farmUnitCfg"+ownPid,Settings.farmUnitCfg);
  },
  createConfigRow : function(row,key) {
    var cell = row.insertCell(row.cells.length);
    cell = row.insertCell(row.cells.length);
    var img = cell.appendChild(ce("img"));
    img.src = "graphic/unit/unit_"+key+".png";
    img.alt = texts[lib.lang].units[key];
    img.title = texts[lib.lang].units[key];
    cell.appendChild(document.createTextNode(texts[lib.lang].units[key]));
    cell = row.insertCell(row.cells.length);
    if( Settings.farmUnitCfg.stayNOrder[key] ) {
      input = cell.appendChild(ce("input"));
      input.name = key;
      input.type = "text";
      input.size = 4;
      input.value = Settings.farmUnitCfg.stayNOrder[key].stay;
    }
    cell = row.insertCell(row.cells.length);
    if( Settings.farmUnitCfg.stayNOrder[key] ) {
      input = cell.appendChild(ce("input"));
      input.name = key;
      input.type = "text";
      input.size = 4;
      var val = "";
      if( Settings.farmUnitCfg.stayNOrder[key].maxTime > 0 ) {
        var h = Math.floor(Settings.farmUnitCfg.stayNOrder[key].maxTime / 60);
        var min = Settings.farmUnitCfg.stayNOrder[key].maxTime % 60;
        val = h + ":" + (min<10?"0":"")+min;
      }
      input.value = val;
      input.addEventListener("change",Settings.maxTimeChanged,false);
    }

    cell = row.insertCell(row.cells.length);
    input = cell.appendChild(ce("input"));
    input.name = key;
    input.type = "text";
    input.size = 8;
    input.value = Settings.colors.units[key];
    input.className = "dsfm_color";

    cell = row.insertCell(row.cells.length);
    input = cell.appendChild(ce("input"));
    input.name = key;
    input.type = "text";
    input.size = 4;
    input.value = Settings.farmUnitCfg.graphMax[key];
  },
  maxTimeChanged : function() {
    var parts = this.value.split(":");
    var maxTime = 0;
    if( parts.length == 1 )
      maxTime = parseInt(parts[0],10);
    else {
      maxTime = parseInt(parts[0],10)*60;
      maxTime += parseInt(parts[1],10);
    }
    if( isNaN(maxTime) || maxTime < 0 )
      maxTime = 0;
    if( maxTime > 0 ) {
      var h = Math.floor(maxTime / 60);
      var min = maxTime % 60;
      this.value = h + ":" + (min<10?"0":"")+min;
    }
    else
      this.value = "";
  },
  createColorEdit : function(type,parent) {
    var tab = parent.appendChild(ce("table"));
    var row = tab.insertRow(-1);
    var cell = row.insertCell(0);
    cell.innerHTML = '<b>'+texts[lib.lang].gui.settings.colRangeTitle[type] +'</b>';
    row = tab.insertRow(-1);
    cell = row.insertCell(0);

    var input = cell.appendChild(ce("input"));
    input.type = "checkbox";
    input.id = "dsfm_"+type+"_floating";
    input.checked = Settings.colors.range[type][0];
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.colFloating));
    input.addEventListener("click", function(e) { Settings.colors.range[type][0] = e.target.checked; Settings.updateColorBar(type); }, false);
    row = tab.insertRow(-1);
    var colTab = row.insertCell(0).appendChild(ce("table"));
    colTab.id = "dsfm_color_tab_"+type;
    row = colTab.insertRow(-1);
    row.appendChild(ce("th")).innerHTML = texts[lib.lang].gui.colorEditTitles[0];
    row.appendChild(ce("th")).innerHTML = texts[lib.lang].gui.colorEditTitles[1];
    cell = row.appendChild(ce("th"));
    cell.innerHTML = "+";
    cell.style.color = "#009900";
    cell.style.fontWeight = "bold";
    cell = row.appendChild(ce("th"));
    cell.innerHTML = "X";
    cell.style.color = "#FF0000";
    cell.style.fontWeight = "bold";

    for( var i = 1; i < Settings.colors.range[type].length; i++ )
      Settings.insertColorRow(type,colTab,i);

    row = tab.insertRow(-1);
    colTab = row.insertCell(0).appendChild(ce("table"));
    colTab.setAttribute( "cellspacing", 0 );
    colTab.setAttribute( "cellpadding", 0 );
    colTab.id = "dsfm_colorbar_"+type;
    colTab.style.border = "1px solid #804000";
    colTab.style.borderSpacing = "0";
    row = colTab.insertRow(0);
    row.style.height = "20px";
    for( var i = 0; i <= 100; i++ ) {
      cell = row.insertCell(i);
      cell.style.padding = "0px";
      cell.innerHTML = "&sdot;";
      cell.style.fontSize = "small";
      cell.style.fontWeight = "bold";
      Storage.getColors(type,i,cell);
    }
  },
  insertColorRow : function(type,tab,i) {
    var row = tab.insertRow(i);
    cell = row.insertCell(0);
    cell.innerHTML = Settings.colors.range[type][i].val;
    cell.style.textAlign = "right";
    input = row.insertCell(1).appendChild(ce("input"));
    input.size = "7";
    input.value = Settings.colors.range[type][i].color;
    input.color = new ColorPicker(input);
    input.addEventListener("change", Settings.colorChanged, false);
    cell = row.insertCell(2);
    if( i < Settings.colors.range[type].length - 1 && Settings.colors.range[type][i].val < Settings.colors.range[type][i+1].val - 1) {
      var a = cell.appendChild(ce("a"));
      a.href = "javascript:;";
      a.innerHTML = "+";
      a.style.color = "#009900";
      a.style.fontWeight = "bold";
      a.title = texts[lib.lang].gui.insert;
      a.addEventListener("click", Settings.addColor, false );
    }
    cell = row.insertCell(3);
    if( i > 1 && i < Settings.colors.range[type].length - 1 ) {
      var a = cell.appendChild(ce("a"));
      a.href = "javascript:;";
      a.innerHTML = "X";
      a.style.color = "#FF0000";
      a.style.fontWeight = "bold";
      a.title = texts[lib.lang].gui.remove;
      a.addEventListener("click", Settings.removeColor, false );
    }
  },
  colorChanged : function(e) {
    var type = getByTagName(this,"table","parentNode").id.split("_")[3];
    Settings.colors.range[type][e.target.parentNode.parentNode.rowIndex].color = e.target.value;
    Settings.updateColorBar(type);
  },
  addColor : function(e) {
    var type = getByTagName(this,"table","parentNode").id.split("_")[3];
    var row = e.target.parentNode.parentNode;
    var min = parseInt(row.cells[0].innerHTML,10)+1;
    var max = parseInt(row.nextSibling.cells[0].innerHTML,10)-1;
    var val = 0;
    while( isNaN(val) || val < min || val > max ) {
      val = prompt(texts[lib.lang].gui.promptPercent + " (" + min + " - " + max + ")", Math.round(min + (max-min) / 2));
      if( val ===  null )
        return
      val = parseInt(val,10);
    }
    var idx = row.rowIndex+1;
    var colMin = new Color(row.cells[1].firstChild.value);
    var colMax = new Color(row.nextSibling.cells[1].firstChild.value);
    var p = (val-min)/(max-min);
    var color = colMin.fadeTo(p,colMax).toString();
    Settings.colors.range[type].splice(idx,0, {val: val, color: color} );
    Settings.insertColorRow(type,row.parentNode,idx);
    Settings.updateColorBar(type);
  },
  removeColor : function(e) {
    var type = getByTagName(this,"table","parentNode").id.split("_")[3];
    var row = e.target.parentNode.parentNode;
    Settings.colors.range[type].splice(row.rowIndex,1);
    row.parentNode.removeChild(row);
    Settings.updateColorBar(type);
  },
  updateColorBar : function(type) {
    Storage.colors[type] = [];
    var tab = $("dsfm_colorbar_"+type);
    for( var i = 0; i <= 100; i++ )
      Storage.getColors(type,i,tab.rows[0].cells[i]);
  },
  appendGroup : function(tab,name,units) {
    var row = tab.insertRow(tab.rows.length-1);
    var cell = row.insertCell(0);
    cell = row.insertCell(1);
    var input = cell.appendChild(ce("input"));
    input.type = "text";
    input.length = 10;
    input.value = name;

    for( var key in serverInfo.unitInfo ) {
      if( serverInfo.unitInfo[key].bit > 0 && key != "spy") {
        cell = row.insertCell(row.cells.length);
        cell.style.textAlign = "center";
        input = cell.appendChild(ce("input"));
        input.type = "checkbox";
        input.checked = (units & serverInfo.unitInfo[key].bit) > 0;
        input.value = serverInfo.unitInfo[key].bit;
      }
    }
    cell = row.insertCell(row.cells.length);
    input = cell.appendChild(ce("a"));
    input.innerHTML = "X";
    input.style.fontWeight = "bold";
    input.style.color = "red";
    input.href = "javascript:;";
    input.title = texts[lib.lang].gui.delGroup;
    input.addEventListener( "click", function() { var tab = this.parentNode.parentNode.parentNode; tab.removeChild(this.parentNode.parentNode); createPrioLinks(tab,1,1,0); }, false );
  },
  getVariantIdxById : function(key,id) {
    for( var i = 0; i < Settings[key].variants.length; i++ )
      if( Settings[key].variants[i].id == id )
        return i;
    return -1;
  },
}
/** var Place = {
/* Was macht diese Funktion?
*/
var Place = {
  katasNeeded : { destroy: [0,2,6,10,15,21,28,36,45,56,68,82,98,115,136,159,185,215,248,286,328,376,430,490,558,634,720,815,922,1041,1175],
                  reduce: [0,2,2,3,4,4,4,4,4,4,4,4,5,5,6,6,6,7,8,8,9,10,10,11,12,13,15,16,17,19,20] },
  ramsNeeded : { destroy: [0,2,4,7,10,14,19,24,30,37,46,55,65,77,91,106,124,143,166,191,219],
                 reduce: [0,2,2,2,2,2,2,2,2,3,3,3,3,4,4,4,4,5,5,6,6] },
  placeSubmits : [],
  farmlist : [],
  userLoad : false,
  village : null,
  placeX : Number.NaN,
  placeY : Number.NaN,
  dist : Number.NaN,
  fs : 0, 
  groupInfo : null,
  curFarmDist : 0,
  duration : 0,
  capture: null,
  runtime: null,
  arrivalTime: null,
  returnTime: null,
  showNightbonus: false,
  showFl: false,
  
  doIt : function() {
    if( lib.params.screen == "place" ) {
      switch(lib.params.get("mode","command")) {
        case "command":
          if( $("inputx") )
            Place.initPlace();
          else if( lib.params["try"] == "confirm" )
            Place.initConfirm();
          break;
        case "units":
          Place.modUnits();
          break;
        case "neighbor":
          Place.modNeighbor();
          break;
        case "call":
          break;
      }
    }
    if( isOneOf(lib.params.screen, "place","overview","info_command" ) ) {
      cmds = lib.storage.getValue("commands"+ownPid,{});
      var res = document.evaluate("//a[contains(@href,'screen=place') and contains(@href,'action=cancel')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
      for( var i = 0; i < res.snapshotLength; i++ ) {
        var a = res.snapshotItem(i);
        if( lib.params.screen == "info_command" ) {
        }
        else {
          var row = a.parentNode.parentNode;
          var target = row.cells[0].textContent.match(texts[lib.lang].regex.villageLink);
          var arrivalTime = texts[lib.lang].locale.timeStr2Sec(row.cells[a.parentNode.cellIndex-2].textContent);
          var type = row.cells[0].innerHTML.match(/command\/(attack|support)\.png/)[1];
          a.data = { target: target[1]+"_"+target[2], arrivalTime: arrivalTime, type: type };
        }

        a.addEventListener("click", function() {
            if( this.data.type == "attack" )
              removeNearest(cmds[this.data.target].attacks,this.data.arrivalTime);
            else
              removeNearest(cmds[this.data.target].supports,this.data.arrivalTime);
            lib.storage.setValue("commands"+ownPid,cmds);
          }, false);
          
      }

    }
  },
  initPlace : function() {
    Place.showNightbonus = false;// sake uit gezet
    Place.userLoad = false;
    cleanUp();
    
    var e = $("units_form");

    var input = e.parentNode.getElementsByTagName("input");
    units = { };
    for( var i = 0; i < input.length; i++ ) {
      if( input[i].className=="unitsInput" ) {
        //input[i].id = "dsfm_"+input[i].name;
        input[i].parentNode.className="nowrap";
        input[i].addEventListener("keyup", Place.updatePlace, false );
        var chk = ce("input");
        chk.type="checkbox";
        chk.id="dsfm_"+input[i].name+"_use";
        chk.value = serverInfo.unitInfo[input[i].name].bit;
        chk.disabled = input[i].parentNode.textContent.match(/\((\d+)\)/)[1] == 0;
        if( chk.disabled ) {
          input[i].style.backgroundColor = Settings.colors.place.unitStates[0].background;
          if( Settings.colors.place.unitStates[0].border )
            input[i].style.border = "1px solid "+Settings.colors.place.unitStates[0].border;
        }
        chk.addEventListener("click", Place.checkUnits, false );
        input[i].parentNode.insertBefore(chk,input[i]);
        i++; // Die eingefügte Checkbox ist direkt in input[] vorhanden und ist am aktuellen index, also überspringen, damit wir wieder auf dem Eingabefeld sind
      }
      else if( input[i].name == "attack" ) {
        Place.placeSubmits[0] = input[i];
        input[i].value = input[i].value + HotKeys.add( "place", "attack", function(e,mod) { Place.placeSubmits[0].click(); } );
      }
      else if( input[i].name == "support" ) {
        Place.placeSubmits[1] = input[i];
        input[i].value = input[i].value + HotKeys.add( "place", "support", function(e,mod) { Place.placeSubmits[1].click(); } );
        var row = input[i].parentNode.parentNode;
        var cell = row.insertCell(row.cells.length);
        var a = cell.appendChild(ce("a"));
        a.style.display = "none";
        a.href = "javascript:;";
        a.id = "dsfm_enableattack";
        a.addEventListener("click", Place.enableAttack, false );
        a.innerHTML = "&raquo; "+ texts[lib.lang].gui.enableAttack + HotKeys.add( "place", "enableAttack", "click", a );
      }
    }
    
    if( lib.params.get("target",0) == 0 && lib.params.get("x",-1)>-1 ) {
      $("inputx").value = lib.params.x;
      $("inputy").value = lib.params.y;
    }
    
    tab = e.parentNode.insertBefore(ce("table"),e.nextSibling);
    tab.id = "dsfm_tab";
    tab.style.border = "1px solid rgb(222, 211, 185)";
    tab.className="nowrap";
    tab.style.width = "630px";
    row = tab.insertRow(tab.rows.length);
    cell = row.appendChild(ce("th"));
    cell.colSpan = 5;
    cell.innerHTML = texts[lib.lang].gui.title;
    row = tab.insertRow(tab.rows.length);
    if( Settings.settings.place.showCarry ) {
      cell = row.insertCell(0);
      cell.innerHTML = texts[lib.lang].gui.capture +":";
      Place.capture = row.insertCell(1);
      var returns = lib.storage.getValue("returns",{});
      var data = returns[lib.game_data.village.id];
      if( data ) {
        data = data.split(";");
        var count = 0;
        var res = { wood: 0, stone: 0, iron: 0 };
        var ts = lib.getTime();
        for( var i = 0; i < data.length-1; i++ ) {
          parts = data[i].split(",");
          if( parseInt(parts[0],10) > ts ) {
            res.wood += parseInt(parts[1],10);
            res.stone += parseInt(parts[2],10);
            res.iron += parseInt(parts[3],10);
            count++;
          }
        }
        var unitstab = getByTagName(tab,"table","nextSibling");
        if( unitstab ) {
          rets = unitstab.innerHTML.match(/\/return\.png/g);
          if( rets ) {
            cell = row.insertCell(-1);
            var span = '<span ';
            if( rets.length > data.length )
              span += 'style="color:red; font-weight:bold"';
            span += '> ('+count+"/"+rets.length+")</span>";
            cell.innerHTML = '<img alt="" src="graphic/command/return.png">' + texts[lib.lang].gui.returnTitle + span +": ";
            cell.className = "nowrap resources";
            for( var key in resInfos ) {
              var span = cell.appendChild(ce("span"));
              span.className = "res "+key;
              span.style.padding = "1px 1px 1px 18px";
              span.innerHTML = lib.formatNumber(res[key],true,true);
            }
          }
        }
      }
    }
    if( Settings.settings.place.showRunTime ) {
      row = tab.insertRow(tab.rows.length);
      cell = row.insertCell(0);
      cell.innerHTML = texts[lib.lang].gui.runtime + ":";
      Place.runtime = row.insertCell(1);
    }
    if( Settings.settings.place.showArrivalTime ) {
      row = tab.insertRow(tab.rows.length);
      cell = row.insertCell(0);
      cell.innerHTML = texts[lib.lang].gui.arrival + ":";
      Place.arrivalTime = row.insertCell(1);
      Place.arrivalTime.colSpan = 2;
    }
    row = tab.insertRow(tab.rows.length);
    row.id = "dsfm_row_ress";
    row.style.display = "none";
    cell = row.insertCell(0);
    cell.innerHTML = '<span id="dsfm_title"></span><br/><span style="display:none; font-size:xx-small;" id="dsfm_resources_age"></span>';
    cell = row.insertCell(1);
    cell.colSpan = 3;
    var html = '<table cellspacing="0" cellpadding="0"><tr><td><img src="graphic/holz.png" style="border: 0 none;" alt="'+texts[lib.lang].resources.wood+'" title="'+texts[lib.lang].resources.wood+'"/></td><td id="dsfm_wood" style="padding-right:20px; font-weight:bold;"></td>';
    html += '<td><img src="graphic/lehm.png?6c9bd" style="border: 0 none;" alt="'+texts[lib.lang].resources.stone+'" title="'+texts[lib.lang].resources.stone+'"/></td><td id="dsfm_stone" style="padding-right:20px; font-weight:bold;"></td>';
    html += '<td><img src="graphic/eisen.png?0e9e5" style="border: 0 none;" alt="'+texts[lib.lang].resources.iron+'" title="'+texts[lib.lang].resources.iron+'"/></td><td id="dsfm_iron" style="padding-right:20px; font-weight:bold;"></td>';
    html += '<td><img src="graphic/res.png" style="border: 0 none;" alt="'+texts[lib.lang].gui.sum+'" title="'+texts[lib.lang].gui.sum+'"/></td><td style="padding-right: 20px; font-weight:bold;"><span id="dsfm_cur_load"></span> / <span id="dsfm_sum"></span></td>';
    html += '<td style="font-weight: bold;"><span title="'+texts[lib.lang].gui.quotient+'">&#216; </span><span id="dsfm_eq"></span>%</td></tr></table>';
    cell.innerHTML = html;
    row = tab.insertRow(tab.rows.length);
    row.id = "dsfm_row_unitsin";
    row.style.display = "none";
    cell = row.insertCell(0);
    cell.innerHTML = texts[lib.lang].gui.unitsin+':<br/><span style="display:none; font-size:xx-small;" id="dsfm_unitsin_age"></span>';
    cell = row.insertCell(1);
    cell.colSpan=4;
    cell.id = "dsfm_unitsin";
    row = tab.insertRow(tab.rows.length);
    row.id = "dsfm_row_unitsout";
    row.style.display = "none";
    cell = row.insertCell(0);
    cell.innerHTML = texts[lib.lang].gui.unitsout+':<br/><span style="display:none; font-size:xx-small;" id="dsfm_unitsout_age"></span>';
    cell = row.insertCell(1);
    cell.colSpan=4;
    cell.id = "dsfm_unitsout";
    row = tab.insertRow(tab.rows.length);
    row.id = "dsfm_row_buildings";
    row.style.display = "none";
    cell = row.insertCell(0);
    cell.innerHTML = texts[lib.lang].gui.buildings+':<br/><span style="display:none; font-size:xx-small;" id="dsfm_buildings_age"></span>';;
    cell = row.insertCell(1);
    cell.colSpan=4;
    cell.id = "dsfm_buildings";
    row = tab.insertRow(tab.rows.length);
    cell = row.insertCell(0);
    cell.innerHTML = texts[lib.lang].gui.load+":";
    cell = row.insertCell(1);
    cell.colSpan=2;

    input = cell.appendChild(ce("input"));
    input.id = "dsfm_load";
    input.size = 5;
    input.value = Settings.settings.place.noReportLoad;
    input.addEventListener("keydown", function() { if( this.value.length > 0 ) {Place.userLoad=true}else {Place.userLoad=false; Place.updatePlace(); }}, false );
    input = cell.appendChild( ce("input"));
    input.type = "checkbox";
    input.id = "dsfm_useeq";
    input.checked = useeq;
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.usequotient + HotKeys.add("place", "eq", "click", input)));
    input.addEventListener("click", function() {
        useeq = this.checked; 
        lib.storage.setValue( "useeq"+ownPid, useeq ); 
        Place.loadFarmList(); 
        Place.updateTarget(true); 
        if( Place.showFl )
          Place.showFarmList(); 
      }, false );
    row = tab.insertRow(tab.rows.length);
    cell = row.insertCell(0);
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.unitSelect[0] + HotKeys.add("place","unitSelect", function() { var sel = $("dsfm_unitSelect"); var val = parseInt(sel.value,10) + 1; if( val >= sel.options.length ) val = 0; sel.value = val; Place.onUnitSelectChanged();} ) + ": "));
    cell = row.insertCell(1);

    input = cell.appendChild(ce("select"));
    input.size = 1;
    input.id = "dsfm_unitSelect";
    //sake-->
    //input.options[0] = new Option(texts[lib.lang].gui.unitSelect[1],0,false,false);    
    //input.options[1] = new Option(texts[lib.lang].gui.unitSelect[2],1,false,false);
    //for( var i = 0; i < Settings.farmUnitCfg.groups.length; i++ )
    //  input.options[i+2] = new Option(Settings.farmUnitCfg.groups[i].name,i+2,false,false);
    input.options.add( new Option(texts[lib.lang].gui.unitSelect[1],0,false,false) );
    input.options.add( new Option(texts[lib.lang].gui.unitSelect[2],1,false,false) );
    for( var i = 0; i < Settings.farmUnitCfg.groups.length; i++ )
      input.options.add( new Option(Settings.farmUnitCfg.groups[i].name,i+2,false,false) );
    //sake<--        
    input.addEventListener("change", Place.onUnitSelectChanged, false );
    input.value = lib.storage.getValue("unitSelect"+ownPid, 0);
    cell.appendChild(ce("span")).id = "dsfm_selectInfo";

    row = tab.insertRow(tab.rows.length);
    cell = row.insertCell(-1);
    cell.innerHTML = texts[lib.lang].gui.muster;
    cell = row.insertCell(-1);
    input = cell.appendChild(ce("input"));
    input.type = "checkbox";
    input.id = "dsfm_musterActive";
    input.checked = curVillage.muster.active;
    input.addEventListener("click", function() { 
        var time = $("dsfm_musterTime").value;
        if( time == "" ) {
          this.checked = false;
          alert( texts[lib.lang].gui.noMusterTime );
        }
        curVillage.muster.active = this.checked; 
        curVillage.save();
      }, false );
    input = cell.appendChild(ce("input"));
    input.type="text";
    input.id = "dsfm_musterTime";
    input.addEventListener("change", function() {
        var s = texts[lib.lang].locale.timeStr2Sec(this.value);
        if( s == 0 ) {
          this.value = "";
          $("dsfm_musterActive").checked = false;
          curVillage.muster.active = false;
        }
        curVillage.muster.time = s;
        curVillage.save();
      }, false );
    if( !isNaN(curVillage.muster.time) && curVillage.muster.time > 0 ) {
      var d = new Date(curVillage.muster.time*1000);
      input.value = texts[lib.lang].locale.date2timeStr(d,true,false);
    }
    
    row = tab.insertRow(tab.rows.length);
    cell = row.insertCell(0);
    cell.colSpan = 3;
    var a = cell.appendChild(ce("a"));
    a.innerHTML = "&raquo; " + texts[lib.lang].gui.insertunits + HotKeys.add( "place", "insertUnits", Place.insertUnits );
    a.style.fontWeight = "bold";
    a.style.color = "grey";
    a.id = "dsfm_insertUnits";
    a.addEventListener("click", Place.insertUnits, false );

    a = cell.appendChild(ce("a"));
    a.href = "javascript:;";
    a.id = "dsfm_getatts";
    html = "&raquo; " + texts[lib.lang].gui.getatts;
    html += HotKeys.add( "place", "getAtts", OV.getAtts )+ " ";
    a.innerHTML = html;
    a.addEventListener("click", OV.getAtts, false );

/*   
    a = cell.appendChild(ce("a"));
    a.id = "dsfm_show_list";
    html = "&raquo; " + texts[lib.lang].gui.farmlist + HotKeys.add( "place", "farmList", Place.showFarmList )+" ";
    if( Settings.settings.misc.useHotKeys )
      HotKeys.add( "common", "close", function(e,mod) { $("inline_popup").style.display = "none"; } );
    a.innerHTML = html;
    a.href = "javascript:;";
    a.addEventListener("click", Place.showFarmList, false );
*/
    
    a = e.parentNode.getElementsByTagName("a");
    for( var i = 0; i < a.length; i++ ) {
      if( /insertUnit/.test(a[i].href) )
        a[i].addEventListener("click", function() { window.setTimeout( Place.updatePlace, 100 ); }, false);
    }
    a = $("selectAllUnits");
    var txt;
    txt = HotKeys.add( "place", "allUnits", function() { win.selectAllUnits(true); } );
    a.innerHTML += txt;

    setInterval( Place.updateTarget, 1000 );

    $("units_form").addEventListener("submit",Place.saveLast,false);
    var td = a.parentNode.parentNode.insertCell(-1);
    td.valign = "top";
    
    var a = td.appendChild(ce("a"));
    a.href = "javascript:;";
    a.id = "dsfm_insertfake";
    a.innerHTML = "&raquo; " + texts[lib.lang].gui.fake + HotKeys.add( "place", "fake", Place.insertFake );
    a.addEventListener("click", Place.insertFake, false);

    td = td.parentNode.insertCell(-1);
    a = td.appendChild(ce("a"));
    a.href = "javascript:;";
    a.id = "dsfm_lastTarget";
    a.innerHTML = "&raquo; " + texts[lib.lang].gui.lastTarget + HotKeys.add( "place", "lastTarget", Place.insertLastTarget );
    a.addEventListener("click", Place.insertLastTarget, false);
    td = td.parentNode.insertCell(-1);
    a = td.appendChild(ce("a"));
    a.href = "javascript:;";
    a.id = "dsfm_lastUnits";
    a.innerHTML = "&raquo; " + texts[lib.lang].gui.lastUnits + HotKeys.add( "place", "lastUnits", Place.insertLastUnits );
    a.addEventListener("click", Place.insertLastUnits, false);
    
 //   row = tab.insertRow(tab.rows.length);
 //   cell = row.insertCell(0);
 //   cell.colSpan = 3;
//    tab = cell.appendChild(ce("table"));
//    tab.style.width = "100%";
 //   row = tab.insertRow(-1);
 //   cell = row.appendChild(ce("th"));
//    cell.innerHTML = texts[lib.lang].gui.farmlist;
//    Place.showFl = lib.storage.getValue("showfl"+ownPid,false);
 //   a = cell.appendChild(ce("a"));
//    a.innerHTML = Place.showFl ? String.fromCharCode(9650) : String.fromCharCode(9660);
    a.addEventListener("click", function() {
        Place.showFl = !Place.showFl;
        lib.storage.setValue("showfl"+ownPid,Place.showFl);
        this.innerHTML = Place.showFl ? String.fromCharCode(9650) : String.fromCharCode(9660);
        if( Place.showFl && Place.farmlist.length == 0 )
          Place.showFarmList();
        $("dsfm_fl").style.display = Place.showFl ? "" : "none";
      }, false);
    row = tab.insertRow(tab.rows.length);
    cell = row.insertCell(-1);
    cell.appendChild(ce("table")).id = "dsfm_fl";

    if( Place.showFl )
      Place.showFarmList();

    Place.updateTarget();
  },
  saveLast : function(e) {
    var data = { x: $("inputx").value, y: $("inputy").value };
    var input = document.getElementsByClassName("unitsInput");
    var units = 0;
    for( var i = 0; i < input.length; i++ ) {
      var key = input[i].id.substring(5);
      var val = parseInt(input[i].value,10);
      if( !isNaN(val) )
        units += val;
      data[key] = val;
    }
    if( !isNaN(data.x) && !isNaN(data.y) && units > 0 ) {
      setTimeout(function() {lib.storage.setValue("lastcmd"+ownPid, data); },0);
      return true;
    }
    else {
      e.preventDefault();
      return false;
    }
  },
  insertFake : function(e) {
    var points = 0;
    for( var key in lib.game_data.village.buildings )
      points += Settings.points[key][lib.game_data.village.buildings[key]];
    var bh_soll = Math.floor(points * serverInfo.config.game_fake_limit / 100);
    var bh_ist = 0;
    var input = Place.getUnitCount("ram");
    if( input.count > 0 ) {
      input.input.value = 1;
      bh_ist += serverInfo.unitInfo.ram.pop;
    }
    else { 
      input = Place.getUnitCount("catapult");
      if( input.count > 0 ) {
        input.input.value = 1;
        bh_ist += serverInfo.unitInfo.catapult.pop;
      }
    }
    input = Place.getUnitCount("spy");
    if( input.count > 0 ) {
      var count = Math.min(input.count,Settings.settings.place.fakeSpys);
      input.input.value = count;
      bh_ist += serverInfo.unitInfo.spy.pop * count;
    }
    for( var key in Settings.farmUnitCfg.stayNOrder ) {
      input = Place.getUnitCount(key);
      var needed = Math.ceil((bh_soll - bh_ist)/serverInfo.unitInfo[key].pop);
      var count = Math.min(needed, input.count);
      var ist = parseInt(input.input.value,10)
      if( isNaN(ist) )
        input.input.value = count;
      else
        input.input.value = ist + count;
      bh_ist += serverInfo.unitInfo[key].pop * count;
      if( bh_ist >= bh_soll )
        return;
    }
  },
  getUnitCount : function(unit) {
    var input = document.getElementById("unit_input_"+unit);
    return { input: input, count: parseInt(input.parentNode.textContent.match(/\((\d+)\)/)[1],10) };
  },
  insertLastTarget : function(e) {
    var last = lib.storage.getValue("lastcmd"+ownPid);
    if( last ) {
      var x = $("inputx");
      var y = $("inputy");
      x.value = last.x;
      y.value = last.y;
    }
  },
  insertLastUnits : function(e) {
    var last = lib.storage.getValue("lastcmd"+ownPid);
    if( last ) {
      var input = document.getElementsByClassName("unitsInput");
      for( var i = 0; i < input.length; i++ ) {
        var key = input[i].id.substring(5);
        var max = input[i].parentNode.textContent.match(/\((\d+)\)/)[1];
        var count = isNaN(last[key])?"":last[key];
        if( count > max )
          count = max;
        input[i].value = count;
      }
    }
  },
  onUnitSelectChanged : function() {
    var val = parseInt($("dsfm_unitSelect").value,10);
    lib.storage.setValue("unitSelect"+ownPid,val);
    if( !isNaN(Place.placeX) && ! isNaN(Place.placeY) )
      Place.findUnitGroup();
  },
  findUnitGroup : function() {
    var mode = lib.storage.getValue("unitSelect"+ownPid, 0);
    Place.groupInfo = { idx: 0, load: -1, units: {}, maxTime: 0 };
    var infoText = "";
    switch( mode ) {
      case 0: // Auto
        for( var i = 0; i < Settings.farmUnitCfg.groups.length; i++ ) {
          curgrp = Place.getGroupUnits(i);
          if( curgrp.load >= Settings.settings.place.incRangeRes ) {
            Place.groupInfo = curgrp;
            break;
          }
          if( curgrp.load > Place.groupInfo.load )
            Place.groupInfo = curgrp;
        }
        infoText = texts[lib.lang].gui.unitGroup + ": " + Settings.farmUnitCfg.groups[Place.groupInfo.idx].name;
        if( Place.groupInfo.cataTarget != "" )
          infoText += ", ";
        break;
      case 1: // Manuell
        Place.groupInfo = Place.getGroupUnits(-1,lib.storage.getValue("checkedunits"+ownPid,0));
        break;
      default: // Gruppe
        Place.groupInfo = Place.getGroupUnits(parseInt($("dsfm_unitSelect").value)-2);
        break;
    }
    if( Place.groupInfo.cataTarget != "" )
      infoText += texts[lib.lang].gui.cataTarget+ ": " + texts[lib.lang].buildings[Place.groupInfo.cataTarget];
    $("dsfm_selectInfo").innerHTML = " " + infoText;
    Place.markUnitFields();
  },
  getGroupUnits : function(idx) {
    // State: 0 => keine da;  1 => benutzen, 2 => zu wenig, 3 => zu lang unterwegs,  4  nicht in gruppe, 5 nicht benötigt
    var tsCur = lib.getTime();
    var slowest = 0;
    var groupInfo = { idx: idx, load: 0, units: {}, cataTarget: "" };
    var units;
    if( idx > -1 )
      units = Settings.farmUnitCfg.groups[idx].units;
    else if( arguments.length == 1 ) {
      units = 0;
      for( var key in serverInfo.unitInfo ) {
        var chk = $("dsfm_"+key+"_use");
        if( chk && chk.checked )
          units |= serverInfo.unitInfo[key].bit;
      }
      lib.storage.setValue("checkedunits"+ownPid,units);
    }
    else {
      units = arguments[1];
    }

    for( var key in Settings.farmUnitCfg.stayNOrder ) {
      groupInfo.units[key] = { count: $("unit_input_"+key).parentNode.textContent.match(/\((\d+)\)/)[1], used: 0, state: 0 };
      if( groupInfo.units[key].count > 0 ) {
        if( (units & serverInfo.unitInfo[key].bit) > 0 ) {
          if( idx > -1 ) {
            if( Settings.farmUnitCfg.stayNOrder[key] ) {
              groupInfo.units[key].count -= Settings.farmUnitCfg.stayNOrder[key].stay;
              if( groupInfo.units[key].count <= 0 ) {
                groupInfo.units[key].count = 0;
                groupInfo.units[key].used = 0;
                groupInfo.units[key].state = 2;
              }
              else if( (Settings.farmUnitCfg.stayNOrder[key].maxTime > 0 && Settings.farmUnitCfg.stayNOrder[key].maxTime * 60 <= serverInfo.unitInfo[key].speed * Place.fs) ||
                       (curVillage.muster.active && tsCur + serverInfo.unitInfo[key].speed * Place.fs * 2 > curVillage.muster.time ) ){
                groupInfo.units[key].used = 0;
                groupInfo.units[key].state = 3;
              }
              else {
                groupInfo.units[key].state = 1;
                groupInfo.units[key].used = 0;
              }
            }
          }
          else {
            groupInfo.units[key].state = 1;
            groupInfo.units[key].used = 0;
          }
        }
        else {
          if( serverInfo.unitInfo[key].bit > 0 ) {
            groupInfo.units[key].state = 4;
          }
        }
      }
    }
    if( Place.village.buildings.timestamp > 0 ) {
      if(Settings.settings.place.spyOlder && tsCur-Place.village.buildings.timestamp > Settings.settings.place.spyAge*3600) {
        for( var key in groupInfo ) {
          if( key != "spy" ) {
            groupInfo.state = 5;
            groupInfo.used = 0;
          }
        }
        return groupInfo;
      }
      else {
        if(groupInfo.units.ram.state == 1) {
          if((idx == -1 || Place.village.buildings.wall.level >= Settings.settings.place.minRamWall) &&
             (idx == -1 || Settings.farmUnitCfg.stayNOrder.ram.maxTime == 0 || Settings.farmUnitCfg.stayNOrder.ram.maxTime * 60 >= Place.fs * serverInfo.unitInfo.ram.speed)) {
            if( groupInfo.units.ram.count >= Place.ramsNeeded.reduce[Place.village.buildings.wall.level] &&
                (idx == -1 || !Settings.settings.place.minRamsNeeded || groupInfo.units.ram.count >= Place.ramsNeeded.destroy[Place.village.buildings.wall.level]) )
              groupInfo.units.ram.used = Math.min(groupInfo.units.ram.count, Place.ramsNeeded.destroy[Place.village.buildings.wall.level]);
            else {
              groupInfo.units.ram.used = 0;
              groupInfo.units.ram.state = 2;
            }
          }
          else {
            groupInfo.units.ram.used = 0;
            groupInfo.units.ram.state = 5;
          }
        }

        var minKatas = false;
        if(groupInfo.units.catapult.state == 1) {
          for( var i = 0; i < Settings.kataOrder.length; i++ ) {
            if( Settings.kataOrder[i].isTarget ) {
              var key = Settings.kataOrder[i].key;
              if( (Place.village.buildings[key].level > serverInfo.buildingInfo[key].min_level) && ((idx == -1 || Place.village.buildings[key].level >= Settings.settings.place.minKataLevel) &&
                  ((groupInfo.units.ram.used == 0 && Place.village.buildings.wall.level >= Settings.settings.place.minRamWall) || key != "wall") &&
                  (idx == -1 || Settings.farmUnitCfg.stayNOrder.catapult.maxTime == 0 || Settings.farmUnitCfg.stayNOrder.catapult.maxTime * 60 >= Place.fs * serverInfo.unitInfo.catapult.speed))) {
                if( groupInfo.units.catapult.count >= Place.katasNeeded.reduce[Place.village.buildings[key].level] &&
                    (idx == -1 || !Settings.settings.place.minKatasNeeded || groupInfo.units.catapult.count >= Place.katasNeeded.destroy[Place.village.buildings[key].level])) {
                  groupInfo.cataTarget = key;
                  groupInfo.units.catapult.used = Math.min(groupInfo.units.catapult.count, Place.katasNeeded.destroy[Place.village.buildings[key].level]);
                  break;
                }
                else {
                  minKatas = true;
                }
              }
            }
          }
          if( groupInfo.cataTarget == "" ) {
            groupInfo.units.catapult.used = 0;
            groupInfo.units.catapult.state = minKatas ? 2 : 5;
          }
        }
      }
    }
    else if( Settings.settings.place.spyNoReport ) {
      for( var key in groupInfo ) {
        if( key != "spy" ) {
          groupInfo.state = 5;
          groupInfo.used = 0;
        }
      }
      return groupInfo;
    }

    var f = useeq ? Math.max(Settings.settings.place.minEQ,Place.village.eq) / 100 : 1;
    do {
      var restart = false;
      var sum = 0;
      groupInfo.load = 0;
      for( var key in groupInfo.units ) {
        if( groupInfo.units[key].used > 0 && serverInfo.unitInfo[key].speed > slowest )
          slowest = serverInfo.unitInfo[key].speed;
      }
      var duration = Place.fs * slowest;
      ts = tsCur + duration;
      if( Place.village.buildings.timestamp > 0 ) {
        sum = 0;
        for( var res in resInfos )
          sum += Math.round(serverInfo.getRessource(Place.village, res, ts)*f);
      }
      else
        sum = parseInt($("dsfm_load").value, 10);

      for( var key in groupInfo.units ) {
        if( groupInfo.units[key].state == 3 && serverInfo.unitInfo[key].carry > 0 ) {
          if( idx == -1 || (duration <= Settings.farmUnitCfg.stayNOrder[key].maxTime * 60 && (!curVillage.muster.active || tsCur + duration * 2 < curVillage.muster.time)) ) {
            groupInfo.units[key].state = 1;
          }
        }
        if( groupInfo.units[key].state == 5 && key != "ram" && key != "catapult" )
          groupInfo.units[key].state = 1;
        if( groupInfo.units[key].state == 1 && serverInfo.unitInfo[key].carry > 0 ) {
          if( idx != -1 && ((Settings.farmUnitCfg.stayNOrder[key].maxTime > 0 && duration > Settings.farmUnitCfg.stayNOrder[key].maxTime * 60) || (curVillage.muster.active && tsCur + duration * 2 > curVillage.muster.time)) ) {
            groupInfo.units[key].state = 3;
            groupInfo.units[key].used = 0;
          }
          else {
            if( groupInfo.load > sum ) {
              groupInfo.units[key].state = 5;
              groupInfo.units[key].used = 0;
            }
            else {
              var needed = Math.min(groupInfo.units[key].count, Math.ceil((sum-groupInfo.load)/serverInfo.unitInfo[key].carry));
              groupInfo.units[key].used = needed;
              groupInfo.load += needed * serverInfo.unitInfo[key].carry;
              if( serverInfo.unitInfo[key].speed > slowest ) {
                slowest = serverInfo.unitInfo[key].speed;
                restart = true;
                break;
              }
            }
          }
        }
      }
      if( !restart ) {
        for( var key in Settings.farmUnitCfg.minUnits ) {
          var parts = key.split("_");
          var sum = 0;
          for( var i = 0; i < parts.length; i++ )
            sum += groupInfo.units[parts[i]].used;
          if( sum > 0 && sum < Settings.farmUnitCfg.minUnits[key] ) {
            slowest = 0;
            restart = true;
            for( var i = 0; i < parts.length; i++ ) {
              if( groupInfo.units[parts[i]].used > 0 ) {
                groupInfo.units[parts[i]].state = 2;
                groupInfo.units[parts[i]].used = 0;
              }
            }
          }
        }
      }
    } while( restart );
    return groupInfo;
  },
  markUnitFields : function() {
    for( var key in Place.groupInfo.units ) {
      $("dsfm_"+key+"_use").checked = Place.groupInfo.units[key].state == 1 || Place.groupInfo.units[key].state == 5;
      var input = $("unit_input_"+key);
      // State: 0 => keine da;  1 => benutzen, 2 => zu wenig da, 3 => zu lang unterwegs,  4  nicht in gruppe, 5 nicht benötigt
      input.title = texts[lib.lang].gui.unitStates[Place.groupInfo.units[key].state];
      if( Settings.colors.place.unitStates[Place.groupInfo.units[key].state].border )
        input.style.border = "1px solid " + Settings.colors.place.unitStates[Place.groupInfo.units[key].state].border;
      input.style.backgroundColor = Settings.colors.place.unitStates[Place.groupInfo.units[key].state].background;
    }
  },
  selectTarget : function(coords) {
    var xy = coords.split("|");
    $("inputx").value = xy[0];
    $("inputy").value = xy[1];
    $("inline_popup").style.display = "none";
    Place.updateTarget();
    Place.insertUnits();
  },
  updateTarget : function(force) {
    var x = parseInt($("inputx").value, 10);
    var y = parseInt($("inputy").value, 10);
    var a = $("dsfm_insertUnits");
    if( !isNaN(x) && !isNaN(y) ) {
      if( x != Place.placeX || y != Place.placeY || force == true ) {
        Place.placeX = x;
        Place.placeY = y;
        Place.dist = Math.sqrt(Math.pow(curVillage.coords.x - x, 2) + Math.pow(curVillage.coords.y - y, 2));
        Place.fs = Place.dist * RunTimes.speed * 60;
        a.href = "javascript:;";
        a.style.color = "";
        var key = "" + x + "_" + y;
        $("dsfm_row_ress").style.display = "none";
        $("dsfm_row_unitsin").style.display = "none";
        $("dsfm_row_unitsout").style.display = "none";
        $("dsfm_row_buildings").style.display = "none";
        Place.village = new Village(key);
        var f = useeq ? Math.max(Settings.settings.place.minEQ,Place.village.eq) / 100 : 1;
        if( Place.village.res.timestamp > 0 ) {
          var cell = $("dsfm_title").innerHTML = texts[lib.lang].gui.resources+' ('+(Place.village.buildings.timestamp>0?texts[lib.lang].gui.current:texts[lib.lang].gui.spy)+'):';
          if( Place.village.buildings.timestamp > 0 )
            showReportAge(Place.village.buildings.timestamp, "resources");
          else {
            showReportAge(Place.village.res.timestamp, "resources");
            var sum = 0;
            for( var res in resInfos ) {
              var val = Math.round(Place.village.res[res]*f);
              sum += val;
              $("dsfm_"+res).innerHTML = val;
            }
            $("dsfm_sum").innerHTML = sum;
            if( !Place.userLoad )
              $("dsfm_load").value = sum;
          }
          if( Settings.settings.place.showRessis )
            $("dsfm_row_ress").style.display = "";
          Place.updatePlace();
          $("dsfm_eq").innerHTML = Math.max(Settings.settings.place.minEQ,Place.village.eq);
        }
        else {
          if( !Place.userLoad )
            $("dsfm_load").value = Settings.settings.place.noReportLoad;
          $("dsfm_row_ress").style.display = "none";
        }
        if( !force )
          Place.findUnitGroup();
        if( Settings.settings.place.disableOnUnits && !Place.placeSubmits[0].disabled)
          Place.enableAttack(!(Place.village.unitsin.hasUnits || Place.village.unitsout.hasUnits));
      }
      if( Place.village.unitsin.hasUnits && Settings.settings.place.showUnitsIn) {
        $("dsfm_unitsin").innerHTML = getUnitsTab(Place.village.unitsin);
        $("dsfm_row_unitsin").style.display = "";
        showReportAge(Place.village.unitsin.timestamp, "unitsin");
      }
      if( Place.village.unitsout.hasUnits && Settings.settings.place.showUnitsOut) {
        $("dsfm_unitsout").innerHTML = getUnitsTab(Place.village.unitsout);
        $("dsfm_row_unitsout").style.display = "";
        showReportAge(Place.village.unitsout.timestamp, "unitsout");
      }
      if( Place.village.buildings.timestamp > 0 && Settings.settings.place.showBuildings > 0 ) {
        cell = $("dsfm_buildings");
        if( Settings.settings.place.showBuildings == 1 )
          cell.innerHTML = '<img src="graphic/buildings/wall.png" alt="'+texts[lib.lang].buildings.wall+':" border="0"/>'+Place.village.buildings.wall.level;
        else
          cell.innerHTML = getBuildingsTab(Place.village.buildings,Settings.settings.place.showBuildingChange,Settings.settings.place.showCatas);
        showReportAge(Place.village.buildings.timestamp, "buildings");
        $("dsfm_row_buildings").style.display="";
      }
    }
    else {
      a.href = "";
      a.style.color = "grey";
    }
    Place.updatePlace();
  },
  showFarmList : function(event) {
    if( Place.farmlist.length == 0 )
      Place.loadFarmList();
    var ts = lib.getTime();

    tab = $("dsfm_fl");
    tab.innerHTML = "";
    tab.className = "vis nowrap";
    tab.style.width = "100%";
    var row = tab.insertRow(0);
    var cell = row.appendChild(ce("th"));
    cell = row.appendChild(ce("th"));
    cell.innerHTML = texts[lib.lang].gui.coords + " ("+Place.farmlist.length+")";
    cell = row.appendChild(ce("th"));
    cell.innerHTML = '<img src="/graphic/holz.png?a3702" alt="'+texts[lib.lang].resources.wood+'" title="'+texts[lib.lang].resources.wood+'"/>';
    cell.style.textAlign = "center";
    cell = row.appendChild(ce("th"));
    cell.innerHTML = '<img src="/graphic/lehm.png?6c9bd" alt="'+texts[lib.lang].resources.stone+'" title="'+texts[lib.lang].resources.stone+'"/>';
    cell.style.textAlign = "center";
    cell = row.appendChild(ce("th"));
    cell.innerHTML = '<img src="/graphic/eisen.png?0e9e5" alt="'+texts[lib.lang].resources.iron+'" title="'+texts[lib.lang].resources.iron+'"/>';
    cell.style.textAlign = "center";
    cell = row.appendChild(ce("th"));
    cell.innerHTML = texts[lib.lang].gui.fl_sum;
    cell = row.appendChild(ce("th"));
    cell.style.textAlign = "center";
    cell.innerHTML = texts[lib.lang].gui.fl_eq;
    cell.style.textAlign = "right";
    cell = row.appendChild(ce("th"));
    cell.style.textAlign = "right";
    cell.innerHTML = texts[lib.lang].gui.dist;
    cell = row.appendChild(ce("th"));
    cell.style.textAlign = "right";
    cell.innerHTML = '<img src="graphic/buildings/wall.png"/>';
    
    cell = row.appendChild(ce("th"));
    cell.innerHTML = texts[lib.lang].gui.lastAtt;
    
    cell = row.appendChild(ce("th"));
    cell.innerHTML = "X";
    cell.style.textAlign = "center";
    
    for( i = 0; i < Place.farmlist.length; i++ ) {
      row = tab.insertRow(tab.rows.length);
      cell = row.insertCell(0);
      if( Place.farmlist[i].color.length > 0 ) {
        var div = cell.appendChild(ce("div"));
        div.style.width="5px";
        div.style.height="5px";
        div.style.backgroundColor=Place.farmlist[i].color;
        div.style.border="1px solid black";
      }
      else
        cell.innerHTML = "?";
      var html = "";
      if( Place.farmlist[i].hasAtt ) {
        html = '<img alt="" src="graphic/command/attack.png">';
        row.className = "row_a";
        cell.style.backgroundColor = "#FF0000";
      }
      else
        row.className = "row_b";
      cell = row.insertCell(1);
      cell.style.whiteSpace="nowrap";
      var a = cell.appendChild(ce("a"));
      a.href = "javascript:;";
      a.innerHTML = html +  Place.farmlist[i].dst["x"]+'|'+Place.farmlist[i].dst["y"];
      a.addEventListener("click", function(e) {scroll(0,0); Place.selectTarget(e.target.textContent);}, false );
      
      cell = row.insertCell(-1);
      cell.innerHTML = lib.formatNumber(Place.farmlist[i].wood,true,true);
      cell.style.textAlign = "right";
      if( Settings.settings.place.colorFLRes ) {
        cell.style.color = Place.farmlist[i].woodcolor.text;
        cell.style.backgroundColor = Place.farmlist[i].woodcolor.background;
      }
      cell = row.insertCell(-1);
      cell.innerHTML = lib.formatNumber(Place.farmlist[i].stone,true,true);
      cell.style.textAlign = "right";
      if( Settings.settings.place.colorFLRes ) {
        cell.style.color = Place.farmlist[i].stonecolor.text;
        cell.style.backgroundColor = Place.farmlist[i].stonecolor.background;
      }
      cell = row.insertCell(-1);
      cell.innerHTML = lib.formatNumber(Place.farmlist[i].iron,true,true);
      cell.style.textAlign = "right";
      if( Settings.settings.place.colorFLRes ) {
        cell.style.color = Place.farmlist[i].ironcolor.text;
        cell.style.backgroundColor = Place.farmlist[i].ironcolor.background;
      }
      cell = row.insertCell(-1);
      cell.innerHTML = lib.formatNumber(Place.farmlist[i].sum,true,true);
      cell.style.textAlign = "right";
      cell = row.insertCell(-1);
      cell.style.textAlign = "right";
      cell.innerHTML = Place.farmlist[i].eq + "%";
      cell = row.insertCell(-1);
      cell.innerHTML = Math.round(Place.farmlist[i].dist*100)/100
      cell.setAttribute("dist",Place.farmlist[i].dist);
      cell.style.textAlign = "right";
      cell = row.insertCell(-1);
      cell.style.textAlign = "right";
      cell.textContent = Place.farmlist[i].wall;
      cell = row.insertCell(-1);
      cell.style.textAlign = "right";
      cell.textContent = texts[lib.lang].locale.formatDuration(ts-Place.farmlist[i].lastAtt);
      
      cell = row.insertCell(-1);
      cell.style.textAlign = "center";
      cell.style.fontWeight = "bold";
      a = cell.appendChild(ce("a"));
      a.href = "javascript:;";
      a.innerHTML = "X";
      a.style.color = "red";
      a.title = texts[lib.lang].gui.delfromfarmlist;
      a.addEventListener("click", function(e) { var coords = e.target.parentNode.parentNode.cells[1].firstChild.innerHTML.replace(/\|/,"_"); lib.storage.setValue("nofarms"+ownPid,lib.storage.getValue("nofarms"+ownPid,"")+coords+";"); Place.loadFarmList(); Place.showFarmList(); }, false );
    }

    var sorter = new TableSorter(tab);
    sorter.addSortColumn(2,compareNumericCell,0);
    sorter.addSortColumn(3,compareNumericCell,0);
    sorter.addSortColumn(4,compareNumericCell,0);
    sorter.addSortColumn(5,compareNumericCell,0);
    sorter.addSortColumn(6,compareNumericCell,0);
    sorter.addSortColumn(7,RunTimes.compareDistCell,1);
    sorter.addSortColumn(8,compareNumericCell,0);
    sorter.addSortColumn(9,compareDurationCell,0);
    sorter.setSortNotifier(function(col,dir) { lib.storage.setValue("flSort"+ownPid,{col:col, dir:dir}); });
    var sort = lib.storage.getValue("flSort"+ownPid,{col:7,dir:"ASC"});
    sorter.setSortColumn( sort.col, sort.dir );
  },
  compareFarms : function(a,b) {
    return a.dist-b.dist;
  },
  updatePlace : function() {
    var selUnitsInfo = Place.getSelectedUnitsInfo();
    if( Place.capture )
      Place.capture.innerHTML = lib.formatNumber(selUnitsInfo.load,true,true) + " / " + lib.formatNumber(selUnitsInfo.total,true,true)
    var dist = 0;
    if(!isNaN(Place.placeX) && !isNaN(Place.placeY))
      dist = Math.sqrt(Math.pow(curVillage.coords.x - Place.placeX, 2) + Math.pow(curVillage.coords.y - Place.placeY, 2));
    Place.duration = selUnitsInfo.slowest * dist * RunTimes.speed;
    if( Place.runtime )
      Place.runtime.innerHTML = texts[lib.lang].locale.formatDuration(Math.round(Place.duration*60));
    Place.duration *= 60000;
    Place.updateTimes();
    if( Place.village ) {
      if( Place.village.res.timestamp > 0 ) {
        if( Place.village.buildings.timestamp > 0 ) {
          var ts = lib.getTime();
          var title = $("dsfm_title");
          if( selUnitsInfo.slowest > 0 ) {
            ts += Place.fs * selUnitsInfo.slowest;
            if( title ) title.innerHTML = texts[lib.lang].gui.resources + " ("+texts[lib.lang].gui.atArrival+")";
          }
          else
            if( title ) title.innerHTML = texts[lib.lang].gui.resources + " ("+texts[lib.lang].gui.current+")";;
          var f = useeq ? Math.max(Settings.settings.place.minEQ,Place.village.eq) / 100 : 1;
          var sum = 0;
          for( var res in resInfos ) {
            var val = Math.round(serverInfo.getRessource(Place.village, res, ts)*f);
            sum += val;
            $("dsfm_"+res).innerHTML = lib.formatNumber(val,true,true);
          }
          $("dsfm_cur_load").innerHTML = lib.formatNumber(selUnitsInfo.load,true,true);
          $("dsfm_sum").innerHTML = lib.formatNumber(sum,true,true);
          if( !Place.userLoad )
            $("dsfm_load").value = sum;
        }
        else {
          $("dsfm_cur_load").innerHTML = lib.formatNumber(selUnitsInfo.load,true,true);
        }
      }
    }
  },
  updateTimes : function() {
    if( Place.duration && Place.arrivalTime ) {
      var ts = lib.getTime();
      if( Place.duration > 0 ) {
        var arrivalTime = new Date(ts*1000 + Place.duration);
        var html = texts[lib.lang].locale.date2timeStr(arrivalTime);
        if( Place.showNightbonus && serverInfo.config.night_active ) {
          var h = arrivalTime.getUTCHours();
          if( h >= serverInfo.config.night_start_hour && h < serverInfo.config.night_end_hour )
            html += ' <span class="warn">'+texts[lib.lang].gui.nightbonus+'</span>';
        }
        Place.arrivalTime.innerHTML = html;
        if( Place.returnTime ) {
          var returnTime = new Date(ts*1000 + 2 * Place.duration);
          Place.returnTime.innerHTML = texts[lib.lang].locale.date2timeStr(returnTime);
        }
      }
      else {
        Place.arrivalTime.innerHTML = "---";
        if( Place.returnTime )
          Place.returnTime.innerHTML = "---";
      }
    }
  },
  enableAttack : function(enable) {
    if( arguments.length == 0 || enable ) {
      $("dsfm_enableattack").style.display="none";
      Place.placeSubmits[0].disabled=false;
    }
    else {
      $("dsfm_enableattack").style.display="";
      Place.placeSubmits[0].disabled=true;
    }
  },
  getSelectedUnitsInfo : function() {
    var e = $("units_form");
    var input = e.getElementsByTagName("input");
    var ret = { slowest: 0, load: 0, total: 0 };
    for( var i = 0; i < input.length; i++ ) {
      if( input[i].className == "unitsInput" ) {
        var val = parseInt(input[i].value, 10);
        if( isNaN(val) )
          val = 0;
        var unit = input[i].id.substring(11);
        var maxunits = input[i].parentNode.textContent.match(/\((\d+)\)/)[1];
        if( isNaN(maxunits) )
          maxunits = 0;
        ret.load += val * serverInfo.unitInfo[unit].carry;
        ret.total += maxunits * serverInfo.unitInfo[unit].carry;
        if( val > 0 && serverInfo.unitInfo[unit].speed > ret.slowest )
          ret.slowest = serverInfo.unitInfo[unit].speed;
      }
    }
    return ret;
  },
  insertUnits : function() {
    var units = 0;
    for( var key in Place.groupInfo.units ) {
      if( Place.groupInfo.units[key].used > 0 ) {
        units |= serverInfo.unitInfo[key].bit;
        $("unit_input_"+key ).value = Place.groupInfo.units[key].used;
      }
      else
        $("unit_input_"+key ).value = "";
    }
    
    if( $("dsfm_spy_use").checked && Place.groupInfo.units.spy.count >= Settings.farmUnitCfg.minUnits.spy )
      $("unit_input_spy").value = Settings.farmUnitCfg.minUnits.spy;
    Place.enableAttack( !(Settings.settings.place.disableOnUnits && (Place.village.unitsin.hasUnits || Place.village.unitsout.hasUnits)) && (!Settings.settings.place.minLoad || Place.groupInfo.load >= Settings.settings.place.incRangeRes || (units == 0 && (Place.village.buildings.timestamp==0 && Settings.settings.place.spyNoReport || lib.getTime()-Place.village.buildings.timestamp > Settings.settings.place.spyAge*3600 && Settings.settings.place.spyOlder) && $("unit_input_spy").value > 0)));
    Place.updatePlace();
    lib.storage.setValue("cataTarget"+ownPid,Place.groupInfo.cataTarget);
  },
  checkUnits : function(e) {
    //this.checked = !this.checked;
    $("dsfm_unitSelect").value = 1;
    lib.storage.setValue("unitSelect"+ownPid,1);
    if( Place.village ) {
      Place.groupInfo = Place.getGroupUnits(-1);
      Place.markUnitFields();
    }
  },
  initConfirm : function() {
    var form = document.getElementsByTagName("form")[0];
    var input = $("troop_confirm_go");
//    var inputs = form.getElementsByTagName("input");
    var select = form.getElementsByTagName("select");
    var h3 = document.getElementsByTagName("h3");
    var reserved = false;
    if( h3.length > 0 )
      reserved = texts[lib.lang].regex.reserved.test(h3[0].textContent);
    for( var i = 0; i < select.length; i++ ) {
      if( select[i].name == "building" ) {
        var cataTarget = lib.storage.getValue("cataTarget"+ownPid,"");
        if(cataTarget != "")
          select[i].value = cataTarget;
        lib.storage.deleteValue("cataTarget"+ownPid);
      }
    }
    Place.placeSubmits = [input];
    Place.duration = 0;
    input.value += HotKeys.add("common","ok", function(e,mod) { Place.placeSubmits[0].click(); } );
    var node = document.getElementsByTagName("h2")[0];
    var isAtt = texts[lib.lang].regex.attack.test( node.innerHTML );
    node.style.backgroundColor = isAtt ? Settings.colors.place.confirmTitle.attack : Settings.colors.place.confirmTitle.support;
    while( node.nodeName.toUpperCase() != "TABLE" )
      node = node.nextSibling;
    var owner = 0;
    for( var i = 0; i < node.rows.length; i++ ) {
      if( node.rows[i].cells.length > 1 ) {
        if( /info_player/.test(node.rows[i].cells[1].innerHTML) ) {
          owner = parseInt(node.rows[i].cells[1].innerHTML.match(/id=(\d+)/)[1],10);
          Place.showNightbonus = isAtt;
        }
        else if( texts[lib.lang].regex.durationTitle.test(node.rows[i].cells[0].innerHTML) ) {
          Place.duration = texts[lib.lang].locale.parseDuration(node.rows[i].cells[1].textContent)*1000;
        }
        else if( texts[lib.lang].regex.arrivalTitle.test(node.rows[i].cells[0].innerHTML) ) {
          Place.arrivalTime = node.rows[i].cells[1];
          if( isAtt ) {
            var row = node.insertRow(i+1);
            row.insertCell(0).innerHTML = texts[lib.lang].gui.returnTitle;
            Place.returnTime = row.insertCell(1);
          }
        }
      }
    }
    var inputs = form.getElementsByTagName("input");
    var x = 0;
    var y = 0;
    var coords = "";
    for( var i= 0; i < inputs.length; i++ ) {
      switch(inputs[i].name) {
        case "x":
          x = inputs[i].value;
          coords += x +"_";
          break;
        case "y":
          y = inputs[i].value;
          coords += y;
          break;
        case "submit":
          if((reserved || owner > 0) && isAtt) {
            Place.showNightbonus = false;// sake uit gezet
            if( owner == ownPid ) {
			  inputs[i].style.backgroundColor = "#FF0000";
			  inputs[i].style.color = "#FFFFFF";
              deleteVillageInfos(coords);
            }
            else {
              switch( Settings.settings.place.okOnPlayer ) {
                case 1:
                  inputs[i].style.backgroundColor = "#FF0000";
                  inputs[i].style.color = "#FFFFFF";
                  break;
                case 2:
                  inputs[i].style.backgroundColor = "#FF0000";
                  inputs[i].style.color = "#FFFFFF";
                  lib.storage.setValue("nofarms"+ownPid,lib.storage.getValue("nofarms"+ownPid,"")+coords+";");
                  break;
              }
            }
          }
          break;
      }
    }
    setInterval(Place.updateTimes, 250);
    form.addEventListener("submit", function(e) {
        setTimeout( function() { 
            var ts = lib.getTime() + Place.duration/1000;
            var cmds = lib.storage.getValue( "commands"+ownPid,{});
            if( !cmds[coords] )
              cmds[coords] = {attacks:[],supports:[],incs:[]};
            if( isAtt )
              cmds[coords].attacks.push(ts);
            else
              cmds[coords].supports.push(ts);
            lib.storage.setValue("commands"+ownPid,cmds); 
          },0); 
      }, false );
  },
  modUnits : function() {
    var tabs = $("content_value").getElementsByTagName("table");
    var tab = tabs[3];
    var idxExternal = 4;
    if( tab.rows.length > 3 ) {
      idxExternal++;
      var footLines = tab.rows.length == 4 ? 1 : 2;
      if( tab.tFoot === null ) {
        tab.appendChild(ce("tfoot"));
        for( var i = 0; i < footLines; i++ )
          tab.tFoot.appendChild(tab.rows[tab.rows.length-footLines]);
      }
      var cell = tab.rows[0].insertBefore(ce("th"),tab.rows[0].cells[1]);
      cell.innerHTML = texts[lib.lang].gui.dist;
      cell = tab.rows[1].insertCell(1);
      cell.innerHTML = '<span class="grey">0</span>';
      cell.style.textAlign = "right";
      for( var i = 2; i < tab.rows.length - footLines; i++ ) {
        tab.rows[i].cells[0].setAttribute("dsfm_order",i);
        tab.rows[i].insertCell(1);
        RunTimes.insertDist(tab.rows[i],0,1);
        //HS _ DÜV 001--> markiere eigene Unterstützung auf dem Versammlungsplatz
        currVillageId = tab.rows[i].cells[0].innerHTML.match(/id=(\d+)/)[1];
        var curVil = new MyVillage(currVillageId);
        if( curVil.res.timestamp != 0 ) {
          tab.rows[i].className="nowrap selected row_a";
        };
        //HS _ DÜV 001<--
      }
      if( footLines == 2 )
        tab.rows[tab.rows.length-2].cells[0].colSpan=2;
      tab.rows[tab.rows.length-1].cells[0].colSpan=2;
      var sorter = new TableSorter(tab);
      sorter.addSortColumn(0,compareOrderCell,1);
      sorter.addSortColumn(1,RunTimes.compareDistCell);
      for( var i = 0; i < serverInfo.unitAnz; i++ )
        sorter.addSortColumn(i+2,compareNumericCell);
    }
    if( tabs.length > idxExternal ) {
      tab = tabs[idxExternal];
      cell = tab.rows[0].insertBefore(ce("th"),tab.rows[0].cells[2]);
      cell.innerHTML = texts[lib.lang].gui.dist;
      for( var i = 1; i < tab.rows.length; i++ ) {
        if( tab.rows[i].cells.length > 0 ) {
          if( tab.rows[i].cells[0].colSpan == 1 ) {
            tab.rows[i].cells[0].setAttribute("dsfm_order",i);
            tab.rows[i].insertCell(2);
            RunTimes.insertDist(tab.rows[i],1,2);
          }
          else
            tab.rows[i].cells[0].colSpan++;
         }
         else
           tab.deleteRow(i--);
      }
      
      var sorter = new TableSorter(tab);
      sorter.addSortColumn(1,compareOrderCell,1);
      sorter.addSortColumn(2,compareNumericCell);
      var anz = serverInfo.unitAnz;
      if( serverInfo.unitInfo.militia )
        anz--;
      for( var i = 0; i < anz; i++ )
        sorter.addSortColumn(i+3,compareNumericCell);
    }
  },
  modNeighbor : function() {
    var tab = $("content_value").getElementsByTagName("table")[3];
    for( var i = 1; i < tab.rows.length; i++ )
      RunTimes.insertDist(tab.rows[i],0,1);
    var sorter = new TableSorter(tab);
    sorter.addSortColumn(0,compareStringCell);
    sorter.addSortColumn(1,RunTimes.compareDistCell,1);
  },
}
var Map = {
  nofarmpng : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAA7wsK9wMG9wQD9gUE9wQF9wQH9AYE9QYF9QYJ8ggG9gsM9wwO9g4P+wEC+QMA+gIB+gIC+QID+gIE+AMF+AQC+AQD+AYF/QAA/QAB/QAC/AIB+AgJ+AsN8xAP8xER9BAQ9BMS9BIT9RQV9RYV8hoa9RsZ9hob9hse9h8i8iAd9CAi8S4s71BQ81RS8F9e7GFe62Nh6mNj62Nl62dk62Zl7GFg7WBh7GNg7WJi7mRg7WVh7WZg7mRm7m9w7W9x7W9y63J07HNy7Hd17Hd373h38GNh8GVk82hm8XVz8XZ38Xx79Ht754aG6YWH6YaF6IqK6oyI7IuK7YyL8oOF8oaG8ouJ85GT8pWX9JmW9JqW9Z+d85+g9aei96io9Kqt9K2t9a6u86+w8rGu9LKv9rSv8rOx8bK29LKx9LSz9bq39bq7+Li598zM9dTT99zaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH1mncAAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjQ+jcx2AAAAzElEQVQYV2P4DwS+BuZmZmZ+ICYDEDsKCUhKSUkJ2UP4TqJSUpJAICHiAOI7igqAeEC+hJDdfwZ/dnVxBWUlMU1uIV45Fn8GS8+McI98b/2kFM7c+FBTBotIXS2hHKFYxSjtZMZMEwYjlQgfID+RI0wnL93WhsFQjyubI0s0Tj5aNU1Y2prBOCQxhi2VyS0pnitBWNKKIYBDTVyQR1BIQ0ZaVlA4iOG/Mys/xH5JSSFXkPtcmMHOleIT9oK4H6oCKAvh/w+0dQeCYBATAHESSVaqgfK6AAAAAElFTkSuQmCC",
  attentionpng : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAAvlI+tlhDu1pHt2JTs2xfvHNbtX1xyDEK0isIy0Uux1Ax3kcm3lIt5Uce5Ukp5FAo6VEp5V0/4GM+6GM701xI0mFB22dL12pR0nhf3Hln6GpO63ZV6XJZ73Fb1ol23ol47Ixv5YBy7Yd6h4eDgImEioqKmp6ltYuAt5aOqaeirKyltbW1tLix1J2M25OB2ZiG25+P2quZ27Gn4ZeK4ZqO7JOB5Z2U46eZ4ame7aiW7bOp5bex4MK86sjF6srI8M/D8d7Z997b7ODb9eHe9OLe7e/37vL09eTl9e7z9vHw9vT89fj79Pr79vr8+vv3+fn4+fn5+Pr4+v35+/37+/z8+Pz+/P76/Pz8/f78////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKNkz+QAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjQ+jcx2AAAAiklEQVQYV2P4jwoYcPH1IBIweUVlU2S+uJCDqzFC3kDGzMvdEsEXlnNUV3UxhOkXE7Dy1lbxN4fyjQSlPUJ11MKd9CHm84pY+0ZGRUUGAa0A8iX5ZD1DInS1IoKd5UF8Dn5bnzC/qKjAADclIJ+Nk8fezsbCREFKQpQbJM/ExcjMwsquoYnsXpi3AEDdknMUSj+yAAAAAElFTkSuQmCC",
  wallpng : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAMAAADXT/YiAAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZ3bsYwAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjQ+jcx2AAAAJ0lEQVQYV2P4//8/IyMjkGQAMkAcEAvEADEZIAwgEysLoQ5JL8w8ALK7PNjpoF2NAAAAAElFTkSuQmCC",
  unitspng : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAMAAADXT/YiAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAszD0iAAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjQ+jcx2AAAAKUlEQVQYV2P4//8/AwMDiAQzQEwGIAMsDJWBS0DUgiUhuuDqkPTCzAMA4dos1Ep3neEAAAAASUVORK5CYII=",
  supportpng: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAADg4OExLSlJRT1xbWl9eXmNhXmRiYmdlYmtra3RzcHp4dYiHhZCNiJaTi5WUlJybmaunnqGhoa+roa6sqLCror24rr65sMrGutDLv9nUyN3d3eHbzuji1P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM+u9C0AAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBQYWludC5ORVQgdjMuNS44NzuAXQAAAI9JREFUKFNVj9sSgzAIRDFXTYKl1sZobf//LyOJOtV9YNgDzA6QWbDrV/taXkIYrO0BvNDBXUEUtvNXMLdy6G9AdXgHrSb6bwDM2rmeg/cUSOhk49uAqbgMC/nwYAVPC1tII2mprBXG0pj4zhG+pcagnhOSKyDCajSnTPCNBbBW0zWfYdpNSTrB+dzxfR3mDaqSXX2ODdowAAAAAElFTkSuQmCC",
  redirTargets : ["villageinfo","sendunits","getunits","market","getress","centermap","removeinfo","selectvillage","togglenofarm","coordlist"],
  redirTarget : "villageinfo",
  coordlist : "",
  timer : null,
  bbs: [],
  queue: [],
  minBarMax : 0,
  twmap: null,
  lnk: null,
  redirHref: "",
  bbcode : false,
  addEvents : true,
  villageOwners: null,
  villageGroups: null,
  villageGroup : 0,
  flashItem: null,
  toFlash: null,
  flashTimer: null,
  flashOdd: false,
  statsPopup: null,
  busy: false,
  mocX : 0,
  mocY : 0,
  myVillages: {},
  groupsOnTopo: true,
  onMouseX: -1,
  onMouseY: -1,
  doIt : function() {
    if( lib.params.screen == "map" ) {
      Map.redirTarget = lib.storage.getValue("redirTarget"+ownPid, "villageinfo");
      Map.coordlist = lib.storage.getValue("coordlist"+ownPid, "");
      Map.bbcode = lib.storage.getValue("bbcode"+ownPid,false);
      Map.groupsOnTopo = lib.storage.getValue("groupsOnTopo"+ownPid, true);
      cleanUp();
      Map.init();
    }
  },
  init : function() {   
  
    cmds = lib.storage.getValue("commands"+ownPid,{});
    for( var key in myVillages ) {
      id = key.substring(3);
      Map.myVillages[id] = new MyVillage(id);
    }
    
    Map.simChurches = lib.storage.getValue("simChurches",true);
    Map.churches = lib.storage.getValue("churches",[]); 
    Map.twmap = win.TWMap;
    Map.otherOvl = lib.storage.getValue("otherOvl"+ownPid,"");
    Map.ownOvl = lib.storage.getValue("ownOvl"+ownPid);
    Map.twmap.popup.fmHandleMouseMove = Map.twmap.popup.handleMouseMove;
    Map.twmap.popup.handleMouseMove = Map.handleMouseMove; //HSX
    Map.lnk = $("map");
    Map.lnk.addEventListener("contextmenu", Map.onContextMenu, false);
    Map.lnk.addEventListener("mousedown", Map.onMouseDown, false);
    Map.lnk.addEventListener("mouseup", Map.redirectLink, false);
    Map.moveForms();
    
    var container = $("map_topo");
    var tab = $("dsfm_topo_container");
    var tab = container.insertBefore(ce("table"),tab.nextSibling);
    tab.width = "100%";
    tab.id="dsfm_options";
    tab.className = "vis"; //HS _ K 001
    tab.style.border = "1px solid #804000";
    var row;
    var cell;
    var thead = tab.appendChild(ce("thead"));
    row = thead.insertRow(0);
    cell = row.appendChild(ce("th"));
    cell.colSpan = 2;
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.title + texts[lib.lang].gui.optionsSuffix));
    var a = cell.appendChild(ce("a"));
    a.href = "#";
    a.textContent = String.fromCharCode(160,9650);
    a.name = "mapopts";
    a.addEventListener("click", Map.toggleTable, false );
    var body = tab.appendChild(ce("tbody"));
    if( !lib.storage.getValue("mapopts"+ownPid,true) )
      lib.fireEvent(a,"click");

    row = thead.insertRow(-1);
    cell = row.insertCell(0);
    cell.innerHTML = texts[lib.lang].gui.ovlCoords;
    cell.style.verticalAlign="top";
    cell = row.insertCell(1);
  //  cell.innerHTML = ' <input type="text" id="dsfm_coords" readOnly="readOnly" onkeyup="this.select();" style="border:0; background-color:inherit;"/>'; // width:0; height:0; border:0;
    var input = cell.appendChild(ce("input"));
    input.id = "dsfm_coords";
    input.readOnly = true;
    input.style.border = 0;
    input.style.backgroundColor = "inherit";    
    
    if( Settings.settings.map.redirActive ) {    
      var div = cell.appendChild(ce("div"));      
      div.id = "dsfm_coordlist_div";
      div.style.width = "200px";
      div.style.border = "1px solid #804000";
      div.style.display = Map.redirTarget == "coordlist" ? "" : "none";

      var input = div.appendChild(ce("textarea"));
      input.value = Map.coordlist.replace(";","\n");
      input.style.height = Math.max(12,Map.coordlist.split("\n").length*12)+"px";
      div.height = input.style.height;
      input.id = "dsfm_coordlist";
      input.setAttribute("onfocus","this.select();");
      input.readOnly = true;
      input.style.width = "180px";
      input.style.fontSize = "xx-small";
      input.style.border = "0";
      input.style.backgroundColor = "inherit";
      var a = div.appendChild(ce("a"));
      a.href = "javascript:;";
      a.style.fontWeight = "bold";
      a.style.color = "red";
      a.style.verticalAlign = "top";
      a.innerHTML = "X";
      
      a.addEventListener("click", function() { 
          var coordlist = lib.storage.getValue("coordlist"+ownPid,"");
          lib.storage.deleteValue("coordlist"+ownPid); 
          var ta = $("dsfm_coordlist"); 
          ta.value = ""; 
          ta.style.height = "12px"; 
          var res = coordlist.match(/\d{1,3}\|\d{1,3}/g);
          for( var i = 0; i < res.length; i++ ) {
            var coords = res[i].split("|");
            $("dsfm_overlay_"+coords[0]+"_"+coords[1]).style.backgroundColor = "";
          }
        }, false );        
      input = cell.appendChild(ce("input"));
      input.type="checkbox";
      input.id="dsfm_bbcode";
      input.checked = Map.bbcode;
      input.addEventListener("click",Map.toggleBBCode, false);
      cell.appendChild(document.createTextNode(texts[lib.lang].gui.bbcode));
      row = body.insertRow(-1);
      cell = row.insertCell(0);
      cell.innerHTML = texts[lib.lang].gui.redirTitle;
      cell = row.insertCell(1);
      var select = cell.appendChild(ce("select"));
      select.id = "dsfm_redirTarget";      
      for( var i = 0; i < Map.redirTargets.length; i++ ) {
        var txt = texts[lib.lang].gui["redir_"+Map.redirTargets[i]] + HotKeys.add("map",Map.redirTargets[i], Map.redirTargetChanged);
        //sake-->
        //select.options[i] = new Option(txt,Map.redirTargets[i],false,false);
        select.options.add( new Option(txt,Map.redirTargets[i],false,false) );
        //sake<--
      }
      select.value = Map.redirTarget;
      select.addEventListener("change", Map.redirTargetChanged, false );
    }

    row = body.insertRow(-1);
    cell = row.insertCell(0);
    cell.innerHTML = texts[lib.lang].gui.ownVillage;
    cell = row.insertCell(1);
    select = cell.appendChild(ce("select"));
    select.id = "dsfm_ownOvl";
    var val = lib.storage.getValue("ownOvl"+ownPid,"None");
    var options = ["Groups","Points","Name","Resource","Units","Coords","Def","AttsNSups"];
    options.sort(Map.compareOvlOpt);
   
    //sake-->
    //select.options[0] = new Option(texts[lib.lang].gui["ovlSelect"] + HotKeys.add( "map", "ownNone", Map.ownOvlChanged ),"None", false, false );
    //for( var i = 0; i < options.length; i++ )
    //  select.options[i+1] = new Option(texts[lib.lang].gui["ovl"+options[i]]+HotKeys.add( "map", "own"+options[i], Map.ownOvlChanged ), options[i], false, false);
    select.options.add( new Option(texts[lib.lang].gui["ovlSelect"] + HotKeys.add( "map", "ownNone", Map.ownOvlChanged ),"None", false, false ) );    
    for( var i = 0; i < options.length; i++ )
      select.options.add( new Option(texts[lib.lang].gui["ovl"+options[i]]+HotKeys.add( "map", "own"+options[i], Map.ownOvlChanged ), options[i], false, false) );
    //sake<--
    select.value = val;
    select.addEventListener("change", Map.ownOvlChanged, false);
    row = body.insertRow(-1);
    row.id = "dsfm_unitOptions";
    cell = row.insertCell(0);
    cell.style.verticalAlign = "top";
    cell.innerHTML = texts[lib.lang].gui.ovlUnits;
    cell = row.insertCell(1);
    var unitSum = lib.storage.getValue("unitSum"+ownPid,1);
    input = cell.appendChild(ce("input"));
    input.type="checkbox";
    input.checked = unitSum & 1;
    input.value = 1;
    input.addEventListener("click",Map.updateUnitDivs,false);
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.unitsHome));
    cell.appendChild(ce("br"));
    input = cell.appendChild(ce("input"));
    input.type="checkbox";
    input.value = 2;
    input.checked = unitSum & 2;
    input.addEventListener("click",Map.updateUnitDivs,false);
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.unitsThere));
    cell.appendChild(ce("br"));
    input = cell.appendChild(ce("input"));
    input.type="checkbox";
    input.value = 4;
    input.checked = unitSum & 4;
    input.addEventListener("click",Map.updateUnitDivs,false);
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.unitsAway));
    cell.appendChild(ce("br"));
    input = cell.appendChild(ce("input"));
    input.type="checkbox";
    input.value = 8;
    input.checked = unitSum & 8;
    input.addEventListener("click",Map.updateUnitDivs,false);
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.unitsMoving));

    var ownOvl = lib.storage.getValue("ownOvl"+ownPid,"None");
    var otherOvl = lib.storage.getValue("otherOvl"+ownPid,"None");
    $("dsfm_unitOptions").style.display = $("dsfm_ownOvl").value == "Units" ? "":"none";
    
    row = body.insertRow(-1);
    cell = row.insertCell(0);
    cell.innerHTML = texts[lib.lang].gui.otherVillage;
    cell = row.insertCell(1);
    select = cell.appendChild(ce("select"));
    select.id = "dsfm_otherOvl";
    options = [ "Points","Name","Ally","FarmInfo","Coords","Player","AttsNSups"];
    //sake-->
    //select.options[0] = new Option(texts[lib.lang].gui["ovlSelect"]+HotKeys.add("map","otherNone",Map.otherOvlChanged),"None",false,false);
    //options.sort(Map.compareOvlOpt);
    //for( var i = 0; i < options.length; i++ )
    //  select.options[i+1] = new Option(texts[lib.lang].gui["ovl"+options[i]]+HotKeys.add("map","other"+options[i], Map.otherOvlChanged),options[i],false,false);
    select.options.add( new Option(texts[lib.lang].gui["ovlSelect"]+HotKeys.add("map","otherNone",Map.otherOvlChanged),"None",false,false) );
    options.sort(Map.compareOvlOpt);    
    for( var i = 0; i < options.length; i++ )
      select.options.add( new Option(texts[lib.lang].gui["ovl"+options[i]]+HotKeys.add("map","other"+options[i], Map.otherOvlChanged),options[i],false,false) );
    //sake<--
    select.value = otherOvl;
    select.addEventListener("change", Map.otherOvlChanged, false);
    row = body.insertRow(-1);
    cell = row.insertCell(0);
    cell.colSpan = 2;
    input = cell.appendChild(ce("input"));
    input.type = "checkbox";
    input.checked = useeq;
    input.id = "dsfm_useeq";
    input.addEventListener("click", function() { useeq = this.checked; lib.storage.setValue("useeq"+ownPid,useeq); Map.reCreateOverlays(false);  }, false );
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.usequotient+HotKeys.add("map","eq", "click", input)));

    //sake-->
    if( Settings.settings.map.groupsOnTopo ) {
      row = body.insertRow(-1);
      row.id = "dsfm_groupsOnTopo_row";
      cell = row.insertCell(0);
      cell.colSpan=2;
      //cell.style.whiteSpace="nowrap";
      input = cell.appendChild(ce("input"));
      input.checked = lib.storage.getValue("groupsOnTopo"+ownPid, true);
      input.type = "checkbox";
      input.id ='dsfm_groupsOnTopo';
      input.addEventListener("click", Map.toggleTopo, false );         
      cell.appendChild(document.createTextNode(texts[lib.lang].gui.showOwnGroups));    
    };
    
    if( serverInfo.buildingInfo.church ) {
      row = body.insertRow(-1);
      row.id = "dsfm_simchurches_row";
      cell = row.insertCell(0);
      cell.colSpan=2;
      input = cell.appendChild(ce("input"));
      input.type = "checkbox";
      input.checked = lib.storage.getValue("simChurches",true);
      input.addEventListener("click", Map.toggleChurches, false);
      input.id = "dsfm_simchurches";
      //var a = tab.rows[2].cells[0].appendChild(ce("a"));
      var a = cell.appendChild(ce("a"));
      a.href = "#";
      a.textContent = texts[lib.lang].gui.simChurches;
      a.addEventListener("click", Map.showChurches, false);
    };
    //sake<--    
  
    row = body.insertRow(-1);
    cell = row.insertCell(0);
    cell.colSpan = 2;
    input = cell.appendChild(ce("a"));
    input.id = "dsfm_stats";
    input.href = "javascript:;";
    input.innerHTML = "&raquo; " + texts[lib.lang].gui.statsTitle[0] + Settings.settings.map.sumHours + texts[lib.lang].gui.statsTitle[1] + HotKeys.add("map","stats","click",input);
    input.addEventListener("click", Map.showStats, false );
    row = body.insertRow(-1);
    cell = row.insertCell(0);
    cell.colSpan = 2;
    input = cell.appendChild(ce("a"));
    input.href = "javascript:;";
//    input.id = "dsfm_addbb2fl";
//    input.innerHTML = "&raquo; " + texts[lib.lang].gui.addbb2fl + HotKeys.add("map","addbb2fl","click",input);
//    input.addEventListener("click", Map.addbb2fl, false );

    Map.statsPopup = new lib.Popup("statspopup",texts[lib.lang].gui.statsTitle[0] + Settings.settings.map.sumHours + texts[lib.lang].gui.statsTitle[1],true,300,200);
    var html = '<table class="vis" style="width:100%;">';
    html += '<tr><td><img src="graphic/holz.png?a3702" border="0" alt=""/> '+texts[lib.lang].resources.wood+':</td><td id="dsfm_sumwood" style="text-align:right;"></td></tr>';
    html += '<tr><td><img src="graphic/lehm.png?6c9bd" border="0" alt=""/> '+texts[lib.lang].resources.stone+':</td><td id="dsfm_sumstone" style="text-align:right;"></td></tr>';
    html += '<tr><td><img src="graphic/eisen.png?0e9e5" border="0" alt=""/> '+texts[lib.lang].resources.iron+':</td><td id="dsfm_sumiron" style="text-align:right;"></td></tr>';
    html += '<tr><td colspan="2"><div style="width:100%; height:2px; border-top:1px solid black; border-bottom:1px solid black"/></td></tr>';
    html += '<tr><td><img src="graphic/res.png" border="0" alt=""/> '+texts[lib.lang].gui.sum+':</td><td id="dsfm_sumtotal" style="text-align:right;"></td></tr>';
    html += '<tr><td colspan="2" style="text-align:right"><span id="dsfm_sumreports"></span> '+texts[lib.lang].gui.reports+'</td></tr>';
    HotKeys.add("common", "close", Map.statsPopup.hide);
    Map.statsPopup.content.innerHTML = html;

    //$("info").style.zIndex = 100;
    container = $("info_content");
    
    if (container) {
//    alert('KK'); //HSX
      var row = container.insertRow(container.rows.length);
      row.id = "dsfm_popupinfo_row";
      var cell = row.insertCell(0);
      cell.colSpan=3;
      container = cell.appendChild(ce("table"));
      container.style.width="100%";
      //HSX container.style.border = "1px solid rgb(222, 211, 185)";
      container.border = 10;
      container.className="vis";
      container.id="dsfm_popupinfos";
      row = container.insertRow(0);
      var cell = row.appendChild(ce("th"));
      cell.colSpan=2;
      cell.innerHTML = texts[lib.lang].gui.infoTitle;

      var popupLines = [ "resources", "mining", "buildings", "unitsin", "unitsout", "loyalty" ];
      for( i = 0; i < popupLines.length; i++ ) {
        row = container.insertRow(container.rows.length);
        row.style.display = "none";
        row.id = "dsfm_"+popupLines[i]+"_row";
        cell = row.insertCell(0)
        cell.style.whiteSpace="nowrap";
        cell.appendChild(document.createTextNode(texts[lib.lang].gui[popupLines[i]]));
        cell.appendChild(ce("br"));
        var age = cell.appendChild(ce("span"));
        age.style.fontSize="xx-small";
        age.id = "dsfm_"+popupLines[i]+"_age";
        age.style.display = "none";
        row.insertCell(1).id="dsfm_"+popupLines[i];
      };
    }; //HSX
    Map.addVillageGroups();
    Map.addOwnGroupEdit();
    bindColorPicker();
    setInterval(Map.watchMap,500);

  },
  moveForms : function() {
    var content = $("content_value");
    var h2 = content.getElementsByTagName("h2")[0];
    if( h2 ) {
      // Kontinent - Überschrift in Tabele verfrachten
      var ktab = content.insertBefore(ce("table"),h2);
      var row = ktab.insertRow(-1);
      row.style.verticalAlign="top";
      var cell = row.insertCell(-1);
      cell.appendChild(h2);
      cell.style.verticalAlign = "bottom";
      // Karte zentrieren-Tab hinter in K-Tabelle
      content = $("map_topo");
      var form = content.getElementsByTagName("form")[1]; //HS _ K 001
      cell = row.insertCell(-1);
      cell.appendChild(form);
      // Tabelle einzeilig machen
      var tab = form.getElementsByTagName("table")[0];
      tab.rows[0].appendChild(tab.rows[1].cells[0]);
      tab.rows[0].appendChild(tab.rows[1].cells[0]);
      tab.deleteRow(1);
      // Neue Tabelle für Minimap erstellen
      tab = content.insertBefore(ce("table"),content.firstChild);
      tab.className = "vis";
      tab.id = "dsfm_topo_container";
      //tab.style.border = "1px solid #804000";
      tab.style.width = "100%";
      var head = tab.appendChild(ce("thead"));
      row = head.insertRow(-1);
      cell = row.appendChild(ce("th"));
      cell.appendChild(document.createTextNode(texts[lib.lang].gui.topo));
      var a = cell.appendChild(ce("a"));
      a.href = "#";
      a.textContent = String.fromCharCode(160,9650);
      a.addEventListener("click", Map.toggleTable, false );
      a.name = "topo";
      var body = tab.appendChild(ce("tbody"));
      if( !lib.storage.getValue("topo"+ownPid,true) )
        lib.fireEvent(a,"click");
      row = body.insertRow(-1);
      cell = row.insertCell(-1);
      cell.appendChild(content.getElementsByTagName("div")[0]);
      row = body.insertRow(-1);
      cell = row.insertCell(-1);
      var node = tab.nextSibling;
      while( node && node.nodeName.toUpperCase() != "TABLE" ) {
        var nextNode = node.nextSibling;
        cell.appendChild(node);
        node = nextNode;
      }
     
      if( node ) {
        // Kartengröße in K-Tab
        ktab.rows[0].appendChild(node.rows[1].cells[0]);
        content.removeChild(node);
      };
    };
  },
  toggleTable : function(e) {
    var disp = "";
    if( this.textContent == String.fromCharCode(160,9650) ) {
      this.textContent = String.fromCharCode(160,9660);
      disp = "none";
    }
    else
      this.textContent = String.fromCharCode(160,9650);
    lib.storage.setValue(this.name+ownPid,disp == "" ? true : false);
    getByTagName(this,"table","parentNode").tBodies[0].style.display = disp;
  },
  handleMouseMove : function(e) {
    var pos = Map.twmap.map.coordByEvent(e);
    var x = pos[0];
    var y = pos[1];
    Map.twmap.popup.fmHandleMouseMove(e);
    Map.lnk.href = Map.redirHref;
    if( x != Map.mocX || y != Map.mocY ) {
      var input = $("dsfm_coords"); 
      var coordidx = x*1000+y;
      var village = Map.twmap.villages[coordidx];
      if( village ) {
        switch( Map.redirTarget ) {
          case "villageinfo":
            Map.lnk.href =  lib.createLink("info_village", "id", village.id, false);
            break;
          case "sendunits":
            Map.lnk.href = lib.createLink("place", "mode", "command", "target", village.id, false);
            break;
          case "getunits":
            var href = lib.createLink("place", "mode", "command", "target", curVillage.id, false);
            Map.lnk.href = href.replace("village="+curVillage.id,"village="+village.id);
            break;
          case "market":
            Map.lnk.href = lib.createLink("market", "mode", "send", "target", village.id, false);
            break;
          case "getress":
            var href = lib.createLink("market", "mode", "send", "target", curVillage.id, false);
            Map.lnk.href = href.replace("village="+curVillage.id,"village="+village.id);
            break;
          case "centermap":
            Map.lnk.href = lib.createLink("map", "x", x, "y", y, false);
            break;
          case "removeinfo":
            Map.lnk.href = "javascript:;";
            break;
          case "selectvillage":
            var href = lib.createLink("map", "x", x, "y", y, false);
            Map.lnk.href = href.replace("village="+curVillage.id,"village="+village.id);
            break;
          case "coordlist":
            $("dsfm_coordlist_div").style.display = "block";
          case "togglenofarm":
          case "delattmark":
            Map.lnk.href = "javascript:;"
            break;
        }
        Map.redirHref = Map.lnk.href;
        input.value = x+"|"+y; 
        if( Map.bbcode ) 
          input.value = "[coord]"+input.value+"[/coord]"; 
        input.select();
        Map.setPopupInfos(pos,village.id);
      }
      else {
        input.value = "";
        Map.lnk.href = "#";
      }
      Map.mocX = x;
      Map.mocY = y;
    }
  },
  ownOvlChanged : function() {
    var select = $("dsfm_ownOvl");
    if( arguments.length == 2 ) {
      for( var hk in Settings.hotKeys.map ) {
        if( Settings.hotKeys.map[hk].keyCode == arguments[0].keyCode && Settings.hotKeys.map[hk].modifier == arguments[1].val )
          select.value = hk.substring(3);
      }
    }
    lib.storage.setValue("ownOvl"+ownPid,select.value);
    Map.ownOvl = select.value;
    $("dsfm_unitOptions").style.display = select.value == "Units" ? "":"none";
    Map.reCreateOverlays(true);
  },
  otherOvlChanged : function() {
    var select = $("dsfm_otherOvl");
    if( arguments.length == 2 ) {
      for( var hk in Settings.hotKeys.map ) {
        if( Settings.hotKeys.map[hk].keyCode == arguments[0].keyCode && Settings.hotKeys.map[hk].modifier == arguments[1].val )
          select.value = hk.substring(5);
      }
    }
    lib.storage.setValue("otherOvl"+ownPid,select.value);
    Map.otherOvl = select.value;
    Map.reCreateOverlays(false);
  },
  reCreateOverlays : function(own) {
    var start = new Date().getTime();
    for( var idx in Map.twmap.villages ) {
      var village = Map.twmap.villages[idx];
      if( (own && village.owner == ownPid) || (!own && village.owner != ownPid) ) {
        var y = idx % 1000;
        var x = ( idx - y ) / 1000;
        Map.createOverlay(x,y);
      }
    }
  },
  createOverlays : function() {
    var start = new Date().getTime();
    Map.ts = lib.getTime();
    lib.debug.log( "createOverlays:" + Map.queue.length );
    while( Map.queue.length > 0 ) {
      var tile = Map.queue.shift();
      Map.createOverlay(tile.x,tile.y);
    }
    lib.debug.log( "Overlays created in " + (new Date().getTime() - start) + "ms" );
    Map.updateVillageGroups();
    if( Settings.settings.map.rememberPos && curVillage.id ) {
      curVillage.map.timestamp = Map.ts;
      curVillage.map.x = Map.twmap.pos[0];
      curVillage.map.y = Map.twmap.pos[1];
      curVillage.save();
    }
  },
  createOverlay : function(x,y) {
    var village = Map.twmap.villages[x*1000+y];
    var el = $("dsfm_overlay_"+x+"_"+y);
    if( Map.coordlist.indexOf(x+"|"+y) > -1 )
      el.style.backgroundColor = "rgba(127,255,255,0.4)";
    if( el ) {
      el.innerHTML = "";
      if( village.owner == ownPid ) {
        var data = Map.myVillages[village.id];
        if( data ) {
          switch( Map.ownOvl ) {
            case "Groups":
              var div = el.appendChild(ce("div"));
              div.style.position = "absolute";
              div.style.width = Map.twmap.map.scale[0]+"px";
              div.style.height = (Map.twmap.map.scale[1]-10)+"px"
              div.style.top = "10px";
              div.style.left = "0px";
              div.style.overflow = "hidden";
              for( var g = 0; g < Settings.userGroups.length; g++ ) {
                for( var l = 0; l < data.groups.list.length; l++ ) {
                  if( Settings.userGroups[g].name == data.groups.list[l] ) {
                    if( Settings.userGroups[g].show ) {
                      var img = div.appendChild(ce("img"));
                      img.src = Settings.userGroups[g].icon?Settings.userGroups[g].icon:'graphic/map/emtpy.png';
                      img.style.border = "0px solid black";
                      img.style.backgroundColor = Settings.userGroups[g].color;
                      img.style.width = "14px";
                      img.style.height = "14px";
                      div.appendChild(ce("wbr"));
                    }
                    break;
                  }
                }
              }
              break;
            case "Points":
              el.appendChild(Map.createSingleTextOverlay(village.points,"white"));
              break;
            case "Name":
                if( village.owner > 0 )
                  el.appendChild(Map.createMultiTextOverlay(village.name,"rgb(240,200,0)"));
              break;
            case "Coords":
              el.appendChild(Map.createSingleTextOverlay(x+"|"+y,"white",""));
              break;
            case "Resource":
              if( data.res.timestamp > 0 ) {
                var age = (Map.ts - data.res.timestamp) / 3600;
                var ageOpacity = 1;
                if( age > 24 )
                  ageOpacity = 1-(age/48);
                var size = [ 0, 0, 0 ];
                var barMax = Math.max(data.res.storage, Map.minBarMax);
                var barWidth = Map.twmap.map.scale[0] - 10;
                var r = 0;
                for( var res in resInfos )
                  size[r++] = Math.floor(barWidth * data.res[res] / barMax);
                el.appendChild(Map.createResBarDiv(size));
              }
              break;
            case "Units":
              if( data.units.timestamp > 0 ) {
                var unitSum = lib.storage.getValue("unitSum"+ownPid,1);
                var age = (Map.ts - data.units.timestamp) / 3600;
                var ageOpacity = 1;
                if( age > 24 )
                  ageOpacity = 1-(age/48);
                var html = '<div style="position:absolute; border: 1px solid #804000; width:'+(Map.twmap.map.scale[0])+'px; height:'+(Map.twmap.map.scale[1]-14)+'px; top:10px; left:0px; background-color:rgba(255,255,255,0.2); opacity:'+ageOpacity+'">';
                var anz = serverInfo.unitAnz;
                if( serverInfo.unitInfo.militia )
                  anz--;
                var barWidth = Math.floor((Map.twmap.map.scale[0] - 2) / anz);
                var left = Math.floor(((Map.twmap.map.scale[0]-2) - barWidth * anz) / 2);
                var height = Map.twmap.map.scale[1]-16;
                for( var unit in serverInfo.unitInfo ) {
                  if( unit != "militia" ) {
                    var h = Math.floor(height * Math.min(data.getUnitSum(unit,unitSum),Settings.farmUnitCfg.graphMax[unit]) / Settings.farmUnitCfg.graphMax[unit]);
                    html += '<div style="position:absolute; left:'+left+'px; width:'+(barWidth-2)+'px; background-color:'+Settings.colors.units[unit]+'; height:'+h+'px; border:1px solid white; top:'+(height-h)+'px;" title="'+unit+'"></div>';
                    left += barWidth;
                  }
                }
                html += "</div>";
                el.innerHTML = html;
              }
              break;
            case "Def":
              var def = {defense: 0, defense_cavalry: 0, defense_archer: 0 };
              var html = "";
              for( var unit in serverInfo.unitInfo ) {
                for( var key in def ) {
                  def[key] += data.units.there[unit] * serverInfo.unitInfo[unit][key];
                }
              }
              for( var key in def ) {
                var p = Math.min(def[key]*100/Settings.settings.map[key],100);
                Settings.settings.storage[key+"ColFloating"] = true;
                var cols = Storage.getColors(key,p)
                html += '<div style="position:relative; text-align:right; font-size:xx-small; font-weight:bold; top:0px; left:10px; background-color:' + cols.background.toString(true,0.4) + '; color:'+cols.text+'; width:'+(Map.twmap.map.scale[0]-12)+'px;">';
                html += lib.formatNumber(def[key],true,true,2) + "</div>";
              }
              el.innerHTML = html;
              break;
            case "AttsNSups":
              var c = cmds[x+"_"+y];
              var incs = 0;
              var sups = 0;
              if( c ) {
                incs = getValidArrivals(c.incs);
                sups = getValidArrivals(c.supports);
              }
              if( incs || sups ) {
                if( incs > 0 ) {
                  var div = el.appendChild(ce("div"));
                  div.style.position = "absolute";
                  div.style.width = (Map.twmap.map.scale[0]-25)+"px";
                  div.style.height = "20px";
                  div.style.top = "0px";
                  div.style.left = "0px";
                  div.style.color = "white";
                  div.style.fontSize = "xx-small";
                  div.style.fontWeight = "bold";
                  div.style.textAlign = "right";
                  div.appendChild(document.createTextNode(incs));
                }
                if( sups > 0 ) {
                  var div = el.appendChild(ce("div"));
                  div.style.position = "absolute";
                  div.style.width = (Map.twmap.map.scale[0]-25)+"px";
                  div.style.height = "20px";
                  div.style.top = "20px";
                  div.style.left = "0px";
                  div.style.color = "white";
                  div.style.fontSize = "xx-small";
                  div.style.fontWeight = "bold";
                  div.style.textAlign = "right";
                  var img = div.appendChild(ce("img"));
                  img.style.position = "absolute";
                  img.alt = "";
                  img.src = Map.supportpng;
                  img.style.width = "14px";
                  img.style.height = "14px";
                  img.style.left = (Map.twmap.map.scale[0] - 20) + "px";
                  div.appendChild(document.createTextNode(sups));
                }
              }
              break;
          }
        }
      }
      else {
        var coords = x+"_"+y;
        var data = new Village( coords );
        var img = $("map_village_"+village.id);
        var bonus = 0;
        if( village.bonus ) {
          bonus = village.bonus[1].match(/bonus\/([^\.]+)\.png/);
          if( bonus )
            bonus = boni[bonus[1]];
        }
        color = "#969696";
        if( img.style.backgroundColor )
          color = new Color(img.style.backgroundColor).toString();
        data.updateMapData(bonus,color);
        var hasAtt = cmds[coords] && cmds[coords].attacks.length > 0;
        var isNoFarm = nofarms.indexOf(coords+";")>-1;
        if( isNoFarm ) {
          var img = el.appendChild(ce("img"));
          img.id = "dsfm_stop_"+x+"_"+y;
          img.style.position = "absolute";
          img.style.left = ((Map.twmap.map.scale[0] - 15) / 2)+"px";
          img.style.top = ((Map.twmap.map.scale[1] - 15) / 2)+"px";
          img.src = Map.nofarmpng;
          //img.style.zIndex = "6";
        }
        if( hasAtt ) {
          var icon = Map.twmap.commandIcons[village.id];
          if( !icon || ( icon.length == 1 && icon[0].img == "return" ) ) {
            var img = el.appendChild(ce("img"));
            img.id = "dsfm_att_"+x+"_"+y;
            img.style.position = "absolute";
            img.style.left = ((Map.twmap.map.scale[0] - 15) / 2)+"px";
            img.style.top = ((Map.twmap.map.scale[1] - 15) / 2)+"px";
            img.src = Map.attentionpng;
            img.style.zIndex = "7";
          }
        }
        switch( Map.otherOvl ) {
          case "Points":
            el.appendChild(Map.createSingleTextOverlay(village.points,"white"));
            break;
          case "Mood":
            el.appendChild(Map.createSingleTextOverlay(village.mood+"%","white"));
            break;
          case "Name":
              if( village.owner > 0 )
                el.appendChild(Map.createMultiTextOverlay(village.name,"rgb(240,200,0)"));
            break;
          case "Ally":
            if( village.owner > 0 && Map.twmap.players[village.owner].ally > 0 )
                el.appendChild(Map.createMultiTextOverlay(Map.twmap.allies[Map.twmap.players[village.owner].ally].name,"rgb(240,200,0)"));
            break;
          case "Coords":
            el.appendChild(Map.createSingleTextOverlay(x+"|"+y,"white",""));
            break;
          case "Player":
            if( village.owner > 0 )
              el.appendChild(Map.createMultiTextOverlay(Map.twmap.players[village.owner].name,"rgb(240,200,0)"));
            break;
          case "FarmInfo":
            if( Settings.settings.map.showPoints ) {
              var div = el.appendChild(ce("div"));
              div.style.position = "relative";
              div.style.top = "0px";
              div.style.left = "10px";
              div.style.color = "rgb(240,240,240)";
              div.style.width = (Map.twmap.map.scale[0]-10)+"px";
              div.style.height = "5px";
              div.style.fontSize = "xx-small";
              div.innerHTML = lib.formatNumber(village.points,true,true);
            }
            var age = (Map.ts - (data.lastreport.timestamp == 0 ? data.res.timestamp : data.lastreport.timestamp) ) / 3600;
            var ageOpacity = 1;
            //HS _ KO 001-->
            if (Settings.settings.map.ageTransparency) {
              if( age > Settings.settings.map.minAgeTransparency )
                ageOpacity = 1-(age/(Settings.settings.misc.reportMaxAge*24));
              if( ageOpacity < 0.2 )
                ageOpacity = 0.2;
            };
            //HS _ KO 001<--
            div = el.appendChild(ce("div"));
            div.style.position = "relative";
            //div.style.top = "-5px"; //HS _ KO 001
            div.style.left = "0px";
            div.style.color = "rgb(240,240,240)";
            div.style.width = (Map.twmap.map.scale[0])+"px";
            div.style.height = (Map.twmap.map.scale[1])+"px";
            div.style.fontSize = "xx-small";
            div.style.opacity = ageOpacity;
            if( Settings.settings.map.showWall && (data.buildings.timestamp>0 && data.buildings.wall.level > 0 || data.unitsin.hasUnits || data.unitsout.hasUnits) ) {
              var img = div.appendChild(ce("img"));
              img.style.position = "relative";
              if( data.unitsin.hasUnits || data.unitsout.hasUnits )
                img.src = Map.unitspng;
              else
                img.src = Map.wallpng;
            }
            if( data.res.timestamp > 0 && (Settings.settings.map.showRessis || Settings.settings.map.showBars) ) {
              var color;
              var barWidth = Map.twmap.map.scale[0] - 10;
              if( data.buildings.timestamp > 0 ) {
                var size = new Array( 0, 0, 0, 0 );
                var f = useeq ? Math.max(Settings.settings.place.minEQ,data.eq) / 100 : 1;
                var max = serverInfo.getStorageSize(data) - serverInfo.getHideSize(data.buildings.hide.level);
                var barMax = Math.max(max, Map.minBarMax);
                var cur = Math.round(serverInfo.getRessource(data, "wood")*f);
                var sum = cur;
                size[0] = Math.floor(barWidth * cur / barMax);
                cur = Math.round(serverInfo.getRessource(data, "stone")*f);
                sum += cur;
                size[1] = Math.floor(barWidth * cur / barMax);
                cur = Math.round(serverInfo.getRessource(data, "iron" )*f);
                sum += cur;
                size[2] = Math.floor(barWidth * cur / barMax);
                var sumOpacity = Settings.settings.map.opacityMin / 100.0;
                var sumOpacity =  Math.min(sumOpacity + (1.0 - sumOpacity/100) * (sum / Settings.settings.map.opacityMaxRes), 1);
                if( sum > 1000 )
                  sum = Math.round(sum / 100) / 10 + "k";
                if( Settings.settings.map.playerColored && village.owner > 0 )
                  color = "rgba(255,100,100,"+sumOpacity+")";
                else
                  color = "rgba(255,255,255,"+sumOpacity+")";
                size[3] = Math.floor((Map.twmap.map.scale[0]-8) * Math.max(Settings.settings.place.minEQ,data.eq) / 100);
              }
              else if( data.res.timestamp > 0 ) {
                var sum = data.res["wood"] + data.res["stone"] + data.res["iron"];
                var sumOpacity = Settings.settings.map.opacityMin / 100.0;
                var sumOpacity =  Math.min(sumOpacity + (1.0 - sumOpacity/100) * (sum / Settings.settings.map.opacityMaxRes), 1);
                if( sum > 1000 )
                  sum = Math.round(sum / 100) / 10 + "k";
                if( Settings.settings.map.playerColored && village.owner > 0 )
                  color = "rgba(255,128,255,"+sumOpacity+")";
                else
                  color = "rgba(81,236,255,"+sumOpacity+")";
              }
              if( Settings.settings.map.showRessis ) {
                var resDiv = div.appendChild(ce("div"));
                resDiv.style.position = "absolute";
                resDiv.style.width = Map.twmap.map.scale[0]+"px";
                resDiv.style.height = "5px";
                resDiv.style.top = "10px";
                resDiv.style.fontSize = "xx-small";
                resDiv.style.fontWidht = "bold";
                resDiv.style.color = color;
                resDiv.innerHTML = sum;
              }
              if( Settings.settings.map.showBars && data.buildings.timestamp > 0 )
                div.appendChild(Map.createResBarDiv( size ));
            }
            break;
          case "AttsNSups":
              var c = cmds[x+"_"+y];
              var atts = 0;
              var sups = 0;
              if( c ) {
                atts = getValidArrivals(c.attacks);
                sups = getValidArrivals(c.supports);
              }
              if( atts || sups ) {
                if( atts > 0 ) {
                  var div = el.appendChild(ce("div"));
                  div.style.position = "absolute";
                  div.style.width = (Map.twmap.map.scale[0]-25)+"px";
                  div.style.height = "20px";
                  div.style.top = "0px";
                  div.style.left = "0px";
                  div.style.color = "white";
                  div.style.fontSize = "xx-small";
                  div.style.fontWeight = "bold";
                  div.style.textAlign = "right";
                  div.appendChild(document.createTextNode(atts));
                }
                if( sups > 0 ) {
                  var div = el.appendChild(ce("div"));
                  div.style.position = "absolute";
                  div.style.width = (Map.twmap.map.scale[0]-25)+"px";
                  div.style.height = "20px";
                  div.style.top = "20px";
                  div.style.left = "0px";
                  div.style.color = "white";
                  div.style.fontSize = "xx-small";
                  div.style.fontWeight = "bold";
                  div.style.textAlign = "right";
                  var img = div.appendChild(ce("img"));
                  img.style.position = "absolute";
                  img.alt = "";
                  img.src = Map.supportpng;
                  img.style.width = "14px";
                  img.style.height = "14px";
                  img.style.left = (Map.twmap.map.scale[0] - 20) + "px";
                  div.appendChild(document.createTextNode(sups));
                }
              }
              break;
        }
        delete v;
      }    
    }
  },
  createTopoGroupOverlay : function(divGroups, sector) {
    var groupColors = { };
    for( var g = 0; g < Settings.userGroups.length; g++ ) {
      if( Settings.userGroups[g].show ) {
        groupColors[Settings.userGroups[g].name] = Settings.userGroups[g].color;
      }
    }
    for( var key in Map.myVillages ) {
      var village = Map.myVillages[key];
      if( village.coords.x >= sector.x && village.coords.x <= sector.x + Map.twmap.minimap.sectorSize && 
          village.coords.y >= sector.y && village.coords.y <= sector.y + Map.twmap.minimap.sectorSize ) {
        for( var group in groupColors ) {
          if( village.groups.list.indexOf(group) > -1 ) {
            var div = divGroups.appendChild(ce("div"));
            div.style.position = "absolute";
            var left = ((village.coords.x - sector.x) * 5 + 1);
            var top = ((village.coords.y - sector.y) * 5 + 1);
            var size = 4;
            if( Settings.settings.map.topoBorderOwn ) {
              div.style.border = "1px solid yellow";
              left--;
              top--;
            }
            div.style.left = left + "px";
            div.style.top = top + "px";
            div.style.width = size + "px";
            div.style.height = size + "px";
            div.style.backgroundColor = groupColors[group];
            break;
          }
        }
      }
    }
  },
  createTopoChurchOverlay : function(canvas,sector) {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.lineWidth = 3;
    ctx.lineCap = "butt";
    ctx.lineJoin = "round";
    var churchOffs = [
      [0,-4,1,-4,1,-3,2,-3,3,-3,3,-2,4,-2,4,-1,4,0,5,0,5,1,4,1,4,2,4,3,3,3,3,4,2,4,1,4,1,5,0,5,0,4,-1,4,-2,4,-2,3,-3,3,-3,2,-3,1,-4,1,-4,0,-3,0,-3,-1,-3,-2,-2,-2,-2,-3,-1,-3,0,-3,0,-4],
      [0,-6,1,-6,1,-5,2,-5,3,-5,4,-5,4,-4,5,-4,5,-3,6,-3,6,-2,6,-1,6,0,7,0,7,1,6,1,6,2,6,3,6,4,5,4,5,5,4,5,4,6,3,6,2,6,1,6,1,7,0,7,0,6,-1,6,-2,6,-3,6,-3,5,-4,5,-4,4,-5,4,-5,3,-5,2,-5,1,-6,1,-6,0,-5,0,-5,-1,-5,-2,-5,-3,-4,-3,-4,-4,-3,-4,-3,-5,-2,-5,-1,-5,0,-5,0,-6],
      [0,-8,1,-8,1,-7,2,-7,3,-7,4,-7,4,-6,5,-6,6,-6,6,-5,7,-5,7,-4,7,-3,8,-3,8,-2,8,-1,8,0,9,0,9,1,8,1,8,2,8,3,8,4,7,4,7,5,7,6,6,6,6,7,5,7,4,7,4,8,3,8,2,8,1,8,1,9,0,9,0,8,-1,8,-2,8,-3,8,-3,7,-4,7,-5,7,-5,6,-6,6,-6,5,-6,4,-7,4,-7,3,-7,2,-7,1,-8,1,-8,0,-7,0,-7,-1,-7,-2,-7,-3,-6,-3,-6,-4,-6,-5,-5,-5,-5,-6,-4,-6,-3,-6,-3,-7,-2,-7,-1,-7,0,-7]
    ];
    for( var i = 0; i < Map.churches.length; i++ ) {
      var x = sector.x - 8;
      var y = sector.y - 8;
      var ex = sector.x + Map.twmap.minimap.sectorSize + 8;
      var ey = sector.y + Map.twmap.minimap.sectorSize + 8;
      if( Map.churches[i].x >= x && Map.churches[i].x <= ex && Map.churches[i].y >= y && Map.churches[i].y <= ey ) {
        ctx.strokeStyle = Map.churches[i].color;
        var x = (Map.churches[i].x - sector.x) * 5 + 0.5;
        var y = (Map.churches[i].y - sector.y) * 5 + 0.5;
        ctx.beginPath();
        ctx.moveTo(x+churchOffs[Map.churches[i].radius][0]*5,y+churchOffs[Map.churches[i].radius][1]*5);
        for( var j = 2; j < churchOffs[Map.churches[i].radius].length; j += 2)
          ctx.lineTo(x+churchOffs[Map.churches[i].radius][j]*5,y+churchOffs[Map.churches[i].radius][j+1]*5);
        ctx.closePath();
        ctx.stroke();
      }
    }
  },
  reCreateTopoOverlays : function() {
    for( var key in Map.twmap.minimap._loadedSectors ) {
      var canvas = $("dsfm_topo_canvas_"+ Map.twmap.minimap._loadedSectors[key].sx + "_" + Map.twmap.minimap._loadedSectors[key].sy);
      Map.createTopoChurchOverlay(canvas,Map.twmap.minimap._loadedSectors[key]);
    }
  },
  createSingleTextOverlay : function(text,color) {
    var div = ce("div");
    div.style.position = "relative";
    div.style.width = Map.twmap.map.scale[0]+"px";
    div.style.height = "10px";
    div.style.top = (Map.twmap.map.scale[1] / 2 - 5)+"px";
    div.style.overlay = "hidden";
    div.style.fontSize = "xx-small";
    div.style.fontWeight = "bold";
    div.style.color = color;
    div.style.textAlign = "center";
    div.style.verticalAlign = "middle";
    div.innerHTML = text;
    return div;
  },
  createMultiTextOverlay : function(text,color) {
    var div = ce("div");
    div.style.position = "relative";
    div.style.width = (Map.twmap.map.scale[0]-10)+"px";
    div.style.height = Map.twmap.map.scale[1]+"px";
    div.style.left = "10px";
    div.style.overlay = "hidden";
    div.style.fontSize = "xx-small";
    div.style.color = color;
    div.innerHTML = escapeHTML(text,"<wbr/>");
    return div;
  },
  createResBarDiv : function(size) {
    var div = ce("div");
    div.style.position = "absolute";
    div.style.width = (Map.twmap.map.scale[0]-6)+"px";
    div.style.height = (Map.twmap.map.scale[1]-24)+"px";
    div.style.top = "22px";
    div.style.left = "3px";
    div.style.border = "1px solid #804000";
    div.style.backgroundColor = "rgba(255,255,255,0.2)";
    var colors = ["#9E733F", "#963306", "#8E8787" ]
    for( var i = 0; i < 3; i++ ) {
      var row = div.appendChild(ce("div"));
      row.style.position = "relative";
      row.style.border = "1px solid rgba(255,255,255,0.6)";
      row.style.top = "1px";
      row.style.left = "1px";
      row.style.width = size[i]+"px";
      row.style.height = "2px";
      row.style.backgroundColor = colors[i];
    }
    if( size.length == 4 )  {
      row = div.appendChild(ce("div"));
      row.style.position = "absolute";
      row.style.top = "0px";
      row.style.left = size[3]+"px";
      row.style.width = "1px";
      row.style.height = "14px";
      row.style.backgroundColor = "#00EE00";
    }
    return div;
  },
  showStats : function() {
    var minTS = lib.getTime();
    minTS -= Settings.settings.map.saveHours * 3600;
    var beute = doCleanUpKey("beute",minTS).split(";");
    minTS = lib.getTime();
    minTS -= Settings.settings.map.sumHours * 3600;
    var sums = [ 0, 0, 0, 0 ];
    for(var i = 0; i < beute.length; i++ ) {
      var vals = beute[i].split(",");
      if( vals[0] >= minTS ) {
        if( ownPid == vals[1] ) {
          sums[0] += parseInt(vals[2],10);
          sums[1] += parseInt(vals[3],10);
          sums[2] += parseInt(vals[4],10);
          sums[3]++;
        }
      }
    }
    //alert( "Holz: " + sums[0] +"\n" + "Lehm: " + sums[1] +"\n" + "Eisen: " + sums[2] +"\n" + "Summe: " + (sums[0]+sums[1]+sums[2]) +"\nAtts:" + sums[3]);
    $("dsfm_sumwood").innerHTML = lib.formatNumber(sums[0],true,true);
    $("dsfm_sumstone").innerHTML = lib.formatNumber(sums[1],true,true);
    $("dsfm_sumiron").innerHTML = lib.formatNumber(sums[2],true,true);
    $("dsfm_sumtotal").innerHTML = lib.formatNumber(sums[0]+sums[1]+sums[2],true,true);
    $("dsfm_sumreports").innerHTML = lib.formatNumber(sums[3],true,true);
    Map.statsPopup.show();
  },
  setPopupInfos : function(coords,id) {
    var village = new Village(coords[0],coords[1]);
    var hasInfos = false;
    var infoTab = $("dsfm_popupinfos");
    //HS _ K 002 
    if (infoTab) {
      var row = infoTab.rows[0];
      while(row = row.nextSibling)
        row.style.display="none";
      var html = "";
      var f = useeq ? Math.max(Settings.settings.place.minEQ,village.eq) / 100 : 1;
      if( village.res.timestamp > 0 && Settings.settings.popup.showRessis ) {
        html = '<table style="white-space: nowrap;"><tr>';
        if( village.buildings.timestamp > 0 ) {
          var max = serverInfo.getStorageSize(village)-serverInfo.getHideSize(village.buildings.hide.level);
          var sum = 0;
          for( var res in resInfos ) {
            var val = Math.round(serverInfo.getRessource(village, res) * f);
            if( val < 0 )
              val = 0;
            var txt = lib.formatNumber(val,true,true);
            sum += val;
            var color = "#000";
            if( val >= max )
              color = "#FF0000";
            else if( val >= max*0.75 )
              color ="#FF6A00";
            else if( village["bonus"] == resInfos[res].bonus || village["bonus"] == 8)
              color = "#00A012";
            html += '<td><img src="graphic/'+resInfos[res].img+'" border="0" alt=""/></td><td style="padding-right:20px; color:'+color+'">'+txt+'</td>';
          }
          if( sum >= 0 )
            html += '<td><img src="graphic/res.png" border="0" alt=""/></td><td>'+lib.formatNumber(sum,true,true)+'</td>';

          html += '<td>&#216; ' + Math.max(Settings.settings.place.minEQ,village.eq) + '%</td>'

          showReportAge(village.buildings.timestamp, "resources");
        }
        else if( village.res.timestamp > 0 ) {
          var sum = 0;
          for( var res in resInfos ) {
            var val = village.res[res];
            sum += val;
            var color = "rgb(0,38,255)";
            html += '<td><img src="graphic/'+resInfos[res].img+'" border="0" alt=""/></td><td style="padding-right:20px; color:'+color+';">'+lib.formatNumber(val,true,true)+'</td>';
          }
          if( sum >= 0 )
            html += '<td><img src="graphic/res.png" border="0" alt=""/></td><td>'+lib.formatNumber(sum,true,true)+'</td>';
          showReportAge(village.res.timestamp, "resources");
        }
        html += '</tr></table>';
        $("dsfm_resources").innerHTML = html;
        $("dsfm_resources_row").style.display = '';
        hasInfos = true;
      }
      if( village.buildings.timestamp > 0 ) {
        if( Settings.settings.popup.showBuildings ) {
          $("dsfm_buildings_row").style.display = '';
          $("dsfm_buildings").innerHTML = getBuildingsTab(village.buildings, Settings.settings.popup.showBuildingChange, 0);
          showReportAge(village.buildings.timestamp, "buildings");
          hasInfos = true;
        }
        if( Settings.settings.popup.showMining && village.buildings.storage.level > 0) {
          $("dsfm_mining_row").style.display = '';
          html = '<table><tr>';
          var val;
          var color;
          for( var res in resInfos ) {
            val = serverInfo.getMining(village.buildings[res].level);
            color = "#000";
            if( village["bonus"] == 8 ) {
              val = Math.round(val * 1.3);
              color = "#00A012";
            }
            else if( village["bonus"] == resInfos[res].bonus ) {
              val = Math.round(val * 2);
              color = "#00A012";
            }
            html += '<td><img src="graphic/'+resInfos[res].img+'" border="0" alt=""/></td><td style="padding-right:20px; color:'+color+'">'+lib.formatNumber(val,true,true)+'</td>';
          }
          val = serverInfo.getStorageSize(village);
          color = "#000";
          if( village["bonus"] == 9)
            color = "#00A012";
          html += '<td><img src="graphic/res.png" border="0" alt=""/></td><td style="padding-right:20px; color:'+color+'">'+lib.formatNumber(val,true,true)+'</td>';
          html += '<td><img src="graphic/buildings/hide.png" border="0" alt=""/></td><td>'+lib.formatNumber(serverInfo.getHideSize(village.buildings.hide.level),true,true)+'</td>';
          html += '</tr></table>';
          $("dsfm_mining").innerHTML = html;
          showReportAge(village.buildings.timestamp, "resources");
          hasInfos = true;
        }
      }
      if( village.unitsin.hasUnits && Settings.settings.popup.showUnitsIn ) {
        $("dsfm_unitsin_row").style.display = '';
        $("dsfm_unitsin").innerHTML = getUnitsTab(village.unitsin);
        showReportAge(village.unitsin.timestamp, "unitsin");
        hasInfos = true;
      }
      if( village.unitsout.hasUnits && Settings.settings.popup.showUnitsOut ) {
        $("dsfm_unitsout_row").style.display = '';
        $("dsfm_unitsout").innerHTML = getUnitsTab(village.unitsout);
        showReportAge(village.unitsout.timestamp, "unitsout");
        hasInfos = true;
      }
      if( village["loyalty"] && Settings.settings.popup.showLoyalty ) {
        var loyalty = village["loyalty"]["value"];
        var h = Math.round((lib.getTime() - village["loyalty"].timestamp) / 3600);
        loyalty += Math.round(h * serverInfo.config.speed * serverInfo.config.snob_factor);
        if( loyalty < 100 ) {
          $("dsfm_loyalty_row").style.display = '';
          $("dsfm_loyalty").innerHTML = loyalty;
          hasInfos = true;
        }
      }
      $("dsfm_popupinfo_row").style.display = hasInfos ? "table-row" : "none";
      if( PrivateVillageName.names[id] && Settings.settings.misc.privateNames) {
        var title = $("info_title");
        var res = title.textContent.match(texts[lib.lang].regex.villageLink);
        if( res ) {
          var name = title.textContent.substring(0,title.textContent.length-res[0].length);
          title.innerHTML = '<span style="float:left;">'+PrivateVillageName.names[id] + " " + res[0]+'</span><span style="float:right; font-size:xx-small; color:#444444">'+name+'</span>';
        }
      }
      //Groups.modMapPopup();
    }; //HS _ K 002 if infoTab
  },
  toggleBBCode : function() {
    Map.bbcode = this.checked;
    lib.storage.setValue("bbcode"+ownPid,Map.bbcode);
    var input1 = $("dsfm_coords");
    var input2 = $("dsfm_coordlist");
    if( Map.bbcode ) {
      input1.value = input1.value.replace(/(\d+\|\d+)/g,"[coord]$1[/coord]");
      input2.value = input2.value.replace(/(\d+\|\d+)/g,"[coord]$1[/coord]");
    }
    else {
      input1.value = input1.value.replace(/\[coord\](\d+\|\d+)\[\/coord\]/g,"$1");
      input2.value = input2.value.replace(/\[coord\](\d+\|\d+)\[\/coord\]/g,"$1");
    }
    lib.storage.setValue("coordlist"+ownPid,input.value.replace("\n",";").replace("\r",""));
  },
  compareOvlOpt : function(a,b) {

    a = texts[lib.lang].gui["ovl"+a];
    b = texts[lib.lang].gui["ovl"+b];
    compare(a,b);
  },
  addVillageGroups : function() {
    if( Settings.settings.map.villageGroups ) {
      container = $("map_topo");
      if( container ) {
        var tabHead = container.insertBefore(ce("table"),$("dsfm_options").nextSibling);
        tabHead.className="vis";
        var row = tabHead.insertRow(0);
        var cell = row.insertCell(0);
        var a = cell.appendChild(ce("a"));
        a.href = "javascript:;";
        a.innerHTML = texts[lib.lang].gui.allys;
        a.addEventListener("click", Map.toggleVillageGroup, false );
        cell = row.insertCell(1);
        a = cell.appendChild(ce("a"));
        a.href = "javascript:;";
        a.innerHTML = texts[lib.lang].gui.player;
        a.addEventListener("click", Map.toggleVillageGroup, false );

        var div = container.insertBefore(ce("div"),tabHead.nextSibling);
        div.style.margin = "0 auto";
        div.style.width = "300px";
        div.style.height = "300px";
        div.style.overflow = "auto";
        for( var i = 0; i < 2; i++ ) {
          var tab = div.appendChild(ce("table"));
          tab.className="vis overview_table";
          tab.width="100%";
          tab.id = "dsfm_vilgrp"+i;
          var head = tab.appendChild(ce("thead"));
          row = head.insertRow(0);
          cell = row.appendChild(ce("th"));
          cell.innerHTML = texts[lib.lang].gui.name;
          cell = row.appendChild(ce("th"));
          cell.innerHTML = texts[lib.lang].gui.villages;
          cell.style.textAlign = "right";
          cell = row.appendChild(ce("th"));
          cell.innerHTML = texts[lib.lang].gui.points;
          cell.style.textAlign = "right";
          tab.appendChild(ce("tbody"));
        }
        Map.villageGroup = lib.storage.getValue("vilgrp"+ownPid,0);
        lib.fireEvent(tabHead.rows[0].cells[Map.villageGroup].firstChild,"click");
      }
    }
  },
  toggleVillageGroup : function (e) {
    var row = e.target.parentNode.parentNode;
    for( var i = 0; i < row.cells.length; i++ ) {
      if( row.cells[i] == e.target.parentNode ) {
        Map.villageGroup = i;
        lib.storage.setValue("vilgrp"+ownPid,i);
        row.cells[i].className = "selected";
        $("dsfm_vilgrp"+i).style.display="";
      }
      else {
        row.cells[i].className = "";
        $("dsfm_vilgrp"+i).style.display="none";
      }
    }
  },
  updateVillageGroups : function() {
    Map.stopFlash();
    var start = new Date().getTime();
    var screen = [ "info_ally", "info_player" ];
    var x0 = parseInt(Map.twmap.map.pos[0] / Map.twmap.map.scale[0]);
    var y0 = parseInt(Map.twmap.map.pos[1] / Map.twmap.map.scale[1]);
    var xx = x0+Map.twmap.map.size[0] / Map.twmap.map.scale[0];
    var yy = y0+Map.twmap.map.size[1] / Map.twmap.map.scale[1];
    if( xx > 999 )
      xx = 999;
    if( yy > 999 )
      yy = 999;
    Map.villageOwners = [[],[]];
    Map.villageGroups = [[],[]];
    for( var x = x0; x < xx; x++ ) {
      for( var y = y0; y < yy; y++ ) {
        var v = Map.twmap.villages[x*1000+y];
        if( v && v.owner > 0 ) {
          var np = [];
          var points = parseInt(v.points.replace(/\./g,""),10);
          if( Map.twmap.players[v.owner].ally > 0 ) {
            np[0] = { name: Map.twmap.allies[Map.twmap.players[v.owner].ally].name, id: Map.twmap.players[v.owner].ally, points: parseInt(Map.twmap.allies[Map.twmap.players[v.owner].ally].points.replace(/\./g,""),10) };
          }
          np[1] = { name: Map.twmap.players[v.owner].name, id: v.owner, points: parseInt(Map.twmap.players[v.owner].points.replace(/\./g,""),10) };
          if( np[0] && np[1] && Settings.settings.map.vgShowAlly )
            np[1].name += " - " + np[0].name;
          for( var g = 0; g < 2; g++ ) {
            if( np[g] ) {
              if( Map.villageGroups[g][np[g].name] ) {
                Map.villageGroups[g][np[g].name].count++;
                Map.villageGroups[g][np[g].name].imgs.push($("map_village_"+v.id));
                Map.villageGroups[g][np[g].name].points += points;
              }
              else {
                Map.villageGroups[g][np[g].name] = { name: np[g].name, count: 1, imgs: [$("map_village_"+v.id)], points: points, totalPoints: np[g].points };
                Map.villageOwners[g].push( { name: np[g].name, id: np[g].id, sortname: np[g].name.replace(/[^\w]/g, "").replace(/_/,"").toUpperCase() } );
              }
            }
          }
        }
      }
    }
    
    var count = 0;
    for( var g = 0; g < 2; g++ ) {
      Map.villageOwners[g].sort(function(a,b) { return compare(a.sortname,b.sortname); });
      var list = $("dsfm_vilgrp"+g);
      list.tBodies[0].innerHTML = "";
      var rowClass = [ "row_a", "row_b" ];
      for( i = 0; i < Map.villageOwners[g].length; i++ ) {
        count++;
        var row = list.tBodies[0].insertRow(i);
        row.className = rowClass[i&1];
        var cell = row.insertCell(0);
        var a = cell.appendChild(ce("a"));
        a.innerHTML = Map.villageOwners[g][i]["name"];
        a.href = lib.createLink(screen[g], "id", Map.villageOwners[g][i]["id"], false);
        cell = row.insertCell(1);
        cell.style.textAlign = "right";
        a = cell.appendChild(ce("a"));
        a.innerHTML = Map.villageGroups[g][Map.villageOwners[g][i].name].count;
        a.href = "javascript:;";
        a.addEventListener("click", Map.startFlash, false );
        cell = row.insertCell(2);
        cell.style.textAlign = "right";
        cell.innerHTML = lib.formatNumber(Map.villageGroups[g][Map.villageOwners[g][i].name].points,true,true,2)+"/"+lib.formatNumber(Map.villageGroups[g][Map.villageOwners[g][i].name].totalPoints,true,true,2);
        cell.title = lib.formatNumber(Map.villageGroups[g][Map.villageOwners[g][i].name].points,true,false)+"/"+lib.formatNumber(Map.villageGroups[g][Map.villageOwners[g][i].name].totalPoints,true,false);
      }
    }
    lib.debug.log( "Player/Ally-List created in " + (new Date().getTime()-start) + "ms");
    return count;
  },
  updateOverlays : function() {
    var x0 = parseInt(Map.twmap.map.pos[0] / Map.twmap.map.scale[0])-1;
    var y0 = parseInt(Map.twmap.map.pos[1] / Map.twmap.map.scale[1])-1;
    var xx = x0+Map.twmap.map.size[0] / Map.twmap.map.scale[0]+2;
    var yy = y0+Map.twmap.map.size[1] / Map.twmap.map.scale[1]+2;
    if( x0 < 0 )
      x0 = 0;
    if( y0 < 0 )
      y0 = 0;
    if( xx > 999 )
      xx = 999;
    if( yy > 999 )
      yy = 999;
    for( var x = x0; x < xx; x++ ) {
      for( var y = y0; y < yy; y++ ) {
        var sx = Math.floor(x/Map.twmap.map.sectorSize);
        var sy = Math.floor(y/Map.twmap.map.sectorSize);
        var sector = Map.twmap.map._loadedSectors[sx+"_"+sy];
        if( sector ) {
          var village = Map.twmap.villages[x*1000+y];
          if( village ) {
            var el = $("dsfm_overlay_"+x+"_"+y);
            if( !el ) {
              el = document.createElement('div');
              el.style.position = 'absolute';
              el.style.zIndex = '5';
              el.id = "dsfm_overlay_"+x+"_"+y;
              el.style.width = Map.twmap.map.scale[0]+"px";
              el.style.height = Map.twmap.map.scale[1]+"px";
              Map.queue.push( { x: x, y: y, el: el, village: village } );
              sector.appendElement(el, x-sector.x, y-sector.y);
            }
          }
        }
      }
    }
    if( Map.queue.length > 0 )
      Map.createOverlays();
    for( var key in Map.twmap.minimap._visibleSectors ) {
      var sector = Map.twmap.minimap._visibleSectors[key];
      var el = $("dsfm_topo_canvas_"+key);
      if( ! el ) {
        var canvas = ce("canvas");
        canvas.style.position = "absolute";
        canvas.width = "250";
        canvas.height = "250";
        canvas.style.zIndex = 11;
        canvas.className = "dsfm_topo_canvas";
        canvas.style.display = Map.simChurches ? "":"none";
        canvas.id = "dsfm_topo_canvas_"+key;
        Map.createTopoChurchOverlay(canvas,sector);
        sector.appendElement(canvas,0,0);
      }
      if( Settings.settings.map.groupsOnTopo ) {
        el = $("dsfm_topo_div_"+key);
        if( !el ) {
          var div = ce("div");
          div.style.position = "absolute";
          div.style.width = Map.twmap.minimap.size[0]+"px";
          div.style.height = Map.twmap.minimap.size[1]+"px";
          div.style.zIndex = 10;
          div.id = "dsfm_topo_div_"+key;
          div.className = "dsfm_topo_overlay";
          if( !Map.groupsOnTopo ) 
            div.style.display = "none";
          if( Settings.settings.map.shadowTopo )
            div.style.backgroundColor = "rgba(0,0,0,0.4)";
          sector.appendElement(div,0,0);
          Map.createTopoGroupOverlay(div,sector);
        }
      }
    }
  },
  watchMap : function() {
    var x = Map.twmap.map.pos[0];
    var y = Map.twmap.map.pos[1];
    if( !Map.twmap.scrolling && (Map.mopX != x || Map.mopY != y) ) {
      Map.updateOverlays();
      Map.updateVillageGroups();
      Map.mopX = x;
      Map.mopY = y;
      if( Settings.settings.map.rememberPos && (x != curVillage.map.x || y != curVillage.map.y) ) {
        curVillage.map.timestamp = lib.getTime();
        curVillage.map.x = Map.twmap.pos[0];
        curVillage.map.y = Map.twmap.pos[1];
        curVillage.save();
      }
    }
  },
  startFlash : function (e) {
    if(Map.flashItem != e.target.parentNode.parentNode) {
      Map.stopFlash();
      Map.flashItem = e.target.parentNode.parentNode;
      Map.flashItem.className = "selected";
      Map.toFlash = Map.villageGroups[Map.villageGroup][Map.flashItem.cells[0].firstChild.innerHTML].imgs;
      Map.flashTimer = setInterval(Map.flash, 500);
    }
    else
      Map.stopFlash();
  },
  flash : function() {
    if( Map.toFlash ) {
      for( var i = 0; i < Map.toFlash.length; i++ )
        Map.toFlash[i].style.display = Map.flashOdd ? "none" : "";
      Map.flashOdd = !Map.flashOdd;
    }
  },
  stopFlash : function() {
    clearInterval(Map.flashTimer);
    if( Map.flashItem )
      Map.flashItem.className="";
    if( Map.toFlash ) {
      for( var i = 0; i < Map.toFlash.length; i++ )
        Map.toFlash[i].style.display = "";
      Map.flashOdd = false;
    }
    Map.toFlash = null;
    Map.flashItem = null;
  },
  onContextMenu : function(e) {
    if( Settings.settings.misc.ctxCtrl && !CoordSelector.ctrlDown ) return;
    var pos = Map.twmap.map.coordByEvent(e);
    var x = pos[0];
    var y = pos[1];
    var v = Map.twmap.villages[x*1000+y];
    if( v ) {
      if( v.owner == ownPid )
        Common.contextMenuOwn.show(e.pageX,e.pageY,x+"|"+y, { id: v.id, x: x, y: y });
      else
        Common.contextMenuOther.show(e.pageX,e.pageY,x+"|"+y, { id: v.id, x: x, y: y });
      e.preventDefault();
    }
  },
  onMouseDown: function(e) {
    if( e.button == 0 ) {
      var pos = Map.twmap.map.coordByEvent(e);
      Map.onMouseX = pos[0];
      Map.onMouseY = pos[1];
    }
  },
  redirectLink : function(e) {
    if( e.button == 0 ) {
      var pos = Map.twmap.map.coordByEvent(e);
      var x = pos[0];
      var y = pos[1];
      if( x == Map.onMouseX && y == Map.onMouseY ) {
        var v = Map.twmap.villages[x*1000+y];
        if( v ) {
          switch( Map.redirTarget ) {
            case "removeinfo":
              if( confirm( texts[lib.lang].gui.confirm_delinfosxy[0]+" "+x+"|"+y+" "+texts[lib.lang].gui.confirm_delinfosxy[1] ) ) {
                deleteVillageInfos(x+"_"+y);
                var infos = $("dsfm_overlay_"+x+"_"+y);
                if( infos )
                  infos.innerHTML = "";
                Map.createOverlay(x,y);
              }
              break;
            case "togglenofarm":
              nofarms = lib.storage.getValue("nofarms"+ownPid,"");
              var re =  new RegExp(x+"_"+y+";" )
              if( re.test(nofarms) )
                nofarms = nofarms.replace(new RegExp(x+"_"+y+";","g"), "");
              else
                nofarms += x+"_"+y+";"
              Map.createOverlay(x,y);
              lib.storage.setValue("nofarms"+ownPid,nofarms);
              break;
            case "coordlist":
              var input = $("dsfm_coordlist");
              var coords = x+"|"+y;
              if( Map.bbcode )
                coords = "[coord]"+coords+"[/coord]";
              if( input.value.indexOf(coords) == -1  ) {
                input.value += coords + "\n";
                $("dsfm_overlay_"+x+"_"+y).style.backgroundColor = "rgba(127,255,255,0.4)";
              }
              else {
                input.value = input.value.replace(coords+"\n","");
                $("dsfm_overlay_"+x+"_"+y).style.backgroundColor = "";
              }
              input.style.height = (input.value.split("\n").length*12)+"px";
              Map.coordlist = input.value.replace("\n",";").replace("\r","");
              lib.storage.setValue("coordlist"+ownPid,Map.coordlist);
              break;
          }
        }
      }
    }
    Map.onMouseX = -1;
    Map.onMouseY = -1;
    return false;
  },
  redirTargetChanged : function() {
    var select = $("dsfm_redirTarget");
    Map.mocX = 0;
    Map.mocY = 0;
    if( arguments.length == 2 ) {
      for( var hk in Settings.hotKeys.map ) {
        if( Settings.hotKeys.map[hk].keyCode == arguments[0].keyCode && Settings.hotKeys.map[hk].modifier == arguments[1].val )
          select.value = hk;
      }
    }
    Map.redirTarget = select.value;
    $("dsfm_coordlist_div").style.display = select.value == "coordlist" ? "" : "none";
    lib.storage.setValue("redirTarget"+ownPid, Map.redirTarget);
  },
  addbb2fl : function() {
    var ts = lib.getTime();
    var minTS = ts - Settings.settings.misc.reportMaxAge * 86400;
    var anz = Math.round(Settings.settings.place.noReportLoad / 3);
    var x0 = parseInt(Map.twmap.map.pos[0] / Map.twmap.map.scale[0]);
    var y0 = parseInt(Map.twmap.map.pos[1] / Map.twmap.map.scale[1]);
    var xx = x0+Map.twmap.map.size[0] / Map.twmap.map.scale[0];
    var yy = y0+Map.twmap.map.size[1] / Map.twmap.map.scale[1];
    if( xx > 999 )
      xx = 999;
    if( yy > 999 )
      yy = 999;
    for( var x = x0; x < xx; x++ ) {
      for( var y = y0; y < yy; y++ ) {
        var idx = x*1000+y;
        var v = Map.twmap.villages[idx];
        if( v ) {
          if( v.owner == 0 ) {
            var village = new Village(x,y);
            if( village.lastreport.timestamp < minTS ) {
              village.lastreport.timestamp = ts;
              village.res.timestamp = ts;
              village.res.wood = anz;
              village.res.stone = anz;
              village.res.iron = anz;
              village.save();
              Map.createOverlay(x,y);
            }
          }
        }
      }
    }
  },
  toggleTopo : function() {
    lib.storage.setValue("groupsOnTopo"+ownPid, this.checked);
    var divs = document.getElementsByClassName("dsfm_topo_overlay");
    for( var i = 0; i < divs.length; i++ )
      divs[i].style.display = this.checked ? "" : "none";
  },
  addOwnGroupEdit : function () {
    var div = $("village_colors");
    if( div ) {
      var tab = div.firstChild.nextSibling;
      var td = tab.rows[0].cells[0];
      var newLnk = td.childNodes[td.childNodes.length-2];
      var select = document.getElementsByName("add_group")[0];
      if( select ) {
        Groups.modGroupSelect(select);
        Groups.addGroupEdit(td);
      }
    }
  },
  updateUnitDivs : function() {
    var unitDivs = document.getElementsByName("dsfm_unitsDiv");
    var chks = $("dsfm_unitOptions").getElementsByTagName("input");
    var unitSum = 0;
    for( var i = 0; i < chks.length; i++ ) {
      if(chks[i].checked)
        unitSum |= parseInt(chks[i].value,10);
    }
    lib.storage.setValue("unitSum"+ownPid,unitSum);
    Map.reCreateOverlays(true);
  },
  showChurches : function() {
    if( typeof Map.churchPopup == "undefined" ) {
      Map.churchPopup = new lib.Popup("dsfm_simChurches", texts[lib.lang].gui.simChurches, true, 300, 200);
      var div = Map.churchPopup.content.appendChild(ce("div"));
      div.style.width = "290px";
      div.style.height = "200px";
      div.style.overflow = "auto";
      div.style.border = "1px solid #804000";
      var tab = div.appendChild(ce("table"));
      tab.className = "vis";
      tab.id = "dsfm_churches";
      tab.style.width = "100%";
      var row = tab.insertRow(-1);
      var cell = row.appendChild(ce("th"));
      cell.textContent = "X";
      cell = row.appendChild(ce("th"));
      cell.textContent = "Y";
      cell = row.appendChild(ce("th"));
      cell.textContent = texts[lib.lang].gui.churches[0];
      cell = row.appendChild(ce("th"));
      cell.textContent = texts[lib.lang].gui.color;
      cell = row.appendChild(ce("th"));
      var input = Map.churchPopup.content.appendChild(ce("input"));
      input.type = "button";
      input.value = texts[lib.lang].gui.savebutton;
      input.addEventListener("click",Map.saveChurches,false);
      input = Map.churchPopup.content.appendChild(ce("input"));
      input.type = "button";
      input.value = texts[lib.lang].gui.cancel;
      input.addEventListener("click",function() {Map.churchPopup.hide();}, false);
    }
    else {
      tab = $("dsfm_churches");
      while( tab.rows.length > 1 )
        tab.deleteRow(1);
    }
    for( var i = 0; i < Map.churches.length; i++ )
      Map.insertChurchRow(tab, Map.churches[i]);
    Map.insertChurchRow(tab);
    Map.churchPopup.show();
  },
  insertChurchRow : function(tab, church) {
    var x = true;
    if( typeof church == "undefined" ) {
      church = { x:"", y:"", radius:0, color: "#FFFFFF" };
      x = false;
    }
    var row = tab.insertRow(-1);
    var cell = row.insertCell(-1);
    var input = cell.appendChild(ce("input"));
    input.type = "text";
    input.size = 3;
    input.value = church.x;
    input.addEventListener("keyup",function(e) {
        var xInput = e.target;
        var yInput = xInput.parentNode.nextSibling.firstChild;
        if( xInput.value.indexOf("|") > -1 ) {
          var coords = xInput.value.split("|");
          xInput.value = coords[0];
          yInput.value = coords[1];
        }
        if( xInput.value.length == 3 && yInput.value.length == 0 ) {
          yInput.focus();
          yInput.select();
        }
      }, false);
    
    cell = row.insertCell(-1);
    input = cell.appendChild(ce("input"));
    input.type = "text";
    input.size = 3;
    input.value = church.y;
    
    cell = row.insertCell(-1);
    input = cell.appendChild(ce("select"));
    input.size = 1;
    //sake-->
    //input.options[0] = new Option(texts[lib.lang].gui.churches[1],1,false,false);
    //input.options[1] = new Option(texts[lib.lang].gui.churches[2],0,false,false);
    //input.options[2] = new Option(texts[lib.lang].gui.churches[3],1,false,false);
    //input.options[3] = new Option(texts[lib.lang].gui.churches[4],2,false,false);
    input.options.add( new Option(texts[lib.lang].gui.churches[1],1,false,false) );
    input.options.add( new Option(texts[lib.lang].gui.churches[2],0,false,false) );
    input.options.add( new Option(texts[lib.lang].gui.churches[3],1,false,false) );
    input.options.add( new Option(texts[lib.lang].gui.churches[4],2,false,false) );
    //sake<--
    input.value = church.radius;
    
    cell = row.insertCell(-1);
    input = cell.appendChild(ce("input"));
    input.type = "text";
    input.size = 6;
    input.value = church.color;
    input.color = new ColorPicker(input);
    
    cell = row.insertCell(-1);
    var a = cell.appendChild(ce("a"));
    a.href = "#";
    a.style.textWeight = "bold";
    if( x ) {
      a.textContent = " X";
      a.style.color = "red";
      a.tilte = texts[lib.lang].gui.remove;
      a.addEventListener("click", Map.removeChurch, false );
    }
    else {
      a.textContent = " +";
      a.style.color = "green";
      a.tilte = texts[lib.lang].gui.add;
      a.addEventListener("click", Map.applyChurch, false );
    }
  },
  applyChurch : function(e) {
    var row = this.parentNode.parentNode;
    var x = parseInt(row.cells[0].firstChild.value,10);
    var y = parseInt(row.cells[1].firstChild.value,10);
    if( !isNaN(x) && !isNaN(y) && x>=0 && x <= 999 && y >= 0 && y <= 999 ) {
      var a = row.cells[4].firstChild;
      a.removeEventListener("click",Map.applyChurch,false);
      a.addEventListener("click",Map.removeChurch,false);
      a.style.color = "red";
      a.textContent = "X";
      Map.insertChurchRow(row.parentNode.parentNode);
    }
    else {
      alert( texts[lib.lang].gui.errorCoords );
    }
  },
  removeChurch : function() {
    var row = this.parentNode.parentNode;
    row.parentNode.removeChild(row);
  },
  saveChurches : function(e) {
    var tab = $("dsfm_churches");
    var churches = [];
    for( var i = 1; i < tab.rows.length-1; i++ ) {
      var church = { 
        x: parseInt(tab.rows[i].cells[0].firstChild.value,10), 
        y: parseInt(tab.rows[i].cells[1].firstChild.value,10),
        radius: parseInt(tab.rows[i].cells[2].firstChild.value,10),
        color: tab.rows[i].cells[3].firstChild.value
      };
      if( isNaN(church.x) || church.x < 0 || church.x > 999 ) {
        alert(texts[lib.lang].gui.errorCoords);
        tab.rows[i].cells[0].firstChild.focus();
        return false;
      }
      else if( isNaN(church.x) || church.x < 0 || church.x > 999 ) {
        alert(texts[lib.lang].gui.errorCoords);
        tab.rows[i].cells[1].firstChild.focus();
        return false;
      }
      churches.push(church);
    }
    Map.churches = churches;
    lib.storage.setValue("churches",churches);
    Map.churchPopup.hide();
    Map.reCreateTopoOverlays();
    return false;
  },
  toggleChurches : function() {
    Map.simChurches = this.checked;
    lib.storage.setValue("simChurches",this.checked);
    var canvas = document.getElementsByClassName("dsfm_topo_canvas");
    for( var i = 0; i < canvas.length; i++ )
      canvas[i].style.display = this.checked ? "":"none";
  },
}
/** var BuildAssist = {
/* Was macht diese Funktion?
*/
var BuildAssist = {
  mining : { wood: 0, stone: 0, iron: 0 },
  curRessis : { wood: 0, stone: 0, iron : 0},
  storageSize : 0,
  queue : { builds: {}, destroys: {}, totalDestroys: 0, cost: false },
  pop : { current:0, max:0 },
  vilVar : "",
  variants : [],
  popup : null,
  updateAll : null,
  hideCompleted : false,
  showAll : false,
  canDestroy: false,
  variantID : 0,
  church_f : false,
  requirements: { barracks: { main: 3 }, 
                  stable: { main: 10, barracks: 5, smith: 5 }, 
                  garage: { main: 10, smith: 10 }, 
                  snob: { main: 20, smith: 20, market: 10 },
                  smith: { main: 5, barracks: 1 },
                  market: { main: 3, storage: 2 },
                  wall: {barracks: 1}
  },
  doIt : function() {
    if( lib.params.screen == "main" ) {
      BuildAssist.mode = lib.storage.getValue("smallqueue"+ownPid,1);
      BuildAssist.updateAll = win.BuildingMain.update_all;
      win.BuildingMain.update_all = function(data) { 
          BuildAssist.updateAll(data); 
          BuildAssist.createBuildQueue(); 
          BuildAssist.updateMain();
        };
      BuildAssist.hideCompleted = lib.storage.getValue("hideCompleted"+ownPid, false);
      BuildAssist.showAll = lib.storage.getValue("showAllBuildings"+ownPid, false);
      
      var hideCompleted = document.getElementById("hide_completed");
      if( hideCompleted && hideCompleted.checked ) {
        lib.storage.setValue("hideCompleted"+ownPid,true);
        lib.fireEvent(hideCompleted,"click");
      }
      else
        BuildAssist.initMain();
    }
    else if( lib.params.screen == "overview" )
      BuildAssist.getLoyalty();
  },
  getBuildingTab : function() {
    var tab = $("buildinginfo");
    if( !tab ) {
      tab = $("content_value").getElementsByTagName("table");
      for( var i = 0; i < tab.length; i++ ) {
        if( texts[lib.lang].regex.building.test(tab[i].rows[0].cells[0].innerHTML) ) {
          tab = tab[i]
          tab.id = "buildinginfo";
          break;
        }
      }
    }
    return tab;
  },
  onVariantChanged : function() {
    BuildAssist.variantID = parseInt($("dsfm_build_variant").value,10);
    Settings.buildAssist.assigns = Settings.buildAssist.assigns.replace(new RegExp(";"+lib.game_data.village.id+",\\d+;"),"");
    Settings.buildAssist.assigns += ";" + lib.game_data.village.id+","+BuildAssist.variantID+";";
    lib.storage.setValue("buildAssist"+ownPid,Settings.buildAssist);
    if( BuildAssist.variantID == 0 )
      document.location.reload();    
    else {
      BuildAssist.updateMain();
    }
  },
  updateVariantValues : function(row) {
    var pts = 0;
    var bh = 0;
    for( var i = 1; i < row.cells.length-3; i++ ) {
      var input = row.cells[i].firstChild;
      var level = parseInt(input.value,10);
      pts += Settings.points[input.name][level];
      //pts += serverInfo.addBuildingInfo[input.name].points[level];
      if( level > 0 )
        bh += Math.round(serverInfo.buildingInfo[input.name].pop*Math.pow(serverInfo.buildingInfo[input.name].pop_factor,level-1));
    }
    var cell = row.cells[row.cells.length-3];
    cell.innerHTML = lib.formatNumber(pts,true,true);
    cell.style.textAlign = "right";
    cell = row.cells[row.cells.length-2];
    cell.innerHTML = lib.formatNumber(bh,true,true);;
    cell.style.textAlign = "right";
  },
  updateMain : function() {
    var variant = Settings.buildAssist.variants[Settings.getVariantIdxById("buildAssist",BuildAssist.variantID)];

    var buildDestroy = $("dsfm_builddestroy");
    BuildAssist.canDestroy = buildDestroy.cells.length > 1;
    
    var wrapper = $("building_wrapper");
    wrapper.innerHTML = "";
    var tab = wrapper.appendChild(ce("table"));
    tab.id = "buildinginfo";
    tab.className = "vis nowrap";
    tab.width = "100%";
    var p = wrapper.appendChild(ce("p"));
    var showAll = p.appendChild(ce("input"));
    showAll.type = "checkbox";
    showAll.id = "show_all_buildings";
    showAll.name = "show_all_buildings";
    showAll.checked = BuildAssist.showAll;
    showAll.addEventListener("click", function() {
        BuildAssist.showAll = this.checked;
        var rows = tab.getElementsByClassName("togglerow");
        for( var i = 0; i < rows.length; i++ )
          rows[i].style.display = this.checked ? "table-row" : "none";
        lib.storage.setValue("showAllBuildings"+ownPid,this.checked);
      }, false);
    var label = p.appendChild(ce("label"));
    label.setAttribute("for","show_all_buildings");
    label.innerHTML = texts[lib.lang].gui.showAllBuildings;

    p = wrapper.appendChild(ce("p"));
    hideCompleted = p.appendChild(ce("input"));
    hideCompleted.type = "checkbox";
    hideCompleted.id = "hide_completed";
    hideCompleted.checked = BuildAssist.hideCompleted;
    hideCompleted.addEventListener("click", function() {
        BuildAssist.hideCompleted = this.checked;
        var rows = tab.getElementsByClassName("dsfm_completed");
        for( var i = 0; i < rows.length; i++ )
          rows[i].style.display = this.checked ? "none" :  "table-row";
        lib.storage.setValue("hideCompleted"+ownPid,this.checked);
      }, false );
    var label = p.appendChild(ce("label"));
    label.setAttribute("for","hide_completed");
    label.innerHTML = texts[lib.lang].gui.hideCompletedBuildings;

    BuildAssist.pop = { current: parseInt($("pop_current_label").textContent.replace(".",""),10), max: parseInt($("pop_max_label").textContent.replace(".",""),10) };
    BuildAssist.storageSize = parseInt($("storage").innerHTML,10);
    for( var key in resInfos ) {
      var span = $(key);
      BuildAssist.mining[key] = parseInt(span.title,10);
      BuildAssist.curRessis[key] = parseInt(span.innerHTML);
    }
    
    var loyalty = 100;
    if( curVillage.loyalty.timestamp > 0 ) {
      var h = Math.round((lib.getTime() - curVillage.loyalty.timestamp) / 3600);
      loyalty = curVillage.loyalty.value + Math.round(h * serverInfo.config.speed * serverInfo.config.snob_factor);
      if( loyalty < 100) {
        if( BuildAssist.canDestroy ) {
          buildDestroy.className = "nowrap";
          buildDestroy.cells[1].style.color = "red";
          buildDestroy.cells[1].style.fontSize = "xx-small";
          buildDestroy.cells[1].style.fontWeight = "bold";
          buildDestroy.cells[1].textContent = texts[lib.lang].gui.loyalty+": " + loyalty + "%"
          BuildAssist.canDestroy = false;
        }
      }
      else {
        loyalty = 100;
        curVillage.loyalty = { timestamp: 0, value: 0 };
        curVillage.save();
      }
    }

    if( buildDestroy && variant ) {
      buildDestroy.style.display = "none";
      buildDestroy = true;
    }

    var row = tab.insertRow(-1);
    var cell = row.appendChild(ce("th"));
    cell.innerHTML = texts[lib.lang].gui.building;
    cell.width = "220";
    BuildAssist.insertVariant(tab);
    
    cell = row.appendChild(ce("th"));
    cell.colSpan = 4;
    cell.innerHTML = texts[lib.lang].gui.needs;
    cell = row.appendChild(ce("th"));
    cell.width = 100;
    cell.innerHTML = texts[lib.lang].gui.buildTime;
    cell = row.appendChild(ce("th"));
    cell.style.width = "200px";
    cell.innerHTML = texts[lib.lang].gui.buildOption;
    
    idx = 1;
    for( var b in serverInfo.buildingInfo ) {
      if( b == "church" && BuildAssist.church_f || b == "church_f" && !BuildAssist.church_f)
        continue;
      var toLevel = variant ? variant[b] : serverInfo.buildingInfo[b].max_level;
      var req = BuildAssist.getRequirements(b);
      row = tab.insertRow(req != "" ? -1 : idx++);
      cell = row.insertCell(-1);
      var level = parseInt(lib.game_data.village.buildings[b],10);
      var txt = "";
      if( req != "" )
        txt = "";
      else if( level == 0 )
        txt = texts[lib.lang].gui.doesntExist;
      else
        txt = "(" + texts[lib.lang].gui.level + " "+level+")";
      var html = '<a href="/game.php?';
	  if( lib.params.get("t",0) != 0 )
		html += "t="+lib.params.t+"&";
	  cell.innerHTML = html + 'village='+lib.game_data.village.id+'&screen='+b+'"><img alt="" title="'+texts[lib.lang].buildings[b]+'" src="graphic/buildings/'+b+'.png?"> '+texts[lib.lang].buildings[b]+'</a> '+txt;
      if( req != "" ) {
        cell = row.insertCell(-1);
        cell.colSpan=6;
        cell.align = "center";
        cell.innerHTML = req;
        row.className = "togglerow";
        if( !showAll.checked )
          row.style.display = "none";
      }
      else {
        var resoktime = 0;
        var storageSizeOk = true;
        var popok = true;

        if( BuildAssist.queue.builds[b] )
          level = BuildAssist.queue.builds[b];
        if( !BuildAssist.queue.destroys[b] )
          BuildAssist.queue.destroys[b] = 0;
        row.id = "main_buildrow_"+b;
        var lvlDst = level - BuildAssist.queue.destroys[b];
        if( lvlDst > toLevel ) { // Level incl. evt Abrisse noch größer als Ziellevel
          cell = row.insertCell(-1);
          cell.colSpan = 3;
          cell.align = "center";
          cell.innerHTML = texts[lib.lang].gui.buildingOverbuild;
          cell.style.color = "red";
          cell.style.fontWeight = "bold";
          cell = row.insertCell(-1);
          var workers = Math.round(serverInfo.buildingInfo[b].pop * Math.pow(serverInfo.buildingInfo[b].pop_factor, lvlDst-1));
          if( lvlDst > 1 )
            workers -= Math.round(serverInfo.buildingInfo[b].pop * Math.pow(serverInfo.buildingInfo[b].pop_factor, lvlDst-2));
          cell.innerHTML = '<span class="icon header population"> </span> ' + workers;
          cell = row.insertCell(-1);
          val = Math.round(serverInfo.buildingInfo[b].build_time * Math.pow(serverInfo.buildingInfo[b].build_time_factor, lvlDst-1) * Math.pow(0.952381,parseInt(lib.game_data.village.buildings.main,10)));
          cell.innerHTML = texts[lib.lang].locale.formatDuration(val);
          cell = row.insertCell(-1);
          if( lib.game_data.village.buildings[b] == level ) {
            if( BuildAssist.queue.totalDestroys == 5 ) {
              cell.innerHTML = texts[lib.lang].gui.destroyQueueFull;
              cell.className = "inactive";
            }
            else if( loyalty < 100 ) {
              cell.innerHTML = texts[lib.lang].gui.loyalty + " " + loyalty + "%";
              cell.className = "inactive";
            }
            else if( lib.game_data.village.buildings.main < 15 ) {
              cell.innerHTML = texts[lib.lang].gui.noDestroy;
              cell.className = "inactive";
            }
            else {
              var a = cell.appendChild(ce("a"));
              a.innerHTML = texts[lib.lang].gui.destroyLevel;
              a.href = "#";
              a.setAttribute("onclick", "javascript: BuildingMain.mode = 1; return BuildingMain.destroy('"+b+"');");
            }
          }
          else {
            cell.innerHTML = texts[lib.lang].gui.buildingUp;
            cell.style.color = "red";
            cell.style.fontWeight = "bold";
          }
        }
        else if( level == serverInfo.buildingInfo[b].max_level ) { // Level mit Ausbauten = Vollausbau
          cell = row.insertCell(-1);
          cell.colSpan = 6;
          cell.className = "inactive";
          cell.align = "center";
          cell.innerHTML = texts[lib.lang].gui.buildingMaxLevel;
          row.className = "dsfm_completed";
        }
        else if( lvlDst == toLevel ) { // Level incl. Abrisse = Ziellevel
          cell = row.insertCell(-1);
          cell.colSpan = 6;
          cell.className = "inactive";
          cell.align = "center";
          cell.innerHTML = texts[lib.lang].gui.buildingCompleted;
          if( lvlDst < toLevel && BuildAssist.queue.destroys[b] > 0 ) {
            cell.innerHTML += " ("+texts[lib.lang].gui.knockDwon+")";
            cell.style.color = "red";
            cell.style.fontWeight = "bold";
          }
          else
            row.className = "dsfm_completed";
        }
        else if( BuildAssist.queue.destroys[b] == 0 ) { // Kein Abriss => dann Ausbau :-)
          for( var res in resInfos ) {
            var dif = 0;
            var val = Math.ceil(Math.round(serverInfo.buildingInfo[b][res] * Math.pow(serverInfo.buildingInfo[b][res+"_factor"], level))*BuildAssist.queue.factor);
            if( BuildAssist.curRessis[res] < val ) {
              dif = val - BuildAssist.curRessis[res];
              var time = dif / (BuildAssist.mining[res] / 3600);
              if( time > resoktime )
                resoktime = time;
              if( val > BuildAssist.storageSize )
                storageSizeOk = false;
            }
            cell = row.insertCell(-1);
            var html = '<span class="icon header '+res+'"> </span> ' + lib.formatNumber(val,true,true);
            if( Settings.settings.build.showMissingRes && dif > 0 )
              html += ' <span style="color:#FD5000;">(' + lib.formatNumber(dif,true,true) + ')</span>';
            cell.innerHTML = html;
          }
          var workers = Math.round(serverInfo.buildingInfo[b].pop * Math.pow(serverInfo.buildingInfo[b].pop_factor, level));
          if( level > 0)
            workers -= Math.round(serverInfo.buildingInfo[b].pop * Math.pow(serverInfo.buildingInfo[b].pop_factor, level-1));
          cell = row.insertCell(-1);
          cell.style.whiteSpace = "nowrap";
          if( workers > 0 ) {
            html = '<span class="icon header population"> </span> ' + lib.formatNumber(workers,true,true);
            if( Settings.settings.build.showMissingRes ) {
              var free = BuildAssist.pop.max - BuildAssist.pop.current;
              if( free < workers ) {
                popok = false;
                dif = workers - free;
                html += ' <span style="color:#FD5000;">(' + lib.formatNumber(dif,true,true) + ')</span>';
              }
            }
            cell.innerHTML = html;
          }
          val = Math.round(serverInfo.buildingInfo[b].build_time * Math.pow(serverInfo.buildingInfo[b].build_time_factor, level) * Math.pow(0.952381,parseInt(lib.game_data.village.buildings.main,10)));
          row.insertCell(-1).innerHTML = texts[lib.lang].locale.formatDuration(val);
          cell = row.insertCell(-1);

          if( !popok ) {
            cell.className = "inactive";
            cell.innerHTML = texts[lib.lang].gui.farmToSmall;
          }
          else if( !storageSizeOk ) {
            cell.className = "inactive";
            cell.innerHTML = texts[lib.lang].gui.storageToSmall;
          }
          else if( resoktime > 0 ) {
            cell.className = "inactive";
            cell.innerHTML = texts[lib.lang].gui.resAvailableAt + texts[lib.lang].locale.date2timeStr(new Date((lib.getTime()+resoktime)*1000));
          }
          else {
            var a = cell.appendChild(ce("a"));
            a.href = "#";
            a.setAttribute("onclick", "javascript: BuildingMain.mode = 0; return BuildingMain.build('"+b+"');");
            if( level == 0 )
              a.innerHTML = texts[lib.lang].gui.buildUp;
            else
              a.innerHTML = texts[lib.lang].gui.buildingLevelUp + " " + (level + 1);
          }
        }
        else { // Abriss läuft => Kein Ausbau erlaubt
          cell = row.insertCell(-1);
          cell.align = "center";
          cell.colSpan = 6;
          cell.innerHTML = texts[lib.lang].gui.buildingCompleted + " ("+texts[lib.lang].gui.knockDown+")";
          cell.style.color = "red";
          cell.style.fontWeight = "bold";
        }
      }
      if( hideCompleted.checked && /dsfm_completed/.test(row.className) )
        row.style.display = "none";
    }
  },
  getLoyalty : function() {
    var tabs = $("content_value"); 
    var loyalty = 100;
    for( var i = 0; i < tabs.length; i++ ) {
      if( texts[lib.lang].regex.loyalty.test(tabs[i].rows[0].cells[0].textContent) ) {
        loyalty = parseInt( tabs[i].rows[0].cells[1].textContent,10);
        break;
      }
    }
	console.log(loyalty);
    curVillage.loyalty.timestamp = lib.getTime();
    curVillage.loyalty.value = loyalty;
    curVillage.save();
  },
  initMain : function() {
    var id = Settings.buildAssist.assigns.match(";"+lib.game_data.village.id+",(\\d+);");
    if( id )
      id = id[1];
    else
      id = Settings.buildAssist.defVar;
    BuildAssist.variantID = id;

    var buildDestroy = document.getElementsByClassName("selected")[0];
    if( buildDestroy )
      buildDestroy.parentNode.id="dsfm_builddestroy";
   
    var tab = BuildAssist.getBuildingTab();
    BuildAssist.church_f = /screen=church_f/.test(tab.innerHTML);
    BuildAssist.createBuildQueue();
    BuildAssist.updateMain();
  },
  toggleQueue : function() {
    var smallqueue = $("dsfm_build_queue");
    if( smallqueue.style.display == "" ) {
      smallqueue.style.display = "none";
      $("build_queue").style.display = "";
      BuildAssist.mode = 0;
    }
    else {
      smallqueue.style.display = "";
      $("build_queue").style.display = "none";
      BuildAssist.mode = 1;
    }
    setTimeout(function(){lib.storage.setValue("smallqueue"+ownPid,BuildAssist.mode);},0);  
  },
  createBuildQueue : function() {
    var qTab = $("build_queue");
    BuildAssist.queue = { builds: {}, destroys: {}, totalDestroys: 0, cost: false, factor: 1 };
    if( qTab ) {
      var html = "";
      var a = qTab.rows[0].cells[0].appendChild(ce("a"));
      a.href = "javascript:;";
      a.addEventListener("click", BuildAssist.toggleQueue, false );
      a.innerHTML = String.fromCharCode(160,9650);
      var sqTab = qTab.parentNode.insertBefore(ce("table"),qTab);
      sqTab.id = "dsfm_build_queue";
      sqTab.className = "vis";
      var row = sqTab.insertRow(0);
      var cell = row.appendChild(ce("th"));
      cell.colSpan = qTab.rows.length-1;
      var idx = qTab.rows.length-1;
      if( qTab.rows[idx].cells[0].colSpan > 1 )
        idx--;
      cell.appendChild(document.createTextNode(texts[lib.lang].gui.buildQueueTitle + " - " + qTab.rows[idx].cells[2].textContent + " "));
      a = cell.appendChild(ce("a"));
      a.href = "javascript:;";
      a.addEventListener("click", BuildAssist.toggleQueue, false );
      a.innerHTML = String.fromCharCode(9660);
      if( BuildAssist.mode )
        qTab.style.display = "none";
      else
        sqTab.style.display = "none";
      row = sqTab.insertRow(1);
      row.className = "nowrap";
      for( var i = 1; i < qTab.rows.length; i++ ) {
        var res = qTab.rows[i].cells[0].innerHTML.match( texts[lib.lang].regex.buildDestroy );
        if( res ) {
          var level = parseInt(res[2],10);
          var name = res[1];
          name = name.substring(0,name.length-1);
          for( var key in serverInfo.buildingInfo ) {
            if( texts[lib.lang].buildings[key] == name )
              break;
          }
          var cancel = getByTagName(qTab.rows[i].cells[3],"A","firstChild").getAttribute("onclick");
          cell = row.insertCell(i-1);
          html = '<a href="#" onclick="'+cancel+'">';
          if( !isNaN(level) ) {
            if( i == 1 )
              cell.title = name + " " + level + " - " + qTab.rows[i].cells[2].innerHTML;
            else
              cell.title = name + " " + level + " - " + qTab.rows[i].cells[1].innerHTML.replace(/<[^>]+>/g,"") + "- " + qTab.rows[i].cells[2].innerHTML;
            BuildAssist.queue.builds[key] = level;
          }
          else {
            if( i == 1 )
              cell.title = texts[lib.lang].gui.destroy + name + " - " + qTab.rows[i].cells[2].innerHTML;
            else
              cell.title = texts[lib.lang].gui.destroy + name + " - " + qTab.rows[i].cells[1].innerHTML.replace(/<[^>]+>/g,"") + "- " + qTab.rows[i].cells[2].innerHTML;
            html += '<img src="graphic/overview/down.png" alt="'+texts[lib.lang].gui.destroy+'"/>';
            BuildAssist.queue.totalDestroys++;
            if( BuildAssist.queue.destroys[key] )
              BuildAssist.queue.destroys[key]++
            else
              BuildAssist.queue.destroys[key] = 1;
          }
          html += '<img src="graphic/buildings/'+key+'.png" alt="'+name+'"/></a>';
          if( i == 1 ) {
            html += '<span style="font-size:xx-small;font-weight:bold;" id="dsfm_curtime">'+qTab.rows[1].cells[1].innerHTML+'</span>';
            setInterval( function() { $("dsfm_curtime").innerHTML = $("build_queue").rows[1].cells[1].innerHTML; }, 1000 );
          }
          cell.innerHTML = html;
          cell.style.width = "0";
        }
        else if( texts[lib.lang].regex.queueCost.test(qTab.rows[i].cells[0].innerHTML ) ) {
          var cost = qTab.rows[i].cells[0].innerHTML.match( /<b>([^<]+)</ )[1];
          cell = sqTab.rows[0].appendChild(ce("th"));
          sqTab.rows[0].cells[0].colSpan--;
          cell.innerHTML = '<img src="graphic/gold.png" alt="'+texts[lib.lang].gui.queueCost+'"/>';
          cell.title = texts[lib.lang].gui.queueCost;
          BuildAssist.queue.cost = true;
          cell = row.insertCell(i-1);
          cell.innerHTML = "<b>"+cost+"</b>";
          BuildAssist.queue.factor = 1 + parseInt(cost,10)/100;
        }
      }
      sqTab.rows[0].cells[0].colSpan++;
      sqTab.rows[1].insertCell(sqTab.rows[0].cells.length == 2 ? i - 2 : i - 1);
    }
  },
  onUpdateOVRow : function(e) {
    if(e.target.nodeName == "LI" || /[build|destroy]_icon/.test(e.target.className)) {
      var row = getByTagName(e.target,"tr","parentNode");
      var select = row.getElementsByTagName("select")[0];
      var id = parseInt(select.value,10);
    if( e.target.nodeName == "LI" && e.type == "DOMNodeRemoved" )
        e.target.getElementsByClassName("order-status-light")[0].style.backgroundColor = "";
      BuildAssist.updateOVRow(row,id);
    }
  },
  updateOVRow : function(row,id) {
    var variant = Settings.buildAssist.variants[Settings.getVariantIdxById("buildAssist",id)];
    var build = row.cells[0].className == "build_icon";
    var destroy = row.cells[1].className == "destroy_icon";
    var tds = row.getElementsByClassName("upgrade_building");
    var order = row.getElementsByClassName("building_order");
    var changes = {}
    var queue = 0;
    if( order.length > 0 ) {
      var li = order[0].getElementsByTagName("li");
      for( var i = 0; i < li.length; i++ ) {
        var statusLight = li[i].getElementsByClassName("order-status-light")[0];
        var dif = 0;
        if( statusLight.style.backgroundColor == "green" ) {
          dif = 1;
          queue++;
        }
        else if( statusLight.style.backgroundColor == "red" )
          dif = -1;
        var key = li[i].getElementsByClassName("queue_icon")[0].innerHTML.match(/buildings\/([^\.]+)\.png*/)[1];
        if( isNaN(changes[key]) && dif != 0 )
          changes[key] = dif;
        else
          changes[key] += dif;
      }
      if( queue >= 5 )
        order[0].parentNode.style.backgroundColor = Settings.colors.ov.buildings.queueCost;
    }
    for( var i = 0; i < tds.length; i++ ) {
      var key = tds[i].className.replace(/.*b_/, '');
      var level = parseInt(tds[i].textContent,10);
      var span = tds[i].getElementsByClassName("dsfm_change");
      if( !isNaN(changes[key]) ) {
        level += changes[key];
        if( span.length == 0 )
          span = tds[i].appendChild(ce("span"));
        else
          span = span[0];
        span.className = "dsfm_change";
        span.style.fontSize = "xx-small";
        span.innerHTML = (changes[key] > 0 ? '+' : '') + changes[key];
      }
      else if( span.length > 0 ) {
        span[0].parentNode.removeChild(span[0]);
      }
      var color = "";
      if( variant ) {
        if( variant[key] > level && build)
          color = Settings.colors.ov.buildings.toBuild;
        else if( variant[key] < level && destroy)
          color = Settings.colors.ov.buildings.toDestroy;
      }
      tds[i].style.backgroundColor = color;
    }
  },
  insertVariant : function(tab) {
    tab.rows[0].cells[0].innerHTML = tab.rows[0].cells[0].innerHTML + " ";
    var input = tab.rows[0].cells[0].appendChild(ce("select"));
    input.id = "dsfm_build_variant";
    //sake-->
    //input.options[0] = new Option(texts[lib.lang].gui.selectVariantOption,0,true,Settings.buildAssist.defVar==0);
    //for( var i = 0; i < Settings.buildAssist.variants.length; i++ )
    //  input.options[i+1] = new Option(Settings.buildAssist.variants[i].name,Settings.buildAssist.variants[i].id,false,BuildAssist.variantID==Settings.buildAssist.variants[i].id);
    input.options.add( new Option(texts[lib.lang].gui.selectVariantOption,0,true,Settings.buildAssist.defVar==0) );
    for( var i = 0; i < Settings.buildAssist.variants.length; i++ )
      input.options.add( new Option(Settings.buildAssist.variants[i].name,Settings.buildAssist.variants[i].id,false,BuildAssist.variantID==Settings.buildAssist.variants[i].id) );
    //sake<--
    input.addEventListener("change", BuildAssist.onVariantChanged, false );
    var a = tab.rows[0].cells[0].appendChild(ce("a"));
    a.href = "javascript:;";
    a.innerHTML = ' <img alt="#" src="graphic/rename.png"/>';
    a.addEventListener("click", function(e) { lib.storage.setValue("settingsTab"+ownPid,"buildAssist"); location.href = lib.createLink("settings","mode","settings",false); }, false);
  },
  getRequirements : function(key) {
    var ret = "";
    if( typeof(BuildAssist.requirements[key]) != "undefined" ) {
      ret = texts[lib.lang].gui.requires;
      var hasIt = true;
      for( var b in BuildAssist.requirements[key] ) {
        ret += '<img alt="" src="graphic/buildings/main.png?"> '+texts[lib.lang].buildings[b]+" ("+texts[lib.lang].gui.level+" "+BuildAssist.requirements[key][b]+") ";
        if( lib.game_data.village.buildings[b] < BuildAssist.requirements[key][b] )
          hasIt = false;
      }
      if( hasIt )
        ret = "";
    }
    return ret;
  },
}
/** var Report = {
/* Was macht diese Funktion?
*/
var Report = {
  bashPoints : { spear: [4,1], sword: [5,2], axe: [1,4], archer: [5,2], spy: [1,2], light: [5,13], marcher: [6,12], heavy: [23,15], ram: [4,8], catapult: [12,10], knight: [40,20], snob: [200,200], militia: [4,0] },
  groups : {
    attack_luck: { hasTitle: true,  hasSpacer: false },
    attack_moral: { hasTitle: false, hasSpacer: false },
    attack_info_att: { hasTitle: false, hasSpacer: true  },
    attack_info_def: { hasTitle: false, hasSpacer: true  },
    attack_spy: { hasTitle: true,  hasSpacer: true  },
    attack_away_units: { hasTitle: true,  hasSpacer: false },
    attack_running_units: { hasTitle: true,  hasSpacer: false },
    attack_results: { hasTitle: false, hasSpacer: true  }
  },
  order : [],
  doIt: function() {
    if( lib.params.screen == "report" ) {
      //HS _ RD 001-->
      if( lib.params.get("mode",0) == 'public') {
        return;
      };
      //HS _ RD 001<--
      if( lib.params.get("view",0) == 0 ) {
        Report.initOverview();
      } else {
        Report.setHotKeys();
        Report.parse(false);
        Report.modReport();
      };
    };
  },
  modReport : function() {
    if( Settings.settings.report.showSurvivors || Settings.settings.report.showBPs || Settings.settings.report.showLostCost ) {
      Report.modUnitsTab("attack_info_att",1);
      Report.modUnitsTab("attack_info_def",0);
    }
    var table = document.getElementsByClassName("vis")[4];
    if( texts[lib.lang].regex.reportTitle.test(table.innerHTML) ) {
      var lnks = table.rows[table.rows.length-1].cells[0].getElementsByTagName("a");
      if( lnks.length > 5 ) {
        var lnk = lnks[lnks.length-2];
        var before = lnk.nextSibling;
        var parent = lnk.parentNode;
        
        parent.insertBefore(ce("br"), before);
        var idx = 2;
        if( !/info_village/.test(lnks[idx]) )
          idx++;
        var vids = [lnks[1].href.match(/id=(\d+)/)[1],lnks[idx].href.match(/id=(\d+)/)[1]];
        var a = parent.insertBefore(ce("a"), before);
        a.href = lib.createLink("place", "mode", "command", "target", vids[1], false ).replace(/village=\d+/,"village="+vids[0]);
        a.innerHTML = "&raquo; " + texts[lib.lang].gui.attackAgain;
      }
    }
    if( Settings.settings.report.enableReorder ) {
      var defValue = [];
      for( var key in Report.groups )
        defValue.push({key: key, show: true});
      Report.order = lib.storage.getValue("reportorder"+ownPid,defValue);
      Report.reorder();
    }
  },
  modUnitsTab : function(id,mode) {
    var tab = $(id+"_units");
    if( tab ) {
      var data = { wood: 0, stone: 0, iron: 0, bps: 0 };
      if( Settings.settings.report.showSurvivors ) {
        var row = tab.insertRow(-1);
        row.className = "center";
        var cell = row.insertCell(0);
        cell.innerHTML = texts[lib.lang].gui.survivors+":";
      }
      for( var i = 1; i < tab.rows[0].cells.length; i++ ) {
        var unit = tab.rows[0].cells[i].innerHTML.match(/unit\/unit_([^\.]+)\.png/)[1];
        var count = parseInt(tab.rows[1].cells[i].innerHTML,10);
        var lost  = parseInt(tab.rows[2].cells[i].innerHTML,10);
        if( Settings.settings.report.showSurvivors ) {
          var cell = row.insertCell(-1);
          var s = count - lost;
          if( s == 0 )
            cell.className = "hidden";
          cell.innerHTML = s;
        }
        data.bps += lost * Report.getBPs(unit,mode);
        for( var key in resInfos )
          data[key] += lost * serverInfo.unitInfo[unit][key];
      }
      if( Settings.settings.report.showSurvivors && data.wood == 0 )
        tab.tBodies[0].removeChild(row);
      var tab = $(id);
      if( Settings.settings.report.showLostCost && data.wood > 0 ) {
        row = tab.insertRow(-1);
        cell = row.insertCell(0);
        cell.innerHTML = texts[lib.lang].gui.lostCost+":";
        cell = row.insertCell(1);
        var html = "";
        for( var key in resInfos )
          html += ' <img src="graphic/'+resInfos[key].img+'" alt="'+texts[lib.lang].resources[key]+'" title="'+texts[lib.lang].resources[key]+'"/> ' + lib.formatNumber(data[key], true, true);
        cell.innerHTML = html;
      }
      if( Settings.settings.report.showBPs && data.bps > 0) {
        row = tab.insertRow(-1);
        cell = row.insertCell(0);
        cell.innerHTML = texts[lib.lang].gui.bpTitle[mode] + ":";
        row.insertCell(1).innerHTML = lib.formatNumber(data.bps,true,true);
      }
    }
  },
  reorder : function() {
    var td = $("dsfm_report_content");
    var head = document.getElementsByTagName("h3")[0];
    if( !td ) {
      if( !head )
        return;
      td = head.parentNode;
      if( td === null )
        return;
      td.id = "dsfm_report_content";
      var el = $("attack_luck");
      el = getByTagName(el,"h4","nextSibling");
      el.id = "attack_moral";
    }
    
    var html = '<table style="width:100%"><tr><td style="width:100%"><h3>'+head.textContent+'</h3></td>';
    html += '<td style="text-align:right; vertical-align:top;"><a href="#" onclick="document.getElementById(\'dsfm_report_settings\').style.display=\'block\';return false;">'+texts[lib.lang].gui.order+'</a>';
    html += '<div id="dsfm_report_settings" style="position:absolute; width: 250px; height: 100px; display:none;">';
    html += '<table class="popup_content" id="dsfm_reorder_tab" style="text-align:left; border: 2px solid #804000;">';
    for( var i = 0; i < Report.order.length; i++ ) {
      html += '<tr><td/><td><input type="checkbox" ';
      if( Report.order[i].show )
        html += 'checked="checked" ';
      html += 'name="'+Report.order[i].key+'"/><span>'+texts[lib.lang].gui.reportGroups[Report.order[i].key]+"</span></td></tr>";
    }
    html += '<tr><td colspan="2"><input type="button" value="'+texts[lib.lang].gui.ok_btn+'"/ id="dsfm_submit_order"></td></tr></table></div></td></tr></table>';

    for( var i = 0; i < Report.order.length; i++ ) {
      var el = $(Report.order[i].key);
      if( el ) {
        if( Report.groups[Report.order[i].key].hasTitle ) {
          var title = el;
          while( (title = title.previousSibling).nodeType == 3 );
          html += outerHTML(title,Report.order[i].show?"":"none");
        }
        html += outerHTML(el,Report.order[i].show?"":"none");
        if( Report.groups[Report.order[i].key].hasSpacer )
          html += "<br/>";
      }
    }

    var el = $("dsfm_report_links");
    if( el )
      html += outerHTML(el);
    else {
      html += '<div id="dsfm_report_links">';
      el = $("attack_results");
      //HS _ RD 001-->
      //while( el = el.nextSibling ) {
      //  if( el.nodeType != 3 ) {
      //    html += outerHTML(el);
      //    };
      //}
      if (el) {
        while( el = el.nextSibling ) {
          if( el.nodeType != 3 ) {
            html += outerHTML(el);
            };
        }
      } else {
        el = $("attack_spy");
        if ( el ) {
          while( el = el.nextSibling ) {
            if( el.nodeType != 3 ) {
              html += outerHTML(el);
              };
          };
        } else {
          el = $("attack_info_deff");
          if ( el ) {
            while( el = el.nextSibling ) {
              if( el.nodeType != 3 ) {
                html += outerHTML(el);
              };
            };
          };
        };
      };
      //HS _ RD 001<--
      html += "</div>";
    }
    td.innerHTML = html;
    $("dsfm_submit_order").addEventListener("click", Report.submitOrder, false);
    createPrioLinks($("dsfm_reorder_tab"),0,1,0);
  },
  submitOrder : function() {
    $("dsfm_report_settings").style.display="none";
    var tab = $("dsfm_reorder_tab");
    Report.order = [];
    for( var i = 0; i < tab.rows.length-1; i++ ) {
      var chk = getByTagName(tab.rows[i].cells[1], "input", "firstChild");
      var span = getByTagName(chk, "span", "nextSibling");
      Report.order.push( { key: chk.name, show: chk.checked } );
    }
    lib.storage.setValue("reportorder"+ownPid,Report.order);
    Report.reorder();
  },
  getBPs : function(unit,mode) {
    if( serverInfo.config.misc_kill_ranking == 1 )
      return serverInfo.unitInfo[unit].pop;
    else
      return Report.bashPoints[unit][mode];
  },
  setHotKeys : function() {
    if( Settings.settings.misc.useHotKeys ) {
      var res = document.evaluate("//web.archive.org/web/20170408204311/http://td/[@class='nopad']/table[@class='vis']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
      
      var tableTop = res.snapshotItem(0);
      var tableBottom = res.snapshotItem(2);
      var a = [ tableTop.getElementsByTagName("a"), tableBottom.getElementsByTagName("a") ];
      tableTop.style.whiteSpace="nowrap";
      tableBottom.style.whiteSpace="nowrap";

      for( var i = 0; i < a[0].length; i++ ) {
        var hk;
        if( /mode=forward/.test(a[0][i].href) )
          hk = "forward";
        else if( /mode=move/.test(a[0][i].href) )
          hk = "move";
        else if( /action=del_one/.test(a[0][i].href) )
          hk = "del";
        else if( a[0][i].innerHTML == "&lt;&lt;" )
          hk = "next";
        else if( a[0][i].innerHTML == "&gt;&gt;" )
          hk = "prev";

        if( hk ) {
          var txt = HotKeys.add("reports",hk,a[0][i].href);
          a[0][i].innerHTML += txt;
          a[1][i].innerHTML += txt;
        }
      }
    }
  },
  initOverview : function() {    
    //HS _ RÜ001 -->
    var frm = document.getElementsByTagName("form");
    if (frm[5]) {    
      var tab = getByTagName(frm[5],"table", "previousSibling");    
      //HS _ RÜ001<--
      var row = tab.insertRow(tab.rows.length);
      var cell = row.insertCell(0);
      cell.colSpan = 2;
      cmds = lib.storage.getValue("commands"+ownPid,{});
      var attsDone = 0;
      var ts = lib.getTime();
      for( var key in cmds ) {
        for( var i = 0; i < cmds[key].attacks.length; i++ ) {
          if( cmds[key].attacks[i] <= ts )
            attsDone++;
        }
      }
      //HS _ RÜ 001-->
      //var page_size = frm[1].getElementsByTagName("input")[0].value;
      var page_size = frm[6].getElementsByTagName("input")[0].value;
      //HS _ RÜ 001<--
      var page = Math.floor(attsDone / page_size);
      var from = page_size * page;
      page++;
      cell.innerHTML = texts[lib.lang].gui.lastOwnAttackPage + ' <a href="' + lib.createLink("report","mode","attack","from",from,false) + '">['+page+']</a>';
      //HS _ RÜ 001-->
      //var e = getByTagName(frm[0],"table","firstChild");
      var e = getByTagName(frm[5],"table","firstChild");
      //HS _ RÜ 001<--
      if( e ) {
        e.id="dsfm_reports_tab";
        e.rows[0].cells[0].textContent += " ";
        var input = e.rows[0].cells[0].appendChild(ce("input"));
        input.addEventListener("keyup", function() {
              var val = this.value.replace(/^\s*|\s*$/,"");
              for( var i = 1; i < e.rows.length-1; i++ ) {
                  if( val == "" || e.rows[i].cells[0].textContent.indexOf(val) > -1 )
                    e.rows[i].style.display = "";
                  else
                    e.rows[i].style.display = "none";
              }
            }, false);
        input.type = "text";
        e.rows[0].appendChild(ce("th")).innerHTML = "FM";
        e.rows[e.rows.length-1].appendChild(ce("th"));
        var lnks = e.getElementsByTagName("a");
        var row = 1;
        var maxAge = Settings.settings.misc.reportMaxAge * 24 * 60 * 60;
        var states = ["green","yellow","red"];
        var rids = lib.storage.getValue("rids","");
        for( var i = 0; i < lnks.length; i++ ) {
          var id = lnks[i].href.match(/view=(\d+)/);
          if( id ) {
            var hasReport = new RegExp("\\d+,"+id[1]+";").test(rids);
            var state = 0;
            if( !hasReport ) {
              var ts = texts[lib.lang].locale.timeStr2Sec(e.rows[row].cells[1].textContent);
              if( lib.getTime() - ts > maxAge )
                state = 1;
              else
                state = 2;
            }
            e.rows[row++].appendChild(ce("td")).innerHTML = '<img src="/graphic/dots/' + states[state] + '.png" alt="" title="' + texts[lib.lang].gui.reportStates[state] + '"/>';
          }
        }
        var check = document.getElementsByName("all");
        if(check.length > 0) {
          input = check[0].parentNode.insertBefore(ce("input"),check[0]);
          input.type="checkbox";
          input.parentNode.removeChild(check[0]);
          input.addEventListener("click",function() {
              for( var i = 1; i < e.rows.length-1; i++ ) {
                var check = e.rows[i].getElementsByTagName("input")[0];
                if( this.checked == false )
                  check.checked = false;
                else
                  check.checked = e.rows[i].style.display != "none" ? true : false;
              }
            }, false );
        };
      };
    }; //HS _ RÜ 001
  },
  parse : function(isPublicReport) {
    var curTime = lib.getTime();
    var rid;
    rid = parseInt(location.href.match( /view=(\d+)/ )[1], 10);
    var table = document.evaluate("//web.archive.org/web/20170408204311/http://td/[@class='nopad']/table[@class='vis']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(1);
    var res = table.innerHTML.match(texts[lib.lang].regex.sendDate);
    var ts = texts[lib.lang].locale.timeStr2Sec(res[1]);
    var age = (lib.getTime() - ts) / 3600;
    var rids = lib.storage.getValue("rids","");
    var ridre = new RegExp( "\\d+,"+rid+";" );
    var known = ridre.test(rids);
 
    if( texts[lib.lang].regex.reportTitle.test(table.innerHTML) ) {
      var msgRow = table.insertRow(1);
      msgRow.insertCell(0).innerHTML = texts[lib.lang].gui.stateTitle;
      var msg = msgRow.insertCell(1);
      var playerids = [0,0];
      var vids = [0,0];
      var tab = $("attack_info_att");
      res = tab.rows[0].cells[1].innerHTML.match( /id=(\d+)/ );
      if( res )
        playerids[0] = parseInt(res[1],10);
      vids[0] = tab.rows[1].cells[1].innerHTML.match(/id=(\d+)/)[1];
      res1 = tab.rows[1].cells[1].textContent.match( texts[lib.lang].regex.villageLink );

      tab.rows[1].cells[1].setAttribute("coords",res1[1]+"_"+res1[2]);
      RunTimes.createToolTip(tab.rows[1].cells[1]);
      
      tab = $("attack_info_def");
      res = tab.rows[0].cells[1].innerHTML.match( /id=(\d+)/ );

      if( res )
        playerids[1] = parseInt(res[1],10);
      res2 = tab.rows[1].cells[1].textContent.match( texts[lib.lang].regex.villageLink );
      tab.rows[1].cells[1].setAttribute("coords",res2[1]+"_"+res2[2]);
      RunTimes.createToolTip(tab.rows[1].cells[1]);
      var dist = Math.sqrt(Math.pow(parseInt(res1[1],10) - parseInt(res2[1],10), 2) + Math.pow(parseInt(res1[2],10) - parseInt(res2[2],10), 2));

      vids[1] = parseInt(tab.rows[1].cells[1].innerHTML.match( /id=(\d+)/ )[1],10);
      var dstCoords = tab.rows[1].cells[1].textContent.match(texts[lib.lang].regex.villageLink);
      var vKey = dstCoords[1]+"_"+dstCoords[2];
      if( known )
        msg.innerHTML = texts[lib.lang].gui.reportKnown;
      else {
        var restab = $("attack_results");
        var loy = 100;
        if( restab ) {
          var res = restab.innerHTML.match(texts[lib.lang].regex.loyaltyChange);
          if( res )
            loy = parseInt(res[1], 10);
        }
        if( playerids[0] == ownPid && loy <= 0 ) {
          deleteVillageInfos(dstCoords[1]+"_"+dstCoords[2]);
          msg.innerHTML = texts[lib.lang].gui.ownVillage;
          var newVil = new MyVillage(vids[1]);
          newVil.loyalty.timestamp = ts;
          newVil.loyalty.value = 25;
          newVil.save();
        }
        else if(playerids[1] == ownPid && loy <= 0 ) {
          delete myVillages["vil"+vids[1]];
          lib.storage.setValue("myVillages"+ownPid,myVillages);
          Settings.buildAssist.assigns = Settings.buildAssist.assigns.replace(new RegExp(";"+vids[1]+",\\d+;"),"");          
          Settings.recruAssist.assigns = Settings.recruAssist.assigns.replace(new RegExp(";"+vids[1]+",\\d+;"),"");
          lib.storage.setValue("buildAssist"+ownPid,Settings.buildAssist);
          lib.storage.setValue("recruAssist"+ownPid,Settings.recruAssist);
          msg.innerHTML = texts[lib.lang].gui.lostVillage;
        }
        else {
          var villageInfo = new Village( vKey );
          if( villageInfo.lastreport.timestamp < ts || villageInfo.lastreport.rid < rid ) {
            villageInfo.lastreport.rid = rid;
            villageInfo.lastreport.timestamp = ts;
          }
          if( loy < 100 && (villageInfo.loyalty.timestamp < ts || villageInfo.loyalty.rid < rid) ) {
            villageInfo.loyalty.rid = rid;
            villageInfo.loyalty.timestamp = ts;
            villageInfo.loyalty.value = loy;
          }
          if( age > Settings.settings.misc.reportMaxAge * 24 )
            msg.innerHTML = texts[lib.lang].gui.oldReport;
          else {
            if( restab && restab.rows.length > 0 && age < Settings.settings.map.sumHours ) {
              if( texts[lib.lang].regex.beute.test(restab.rows[0].cells[0].innerHTML) ) {
                var beute = {"wood":0, "stone":0, "iron":0};
                var imgs = restab.rows[0].cells[1].getElementsByTagName("img");
                var res = restab.rows[0].cells[1].textContent.replace(/\./g,"").split(" ");
                var load = restab.rows[0].cells[2].textContent.replace(/\./g,"").split("/");
                load[0] = parseInt(load[0],10);
                load[1] = parseInt(load[1],10);
                if( load[1] > 0 )
                  villageInfo.eq = Math.round((villageInfo.eq + (load[0] * 100 / load[1]))/2);
                for( var b = 0; b < imgs.length; b++ )
                  beute[resKey[imgs[b].title]] = res[b];
                var beuten = lib.storage.getValue("beute","");
                if( !new RegExp(","+rid+";").test(beuten) )
                  lib.storage.setValue("beute", beuten + ts + "," + playerids[0] + "," + beute["wood"]+","+beute["stone"]+","+beute["iron"]+","+rid+";");
                
                tab = $("attack_info_att_units");
                var slowest = 0;
                for( var i = 1; i < tab.rows[1].cells.length; i++ ) {
                  var count = parseInt(tab.rows[1].cells[i].textContent.replace(".",""),10);
                  if( count > 0 ) {
                    var key = tab.rows[0].cells[i].innerHTML.match(/unit_([^\.]+)\.png/)[1];
                    if( serverInfo.unitInfo[key].speed > slowest )
                      slowest = serverInfo.unitInfo[key].speed;
                  }
                }
                
                var returns = lib.storage.getValue("returns",{});
                if( !returns[vids[0]] )
                  returns[vids[0]]="";
                if( returns[vids[0]].indexOf(","+rid+";") == -1 ) {
                  var rettime = Math.round(ts+(slowest*dist*60),0);
                  if( rettime > curTime ) {
                    returns[vids[0]] += rettime + "," + beute["wood"]+","+beute["stone"]+","+beute["iron"]+","+rid+";";
                    lib.storage.setValue("returns",returns);
                  }
                }
              }
            }

            tab = $("attack_spy");
            if( tab ) {
              if( texts[lib.lang].regex.spyres.test(tab.rows[0].cells[0].innerHTML) ) {
                var imgs = tab.rows[0].cells[1].getElementsByTagName("img");
                res = tab.rows[0].cells[1].textContent.replace(/\./g,"").split(" ");
                if( villageInfo.res.timestamp < ts || villageInfo.res.rid < rid ) {
                  villageInfo.res.rid = rid;
                  villageInfo.res.timestamp = ts;
                  villageInfo.res["wood"] = 0;
                  villageInfo.res["stone"] = 0;
                  villageInfo.res["iron"] = 0;
                  for( i = 0; i < imgs.length; i++ )
                    villageInfo.res[resKey[imgs[i].title]] = res[i];
                }
              }
              if( tab.rows.length > 1 && texts[lib.lang].regex.building.test( tab.rows[1].cells[0].innerHTML ) ) {
                if( villageInfo.buildings.timestamp < ts || villageInfo.buildings.rid < rid ) {
                  var buildings = tab.rows[1].cells[1].innerHTML.replace(/<[^>]+>/g,"").split(")");
                  var levels = { };
                  for( var key in buildingKeys )
                    levels[buildingKeys[key]] = 0;
                  for( i = 0; i < buildings.length; i++ ) {
                    res = buildings[i].match(new RegExp( texts[lib.lang].regex.buildinglevel ));
                    if( res )
                      levels[buildingKeys[res[1].substring(0,res[1].length-1)]] = parseInt(res[2],10);
                  }
                  for( var key in levels ) {
                    var change = levels[key] - villageInfo.buildings[key].level;
                    villageInfo.buildings[key].level = levels[key];
                    if( villageInfo.buildings.rid > 0 )
                      villageInfo.buildings[key].change = change;
                  }
                  villageInfo.buildings.rid = rid;
                  villageInfo.buildings.timestamp = ts;
                }
              }
              if( tab.rows.length > 2 && texts[lib.lang].regex.defunits.test(tab.rows[tab.rows.length-2].cells[0].innerHTML) ) {
                if( villageInfo.unitsout.timestamp < ts || villageInfo.unitsout.rid < rid ) {
                  var unittab = tab.rows[tab.rows.length-1].cells[0].getElementsByTagName("table")[0];
                  villageInfo.unitsout.rid = rid;
                  villageInfo.unitsout.timestamp = ts;
                  for( var i = 0; i < unittab.rows[0].cells.length; i++ ) {
                    res = unittab.rows[0].cells[i].innerHTML.match(/unit\/unit_([^\.]+)\.png/);
                    villageInfo.unitsout[res[1]] = parseInt(unittab.rows[1].cells[i].innerHTML, 10);
                  }
                }
              }
            }
            else if( villageInfo.res.timestamp < ts || villageInfo.res.rid < rid ) {
              villageInfo.res.rid = rid;
              villageInfo.res.timestamp = ts;
              if( load && load[0] == load[1] ) {
                for( var res in resInfos ) {
                  villageInfo.res[res] -= beute[res];
                  if( villageInfo.res[res] < 0 )
                    villageInfo.res[res] = 0;
                }
              }
              else {
                villageInfo.res.wood = 0;
                villageInfo.res.stone = 0;
                villageInfo.res.iron = 0;
              }
            }
            if( villageInfo.buildings.rid != rid ) {
              var re = texts[lib.lang].regex.damage.toString();
              var re = new RegExp(re.substring(1,re.length-1),"g");
              //HS _ RD 001-->
              //res = restab.innerHTML.match(re);
              if ( restab ) {
                res = restab.innerHTML.match(re);
              };
              //HS _ RD 001<--
              if( res ) {
                for( var i = 0; i < res.length; i++ ) {
                  var vals = res[i].match(texts[lib.lang].regex.damage);
                  if( vals ) {
                    var level = parseInt( vals[2], 10 );
                    villageInfo.buildings[buildingKeys[vals[1]]].change = level - villageInfo.buildings[buildingKeys[vals[1]]].level;
                    villageInfo.buildings[buildingKeys[vals[1]]].level = level;
                  }
                }
              }
            }
            var unittab = $("attack_info_def_units");
            if( unittab && (villageInfo.unitsin.timestamp < ts || villageInfo.unitsin.rid < rid) ) {
              villageInfo.unitsin.rid = rid;
              villageInfo.unitsin.timestamp = ts;
              var units = {};
              for( var i = 1; i < unittab.rows[0].cells.length; i++ ) {
                res = unittab.rows[0].cells[i].innerHTML.match(/unit\/unit_([^\.]+)\.png/);
                villageInfo.unitsin[res[1]] = parseInt(unittab.rows[1].cells[i].innerHTML, 10) - parseInt(unittab.rows[2].cells[i].innerHTML, 10);
              }
            }

            msg.innerHTML = texts[lib.lang].gui.reportRead;
            villageInfo.save();
          }
        }
        cmds = lib.storage.getValue( "commands"+ownPid,{});
        if( cmds[vKey] ) {
          removeNearest(cmds[vKey].attacks,ts);
          lib.storage.setValue("commands"+ownPid,cmds);
        }
      }
    }
    else if( texts[lib.lang].regex.reportSupport.test(table.innerHTML) ) {
      var tab = table.rows[2].cells[0].getElementsByTagName("TABLE")[0];
      var vid = 0;
      if( tab.rows[0].cells[1].innerHTML.match(/id=(\d+)/)[1] == ownPid )
        vid = tab.rows[1].cells[1].innerHTML.match(/id=(\d+)/)[1];
      else if( tab.rows[2].cells[1].innerHTML.match(/id=(\d+)/)[1] == ownPid )
        vid = tab.rows[3].cells[3].innerHTML.match(/id=(\d+)/)[1];
      if( vid > 0 ) {
        table.rows[2].cells[0].appendChild(ce("br"));
        var a = table.rows[2].cells[0].appendChild(ce("a"));
        a.href = lib.createLink("place","mode","units",false).replace(/village=\d+/,"village="+vid);
        a.innerHTML = "&raquo; " + texts[lib.lang].gui.moveOwnUnits;
      }
    }
    else if( texts[lib.lang].regex.visit.test(table.innerHTML) ) {
      var res = table.innerHTML.match(/(\d{1,3})\|(\d{1,3})/);
      var vKey = res[1]+"_"+res[2];
      cmds = lib.storage.getValue( "commands"+ownPid,{});
      removeNearest(cmds[vKey].attacks,ts);
      lib.storage.setValue("commands"+ownPid,cmds);
    }
    if( age < Settings.settings.misc.reportMaxAge * 24 && !known ) {
      rids += ts + "," + rid + ";"
      lib.storage.setValue("rids",rids);
    }
  },
}
/** var InfoVillage = {
/* Was macht diese Funktion?
*/
var InfoVillage = {
  doIt : function() {
    if( lib.params.screen == "info_village" ) {
      var tabs = $("content_value").getElementsByTagName("table");
      var tab = tabs[1];
      if( Settings.settings.misc.privateNames )
        PrivateVillageName.modVillageInfo(tab);
      var a = tab.getElementsByTagName("a");
      var pid = 0;
      var coords = tab.rows[1].cells[1].textContent.split("|");
      var type = "other";
      for( var i = 0; i < a.length; i++ ) {
        if( /toggleGroupAssignments/.test(a[i].getAttribute("onclick")) ) {
          a[i].innerHTML += HotKeys.add("villageinfo","modgroups", "click", a[i]);
          a[i].addEventListener("click", function() { var tab = $("group_table"); if( tab ) $("group_assigment").innerHTML = ""; else Groups.modGroupTable("set"); }, false);
          continue;
        }
        
        if( /reserve_village|cancel_reservation/.test(a[i].href) ) {
          a[i].innerHTML += HotKeys.add("villageinfo","reserve","click",a[i]);
          continue;
        }
        
        var res = a[i].href.match(/info_player&id=(\d+)/);
        if( res ) {
          pid = res[1];
          if( pid == ownPid ) {
            if( $("menu_row2_village").nextSibling.textContent.indexOf("("+coords+")") > -1 )
              type = "current";
            else
              type = "own";
          }
          else
            type = "other";
          continue;
        }
        
        if( /screen=map/.test(a[i].href) ) {
          a[i].innerHTML += HotKeys.add("villageinfo","centermap",a[i].href);
          continue;
        }
        
        if( /screen=overview$/.test(a[i].href)) {
          a[i].innerHTML += HotKeys.add("villageinfo","overview",a[i].href);
          continue;
        }
        
        res = a[i].href.match(/screen=place&target=(\d+)/);
        if(res) {
          if( res[1] != lib.game_data.village.id ) {
            a[i].innerHTML += HotKeys.add("villageinfo","sendunits",a[i].href);
            if( type == "own" ) {
              var tr = getByTagName(a[i],"tr","parentNode");
              var row = tr.parentNode.insertRow(tr.rowIndex+1);
              var cell = row.insertCell(-1);
              cell.colSpan=2;
              var lnk = cell.appendChild(ce("a"));
              lnk.href = lib.createLink("place","target",lib.game_data.village.id,false).replace(/village=(\d+)/,"village="+res[1]);
              lnk.innerHTML = "&raquo; "+ texts[lib.lang].gui.hotKeyLabels["villageinfo"].hks["getunits"] + HotKeys.add("villageinfo","getunits",lnk.href);
            }
          }
          continue;
        }
        
        res = a[i].href.match(/screen=market&mode=send&target=(\d+)/);
        if(res) {
          if( res[1] != lib.game_data.village.id ) {
            a[i].innerHTML += HotKeys.add("villageinfo","market",a[i].href);
            if( type == "own" ) {
              var tr = getByTagName(a[i],"tr","parentNode");
              var row = tr.parentNode.insertRow(tr.rowIndex+1);
              var cell = row.insertCell(-1);
              cell.colSpan=2;
              var lnk = cell.appendChild(ce("a"));
              lnk.href = lib.createLink("market","mode","send","target",lib.game_data.village.id,false).replace(/village=(\d+)/,"village="+res[1]);
              lnk.innerHTML = "&raquo; "+ texts[lib.lang].gui.hotKeyLabels["villageinfo"].hks["getress"] + HotKeys.add("villageinfo","getress",lnk.href);
            }
          }
          continue;
        }

        if( /action=(add|del)\_target[^#]*$/.test(a[i].href) ) {
          a[i].innerHTML += HotKeys.add("villageinfo","togglefav",a[i].href);
          continue;
        }
        
        if( /screen=village\_color/.test(a[i].href) ) {
          a[i].innerHTML += HotKeys.add("villageinfo","markonmap",a[i].href);
          continue;
        }
        
        if( /screen=ally&mode=reservation/.test(a[i].href) ) {
          a[i].innerHTML += HotKeys.add("villageinfo","ap",a[i].href);
          continue;
        }
      }
      
      
      
      var key = coords[0]+"_"+coords[1];
      var hasData = otherVillages[key];
      var village = new Village(key);
      if( hasData ) {
        var row = tab.insertRow(tab.rows.length);
        var cell = row.insertCell(0);
        cell.colSpan=2;
        var a = cell.appendChild(ce("a"));
        a.href = "javascript:;";
        a.innerHTML = "&raquo; "+texts[lib.lang].gui.delinfos + HotKeys.add("villageinfo","removeinfos","click",a);
        a.addEventListener("click", function(e) { if( confirm(texts[lib.lang].gui.confirm_delinfos) ) {  deleteVillageInfos(key); e.target.parentNode.parentNode.removeChild(e.target.parentNode);} }, false );
        var ntab = tabs[0].rows[0].cells[1];
        ntab.appendChild(ce("br"));
        var newTab = ntab.appendChild(document.createElement("table"));
        report = new Village(key).load();
        var html = "";
        if( report.buildings.timestamp > 0 ) {
          var dt = new Date((report.unitsin.timestamp)*1000);
          html += newTab.innerHTML = "<tr><td>"+texts[lib.lang].gui.buildings+"<br/><span style=\"font-size:xx-small\">"+texts[lib.lang].locale.date2timeStr(dt,true,false)+"</span></td><td>"+getBuildingsTab(report.buildings,true)+"</td></tr>";
        }
        if( report.unitsin.hasUnits) {
          var dt = new Date((report.unitsin.timestamp)*1000);
          html += "<tr><td>"+texts[lib.lang].gui.unitsin+"<br/><span style=\"font-size:xx-small\">"+texts[lib.lang].locale.date2timeStr(dt,true,false)+"</span></td><td>" + getUnitsTab(report.unitsin) + "</td></tr>";
        }
        if( report.unitsout.hasUnits ) {
          var dt = new Date((report.unitsout.timestamp)*1000);
          html += "<tr><td>"+texts[lib.lang].gui.unitsout+"<br/><span style=\"font-size:xx-small\">"+texts[lib.lang].locale.date2timeStr(dt,true,false)+"</span></td><td>" + getUnitsTab(report.unitsout) + "</td></tr>";
        }
        newTab.innerHTML = html;
      }
      if( type == "other" ) {
        var row = tab.insertRow(tab.rows.length);
        var cell = row.insertCell(0);
        cell.colSpan = 2;
        var input = cell.appendChild(ce("input"));
        cell.appendChild(document.createTextNode(texts[lib.lang].gui.delfromfarmlist + HotKeys.add("villageinfo","togglenofarm","click",input)));
        input.type="checkbox";
        input.checked = new RegExp(key+";").test(lib.storage.getValue("nofarms"+ownPid,""));
        input.addEventListener("click", function(e) { if( this.checked ) lib.storage.setValue("nofarms"+ownPid,lib.storage.getValue("nofarms"+ownPid)+key+";"); else lib.storage.setValue("nofarms"+ownPid,lib.storage.getValue("nofarms"+ownPid,"").replace(new RegExp(key+";","g"),"")); }, false );
        row = tab.insertRow(tab.rows.length);
        var eqcell = row.insertCell(0);
        eqcell.colSpan = 2;
        eqcell.innerHTML = texts[lib.lang].gui.quotient+": " + village.eq + "% ";
        if( village.eq < 100 ) {
          var a = eqcell.appendChild(ce("a"));
          a.innerHTML = texts[lib.lang].gui.reset + HotKeys.add("villageinfo","reseteq","click",a);
          a.addEventListener("click", function() { village.eq = 100; village.save(); eqcell.innerHTML = texts[lib.lang].gui.quotient+": 100%"}, false );
        }
      }
      row = tab.insertRow(tab.rows.length);
      cell = row.insertCell(0);
      cell.colSpan = 2;
      var dist = Math.sqrt(Math.pow(parseInt(coords[0],10) - curVillage.coords.x, 2) + Math.pow(parseInt(coords[1],10) - curVillage.coords.y, 2));
      if( dist > 0 )
        RunTimes.insertTable(cell,dist);
    }
  },
}
/** var OV = { // OverviewVillages
/* Was macht diese Funktion?
  Bearbeitet die ?ersichten unter dem Men??kt "?ersichten"
*/
var OV = { // OverviewVillages
  tab : null,
  ctxMenu : null,
  distCol : 1,
  doIt : function() {
    if( lib.params.screen == "overview_villages" ) {
      var mode = $('overview').value;
      switch( mode ) {
        case "combined":
          if( OV.setTable("combined_table") ) {
            OV.addControls(true,true);
            var sorter = new TableSorter(OV.tab,"row_a","row_b");
            OV.tab.tHead.rows[0].insertBefore(ce("th"),OV.tab.tHead.rows[0].cells[OV.distCol]).innerHTML = texts[lib.lang].gui.dist;
            OV.insertHideHead();
            var rows = OV.tab.tBodies[0].rows;
            for( var i = 0; i < rows.length; i++ ) {
              rows[i].cells[OV.distCol-1].setAttribute("dsfm_order",i);
              OV.insertDistCol(rows[i]);
              OV.insertHideCol(rows[i],1);
            }
            i = OV.distCol-1;
            sorter.addSortColumn(i++,compareOrderCell,1);
            sorter.addSortColumn(i++,RunTimes.compareDistCell);
            sorter.addSortColumn(i++,OV.compareCombinedProdCell);
            sorter.addSortColumn(i++,OV.compareCombinedProdCell);
            sorter.addSortColumn(i++,OV.compareCombinedProdCell);
            sorter.addSortColumn(i++,OV.compareCombinedProdCell);
            sorter.addSortColumn(i++,OV.compareCombinedProdCell);
            if( serverInfo.buildingInfo.church )
              i++;
            sorter.addSortColumn(i++,compareNumericCell);
            for( var i = 2; i < serverInfo.unitAnz+3; i++ )
              sorter.addSortColumn(OV.tab.tHead.rows[0].cells.length-i,compareNumericCell);
            OV.updateDest();
          }
          break;
        case "commands":
          OV.setTable("commands_table");
          if( OV.tab ) {
            OV.tab.tHead.rows[0].className += " nowrap";
            OV.tab.appendChild(ce("tfoot"));
            OV.tab.tFoot.appendChild(OV.tab.rows[OV.tab.rows.length-1]);
          }
          OV.getCommands();
          if( OV.tab ) {
            for( var i = 0; i < OV.tab.tBodies[0].rows.length; i++ ) {
              OV.tab.tBodies[0].rows[i].cells[2].setAttribute("dsfm_order",i);
            }
            var sorter = new TableSorter(OV.tab,"row_a","row_b");
            sorter.addSortColumn(0,compareStringCell,0);
            sorter.addSortColumn(1,compareStringCell,0);
            sorter.addSortColumn(2,compareOrderCell,1);
            var idx = 3;
            for( var key in serverInfo.unitInfo ) {
              if( key != "militia" )
                sorter.addSortColumn(idx++,compareNumericCell,0);
            }
          }
          break;
        case "units":
          OV.setTable("units_table");
          OV.addControls(true,true);
          OV.tab.tHead.rows[0].insertBefore(ce("th"),OV.tab.tHead.rows[0].cells[OV.distCol]).innerHTML = texts[lib.lang].gui.dist;
          OV.insertHideHead();
          var type = document.getElementsByClassName("selected")[1].innerHTML.match(/type=([^&"]+)/);
          if( type ) {
            type = type[1];
            var callback = function(row) { return row.cells[0].rowSpan > 1; }
            switch( type ) {
              case "complete":
                OV.doUnitsComplete();
                break;
              case "own_home":
                OV.addRunTimeFilter();
              case "there":
              case "away":
              case "moving":
                OV.doUnitsVillage();
                break;
              case "support_detail":
              case "away_detail":
                OV.doUnitsDetail(type);
                break;
            }
          }
          break;
        case "prod":
            OV.setTable("production_table");
            OV.addControls(Settings.settings.prod.runtimeCol,true);
            OV.doProd();
          break;
        case "groups":
          OV.getGroups();
          break;
        case "incomings":
          if( OV.setTable("incomings_table") ) {
            OV.tab.appendChild(ce("tfoot"));
            OV.tab.tFoot.appendChild(OV.tab.tBodies[0].rows[OV.tab.tBodies[0].rows.length-1]);
            for( var i = 0; i < OV.tab.tBodies[0].rows.length; i++ )
              OV.tab.tBodies[0].rows[i].cells[3].setAttribute("dsfm_order",i);
            var sorter = new TableSorter(OV.tab,"row_a","row_b");
            sorter.addSortColumn(0,compareStringCell,0);
            sorter.addSortColumn(1,compareStringCell,0);
            sorter.addSortColumn(2,compareStringCell,0);
            sorter.addSortColumn(3,compareOrderCell,1);
            OV.doIncs();
          }
          break;
        case "tech":
          OV.setTable("techs_table");
          var chk = OV.tab.rows[0].cells[OV.tab.rows[0].cells.length-1].appendChild(ce("input"));
          chk.type = "checkbox";
          chk.title = texts[lib.lang].gui.filterBtn;
          //HS _ ÜF 001-->
          //chk.addEventListener("click",OV.filterTech,false);
          chk.addEventListener("change",OV.filterTech,false);
          //HS _ ÜF 001<--
          break;
        case "buildings":
          if( Settings.settings.build.showOVLoyalty || Settings.settings.build.enhancedOV) {
            OV.setTable("buildings_table");
            OV.doBuild();
          }
          break;
      }
    }
  },
  setTable : function(id) {
    OV.tab = $(id);
    if( OV.tab ) {
      if( OV.tab.tHead === null ) {
        OV.tab.insertBefore(ce("thead"),OV.tab.tBodies[0]);
        OV.tab.tHead.appendChild(OV.tab.tBodies[0].rows[0]);
        for( var i = 0; i < OV.tab.tBodies.length; i++ ) {
          if( OV.tab.tBodies[i].rows.length == 0 )
            OV.tab.removeChild(OV.tab.tBodies[i--]);
        }
      }
      if( /overview\/note\.png/.test(OV.tab.tHead.rows[0].cells[0].innerHTML) || /note-icon/.test(OV.tab.tHead.rows[0].cells[0].innerHTML) )
        OV.distCol++;
      var sel = document.getElementsByClassName("selected");
      if( sel.length == 3 ) {
        var href = sel[1].getElementsByTagName("a")[0].href;
        var type = href.match(/.*&(.*)type=([^&"]+)/);
        var a = $("paged_view_content").getElementsByTagName("table")[0].getElementsByTagName("a");
        for( var i = 0; i < a.length; i++ )
          a[i].href += "&"+type[1]+"type="+type[2];
      }
      return true;
    }
    else
      return false;
  },
  updateCount : function(count) {
    var a = OV.tab.rows[0].cells[0].getElementsByTagName("a");
    var up = a[0];
    var down = a[1];
    document.body.appendChild(up);
    document.body.appendChild(down);
    var name = OV.tab.rows[0].cells[OV.distCol-1].textContent.match(/([^\(]+)/)[1];
    OV.tab.rows[0].cells[OV.distCol-1].textContent = name + "(" + count + ") ";
    OV.tab.rows[0].cells[OV.distCol-1].appendChild(up);
    OV.tab.rows[0].cells[OV.distCol-1].appendChild(down);
  },
  getCommands : function() {
    var func = OV.getAtts;
    var get = lib.storage.getValue("getatts"+ownPid,false);
    if( lib.params.group == 0 && lib.params.type=="attack" && lib.params.page==-1 ) {
      if( get ) {
        OV.parseAtts();
        return;
      }
      else
        func = OV.parseAtts;
    }
    if( !get ) {
      if( OV.tab )
        var a = OV.tab.parentNode.insertBefore(ce("a"),OV.tab);
      else
        a = $("paged_view_content").appendChild(ce("a"));
      a.innerHTML = "&raquo; " + texts[lib.lang].gui.getatts + HotKeys.add( "place", "getAtts", func );
      a.href = "javascript:;";
      a.id = "dsfm_getatts";
      a.addEventListener("click", func, false );
    }
  },
  doProd : function() {
    var ts = lib.getTime();
    var cols = [];
    var sum = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    var x, y, valid = false;
    if( Settings.settings.prod.runtimeCol ) {
      x = parseInt($("dsfm_dst_x").value,10);
      y = parseInt($("dsfm_dst_y").value,10);
      valid = !isNaN(x) && x >= 0 && x <= 999 && !isNaN(y) && y >= 0 && y <= 999;
    }
    //OV.tab.style.display = "none";
    var row = OV.tab.tHead.rows[0];
    var cell;
    Storage.modResHeader(row,OV.distCol+1);
    OV.insertHideHead();
    if( Settings.settings.prod.runtimeCol ) {
      cell = row.insertBefore(ce("th"),row.cells[OV.distCol]);
      cell.innerHTML = texts[lib.lang].gui.dist;
    }
    var rows = OV.tab.tBodies[0].rows;
    for( var i = 0; i < rows.length; i++ ) {
      if( Settings.settings.prod.removeBuildTime )
        rows[i].cells[OV.distCol+5].innerHTML = rows[i].cells[OV.distCol+5].innerHTML.replace(/[^<]+<br\/?>/i,"");
      var id = rows[i].cells[OV.distCol-1].innerHTML.match(/village=(\d+)/)[1];
      var coords = rows[i].cells[OV.distCol-1].innerHTML.match(/\((\d+)\|(\d+)\) C\d+</);
      var village = new MyVillage(id);
      village.coords.x = coords[1];
      village.coords.y = coords[2];
      var res = rows[i].cells[OV.distCol+1].textContent.replace(/\./g, "" ).split(" ");
      var idx = 0;
      var cur = 0;
      var max = parseInt(rows[i].cells[OV.distCol+2].innerHTML, 10);
      //var imgs = rows[i].cells[OV.distCol+1].getElementsByClassName("res");
      rows[i].cells[OV.distCol-1].setAttribute("dsfm_order",i);
      rows[i].cells[OV.distCol-1].setAttribute("coords",coords[1]+"_"+coords[2]);

      if( Settings.settings.prod.shrinkRecruitmentMode > 0 || Settings.settings.prod.showRecruitSums )
        Recruitment.shrinkDrillImgList(rows[i].cells[OV.distCol+7],Settings.settings.prod.shrinkRecruitmentMode);

      var off = OV.distCol;
      rows[i].insertCell(OV.distCol+1);
      rows[i].insertCell(OV.distCol+1);
      off += 2;
      rows[i].cells[OV.distCol+1].style.textAlign = "right";

      // Trader
      cell = rows[i].cells[off+3];
      cell.style.textAlign = "right";
      cur = cell.textContent.split("/");
      max = parseInt(cur[1], 10);
      cur = parseInt(cur[0], 10);
      sum[4] += cur;
      sum[6] += max;
      // Farm
      cell = rows[i].cells[off+4];
      cell.style.textAlign = "right";
      cur = cell.textContent.split("/");
      max = parseInt(cur[1], 10);
      cur = parseInt(cur[0], 10);
      percent = Math.round(cur * 100 / max);
      sum[5] += cur;
      sum[7] += max;
      var html = lib.formatNumber(cur,true,true);
      if( Settings.settings.prod.farmTotal )
        html += "/" + lib.formatNumber(max,true,true);
      village.res.pop.current = cur;
      village.res.pop.max = max;
      cell.innerHTML = html;
      if( Settings.settings.prod.farmColored )
        Storage.getColors("farm",percent,cell);
      // Storage
      cell = rows[i].cells[off+2];
      cell.style.textAlign = "right";
      max = parseInt(cell.textContent.replace(/\./g, "" ),10);
      sum[3] += max;
      cell.innerHTML = lib.formatNumber(max,true,true);

      village.res.storage = max;
      village.res.timestamp = ts;
      var c = OV.distCol+1;
      
      for( var key in resInfos ) {
        var cur = parseInt(res[idx],10);
        village.res[key] = cur;
        sum[idx++] += cur;
        var percent = Math.round( cur * 100 / max );
        cell = rows[i].cells[c++];
        cell.style.textAlign = "right";
        cell.style.cursor = "default";
        cell.style.paddingLeft = "5px";
        cell.style.paddingRight = "5px";
        cell.title = lib.formatNumber( max - cur, true, false ) + " " + texts[lib.lang].gui.freeRes;
        cell.innerHTML = lib.formatNumber(cur, true, true);
//          var div = cell.appendChild(ce("div"));
//          div.innerHTML = lib.formatNumber(cur, true, true);
        if( Settings.settings.prod.resColored )
          Storage.getColors("resource",percent,cell);
      }
      village.save();
      if( Settings.settings.prod.runtimeCol ) {
        cell = rows[i].insertCell(OV.distCol);
        cell.className = "dsfm_dist";
        cell.style.cursor = "default";
        cell.style.textAlign = "right";
        RunTimes.createToolTip(cell);
        if( valid ) {
          var dist = Math.sqrt(Math.pow(coords[1] - x, 2) + Math.pow(coords[2] - y, 2));
          cell.innerHTML = Math.round(dist*100)/100;
          cell.setAttribute('dist', dist);
        }
      }
      OV.insertHideCol(rows[i],1);
    }
    if( Settings.settings.prod.showSums ) {
      var foot = OV.tab.appendChild(ce("tfoot"));
      foot.className = "nowrap";
      row = foot.insertRow(0);
      cell = row.appendChild(ce("th"));
      cell.colSpan = OV.distCol + (Settings.settings.prod.runtimeCol ? 2 : 1);
      cell.style.textAlign = "right";
      cell.innerHTML = texts[lib.lang].gui.sum;
      var i = 0;
      for( ; i < 6; i++ ) {
        cell = row.appendChild(ce("th"));
        cell.style.textAlign = "right";
        if( i < 4 )
          cell.innerHTML = lib.formatNumber(sum[i],true,true,1);
        else
          cell.innerHTML = lib.formatNumber(sum[i],true,true,1) + "<br/>"+texts[lib.lang].gui.of+" "+lib.formatNumber(sum[i+2],true,true,1);
      }
      cell = row.appendChild(ce("th"));
      cell.colSpan = 4;
    }
    if( Settings.settings.prod.showRecruitSums )
      Recruitment.createSumTable(OV.tab.parentNode,OV.tab.nextSibling);
    var sorter = new TableSorter(OV.tab,"row_a","row_b");
    var cell = OV.distCol-1;
    //OV.tab.tHead.rows[0].cells[OV.distCol-1].innerHTML += " ("+OV.tab.tBodies[0].rows.length+")";
    sorter.addSortColumn(cell++,compareOrderCell,1);
    if( Settings.settings.prod.runtimeCol )
      sorter.addSortColumn(cell++,RunTimes.compareDistCell);
    sorter.addSortColumn(cell++,compareNumericCell);
    sorter.addSortColumn(cell++,compareNumericCell);
    sorter.addSortColumn(cell++,compareNumericCell);
    sorter.addSortColumn(cell++,compareNumericCell);
    sorter.addSortColumn(cell++,compareNumericCell);
    sorter.addSortColumn(cell++,compareNumericCell);
    sorter.addSortColumn(cell++,compareNumericCell);
    sorter.addSortColumn(cell++,OV.compareProdCell);
    sorter.addSortColumn(cell++,OV.compareProdCell);
    sorter.addSortColumn(cell++,OV.compareProdCell);
    OV.tab.style.display = "";
  },
  doBuild: function() {
    if( Settings.settings.build.showOVLoyalty ) {
      var cell = OV.tab.rows[0].appendChild(ce("th"));
      cell.style.textAlign = "center";
      cell.innerHTML = '<img src="graphic/unit/unit_snob.png" title="'+texts[lib.lang].gui.loyalty+'"/>';
    }
    if( Settings.settings.build.enhancedOV ) {
      var cell = OV.tab.rows[0].appendChild(ce("th"));
      cell.style.textAlign = "center";
      var input = cell.appendChild(ce("select"));
      input.id = "dsfm_build_variant_0";
      //sake-->
      //input.options[0] = new Option(texts[lib.lang].gui.selectVariantOption,0,true,true);
      //for( var i = 0; i < Settings.buildAssist.variants.length; i++ )
      //  input.options[i+1] = new Option(Settings.buildAssist.variants[i].name,Settings.buildAssist.variants[i].id,false,false);
      input.options.add( new Option(texts[lib.lang].gui.selectVariantOption,0,true,true) );
      for( var i = 0; i < Settings.buildAssist.variants.length; i++ )
        input.options.add( new Option(Settings.buildAssist.variants[i].name,Settings.buildAssist.variants[i].id,false,false) );
      //sake
    }
    
    for( var i = 1; i < OV.tab.rows.length; i++ ) {
      var id = OV.tab.rows[i].cells[2].innerHTML.match(/village=(\d+)/)[1];

      cell = OV.tab.rows[i].cells[OV.tab.rows[i].cells.length-1];
      if( !/building_order/.test(cell.innerHTML) ) {
        var ul = cell.appendChild(ce("ul"));
        ul.id = "building_order_"+id;
        ul.className = "building_order ui-sortable";
      }
      if( Settings.settings.build.showOVLoyalty ) {
        cell = OV.tab.rows[i].insertCell(-1);
        cell.style.textAlign = "right";
        var vil = new MyVillage(id);
        var loyalty = 100;
        if( vil.loyalty.timestamp > 0 ) {
          var h = Math.round((lib.getTime() - vil.loyalty.timestamp) / 3600);
          loyalty = vil.loyalty.value + Math.round(h * serverInfo.config.speed * serverInfo.config.snob_factor);
          if( loyalty >= 100 ) {
            loyalty = 100;
            vil.loyalty = { timestamp: 0, value: 0 };
            vil.save();
          }
        }
        if( loyalty == 100 )
          cell.className = "hidden";
        cell.textContent = loyalty+"%";
      }
      if( Settings.settings.build.enhancedOV ) {
        cell = OV.tab.rows[i].insertCell(-1);
        var select = input.cloneNode(true);
        select.id = "dsfm_build_variant_"+id;
        var variant = Settings.buildAssist.assigns.match(";"+id+",(\\d+);");
        if( variant ) {
          select.value = variant[1];
        }
        else 
          select.value = Settings.buildAssist.defVar;
        select.addEventListener("change", function() {
            var id = parseInt(this.id.substring(19),10);
            Settings.buildAssist.assigns = Settings.buildAssist.assigns.replace(new RegExp(";"+id+",\\d+;"),"");
            Settings.buildAssist.assigns += ";" + id +","+this.value+";";
            lib.storage.setValue("buildAssist"+ownPid,Settings.buildAssist);
            BuildAssist.updateOVRow(this.parentNode.parentNode,parseInt(this.value,10));
          }, false );
        cell.appendChild(select);
        BuildAssist.updateOVRow(OV.tab.rows[i],select.value);
      }
    }
    if( Settings.settings.build.enhancedOV ) {
      OV.tab.addEventListener("DOMAttrModified", BuildAssist.onUpdateOVRow, false);
      OV.tab.addEventListener("DOMNodeInserted", BuildAssist.onUpdateOVRow, false);
      OV.tab.addEventListener("DOMNodeRemoved", BuildAssist.onUpdateOVRow, false);
      input.addEventListener("change", function() {
          if( confirm( texts[lib.lang].gui.confirmAssignBuildVariant )) {
            var idx = OV.tab.rows[0].cells.length-1;
            var variant = parseInt(OV.tab.rows[0].cells[idx].firstChild.value);
            for(var i = 1; i < OV.tab.rows.length; i++ ) {
              var select = OV.tab.rows[i].cells[idx].firstChild;
              select.value = variant;
              var id = parseInt(select.id.substring(19),10);
              Settings.buildAssist.assigns = Settings.buildAssist.assigns.replace(new RegExp(";"+id+",\\d+;"),"");
              Settings.buildAssist.assigns += ";" + id +","+variant+";";
              BuildAssist.updateOVRow(OV.tab.rows[i],variant);
            }
            lib.storage.setValue("buildAssist"+ownPid,Settings.buildAssist);
          }
        }, false );
    }
  },
  addControls : function(coords,saveList) {
    var tab = OV.tab.parentNode.insertBefore(ce("table"),OV.tab);
    tab.id = "dsfm_controls";
    var row = tab.insertRow(0);
    if( coords ) {
      var dst = lib.storage.getValue("dst"+ownPid,"|").split("|");
      var cell = row.appendChild(ce("th"));
      cell.innerHTML = texts[lib.lang].gui.destVillage;
      cell = row.insertCell(-1);
      cell.appendChild(document.createTextNode("x:"));
      var input = cell.appendChild(ce("input"));
      input.size = 4;
      input.id = "dsfm_dst_x";
      input.value = dst[0];
      input.addEventListener("keyup", OV.updateDest, false );

      cell = row.insertCell(-1);
      cell.appendChild(document.createTextNode("y:"));
      input = cell.appendChild(ce("input"));
      input.size = 4;
      input.id = "dsfm_dst_y";
      input.value = dst[1];
      input.addEventListener("keyup", OV.updateDest, false );
    }
    if( saveList ) {
      var cell = row.insertCell(-1);
      var a = cell.appendChild(ce("a"));
      a.href = "javascript:;";
      a.innerHTML = "&raquo; " + texts[lib.lang].gui.saveOrderLink;
      a.addEventListener("click", OV.saveOrder, false );
    }
  },
  getAtts : function() {
    lib.storage.setValue("getatts"+ownPid, 1);
    location.href = lib.createLink("overview_villages", "mode", "commands", "group", 0, "type", "attack", "page", -1, false);
  },
  parseAtts : function () {
    lib.storage.setValue( "getatts"+ownPid, 0 );
    var nav = $("paged_view_content").getElementsByClassName("paged-nav-item");
    cmds = lib.storage.getValue("commands"+ownPid,{});
    var nav = $("paged_view_content").getElementsByClassName("paged-nav-item");
    var page = 1;
    if( nav.length > 0 ) {
      var page = parseInt(nav[0].parentNode.innerHTML.match( /&gt;([^&]*)&lt;/ )[1],10);
      if( isNaN(page) )
        page = 1;
    }
    if( page == 1 ) {
      for( var key in cmds )
        cmds[key].attacks = [];
    }
    if( OV.tab ) {
      var ts = lib.getTime();
      var arrivalCol = 0;
      for( var i = 0; i < OV.tab.rows[0].cells.length; i++ ) {
        if( texts[lib.lang].regex.arrivalTitle.test(OV.tab.rows[0].cells[i].innerHTML) ) {
          arrivalCol = i;
          break;
        }
      }
      for( var i = 0; i < OV.tab.tBodies[0].rows.length; i++ ) {
        var res = $("labelText["+(i-1)+"]");
        if( res ) {
          res = res.innerHTML.match( texts[lib.lang].regex.villageLink );
          if( res ) {
            var key = res[1]+"_"+res[2];
            arrivalTime = texts[lib.lang].locale.timeStr2Sec(OV.tab.rows[i].cells[arrivalCol].textContent);
            if( !cmds[key] )
              cmds[key] = {attacks:[],supports:[],incs:[]};
            cmds[key].attacks.push(arrivalTime);
          }
        }
      }
    }
    lib.storage.setValue( "commands"+ownPid, cmds );
    var a = $("dsfm_getatts");
    if( a )
      a.parentNode.removeChild(a);
    alert( texts[lib.lang].gui.attsparsed );
  },
  getGroups : function() {
    var ts = lib.getTime();
    var tab = $("group_assign_table");
    if (tab) { //HS _ ÜF 001
      for( var i = 1; i < tab.rows.length-1; i+=2 ) {
        var id = tab.rows[i].cells[0].innerHTML.match(/village=(\d+)/)[1];
        var coords = tab.rows[i].cells[0].innerHTML.match(/ \((\d+)\|(\d+)\) C\d+</);
        var village = new MyVillage(id);
        village.coords.x = coords[1];
        village.coords.y = coords[2];
        village.groups.timestamp = ts;
        var groups = tab.rows[i].cells[4].textContent;
        if( /class="grey"/.test(groups) )
          village.groups.list = [];
        else
          village.groups.list = groups.split("; ");
        village.save();
      }
    }; //HS _ ÜF 001
  },
  doUnitsComplete : function() {
    var ts = lib.getTime();
    var units = [];
    var sum = { 
      home: { },
      there: { },
      away: { },
      moving: { },
    };
    for( var c = OV.distCol+2; c < OV.tab.rows[0].cells.length - 2; c++ ) {
      var unit = OV.tab.rows[0].cells[c].innerHTML.match(/unit\/unit_([^\.]+)\.png/)[1];
      units.push(unit);
      sum.home[unit] = 0;
      sum.there[unit] = 0;
      sum.away[unit] = 0;
      sum.moving[unit] = 0;
    }
    //OV.tab.rows[0].cells[OV.distCol-1].innerHTML += " (" + OV.tab.tBodies.length + ")";
    for( var i = 0; i < OV.tab.tBodies.length; i++ ) {
      var row = 0;
      var id = OV.tab.tBodies[i].rows[0].cells[OV.distCol-1].innerHTML.match(/village=(\d+)/);
      if( id ) {
        id = id[1];
        var coords = OV.tab.tBodies[i].rows[0].cells[OV.distCol-1].innerHTML.match(/ \((\d+)\|(\d+)\) C\d+</);
        OV.tab.tBodies[i].rows[0].cells[OV.distCol-1].setAttribute("dsfm_order",i);
        var village = new MyVillage(id);
        village.coords.x = coords[1];
        village.coords.y = coords[2];
        for( var key in sum ) {
          var off = row == 0 ? 2 : 1;
          off += OV.distCol-1;
          for( var col = 0; col < units.length; col++ ) {
            var val = parseInt(OV.tab.tBodies[i].rows[row].cells[col+off].textContent,10);
            sum[key][units[col]] += val;
            village.units[key][units[col]] = val;
          }
          row++;
        }
        OV.insertDistCol(OV.tab.tBodies[i].rows[0],coords).rowSpan=5;
        OV.insertHideCol(OV.tab.tBodies[i].rows[0],5);
        village.units.timestamp = ts;
        village.save();
      }
    }

    var sorter = new TableSorter(OV.tab,"row_a","row_b",true);
    sorter.addSortColumn(0,compareOrderCell,1);
    sorter.addSortColumn(1,RunTimes.compareDistCell,0);
    var tfoot = OV.tab.appendChild(ce("tfoot"));
    var row = tfoot.appendChild(ce("tr"));
    var cell = row.appendChild(ce("th"));
    cell.rowSpan = OV.tab.tBodies[0].rows[0].rowSpan+1;
    cell.colSpan = 2;
    cell.innerHTML = texts[lib.lang].gui.sum;
    cell.style.textAlign = "right";
    cell.style.verticalAlign = "top";
    var r = 0;
    for( var key in sum ) {
      row = tfoot.appendChild(ce("tr"));
      cell = row.appendChild(ce("th"));
      cell.innerHTML = OV.tab.tBodies[0].rows[r].cells[r++==0?2:0].innerHTML;
      cell.style.textAlign = "right";
      cell.style.fontWeight = "normal";
      var rowSum  = 0;
      for( var unit in sum[key] ) {
        cell = row.appendChild(ce("th"));
        cell.style.textAlign = "right";
        cell.style.fontWeight = "normal";
        rowSum += sum[key][unit];
        cell.innerHTML = lib.formatNumber(sum[key][unit],true,true,2);
        cell.title = lib.formatNumber(sum[key][unit],true,false);
      }
      cell = row.appendChild(ce("th"));
      cell.style.textAlign = "right";
      cell.style.fontWeight = "normal";
      cell.innerHTML = lib.formatNumber(rowSum,true,true,2);
      cell.title = lib.formatNumber(rowSum,true,false);
    }
    row = tfoot.appendChild(ce("tr"));
    cell = row.appendChild(ce("th"));
    rowSum = 0;
    for( var i = 0; i < units.length; i++ ) {
      cell = row.appendChild(ce("th"));
      cell.style.textAlign = "right";
      cell.style.fontWeight = "normal";
      var colSum = sum.home[units[i]]+sum.away[units[i]]+sum.moving[units[i]];
      rowSum += colSum;
      cell.innerHTML = lib.formatNumber(colSum,true,true,2);
      cell.title = lib.formatNumber(colSum,true,false);
    }
    cell = row.appendChild(ce("th"));
    cell.style.textAlign = "right";
    cell.style.fontWeight = "normal";
    cell.innerHTML = lib.formatNumber(rowSum,true,true,2);
      cell.title = lib.formatNumber(rowSum,true,false);
    OV.updateDest();
  },
  doUnitsVillage : function() {
    var sum = [];
    for( var i = 0; i < serverInfo.unitAnz; i++ )
      sum[i] = 0;
    var off = OV.distCol+2;
    for( var i = 0; i < OV.tab.tBodies.length; i++ ) {
      OV.insertDistCol(OV.tab.tBodies[i].rows[0]);
      for( var col = off; col < serverInfo.unitAnz+off; col++ )
        sum[col-off] += parseInt(OV.tab.tBodies[i].rows[0].cells[col].textContent,10);
      OV.tab.tBodies[i].rows[0].cells[OV.distCol-1].setAttribute("dsfm_order", i);
      OV.insertHideCol(OV.tab.tBodies[i].rows[0],1);
    }
    OV.updateDest();
    //OV.tab.tHead.rows[0].cells[OV.distCol-1].innerHTML += " (" + OV.tab.tBodies.length + ")";
    
    var sorter = new TableSorter(OV.tab,"row_a","row_b",true);
    var col = OV.distCol-1;
    sorter.addSortColumn(col++, compareOrderCell, 1);
    sorter.addSortColumn(col++, RunTimes.compareDistCell,0);
    for( col++; col < OV.tab.rows[0].cells.length - 2; col++ )
      sorter.addSortColumn(col, compareNumericCell, 0);
     
    var tFoot = OV.tab.appendChild(ce("tfoot"));
    var row = tFoot.insertRow(-1);
    var cell = row.appendChild(ce("th"));
    cell.colSpan = OV.distCol + 2;
    cell.textContent = texts[lib.lang].gui.sum;
    for( var i = 0; i < sum.length; i++ )
      row.appendChild(ce("th")).textContent = sum[i];
    cell = row.appendChild(ce("th"));
    cell.colSpan = 2;
  },
  doUnitsDetail : function(type) {
    var tFoot = OV.tab.appendChild(ce("tfoot"));
    tFoot.appendChild(OV.tab.rows[OV.tab.rows.length-1]);
    tFoot.rows[0].cells[tFoot.rows[0].cells.length-1].colSpan++;
    var anz = serverInfo.unitAnz;
    if( serverInfo.unitInfo.militia )
      anz--;
    var sum = [];
    for( var i = 0; i < anz; i++ )
      sum[i] = 0;

    var off = OV.distCol+1;
    var sums = {};
    
    var coords;
    var count = 0;
    var vals = { villages: {}, players: {}, allys: {} };
    var own = false;
    for( var i = 0; i < OV.tab.tBodies[0].rows.length; i++ ) {
      var row = OV.tab.tBodies[0].rows[i];
      if( /units_away/.test(row.className) ) {
        row.cells[OV.distCol-1].setAttribute("dsfm_order",i);
        coords = row.cells[OV.distCol-1].innerHTML.match(/ \((\d+)\|(\d+)\) C\d+/);
        OV.insertDistCol(row,coords);
        count++;
        for( var j = i+1; j < OV.tab.tBodies[0].rows.length; j++ ) {
          if( /units_away/.test(OV.tab.tBodies[0].rows[j].className) )
            break;
        }
        OV.insertHideCol(OV.tab.tBodies[0].rows[i], j-i);
      }
      else {
        var a = row.cells[0].getElementsByTagName("a");
        var coords2 = row.cells[0].textContent.match(/ \((\d+)\|(\d+)\) C\d+/);
        vals.villages[coords2[1]+"|"+coords2[2]]=true;
        if( a.length == 1 )
          own = true;
        if( a.length > 1 )
          vals.players[a[1].textContent] = true;
        if( a.length > 2 )
          vals.allys[a[2].textContent] = a[1].title;
        //row.cells[OV.distCol-1].colSpan = 1;
        var cell = row.insertCell(1);
        var dist = Math.sqrt(Math.pow(coords[1] - coords2[1], 2) + Math.pow(coords[2] - coords2[2], 2));
        cell.innerHTML = Math.round(dist*100)/100;
        cell.style.textAlign = "right";
        RunTimes.createToolTip(cell,dist);
        for( var c = off; c < off+anz; c++ )
          sum[c-off] += parseInt(row.cells[c].textContent,10);
      }
    }
    OV.updateDest();
    
    for( var key in vals ) {
      var arr = [];
      for( var key2 in vals[key] )
        arr.push(key2);
      arr.sort();
      vals[key] = arr;
    }
    
    var tab = OV.tab.parentNode.insertBefore(ce("table"),OV.tab);
    var row = tab.insertRow(-1);
    var cell = row.insertCell(-1);
    cell.innerHTML = texts[lib.lang].gui[type];
    var typeSel = cell.appendChild(ce("select"));
    typeSel.id = "dsfm_filter_type";
    //sake-->
    //typeSel.options[0] = new Option(texts[lib.lang].gui.all_detail,"all",true,false);
    //typeSel.options[1] = new Option(texts[lib.lang].gui.village,"villages",true,false);
    //typeSel.options[2] = new Option(texts[lib.lang].gui.ovlPlayer,"players",true,false);
    //typeSel.options[3] = new Option(texts[lib.lang].gui.ovlAlly,"allys",true,false);
    //if( own )
    //  typeSel.options[4] = new Option(texts[lib.lang].gui.ownVillage,"own",true,false);
    typeSel.options.add( new Option(texts[lib.lang].gui.all_detail,"all",true,false) );
    typeSel.options.add( new Option(texts[lib.lang].gui.village,"villages",true,false) );
    typeSel.options.add( new Option(texts[lib.lang].gui.ovlPlayer,"players",true,false) );
    typeSel.options.add( new Option(texts[lib.lang].gui.ovlAlly,"allys",true,false) );
    if( own )
      typeSel.options.add( new Option(texts[lib.lang].gui.ownVillage,"own",true,false) );
    //sake<--
    var valSel = cell.appendChild(ce("select"));
    valSel.style.display = "none";
    valSel.id = "dsfm_filter_value";
    var onTypeChange = function() {
        valSel.options.length = 0;
        valSel.style.display = typeSel.value == "own" || typeSel.value == "all" ? "none" : "";
        if( valSel.style.display == "" ) {
          //sake-->
          //for( var i = 0; i < vals[typeSel.value].length; i++ )
          //  valSel.options[i] = new Option(vals[typeSel.value][i], i, true, false);
          for( var i = 0; i < vals[typeSel.value].length; i++ )
            valSel.options.add( new Option(vals[typeSel.value][i], i, true, false) );
          //sake<--
        }
      }
    typeSel.addEventListener("change", onTypeChange, false);
    
    var btn = cell.appendChild(ce("input"));
    btn.type = "button";
    btn.id = "dsfm_filterbtn";
    btn.value = texts[lib.lang].gui.filterBtn;
    btn.addEventListener("click", OV.filterDetail,false);
    
    var chk = $("all");
    chk.setAttribute("onclick","");
    chk.addEventListener("click", function() {
        var chks = OV.tab.getElementsByClassName("village_checkbox");
        for( var i = 0; i < chks.length; i++ ) {
          var row = getByTagName(chks[i],"tr","parentNode");
          if( row.style.display == "none" )
            chks[i].checked = false;
          else
            chks[i].checked = this.checked;
        }
      }, false);
    
    var sorter = new TableSorter(OV.tab,"","",false,function(row){return /units_away/.test(row.className);});    
    var col = OV.distCol-1;
    sorter.addSortColumn(col++, compareOrderCell, 1);
    sorter.addSortColumn(col++, RunTimes.compareDistCell,0);
    for( col++; col < OV.tab.rows[0].cells.length - 2; col++ )
      sorter.addSortColumn(col, compareNumericCell, 0);
     
    var row = tFoot.insertRow(0);
    var cell = row.appendChild(ce("th"));
    cell.colSpan = OV.distCol + 2;
    cell.textContent = texts[lib.lang].gui.sum;
    for( var i = 0; i < sum.length; i++ ) {
      var cell = row.appendChild(ce("th"));
      cell.innerHTML = lib.formatNumber(sum[i],true,true,2);
      cell.title = lib.formatNumber(sum[i],true,false,0);
      cell.style.whiteSpace="nowrap";
    }
    cell = row.appendChild(ce("th"));
    cell.colSpan = 2;
  },
  doIncs : function(type) {
    //HS _ DÜ 001-->
    //var tab = document.getElementsByClassName("modemenu")[2];
    var tab = document.getElementsByClassName("modemenu")[1]; //Angriffstabelle
    //HS _ DÜ 001<--
    if ( tab ) { //HS _ DÜ 001
      var selected = tab.getElementsByClassName("selected")[0];
      var subtype = selected.innerHTML.match(/subtype=([^"]+)"/)[1];
      cmds = lib.storage.getValue("commands"+ownPid,{});
      var nav = $("paged_view_content").getElementsByClassName("paged-nav-item");
      var page = 0;
      if( nav.length > 0 ) {
        var page = parseInt(nav[0].parentNode.innerHTML.match( /&gt;([^&]*)&lt;/ )[1],10);
        if( isNaN(page) )
          page = 1;
      }
      if( nav.length == 0 || page == 1 ) {
        for( var key in cmds ) {
          switch(subtype) {
            case "all":
              cmds[key].incs = [];
              cmds[key].supports = [];
              break;
            case "attacks":
              cmds[key].incs = [];
              break;
            case "supports":
              cmds[key].supports = [];
              break;
          }
        }
      }
    };//HS _ DÜ 001
    if( OV.tab ) {
      for( var arrivalCol = 0; arrivalCol < OV.tab.rows[0].cells.length; arrivalCol++ ) {
        if( texts[lib.lang].regex.arrivalTitle.test(OV.tab.rows[0].cells[arrivalCol].textContent) )
          break;
      }
      for( var i = 1; i < OV.tab.rows.length; i++ ) {
        var a = OV.tab.rows[i].cells[0].getElementsByTagName("a");
        var target = OV.tab.rows[i].cells[1].textContent.match(texts[lib.lang].regex.villageLink);
        if( a && target ) {
          var key = target[1]+"_"+target[2];
          if( !cmds[key] )
            cmds[key] = { attacks:[], supports:[], incs:[] };
          var type = a[0].className.match(/([^-]*)-icon/)[1];
          var arrivalTime = texts[lib.lang].locale.timeStr2Sec(OV.tab.rows[i].cells[arrivalCol].textContent);
          switch(type) {
            case "attack":
              cmds[key].incs.push(arrivalTime);
              break;
            case "support":
              cmds[key].supports.push(arrivalTime);
              break;
          }
        }
        
      }
    }
    lib.storage.setValue("commands"+ownPid,cmds);
  },
  filterDetail : function() {
    var type = $("dsfm_filter_type").value;
    var val = $("dsfm_filter_value");
    if( val.selectedIndex > -1 )
      val = val.options[val.selectedIndex].text;
    else
      val = "";
    var blocks = OV.tab.getElementsByClassName("units_away");
    var shown = 0;

    var anz = serverInfo.unitAnz;
    if( serverInfo.unitInfo.militia )
      anz--;
    var sum = [];
    for( var i = 0; i < anz; i++ )
      sum[i] = 0;

    var off = OV.distCol+1;
    var sums = {};

    var addUnits = function(row) {
      for( var c = off; c < off+anz; c++ )
        sum[c-off] += parseInt(row.cells[c].textContent,10);
    }

    for( var i = 0; i < blocks.length; i++ ) {
      var start = blocks[i].rowIndex; 
      var end = i == blocks.length-1 ? OV.tab.rows[i].length : blocks[i+1].rowIndex;
      var disp = "none";
      switch( type ) {
        case "all":
          disp = "";
          for( var j = start; j < end; j++ ) {
            OV.tab.rows[j].style.display = "";
            addUnits(OV.tab.rows[j]);
          }
          break;
        case "villages":
          for( var j = start + 1; j < end; j++ ) {
            var coords = OV.tab.rows[j].cells[0].textContent.match(/ \((\d+)\|(\d+)\) C\d+/);
            if( coords ) {
              if( coords[1]+"|"+coords[2] == val ) {
                disp = "";
                OV.tab.rows[j].style.display = "";
                addUnits(OV.tab.rows[j]);
              }
              else
                OV.tab.rows[j].style.display = "none";
            }
            else
              OV.tab.rows[j].style.display = "none";
          }
          break;
        case "players":
          for( var j = start + 1; j < end; j++ ) {
            var a = OV.tab.rows[j].cells[0].getElementsByTagName("a");
            if( a.length > 1 ) {
              if( a[1].textContent == val ) {
                disp = "";
                OV.tab.rows[j].style.display = "";                              
                addUnits(OV.tab.rows[j]);
              }
              else
                OV.tab.rows[j].style.display = "none";
            }
            else
              OV.tab.rows[j].style.display = "none";
          }
          break;
        case "allys": 
          for( var j = start + 1; j < end; j++ ) {
            var a = OV.tab.rows[j].cells[0].getElementsByTagName("a");
            if( a.length > 2 ) {
              if( a[2].textContent == val ) {
                disp = "";
                OV.tab.rows[j].style.display = "";                              
                addUnits(OV.tab.rows[j]);
              }
              else
                OV.tab.rows[j].style.display = "none";
            }
            else
              OV.tab.rows[j].style.display = "none";
          }
          break;
        case "own":
          for( var j = start + 1; j < end; j++ ) {
            var a = OV.tab.rows[j].cells[0].getElementsByTagName("a");
            if( a.length == 1 ) {
              disp = "";
              OV.tab.rows[j].style.display = "";                              
              addUnits(OV.tab.rows[j]);
            }
            else
              OV.tab.rows[j].style.display = "none";
          }
          break;
      }
      if( disp == "" ) shown++;
      OV.tab.rows[start].style.display = disp;
    }
    
    var row = OV.tab.tFoot.rows[0];
    for( var i = 0; i < sum.length; i++ ) {
      row.cells[i+1].innerHTML = lib.formatNumber(sum[i],true,true,2);
      row.cells[i+1].title = lib.formatNumber(sum[i],true,false,0);
    }
    
    OV.tab.rows[0].cells[0].removeChild(OV.tab.rows[0].cells[0].firstChild);
    OV.tab.rows[0].cells[0].insertBefore(document.createTextNode(texts[lib.lang].gui.village + " ("+shown+") "),OV.tab.rows[0].cells[0].firstChild);
  },
  addRunTimeFilter: function() {
    var filterVals = lib.storage.getValue("unitFilter"+ownPid,{day:"",month:"",from:"",to:"",speed:0});
    var tab = $("dsfm_controls");
    var row = tab.insertRow(-1);
    row.id = "dsfm_timeFilter";
    var cell = row.appendChild(ce("th"));
    cell.textContent = texts[lib.lang].gui.timespan[0];
    cell = row.insertCell(-1);
    cell.colSpan = 3;
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.timespan[1]));
    
    var input = cell.appendChild(ce("input"));
    input.type = "text";
    input.size = 2;
    input.id="dsfm_filterDay";
    input.value = filterVals.day;
    
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.timespan[2]));
    input = cell.appendChild(ce("input"));
    input.type = "text";
    input.size = 2;
    input.id="dsfm_filterMonth";
    if( !isNaN(parseInt(filterVals.month)) )
      input.value = filterVals.month+1;
    
    cell.appendChild(document.createTextNode(texts[lib.lang].gui.timespan[3]));
    input = cell.appendChild(ce("input"));
    input.type = "text";
    input.size = 2;
    input.id="dsfm_filterFrom";
    input.value = filterVals.from;

    cell.appendChild(document.createTextNode(texts[lib.lang].gui.timespan[4]));
    input = cell.appendChild(ce("input"));
    input.type = "text";
    input.size = 2;
    input.id="dsfm_filterTo";
    input.value = filterVals.to;

    cell.appendChild(document.createTextNode(texts[lib.lang].gui.timespan[5]));
    var select = cell.appendChild(ce("select"));
    select.size = 1;
    select.id = "dsfm_filterSpeed";
    
    row = OV.tab.tHead.insertRow(-1);
    row.className = "nowrap";
    row.id = "dsfm_unitFilter";
    cell = row.insertCell(-1);
    cell.colSpan = OV.distCol + 2;
    cell.textContent = texts[lib.lang].gui.unitFilter;
    var i = 0;
    for( var key in serverInfo.unitInfo ) {
      var speed = Math.round(serverInfo.unitInfo[key].speed);
      //sake-->
      //if( speed > 0 )
      //  select.options[i++] = new Option(texts[lib.lang].units[key] + " ("+speed+")",speed,true,false);
      if( speed > 0 )
        select.options.add( new Option(texts[lib.lang].units[key] + " ("+speed+")",speed,true,false) );
      //sake<--
      cell = row.insertCell(-1);
      input = cell.appendChild(ce("input"));
      input.type = "text";
      input.size = 4;
      input.name = key;
      if( filterVals[key] )
        input.value = filterVals[key]
    }
    select.selectedIndex = filterVals.speed;
    
    cell = row.insertCell(-1);
    cell.colSpan = 2;
    input = cell.appendChild(ce("input"));
    input.type = "button";
    input.value = texts[lib.lang].gui.filterBtn;
    input.addEventListener("click", OV.filterUnits, false);

    input = cell.appendChild(ce("input"));
    input.type = "button";
    input.value = "X"
    input.id = "dsfm_clearfilter";
    input.addEventListener("click", OV.clearFilter, false);
  },
  filterUnits : function() {
    var filterVals = {day:"", month:"", from:"", to:"", speed:0};
    var date = new Date(lib.getTime()*1000);
    var day = parseInt($("dsfm_filterDay").value,10);
    var noDate = false;
    var noTime = false;
    if( isNaN(day) ) {
      day = date.getDate();
      noDate = true;
    }
    else
      filterVals.day = day;

    var month = parseInt($("dsfm_filterMonth").value,10)-1;
    if( isNaN(month) || month < 0 || month > 11 )
      month = date.getUTCMonth();
    else
      filterVals.month = month;
    var year = date.getUTCFullYear();
    if( month < date.getUTCMonth() )
      year++;
    var from = parseInt($("dsfm_filterFrom").value,10);
    if( isNaN(from) || from < 0 || from > 23 ) {
      from = 0;
      noTime = true;
    }
    else
      filterVals.from = from;
    var to = parseInt($("dsfm_filterTo").value,10);
    if( isNaN(to) || to < 0 || to  > 23 )
      to = 23;
    else
      filterVals.to = to;
    var select = $("dsfm_filterSpeed");
    filterVals.speed = select.selectedIndex;
    var speed = parseInt(select.value,10);
    var inputs = $("dsfm_unitFilter").getElementsByTagName("input");
    var units = [];
    for( var i = 0; i < inputs.length - 1; i++ ) {
      var val = parseInt(inputs[i].value,10);
      if( isNaN(val) ) {
        val = 0;
        filterVals[inputs[i].name] = "";
      }
      else
        filterVals[inputs[i].name] = val;
      units.push(val);
    }
    var distMin = 0;
    var distMax = 9999;
    if( !noDate || !noTime ) {
      var arrivalFrom = new Date();
      arrivalFrom.setUTCFullYear(year);
      arrivalFrom.setUTCMonth(month);
      arrivalFrom.setUTCDate(day);
      arrivalFrom.setUTCHours(from);
      arrivalFrom.setUTCMinutes(0);
      arrivalFrom.setUTCSeconds(0);
      var arrivalTo = new Date(year, month, day, to, 0);
      arrivalTo.setUTCFullYear(year);
      arrivalTo.setUTCMonth(month);
      arrivalTo.setUTCDate(day);
      arrivalTo.setUTCHours(to);
      arrivalTo.setUTCMinutes(0);
      arrivalTo.setUTCSeconds(0);
      if( to < from )
        arrivalTo = new Date( arrivalTo.getTime()+86400000 );
      distMin = (arrivalFrom.getTime() - date.getTime()) / (speed*60000);
      distMax = (arrivalTo.getTime() - date.getTime()) / (speed*60000);
      if( distMin < 0 )
        distMin = 0;
    }
    lib.storage.setValue("unitFilter"+ownPid,filterVals);
    var col = OV.distCol + 2;
    var b = OV.tab.tBodies;
    var ts = date.getTime();
    var shown = 0;
    for( var i = 0; i < b.length; i++ ) {
      var dist = parseFloat(b[i].rows[0].cells[OV.distCol].getAttribute("dist"));
      var show = true;
      if( dist < distMin || dist > distMax )
        show = false;
      else {
        for( var j = 0; j < serverInfo.unitAnz; j++ ) {
          var val = parseInt(b[i].rows[0].cells[j+col].textContent,10);
          if( val < units[j] ) {
            show = false;
            break;
          }
        }
      }
      if( show ) {
        shown++;
        b[i].style.display = "";
        b[i].rows[0].cells[OV.distCol].innerHTML = "";
        var a = b[i].rows[0].cells[OV.distCol].appendChild(ce("a"));
        var id = b[i].rows[0].cells[OV.distCol-1].innerHTML.match(/village=(\d+)/)[1];
        var dst = lib.storage.getValue("dst"+ownPid,"|").split("|");
        a.href = lib.createLink("place","mode","command", "x", dst[0], "y", dst[1], false).replace(/village=(\d+)/,"village="+id);
        a.textContent = texts[lib.lang].locale.date2timeStr(new Date(ts + speed * dist * 60000),true,true);
        b[i].rows[0].cells[b[i].rows[0].cells.length-2].firstChild.href += "&x="+dst[0]+"&y="+dst[1];
      }
      else
        b[i].style.display = "none";
    }
    OV.updateCount(shown);
    //alert(shown);
    OV.updateTimer = setInterval(OV.updateArrival,1000);
  },
  clearFilter : function() {
    clearInterval(OV.updateTimer);
    for( var i = 0; i < OV.tab.tBodies.length; i++ ) {
      OV.tab.tBodies[i].style.display=""; 
      var dist = OV.tab.tBodies[i].rows[0].cells[OV.distCol].getAttribute("dist");
      OV.tab.tBodies[i].rows[0].cells[OV.distCol].innerHTML = parseInt(dist*100)/100;
    }
    OV.updateCount(OV.tab.tBodies.length);
  },
  insertHideHead : function() {
    var cell = OV.tab.tHead.rows[0].appendChild(ce("th"));
    cell.innerHTML = '<span style="font-weight:bold; color:red;">X</span> ';
    var span = cell.appendChild(ce("span"));
    span.style.cursor="pointer";
    span.addEventListener("click", function(e) { var row = OV.tab.tHead.rows[0]; var cell = row.cells[row.cells.length-1]; var res = cell.lastChild.innerHTML.match(/\((\d+)\)/); if( res && res[1] > 0 ) OV.ctxMenu.show(e.pageX,e.pageY,texts[lib.lang].gui.showRow); }, false );
    OV.ctxMenu = new ContextMenu("dsfm_hiddenRows",OV.ctxCallBack);
  },
  insertHideCol : function(row,rowspan) {
    var cell = row.insertCell(-1);
    cell.rowSpan = rowspan;
    cell.style.verticalAlign = "top";
    var a = cell.appendChild(ce("a"));
    a.href = "javascript:;";
    a.innerHTML = "X";
    a.style.fontWeigth = "bold";
    a.style.color = "red";
    a.addEventListener("click", OV.onHideRows, false );
  },
  insertDistCol : function(row,coords) {
    var cell = row.insertCell(OV.distCol);
    cell.innerHTML = "---";
    cell.style.textAlign = "right";
    cell.style.verticalAlign = "top";
    cell.rowSpan = row.cells[0].rowSpan;
    if( !coords )
      coords = row.cells[OV.distCol-1].innerHTML.match(/ \((\d+)\|(\d+)\) C\d+</);
    if( coords ) {
      row.cells[OV.distCol-1].setAttribute("coords",coords[1]+"_"+coords[2]);
      RunTimes.createToolTip(cell);
    }
    return cell;
  },
  showRows : function(cell,show) {
    var row = cell.parentNode;
    var off = row.rowIndex;
    var count = cell.rowSpan;
    if( off > 1 && OV.tab.rows[off-1].cells[0].rowSpan == cell.rowSpan + 1 ) {
      off--;
      count++;
    }
    for( var i = 0; i < count; i++ )
      OV.tab.rows[off+i].style.display = show ? "" : "none";

    row = OV.tab.tHead.rows[0];
    head = row.cells[row.cells.length-1].lastChild;
    var hidden = head.innerHTML.match(/\((\d+)\)/);
    if(hidden)
      hidden = hidden[1];
    else
      hidden = 0;
    if( show )
      hidden--;
    else
      hidden++;
    if( hidden > 0 )
      head.innerHTML = "("+hidden+")";
    else
      head.innerHTML = "";
  },
  onHideRows : function(e) {
    OV.showRows(this.parentNode,false);
    var cell = this.parentNode;
    var row = cell.parentNode;
    var col = OV.distCol-1;
    var id = row.cells[col].innerHTML.match(/village=(\d+)/);
    var text = "";
    if( id === null ) {
      id = OV.tab.rows[row.rowIndex-1].cells[col].innerHTML.match(/village=(\d+)/);
      text = OV.tab.rows[row.rowIndex-1].cells[col].textContent;
    }
    else
      text = row.cells[col].textContent;
    id = id[1];
    OV.ctxMenu.addMenuItem( { id: id, text: text, cell: cell } );
  },
  ctxCallBack : function(id,type) {
    if( type == "click" ) {
      var data = arguments[2];
      OV.ctxMenu.removeMenuItem(data.id);
      OV.showRows(data.cell,true);
    }
  },
  saveOrder : function() {
    if( OV.tab ) {
      var list = [];
      for( var i = 1; i < OV.tab.rows.length; i++ ) {
        if( OV.tab.rows[i].style.display != "none" && OV.tab.rows[i].parentNode.style.display != "none" ) {
          village = OV.tab.rows[i].cells[OV.distCol-1].innerHTML.match(/village=(\d+)/);
          if( village )
            list.push(parseInt(village[1]));
        }
      }
      lib.storage.setValue("villageorder"+ownPid,list);
      Common.modNav();
    }
  },
  updateDest : function() {
    var btn = $("clearFilter");
    if( btn )
      OV.clearFilter();
    var xInput = $("dsfm_dst_x");
    var yInput = $("dsfm_dst_y");

    if( xInput.value.indexOf("|") > -1 ) {
      var coords = xInput.value.split("|");
      xInput.value = coords[0];
      yInput.value = coords[1];
    }
    if( xInput.value.length == 3 && yInput.value.length == 0 ) {
      yInput.focus();
      yInput.select();
    }
    var x = parseInt(xInput.value);
    var y = parseInt(yInput.value);

    var valid = !isNaN(x) && x >= 0 && x <= 999 && !isNaN(y) && y >= 0 && y <= 999;
    lib.storage.setValue("dst"+ownPid, valid ? (x + "|" + y) : "|" );

    var tBodies = OV.tab.tBodies.length;
    var step = 1;
    if( tBodies > 1 )
      step = OV.tab.tBodies[0].rows.length;
    var unitsAway = lib.params.type == "away_detail";
    for( var i = 1; i < OV.tab.rows.length; i+=step ) {
      var coords = OV.tab.rows[i].cells[OV.distCol-1].getAttribute("coords");
      if( coords ) {
        coords = coords.split("_");
        cell = OV.tab.rows[i].cells[OV.distCol];
        var dist = Math.sqrt(Math.pow(coords[0] - x, 2) + Math.pow(coords[1] - y, 2));
        if( valid ) {
          cell.innerHTML = Math.round(dist*100)/100;
          cell.setAttribute('dist', dist);
          cell.style.cursor = "default";
          if( !cell.rttt )
            RunTimes.createToolTip(cell);
        }
        else {
          cell.innerHTML = '<span class="grey">---</span>';
          cell.setAttribute('dist', '');
          cell.style.cursor = "";
        }
      }
    }
  },
  updateArrival : function() {
    var speed = $("dsfm_filterSpeed").value;
    var ts = lib.getTime()*1000;
    for( var i = 0; i < OV.tab.tBodies.length; i++ ) {
      if( OV.tab.tBodies[i].style.display == "" ) {
        var dist = OV.tab.tBodies[i].rows[0].cells[OV.distCol].getAttribute("dist");
        OV.tab.tBodies[i].rows[0].cells[OV.distCol].firstChild.textContent = texts[lib.lang].locale.date2timeStr(new Date(ts + speed * dist * 60000),true,true);
      }
    }
  },
  compareProdCell : function(a,b) {
    return compare(OV.getMaxTime(a),OV.getMaxTime(b));
  },
  getMaxTime : function(cell) {
    var maxTime = 0;
    var time = 0;
    switch( Settings.settings.prod.shrinkRecruitmentMode ) {
      case 0:
      case 1:
      case 2:
        var imgs = cell.getElementsByTagName("img");
        if( imgs && imgs.length > 0 ) {
          for( var i = 0; i < imgs.length; i++ ) {
            time = imgs[i].title;
            time = time.substr(time.indexOf(" - ")+3);
            time = texts[lib.lang].locale.timeStr2Sec(time);
            if( time > maxTime )
              maxTime = time;
          }
        }
        break;
      case 3:
        maxTime = texts[lib.lang].locale.parseDuration(cell.textContent);
        break;
      case 4:
        maxTime = texts[lib.lang].locale.timeStr2Sec(cell.textContent);
        break;
    }
    return maxTime;
  },
  compareCombinedProdCell : function(a,b) {
    var prodImg = ["impossible","avail","running","finish"];
    var aImg = a.getElementsByTagName("a")[0];
    var bImg = b.getElementsByTagName("a")[0]
    var aVal = prodImg.indexOf(aImg.className);
    var bVal = prodImg.indexOf(bImg.className);
    var dif = aVal-bVal;
    if( dif == 0 && aVal == 2 ) {
      var idx = aImg.title.indexOf(" - ");
      if( idx > -1 ) {
        aTime = texts[lib.lang].locale.timeStr2Sec(aImg.title.substr(idx+3));
        bTime = texts[lib.lang].locale.timeStr2Sec(bImg.title.substr(bImg.title.indexOf(" - ")+3));
        dif = aTime - bTime;
      }
    }
    return dif;
  },
  filterTech : function() {
    var count = OV.tab.rows[0].cells.length - 3;
    for( var i = 1; i < OV.tab.rows.length; i++ ) {
      var e = OV.tab.rows[i].getElementsByClassName("rtt green");
      if( e.length == count )
        OV.tab.rows[i].style.display = this.checked ? "none" : "";
      else
        OV.tab.rows[i].style.display = "";
    }
  }
}
var InfoPlayer = {
  sorter : null,
  tab : null,
  doIt : function() {
    if( lib.params.screen == "info_player" ) {
      InfoPlayer.tab = $("content_value").getElementsByClassName("vis")[1];
      var coords = [];
      if( InfoPlayer.tab ) {
        var idx = InfoPlayer.tab.rows.length-1;
        if( InfoPlayer.tab.rows[idx].cells[0].colSpan > 1 ) {
          InfoPlayer.tab.appendChild(ce("tfoot")).appendChild(InfoPlayer.tab.rows[idx]);
          InfoPlayer.tab.rows[idx].getElementsByTagName("a")[0].addEventListener("click", function() { InfoPlayer.tab.addEventListener("DOMNodeInserted",InfoPlayer.villageTabExtented,false); }, false); 
        }
        InfoPlayer.sorter = new TableSorter(InfoPlayer.tab);
        InfoPlayer.sorter.addSortColumn(0,compareStringCell,1);
        InfoPlayer.sorter.addSortColumn(1,RunTimes.compareDistCell);
        InfoPlayer.sorter.addSortColumn(2,compareNumericCell);
        RunTimes.convertCoordCol(InfoPlayer.tab,1);
      }
    }
  },
  villageTabExtented : function(e) {
    if( e.target.nodeName == "TR" ) {
      RunTimes.convertCoordCell(e.target,1);
      var a = e.target.cells[0].getElementsByTagName("a")[0];
      var id = a.href.match(/info_village&id=(\d+)/)[1];
      if( Settings.settings.misc.privateNames ) {
        PrivateVillageName.makeEditable(a,id);
        PrivateVillageName.modVillageLink(a,id);
      }
      if( e.target.rowIndex == lib.game_data.player.villages ) {
        InfoPlayer.tab.removeEventListener("DOMNodeInserted",InfoPlayer.villageTabExtented,false)
        InfoPlayer.sorter.reloadRows();
      }
    }
  },
}
var Common = {
  contextMenuOwn : null,
  contextMenuOther : null,
  lastVillage: null,
  doIt : function() {
    Common.createContextMenus();
    Common.modNav();
    Common.modGroupList();
    Common.lastVillage = lib.storage.getValue("lastVillage"+ownPid,[curVillage.id,lib.params.screen,curVillage.id,lib.params.screen]);
    if( curVillage.id != Common.lastVillage[0] ) {
      Common.lastVillage[2] = Common.lastVillage[0];
      Common.lastVillage[3] = Common.lastVillage[1];
      Common.lastVillage[0] = curVillage.id;
    }
    Common.lastVillage[1] = lib.params.screen;
    HotKeys.add( "common","lastVillage",lib.createLink(Common.lastVillage[3],false).replace(/village=[jnp]?\d+/,"village="+Common.lastVillage[2]));
    lib.storage.setValue("lastVillage"+ownPid,Common.lastVillage);
  },
  modGroupList : function() {
    if( Settings.settings.misc.modGroupPopup ) {
    }
  },
  modNav : function() {
    var row = $("menu_row2");
    var a = $("menu_map_link");
    if( curVillage.map.timestamp > 0 ) {
      if( lib.params.screen != "map" && Settings.settings.map.rememberPos )
        a.href += "&x=" + curVillage.map.x + "&y=" + curVillage.map.y;
    }
    if( Settings.settings.misc.useHotKeys ) {
      HotKeys.add( "common", "map", a.href );
      HotKeys.add( "common", "place", lib.createLink( "place", true ) );
      HotKeys.add( "common", "market", lib.createLink( "market", true ) );
    }
    var list = lib.storage.getValue("villageorder"+ownPid);
    var href = "";
    if( list ) {
      while( /arrowCell/.test(row.cells[1].className) ) {
        if( href == "" ) {
          a = row.cells[1].getElementsByTagName("a");
          if( a.length > 0 )
            href = a[0].href;
        }
        row.deleteCell(1);
      }
      var jump = false;
      var next = 0;
      var prev = list.length-1;
      for( var i = 0 ; i < list.length; i++ ) {
        if( list[i] == curVillage.id ) {
          prev = i == 0 ? list.length-1 : i - 1;
          next = i == list.length-1 ? 0 : i + 1;
          break;
        }
      }
      jump = i == list.length;

      i = 1;
      var cell = row.insertCell(i++);
      cell.className = "icon-box arrowCell";
      var a = cell.appendChild(ce("a"));
      a.href = "javascript:;";
      a.innerHTML = " X ";
      a.style.fontWeight = "bold";
      a.style.color = "red";
      a.alt = texts[lib.lang].gui.resetVillageOrder;
      a.title = texts[lib.lang].gui.resetVillageOrder;
      a.addEventListener("click", function() { lib.storage.deleteValue("villageorder"+ownPid); document.location.reload(); }, false );
      
      if( jump ) {
        cell = row.insertCell(i++);
        cell.className = "icon-box arrowCell";
        a = cell.appendChild(ce("a"));
        a.href = href.replace(/village=[pnj]?\d+/,"village="+list[0]);
        a.title = texts[lib.lang].gui.gotoFirstGroupVillage;
        a.className = "jump_link";
        div = a.appendChild(ce("span"));
        div.className = "groupJump";
      }
      cell = row.insertCell(i++);
      cell.className = "icon-box arrowCell";
      a = cell.appendChild(ce("a"));
      a.accessKey = "a";
      a.href = href.replace(/village=[pnj]?\d+/,"village="+list[prev]);
      a.className = "village_switch_link";
      div = a.appendChild(ce("span"));
      div.className = "arrowLeft";
      
      cell = row.insertCell(i++);
      cell.className = "icon-box arrowCell";
      a = cell.appendChild(ce("a"));
      a.accessKey = "d";
      a.href = href.replace(/village=[pnj]?\d+/,"village="+list[next]);
      a.className = "village_switch_link";
      div = a.appendChild(ce("span"));
      div.className = "arrowRight";
    }
    if( Settings.settings.misc.useHotKeys ) {
      var a = row.getElementsByTagName("a");
      for( var j = 0; j < a.length; j++ ) {
        if( a[j].accessKey == "a" )
          HotKeys.add( "common", "prevVillage", a[j].href );
        else if( a[j].accessKey == "d" )
          HotKeys.add( "common", "nextVillage", a[j].href );
      }
    }
  },
  contextCallBack : function(id,type) {
    switch( type ) {
      case "modHref":
        var href = "";
        var itemid = arguments[2].id;
        var data = arguments[3];
        switch( itemid ) {
          case "info_village":
            return lib.createLink(itemid,"id",data.id,false);
          case "overview":
          case "main":
          case "train":
          case "place":
          case "market":
          case "snob":
            return lib.createLink(itemid,false).replace("village="+curVillage.id,"village="+data.id);
          case "redir_sendunits":
            return lib.createLink("place","mode","command","target",data.id,false);
          case "redir_getunits":
            return lib.createLink("place","mode","command","target",curVillage.id, false).replace("village="+curVillage.id,"village="+data.id);
          case "sendres":
            return lib.createLink("market","mode","send","target",data.id, false);
          case "getress":
            return lib.createLink("market","mode","send","target",curVillage.id, false).replace("village="+curVillage.id,"village="+data.id);
          case "center":
            return lib.createLink("map","x",data.x,"y",data.y, false);
          case "selectvillage":
            return location.href.replace(/village=\d+/,"village="+data.id);
        }
        return "";
      case "click":
        break;
      case "show":
        var event = arguments[2];
        var el = event.target;
        while( el && el.nodeName.toUpperCase() != "A" )
          el = el.parentNode;
        if( el ) {
          if(id == "dsfm_ctxOwn") {
            var p = lib.parseParams(el.href);
            var jsSelector = el.href.match(/selectVillage\((\d+)/);
            if( jsSelector || p.screen == "overview" || p.screen == "info_village" ) {
              if( jsSelector ) {
                $("group_popup_menu").style.zIndex = 1000;
                $("group_popup").style.zIndex = 1000;
              }
              var vid = jsSelector ? jsSelector[1] : p.get("id",0)>0 ? p.id : p.village;
              var coords = el.textContent.match(/\((\d{1,3})\|(\d{1,3})\) C\d+/);
              if( !coords && el.parentNode && el.parentNode.nodeName.toUpperCase() == "TD" ) {
                el = el.parentNode.parentNode.cells[el.parentNode.cellIndex+1];
                do {
                  coords = el.textContent.match(/(\d{1,3})\|(\d{1,3})/);
                  el = el.parentNode.cells[el.cellIndex+1];
                } while( el && coords == null)
              }
              if( coords )
                return { title: coords[1]+"|"+coords[2], data: { id: vid, x: coords[1], y: coords[2] } };
            }
          }
        }
        break;
    }
  },
  createContextMenus : function() {
    Common.contextMenuOwn = new ContextMenu("dsfm_ctxOwn",Common.contextCallBack);
    Common.contextMenuOwn.addMenuItem({ text: texts[lib.lang].gui.overview, id: "overview" });
    Common.contextMenuOwn.addMenuItem({ text: texts[lib.lang].gui.redir_villageinfo, id: "info_village" });
    Common.contextMenuOwn.addMenuItem({ icon: "graphic/map_center.png", text: texts[lib.lang].gui.redir_centermap, id: "center" });
    Common.contextMenuOwn.addMenuItem({ icon: "graphic/command/attack.png", text: texts[lib.lang].gui.redir_sendunits, id: "redir_sendunits" });
    Common.contextMenuOwn.addMenuItem({ icon: "graphic/command/return.png", text: texts[lib.lang].gui.redir_getunits, id: "redir_getunits" });
    Common.contextMenuOwn.addMenuItem({ icon: "graphic/buildings/market.png", text: texts[lib.lang].gui.redir_market, id: "sendres" });
    Common.contextMenuOwn.addMenuItem({ icon: "graphic/buildings/market.png", text: texts[lib.lang].gui.redir_getress, id: "getress" });
    Common.contextMenuOwn.addMenuItem({ text: texts[lib.lang].gui.redir_selectvillage, id: "selectvillage" });
    Common.contextMenuOwn.addMenuItem({ text: texts[lib.lang].gui.buildings });
    Common.contextMenuOwn.addMenuItem({ icon: "graphic/buildings/main.png", text: texts[lib.lang].buildings.main, id: "main" });
    Common.contextMenuOwn.addMenuItem({ icon: "graphic/buildings/barracks.png", text: texts[lib.lang].gui.recruitment, id: "train" });
    Common.contextMenuOwn.addMenuItem({ icon: "graphic/buildings/place.png", text: texts[lib.lang].buildings.place, id: "place" });
    Common.contextMenuOwn.addMenuItem({ icon: "graphic/buildings/market.png", text: texts[lib.lang].buildings.market, id: "market" });
    Common.contextMenuOwn.addMenuItem({ icon: "graphic/buildings/snob.png", text: texts[lib.lang].buildings.snob, id: "snob" });
    Common.contextMenuOther = new ContextMenu("dsfm_ctxOther",Common.contextCallBack);
    Common.contextMenuOther.addMenuItem({ text: texts[lib.lang].gui.redir_villageinfo, id: "info_village" });
    Common.contextMenuOther.addMenuItem({ icon: "graphic/map_center.png", text: texts[lib.lang].gui.redir_centermap, id: "center" });
    Common.contextMenuOther.addMenuItem({ icon: "graphic/command/attack.png", text: texts[lib.lang].gui.redir_sendunits, id: "redir_sendunits" });
    Common.contextMenuOther.addMenuItem({ icon: "graphic/buildings/market.png", text: texts[lib.lang].gui.redir_market, id: "sendres" });
  },
}
/** var Groups = {
/* Was macht diese Funktion?
*/
var Groups = {
  actionValue : null,
  ctxMenu : null,
  ctxSelectData : [],
  doIt : function() {
    if( lib.params.screen == "overview" ) 
      Groups.modGroupTable("edit");
    if( lib.params.screen == "main" || lib.params.screen == "snob" || lib.params.screen == "barracks" || lib.params.screen == "stable" || lib.params.screen == "garage" || lib.params.screen == "train" || lib.params.screen == "market" || lib.params.screen == "smith" || lib.params.screen == "place" || lib.params.screen == "overview")
      Groups.showGroupIcons();
    $("open_groups").addEventListener("click",Groups.modVillagePopup,false);
    Groups.addGroupSelect();
    if( lib.params.screen == "overview_villages" ) {
      Groups.modGroupsTitle();
      if( lib.params.get("edit_group",0) !== 0 )
        getByTagName($("edit_group_membership_form"),"p","lastChild").getElementsByTagName("input")[0].addEventListener("click",Groups.submitEditGroup,false);
    }
    if( (lib.params.screen == "train" && lib.params.mode == "mass") || 
        (lib.params.screen == "market" && lib.params.mode == "call") ||
        (lib.params.screen == "snob" && lib.params.mode == "coin") ||
        (lib.params.screen == "place" && lib.params.mode == "call"))
      Groups.modGroupsTitle();
  },
  addGroupSelect : function() {
    var row = $("menu_row2");
    var cell = row.insertCell(-1);
    var a = cell.appendChild(ce("a"));
    var group = Groups.getGroupById(lib.game_data.village.group);
    Groups.insertGroupImg(group,a);
    a.title = group.name;
    a.href = "javascript:;";
    a.addEventListener("click",function(e) { Groups.ctxMenu.show(e.pageX,e.pageY,texts[lib.lang].gui.selectGroup,"title"); },false );
    Groups.createCtxMenu();
  },
  showGroupIcons : function() {
    var title = $("content_value").getElementsByTagName("h2")[0];
    if( title ) {
      title.parentNode.style.verticalAlign = "top";
      var tab = title.parentNode.insertBefore(ce("table"),title);
      tab.style.width = "100%";
      var row = tab.insertRow(0);
      var cell = row.insertCell(0);
      cell.appendChild(title); //innerHTML = "<h2>" + title.innerHTML + "</h2>";
      cell = row.insertCell(1);
      cell.style.textAlign = "right";
      cell.style.verticalAlign = "top";
      for( var i = 0; i < Settings.userGroups.length; i++ ) {
        for( var g = 0; g < curVillage.groups.list.length; g++ ) {
          if( Settings.userGroups[i].name == curVillage.groups.list[g] ) {
            Groups.insertGroupImg(Settings.userGroups[i],cell);
            break;
          }
        }
      }
    }
  },
  toggleGroup : function(e) {
    var id = parseInt(this.id.substr(10),10);
    var chk = $("dsfm_groupCheck"+id);
    chk.checked = !chk.checked;
    this.firstChild.style.opacity = chk.checked ? 1 : 0.3;
    $("dsfm_setGroups").style.display="";
  },
  modGroupTable : function(mode) {
    var tab;
    var form;
    if( mode == "groups" ) {
      form = document.getElementsByTagName("form")[0];
      tab = form.getElementsByTagName("table")[0];
    }
    else {
      tab = $("group_table");
      form = $("reassign_village_to_groups_form_group_assigment");
    }
    var editLnk;
    var loaded = false;
    switch(mode) {
      case "set":
        if( form ) {
          loaded = true;
        }
        break;
      case "edit":
        try {
          editLnk = getByTagName(tab,"table","nextSibling").getElementsByTagName("a")[0];
          loaded = true;
        }
        catch(e) {
        }
        break;
      default:
        loaded = true;
    }
    if( loaded ) {
      var rows = [];
      var saveGroups = false;
      curVillage.groups.timestamp = lib.getTime();
      curVillage.groups.list = [];
      
      //HS _ IG 001-->
      //for( var i = 1; i < tab.rows.length; i++ ) {
      for( var i = 0; i < tab.rows.length; i++ ) {
      //HS _ IG 001<--
        var p = tab.rows[i].cells[0].getElementsByClassName("p_groups")[0];
        var inputs = tab.rows[i].cells[0].getElementsByTagName("input");
        var name;
        if( p )
          name = p.textContent;
        else {
          p = inputs[0].nextSibling;
          name = tab.rows[i].cells[0].textContent;
        }
        if( !inputs[0] || inputs[0].checked )
          curVillage.groups.list.push(name);
        var group = Groups.getGroupByName(name);
        if( group.id == 0 ) {
          var inputs = tab.rows[i].cells[0].getElementsByTagName("input");
          var id = 0;
          if( inputs && inputs.length > 0 ) {
            saveGroups = true;
            group.id = parseInt(inputs[0].value);
          }
        }
        rows.push({row: tab.rows[i], group: group});
        var img = p.parentNode.insertBefore(ce("img"),p);
        img.src = group.icon ? group.icon : "graphic/map/empty.png";
        img.style.width = "16px";
        img.style.height = "16px";
        img.style.backgroundColor = group.color;
        img.style.border = "1px solid black";
        img.style.marginRight = "5px";
      }
      curVillage.save();
      rows.sort(function(a,b){return a.group.sort-b.group.sort;});
      for( var i = 0; i < rows.length; i++ ) 
        tab.tBodies[0].appendChild(rows[i].row);
      if( form ) {
        if( rows.length < Settings.userGroups.length ) {
          Groups.removeMissingGroups(rows);
          saveGroups = true;
        }
        if( mode == "edit" )
          form.addEventListener("submit", function() { Groups.modGroupTable("edit") }, false);
        form.addEventListener("submit", function() { 
            curVillage.groups.timestamp = lib.getTime(); 
            curVillage.groups.list = []; 
            var inputs = form.getElementsByTagName("input");
            for( var i = 0; i < inputs.length; i++ ) {
              if( inputs[i].checked ) {
                var group = Groups.getGroupById(inputs[i].value);
                curVillage.groups.list.push(group.name);
              }
            }
            curVillage.save();
            Groups.modGroupTable("edit");
          }, false );
      }
      else
        editLnk.addEventListener("click", function() { Groups.modGroupTable("set"); }, false);
      if( saveGroups ) {
        Groups.updateGroupSort();
        lib.storage.setValue("userGroups"+ownPid,Settings.userGroups);
      }
    }
    else
      setTimeout(function() { Groups.modGroupTable(mode); }, 100);
  },
  modGroupSelect : function(select) {
    var idx = parseInt(select.getAttribute("dsfm_idx"),10);
    if( isNaN(idx) ) {
      select.setAttribute("dsfm_idx",Groups.ctxSelectData.length);
      var group = Groups.getGroupById(select.value);
      select.style.display = "none";
      var parent = select.parentNode;
      //var div = parent.insertBefore(ce("div"),select);
      var tab = parent.insertBefore(ce("table"),select);
      tab.style.padding = "0";
      tab.style.margin = "0";
      tab.setAttribute("cellspacing",0);
      tab.setAttribute("cellpadding",0);
      tab.style.border = "1px solid #804000";
      var row = tab.insertRow(-1);
      var img = Groups.insertGroupImg(group,row.insertCell(-1));
      var a = row.insertCell(-1).appendChild(ce("a"));
      a.href = "javascript:;";
      a.addEventListener("click", function(e) { Groups.ctxMenu.show(e.pageX,e.pageY,texts[lib.lang].gui.selectGroup,e); }, false );
      a.innerHTML = group.name + " " + String.fromCharCode(160,9660);
      a.setAttribute("dsfm_idx",Groups.ctxSelectData.length);
//      parent.insertBefore(ce("div"),select).style.clear = "both";
      Groups.ctxSelectData.push({ select: select, img: img, a: a });
    }
  },
  modGroupsTitle : function() {
    var editLnk = $("edit_group_href");
    if( editLnk )
      editLnk.addEventListener("click",Groups.modGroupEdit,false);
    var isEdit = lib.params.get("edit_group",0) !== 0;
    var grp = document.getElementsByClassName("group_tooltip");
    var div = grp[0].parentNode;
    var groups = [];
    var count = 0;
    var saveGroups = false;
    var curId = parseInt(lib.game_data.village.group,10);
    for( var i = 0; i < grp.length; i++ ) {
      var e = grp[i];
      var id = 0;
      var name = "";
      var nodeName = e.nodeName.toUpperCase();
      if( nodeName == "A" ) {
        id = parseInt(lib.parseParams(e.href).group,10);
        name = e.textContent;
        if( !isEdit )
          name = name.substr(1,e.innerHTML.length-2);
        count++;
      }
      else if(nodeName == "STRONG") {
        if( e.innerHTML.indexOf("&gt;") > -1 ) {
          id = curId;
          name = e.innerHTML.substr(4,e.innerHTML.length-9);
        }
      }
      else {
        continue;
      }
      if( id > 0 ) {
        var group = Groups.getGroupById(id);
        if( group.name != name ) {
          group.name = name;
          saveGroups = true;
        }
        e.innerHTML = "";
        if( id != curId )
          e.appendChild(document.createTextNode(" ["));
        else if( !isEdit ) 
          e.appendChild(document.createTextNode(" >"));
        if( group.icon )
          Groups.insertGroupImg(group,e);
        e.appendChild(document.createTextNode(" "+group.name));
        if( id != curId )
          e.appendChild(document.createTextNode("] "));
        else if( !isEdit ) {
          e.appendChild(document.createTextNode("< "));
        }
      }
      else
        group = {sort:999};
      groups.push( { e: e, group: group } );
    }
    if( !isEdit ) {
      if( groups.length-1 < Settings.userGroups.length ) {
        Groups.removeMissingGroups(groups);
        saveGroups = true;
      }
      groups.sort(function(a,b){return a.group.sort-b.group.sort;});
      for( var i = 0; i < groups.length; i++ ) {
        div.appendChild(groups[i].e);
        if( groups[i].group.newLine )
          div.appendChild(ce("br"));
      }
    }
    if( saveGroups ) {
      Groups.updateGroupSort();
      lib.storage.setValue("userGroups"+ownPid,Settings.userGroups);
    }
  },
  modGroupEdit : function() {
    var div = $("group_config");
    if( div.style.display == "none" ) {
      setTimeout(Groups.modGroupEdit,100);
    }
    else {
      $("edit_group_href").removeEventListener("click",Groups.modGroupEdit,false);
      var form = $("add_group_form").addEventListener("submit",Groups.onNewGroup,false);
      var tab = $("group_table");
      tab.rows[0].cells[0].colSpan=9;
      var rows = [];
      var save = false;
      for( var i = 1; i < tab.rows.length - 1; i++ ) {
        var id = parseInt(tab.rows[i].id.substr(8),10);
        var group = Groups.getGroupById(id);
        if( group.name == "" ) {
          group.name = a[0].innerHTML;
          save = true;
        }
        tab.rows[i].getElementsByTagName("a")[2].addEventListener("click", Groups.onDeleteGroup,false);
        tab.rows[i].cells[1].getElementsByTagName("form")[0].addEventListener("submit",Groups.onRenameGroup,false);
        var cell = tab.rows[i].insertCell(0);
        var input = cell.appendChild(ce("input"));
        input.type="checkbox";
        input.checked = group.show;
        input.value = group.id;
        tab.rows[i].insertCell(1);
        Groups.insertGroupImg(group,tab.rows[i].insertCell(2));
        cell = tab.rows[i].insertCell(6);
        input = cell.appendChild(ce("input"));
        input.type="text";
        input.size = 8;
        input.value = group.color;
        input.setAttribute("onchange","this.parentNode.parentNode.cells[2].firstChild.style.backgroundColor=this.value");
        input.color = new ColorPicker(input);
        input.color.required = false;
        cell = tab.rows[i].insertCell(7);
        input = cell.appendChild(ce("input"));
        input.type = "text";
        input.setAttribute("onchange","this.parentNode.parentNode.cells[2].firstChild.src=this.value");
        input.value = group.icon;
        input.icon = new IconPicker(input);
        cell = tab.rows[i].insertCell(8);
        input = cell.appendChild(ce("input"));
        input.type = "checkbox";
        input.checked = group.newLine;
        rows.push( { row: tab.rows[i], group: group } );
      }
      if( save )
        lib.storage.setValue("userGroups"+ownPid,Settings.userGroups);
      tab.rows[i].insertCell(0).colSpan=3;
      cell = tab.insertRow(-1).insertCell(0);
      cell.colSpan = 9;
      input = cell.appendChild(ce("input"));
      input.type = "button";
      input.value = texts[lib.lang].gui.savebutton;
      input.addEventListener("click",Groups.saveUserGroups,false);
      rows.sort(function(a,b){return a.group.sort-b.group.sort;});
      var lastRow = tab.rows[i];
      for( var i = 0; i < rows.length; i++ )
        tab.tBodies[0].insertBefore(rows[i].row,lastRow);
      createPrioLinks(tab,1,2,1,true);
      
      row = tab.insertRow(1);
      for( var i = 0; i < texts[lib.lang].gui.groupTitle.length; i++ ) {
        cell = row.appendChild(ce("th"));
        cell.innerHTML = texts[lib.lang].gui.groupTitle[i];
      }
      row.cells[3].colSpan=2;
    }
  },
  insertGroupImg : function(group,parent,beforeNode) {
    if( typeof( group ) == "Number" )
      group = Settings.userGroups[group];
    var img = ce("img");
    img.src = group.icon == "" ? "graphic/map/empty.png" : group.icon;
    img.style.backgroundColor = group.color;
    img.style.width = "16px";
    img.style.height = "16px";
    img.style.border = "1px solid black";
    img.title = group.name;
    if( beforeNode )
      parent.insertBefore(img,beforeNode);
    else
      parent.appendChild(img);
    return img;
  },
  addGroupEdit : function(parent) {
    //td.removeChild(newLnk);
    tab = parent.appendChild(ce("table"));
    var row = tab.insertRow(0);
    for( var i = 0; i < texts[lib.lang].gui.groupTitle.length-1; i++ ) {
      var cell = row.appendChild(ce("th"));
      cell.innerHTML = texts[lib.lang].gui.groupTitle[i];
    }
    for( var i = 0; i < Settings.userGroups.length; i++ ) {
      row = tab.insertRow(-1);
      cell = row.insertCell(-1);
      var input = cell.appendChild(ce("input"));
      input.type="checkbox";
      input.checked = Settings.userGroups[i].show;
      input.value = Settings.userGroups[i].id;
      cell = row.insertCell(-1);
      if( i > 0 ) {
        var a = cell.appendChild(ce("a"));
        a.href = "javascript:;";
        a.addEventListener("click", function(e) { moveTabRow(e,-1,1); }, false);
        a.textContent = String.fromCharCode(9650);
      }
      if( i < Settings.userGroups.length-1 ) {
        var a = cell.appendChild(ce("a"));
        a.href = "javascript:;";
        a.addEventListener("click", function(e) { moveTabRow(e,1,1); }, false);
        a.textContent =  String.fromCharCode(9660);
      }
      cell = row.insertCell(-1);
      var img = cell.appendChild(ce("img"));
      if( Settings.userGroups[i].icon )
        img.src = Settings.userGroups[i].icon;
      else
        img.src = "graphic/map/empty.png";
      img.style.backgroundColor = Settings.userGroups[i].color;
      img.style.width = "16px";
      img.style.height = "16px";
      img.style.border = "1px solid black";
      cell = row.insertCell(-1);
      cell.innerHTML = Settings.userGroups[i].name;
      cell = row.insertCell(-1);
      input = cell.appendChild(ce("input"));
      input.type = "text";
      input.className = "dsfm_color {required:false}";
      input.value = new Color(img.style.backgroundColor).toString();
      input.size = 8;
      input.setAttribute("onchange","this.parentNode.parentNode.cells[2].firstChild.style.backgroundColor=this.value");
      cell = row.insertCell(-1);
      input = cell.appendChild(ce("input"));
      input.type = "text";
      input.setAttribute("onchange","this.parentNode.parentNode.cells[2].firstChild.src=this.value");
      input.value = Settings.userGroups[i].icon;
      input.icon = new IconPicker(input);
      cell = row.insertCell(-1);
      input = cell.appendChild(ce("input"));
      input.type = "checkbox";
      input.checked = Settings.userGroups[i].newLine;
    }
    row = tab.insertRow(-1);
    cell = row.insertCell(0);
    cell.colSpan = 6;
    input = cell.appendChild(ce("input"));
    input.type = "button";
    input.value = texts[lib.lang].gui.savebutton;
    input.addEventListener("click",Groups.saveUserGroups,false);
  },
  saveUserGroups : function() {
    var tab = this.parentNode.parentNode.parentNode;
    Settings.userGroups = [];
    var start = 1;
    var end = tab.rows.length - 1;
    var sort = 0;
    var idx = { color: 4, icon: 5, newLine: 6 };
    if( tab.rows[0].cells[0].colSpan > 1 ) {
      start++;
      end--;
      idx.color+=2;
      idx.icon+=2;
      idx.newLine+=2;
    }
    for( var i = start; i < end; i++ ) {
      if( tab.rows[i].style.display != "none" ) {
        var group = {};
        var check = tab.rows[i].cells[0].firstChild;
        group.id = check.value;
        if( start == 1 )
          group.name = tab.rows[i].cells[3].innerHTML;
        else
          group.name = tab.rows[i].cells[3].getElementsByTagName("a")[0].innerHTML;
        group.color = tab.rows[i].cells[idx.color].firstChild.value;
        group.icon = tab.rows[i].cells[idx.icon].firstChild.value;
        group.show = check.checked;
        group.sort = sort++;
        group.newLine = tab.rows[i].cells[idx.newLine].firstChild.checked;
        Settings.userGroups.push( group );
      }
    }
    lib.storage.setValue("userGroups"+ownPid,Settings.userGroups);
    var sel = $("dsfm_ownOvl");
    if( sel && sel.value == "Groups" )
      Map.createOverlays();
  },
  getGroupById : function(id) {
    var group;
    if( id == 0 )
      return { id: 0, name: texts[lib.lang].gui.allGroups, icon: "", color:"", sort: 999 };
    else {
      var maxSort = 0;
      for( var i = 0; i < Settings.userGroups.length; i++ ) {
        if( Settings.userGroups[i].id == id )
          return Settings.userGroups[i];
        if( Settings.userGroups[i].sort > maxSort )
          maxSort = Settings.userGroups[i].sort;
      }
      group = { id: id, name: null, icon: "", color: "", sort: maxSort+1 };
      Settings.userGroups.push( group );
    }
    return group;
  },
  getGroupByName : function(name) {
    var maxSort = 0;
    for( var i = 0; i < Settings.userGroups.length; i++ ) {
      if( Settings.userGroups[i].name == name )
        return Settings.userGroups[i];
      if( Settings.userGroups[i].sort > maxSort )
        maxSort = Settings.userGroups[i].sort;
    }
    var group = { id: 0, name: name, icon: "", color: "", sort: maxSort+1 };
    Settings.userGroups.push( group );
    return group;
  },
  removeMissingGroups : function(list) {
    for( var i = 0; i < Settings.userGroups.length; i++ ) {
      for( var j = 0; j < list.length; j++ ) {
        if( list[j].group.id == Settings.userGroups[i].id )
          break;
      }
      if( j == list.length )
        Settings.userGroups.splice(i,1);
    }
  },
  getGroupId : function(e) {
    var row = getByTagName(e.target, "tr", "parentNode");
    return parseInt(row.id.substr(8),10);
  },
  updateGroupSort : function() {
    for( var i = 0; i < Settings.userGroups.length; i++ )
      Settings.userGroups[i].sort = i;
  },
  onDeleteGroup : function(e) {
    var id = Groups.getGroupId(e);
    for( var i = 0; i < Settings.userGroups.length; i++ ) {
      if( Settings.userGroups[i].id == id ) {
        Settings.userGroups.splice(i,1);
        break;
      }
    }
    Groups.updateGroupSort();
    lib.storage.setValue("userGroups"+ownPid,Settings.userGroups);
  },
  onRenameGroup : function(e) {
    Groups.actionValue = Groups.getGroupId(e);
    Groups.waitForRename();
  },
  waitForRename : function() {
    var cell = $("show_group"+Groups.actionValue);
    if( cell.style.display == "none" && Groups.actionValue > 0 )
      setTimeout(Groups.waitForRename,100);
    else {
      var group = Groups.getGroupById(Groups.actionValue);
      var a = getByTagName(cell,"a","firstChild");
      group.name = a.innerHTML;
      cell.parentNode.cells[1].style.display="";
      cell.parentNode.cells[4].style.display="none";
      lib.storage.setValue("userGroups"+ownPid,Settings.userGroups);
      Groups.actionValue = null;
    }
  },
  onNewGroup : function(e) {
    Groups.actionValue = this.getElementsByTagName("input")[2].value;
    Groups.waitForNewGroup();
  },
  waitForNewGroup : function() {
    var tab = $("group_table");
    if( tab.rows[0].cells[0].colSpan == 1 )
      Groups.modGroupEdit();
    else
      setTimeout(Groups.waitForNewGroup,100);
  },
  modMapPopup : function() {
    var td = $("info_village_groups");
    if( td.parentNode.style.display != "none" ) {
      td.style.verticalAlign = "middle";
      var groups = td.innerHTML.split(", ");
      
      for(var i = 0; i < groups.length; i++ )
        groups[i] = Groups.getGroupByName(groups[i]);
      groups.sort(function(a,b){return a.sort-b.sort});
      td.innerHTML = "";
      for( var i = 0; i < groups.length; i++ ) {
        if( i > 0 )
          td.appendChild(document.createTextNode(", "));
        Groups.insertGroupImg(groups[i],td);
        td.appendChild(document.createTextNode(" "+groups[i].name));
      }
    }
  },
  modVillagePopup : function() {
    var select = $("group_id");
    if( select ) {
      $("group_popup").style.zIndex = 100;
      Groups.modGroupSelect(select);
    }
    else
      setTimeout(Groups.modVillagePopup,100);
  },
  submitEditGroup : function() {
    var ts = lib.getTime();
    var inputs = document.getElementsByName("group[]");
    var group = Groups.getGroupById(lib.params.edit_group);
    for( var i = 0; i < inputs.length; i++ ) {
      var village = new MyVillage(inputs[i].value);
      var idx = village.groups.list.indexOf(group.name);
      if( inputs[i].checked ) {
        if( idx == -1 ) {
          village.groups.list.push(group.name);
          village.groups.timestamp = ts;
          village.save();
        }
      }
      else {
        if( idx != -1 ) {
          village.groups.list.splice(idx,1);
          village.groups.timestamp = ts;
          village.save();
        }
      }
    }
  },
  createCtxMenu : function() {
    Groups.ctxMenu = new ContextMenu("dsfm_groupsCtx",Groups.ctxCallback);
    for( var i = 0; i < Settings.userGroups.length; i++ ) 
      Groups.ctxMenu.addMenuItem( { icon: Settings.userGroups[i].icon == "" ? "graphic/map/emtpy.png" : Settings.userGroups[i].icon, text: Settings.userGroups[i].name, id: Settings.userGroups[i].id } ).cells[0].firstChild.style.backgroundColor = Settings.userGroups[i].color;
    Groups.ctxMenu.addMenuItem( { icon: "graphic/map/emtpy.png", text: texts[lib.lang].gui.allGroups, id: 0 } ).cells[0].firstChild.style.backgroundColor = "";
  },
  ctxCallback : function(id,type,data,target) {
    if( type == "modHref" && target == "title" ) {
      var href = location.href + "&group=" + data.id;
      return href.replace( /village=(\d+)/, "village=j$1" );
    }
    else if( type == "click" && target != "title" ) {
      var idx = parseInt(target.target.getAttribute("dsfm_idx"),10);
      var group = Groups.getGroupById(data.id);
      Groups.ctxSelectData[idx].img.src = group.icon == "" ? "graphic/map/empty.png" : group.icon;
      Groups.ctxSelectData[idx].img.style.backgroundColor = group.color;
      Groups.ctxSelectData[idx].a.innerHTML = group.name + " " + String.fromCharCode(160,9660);
      Groups.ctxSelectData[idx].select.value = data.id;
      lib.fireEvent(Groups.ctxSelectData[idx].select,"change");
    }
  },
}
/** var RunTimes = {
/* Was macht diese Funktion?
*/
var RunTimes = {
  // TODO: Trader
  curVillage : { id: 0, x: 0, y: 0 },
  speed : 0, 
  unitCols : { spear: 0, sword: 0, axe: 0, archer: 0, spy: 1, light: 1, marcher: 1, heavy: 1, ram: 2, catapult: 2, knight: 3, snob: 3, trader: 2 },
  ToolTip : function(target) {
    var THIS = this;
    this.timeOut = 0;
    this.show = function(e) {
      var dist;
      if( !isNaN(THIS.dist) )
        dist = THIS.dist;
      else {
        dist = parseFloat(target.getAttribute("dist"));
        if( isNaN(dist) ) {
          var coords = target.getAttribute("coords");
          if( coords ) {
            coords = coords.split("_");
            dist = Math.sqrt(Math.pow(RunTimes.curVillage.x - coords[0], 2) + Math.pow(RunTimes.curVillage.y - coords[1], 2));
          }
        }
      }
      if( !isNaN(dist) ) {
        THIS.div.style.display='block';
        THIS.move(e);
        var startTime=new Date(lib.getTime() * 1000);
        var key;
        var idx = 0;
        for(key in serverInfo.unitInfo) {
          idx++;
          var cell = THIS.div.firstChild.rows[1].cells[idx];
          if( cell ) {
            var time = serverInfo.unitInfo[key].speed*dist*RunTimes.speed;
            cell.innerHTML = RunTimes.formatTime(time);
            cell.style.color = (key=='snob'&&dist>serverInfo.config.snob_max_dist)?'#999999':'#000000';
            if( THIS.div.firstChild.rows.length > 2 ) {
              cell=THIS.div.firstChild.rows[2].cells[idx];
              var arrivalTime = new Date(startTime.getTime() + time*60000);
              cell.innerHTML=RunTimes.formatDate(arrivalTime,true);
              var h=arrivalTime.getHours();
              cell.style.color=(key=='snob'&&dist>serverInfo.config.snob_max_dist)?'#999999':(h>=0&&h<8)?'#FF0000':'#000000';
            }
          }
        }
        if( THIS.div.firstChild.rows.length > 3 )
          THIS.div.firstChild.rows[3].cells[1].innerHTML=texts[lib.lang].locale.date2timeStr(startTime,true);
      }
    }
    this.hide = function(e) {
      THIS.div.style.display = "none";
    }
    this.move = function(event) {
      var size= { x: THIS.div.offsetWidth, y: THIS.div.offsetHeight };
      if(window.pageYOffset)
        scrollY = window.pageYOffset;
      else
        scrollY = document.body.scrollTop;
      var x = event.clientX+10;
      if(x+size.x>document.body.clientWidth)
        x = document.body.clientWidth-size.x;
      THIS.div.style.left=x+'px';
      THIS.div.style.top=scrollY+event.clientY-size.y-10+'px';
    }
    this.getTTDiv = function() {
      var div = $("dsfm_runtimes");
      if( !div )
        div = THIS.create();
      return div;
    }
    this.create = function() {
      var showArrivalTime = true;
      var i;
      var div = document.body.appendChild( ce('div'));
      div.id = 'dsfm_runtimes';
      div.style.position = "absolute";
      div.style.top = "0px";
      div.style.left = "0px";
      div.style.zIndex = 1000;
      div.style.display = 'none';
      div.style.border='1px solid #804000';
      div.style.backgroundColor = '#F6EAC4';
      div.style.padding = "5px";
      var tab = div.appendChild(ce('table'));
      tab.style.border='1px solid rgb(222, 211, 185)';
      tab.cellSpacing=0;
      tab.cellPadding=0;
      tab.insertRow(0);
      tab.insertRow(1);
      i = 0;
      var col = 0;
      if( showArrivalTime ) {
        i=1;
        var cell = tab.rows[0].insertCell(0);
        cell.style.backgroundColor = colBgColor[1];
        cell.style.padding = '2px';
        cell.style.textAlign = 'right';
        cell.style.fontSize = '9px';
        cell.style.fontWeight = "bold";
        cell.innerHTML = texts[lib.lang].gui.unit;
        cell = tab.rows[1].insertCell(0);
        cell.style.backgroundColor = colBgColor[1];
        cell.style.padding = '2px';
        cell.style.textAlign = 'right';
        cell.style.fontSize = '9px';
        cell.style.fontWeight = "bold";
        cell.innerHTML = texts[lib.lang].gui.runtime;
        tab.insertRow(2);
        cell = tab.rows[2].insertCell(0);
        cell.style.backgroundColor = colBgColor[1];
        cell.style.padding = '2px';
        cell.style.textAlign = 'right';
        cell.style.fontSize = '9px';
        cell.style.fontWeight = "bold";
        cell.innerHTML = texts[lib.lang].gui.arrival;
        tab.insertRow(3);
        cell = tab.rows[3].insertCell(0);
        cell.style.padding = '2px';
        cell.style.textAlign = 'right';
        cell.style.fontSize = '9px';
        cell.style.fontWeight = "bold";
        cell.innerHTML = texts[lib.lang].gui.startTime;
        cell = tab.rows[3].insertCell(1);
        cell.style.padding = '2px';
        cell.style.fontSize = '9px';
        cell.colSpan=3;
        cell.id = "dspi_start";
      }
      for( var key in serverInfo.unitInfo ) {
        if( Math.round(serverInfo.unitInfo[key].speed) > 0 ) {
          cell = tab.rows[0].insertCell(i);
          var img = cell.appendChild(ce('img'));
          cell.style.backgroundColor = colBgColor[col];
          cell.style.padding = '2px';
          cell.style.textAlign = 'center';
          if( key == "trader" )
            img.src = 'graphic/buildings/market.png';
          else
            img.src = 'graphic/unit/unit_'+key+'.png';
          img.alt = '';
          cell = tab.rows[1].insertCell(i);
          cell.style.backgroundColor = colBgColor[col];
          cell.style.padding = '2px';
          cell.style.textAlign = 'center';
          cell.style.fontSize = '9px';
          if( showArrivalTime ) {
            cell = tab.rows[2].insertCell(i);
            cell.style.backgroundColor = colBgColor[col];
            cell.style.padding = '2px';
            cell.style.textAlign = 'center';
            cell.style.fontSize = '9px';
          }
          i++;
          col ^= 1;
        }
      }
      return div;
    }
    this.div = this.getTTDiv();
    if( arguments.length == 2 )
      this.dist = arguments[1];
    else
      this.dist = Number.NaN;
    target.addEventListener("mouseover", function() { THIS.timeOut = setTimeout(THIS.show,Settings.settings.misc.rtttDelay*1000); }, false );
    target.addEventListener("mouseout", function() { if( THIS.timeOut ) clearTimeout(THIS.timeOut); THIS.hide(); THIS.timeOut=0; }, false );
    target.addEventListener("mousemove", THIS.move, false );
  },
  createToolTip : function(target,dist) {
    if( Settings.settings.misc.runTimeToolTips ) {
      if( target.rttt )
        delete target.rttt;
      target.rttt = new RunTimes.ToolTip(target,dist);
    }
  },
  formatTime : function(time) {
    if( isNaN(time)) time=0;
      time=Math.round(time*60);
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor(time/60) - (hours * 60);
    var seconds = Math.round(time % 60,0);
    var ret = hours + ':' + (minutes < 10 ? '0'+minutes : minutes) + ':' + (seconds < 10 ? '0'+seconds : seconds);
    return ret;
  },
  formatDate : function(date,br) {
    var v=date.getUTCDate();
    var ret = (v < 10 ? '0'+v : v)+'.';
    v = date.getUTCMonth()+1;
    ret += (v < 10 ? '0'+v : v)+'.';
    ret+=br?'\n<br/>':' ';
    v = date.getUTCHours();
    ret += (v < 10 ? '0'+v : v)+':';
    v = date.getUTCMinutes();
    ret += (v < 10 ? '0'+v : v)+':';
    v = date.getUTCSeconds();
    ret += (v < 10 ? '0'+v : v);
    return ret;
  },
  doIt : function() {
    if( lib.game_data ) {
      RunTimes.curVillage.id = parseInt(lib.game_data.village.id,10);
      var coords = lib.game_data.village.coord.split("|");
      RunTimes.curVillage.x = parseInt(coords[0]);
      RunTimes.curVillage.y = parseInt(coords[1]);
      lib.storage.setValue("curvil",RunTimes.curVillage);
    }
    else {
      RunTimes.curVillage = lib.storage.getValue("curvil",RunTimes.curVillage);
    }
    RunTimes.speed = 1; //serverInfo.config.unit_speed * serverInfo.config.speed;
    if( lib.params.screen=="market" )
      RunTimes.modMarket();
    else if( /forum\.php/.test(location.href) || 
             (lib.params.screen == "forum" && lib.params.screenmode == "view_thread") || 
             (lib.params.screen == "mail" && lib.params.get("mode") == "view"))
      RunTimes.modForumMail();
    else if( /screen=memo/.test(location.href) ) {
      var e = document.getElementsByClassName("show_row");
      for( var i = 0; i < e.length; i++ )
        RunTimes.addMouseEvents(e[i]);
    }
    else if( lib.params.screen == "info_command" && lib.params.type == "own" )
      RunTimes.modCommand();
  },
  addMouseEvents : function(node) {
    if(node.parentNode.nodeName.toUpperCase() != "A" ) {
      if( node.parentNode.nodeName.toUpperCase() != "TEXTAREA" ) {
        if( node.nodeValue ) {
          var res = node.nodeValue.match(/(\d+)\|(\d+)/);
          var pos = 0;
          if( res ) {
            var cp = node.nodeValue.indexOf(res[0]);
            var oldValue = node.nodeValue;
            node.nodeValue = node.nodeValue.substr(pos, cp);
            var lnk = ce('a');
            var dist = Math.sqrt(Math.pow(RunTimes.curVillage.x - res[1], 2) + Math.pow(RunTimes.curVillage.y - res[2], 2));
            RunTimes.createToolTip(lnk,dist);
            lnk.innerHTML = res[0];
            lnk.href = 'game.php?' +(isUV?'t='+lib.params.t+'&':'') + 'village='+RunTimes.curVillage.id+'&screen=map&x='+res[1]+'&y='+res[2];
            if( node.nextSibling )
              node.parentNode.insertBefore( lnk, node.nextSibling );
            else
              node.parentNode.appendChild( lnk );
            var rest = ce('span');
            rest.innerHTML = oldValue.substr(cp+res[0].length);
            if( lnk.nextSibling )
              node.parentNode.insertBefore( rest, lnk.nextSibling );
            else
              node.parentNode.appendChild(rest);
          }
        }
      }
    }
    else {
      if( node.nodeValue ) {
        var res = node.nodeValue.match(/(\d+)\|(\d+)/);
        if( res ) {
          var dist = Math.sqrt(Math.pow(RunTimes.curVillage.x - res[1], 2) + Math.pow(RunTimes.curVillage.y - res[2], 2));
          RunTimes.createToolTip(node.parentNode,dist);
        }
      }
    }
    var child = node.firstChild;
    while (child != null) {
        RunTimes.addMouseEvents(child);
        child = child.nextSibling;
    }
  },
  convertCoordCol : function(tab,col) {
    var rows = tab.tBodies[0].rows;
    for( var i = 0; i < rows.length; i++ ) {
      RunTimes.convertCoordCell(rows[i],col);
    }
  },
  convertCoordCell : function(row,col) {
    var cell = row.cells[col];
    var dstCoords = cell.innerHTML.match(/(\d+)\|(\d+)/);
    if( dstCoords ) {
      var dist = Math.sqrt(Math.pow(RunTimes.curVillage.x - dstCoords[1], 2) + Math.pow(RunTimes.curVillage.y - dstCoords[2], 2));
      cell.innerHTML = '<a href="'+lib.createLink("map","x",dstCoords[1],"y",dstCoords[2],false)+'">'+cell.innerHTML+'</a>';
      cell.setAttribute("dist",dist);
      RunTimes.createToolTip(cell,dist);
    }
  },
  compareDistCell : function(a,b) {
    return parseFloat(a.getAttribute("dist"))-parseFloat(b.getAttribute("dist"));
  },
  insertTable : function(parent,dist) {
    var showArrivalTime = true;
    var col = [];
    var row = 0;
    // Anzahl der Zeilen ermitteln
    for( var key in serverInfo.unitInfo ) {
      if( Math.round(serverInfo.unitInfo[key].speed) > 0 ) {
        if( isNaN(col[RunTimes.unitCols[key]]) )
          col[RunTimes.unitCols[key]] = 1;
        else
          col[RunTimes.unitCols[key]]++;
        if( col[RunTimes.unitCols[key]] > row )
          row = col[RunTimes.unitCols[key]];
      }
    }
    var tab = parent.appendChild(ce('table'));
    tab.cellSpacing=0;
    tab.cellPadding=0;
    var bgcolidx = 0;
    for( i = 0; i < row; i++ )
      tab.insertRow(i);
    var cell = tab.insertRow(0).appendChild(ce('th'));
    cell.colSpan=col.length*2;
    cell.innerHTML = texts[lib.lang].gui.runtimes;

    // Laufzeiten einfügen
    var startTime=new Date(lib.getTime()*1000 + 120000);
    for( i = 0; i < col.length; i++ ) {
      var bgcolidx=0;
      row = 1;
      for( key in serverInfo.unitInfo ) {
        if( RunTimes.unitCols[key] == i ) {
          cell = tab.rows[row].insertCell(i*2);
          cell.style.backgroundColor=colBgColor[bgcolidx];
          var img = cell.appendChild(ce('img'));
          if( key == "trader" )
            img.src = 'graphic/buildings/market.png';
          else
            img.src = 'graphic/unit/unit_'+key+'.png';
          img.border = "0";
          img.alt = "";
          cell = tab.rows[row].insertCell(i*2+1);
          var time = serverInfo.unitInfo[key].speed*dist*RunTimes.speed;
          cell.style.fontSize = "9px";
          cell.style.padding="2px";
          cell.style.textAlign="center";
          cell.style.backgroundColor=colBgColor[bgcolidx];
          var color = (key=='snob'&&dist>serverInfo.config.snob_max_dist)?'#999999':'#000000';
          var html = '<span style="color:'+color+';">' + texts[lib.lang].locale.formatDuration(Math.round(time*60)) + '</span>';
          if( showArrivalTime ) {
            var arrivalTime = new Date(startTime.getTime() + time*60000);
            var h=arrivalTime.getHours();
            color=(key=='snob'&&dist>serverInfo.config.snob_max_dist)?'#999999':(h>=serverInfo.config.night_start_hour&&h<serverInfo.config.night_end_hour)?'#FF0000':'#000000';
            html += '<br/><span style="color:'+color+'">'+RunTimes.formatDate(arrivalTime,true)+'</span>';
          }
          cell.innerHTML=html;
          row++;
          bgcolidx ^= 1;
        }
      }
    }
    if( showArrivalTime ) {
      row = tab.insertRow(tab.rows.length);
      cell = row.insertCell(0);
      cell.colSpan=8;
      cell.style.fontSize="9px";
      cell.innerHTML = "<b>"+texts[lib.lang].gui.startTime+":</b> "+RunTimes.formatDate(startTime,false);
    }
  },
  modMarket : function() {
    var select = $("inputx");
    if( select )  {
      select = select.parentNode.getElementsByTagName("select")[0];
      if( select ) {
        var html = "<option>"+select.options[0].innerHTML+"</option>";
        for( var i = 1; i < select.options.length; i++ ) {
          var coords = select.options[i].value.split("|");
          var dist = Math.sqrt(Math.pow(RunTimes.curVillage.x - parseInt(coords[0],10), 2) + Math.pow(RunTimes.curVillage.y - parseInt(coords[1],10), 2));
          var duration = dist * 6 / serverInfo.config.speed;
          html += '<option value="'+select.options[i].value+'">'+select.options[i].innerHTML + " => " + texts[lib.lang].locale.formatDuration(Math.round(duration*60))+"</option>";
        }
        select.innerHTML = html;
      }
    }
  },
  modForumMail : function() {
    var tab = document.getElementsByTagName('table');
    for( var i = 0; i < tab.length; i++ ) {
      if( tab[i].className=="main" )
        break;
    }
    tab = tab[i];
    RunTimes.addMouseEvents(tab);
  },
  modCommand : function() {
    if( texts[lib.lang].regex.attack.test(document.getElementsByTagName("h2")[0].innerHTML) ) {
      var tab = $("content_value").getElementsByTagName('table')[0];
      for( var i = 0; i < tab.rows.length; i++ ) {
        if( texts[lib.lang].regex.durationTitle.test(tab.rows[i].cells[0].innerHTML) ) {
          duration = tab.rows[i].cells[1];
          duration = duration.innerHTML.split(':');
          duration = (parseInt(duration[0],10)*3600+parseInt(duration[1],10)*60+parseInt(duration[2],10))*1000;
        }
        else if( texts[lib.lang].regex.arrivalTitle.test(tab.rows[i].cells[0].innerHTML) ) {
          var cell = tab.rows[i].cells[1];
          var time = texts[lib.lang].locale.timeStr2Sec(cell.textContent);
          if( time < curTime ) {
            time = new Date(time*1000);
            time.setUTCFullYear(time.getUTCFullYear()+1);
            time = time.getTime() / 1000;
          }
          time += lib.tzOff;
          var row = tab.insertRow(i+1);
          var cell = row.insertCell(0);
          cell.colSpan=2;
          cell.innerHTML = texts[lib.lang].gui.returnTitle+":";
          
          tab.rows[i+1].insertCell(1).innerHTML = texts[lib.lang].locale.date2timeStr(new Date(time*1000+duration));
          if( /action=cancel/.test(tab.innerHTML) ) {
            row = tab.insertRow(i+2);
            cell = row.insertCell(0);
            cell.colSpan=2;
            cell.innerHTML = texts[lib.lang].gui.returnAtCancel+":";
            cell = tab.rows[i+2].insertCell(1);
            cell.innerHTML = texts[lib.lang].locale.date2timeStr(new Date(time*1000+duration));
            cell.id = "dsfm_cancelreturn";
            window.setInterval(function() { var parts = document.getElementsByClassName("timer")[0].innerHTML.split(":"); var ms = duration - (parseInt(parts[0],10)*3600+parseInt(parts[1],10)*60+parseInt(parts[2],10))*1000; $("dsfm_cancelreturn").innerHTML = texts[lib.lang].locale.date2timeStr(new Date(time-duration+ms*2)); }, 250 );
          }
          i = tab.rows.length;
        }
      }
    }
  },
  insertDist : function(row, colCoords, colDist) {
    var coords = row.cells[colCoords].innerHTML.match(/ \((\d+)\|(\d+)\) C\d+</);
    var cell = row.cells[colDist];
    cell.style.textAlign = "right";
    if( coords ) {
      var dist = Math.sqrt(Math.pow(RunTimes.curVillage.x - coords[1], 2) + Math.pow(RunTimes.curVillage.y - coords[2], 2));
      RunTimes.createToolTip(cell,dist);
      cell.setAttribute("dist", dist);
      cell.innerHTML = Math.round(dist*100)/100;
    }
    else
      cell.innerHTML = "---";
  },
}
var Storage = {
  colors : {},
  wood : [],
  stone : [],
  iron : [],
  storage : 1,
  doIt : function() {
    Storage.doResources();
    if( lib.params.screen == "market" ) {
      if( lib.params.mode == "all_own_offer" )
        Storage.modAllOwnOffer();
      else if( lib.params.mode == "call" )
        Storage.modMarketCall();
    }
    else if( lib.params.screen == "snob" && lib.params.mode=="coin" && Settings.settings.storage.modSnob )
      Storage.modSnob();
  },
  getColors : function(type, p,el) {
    if( Storage.colors[type] === undefined )
      Storage.colors[type] = [];
    var p = Math.round(p);
    if( p < 0 )
      p = 0;
    if( p > 100 )
      p = 100;
    if( Storage.colors[type][p] === undefined ) {
      var rgb = null;
      for( var i = 2; i < Settings.colors.range[type].length && Settings.colors.range[type][i].val < p; i++ );
      var color = new Color(Settings.colors.range[type][i-1].color);
      if( Settings.colors.range[type][0] ) {
        var f = (p-Settings.colors.range[type][i-1].val)/(Settings.colors.range[type][i].val-Settings.colors.range[type][i-1].val);
        color = color.fadeTo(f, new Color(Settings.colors.range[type][i].color));
      }
      else {
        if( Settings.colors.range[type][i].val == p )
          color = new Color(Settings.colors.range[type][i].color);
        else
          color = new Color(Settings.colors.range[type][i-1].color);
      }
      Storage.colors[type][p] = { background: color, text: color.getContrastColor() };
    }
    if( el != null ) {
      el.style.backgroundColor = Storage.colors[type][p].background;
      el.style.color = Storage.colors[type][p].text;
    }
    return Storage.colors[type][p];
  },
  doResources : function() {
    Storage.wood[0] = $("wood");
    Storage.stone[0] = $("stone");
    Storage.iron[0] = $("iron");
    Storage.wood[1] = $("wood");
    Storage.stone[1] = $("stone");
    Storage.iron[1] = $("iron");
    var storage = $("storage");
    var pop_current = $("pop_current");
    var pop_current_label = $("pop_current_label");
    var pop_max = $("pop_max");
    var pop_max_label = $("pop_max_label");
    if( Settings.settings.storage.titleResColored ) {
      var div = document.body.appendChild(ce("div"));
      div.style.display = "none";
      Storage.wood[1] = div.appendChild(ce("span"));
      Storage.wood[0].id = "";
      Storage.wood[1].id = "wood";
      Storage.wood[1].title = Storage.wood[0].title;
      Storage.wood[1].innerHTML = Storage.wood[0].innerHTML;
      Storage.stone[1] = div.appendChild(ce("span"));
      Storage.stone[0].id = "";
      Storage.stone[1].id = "stone";
      Storage.stone[1].title = Storage.stone[0].title;
      Storage.stone[1].innerHTML = Storage.stone[0].innerHTML;
      Storage.iron[1] = div.appendChild(ce("span"));
      Storage.iron[0].id = "";
      Storage.iron[1].id = "iron";
      Storage.iron[1].title = Storage.iron[0].title;
      Storage.iron[1].innerHTML = Storage.iron[0].innerHTML;
      var span = div.appendChild(ce("span"));
      storage.id = "";
      span.id = "storage";
      span.innerHTML = storage.innerHTML;
      Storage.storage = parseInt(storage.innerHTML,10);
      storage.innerHTML = lib.formatNumber(Storage.storage,true,true);
      setInterval(Storage.updateRes, 1000);
      Storage.updateRes();
    }

    var popCurrent = parseInt(pop_current.innerHTML,10);
//      pop_current.innerHTML = lib.formatNumber(popCurrent,true,true);

    if( Settings.settings.storage.titleFarmColored ) {
      var popMax = parseInt(pop_max.innerHTML,10);
//        pop_max.innerHTML = lib.formatNumber(popMax,true,true);
      Storage.getColors( "farm", popCurrent * 100 / popMax,pop_current_label );
    }
    pop_current_label.parentNode.title = lib.formatNumber(popMax-popCurrent,true,false) + " " + texts[lib.lang].gui.freeRes;
    curVillage.res.wood = parseInt(Storage.wood[1].innerHTML,10);
    curVillage.res.stone = parseInt(Storage.stone[1].innerHTML,10);
    curVillage.res.iron = parseInt(Storage.iron[1].innerHTML,10);
    curVillage.res.storage = parseInt($("storage").innerHTML,10);
    curVillage.res.pop.current = popCurrent;
    curVillage.res.pop.max = popMax;
    curVillage.res.timestamp = lib.getTime();
    curVillage.save();
  },
  updateRes : function() {
    for( var key in resInfos ) {
      var val = parseInt(Storage[key][1].textContent.replace(/\./g,""),10);
      Storage[key][0].innerHTML = lib.formatNumber(val,true,true);
      if( Settings.settings.storage.titleResColored )
        Storage.getColors( "resource", val * 100 / Storage.storage, Storage[key][0] );
    }
  },
  modResHeader : function(row,col) {
    cell = row.insertBefore(ce("th"),row.cells[col]);
    cell.innerHTML = '<img alt="" src="graphic/holz.png?a3702"/> '+texts[lib.lang].resources.wood;
    cell.style.whiteSpace = "nowrap";
    cell = row.insertBefore(ce("th"),cell.nextSibling);
    cell.innerHTML = '<img alt="" src="graphic/lehm.png?6c9bd"/> '+texts[lib.lang].resources.stone;
    cell.style.whiteSpace = "nowrap";
    cell = cell.nextSibling;
    cell.innerHTML = '<img alt="" src="graphic/eisen.png?0e9e5"/> '+texts[lib.lang].resources.iron;
    cell.style.whiteSpace = "nowrap";
  },
  modResColumn : function(row,col) {
    var cell = row.cells[col+1];
    if( cell ) {
      var storage = parseInt(cell.textContent.replace(/\./g,""),10);
      cell.style.textAlign = "right";
      cell.innerHTML = lib.formatNumber(storage,true,true);
      row.cells[1].style.display = "none";
      row.insertCell(col).style.textAlign = "right";
      row.insertCell(col).style.textAlign = "right";
      row.insertCell(col).style.textAlign = "right";
      row.cells[4].addEventListener("DOMNodeInserted", function(e) { Storage.updateResColumns(this.parentNode); }, false);
      Storage.updateResColumns(row);
    }
  },
  updateResColumns : function(row) {
    var storage = parseInt(row.cells[5].textContent.replace(".",""),10);
    var col = 1;
    for( var key in resInfos ) {
      var cell = row.cells[col++];
      var span = row.cells[4].getElementsByClassName(key);
      var cur = 0;
      if( span.length > 0 )
        cur = parseInt(span[0].textContent.replace(/\./g,""),10);
      var percent = Math.round( cur * 100 / storage );
      cell.title = lib.formatNumber( storage - cur, true, false ) + " " + texts[lib.lang].gui.freeRes;
      if( Settings.settings.storage.snobResColored )
        Storage.getColors( "resource", percent, cell );
      cell.innerHTML = lib.formatNumber(cur, true, true);
    }
    
  },
  modSnob : function() {
    var tab = $("coin_overview_table");
    tab.rows[0].cells[0].colSpan = 5;
    tab.rows[tab.rows.length-1].cells[0].colSpan = 5;
    tab.rows[tab.rows.length-1].cells[0].colSpan = 5;
    tab.insertBefore(ce("thead"),tab.tBodies[0]);
    tab.tHead.appendChild(tab.tBodies[0].rows[0]);
    tab.tHead.appendChild(tab.tBodies[0].rows[0]);
    tab.appendChild(ce("tfoot"));
    tab.tFoot.appendChild(tab.tBodies[0].rows[tab.tBodies[0].rows.length-1]);
    if( Settings.settings.storage.modSnob )
      Storage.modResHeader(tab.rows[1],1);
    for( var i = 0; i < tab.tBodies[0].rows.length; i++ ) {
      tab.tBodies[0].rows[i].cells[0].setAttribute("dsfm_order",i);
      if( Settings.settings.storage.modSnob ) {
        Storage.modResColumn(tab.tBodies[0].rows[i],1, Settings.settings.storage.snobResColored);
      }
    }
    var sorter = new TableSorter(tab);
    sorter.addSortColumn(0,compareOrderCell,1);
    sorter.addSortColumn(1,compareNumericCell);
    sorter.addSortColumn(2,compareNumericCell);
    sorter.addSortColumn(3,compareNumericCell);
    sorter.addSortColumn(4,compareNumericCell);
  },
  modAllOwnOffer : function() {
    var tab = getByTagName(document.getElementsByTagName("h3")[0],"table","nextSibling");
    if( tab ) {
      tab.tBodies[0].removeChild(tab.rows[tab.rows.length-1]);
      var img2key = { holz: "wood", lehm: "stone", eisen: "iron" };
      var sum = [ 0, { wood: 0, stone: 0, iron: 0 }, { wood: 0, stone: 0, iron: 0 }, 0, 0, 0 ];
      for( var i = 1; i < tab.rows.length; i++ ) {
        if( tab.rows[i].cells.length == 5 ) {
          tab.rows[i].insertCell(0).innerHTML = tab.rows[i-1].cells[0].innerHTML;
        }
        else {
          sum[4]++;
          tab.rows[i].cells[0].rowSpan = 1;
        }
        
        var count = parseInt(tab.rows[i].cells[3].innerHTML,10);
        sum[3] += count;
        sum[0]++;
        for( var c = 1 ; c < 3; c++ ) {
          try {
            var key = img2key[tab.rows[i].cells[c].getElementsByTagName("img")[0].src.match(/\/graphic\/([^\.]+)\.png/)[1]];
            var val = parseInt(tab.rows[i].cells[c].innerHTML.replace(/<[^>]+>|\./g,""),10);
            sum[c][key] += val * count;
          } catch(e) {}
        }
      }
      var row = tab.appendChild(ce("tfoot")).insertRow(-1);
      var cell = row.appendChild(ce("th"));
      cell.style.textAlign = "right";
      cell.style.verticalAlign = "top";
      cell = row.appendChild(ce("th"));
      cell.style.textAlign = "right";
      cell.style.verticalAlign = "top";
      var tabs = [];
      tabs.push(cell.appendChild(ce("table")));
      cell = row.appendChild(ce("th"));
      cell.style.textAlign = "right";
      cell.style.verticalAlign = "top";
      tabs.push(cell.appendChild(ce("table")));
      
      for( var i = 1; i < 3; i++ ) {
        for( var key in resInfos ) {
          var rowsum = tabs[i-1].insertRow(-1);
          var cell = rowsum.appendChild(ce("th"));
          var img = cell.appendChild(ce("img"));
          img.src = "graphic/"+resInfos[key].img;
          img.title = texts[lib.lang].resources[key];
          cell = rowsum.appendChild(ce("th"));
          cell.style.textAlign = "right";
          cell.innerHTML = lib.formatNumber(sum[i][key],true,true,2);
          cell.title = lib.formatNumber(sum[i][key],true,false)
        }
        rowsum = tabs[i-1].insertRow(-1);
        cell = rowsum.appendChild(ce("th"));
        img = cell.appendChild(ce("img"));
        img.src = "graphic/res.png"
        img.title = texts[lib.lang].resources[key];
        cell = rowsum.appendChild(ce("th"));
        cell.style.textAlign = "right";
        var val = sum[i].wood + sum[i].stone + sum[i].iron;
        cell.innerHTML = lib.formatNumber(val,true,true,2);
        cell.title = lib.formatNumber(val,true,false)
      }
      cell = row.appendChild(ce("th"));
      cell.style.textAlign = "right";
      cell.style.verticalAlign = "top";
      cell.innerHTML = lib.formatNumber(sum[3],true,true);
      cell = row.appendChild(ce("th"));
      cell.colSpan=2;
      cell.style.verticalAlign = "top";
      cell.innerHTML = sum[4] + texts[lib.lang].gui.offersVil[0] + sum[0] + texts[lib.lang].gui.offersVil[1];
      var sorter = new TableSorter(tab);
      sorter.addSortColumn(0,compareStringCell,0);
      sorter.addSortColumn(1,Storage.compareResType,0);
      sorter.addSortColumn(2,Storage.compareResType,0);
      sorter.addSortColumn(3,compareNumericCell,0);
      sorter.addSortColumn(4,compareTimeCell,0);
      sorter.addSortColumn(5,compareNumericCell,0);
    }
  },
  modMarketCall : function() {
    var tab = $("village_list");
    for( var i = 1; i < tab.rows.length; i++ ) {
      Storage.modMarketCallRow(tab.rows[i]);
    }
  },
  modMarketCallRow : function(row) {
    var storage = parseInt(row.cells[5].textContent.replace(".",""),10);
    var idx = 2;
    var spans = row.getElementsByClassName("res");
    for( var key in resInfos ) {
      var cur = parseInt(row.cells[idx].textContent.replace(".",""),10);
      var percent = Math.round( cur * 100 / storage );
      row.cells[idx].style.textAlign = "right";
      row.cells[idx].style.cursor = "default";
      row.cells[idx].style.paddingLeft = "5px";
      row.cells[idx].style.paddingRight = "5px";
      row.cells[idx].title = lib.formatNumber( storage - cur, true, false ) + " " + texts[lib.lang].gui.freeRes;
      Storage.getColors( "resource", percent, row.cells[idx] );
      idx++;
    }
  },
  compareResType : function(a,b) {
    var val = [ a.getElementsByTagName("img")[0].title, b.getElementsByTagName("img")[0].title ];
    var ret = compare(val[0],val[1]);
    if( ret == 0 )
      ret = parseInt(a.innerHTML.replace(/<[^>]+>|\./g,""),10) - parseInt(b.innerHTML.replace(/<[^>]+>|\./g,""),10)
    return ret;
  },
}
var Recruitment = {
  drillQueues : null,
  unitSum : null,
  fillInButton : null,
  massRecSumTab : null,
  variantCombo : null,
  toBuild : {},
  res : {},
  variant : null,
  unitTab: null,
  updateAll : null,
  mode : 0,
  doIt : function() {
    var id = Settings.recruAssist.assigns.match(";"+curVillage.id+",(\\d+);");
    if( id )
      id = id[1];
    else 
      id = Settings.recruAssist.defVar;
    if( !id )
      id = 0;
    if( id != 0 )
      Recruitment.variant = Settings.recruAssist.variants[Settings.getVariantIdxById("recruAssist",id)];    
    
    Recruitment.mode = lib.storage.getValue("drillqueuemode"+ownPid,1);
    Recruitment.unitSum = {};
      for( var key in serverInfo.unitInfo )
        Recruitment.unitSum[key] = 0;
    if( isOneOf(lib.params.screen,"train","barracks","stable","garage" ) && lib.params.mode != "success") {
      Recruitment.updateAll = win.TrainOverview.updateAll;
      win.TrainOverview.updateAll = function(data) { Recruitment.updateAll(data); Recruitment.initTrain(); };
      if( lib.params.mode != "mass" ) {
        if( id != 0 ) {
          win.unit_build_block.unit_max = function(unit) {
              this.cur_res = win.clone(this.dat.res);
              var amount = 999999;
              for (var res in this.cur_res) {
                amount = Math.min(amount, Math.floor((this.cur_res[res] - Recruitment.variant["keep_"+res]) / win.unit_managers.units[unit][res]));
              }
              if( typeof(Recruitment.toBuild[unit]) != "undefined" )
                amount = Math.min(amount,Recruitment.toBuild[unit]);
              if (amount < 0) 
                return 0;
              return amount;
            };
        }
        Recruitment.initTrain();
        Recruitment.modUnitTab();
        win.unit_build_block._onchange();
      }
      else {
        Recruitment.doMass();
      }
    }
    else if( lib.params.screen == "overview" ) {
      //HS _ DÜ 001-->
      var contentArray = $("content_value").getElementsByClassName("vis");
      var divContainer = [];
      for ( i = 0; i < contentArray.length; i++ ) {
        //Im neuen Style geht der Tabelle ein H4 DIV voraus. Dieses beinhaltet die Überschrift
        divContainer = getByTagName(contentArray[i],"h4","firstChild");
        if ( divContainer ) {
          //Gebäude Container
          if( texts[lib.lang].regex.building.test(divContainer.innerHTML) ) {
            var tab = contentArray[i].getElementsByClassName("vis")[0];
            if ( tab ) {
              for( var i = 0; i < tab.rows.length; i++ ) {
                var key = tab.rows[i].cells[1].getElementsByTagName("img")[0].src.match(/buildings\/([^\.]+).png/)[1];
                if( isOneOf(key,"barracks","stable","garage","snob") ) {
                  Recruitment.shrinkDrillImgList( tab.rows[i].cells[2], Settings.settings.recruit.shrinkRecruitmentMode );
                };
              };
              if( Settings.settings.recruit.showRecruitSums ) {
                Recruitment.createSumTable(tab.parentNode);
              };
            };
          };
        };
        if (i==50) {
          //Notfallausstieg. zur Zeit der Erstellung gab es 16 Container
          break;
        };
      };      
      //HS _ DÜ 001<--
    }
  },
  updateSums : function() {
    var tab = getByTagName($("train_form"),"table","firstChild");
    if( Settings.settings.recruit.showRecruitTotal ) {
      for( var i = 1; i < tab.rows.length-1; i++ ) {
        var unit = tab.rows[i].cells[0].innerHTML.match(/unit_([^\.|_]+)(_60)?\.png/)[1];
        var vals = tab.rows[i].cells[6].innerHTML.split("/");
        vals[2] = parseInt(vals[1],10)+Recruitment.unitSum[unit];
        tab.rows[i].cells[6].textContent = vals.join("/");
      }
    }
    if( Settings.settings.recruit.showRecruitSums )
      Recruitment.createSumTable(document.getElementsByTagName("form")[0]);
  },
  initTrain : function() {
    Recruitment.drillQueues = [];
    var content = $("content_value");
    var tabs = content.getElementsByClassName("vis");
    Recruitment.unitSum = {};
    for( var key in serverInfo.unitInfo )
      Recruitment.unitSum[key] = 0;
    for( var i = 0; i < tabs.length-1; i++ ) {
      if( tabs[i].rows && tabs[i].rows.length > 0 && tabs[i].rows[0].cells.length > 0 && texts[lib.lang].regex.completion.test(tabs[i].rows[0].cells[0].innerHTML) ) {
        Recruitment.drillQueues.push(new DrillQueue(tabs[i++],Recruitment.mode));
      }
    }
    Recruitment.updateSums();
  },
  shrinkDrillImgList : function(el,mode) {
    if( el.firstChild ) {
      var txt = el.textContent;
	  var imgs = el.getElementsByTagName("img");
      var sum = 0;
      var idx = 0;
      var curUnit = "";
      var units = [];
      for( var i = 0; i < imgs.length; i++ ) {
        var vals = imgs[i].title.split(" - ");
        var key = imgs[i].src.match(/unit_([^\.]+)\.png/)[1];
        units.push( { count: parseInt(vals[0],10), key: key, end: vals[1] } );
      }

/*      var strong = el.getElementsByTagName("strong");
      if( strong.length == 1 )
        el.innerHTML = "<strong>"+strong[0].innerHTML+"</strong><br/>";
      else
        el.innerHTML = "";        
*/
      switch( mode ) {
        case 0:
        case 1:
        case 2:
          el.innerHTML = "<b>"+txt+"</b>";
          var unitImgs = {};
          for( var i = 0; i < units.length; i++ ) {
          if( curUnit != units[i].key ) {
            if( mode < 2 || unitImgs[units[i].key] == null ) {
				var img = el.appendChild(ce("img"));
				img.src = "graphic/unit/unit_"+units[i].key+".png";
				sum = 0;
				if( mode == 1 )
				  curUnit = units[i].key;
				unitImgs[units[i].key] = { img: img, sum: 0 };
            }
          }
          unitImgs[units[i].key].sum += units[i].count;
          Recruitment.unitSum[units[i].key] += units[i].count;
          unitImgs[units[i].key].img.title = unitImgs[units[i].key].sum;
          if( units[i].end )
            unitImgs[units[i].key].img.title += " - " + units[i].end;
          }
          break;
        case 3:
          el.innerHTML = txt + texts[lib.lang].locale.formatDuration(texts[lib.lang].locale.timeStr2Sec(units[units.length-1].end)-lib.getTime(),true);
          el.style.textAlign="right";
          break;
        case 4:
          el.innerHTML = texts[lib.lang].locale.date2timeStr(new Date(texts[lib.lang].locale.timeStr2Sec(units[units.length-1].end)*1000),true,false);
          el.style.textAlign="right";
          break;
      }
    }
  },
  createSumTable : function(parent,before) {
    var tab = $("dsfm_unitsumtab");
    if( tab ) 
      tab.innerHTML = "";
    else {
      tab = ce("table");
      tab.id = "dsfm_unitsumtab";
      tab.className = "vis";
    }
    var rowTitle = tab.insertRow(-1);
    var rowSum = tab.insertRow(-1);
    var hasUnits = false;
    for( var key in Recruitment.unitSum ) {
      if( Recruitment.unitSum[key] > 0 ) {
        hasUnits = true;
        var cell = rowTitle.appendChild(ce("th"));
        var img = cell.appendChild(ce("img"));
        img.src = "graphic/unit/unit_"+key+".png";
        img.title = texts[lib.lang].units[key];
        cell.style.textAlign = "center";
        cell = rowSum.insertCell(-1);
        cell.style.paddingLeft = "5px";
        cell.innerHTML = lib.formatNumber(Recruitment.unitSum[key],true,true);
      }
    }
    if( hasUnits ) {
      if( before )
        parent.insertBefore(tab,before);
      else
        parent.appendChild(tab);
    }
  },
  modUnitTab : function() {
    var tab = getByTagName($("train_form"),"table","firstChild");;
    tab.rows[0].cells[0].innerHTML += " ";
    var id = Recruitment.insertVariantCombo(tab.rows[0].cells[0],lib.game_data.village.id,true);
    var a = tab.rows[0].cells[0].appendChild(ce("a"));
    a.href = "javascript:;";
    a.innerHTML = ' <img alt="#" src="graphic/rename.png"/>';
    a.addEventListener("click", function(e) { setTimeout(function() { lib.storage.setValue("settingsTab"+ownPid,"recruAssist"); location.href = lib.createLink("settings","mode","settings",false); }, 0); }, false);
    
    tab.rows[0].cells[3].innerHTML = texts[lib.lang].gui.unitsTitle;
    if( id > 0 ) {
      Recruitment.variant = Settings.recruAssist.variants[Settings.getVariantIdxById("recruAssist",id)];
      Recruitment.res = { wood: Math.max(0,curVillage.res.wood-Recruitment.variant.keep_wood), stone: Math.max(0,curVillage.res.stone-Recruitment.variant.keep_stone), iron: Math.max(0,curVillage.res.iron-Recruitment.variant.keep_iron), pop: 0 };    
      Recruitment.maxPop = Math.max(curVillage.res.pop.max-curVillage.res.pop.current-Recruitment.variant.keep_pop,0);
    }
    Recruitment.toBuild = { };
    for( var i = 1; i < tab.rows.length-1; i++ ) {
      var unit = tab.rows[i].cells[0].innerHTML.match(/unit_([^\.|_]+)(_60)?\.png/)[1];
      var input = $(unit+"_0");
      if( input ) {
        input.addEventListener("change",Recruitment.onChange,false);
        input.value = "";
      }
      var vals = tab.rows[i].cells[6].innerHTML.split("/");
      var cur = parseInt(vals[1],10)+Recruitment.unitSum[unit];
      if( id > 0 ) {
        if( cur >= Recruitment.variant[unit] ) {
          tab.rows[i].cells[7].innerHTML = texts[lib.lang].gui.recruDone;
          tab.rows[i].cells[7].className = "inactive";
        }
        else
          Recruitment.toBuild[unit] = Recruitment.variant[unit]-cur;
      }
    }
    if( id > 0 ) {
      var cell = tab.rows[i].cells[0];
      var recruBtn = getByTagName(cell,"input","lastChild");
      var input = cell.insertBefore(ce("input"),recruBtn);
      input.type = "button";
      input.style.fontSize = recruBtn.style.fontSize;
      input.value = texts[lib.lang].gui.fillIn;
      var resAvailable = { wood: Recruitment.res.wood, stone: Recruitment.res.stone, iron: Recruitment.res.iron, pop: Recruitment.maxPop };
      input.addEventListener("click",function() {
          var units = Recruitment.getBuildUnits(resAvailable,Recruitment.toBuild);
          for( var key in units ) {
            var input = $(key+"_0");
            if( input )
              input.value = units[key];
          }
          Recruitment.onChange();
        }, false);
      Recruitment.onChange();
    }
  },
  insertUnits : function(e) {
    var unit = this.id.substring(0,this.id.length-2);
    var anz = parseInt(this.textContent.match(/\((\d+)\)/)[1],10);
    var input = $(unit);
    if( anz == 0 )
      input.value = "";
    else {
      var val = parseInt(input.value,10);
      if( isNaN(val) )
        val = 0;
      input.value = val + anz;
    }
    Recruitment.onChange();
  },
  onChange : function(e) {
    var tab = getByTagName($("train_form"),"table","firstChild");;
    var cur_res = win.unit_build_block.cur_res;
    Recruitment.res = { wood: Math.max(0,cur_res.wood-Recruitment.variant.keep_wood), stone: Math.max(0,cur_res.stone-Recruitment.variant.keep_stone), iron: Math.max(0,cur_res.iron-Recruitment.variant.keep_iron), pop: Recruitment.maxPop };    
    for( var i = 1; i < tab.rows.length-1; i++ ) {
      var unit = tab.rows[i].cells[0].innerHTML.match(/unit_([^\.|_]+)(_60)?\.png/)[1];
      var input = $(unit+"_0");
      if( input ) {
        input.style.color = "";
        var val = parseInt(input.value,10);
        if( isNaN(val) ) {
          val = 0;
          input.value = "";
        }
        else if( val > 0 ) {
          if( val > Recruitment.toBuild[unit] )
            input.style.color = "#FF8914";
          for( var key in Recruitment.res ) {
            Recruitment.res[key] -= serverInfo.unitInfo[unit][key] * val;
            if( Recruitment.res[key] < 0 )
              input.style.color = "red";
          }
        }
      }
    }
    var maxUnits;
    var maxPop = Recruitment.res.pop;
    for( var i = 1; i < tab.rows.length-1; i++ ) {
      var vals = tab.rows[i].cells[6].innerHTML.split("/");
      var unit = tab.rows[i].cells[0].innerHTML.match(/unit_([^\.|_]+)(_60)?\.png/)[1];
      var cur = 0;
      var input = $(unit+"_0");
      if( input ) {
        cur = parseInt(input.value,10);
        if( isNaN(cur) )
          cur = 0;
      }
      cur += parseInt(vals[2],10);
      Recruitment.res.pop = Math.min(maxPop,serverInfo.unitInfo[unit].pop*(Recruitment.variant[unit]-cur));
      maxUnits = 24000;
      for( var key in Recruitment.res ) {
        var val = Math.floor(Recruitment.res[key]/serverInfo.unitInfo[unit][key]);
        if( val < maxUnits )
          maxUnits = val;
      }
      if( maxUnits >= 0 ) {
        var a = $(unit+"_0_a");
        if( a ) {
          a.textContent = "("+maxUnits+")";
          a.href = "javascript:;";
          a.addEventListener("click",Recruitment.insertUnits,false);
        }
      }
    }
    if( e ) {
      e.stopPropagation = true;
      e.preventDefault();
    }
    return false;
  },
  updateVariantValues : function(row) { 
    var bh = 0;
    for( var i = 1; i < row.cells.length - 6; i++ )
      bh += serverInfo.unitInfo[row.cells[i].firstChild.name].pop*parseInt(row.cells[i].firstChild.value,10);
    row.cells[i+4].innerHTML = lib.formatNumber(bh,true,true);
  },
  onVariantChanged : function(e) {
    var id = parseInt(this.value,10);
    var vid = parseInt(this.id.split("_")[2],10);
    Settings.recruAssist.assigns = Settings.recruAssist.assigns.replace(new RegExp(";"+vid+",\\d+;"),"");
    Settings.recruAssist.assigns += ";" + vid +","+id+";";
    lib.storage.setValue("recruAssist"+ownPid,Settings.recruAssist);
  },
  getBuildUnits : function(resAvailable,toBuild) {
    var resNeeded = { wood: 0, stone: 0, iron: 0, pop: 0 };
    var minfactor = 1;
    for( var res in resNeeded )
      for( var unit in toBuild ) {
        resNeeded[res] += serverInfo.unitInfo[unit][res] * toBuild[unit];
      factor = resAvailable[res] / resNeeded[res];
      if( factor < minfactor ) 
        minfactor = factor;
    }
    for( var unit in toBuild )
      toBuild[unit] = Math.floor(toBuild[unit]*minfactor);
    return toBuild;
  },
  doMass : function() {
    $("mr_all_form").parentNode.style.display = "none";
    var tab = getByTagName($("mass_train_form"),"table","previousSibling");
    var row = tab.rows[0];
    var cell = row.insertCell(-1);
    var input = cell.appendChild(ce("input"));
    input.type = "button";
    input.value = texts[lib.lang].gui.fillIn;
    input.addEventListener("click",Recruitment.doMassFillIn,false);
    Recruitment.fillInButton = input;
    input = cell.appendChild(ce("input"));
    input.type = "button";
    input.value = texts[lib.lang].gui.recruit;
    input.addEventListener("click",function() {$("mass_train_form").submit();},false);    
    tab = $("mass_train_table");
    var select = Recruitment.insertVariantCombo(tab.rows[0].appendChild(ce("th")),0);
    //return;
    select.addEventListener("change", function(e) {
        if(confirm(texts[lib.lang].gui.confirmAssignUnitVariant)) {
          var idx = tab.rows[0].cells.length-1;
          for( var i = 1; i < tab.rows.length; i++ ) {
            var select = tab.rows[i].cells[idx].firstChild;
            select.value = this.value;
            lib.fireEvent(select,"change");
          }
          this.value = 0;
        }
      }, false );
    for( var i = 1; i < tab.rows.length; i++ ) {
      var cell = tab.rows[i].insertCell(-1);
      var id = tab.rows[i].cells[0].innerHTML.match(/village=(\d+)/)[1];
      Recruitment.insertVariantCombo(cell,id);
    }
  },
  doMassFillIn : function() {
    Recruitment.fillInButton.disabled = true;
    var tab = $("mass_train_table");
    var units = [];
    var sums = { villages: 0 };
    for( var i = 3; i < tab.rows[0].cells.length-1; i++ ) {
      var unit = tab.rows[0].cells[i].innerHTML.match(/\/unit_([^\.]+)\.png/)[1];
      units.push( unit );
      sums[unit] = 0;
    }
    for( var i = 1; i < tab.rows.length; i++ ) {
      var id = tab.rows[i].cells[0].innerHTML.match(/village=(\d+)/)[1];
      var re = new RegExp(";"+id+",(\\d+);");
      var rVar = Settings.recruAssist.assigns.match(re);
      if( rVar !== null )
        rVar = parseInt(rVar[1],10);
      else
        rVar = 0;
      var bVar = Settings.buildAssist.assigns.match(re);
      if( bVar !== null )
        bVar = parseInt(rVar[1],10);
      else
        bVar = Settings.buildAssist.defVar;
      var bhmax = 0;
      if( bVar > 0 ) {
        bVar = Settings.buildAssist.variants[Settings.getVariantIdxById("buildAssist",bVar)];
      }
      var count = false;
      if( rVar > 0 ) {
        rVar = Settings.recruAssist.variants[Settings.getVariantIdxById("recruAssist",rVar)];
        if( rVar ) {
          var resAvailable = { wood: 0, stone: 0, iron: 0, pop: 0 };
          var res = tab.rows[i].cells[1].innerHTML.replace(/<br[^>]*>/g," ").replace(/<[^>]+>|\./g, "").split(" ");
          resAvailable.wood = Math.max(0,parseInt(res[0],10)-rVar.keep_wood);
          resAvailable.stone = Math.max(0,parseInt(res[1],10)-rVar.keep_stone);
          resAvailable.iron = Math.max(0,parseInt(res[2],10)-rVar.keep_iron);
          res = tab.rows[i].cells[2].innerHTML.split("/");
          resAvailable.pop = Math.max(0,parseInt(res[1],10)-parseInt(res[0],10)-rVar.keep_pop);
          
          var toBuild = { };
          for( j = 3; j < tab.rows[i].cells.length; j++ ) {
            var idx = j-3;
            var img = tab.rows[i].cells[j].getElementsByTagName("img")[0];
            if( img ) {
              var cur = parseInt(img.parentNode.parentNode.textContent,10);
              if( img.title )
                cur += parseInt(img.title,10);
              toBuild[units[idx]] = Math.max(0,rVar[units[idx]]-cur);
            }
          }
          toBuild = Recruitment.getBuildUnits(resAvailable,toBuild);
          for( var key in toBuild ) {
            if( toBuild[key] > 0 ) {
              $(key+"_"+id).value = toBuild[key];
              sums[key] += toBuild[key];
              count = true;
            }
          }
          if( count )
            sums.villages++;
        }
      }
      tab.rows[i].parentNode.style.display = count ? "" : "none";
    }
    Recruitment.fillInButton.disabled = false;
    if( !Recruitment.massRecSumTab ) {
      tab = tab.parentNode.insertBefore(ce("table"),tab);
      var rowTitle = tab.insertRow(-1);
      var rowVal = tab.insertRow(-1);
      for( var key in sums ) {
        var cell = rowTitle.appendChild(ce("th"));
        cell.style.textAlign = "center";
        cell.style.width = "60px";
        cell.innerHTML = key == "villages" ? texts[lib.lang].gui.villages : '<img src="graphic/unit/unit_'+key+'.png" title="'+texts[lib.lang].units[key]+'"/>';
        cell = rowVal.insertCell(-1);
        cell.style.textAlign = "right";
      }
      Recruitment.massRecSumTab = tab;
    }
    else
      tab = Recruitment.massRecSumTab;
    var idx = 0;
    for( var key in sums )
      tab.rows[1].cells[idx++].innerHTML = lib.formatNumber(sums[key],true,true);
  },
  insertVariantCombo : function(parent,vid,reload) {
    var id = Settings.recruAssist.assigns.match(";"+vid+",(\\d+);");
    if( id )
      id = id[1];
    else if( vid > 0 )
      id = Settings.recruAssist.defVar;
    else
      id = 0;
    var select;
    if( Recruitment.variantCombo === null ) {
      select = ce("select");
      select.size = 1;
      select.id = "dsfm_recruvar_"+vid;
      //sake-->
      //select.options[0] = new Option(texts[lib.lang].gui.selectVariantOption,0,true,false);
      //for( var i = 0; i < Settings.recruAssist.variants.length; i++ )
      //  select.options[i+1] = new Option(Settings.recruAssist.variants[i].name,Settings.recruAssist.variants[i].id,false,false);
      select.options.add( new Option(texts[lib.lang].gui.selectVariantOption,0,true,false) );
      for( var i = 0; i < Settings.recruAssist.variants.length; i++ )
        select.options.add( new Option(Settings.recruAssist.variants[i].name,Settings.recruAssist.variants[i].id,false,false) );
      //sake<--  
      Recruitment.variantCombo = select;
    }
    select = Recruitment.variantCombo.cloneNode(true);
    select.id = "dsfm_recruvar_"+vid;
    select.value = id;
    parent.appendChild(select);
    if( vid > 0 ) {
      select.addEventListener("change", Recruitment.onVariantChanged, false );
      if( reload )
        select.addEventListener("change", function(e) {document.location.reload();}, false );
    }
    return vid == 0 ? select : id;
  },
}
var HotKeys = {
  hotKeys: [],
  doIt : function() {
    window.addEventListener("keydown", HotKeys.keyDownHandler, false );
    window.addEventListener("keyup", HotKeys.keyUpHandler, false );
  },
  keyDownHandler : function(e) {
    CoordSelector.keyDown(e);
  },
  keyUpHandler : function(e) {
    CoordSelector.keyUp(e);
    var name = e.target.nodeName.toUpperCase();
    if( Settings && Settings.settings.misc.useHotKeys ) {
      if( name == "INPUT" && isOneOf(e.target.type.toUpperCase(),"TEXT","PASSWORD") && e.target.id != "dsfm_coords")
        return;
      if( name != "TEXTAREA" ) {
        var mod = HotKeys.getModifierKeys(e);
        for( var i = 0; i < HotKeys.hotKeys.length; i++ ) {
          if( HotKeys.hotKeys[i].key.modifier == mod.val && HotKeys.hotKeys[i].key.keyCode == e.keyCode ) {
            if( HotKeys.hotKeys[i].func )
              HotKeys.hotKeys[i].func(e,mod);
            if( HotKeys.hotKeys[i].href )
              location.href = HotKeys.hotKeys[i].href;
            if( HotKeys.hotKeys[i].event ) {
              lib.fireEvent( HotKeys.hotKeys[i].event.node, HotKeys.hotKeys[i].event.event );
            }
          }
        }
      }
    }
  },
  getModifierKeys : function(e) {
    var mod = { text: "", val: 0 };
    if( e.ctrlKey ) {
      mod.text += texts[lib.lang].gui.keys[17] + " + ";
      mod.val |= 1;
    }
    if( e.altKey ) {
      mod.text += texts[lib.lang].gui.keys[18] + " + ";
      mod.val |= 2;
    }
    if( e.shiftKey ) {
      mod.text += texts[lib.lang].gui.keys[16] + " + ";
      mod.val |= 3;
    }
    return mod;
  },
  add : function(grp,key,action) {
    var hk, txt = "";
    if( Settings.settings.misc.useHotKeys ) {
      if( typeof(grp) == "string" && Settings.hotKeys[grp] && Settings.hotKeys[grp][key] )
        hk = Settings.hotKeys[grp][key];
      else {
        hk = { keyCode: grp, modifier: key, text: arguments[3] };
      }
      if( hk.keyCode > 0 ) {
        if( typeof( action ) == "string" ) {
          if( arguments.length == 4 ) {
            HotKeys.hotKeys.push( { key: hk, event: { event: action, node: arguments[3] } } );
          }
          else
            HotKeys.hotKeys.push( { key: hk, href: action } );
        }
        else
          HotKeys.hotKeys.push( { key: hk, func: action } );
        txt = hk.text;
      }
    }
    return txt;
  },
}
var Sounds = {
  doIt : function() {
    var key = isUV ? "attUVAccs" : "attOwnAcc";
    var markers = lib.storage.getValue("markers"+ownPid,{incs:0,report:false,igm:false,forum:false,supports:0});
    var curIncs = 0;
    var curSups = 0;
    var headerInfo = $("#header_info tr:first td:last");
    if( headerInfo ) {
      var el = headerInfo[0];
      if( /unit\/att\.png/.test(el.innerHTML) ) {
        var row = el.getElementsByTagName("table")[1].rows[0];
        //curIncs = parseInt(row.cells[1].textContent.match(/\((\d+)\)/)[1],10);
       // if( curIncs > markers.incs && Settings.sounds[key].active ) {
        //  Sounds.play(key);
       //}
      }
      if( /support\.png/.test(el.innerHTML) ) {
        var row = el.getElementsByTagName("table")[1].rows[0];
        curSups = row.cells[row.cells.length-1].textContent.match(/\((\d+)\)/)[1];
        if( curSups > markers.supports && Settings.sounds.support.active )
          Sounds.play("support");
      }
      if( Settings.sounds.attDone.active && curIncs < markers.incs ) {
        Sounds.play("attDone");
      }
      if( Settings.sounds.supportDone.active && curSups < markers.supports ) {
        Sounds.play("supportDone");
      }
      markers.incs = curIncs;
      markers.supports = curSups;
    }
    var row = $("menu_row");
    if( row && Settings.sounds.report.active ) {
      if( /new_report/.test(row.innerHTML) ) {
        if( !markers.report ) {
          Sounds.play("report");
          markers.report = true;
        }
      }
      else if( markers.report )
        markers.report = false;
    }
    if( row && Settings.sounds.igm.active ) {
      if( /new_mail/.test(row.innerHTML) ) {
        if( !markers.igm ) {
          Sounds.play("igm");
          markers.igm = true;
        }
      }
      else if( markers.igm )
        markers.igm = false;
    }
    if( row && Settings.sounds.forum.active ) {
      if( / new_post/.test(row.innerHTML) ) {
        if( !markers.forum ) {
          Sounds.play("forum");
          markers.forum = true;
        }
      }
      else if( markers.forum )
        markers.forum = false;
    }
    if( Settings.sounds.session.active ) {
      if( /name=\"sid_refresh_password/.test(document.body.innerHTML) || /sid_wrong\.php/.test(document.location.href)) {
        Sounds.play("session");
      }
    }
    if( ownPid )
      lib.storage.setValue("markers"+ownPid,markers);
  },
  play : function(key) {
    var audio = new Audio(); // document.body.appendChild(ce("audio"));
    audio.src = Settings.sounds[key].url;
    audio.volume = Settings.sounds[key].volume/100;
    audio.play();
    if( Settings.sounds[key].loop )
      audio.addEventListener("ended",function() { audio.play(); } ,false);
  },
}
/** var SLSwitcher = {
*/
var SLSwitcher = {
  sl : null,
  cell : null,
  span : null,
  moDiv : null,
  doIt : function() {
    SLSwitcher.sl = $("quickbar_outer");
    if( SLSwitcher.sl ) {
      switch( Settings.settings.misc.slSwitcher ) {
        case 1:
          var row = $ ("menu_row");
          SLSwitcher.cell = row.insertCell(-1);
          SLSwitcher.cell.className = "menu-item";
          var a = SLSwitcher.cell.appendChild(ce("a"));
          a.href = "javascript:;";
          a.appendChild(document.createTextNode(texts[lib.lang].gui.slTitle));
          SLSwitcher.span = a.appendChild(ce("span"));
          SLSwitcher.set(lib.storage.getValue("sl"+ownPid,true));
          a.addEventListener("click", SLSwitcher.toggle, false );
          break;
        case 2:
          SLSwitcher.moDiv = SLSwitcher.sl.parentNode.insertBefore(ce("div"),$("header_info"));
          SLSwitcher.moDiv.style.position = "relative";
          SLSwitcher.moDiv.style.width = "200px"; //SLSwitcher.moDiv.parentNode.offsetWidth+"px";
          SLSwitcher.moDiv.style.top = "-2px";
          SLSwitcher.moDiv.style.left = ((SLSwitcher.moDiv.parentNode.offsetWidth-200)/2)+"px";
          SLSwitcher.moDiv.style.height = "4px";
          SLSwitcher.moDiv.style.border = "1px solid rgba(128,64,0,0.4)";
          SLSwitcher.moDiv.style.backgroundColor = "rgba(241,235,221,0.4)";
          SLSwitcher.moDiv.style.display = "none";
          SLSwitcher.moDiv.addEventListener("mouseover", function() { SLSwitcher.show(true); }, false);
          SLSwitcher.show(false);
          break;
      }
    }
  },
  toggle : function(e) {
    var on = !lib.storage.getValue("sl"+ownPid,true);
    SLSwitcher.set(on);
    lib.storage.setValue("sl"+ownPid,on);
  },
  show : function(show) {
    if( show ) {
      SLSwitcher.moDiv.style.display = "none";
      SLSwitcher.sl.style.display = "";
      setTimeout(function(){document.body.addEventListener("mousemove",SLSwitcher.onMouseMove,false)},0);
    }
    else {
      SLSwitcher.sl.style.display = "none";
      SLSwitcher.moDiv.style.display = "";
      document.body.removeEventListener("mousemove",SLSwitcher.onMouseMove,false);
    }
  },
  set : function(on) {
    if( on ) {
      SLSwitcher.span.textContent = String.fromCharCode(9650);
      SLSwitcher.cell.title = texts[lib.lang].gui.slOff;
      SLSwitcher.sl.style.display = "";
    }
    else {
      SLSwitcher.span.textContent = String.fromCharCode(9660);
      SLSwitcher.cell.title = texts[lib.lang].gui.slOn;
      SLSwitcher.sl.style.display = "none";
    }
  },
  onMouseMove: function(e) {
    var el = SLSwitcher.sl;
    var pos = lib.getElementPos(SLSwitcher.sl);
    var y = e.clientY + self.pageYOffset;
    var x = e.clientX + self.pageXOffset;
    if( y < pos[1] || y > pos[1] + SLSwitcher.sl.offsetHeight || x < pos[0] || x > pos[0]+SLSwitcher.sl.offsetWidth) {
      SLSwitcher.show(false);
    }
  }
}
/** var CoordSelector = {
/* Was macht diese Funktion?
*/
var CoordSelector = {
  ctrlDown : false,
  coordRange : false,
  curElement : null,
  addCoordSpans : function(node) {
    if( node.parentNode.nodeName.toUpperCase() != "TEXTAREA" ) {
      if( node.nodeType == 3 && node.nodeValue ) {
        var res = node.nodeValue.match(/\d{1,3}\|\d{1,3}/g);
        var pos = 0;
        if( res && (res.length > 1 || node.parentNode.firstChild != node) ) {
          var cp = node.nodeValue.indexOf(res[0]);
          var oldValue = node.nodeValue;
          node.nodeValue = node.nodeValue.substr(pos, cp);
          var span = ce('span');
          span.innerHTML = res[0];
          if( node.nextSibling )
            node.parentNode.insertBefore( span, node.nextSibling );
          else
            node.parentNode.appendChild( span );
          var rest = document.createTextNode(oldValue.substr(cp+res[0].length));
          if( span.nextSibling )
            node.parentNode.insertBefore( rest, span.nextSibling );
          else
            node.parentNode.appendChild(rest);
        }
      }
    }
    var child = node.firstChild;
    while (child != null) {
        addCoordSpans(child);
        child = child.nextSibling;
    }
  },
  selectCoords : function(e) {
    if( CoordSelector.ctrlDown ) {
      var el = document.elementFromPoint(e.pageX - document.documentElement.scrollLeft,e.pageY - document.documentElement.scrollTop);
      if( el != CoordSelector.curElement ) {
        var sel = window.getSelection();
        if( CoordSelector.coordRange ) {
          sel.removeAllRanges();
          CoordSelector.coordRange = false;
        }
        CoordSelector.curElement = el;
        el = el.firstChild;
        while( el && el.nodeType != 3 )
          el = el.nextSibling;
        if( el && el.nodeValue ) {
          var res = el.nodeValue.match(/(\d{1,3}\|\d{1,3})/g);
          if( res ) {
            if( res.length == 1 ) {
              var idx = el.nodeValue.indexOf(res[0]);
              var range = document.createRange();
              range.setStart(el,idx);
              range.setEnd(el,idx+res[0].length);
              sel.removeAllRanges();
              sel.addRange(range);
              CoordSelector.coordRange = true;
            }
            else
              CoordSelector.addCoordSpans(curElement);
          }
        }
      }
    }
  },
  keyDown : function(e) {
    if( e.keyCode == 17 )
      CoordSelector.ctrlDown = true;
  },
  keyUp : function(e) {
    if( e.keyCode == 17 ) {
      CoordSelector.ctrlDown = false;
      if( CoordSelector.coordRange ) {
        window.getSelection().removeAllRanges();
        CoordSelector.coordRange = false;
      }
    }
  }
}
/** var NavBarSwitcher = {
/* Was macht diese Funktion?
*/
var NavBarSwitcher = {
  topBar: null,
  topBarShadow: null,
  topContainer: null,
  menuRow: null,
  footerDiv: null,
  moDiv: null,
  doIt: function() {
    if( Settings.settings.misc.navBarSwitcher ) {
      NavBarSwitcher.moDiv = document.body.appendChild(ce("div"));
      NavBarSwitcher.moDiv.style.position ="fixed";
      NavBarSwitcher.moDiv.style.top = "0px";
      NavBarSwitcher.moDiv.style.left = "0px";
      NavBarSwitcher.moDiv.style.width = "100%";
      NavBarSwitcher.moDiv.style.height = "4px";
      NavBarSwitcher.moDiv.style.zIndex = "10000";
      NavBarSwitcher.moDiv.addEventListener("mouseover", function() { NavBarSwitcher.show(true); }, false);
      
      var footer = $("linkContainer");
      NavBarSwitcher.topContainer = $("topContainer");
      NavBarSwitcher.topBar = document.getElementsByClassName("top_bar")[0];
      NavBarSwitcher.shadowBar = document.getElementsByClassName("top_shadow")[0];
      NavBarSwitcher.menuRow =  $("main_layout").rows[0];

      var icons = NavBarSwitcher.topContainer.getElementsByClassName("icon header");
      var before = footer.firstChild;
      var a = footer.insertBefore(ce("a"),before);
      var td = $("topdisplay");
      a.textContent = td.getElementsByClassName("rank")[0].textContent + " - ";
      a.href = td.getElementsByTagName("a")[0].href;
      for( var i = 0; i < icons.length; i++ ) {
        var lnk = getByTagName(icons[i],"a","parentNode"); 
        a = footer.insertBefore(ce("a"),before);
        a.href = lnk.href;
        a.title = lnk.title;
        a.appendChild(icons[i].cloneNode(true));
      }
      if( icons.length > 0 ) 
        footer.insertBefore(document.createTextNode(" - "),before);
      NavBarSwitcher.show(false);
    }
    if( Settings.settings.misc.fixHead ) 
      NavBarSwitcher.fixHead();
    if( Settings.settings.misc.removeAMIcons ) {
      var e = $("topTable").getElementsByClassName("manager_icon");
      e[0].parentNode.style.display = "none";
    }
  },
  show : function(show) {
    if( show ) {
      NavBarSwitcher.shadowBar.style.display = "";
      NavBarSwitcher.menuRow.style.display = "";
      NavBarSwitcher.topBar.style.top = "0px";
      document.body.addEventListener("mousemove", NavBarSwitcher.onMouseMove, false);
    }
    else {
      document.body.removeEventListener("mousemove", NavBarSwitcher.onMouseMove, false);
      NavBarSwitcher.shadowBar.style.display = "none";
      NavBarSwitcher.menuRow.style.display = "none";
      NavBarSwitcher.topBar.style.top = "-44px";
    }
  },
  onMouseMove: function(e) {
    var el = e.target;
    if( el != NavBarSwitcher.moDiv && el != NavBarSwitcher.topBar && !isChildOf(el, NavBarSwitcher.topContainer.parentNode.parentNode)) {
      NavBarSwitcher.show(false);
    }
  },
  fixHead: function() {
    var el = $("quickbar_outer");
    var con = $("contentContainer");
    var td = el.parentNode;
    var tab = td.insertBefore(ce("table"),con);
    var ph = td.insertBefore(ce("table"),con);
    tab.className = "shadedBG";
    tab.style.zIndex = 5;
    tab.width = con.offsetWidth+"px";
    tab.style.position = "fixed";
    var row = tab.insertRow(-1);
    var cell = row.insertCell(-1);
    cell.appendChild(el);
    el = $("header_info");
    row = tab.insertRow(-1);
    cell = row.insertCell(-1);
    cell.appendChild(el);
    ph.style.height = (tab.offsetHeight) + "px";
    ph.width = "100%";
    var x = lib.getElementPos(tab)[0];
    window.addEventListener("scroll", function() { tab.style.left = x-self.pageXOffset+"px" }, false );
    window.addEventListener("resize", function() { tab.style.left = ""; x = lib.getElementPos(tab)[0]; tab.style.left = x-self.pageXOffset+"px" }, false);
  },
}
/** var PrivateVillageName = {
/* Was macht diese Funktion?
*/
var PrivateVillageName = {
  names: {},
  colors: { publicName: "#FFCD7C", privateName: "#D7FF75" },
  doIt : function() {
    if( Settings.settings.misc.privateNames ) {
      PrivateVillageName.names = lib.storage.getValue("villageNames"+ownPid,{});
      PrivateVillageName.modAll();
      if( lib.params.screen == "main" )
        PrivateVillageName.modMain();
      if( lib.params.screen == "report" && lib.params.get("view",0) > 0 ){
        var labelText = $("labelText");
        var res = labelText.textContent.match(texts[lib.lang].regex.commands.attacked);
        if( !res ) 
          res = labelText.textContent.match(texts[lib.lang].regex.commands.conquer);
        if( res ) {
          var id = PrivateVillageName.names[res[2]+"_"+res[3]];
          if( id ) {
            labelText.parentNode.title = res[1];
            labelText.textContent = labelText.textContent.replace(res[1],PrivateVillageName.names[id]);
          }
        }
      }
    }
  },
  modAll : function() {
    var e = $("open_groups");
    if( e )
      e.addEventListener("click", PrivateVillageName.modVillagePopup, false);
    var key = "overview";
    switch( lib.params.screen ) {
      case "snob":
        if( lib.params.mode == "coin" )
          key = "snob";
        break;
      case "overview_villages":
        switch( $("overview").value ) {
          case 'buildings':
            //key = 'main';
            break;
          case 'tech':
            key = 'smith';
            break;
        }
    }
    var lnk = document.evaluate("//a[(contains(@href,'screen="+key+"') and not(contains(@href,'_villages')) or contains(@href,'info_village')) and not(contains(@class,'village_switch_link'))]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
   
    for( var i = 0; i < lnk.snapshotLength; i++ ) {
      var a = lnk.snapshotItem(i);
      var res = a.href.match(new RegExp("village=(\\d+)&screen="+key+"$|info_village&id=(\\d+)$"));
      if( res ) {
        var id = res[1] ? res[1] : res[2];
        if( lib.params.screen == "info_player" && a.parentNode.parentNode.parentNode.parentNode.id=="villages_list")
          PrivateVillageName.makeEditable(a,id);
        PrivateVillageName.modVillageLink(a,id);          
      }
    }
    lnk = document.evaluate("//a[contains(@href,'screen=info_command&id=') or contains(@href,'screen=report') and contains(@href,'view=')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    for( var i = 0; i < lnk.snapshotLength; i++ )
      PrivateVillageName.modCommand(lnk.snapshotItem(i));
  },
  modMain : function() {
    var tab = document.evaluate("//web.archive.org/web/20170408204311/http://form/[contains(@action,'change_name')]/table", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);
    var row = tab.insertRow(-1);
    var cell = row.insertCell(-1);
    var input = cell.appendChild(ce("input"));
    input.type = "text";
    input.value = PrivateVillageName.names[lib.game_data.village.id] ? PrivateVillageName.names[lib.game_data.village.id] : "";
    input.size = 32;
    input.maxLength = 32;
    input.id = "dsfm_private_name";
    cell = row.insertCell(-1);
    input = cell.appendChild(ce("input"));
    var inputs = tab.getElementsByTagName("input");
    input.type = "button";
    input.value = inputs[1].value;
    input.addEventListener("click", function() {
        var name = $("dsfm_private_name").value.replace(/^\s*|\s*$/,"");
        var a = document.evaluate("//web.archive.org/web/20170408204311/http://td/[@id='menu_row2_village']/a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);
        if( name == "" ) {
          delete PrivateVillageName.names[lib.game_data.village.id];
          delete PrivateVillageName.names[lib.game_data.village.coord.replace("|","_")];
          a.textContent = a.title;
          a.title = "";
        }
        else {
          PrivateVillageName.names[lib.game_data.village.id] = name;
          PrivateVillageName.names[lib.game_data.village.coord.replace("|","_")] = lib.game_data.village.id;
          if( a.title == "" )
            a.title = a.textContent;
          a.textContent = inputs[2].value;
        }
        lib.storage.setValue("villageNames"+ownPid,PrivateVillageName.names);
      }, false );
    inputs[0].style.backgroundColor = PrivateVillageName.colors.publicName;
    inputs[2].style.backgroundColor = PrivateVillageName.colors.privateName;
  },
  showEdit : function(e) {
    var id = this.parentNode.id.substring(6);
    var label = $("label_"+id);
    var edit = $("edit_"+id);
    var inputs = edit.getElementsByTagName("input");
    inputs[0].style.backgroundColor = PrivateVillageName.colors.privateName;
    inputs[0].value = PrivateVillageName.names[id] ? PrivateVillageName.names[id] : "";
    inputs[0].setAttribute("onkeydown", "if (event.keyCode == 13) {$(this).next().next().click(); return false;}");
    inputs[1].style.display = "none";
    inputs[2].style.display = "";
    label.style.display = "none";
    edit.style.display = "";
  },
  submitPrivateEdit : function() {
    var id = this.parentNode.id.substring(5);
    var label = $("label_"+id);
    var labelText = $("label_text_"+id);
    var edit = $("edit_"+id);
    var inputs = edit.getElementsByTagName("input");
    inputs[0].style.backgroundColor = PrivateVillageName.colors.publicName;
    inputs[0].setAttribute("onkeydown", "if (event.keyCode == 13) {$(this).next().click(); return false;}");
    inputs[1].style.display = "";
    inputs[2].style.display = "none";
    label.style.display = "";
    edit.style.display = "none";
    var name = inputs[0].value.replace(/^\s*|\s*$/,"");
    var a = document.evaluate("//web.archive.org/web/20170408204311/http://td/[@id='menu_row2_village']/a[contains(@href,'village="+id+"')]",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
    var res = labelText.textContent.match(texts[lib.lang].regex.villageLink);
    if( !res ) {
      switch(lib.params.screen) {
        case "info_village":
          res = this.parentNode.parentNode.parentNode.parentNode.rows[1].textContent.match(/(\d{1,3})\|(\d{1,3})/);
          break;
        case "info_player":
          res = this.parentNode.parentNode.parentNode.cells[this.parentNode.parentNode.cellIndex+1].textContent.match(/(\d{1,3})\|(\d{1,3})/);
          break;
      }
    }
    if( name == "" ) {
      labelText.textContent = labelText.textContent.replace(PrivateVillageName.names[id],labelText.parentNode.title);
      delete PrivateVillageName.names[res[1]+"_"+res[2]];
      delete PrivateVillageName.names[id];
      if(a) {
        a.textContent = labelText.parentNode.title;
        a.title = "";
      }
      labelText.parentNode.title = "";
    }
    else {
      labelText.parentNode.title = inputs[3].value;
      labelText.textContent = labelText.textContent.replace(PrivateVillageName.names[id] ? PrivateVillageName.names[id] : inputs[3].value,name);
      PrivateVillageName.names[id] = name;
      PrivateVillageName.names[res[1]+"_"+res[2]] = id;
      if( a ) {
        a.textContent = name;
        a.title = inputs[3].value;
      }
    }
    setTimeout(function() {lib.storage.setValue("villageNames"+ownPid,PrivateVillageName.names)},0);
    inputs[0].value = inputs[3].value;
  },
  submitPublicEdit : function() {
    var id = this.parentNode.id.substring(5);
    var editInput = $("edit_input_"+id);
    var labelText = $("label_text_"+id);
    if( PrivateVillageName.names[id] ) {
      $("dsfm_name_"+id).value = editInput.value;
      labelText.parentNode.title = editInput.value;
      labelText.addEventListener("DOMSubtreeModified",function(e) {
          labelText.textContent = labelText.textContent.replace(editInput.value,PrivateVillageName.names[id]);
          this.removeEventListener("DOMSubtreeModified",arguments.callee,false);
        }, false);
    }
  },
  makeEditable : function(a,id) {
    var span = a.parentNode.appendChild(ce("span"));
    span.id = "label_"+id;
    span.appendChild(a);
    var name = a.textContent;
    a.innerHTML = '<span id="label_text_'+id+'">'+name+'</span>';
    var span = a.parentNode.parentNode.appendChild(ce("span"));
    span.id = "edit_"+id;
    span.style.display = "none";
    var input = span.appendChild(ce("input"));
    input.type = "text";
    input.id = "edit_input_"+id;
    input.setAttribute("onkeydown","if (event.keyCode == 13) {$(this).next().click(); return false;}");
    input.value = name;
    input = span.appendChild(ce("input"));
    input.type = "button";
    input.addEventListener("click",PrivateVillageName.submitPrivateEdit, false);
    input.value = texts[lib.lang].gui.ok_btn;
  },
  modVillageLink : function(a,id) {
    if( a.parentNode.id == "label_"+id ) {
      var labelText = $("label_text_"+id);
      var editInput = $("edit_input_"+id);
      if( PrivateVillageName.names[id] ) {
        a.title = editInput.value;
        labelText.textContent = labelText.textContent.replace(a.title,PrivateVillageName.names[id]);
      }
      var renLnk = a.parentNode.getElementsByClassName("rename-icon");
      if( renLnk.length > 0 )
        renLnk[0].title = texts[lib.lang].gui.publicName;
      var ar = a.parentNode.appendChild(ce("a"));
      ar.title = texts[lib.lang].gui.privateName;
      ar.className = "rename-icon";
      ar.href = "javascript:;";
      ar.innerHTML = "&nbsp;";
      ar.addEventListener("click",PrivateVillageName.showEdit,false);
      var edit = $("edit_"+id);
      var inputs = edit.getElementsByTagName("input");
      inputs[0].style.backgroundColor = PrivateVillageName.colors.publicName;
      var input = edit.appendChild(ce("input"));
      input.type="button";
      input.value = inputs[1].value;
      input.style.display = "none";
      input.addEventListener("click",PrivateVillageName.submitPrivateEdit,false);
      input = edit.appendChild(ce("input"));
      input.type = "hidden";
      input.value = inputs[0].value;
      input.id = "dsfm_name_"+id;
      inputs[1].addEventListener("click",PrivateVillageName.submitPublicEdit, false);
    }
    else {
      if( PrivateVillageName.names[id] ) {
        res = a.textContent.match(texts[lib.lang].regex.villageLink);
        if( res ) {
          a.title = a.textContent.substring(0,a.textContent.length - res[0].length).replace(/^\s*|\s*$/,"");
          a.textContent = PrivateVillageName.names[id] + " " + res[0];
        }
        else {
          a.title = a.textContent;
          a.textContent = PrivateVillageName.names[id];
        }
      }
    }
  },
  modCommand : function(a) {
    for( var re in texts[lib.lang].regex.commands ) {
      var res = a.textContent.match(texts[lib.lang].regex.commands[re]);
      if( res ) {
        var key = res[2]+"_"+res[3];
        var id = PrivateVillageName.names[key];
        if( id ) {
          a.innerHTML = a.innerHTML.replace(res[1],PrivateVillageName.names[id]);
          a.title = res[1];
        }
        return;
      }
    }
  },
  modVillageInfo : function(tab) {
    var name = tab.rows[0].cells[0].textContent.replace(/^\s*|\s*$/,"");
    tab.rows[0].cells[0].innerHTML = "";
    var a = tab.rows[0].cells[0].appendChild(ce("a"));
    a.href = lib.createLink("info_village", "id", lib.params.id, false);
    a.textContent = name;
    a.style.color = "black";
    a.style.cursor = "default";
    PrivateVillageName.makeEditable(a,lib.params.id);
    PrivateVillageName.modVillageLink(a,lib.params.id);
    var h2 = document.evaluate("//web.archive.org/web/20170408204311/http://td/[@id='content_value']/h2",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
    h2.textContent = a.textContent;
    a.parentNode.addEventListener("DOMSubtreeModified", function(e) {
        h2.textContent = this.firstChild.textContent;
        h2.title = this.firstChild.title;
      }, false );
  },
  modVillagePopup : function(e) {
    var tab = $("group_popup_content_container");
    if( tab ) {
      var a = tab.getElementsByTagName("a");
      for( var i = 0; i < a.length; i++ ) {
        var res = a[i].href.match(/selectVillage\(\s*(\d+)/);
        if( res ) {
          if( PrivateVillageName.names[res[1]] ) {
            a[i].title = a.textContent;
            a[i].textContent = PrivateVillageName.names[res[1]];
          }
        }
      }
    }
    else
      setTimeout( PrivateVillageName.modVillagePopup, 100 );
  },
}

var serverInfo = new lib.ServerInfo("speed,unit_speed,game/base_config,game/tech,snob/max_dist,game/fake_limit,snob/factor,night/active,night/start_hour,night/end_hour,misc/kill_ranking",true,true);

var buildingKeys = {};
var resKey = {};
var resInfos = {wood: { img: "holz.png?a3702", bonus: 1},
                 stone: { img: "lehm.png?6c9bd", bonus: 2 },
                 iron: { img: "eisen.png?0e9e5", bonus: 3} };

if( lib.game_data ) {
  ownPid = parseInt(lib.game_data.player.id,10);
}
if( isUV )
  ownPid = parseInt(lib.params.t,10);

var nofarms = lib.storage.getValue( "nofarms"+ownPid, "");
var useeq = lib.storage.getValue( "useeq"+ownPid, true );
var otherVillages = lib.storage.getValue("otherVillages",{});
var myVillages = lib.storage.getValue("myVillages"+ownPid,{});

Settings.doIt();
if( lib.game_data ) {
  curVillage = new MyVillage(lib.game_data.village.id);
  coords = lib.game_data.village.coord.split("|");
  if( isNaN(curVillage.coords.x) ) {
    curVillage.coords.x = parseInt(coords[0],10);
    curVillage.coords.y = parseInt(coords[1],10);
    curVillage.save();
  }
}
for( var key in resInfos )
  resKey[texts[lib.lang].resources[key]] = key;
for( var key in serverInfo.buildingInfo )
  buildingKeys[texts[lib.lang].buildings[key]] = key;
if( Settings.settings.misc.coordSelector )
  window.addEventListener("mousemove", CoordSelector.selectCoords, false);

run();
showTime();

function run() {
  Sounds.doIt();
  RunTimes.doIt();
  
  if( !lib.game_data )
    return;
    
  HotKeys.doIt();
  if( /groups.php/.test(location.href) )
    Groups.modGroupTable("groups");

  Common.doIt();
  moveAttSymbols();
  Storage.doIt();
  Recruitment.doIt();
  Place.doIt();
  Map.doIt();
  Report.doIt();
  InfoVillage.doIt();
  OV.doIt();
  InfoPlayer.doIt();
  Groups.doIt();
  BuildAssist.doIt();
  SLSwitcher.doIt();
  NavBarSwitcher.doIt();
  PrivateVillageName.doIt();
//HSX wars.doIt();  
}

function showTime() {
  var e = $('serverTime');
  if( e ) {
    var span = e.parentNode.appendChild(ce("span"));
    if( msg ) {
      span.style.color = "red";
      span.title = msg;
    }
    span.appendChild(document.createTextNode("Dei_pack3: " + (new Date().getTime()-start) + "ms"));
  }
}
function moveAttSymbols() {
  var headerInfo = $("header_info");
  if( headerInfo ) {
    var el = headerInfo.rows[0].cells[headerInfo.rows[0].cells.length-1];
    if( /unit\/att|support\.png/.test(el.innerHTML) ) {
      switch( Settings.settings.misc.moveAtts ) {
        case 0:
          el.parentNode.insertBefore(el,el.parentNode.cells[0]);
          break;
        case 1: 
          el.parentNode.insertBefore(el,el.parentNode.cells[1]);
          break;
        case 2:
          el.parentNode.insertBefore(el,el.parentNode.cells[1]);
          el.align = "center";
          break;
        case 3:
          el.align = "right";
          el.parentNode.insertBefore(el,el.parentNode.cells[1]);
          break;
        case 4:
          break;
      }
    }
  }
}

function cleanUp() {
  var last = lib.storage.getValue("lastcleanup",0);
  var ts = lib.getTime();
  if( ts - last > 3600 ) {
    lib.storage.setValue( "lastcleanup", ts );
    cleanUpCommands();
    doCleanUpKey("rids", ts - Settings.settings.misc.reportMaxAge * 86400);
    doCleanUpKey("beute", ts - Settings.settings.map.sumHours * 3600);
    var returns = lib.storage.getValue("returns",{});
    for( var key in returns ) {
      var res = doCleanUpStr(returns[key],ts);
      if( res.data == "" )
        delete returns[key];
      else
        returns[key] = res.data;
    }
    lib.storage.setValue("returns",returns);
  }
}
function doCleanUpKey(key,minTS) {
  var data = lib.storage.getValue(key);
  if( data ) {
    var res = doCleanUpStr(data,minTS);
    lib.storage.setValue(key,res.data);
    return res.data;
  }
  return "";
}
function doCleanUpStr(data,minTS) {
  var ret = { deleted: 0, data: "" };
  data = data.split(";");
  for( var i = 0; i < data.length; i++ ) {
    var parts = data[i].split(",");
    if( parseInt(parts[0],10) > minTS )
      ret.data += data[i] + ";";
    else
      ret.deleted++;
  }
  return ret;
}
function getValidArrivals(a) {
  var count = 0;
  var ts = lib.getTime();
  for( var i = 0; i < a.length; i++ ) {
    if( a[i] > ts )
      count++;
  }
  return count;
}
function cleanUpCommands() {
  cmds = lib.storage.getValue("commands"+ownPid,{});
  var ts = lib.getTime();
  var off = { attacks: Settings.settings.place.maxAttAge*3600, supports: 0, incs: 0 };
  for(var vil in cmds) {
    var cnt = 0;
    for( var type in cmds[vil] ) {
      var arrivals = [];
      var minTS = ts - off[type]
      for( var i = 0; i < cmds[vil][type].length; i++ ) {
        if( cmds[vil][type][i] > minTS ) {
          arrivals.push(cmds[vil][type][i]);
          cnt++;
        }
      }
      cmds[vil][type] = arrivals;
    }
    if( cnt == 0 )
      delete cmds[vil];
  }
  lib.storage.setValue("commands"+ownPid,cmds);
}
function clearAllInfos() {
  if( confirm( texts[lib.lang].gui.confirm_delAll ) ) {
    lib.storage.clear();
    alert( texts[lib.lang].gui.allDataDeleted );
  }
}
function deleteVillageInfos(coords) {
  delete otherVillages[coords];
  lib.storage.setValue("otherVillages",otherVillages);
  atts = lib.storage.getValue("atts", "").replace(new RegExp("\\d+,\\d+,"+coords+"\\d+;","g"), "");
  lib.storage.setValue("atts",atts);
  nofarms = lib.storage.getValue("nofarms"+ownPid,"").replace(new RegExp(coords+";","g"), "");
  lib.storage.setValue("nofarms"+ownPid,nofarms);
}

function isOneOf(val) {
  if( arguments.length > 1 )  {
    for( var i = 1; i < arguments.length; i++ )
      if( arguments[i] == val )
        return true;
  }
  return false;
}
function compareStringCell(a,b) {
  return compare(a.textContent,b.textContent);
}
function compareNumericCell(a,b) {
  var a = a.innerHTML.replace(/<[^>]+>|\./g, "");
  var b = b.innerHTML.replace(/<[^>]+>|\./g, "");
  a = parseFloat(a);
  b = parseFloat(b);
  return compare(a,b);
}
function compareOrderCell(a,b) {
  return parseInt(a.getAttribute("dsfm_order"))-parseInt(b.getAttribute("dsfm_order"));
}
function compareTimeCell(a,b) {
  return texts[lib.lang].locale.timeStr2Sec(a.textContent) - texts[lib.lang].locale.timeStr2Sec(b.textContent);
}
function compareDurationCell(a,b) {
  return texts[lib.lang].locale.parseDuration(a.textContent) - texts[lib.lang].locale.parseDuration(b.textContent);
}
function compare(a,b) {
  if( a > b )
    return 1;
  else if( a < b )
    return -1;
  return 0;
}

function getBuildingsTab(buildings, change, katas ) {
  var rows = ['','','',''];
  var colidx = 0;
  var i = 0;
  for( var key in serverInfo.buildingInfo ) {
    if( buildings[key].level > 0 ) {
      rows[0] += '<td style="background-color:'+colBgColor[colidx]+'; text-align:center; width:25px"><img src="graphic/buildings/'+key.replace("_f1","")+'.png"/></td>';
      rows[1] += '<td style="background-color:'+colBgColor[colidx]+'; text-align:center;">'+buildings[key].level+'</td>';
      rows[2] += '<td style="background-color:'+colBgColor[colidx]+'; text-align:center; color:';
      if( isNaN(buildings[key].change))
        rows[2] += 'grey;">---';
      else if( buildings[key].change < 0 )
        rows[2] += 'red;">' + buildings[key].change;
      else if(buildings[key].change > 0 )
        rows[2] += 'green;">+' + buildings[key].change;
      else
        rows[2] += 'grey;">0';
      rows[2] += '</td>';
      rows[3] += '<td style="background-color:'+colBgColor[colidx]+'; text-align:center;">'+Place.katasNeeded.destroy[buildings[key].level]+'</td>';
      colidx ^= 1;
    }
  }
  var html = '<table cellspacing="0" style="border: 1px solid rgb(222, 211, 185);"><tr>'+rows[0]+'<td/></tr><tr>'+rows[1];
  if( change || katas )
    html += '<td>'+texts[lib.lang].gui.level+'</td>';
  if(change)
    html += '</tr><tr>'+rows[2]+'<td><b style="color: green">+</b><b style="color:red">-</b></td>';

  if(katas)
    html += '</tr><tr>'+rows[3]+'<td><img src="graphic/unit/unit_catapult.png" border="0" alt'+texts[lib.lang].gui.catas+'"/></td>';
  html += '</tr></table>';
  return html;
}
function getUnitsTab(units) {
  if( typeof(units["spear"]) == "undefined" )
    return "Keine";

  var colidx = 0;
  var row = ["",""];
  for( var key in serverInfo.unitInfo ) {
    if( units[key] > 0 ) {
      row[0] += '<td style="background-color:'+colBgColor[colidx]+'; text-align:center"><img src="graphic/unit/unit_'+key+'.png" border="0"/></td>';
      row[1] += '<td style="background-color:'+colBgColor[colidx]+'; text-align:center">'+units[key]+'</td>';
      colidx ^= 1;
    }
  }
  return '<table cellspacing="0" style="border: 1px solid rgb(222, 211, 185);"><tr>'+row[0]+'</tr><tr>'+row[1]+'</tr></table>';
}
function showReportAge(ts, key) {
  var span = $( "dsfm_"+key+"_age" );
  span.style.display = "none";
  if( Settings.settings.popup.showReportAge ) {
    var age = (lib.getTime() - ts);
    if( age / 3600 > Settings.settings.popup.minReportAge ) {
      var str = "";
      var val = Math.floor(age / 86400);
      if( val > 0 )
        str += val + " " + texts[lib.lang].gui.days[val==1?0:1] + " ";
      age %= 86400;
      if( age > 0 ) {
        val = Math.floor(age / 3600);
        if( val > 0 )
          str += val + texts[lib.lang].gui.hours + " ";
        age %= 3600;
        if( age > 0 ) {
          val = Math.floor(age / 60);
          if( val > 0 )
            str += val + texts[lib.lang].gui.minutes;
        }
      }
      span.innerHTML = texts[lib.lang].gui.age + ": " + str;
      span.style.display="";
    }
  }
}
function createPrioLinks(tab,headlines,footlines,col,noCounter) {
  var order = 1;
  for( var i = headlines; i < tab.rows.length - footlines; i++ ) {
    var cell = tab.rows[i].cells[col];
    if( !noCounter )
      cell.innerHTML = order + " ";
    if( order > 1 ) {
      var a = cell.appendChild(ce("a"));
      a.href = "javascript:;";
      a.textContent = String.fromCharCode(9650);
      a.addEventListener("click", function(e) { moveTabRow(e,-1,col); }, false );
//      input.addEventListener("click", function(e) { reorderTable(this.parentNode.parentNode, -1, col); }, false );
    }
    if( order < tab.rows.length-headlines-footlines ) {
      var a = cell.appendChild(ce("a"));
      a.href = "javascript:;";
      a.textContent = String.fromCharCode(9660);
	  a.addEventListener("click", function(e) { moveTabRow(e, 1, col); }, false );
    }
    order++;
  }
}
function moveTabRow(e,dir,prioCol) {
  var a = e.target.parentNode.parentNode;
  var b = dir == 1 ? a.nextSibling :  a.previousSibling;
  for( var i = 0; i < a.cells.length; i++ ) {
    if( i != prioCol ) {
      var tmp = a.cells[i];
      a.replaceChild(b.cells[i],tmp);
      b.insertCell(i);
      b.replaceChild(tmp,b.cells[i]);
    }
  }
}

function $(id) {
  return document.getElementById(id);
}
function ce(name) {
  return document.createElement(name);
}
function getByTagName(node,nodeName,what,count) {
  if( typeof count == "undefined" )
    count = 1;
  nodeName = nodeName.toUpperCase();
  node = node[what];
  if( what == "firstChild" )
    what = "nextSibling";
  else if( what == "lastChild" )
    what = "previousSibling";
  while( node && node.nodeName.toUpperCase() != nodeName )
    node = node[what];
  if( count == 1 )
    return node;
  else
    return getByTagName(node,nodeName,what,count-1);
}
function isChildOf(child,parent) {
  do {
    child = child.parentNode;
  } while( child != document.body && child != parent );
  return child == parent;
}

function escapeHTML(str,sep) {
  var ret = "";
  if ( str ) {
    if ( !sep ) sep ="";
    for(var i = 0; i < str.length; i++) {
      var c = str.charAt(i);
      switch (c) {
        case '&':
          ret += "&amp;";
          break;
        case '<':
          ret += "&lt;";
          break;
        case '>':
          ret += "&gt;";
          break;
        default:
          ret += c+sep;
      }
    }
  }
  return ret;
}
function outerHTML(el,display) {
  var html = "<" + el.nodeName;
  var style = false;
  for( var i = 0; i < el.attributes.length; i++ ) {
    var val = el.attributes[i].value;
    if( arguments.length == 2 && el.attributes[i].name == "style" ) {
      if( /display/.test(val) )
        val = val.replace(/display:\s*[^;]+;/,"display:"+arguments[1]+";");
      else
        val += "; display:" + arguments[1] + ";";
      style = true;
    }
    html += " " + el.attributes[i].name + '="' + val + '"';
  }
  if( !style && arguments.length == 2 )
    html += ' style="display:' + display +';"';
  html += ">" + el.innerHTML + "</" + el.nodeName +">";
  return html;
}
function unwrap(obj) {
  return (obj && obj.wrappedJSObject) ? obj.wrappedJSObject : obj;
}

function bindColorPicker() {
  var matchClass = new RegExp('(^|\\s)(dsfm_color)\\s*(\\{[^}]*\\})?', 'i');
  var e = document.getElementsByTagName('input');
  for(var i=0; i<e.length; i+=1) {
    var m;
    if(!e[i].color && e[i].className && (m = e[i].className.match(matchClass))) {
      var prop = {};
      if(m[3]) {
        try {
          eval('prop='+m[3]);
        } catch(eInvalidProp) {}
      }
      e[i].color = new ColorPicker(e[i], prop);
    }
  }
}
// ColorPicker based on jscolor from http://jscolor.com
function ColorPicker(target, prop) {
  var THIS = this;
  this.images = { pad : [ 181, 101 ], sld : [ 16, 101 ], cross : [ 15, 15 ], arrow : [ 7, 11 ] };
  this.required = true; // refuse empty values?
  this.adjust = true; // adjust value to uniform notation?
  this.hash = true; // prefix color with # symbol?
  this.caps = true; // uppercase?
  this.valueElement = target; // value holder
  this.styleElement = target; // where to reflect current color
  this.hsv = [0, 0, 1]; // read-only  0-6, 0-1, 0-1
  this.rgb = [1, 1, 1]; // read-only  0-1, 0-1, 0-1
  this.pickerOnfocus = true; // display picker on focus?
  this.pickerMode = 'HSV'; // HSV | HVS
  this.pickerPosition = 'bottom'; // left | right | top | bottom
  this.pickerFace = 10; // px
  this.pickerFaceColor = '#F7EED3'; // CSS color
  this.pickerBorder = 2; // px
  this.pickerBorderColor = '#804000'; // CSS color
  this.pickerInset = 1; // px
  this.pickerInsetColor = 'ThreeDShadow ThreeDHighlight ThreeDHighlight ThreeDShadow'; // CSS color
  this.pickerZIndex = 10000;
  this.picker = null;
  for(var p in prop) {
    if(prop.hasOwnProperty(p)) {
      this[p] = prop[p];
    }
  }
  this.hidePicker = function() {
    if(isPickerOwner()) {
      removePicker();
    }
  };
  this.showPicker = function() {
    if(!isPickerOwner()) {
      var tp = lib.getElementPos(target); // target pos
      var ts = [target.offsetWidth, target.offsetHeight]
      var vp = [window.pageXOffset, window.pageYOffset]; // view pos
      var vs = [window.innerWidth, window.innerHeight]; // view size
      var ps = [ // picker size
        2*this.pickerBorder + 4*this.pickerInset + 2*this.pickerFace + THIS.images.pad[0] + 2*THIS.images.arrow[0] + THIS.images.sld[0],
        2*this.pickerBorder + 2*this.pickerInset + 2*this.pickerFace + THIS.images.pad[1]
      ];
      var a, b, c;
      switch(this.pickerPosition.toLowerCase()) {
        case 'left': a=1; b=0; c=-1; break;
        case 'right':a=1; b=0; c=1; break;
        case 'top':  a=0; b=1; c=-1; break;
        default:     a=0; b=1; c=1; break;
      }
      var l = (ts[b]+ps[b])/2;
      var pp = [ // picker pos
        -vp[a]+tp[a]+ps[a] > vs[a] ?
          (-vp[a]+tp[a]+ts[a]/2 > vs[a]/2 && tp[a]+ts[a]-ps[a] >= 0 ? tp[a]+ts[a]-ps[a] : tp[a]) :
          tp[a],
        -vp[b]+tp[b]+ts[b]+ps[b]-l+l*c > vs[b] ?
          (-vp[b]+tp[b]+ts[b]/2 > vs[b]/2 && tp[b]+ts[b]-l-l*c >= 0 ? tp[b]+ts[b]-l-l*c : tp[b]+ts[b]-l+l*c) :
          (tp[b]+ts[b]-l+l*c >= 0 ? tp[b]+ts[b]-l+l*c : tp[b]+ts[b]-l-l*c)
      ];
      drawPicker(pp[a], pp[b]);
    }
  };
  this.importColor = function() {
    if(!THIS.valueElement) {
      this.exportColor();
    } else {
      if(!this.adjust) {
        if(!this.fromString(THIS.valueElement.value, leaveValue)) {
          THIS.styleElement.style.backgroundColor = THIS.styleElement.jscStyle.backgroundColor;
          THIS.styleElement.style.color = THIS.styleElement.jscStyle.color;
          this.exportColor(leaveValue | leaveStyle);
        }
      } else if(!this.required && /^\s*$/.test(THIS.valueElement.value)) {
        THIS.valueElement.value = '';
        THIS.styleElement.style.backgroundColor = THIS.styleElement.jscStyle.backgroundColor;
        THIS.styleElement.style.color = THIS.styleElement.jscStyle.color;
        this.exportColor(leaveValue | leaveStyle);
      } else if(this.fromString(THIS.valueElement.value)) {
        // OK
      } else {
        this.exportColor();
      }
    }
  };
  this.exportColor = function(flags) {
    if(!(flags & leaveValue) && THIS.valueElement) {
      var value = this.toString();
      if(this.caps) { value = value.toUpperCase(); }
      if(this.hash) { value = '#'+value; }
      THIS.valueElement.value = value;
    }
    if(!(flags & leaveStyle) && THIS.styleElement) {
      THIS.styleElement.style.backgroundColor =
        '#'+this.toString();
      THIS.styleElement.style.color =
        0.213 * this.rgb[0] +
        0.715 * this.rgb[1] +
        0.072 * this.rgb[2]
        < 0.5 ? '#FFF' : '#000';
    }
    if(!(flags & leavePad) && isPickerOwner()) {
      redrawPad();
    }
    if(!(flags & leaveSld) && isPickerOwner()) {
      redrawSld();
    }
  };
  this.fromHSV = function(h, s, v, flags) { // null = don't change
    h<0 && (h=0) || h>6 && (h=6);
    s<0 && (s=0) || s>1 && (s=1);
    v<0 && (v=0) || v>1 && (v=1);
    this.rgb = HSV_RGB(
      h===null ? this.hsv[0] : (this.hsv[0]=h),
      s===null ? this.hsv[1] : (this.hsv[1]=s),
      v===null ? this.hsv[2] : (this.hsv[2]=v)
    );
    this.exportColor(flags);
  };
  this.fromRGB = function(r, g, b, flags) { // null = don't change
    r<0 && (r=0) || r>1 && (r=1);
    g<0 && (g=0) || g>1 && (g=1);
    b<0 && (b=0) || b>1 && (b=1);
    var hsv = RGB_HSV(
      r===null ? this.rgb[0] : (this.rgb[0]=r),
      g===null ? this.rgb[1] : (this.rgb[1]=g),
      b===null ? this.rgb[2] : (this.rgb[2]=b)
    );
    if(hsv[0] !== null) {
      this.hsv[0] = hsv[0];
    }
    if(hsv[2] !== 0) {
      this.hsv[1] = hsv[1];
    }
    this.hsv[2] = hsv[2];
    this.exportColor(flags);
  };
  this.fromString = function(hex, flags) {
    var m = hex.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i);
    if(!m) {
      return false;
    } else {
      if(m[1].length === 6) { // 6-char notation
        this.fromRGB(
          parseInt(m[1].substr(0,2),16) / 255,
          parseInt(m[1].substr(2,2),16) / 255,
          parseInt(m[1].substr(4,2),16) / 255,
          flags
        );
      } else { // 3-char notation
        this.fromRGB(
          parseInt(m[1].charAt(0)+m[1].charAt(0),16) / 255,
          parseInt(m[1].charAt(1)+m[1].charAt(1),16) / 255,
          parseInt(m[1].charAt(2)+m[1].charAt(2),16) / 255,
          flags
        );
      }
      return true;
    }
  };
  this.toString = function() {
    return (
      (0x100 | Math.round(255*this.rgb[0])).toString(16).substr(1) +
      (0x100 | Math.round(255*this.rgb[1])).toString(16).substr(1) +
      (0x100 | Math.round(255*this.rgb[2])).toString(16).substr(1)
    );
  };
  function RGB_HSV(r, g, b) {
    var n = Math.min(Math.min(r,g),b);
    var v = Math.max(Math.max(r,g),b);
    var m = v - n;
    if(m === 0) { return [ null, 0, v ]; }
    var h = r===n ? 3+(b-g)/m : (g===n ? 5+(r-b)/m : 1+(g-r)/m);
    return [ h===6?0:h, m/v, v ];
  }
  function HSV_RGB(h, s, v) {
    if(h === null) { return [ v, v, v ]; }
    var i = Math.floor(h);
    var f = i%2 ? h-i : 1-(h-i);
    var m = v * (1 - s);
    var n = v * (1 - s*f);
    switch(i) {
      case 6:
      case 0: return [v,n,m];
      case 1: return [n,v,m];
      case 2: return [m,v,n];
      case 3: return [m,n,v];
      case 4: return [n,m,v];
      case 5: return [v,m,n];
    }
  }
  function removePicker() {
    delete THIS.picker.owner;
    document.getElementsByTagName('body')[0].removeChild(THIS.picker.boxB);
  }
  function drawPicker(x, y) {
    if(!THIS.picker) {
      THIS.picker = {
        box : ce('div'),
        boxB : ce('div'),
        pad : ce('div'),
        padB : ce('div'),
        padM : ce('div'),
        sld : ce('div'),
        sldB : ce('div'),
        sldM : ce('div')
      };
      for(var i=0,segSize=4; i<THIS.images.sld[1]; i+=segSize) {
        var seg = ce('div');
        seg.style.height = segSize+'px';
        seg.style.fontSize = '1px';
        seg.style.lineHeight = '0';
        THIS.picker.sld.appendChild(seg);
      }
      THIS.picker.sldB.appendChild(THIS.picker.sld);
      THIS.picker.box.appendChild(THIS.picker.sldB);
      THIS.picker.box.appendChild(THIS.picker.sldM);
      THIS.picker.padB.appendChild(THIS.picker.pad);
      THIS.picker.box.appendChild(THIS.picker.padB);
      THIS.picker.box.appendChild(THIS.picker.padM);
      THIS.picker.boxB.appendChild(THIS.picker.box);
    }
    var p = THIS.picker;
    // recompute controls positions
    posPad = [
      x+THIS.pickerBorder+THIS.pickerFace+THIS.pickerInset,
      y+THIS.pickerBorder+THIS.pickerFace+THIS.pickerInset ];
    posSld = [
      null,
      y+THIS.pickerBorder+THIS.pickerFace+THIS.pickerInset ];
    // controls interaction

    p.box.addEventListener( "mouseup", function() { target.focus(); }, false );
    p.box.addEventListener( "mouseout", function() { target.focus(); }, false );
    p.box.addEventListener( "mousedown", function() { abortBlur=true; } , false );
    p.box.addEventListener( "mousemove", function(e) { holdPad && setPad(e); holdSld && setSld(e); }, false );
    p.padM.addEventListener( "mouseup", function() { if(holdPad) { holdPad=false; lib.fireEvent(THIS.valueElement,'change'); } }, false )
    p.padM.addEventListener( "mouseout", function() { if(holdPad) { holdPad=false; lib.fireEvent(THIS.valueElement,'change'); } }, false );
    p.padM.addEventListener( "mousedown", function(e) { holdPad=true; setPad(e); }, false );

    p.sldM.addEventListener( "mouseup", function() { if(holdSld) { holdSld=false; lib.fireEvent(THIS.valueElement,'change'); } }, false );
    p.sldM.addEventListener( "mouseout", function() { if(holdSld) { holdSld=false; lib.fireEvent(THIS.valueElement,'change'); } }, false );
    p.sldM.addEventListener( "mousedown", function(e) { holdSld=true; setSld(e); }, false );
    // picker
    p.box.style.width = 4*THIS.pickerInset + 2*THIS.pickerFace + THIS.images.pad[0] + 2*THIS.images.arrow[0] + THIS.images.sld[0] + 'px';
    p.box.style.height = 2*THIS.pickerInset + 2*THIS.pickerFace + THIS.images.pad[1] + 'px';
    // picker border
    p.boxB.style.position = 'absolute';
    p.boxB.style.clear = 'both';
    p.boxB.style.left = x+'px';
    p.boxB.style.top = y+'px';
    p.boxB.style.zIndex = THIS.pickerZIndex;
    p.boxB.style.border = THIS.pickerBorder+'px solid';
    p.boxB.style.borderColor = THIS.pickerBorderColor;
    p.boxB.style.background = THIS.pickerFaceColor;
    // pad image
    p.pad.style.width = THIS.images.pad[0]+'px';
    p.pad.style.height = THIS.images.pad[1]+'px';
    // pad border
    p.padB.style.position = 'absolute';
    p.padB.style.left = THIS.pickerFace+'px';
    p.padB.style.top = THIS.pickerFace+'px';
    p.padB.style.border = THIS.pickerInset+'px solid';
    p.padB.style.borderColor = THIS.pickerInsetColor;
    // pad mouse area
    p.padM.style.position = 'absolute';
    p.padM.style.left = '0';
    p.padM.style.top = '0';
    p.padM.style.width = THIS.pickerFace + 2*THIS.pickerInset + THIS.images.pad[0] + THIS.images.arrow[0] + 'px';
    p.padM.style.height = p.box.style.height;
    p.padM.style.cursor = 'crosshair';
    // slider image
    p.sld.style.overflow = 'hidden';
    p.sld.style.width = THIS.images.sld[0]+'px';
    p.sld.style.height = THIS.images.sld[1]+'px';
    // slider border
    p.sldB.style.position = 'absolute';
    p.sldB.style.right = THIS.pickerFace+'px';
    p.sldB.style.top = THIS.pickerFace+'px';
    p.sldB.style.border = THIS.pickerInset+'px solid';
    p.sldB.style.borderColor = THIS.pickerInsetColor;
    // slider mouse area
    p.sldM.style.position = 'absolute';
    p.sldM.style.right = '0';
    p.sldM.style.top = '0';
    p.sldM.style.width = THIS.images.sld[0] + THIS.images.arrow[0] + THIS.pickerFace + 2*THIS.pickerInset + 'px';
    p.sldM.style.height = p.box.style.height;
    try {
      p.sldM.style.cursor = 'pointer';
    } catch(eOldIE) {
      p.sldM.style.cursor = 'hand';
    }
    // load images in optimal order
    switch(modeID) {
      case 0:
        p.pad.style.background = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALUAAABlCAIAAACEDzXRAAAKQ0lEQVR42u2d23IjKwxFBeRh5v8/9uQlzXlI2gGELoCEm6pxubp6PI69WoV3C20uIQPAH4A/AH/p41/pDcTxP4BPGDtq3vYJGPpv8craeRdo/fyTI8ZhHnodOGgcV/3rnx8QI0SABO2xfAbiCfVR8Wj+CD8jenbRJNyGOxLoAaH1iLu4EUEHAv1+MsQ4zLE4AiIOcpibv4u9OET6+cP4ASnJ1JH4/G60A9km+GbBxLlpKAkADoR2JnaBrvWD/x1GCZn9EYLEHqVfI6Efx0D7E9tDF/rBSJ54l8FqTUse0J+EvxPrdK0fD4aOLXQi7zyGxMaRvvWjjH2U8o9I44OKnf+wyCpHoR/Phk6d/COq8481YrNI3/qR2B+kMl1Fl6J8o/JrU/GEA6HdiB2ha/0YBVx7rFwNHAj9JuIl6EI/qKyJug4Yvg7xA0QEpB8nQe8itoQu9EOT8M3mTsqUSUzykH6cBO1PbA9d91+ShDzV9xrtcgW21IT6L0yfcS90FKCdw+wS6Q9ISWjVfLTVVT2mdiPGGRduFKWm7dBStWlLmI0j/QExdgp7gT5qCu2BLKiLqtc94hI7PB8auQP4KuyIvSJ960fUqXWcd2F48Khr1bHSj2dDp/afmg7tMrFxpG/9mHMFuqrH3spFw0s0Bgr9OAzamdgFutaPpMuqo6WVEXWJdSL14xhof2J76MKfS2yXWGOVB1WXXGOVdxFSx587CXoLsTE0689RH7VW4RMLeKI9wPpzz4XeS2wDzdbXR52AWStjwiSAA6HdiB2h1f6cqT0whzzuzz0LejuxATTy90Xt40v7CzdGRvKS4O/zQ0AiXaRW5x/dv4vS4A/a308LYR5pFquRRvlHIrKWoCj5woCVId4eR/KPNDjURg2tdEC7rSQN5B9DYR70X5YivVxft7AyrOvrD4V2JnaBJurr+qpemLEywlRhT6qvPx16C7ExdK0fSjcj0maAzsqgBt7rfIxGP46B9iT2gi70I842bNj0U4wd/WAG/L5VP3p0W4iNoYv6Oh6eoJmSMW5laIzF8iT1TtgeV9RZoZ7QvdEUzsQu0CP+HOMKDFoZvDFg6s89CNqf2B5a4e8Hts84W0pgeohBtspBXYp8H3Tk/H23MBtHuvbn5mp7dlU9TUkP+XNJMabzHdCIbnuYDSItzZ+bdgUWrAwNPhwInRxw1/wXuYGj+4vo7flboRpjEQ6EjgojYK9/K04NFfNTauEBypXQWQLAfqQoHl9CfvpQ6C3ExtC9/q2YW2u6X1JWzfsYFPKX3L99LrQ/sT10XR+jKh+UN2AxlDOyXfLQaxxf/fkvT4d2JnaBZv258M6h4IFu2Em7/sezoLcQG0Mjfy6xrqLnVBLGWHw1i69WP5LCCn0TNEL3DLNXpCV/n5oo5jAVLY5Em6i8Pwm6uSNuCrNxpNX+nDira20qqyZriv384xhoZ2IX6Lr/wg8eiwpXYGQqPEgjsBrX+er3X46B9ie2h6bX/4i6IfcLS2mIY++7TfoCuLj6hwgN89CwBJ3Gx8rOVsn0kQ48tDS/4X1L8SzMb3BbkGdtwsD05AbP9YOU8xui+uljZei/P/3qx2HQbsSO0Ar/lveHLZYCVK4GeN1P5N+eAb2R2Aya9ueUY+8dlhLtdhWvgfEfz4AeGf9hR2wcaeTPpacvRdzLTx8J/Qq1Ij995PrJ3/mp0p8LO5YyF0s215g/9yxoZ2IXaLo+FiwtgTlvIAznp4+G3khsBk3Pf5mYvqOwMqZnNnw3i9cRDoT2JPaCZuvreskDuXkHxfQMvfbBgdBbiI2hC/3QLCg6lESZZkrfJ7nSj3gWNEMcRkYJsf5L0BXENBl1WV8/aquMLM9/eSJ0UtxZmFGGg4MigZ75ovHnvsOcUX09zRbzjCrU/K/Rev0gT2i2vu4cZrNI1+sH2e49Yb3lRC6e9fSS9ETohjj7hdkx0rQ/57/rxIrhBQdCv494Hlrtz1lo30Qjz1z+cRh02ndTNIMm1j8NxtmePs+76i+/esJHrH/6dGh/YntoRf9l2RtQWgJXzY4bdtbqx0OhnYldoHv7I79jf4+rOGGaRWr14yToLcTG0Ky/v32rjAsdX9S5vgI4ENqT2Asa7Z/9vq0yStiGNNVHkOe/RGmqwBQ0jEDHFpoJ85BLN+jPaRoHGWl2/2yx3msxVRHjZ0Td4GfV/Bf9bCM1dBiBfrHeJ1HR6dKEedDf5yPdBLilp/efC3Ribb1VxlUHGQe8iTb0598+Hdqf2B6a3b9SOerezsoIBWaJ3IBn1fp0j4PeQmwMzc5/idLK3UZWRkmKX2zA4Vc/DoPeSGwGrdvfY24RpKmVjrLuCQdCuxE7Qkv64TZ3Z44dVPrxUOh3EK9C1/lHGpz7ZzpVsYTF7K8Hyj+Ogd5FbAk9uL9H9LIyYg821sjo13gYtD+xPbRU/9Ds/b1sZTTIr5OStMGHA6GdiV2gUf2UmQcfJdUbXOoe6HoN1A0b2uQD4EBosXJqQTwKnXvXAEX+oZlfGaS9ewetDGCLeV1exH4e9Mr+2TDpv2iggYFW+LdBsTbngv/yUroGH0jleEX7MOgtxMbQ7PzKoMuajKyM8pYIiB194HnQzsQu0Gp/LvpulVHylsgK/TgG2p/YHrqXf6T3bJUBhfxFWUDPg95CbAytm/+ycasM9WOxWu0PnTniLWE2iLRi/4Z3bJXRvY76s0+Arl93I3aMNOHPBce2PdSkL7Kpnwe9l9gGutCPoFgkUtytXAGbex0vKCznSOs00o+ToLcQG0N/QErCrG6jrTIynVUDwo896vCzssPrNnAYtD+xPfR9fwmKeu/CVhm5OAn1STPkvhxBW1KXjeP60Y/DoJ2JXaAL/RCPy+PXc80L9d7OV294dVPbC/fb4EDoLcTG0IV+TCDrrIxMHIFg512BWj9OgvYk9oK+9SMoZG55q/JMiGS40/sLjacu28T3MVfd0Aha+u3QJXr+0Q//MBtHutaPQOzh3H0RBoZS5OJ/MjqJ9x2vQb7qgSuvX0StH0+FLptzrvTDh9gl0oV+iAbi2lAsqNmbK3yBAyLNdbRzW8Y6Btqf2B76A2IURE2zZY16KGfZlwqofJSL4feABka+xCNX+ekx0LuILaFr/Zit7s4ZA7y5Qg2sDr/t4zDodxCvQt/6occctDKGriMPzH85D9qN2BG61g/QwcLSVDSGl78C6LePY6A3EptBf0BKcjWWH/GqyJqoxKnMufEVBLJxAJwJ7U9sDH3fX0CxnIB4orMyuilTyRh6g+0bfDgQ2p/YHrrQD+jV6qb/SdRrMit8TRWwyEabxgFwJrQnsQt0rR+LR3VqFNiGHRBv73ge9EZiM+haPyicuRcVmIxzAMTMl9wfi3sGtBuxF3ShH92C29yJTteU+ohbRrZk3Qe9hdgY+tYPnOqanA+mTN33ZGKE06HQbsQu0LV+MF8+94rU5dK8B8/KyJaI+6D9ie2hC/3Q12QnSnYLn5p9P/6d0D7EltAh5wz/Hv8exON/LUjHOuz5CksAAAAASUVORK5CYII=') 0 0 no-repeat";
        break;
      case 1:
        p.pad.style.background = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALUAAABlCAIAAACEDzXRAAAK+ElEQVR42u2d7ZLkrA2FD55N5d2q3P+tZv8A+fFu92JAXyD1mCRdXS6Pd7bnsQqrhY4EqQL4C/gL+Ekff0q/QBz/DfyC7aj5tV8YoX82V/bOp0D757844tHMpuvgoEe76q//+pExe9X7scyO3TtPjtPL3bv74Dr8cd2r/X/tu9zPp/T5ds7gtp8xfnyH0BmTJQZhh6mlR5NLNi4zm5Th709M3oyPytq5DoOjStRZRi6EUabWrtxAPgY6gBgIg/5RMBvpDH6RnsaGk/cZhX4Ix+ewcp7jMGhvYiAMevh+qQP+lL1I7q95FMsMv8689Qg+emvWVXtDlyjoHeLcEwNhlr77D9DIhcAfzNteoZALwVtodnUI4gqdY6HXiEd7IszSPzIzgKs6UhoN/noUM7gHkr8JdrSfBx1GDIRBE/6DH+TqG1qm236dB70zbhAGPZvfUuELRVrJsZ3ZSSJ1E1ix/HnQfsRAGPQwf9FETWKQd38UNQHfRrR3HrQ3MRAGPeQ/9LOuyqaa7lOBLPGuzhYXoMs6dHGADjAzEGbp2fyWYhftPORuihQyMeBSZmwZuq5DVzdoVzMDYZZ+fb/U2ZHP7VE2b1J5Y1aP+QAmq0ek28+DdiEeJYvZNR9o2n9AQc3PyjP3j0UBDrP/OAZ6h3i8Ad2EdgW6iU+rTiFQagOvR3FNEpi6PCn+OAM6gBgIg777DyZ2KrrYOs8fxawLqYuz/vJQaG9iIAx6yI9Vi1Q+Hd65l7oy++saqbxqUwnHQLsSA2HQRP0HFDk8USHIshggpvo8kpCPhvYgBsKgfxS9MGDXCbxkgA395UHQYcRAGDTtP7BKbZS6vAWN86C3iZX63Ao0HX8wcy/G66n1/SoVJmBRygAtZVTVFFcZ6hU2Q70XNPFmzoK+nx0tTcxfNLm9QiSZFPVBVRIGYNNfxG9zZpRYoKtOzVBXnq6Z2Rh/bFnaor98Nr/upL88DjqAeDO/zuovhREG6lJuj01V61N6dVF/OQPalVhZn7wC/fIfVToWs45BtQqIHybisGrGo6FjiKn+Bgdou/+w+D69y/sm/5Fl6Pws/zGlQxg0EX+IuZvxJE9OqH+pdMPRdEKg1l+gG9FsQUVRNEdp6mx0+osHMRAGzfa/8NqAn9TFSAJ2/eUAaG9ivT5nhib6X/iSSGVuL2tTepraSEv+4wDoHeIs6PvZEZqtX7dm9XKfx5tdMyT2XPOnz4XeSZ4O+txaCpWvX68B2oCuFe3j+ssedNmCrgHQUn5s19Ib+q1CWxSbFD+u3+5BV39o5WjgJVyEWZqt/wDbkye6vy+bvyusmqGWMs6AdiUGwqDZ+rGqm+KO1F/CVFEzud2Yvzwd2ptY7H9Zh1bXnxZ2Vl5n1F/azMcoDDjVnz4ROoAYCIPerl+v9NjOqlUpvqN+/fuhXYmV63/s1K/rGzOqQjj6uj2KeSO/7tT/8hRoF+KGtfMf/LpYK9D2/jlGfu68Xp4n1wv9SWH9c4+D3iG2+I9daCL+qIrEjRhbf6n0ObGla7v/9lnQAcRAGPQwfxG1AbGE7JpMBcTiMVESMPbvPxramxgIg57l103JPCpwurhUQp2x79X8Kutm96D5JBNs0HozV4EYCLM0W7+un6TvSV1PWoonbyXXY6C3+2831w/ybcZoxna2/I8w/eUp0GHEQBi0Zf1C5WqA1+tdBFVR8xe21y98NLQTsajfrkNvrH9adl21UnV2Xf/0KdA7xPk1LHT1H1vQrusnv8FfwzsTqYQnrZ/8DdCO6ydff75fotdP1i8MLmZtLoPUJbYaOa2//hToAGKlPrcCTccfenmg2kK96qm8nA3tRAyEQRP9L2stO2/e11HcdWJtbSydeZ8IHUMMhEET/S/wcX/7/g6qB/I8aFdiIAz6Hn8ou3Y0UZP0VV43lueUusiXWJH++I8C1SqoS9BKMxddOE3EH5mW+DXpsmqc3xbjrOtva6c+qrZOvALmt2K1bxJaSSL39yhGfe5lZihq7fkqQ7LEUJ0f216KJ69m8vzS6h9cPyiSuMt/FLn/ZR1anV9XJnvT7Z1jNp7wHA08dPaE9t3co4VGmKUV+3tsCF7ftLnHqdDLoydOTlTs76EhTeRX+ae89XnQfsRKfW4Feml/jwJcd/xr5vvKSslK2P4eD4L2JgbCoO37e1x3/HFsJ9Wj6KRmnAcdQAyEQbPrw4CmvljefHsU14QBv/rkJ0K7Emvyp6v7e2Rr4f2b+prdQbrdhDLT+5H9PR4BHUMMhEHT/kPP3iE3Y9u6rbp9ZSm92SlcC3SxSF3VwG0ycx6ObP/LlqXp9aVE3/fm7cAbdjFPrXR5VRV/gLXzG3pqbR20fv1TKf6oG2YeB4pifctFS1v29+iMPBq8s7a6zqYE7u/xRGhv4kBoYn0HTUl1Gqg79iSvmqYUizz0l2dBuxJr1qdbhCb6G0TY8WLHDnnVtKprz9heauW50E7EgdBL+3tMYWdv93r7jfWlvh86jBgIg5b6o9bwFaM6skXqPOg94kBoqb8SLO+I/37dv8qzsfEPW/rLGdB+xEAYtKI/e6TueMsdvLmD5f09XPWXDegSAr1JjJ440NKW9R066vcJBvDXiWlL+LD9PTagsz+0C/GAHmVpdn0YKneTBuT2R/SjWtxVsUguz74+/9OhTcRpdgPQQtcdaMX+HhT1FPmOXzaEAWzt7/FQ6GVicMTQzVxWoNX6y9vZdXcAckiLqmJVLMy5tz7dc6FdiQOhJf2Fj50w4N9toNl1Qi8creovz4IOINbkTxehjft7tMgttfQoWmcD8Nzf43HQ3sSB0Pb9PTr3Bxq8GpJ5wft7oOEuwkcVabWEj+zvYSEGwqDt+3uoCt4nUdNCes81FUlxJw7ac6sMN+INS394f4/xVu7X3feb8Njf49ugHYmHRz4KmvYfplF9za+LiwB6P43nQXsQB0LT8Ueazb3QqM6F9tP3R7EqFoksPvt7HAPtSgyEQQ/6S6IDawx3MI1P6+8lB1C5VnRNS4Z6/pIGm8dAF2l5N/X8xWTmOpu/NMRAmKXv+ktqTjpTd1X3bflsC95SX+QGAlS9/dL+HiN0u9vwB6HV+Q+rmTEIRXdiIMzSs++XdEcGbfDW2mnAr6oNocWuHV3+9DBoV2IgDLrZ3yMRRxD4vDDQPIoLvGr95TDoGGIgDJr2H9NUMO7UU/y/kdPvR5HZXUKT9TX6j2Ogd4jfbuP68yFKVvv+6vP4Aw1+uiNjoL6avOrVPBQXuWlzYS/CVv9xGPQ+cTtQUu8/nKFn/S+JjrDe7Bhg093azaNYFdn0vfqxw6C9iYEwaKL+tJ0A1iETk5oKfAy1ke9RnQSPptmvxlJ/ehi0HzEQBq2oX+ez/lRtdf1t6r0k+rIEcxj0HjEQBv3qfzHdStK+TYx2/eUw6DBiq/H2+18qi8zfBCamhg4Tu/1zwdCmO/EjnkJjPj6cLU3UJ6cBvxJG7tjRN2nwKWS+TFcRnJ4KbSVOAnEU9FA/Np17TUdyndXb3++AArSeqPWXM6C9iYEw6Hv9aWKRp+LBPUzqqEGk+Hd+pPNMZ0DHEEdB0+snd7lfPq9NpH/55K3+aAnpToJ2InbBnUOnf3Vad5r9uHyRSB5vXhwE+pOgY4ijoGf9L2nwgxoXOWtVrAT78okiBDkD2pXYkbUHSf+kipO8zof43OX8aOgY4hDo9A8ef+9KVcz41678F0AnzytR0OnSxFHJ6Xd0oZvTavfnQfsRf9bS/3/9z77+A2DdeCv3ceV0AAAAAElFTkSuQmCC') 0 0 no-repeat";
        break;
    }
    p.padM.style.background = "url('data:image/gif;base64,R0lGODlhDwAPAKEBAAAAAP///////////yH5BAEKAAIALAAAAAAPAA8AAAIklB8Qx53b4otSUWcvyiz4/4AeQJbmKY4p1HHapBlwPL/uVRsFADs=') no-repeat";
    p.sldM.style.background = "url('data:image/gif;base64,R0lGODlhBwALAKECAAAAAP///6g8eKg8eCH5BAEKAAIALAAAAAAHAAsAAAITTIQYcLnsgGxvijrxqdQq6DRJAQA7') no-repeat";
    // place pointers
    redrawPad();
    redrawSld();
    THIS.picker.owner = THIS;
    document.getElementsByTagName('body')[0].appendChild(p.boxB);
  }
  function redrawPad() {
    // redraw the pad pointer
    switch(modeID) {
      case 0: var yComponent = 1; break;
      case 1: var yComponent = 2; break;
    }
    var x = Math.round((THIS.hsv[0]/6) * (THIS.images.pad[0]-1));
    var y = Math.round((1-THIS.hsv[yComponent]) * (THIS.images.pad[1]-1));
    THIS.picker.padM.style.backgroundPosition =
      (THIS.pickerFace+THIS.pickerInset+x - Math.floor(THIS.images.cross[0]/2)) + 'px ' +
      (THIS.pickerFace+THIS.pickerInset+y - Math.floor(THIS.images.cross[1]/2)) + 'px';
    // redraw the slider image
    var seg = THIS.picker.sld.childNodes;
    switch(modeID) {
      case 0:
        var rgb = HSV_RGB(THIS.hsv[0], THIS.hsv[1], 1);
        for(var i=0; i<seg.length; i+=1) {
          seg[i].style.backgroundColor = 'rgb('+
            (rgb[0]*(1-i/seg.length)*100)+'%,'+
            (rgb[1]*(1-i/seg.length)*100)+'%,'+
            (rgb[2]*(1-i/seg.length)*100)+'%)';
        }
        break;
      case 1:
        var rgb, s, c = [ THIS.hsv[2], 0, 0 ];
        var i = Math.floor(THIS.hsv[0]);
        var f = i%2 ? THIS.hsv[0]-i : 1-(THIS.hsv[0]-i);
        switch(i) {
          case 6:
          case 0: rgb=[0,1,2]; break;
          case 1: rgb=[1,0,2]; break;
          case 2: rgb=[2,0,1]; break;
          case 3: rgb=[2,1,0]; break;
          case 4: rgb=[1,2,0]; break;
          case 5: rgb=[0,2,1]; break;
        }
        for(var i=0; i<seg.length; i+=1) {
          s = 1 - 1/(seg.length-1)*i;
          c[1] = c[0] * (1 - s*f);
          c[2] = c[0] * (1 - s);
          seg[i].style.backgroundColor = 'rgb('+
            (c[rgb[0]]*100)+'%,'+
            (c[rgb[1]]*100)+'%,'+
            (c[rgb[2]]*100)+'%)';
        }
        break;
    }
  }
  function redrawSld() {
    // redraw the slider pointer
    switch(modeID) {
      case 0: var yComponent = 2; break;
      case 1: var yComponent = 1; break;
    }
    var y = Math.round((1-THIS.hsv[yComponent]) * (THIS.images.sld[1]-1));
    THIS.picker.sldM.style.backgroundPosition =
      '0 ' + (THIS.pickerFace+THIS.pickerInset+y - Math.floor(THIS.images.arrow[1]/2)) + 'px';
  }
  function isPickerOwner() {
    return THIS.picker && THIS.picker.owner === THIS;
  }
  function blurTarget() {
    if(THIS.valueElement === target) {
      THIS.importColor();
    }
    if(THIS.pickerOnfocus) {
      THIS.hidePicker();
    }
  }
  function blurValue() {
    if(THIS.valueElement !== target) {
      THIS.importColor();
    }
  }
  function setPad(e) {
    var posM = [e.pageX, e.pageY];
    var x = posM[0]-posPad[0];
    var y = posM[1]-posPad[1];
    switch(modeID) {
      case 0: THIS.fromHSV(x*(6/(THIS.images.pad[0]-1)), 1 - y/(THIS.images.pad[1]-1), null, leaveSld); break;
      case 1: THIS.fromHSV(x*(6/(THIS.images.pad[0]-1)), null, 1 - y/(THIS.images.pad[1]-1), leaveSld); break;
    }
  }
  function setSld(e) {
    var posM = [e.pageX, e.pageY];
    var y = posM[1]-posPad[1];
    switch(modeID) {
      case 0: THIS.fromHSV(null, null, 1 - y/(THIS.images.sld[1]-1), leavePad); break;
      case 1: THIS.fromHSV(null, 1 - y/(THIS.images.sld[1]-1), null, leavePad); break;
    }
  }
  var modeID = this.pickerMode.toLowerCase()==='hvs' ? 1 : 0;
  var abortBlur = false;
  var
    holdPad = false,
    holdSld = false;
  var
    posPad,
    posSld;
  var
    leaveValue = 1<<0,
    leaveStyle = 1<<1,
    leavePad = 1<<2,
    leaveSld = 1<<3;
  // target
  target.addEventListener('focus', function() { if(THIS.pickerOnfocus) { THIS.showPicker(); } }, false );
  target.addEventListener('blur', function() { if(!abortBlur) { window.setTimeout(function() { abortBlur || blurTarget(); abortBlur=false; }, 0); } else { abortBlur = false; }}, false);
  // valueElement
  if(THIS.valueElement) {
    var updateField = function() {
      THIS.fromString(valueElement.value, leaveValue);
    };
    THIS.valueElement.addEventListener('keyup', updateField, false);
    THIS.valueElement.addEventListener('input', updateField, false);
    THIS.valueElement.addEventListener('blur', blurValue, false);
    THIS.valueElement.setAttribute('autocomplete', 'off');
  }
  // THIS.styleElement
  if(THIS.styleElement) {
    THIS.styleElement.jscStyle = {
      backgroundColor : THIS.styleElement.style.backgroundColor,
      color : THIS.styleElement.style.color
    };
  }
  this.importColor();
}
function IconPicker(target) {
  var THIS = this;
  this.valueElement = target;
  this.picker = null;
  this.abortBlur = false;
  this.skipHost = location.protocol+"//"+location.hostname + "/";
  var icons = [ "/rgraphic/unit/unit_*.png", "spear", "sword", "axe", "archer", "spy", "light", "marcher", "heavy", "ram", "catapult", "knight", "snob", "/rgraphic/command/*.png","attack", "back", "cancel", "return", "support", "/n",
                "/rgraphic/buildings/*.png", "main", "barracks", "stable", "garage", "church", "snob", "smith", "place", "statue", "market", "wood", "stone", "iron", "farm", "storage", "hide", "wall", "/n",
                "/rgraphic/ally_rights/*.png", "diplomacy", "forum_mod", "found", "internal_forum", "invite", "lead", "mass_mail", "trusted_member",  
                "/pgraphic/forum/forum_admin_unread.png", "/rgraphic/forum/thread_*.png", "close", "closed", "delete", "move", "open", "read", "/n",
                "/rgraphic/*.png", "holz", "lehm", "eisen", "res", "/rgraphic/dots/*.png","blue", "brown", "green", "grey", "red", "yellow",
                "/rgraphic/map/*.png", "map_n", "map_ne", "map_e", "map_se", "map_s", "map_sw", "map_w", "map_nw"
              ];
  this.createPicker = function() {
    THIS.picker = document.body.appendChild(ce("div"));
    THIS.picker.id = "dsfm_iconpicker";
    THIS.picker.style.position = "absolute";
    THIS.picker.style.display = "none";
    THIS.picker.style.zIndex = 10000;
    THIS.picker.addEventListener("mouseover", function() {THIS.abortBlur=true;}, false );
    THIS.picker.addEventListener("mouseout", function() { THIS.abortBlur=false;}, false );
    var tab = THIS.picker.appendChild(ce("table"));
    tab.className = "main";
    tab.style.border = "2px solid #804000";
    var row = tab.insertRow(tab.rows.length);
    var replace = "";
    for( var i = 0; i < icons.length; i++ ) {
      var src;
      if( icons[i][0] == "/" ) {
        switch( icons[i][1] ) {
          case "r":
            replace = icons[i].substr(2);
            continue;
          case "n":
            row = tab.insertRow(tab.rows.length);
            continue;
          case "p":
            src = icons[i].substr(2);
            break;
        }
      }
      else {
        src = replace.replace("*",icons[i]);
      }
      cell = row.insertCell(row.cells.length);
      var a = cell.appendChild(ce("a"));
      a.href = "javascript:;";
      a.addEventListener("click", THIS.selectIcon, false );
      a.appendChild(ce("img")).src = src;
    }
  }
  this.showPicker = function() {
    if( !THIS.picker )
      THIS.createPicker();
    var pos = lib.getElementPos(target);
    THIS.picker.style.left = pos[0] + "px";
    THIS.picker.style.top = (pos[1] + target.offsetHeight) + "px";
    THIS.picker.style.display = "block";
  }

  this.hidePicker = function() {
    if( THIS.picker )
      THIS.picker.style.display = "none";
  }
  this.selectIcon = function(e) {
    var value = e.target.src;
    if( value.length > THIS.skipHost.length && value.substring(0,THIS.skipHost.length) == THIS.skipHost )
      value = value.substring(THIS.skipHost.length);

    THIS.valueElement.value = value;
    lib.fireEvent(THIS.valueElement,"change");
    THIS.valueElement.focus();
  }
  THIS.valueElement.addEventListener("focus", THIS.showPicker, false);
  THIS.valueElement.addEventListener("blur", function() { if( THIS.abortBlur ) { THIS.valueElement.focus(); THIS.abortBlur=false; } else THIS.hidePicker(); }, false );
}
function HypixDSLib(prefix,forceGM,useIdx) {
  var lib = this;
  this.prefix = prefix;
  this.Debug = function() {
    this.log = function(msg) {
      if( typeof(GM_log) != "undefined" )
        GM_log(msg);
      else if( typeof(opera) != "undefined" )
        opera.postError(msg);
      else if( typeof(console) != "undefined" )
        console.log(msg);
    }

    this.dumpObj = function(obj) {
      var str = "\n {";
      for( var key in obj ) {
        if( typeof( obj[key] ) == "object" ) {
          str += "\n" + key + ":";
          str += this.dumpObj(obj[key],true)
        }
        else if( typeof(obj[key]) != "function")
          str += "\n" + key + ": " + obj[key];
      }
      str += "\n}";
      if( arguments.length == 1 || !arguments[1] )
        this.log(str);
      return str;
    }
  }
  this.ServerInfo = function(cfgVals,needUnitInfo,needBuildingInfo,sites) {
    var cfg = this;
    if( lib.world == -1 )
      return;
    if( typeof(sites) == "undefined" )
      sites = [];
    var allData = true;
    var ajaxReq = 0;
    var ajaxLoaded = 0;
    this.config = lib.storage.getValue("svrcfg");
    if( cfgVals.length > 0 ) {
      if( typeof(this.config) == "undefined" )
        allData = false;
      else {
        var vals = cfgVals.replace(/\//g,"_").split(",");
        for( var i = 0; i < vals.length; i++ ) {
          if( typeof(this.config[vals[i]]) == "undefined" ) {
            delete this.config;
            allData = false;
            break;
          }
        }
      }
    }
    this.buildingInfo = lib.storage.getValue("buildinginfo");
    if( needBuildingInfo && typeof(this.buildingInfo) == "undefined" )
      allData = false;
    this.unitInfo = lib.storage.getValue("unitInfo");
    if( needUnitInfo && typeof(this.unitInfo) == "undefined" )
      allData = false;
    for( var i = 0; i < sites.length; i++ ) {
      this[sites[i].key] = lib.storage.getValue(sites[i].key);
      if( typeof(this[sites[i].key]) == "undefined" )
        allData = false;
    }
    if( !allData ) {
      var popup = new lib.Popup("loadcfg",texts[lib.lang].gui.title+" "+version,true,0,0);
      var html = '<table style="width:100%;">';
      if( cfgVals.length > 0 ) {
        ajaxReq++;
        html += '<tr><td>';
        if( typeof( this.config ) == "undefined" ) {
          html += texts[lib.lang].gui.loadServerCfg+'<span id="'+lib.prefix+'_svrcfg"/>';
          loadServerCfg(cfgVals.split(","));
        }
        else {
          html += '<span style="color:green;">'+texts[lib.lang].gui.serverCfgKnown+'</span>';
          ajaxLoaded++;
        }
        html += '</td></tr>';
      }
      if( needUnitInfo ) {
        ajaxReq++;
        html += '<tr><td>';
        if( typeof( this.unitInfo ) == "undefined" ) {
          html += texts[lib.lang].gui.loadUnitInfo+'<span id="'+lib.prefix+'_unitinfo"/>';
          loadUnitInfo();
        }
        else {
          html += '<span style="color:green;">'+texts[lib.lang].gui.unitInfoKnown+'</span>';
          ajaxLoaded++;
        }
       html += '</td></tr>';
      }
      if( needBuildingInfo ) {
        ajaxReq++;
        html += '<tr><td>';
        if( typeof( this.buildingInfo ) == "undefined" ) {
          html += texts[lib.lang].gui.loadBuildingInfo+'<span id="'+lib.prefix+'_buildinginfo"/>';
          loadBuildingInfo();
        }
        else {
          html += '<span style="color:green;">'+texts[lib.lang].gui.buildingInfoKnown+'</span>';
          ajaxLoaded++;
        }
       html += '</td></tr>';
      }
      html += '</table><table id="'+lib.prefix+'_sites"';
      if( ajaxLoaded < ajaxReq )
        html += ' style="display:none"';
      else {
        for( var i = 0; i < sites.length; i++ ) {
          if( location.href == sites[i].href ) {
            try {
              this[sites[i].key] = sites[i].siteHandler();
              lib.storage.setValue(sites[i].key,this[sites[i].key]);
            }
            catch(e) {
              lib.debug.log(sites[i].key + ": " + e.message);
            }
            break;
          }
        }
      }
      html += ">";
      for( var i = 0; i < sites.length; i++ ) {
        html += '<tr><td>';
        if( typeof(this[sites[i].key]) == "undefined" )
          html += '<a href="'+sites[i].href+'">'+sites[i].linkText+'</a>';
        else
          html += '<span style="color:green;">'+sites[i].visitedText+'</span>';
        html += '</td></tr>';
      }
      html += "</table>";
      popup.content.innerHTML = html;
      popup.setSize(300);
      popup.show();
    }

    function loadServerCfg(cfgVals) {
      var req = new XMLHttpRequest();
      if (req == null)
        alert("Error creating request object!");

      req.open("GET", "/interface.php?func=get_config", true);
      req.onreadystatechange =
      function() {
        if( req.readyState == 4 ) {
          var span = $(lib.prefix+"_svrcfg");
          if(req.status!=200) {
            span.innerHTML = texts[lib.lang].gui.error + req.status;
            span.style.color = "red";
          }
          else {
            cfg.config = {};
            var xml = req.responseXML;
            for( var i = 0; i < cfgVals.length; i++ ) {
              var path = cfgVals[i].split("/");
              var name = "";
              var e = xml;
              for( var j = 0; j < path.length; j++ ) {
                e = e.getElementsByTagName(path[j]);
                var len = e.length;
                e = e[0];
                if( len > 0 ) {
                  if( j > 0 )
                    name += "_";
                  name += path[j];
                }
                else
                  break;
              }
              var val = null;
              if( e )
				if( e.firstChild )
					cfg.config[name] = parseFloat(e.firstChild.nodeValue);
				else
					cfg.config[name] = 0;
              else
                lib.debug.log( cfgVals[i] + " not found" );
            }
            lib.storage.setValue( "svrcfg", cfg.config );
            span.style.color = "green";
            span.innerHTML = texts[lib.lang].gui.ok;
            ajaxLoaded++;
            if( ajaxLoaded == ajaxReq && sites.length > 0 ) {
              $(lib.prefix+"_sites").style.display = "";
              popup.setSize(300);
            }
          }
        }
      }
      req.setRequestHeader('If-Modified-Since', 'Sat, 1 Jan 2000 00:00:00 GMT');
      req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      req.send(null);
    }

    function loadUnitInfo() {
      var req = new XMLHttpRequest();
      if (req == null)
        alert("Error creating request object!");

      req.open("GET", "/interface.php?func=get_unit_info", true);
      req.onreadystatechange =
      function() {
        if( req.readyState == 4 ) {
          var span = $(lib.prefix+"_unitinfo");
          if(req.status!=200) {
            span.innerHTML = texts[lib.lang].gui.error + req.status;
            span.style.color = "red";
          }
          else {
            var xml = req.responseXML;
            cfg.unitInfo = {};
            var e = xml.firstChild;
            var bit = 1;
            for( var i = 0; i < e.childNodes.length; i++ ) {
              var unitnode = e.childNodes[i];
              if( unitnode.nodeType != 3 ) {
                cfg.unitInfo[unitnode.nodeName] = {};
                for( var c = 0; c < unitnode.childNodes.length; c++ ) {
                  var node = unitnode.childNodes[c];
                  if( node.nodeType != 3 )
                    cfg.unitInfo[unitnode.nodeName][node.nodeName] =  parseFloat(node.firstChild.nodeValue);
                }
              }
            }
            lib.storage.setValue( "unitInfo", cfg.unitInfo );
            span.style.color = "green";
            span.innerHTML = texts[lib.lang].gui.ok;
            ajaxLoaded++;
            if( ajaxLoaded == ajaxReq && sites.length > 0 ) {
              $(lib.prefix+"_sites").style.display="";
              popup.setSize(300);
            }
          }
        }
      }
      req.setRequestHeader('If-Modified-Since', 'Sat, 1 Jan 2000 00:00:00 GMT');
      req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      req.send(null);
    }
    function loadBuildingInfo() {
      var req = new XMLHttpRequest();
      if (req == null)
        alert("Error creating request object!");

      req.open("GET", "/interface.php?func=get_building_info", true);
      req.onreadystatechange =
      function() {

        if( req.readyState == 4 ) {
          var span = $(lib.prefix+"_buildinginfo");
          if(req.status!=200) {
            span.innerHTML = texts[lib.lang].gui.error + req.status;
            span.style.color = "red";
          }
          else {

            var xml = req.responseXML;
            cfg.buildingInfo = {};
            var e = xml.firstChild;
            for( var i = 0; i < e.childNodes.length; i++ ) {
              var buildingnode = e.childNodes[i];
              if( buildingnode.nodeType != 3 ) {
                cfg.buildingInfo[buildingnode.nodeName] = {};
                for( var c = 0; c < buildingnode.childNodes.length; c++ ) {
                  var node = buildingnode.childNodes[c];
                  if( node.nodeType != 3 )
                    cfg.buildingInfo[buildingnode.nodeName][node.nodeName] =  parseFloat(node.firstChild.nodeValue);
                }
              }
            }
            lib.storage.setValue( "buildinginfo", cfg.buildingInfo );
            span.style.color = "green";
            span.innerHTML = texts[lib.lang].gui.ok;
            ajaxLoaded++;
            if( ajaxLoaded == ajaxReq && sites.length > 0) {
              $(lib.prefix+"_sites").style.display = "";
              popup.setSize(300);
            }
          }
        }
      }
      req.setRequestHeader('If-Modified-Since', 'Sat, 1 Jan 2000 00:00:00 GMT');
      req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      req.send(null);
    }
  }
  this.StorageHandler = function(forceGM,useIdx) {
    var gm = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox")>-1;
    var win = gm ? unsafeWindow : window;
    var ls = false;
    var intGetValue;
    var intSetValue;
    var prefix = lib.prefix;
    try {ls = typeof(win.localStorage) != "undefined";} catch(e) {lib.log(e.message);}
    var setIdx = function(key,inIdx) {
      if( typeof(inIdx) == "undefined" )
        inIdx = true;
      if( useIdx && inIdx ) {
        var idx = intGetValue("idx",";");
        if( !new RegExp(";"+key+";").test(idx) )
          intSetValue("idx",idx+key+";",false);
      }
    }
    var delIdx = function(key) {
      if( useIdx ) {
        var idx = intGetValue("idx",";");
        idx = idx.replace(new RegExp(";"+key+";","g"), ";");
        intSetValue("idx",idx,false);
      }
    }
    var idxListValues = function(re) {
        var allkeys = intGetValue("idx",";").split(";");
        var serverKeys = [];
        if( typeof(re) != "undefined" )
          var reKey = new RegExp(re);
        for( var i = 1; i < allkeys.length-1; i++ ) {
          if( reKey ) {
            res = res[1].match(reKey);
            if( res )
              serverKeys.push(res);
          }
          else
            serverKeys.push(res[1]);
        }
        return serverKeys;
    }
    

    //HS_ LSTOR 001-->
    if( forceGM && gm || !ls) {
    //if( forceGM && gm && !ls) {
    //HS_ LSTOR 001<--
      if( gm ) {
        prefix = prefix + "_" + document.location.host.split('.')[0];
        intSetValue = function(key,value,inIdx) {
          setIdx(key,inIdx);
          GM_setValue(prefix+"_"+key,value);
        };
        intGetValue = function(key,defaultValue) {
          return GM_getValue(prefix+"_" + key, defaultValue);
        }
        this.deleteValue = function(key) {
          delIdx(key);
          GM_deleteValue(prefix+"_"+key);
        }
        if( this.useIdx )
          this.listValues = idxListValues;
        else
          this.listValues = function(re) {
            var allkeys = GM_listValues();
            var serverKeys = [];
            var rePrefix = new RegExp("^"+prefix+"_(.*)$");
            if( typeof(re) != "undefined" )
              var reKey = new RegExp(re);
            for( var i = 0; i < allkeys.length; i++ ) {
              var res = allkeys[i].match(rePrefix);
              if( res ) {
                if( reKey ) {
                  res = res[1].match(reKey);
                  if( res )
                    serverKeys.push(res);
                }
                else
                  serverKeys.push(res[1]);
              }
            }
            return serverKeys;
          }
      }
      else {
        alert( "Keine geeignete Speichermöglichkeit gefunden!");
        end;
      }
    }
    else if( ls ) {
      intSetValue = function(key,value,inIdx) {
        if( useIdx )
          setIdx(key,inIdx);
        localStorage.setItem(prefix+"_"+key, value );
      };
      intGetValue = function(key,defaultValue) {
        var value = localStorage.getItem(prefix+"_"+key);
        if( value )
          return value;
        else
          return defaultValue;
      };
      this.deleteValue = function(key) {
        delIdx(key);
        localStorage.removeItem(prefix+"_"+key);
      }
      if( this.useIdx )
        this.listValues = idxListValues;
      else
        this.listValues = function(re) {
          if( this.useIdx ) {
            return idxListValues(intGetValue("idx","").split(";"));
          }
          else {
            var keys = [];
            var rePrefix = new RegExp("^"+prefix+"_(.*)$");
            if( typeof(re) != "undefined")
              var reKey = new RegExp(re);
            for( var i = 0; i < win.localStorage.length; i++ ) {
              var res = localStorage.key(i).match(rePrefix);
              if( res ) {
                if( reKey ) {
                  res = res[1].match(reKey);
                  if( res )
                    keys.push(res);
                }
                else
                  keys.push(res[1]);
              }
            }
            return keys;
          }
        }
    }
    else {
      alert( "Keine geeignete Speichermöglichkeit gefunden!");
      end;
    }
    this.clear = function(re) {
      var keys = this.listValues(re);
      for( var i = 0; i < keys.length; i++ )
        this.deleteValue(keys[i]);
    }
    this.setValue = function(key,value) {
      switch( typeof(value) ) {
        case "object":
        case "function":
          intSetValue(key,"j"+JSON.stringify(value));
          break;
        case "number":
          intSetValue(key,"n"+value);
          break;
        case "boolean":
          intSetValue(key,"b" + (value ? 1 : 0));
          break;
        case "string":
          intSetValue(key,"s" + value );
          break;
        case "undefined":
          intSetValue(key,"u");
          break;
      }
    }
    this.getValue = function(key,defaultValue) {
      var str = intGetValue(key);
      if( typeof(str) != "undefined" ) {
        switch( str[0] ) {
          case "j":
            try {
              return JSON.parse(str.substring(1));
            }
            catch(e) {
              alert( key + ": " + texts[lib.lang].gui.valueError );
              return defaultValue;
            }
          case "n":
            return parseFloat(str.substring(1));
          case "b":
            return str[1] == "1";
          case "s":
            return str.substring(1);
          default:
            this.deleteValue(key);
        }
      }
      return defaultValue;
    }
    this.getString = function(key) {
      return intGetValue(key);
    }
    this.setString = function(key,value) {
      intSetValue(key,value);
    }
  }
  this.Popup = function(id,title,close,width,height) {
    var THIS = this;
    id = lib.prefix+"_"+id;
    this.div = $(id);
    this.shadowDiv = $("hpx_shadow_div");
    if( this.shadowDiv === null ) {
      this.shadowDiv = document.body.appendChild(ce("div"));
      this.shadowDiv.id = "hpx_shadow_div";
      this.shadowDiv.style.position = "fixed";
      this.shadowDiv.style.left = "0px";
      this.shadowDiv.style.top = "0px";
      this.shadowDiv.style.backgroundColor = "rgba(0,0,0,0.7)";
      this.shadowDiv.style.zIndex = 999;
      this.shadowDiv.style.display = "none";
    }
    this.prevShadowDisplay = this.shadowDiv.style.display;
    if( this.div === null ) {
      this.div = document.body.appendChild(ce("div"));
      this.div.id = id;
      this.div.style.position = "absolute";
      this.div.style.zIndex = 1000;
      this.div.style.display = "none";
    }
    this.div.innerHTML = "";
    var tab = this.div.appendChild(ce("table"));
    tab.className = "popup_content";
    tab.style.border = "2px solid #804000";
    var row = tab.insertRow(0);
    var cell = row.appendChild(ce("th"));
    if( close ) {
      var titleTab = cell.appendChild(ce("table"));
      titleTab.style.width = "100%";
      row = titleTab.insertRow(0);
      this.titleCell = row.insertCell(0);
      this.titleCell.appendChild(document.createTextNode(title));
      cell = row.insertCell(1);
      cell.style.textAlign = "right";
      var a = cell.appendChild(ce("a"));
      a.id = id+"_close";
      a.href = "javascript:;";
      a.appendChild(document.createTextNode(texts[lib.lang].gui.close));
      a.addEventListener("click", function() { THIS.hide(); }, false);
    }
    else {
      this.titleCell = cell;
      cell.appendChild(document.createTextNode(title));
    }
    this.content = tab.insertRow(1).insertCell(0);
    this.resize = function() {
      THIS.shadowDiv.style.width = self.innerWidth + "px";
      THIS.shadowDiv.style.height =  self.innerHeight + "px";
  //    THIS.center();
    }
    this.center = function() {
      THIS.div.style.left = Math.round(Math.max(0,self.pageXOffset + (self.innerWidth-THIS.div.offsetWidth)/2)) +"px";
      THIS.div.style.top = Math.round(Math.max(0,self.pageYOffset + (self.innerHeight-THIS.div.offsetHeight)/2)) + "px";
    }
    this.show = function() {
      var show = arguments.length == 0 || arguments[0] == true;
      THIS.shadowDiv.style.display = show ? "block" : this.prevShadowDisplay;
      THIS.div.style.display = show ? "block" : "none";
      if( show ) {
        window.addEventListener("resize", THIS.resize, false);
        THIS.resize();
        THIS.center();
  //      window.addEventListener("scroll", this.center, false);
      }
      else {
        window.removeEventListener("resize", this.resize, false);
  //      window.removeEventListener("scroll", this.center, false);
      }
    }
    this.hide = function() {
      THIS.show(false);
    }
    this.setSize = function(width,height) {
      var display = THIS.div.style.display;
      THIS.div.style.display = "block";
      if( typeof(width) == "undefined" )
        width = tab.offsetWidth;
      if( typeof(height) == "undefined" )
        height = tab.offsetHeight;
      THIS.div.style.display = display;
      THIS.div.style.width = width + "px";
      THIS.div.style.height = height + "px";
      THIS.content.parentNode.parentNode.parentNode.style.width = Math.max(0,width - 8) +"px";
      THIS.content.parentNode.parentNode.parentNode.style.height = Math.max(0,height - 50) + "px";
      THIS.center();
    }
    this.setSize(width,height);
    this.setTitle = function(title) {
      THIS.titleCell.innerHTML = "";
      THIS.titleCell.appendChild(document.createTextNode(title));
    }
  }
  this.parseParams = function(url) {
    url = url.replace( location.hash, ""); ////HS _ K 001 //Wegschneiden von allem was nach # kommt
    url = url.substring(url.indexOf("?")+1);
    url = url.replace( /&amp;/g, "&" );
    var hash = url.indexOf("#");
    if( hash > -1 ) { //Wozu dient das?
      url = url.substring(0,hash-1);
    };
    url = url.split("&");
    var params = { get: function(name,def) { if(typeof(this[name]) == "undefined") return def; else return this[name]; }, };
    for( var i = 0; i < url.length; i++ ) {
      var param = url[i].split("=");
      params[param[0]] = param[1];
    }
    return params;
  }
  this.getGameData = function() {
    var game_data;
    if(typeof(unsafeWindow) != 'undefined' && navigator.userAgent.indexOf("Firefox")>-1) {
      game_data = unsafeWindow.game_data;
    }
    if(!game_data) {
      var script = ce("script");
      script.type = "application/javascript";
      script.textContent = 	"var input=document.createElement('input');" +
                  "input.type='hidden';" +
                  "input.value=JSON.stringify(game_data);"  +
                  "input.id='game_data';" +
                  "document.body.appendChild(input);";
      document.body.appendChild(script);
      var input = $("game_data");
      if( input )
        eval("game_data=" + input.value + ";");
      document.body.removeChild(script);
    }
    if( game_data )
      game_data.link_base = game_data.link_base.replace(/&amp;/g,"&");
    return game_data;
  }
  this.createLink = function(screen) {
    var lnk = this.game_data.link_base.replace("screen=","screen="+screen);
    var len = arguments.length - 1;
    for( var i = 1; i < len; i++ ) {
      lnk += "&" + arguments[i] + "=";
      i++;
      if( i < len )
        lnk += arguments[i];
    }
    if( arguments[len] == true)
      lnk.replace( /&/g, "&amp;" );
    return lnk;
  }
  this.fireEvent = function(node,evt) {
    if( node.nodeName.toUpperCase() == "INPUT" && node.type.toUpperCase() == "CHECKBOX" )
      node.checked = !node.checked;
    var evObj = document.createEvent('HTMLEvents');
    evObj.initEvent( evt, true, true );
    var ok = node.dispatchEvent(evObj);
    if( ok && node.nodeName == "A" && node.href != "" ) {
      location.href = node.href;
     }
  }
  this.getElementPos = function(e) {
    var e1=e, e2=e;
    var x=0, y=0;
    if(e1.offsetParent) {
      do {
        x += e1.offsetLeft;
        y += e1.offsetTop;
      } while(e1 = e1.offsetParent);
    }
    while((e2 = e2.parentNode) && e2.nodeName.toUpperCase() !== 'BODY') {
      x -= e2.scrollLeft;
      y -= e2.scrollTop;
    }
    return [x, y];
  }
  this.getServerTime = function() {
    try {
      var span = $("serverTime");
      var hms = span.firstChild.nodeValue.split(":");
      span = $("serverDate");
      var dmy = span.firstChild.nodeValue.split("/");
      var dt = new Date( parseInt(dmy[2], 10), parseInt(dmy[1], 10) - 1, parseInt(dmy[0], 10), parseInt(hms[0], 10), parseInt(hms[1], 10), parseInt( hms[2], 10 ));
      dt = new Date(dt.getTime()-dt.getTimezoneOffset()*0);
      return dt;
    }
    catch(e) {
      return new Date();
    }
  }
  this.getTimeDiff = function() {
    return this.serverTime.getTime() / 1000 - new Date().getTime() / 1000;
  }
  this.getTime = function() {
    return parseInt(new Date().getTime() / 1000 + this.timeDiff, 10);
  }
  this.padLeft = function(str,chr,len) {
    var ret = str.toString();
    var pad = len - ret.length;
    for( var i = 0; i < pad; i++ )
      ret = chr + ret;
    return ret;
  }
  this.formatNumber = function(nr,dotted,greyspan,shortMode) {
    var ret = "";
    if( nr == 0 )
      return "0";
    if( shortMode > 0 && nr > 999999 ) {
      var tmp = Math.round(nr / 10000);
      var tmp2 = tmp % 100;
      ret = lib.formatNumber( Math.floor(tmp / 100), dotted, greyspan ) + (greyspan ? '<span class="grey">,</span>' : ',') + (tmp2 < 10?'0':'') + tmp2 + ' M';
    }
    else if( shortMode == 2 && nr > 999 ) {
      var tmp = Math.round( nr / 100);
      var tmp2 = tmp % 10;
      ret = lib.formatNumber( Math.floor(tmp/10), dotted, greyspan ) + (greyspan ? '<span class="grey">,</span>' : ',') + tmp2 + 'k';
    }
    else if( dotted ) {
      nr = nr.toString();
      var len = nr.length;
      for( var i = 0; i < len; i++ ) {
        ret += nr[i];
        var j = len-i;
        if( j == 10 || j == 7 || j == 4 ) { //i < len-1 && (len-i-1) % 3 == 0 )
          if( greyspan )
            ret += '<span class="grey">.</span>';
          else
            ret += '.';
        }
      }
    }
    else
      ret = nr;
    return ret;
  }
  this.tzOff = new Date().getTimezoneOffset()*60;
  this.serverTime = this.getServerTime();
  this.timeDiff = this.getTimeDiff();
  this.debug = new this.Debug();
  this.storage = new this.StorageHandler(forceGM,useIdx);
  this.params = this.parseParams(location.href);
  this.server = document.location.host.split('.')[0];
  this.hasPA = false;
  var res = this.server.match(/^([a-z]{2})s?(\d+)/);
  if( res ) {
    this.lang = res[1];
    this.world = parseInt(res[2], 10);
  }
  else {
    this.lang = "nl";
    this.world = -1;
  }
  if( this.params.screen ) {
    this.game_data = this.getGameData();
    if( this.game_data)
      this.hasPA = this.game_data.player.premium;
  }
}
})();
};
};
(
 function ()
 {
     var script = document.createElement("script");
     script.textContent = "(" + Dei_ready + ")()";
     document.body.appendChild(script);
 })();



/*
     FILE ARCHIVED ON 20:43:11 Apr 08, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 23:50:05 Jan 20, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/