TWLan / DSLan for Linux 1.4.3L1

== WHAT IS TWLAN / DSLAN ==
DSLan is the short form of "Die Stämme Local Area Network", the German version
of TribalWars. LAN means, that you are allowed to play DSLan only in your local
network. Playing DSLan with Hamachi is neither possible nor legal.


== INSTALLATION ==
Only one player has to download and install TWLan. All of the others should open
the IP address of the player running the server in their browser.

Before continuing, you have to know what a terminal is and where it can be
found. Within a terminal, you can enter commands to tell your computer what to
do. In Gnome (Ubuntu), the terminal can be found at
		Applications menu -> Accessories -> Terminal
In KDE (Kubuntu) the terminal can be found at
		KMenu -> System -> Terminal Program (Konsole)
(source: https://help.ubuntu.com/community/UsingTheTerminal)

Download the installer from http://twlan.lekensteyn.nl/ and save it in your home
directory. Open an terminal and run the following command in it (you may be
prompted for your password):

	sudo sh ./twlan-1.4.3L1.sh

Replace twlan-1.4.3L1.sh by the actual name of the file you have just
downloaded if necessary. Follow the on-screen instructions.


== STARTING, PLAYING AND STOPPING TWLAN ==
Open a terminal an run:

	sudo /opt/twlan/twlan.sh start

You should see an IP address which you can open in your browser in order to play
TWLan. If not, run the following command:

	/opt/twlan/twlan.sh ip

Stopping TWLan goes in a similar way:

	sudo /opt/twlan/twlan.sh stop

If you don't know whether you have started TWLan or not, run:

	sudo /opt/twlan/twlan.sh status


== CONFIGURATION ==
Use a simple editor (gedit, kate, leafpad) for editing files, not a word
processor like OpenOffice.org. The configuration file can be found in

/opt/twlan/htdocs/include/config.php


== GRAPHIC PACKAGES ==
Graphic package downloads and instructions can be found at
http://twlan.lekensteyn.nl/


== MANAGEMENT ==
The admin interface can be found at http://127.0.0.1/admin


== LEGAL ==
This package contains third-party software:
MySQL: http://www.mysql.com/
Apache HTTPd Server: http://httpd.apache.org/
PHP: http://www.php.net/
Licenses can be found in /opt/twlan/extra/licenses/

- It is FORBIDDEN to host or play TWLan online. If you get caught, you will be
  banned from ALL of the official servers.
- There is a built-in limit, allowing a user limit of 15. It is not allowed to
  bypass this limit.
- It is forbidden to decode the code of TWLan.
Links:
http://dslan.gfx-dose.de/thread-979.html (English)
http://dslan.gfx-dose.de/thread-978.html (Deutsch)


== ABOUT THIS PACKAGE ==
This package is slightly modified from the original 1.4 (3rd revision) DS LAN.
Changes (not related to htdocs):
- Startup / utilties script available as twlan.sh
- Added archers (extra rows in table unit_place: unit_(m)archer; table villages:
  unit_(m)archer_tec_level, all_unit_(m)archer)
- Added graphic package (extra rows in table users: css, image_base, gfx_old)
- SQL for an empty game available in extra/dslan.sql
- Events handler in extra/event.sh
- The server is a custom, compact build. That means it does not use XAMPP
  anymore, which was very large in size with lots of unused features.
- MySQL is not using port 3306 anymore
- MySQL is not generating errors about charsets anymore
- Apache is not using port 443 anymore
- Apache does not create an access log anymore, this will save disk space
- PHP has been hardened a little, adding a open_basedir restriction. Disabled
  magic_quotes globally, but enabling it for htdocs due to a incorrect
  implementation of escaping data. Note: exec and related functions have not
  been disabled.
Changes:
- Added a "Select all units" to place (templates/game_place_command.tpl and
  script.js)
- Templates have been updated, making it using UTF-8 and including incomplete
  translations. Removed reference to a non-existant file menu.js
- lang/de.ini has been updated with incomplete and missing translations
- lang/nl.ini has been added (Dutch / Nederlands)
- lang/en.ini has been added (English)
- include.inc.php has been updated to work with Linux
- include/config.php is using UTF-8, the setting $config['agreement_per_hour']
  works as its name describes
- include/configs/{buildings,techs}.php have been updated with missing
  translations
- include/configs/{coin,catapult_harm,max_wall_bonux,raw_harm}.php are using
  UTF-8
- Removed junk files:
   * php.php: phpinfo()
   * reload_points.php: reload points and ranking on a Linux server (broken)
   * all occurences of Thumbs.db
   * graphic/graphic/: duplicate graphic folder
   * vars.php: displays a message
   * graphic.php: became obsolete with new graphic package feature
   * files in admin/templates/ not starting with index: unused
   * templates/game{,_overview}_winter.tpl: unnecessary as there's now built-in
     graphic package support
- Removed first_steps.php and templates/index_steps.tpl
- Removed winter theme
- Template files have been adjusted to include the graphic package feature
- Added the following in the constructor of lib/smarty/Smarty.class.php:
  if(function_exists('dslan_smarty_hook'))dslan_smarty_hook($this);
- Added scouts, archers and mounted archers to the Smithy
- Added harden.php to avoid SQL injection and other security flaws
- Added redir.php and fixed bug with Homepage / IRC in game_info_ally.tpl: the
  information was not getting displayed because $ally was undefined (use $info)
- All pages are now XHTML 1.0 Transitional valid
- Cleaned up game.tpl
- Fixed wall "Basic defense" not showing up at Wall
- help_points.tpl: added an option to choose between total and difference
- targets.tpl: numbers are now formatted properly
- game_overview_graphic.tpl: Fixed incorrect CSS className for labels at night
- fixed incorrect timer of barracks in village overview
- Rewrote class DB_MySQL and removed unused "FILTER_LOCKTABLES"
- Rewrote class aLang, fixed a few bugs with it