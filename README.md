# CatchThePitch

With this web app we aim at helping people internalize musical intervals through a didactic singing game.

It is structured in a way that is similar to ear training apps, but in this case instead of recognising a given interval, the player is supposed to sing the note distant a given interval from a given root.

[Check it out here!](https://catchthepitch.herokuapp.com/)

[Here's how to use it](https://youtu.be/Jql4Z6ob_tw?t=31) <- TODO: change this when tutorial is done

## The home screen
![home screen gif](/examples/testHome.gif)

Each one of the first three button allows you to choose a preferred game mode, the last one is hopefully what brought you here, since it is what it's supposed to do.

## Modes

The game offers the players three modes, some more difficult than others but known to almost everyone, to help them learn at their own pace:

###    Against the Clock

This mode gives the player two minutes to get the highest amount of intervals correct.

###      Arcade Mode

The Arcade Mode gives the player four chances (or lives, the hearts on the lower right), for each mistake a life is removed, when all of them are lost the game ends.

The goal is the same as before, in this case the player is rewarded for giving as many consecutive correct answers as he can with a score multiplier (on the top right), which grows with the streak.

For each answer there is also a malus computed on the precision in singing the note and a bonus on the speed, which corresponds to how much of the timer bar on the top is left when the correct answer is given.

![home_screenshot](/examples/ArcadeModeScreenshot.jpg)


###     Zen Mode

In this mode the player chooses the drill, it is some sort of a training ground. Time doesn't run out, the game goes on as long as the player wants to.

When Zen Mode is selected the player can choose whether to train a chord based or an interval based drill:
* **Chord based training**: This one is similar to the other two modes seen before, but lacks the time factor. The player chooses a set of base notes and intervals, which will get combined by the game into the drill.

* **Intervals based training**: In this mode the player chooses the types of chord (triads, seventh) to include and the possible modes that will determine which specific chords will be put in the drill.

For both of these type there is the chance of including all the possible combination for the most randomic and challenging experience.

![zen_mode_choice_gif](/examples/zen_mode_choice.gif)

In the intervals based training mode the game window shows a [Circle of Fifths](https://en.wikipedia.org/wiki/Circle_of_fifths) instead of the usual interval wheel, the notes shown are those that belong to the modal scale considered for the current chord.
* <span style="color: rgb(220,72,72);">Red highlighting:</span> Major chords of the current mode
* <span style="color: rgb(70,80,200);">Blue highlighting:</span> minor chords of the current mode
* <span style="color: rgb(97,201,52);">Green highlighting:</span> diminished chord of the current mode

![zen_mode_screenshot](/examples/zen_mode_change.gif)

On the left the empty spheres represent the number of intervals required to complete the chord, based on the type (triad, seventh chord). On the right there is the root note and three buttons, which allow to change the chord of the current mode, the chord type and whole mode respectively.


# How to play

The interaction with the game is pretty straightforward, some popups are included when hovering over specific buttons in order to help the player use the platform.

In every mode there is a **Tap to answer** button, the player starts singing the note he thinks is the correct one, presses the button and sustains the note until the game outputs the result.

![tap_to_answer](/examples/tap_to_answer.gif)

# How to run it

* Clone the repo and do one of the following:
1. Using python

`python -m http.server`

Which should output:
```
MBP-di-Giorgio:CatchThePitch giorgio$ python -m http.server
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
127.0.0.1 - - [29/Mar/2020 11:33:16] "GET / HTTP/1.1" 200 -
127.0.0.1 - - [29/Mar/2020 11:33:16] "GET /style.css HTTP/1.1" 200 -
127.0.0.1 - - [29/Mar/2020 11:33:16] "GET /libraries/p5.min.js HTTP/1.1" 200 -
127.0.0.1 - - [29/Mar/2020 11:33:16] "GET /libraries/p5.dom.min.js HTTP/1.1" 200 -
127.0.0.1 - - [29/Mar/2020 11:33:16] "GET /sketch_folder/home/CatchThePitch_home_screen.js HTTP/1.1" 200 -
127.0.0.1 - - [29/Mar/2020 11:33:16] "GET /sketch_folder/home/Particle.js HTTP/1.1" 200 -
127.0.0.1 - - [29/Mar/2020 11:33:16] "GET /sketch_folder/home/Particle_System.js HTTP/1.1" 200 -
127.0.0.1 - - [29/Mar/2020 11:33:16] "GET /sketch_folder/home/homeScreen.js HTTP/1.1" 200 -
127.0.0.1 - - [29/Mar/2020 11:33:16] "GET /sketch_folder/utils/PopUp.js HTTP/1.1" 200 -
127.0.0.1 - - [29/Mar/2020 11:33:18] "GET /assets/FakeHope.ttf HTTP/1.1" 200 -
127.0.0.1 - - [29/Mar/2020 11:33:18] "GET /assets/game_time.ttf HTTP/1.1" 200 -
127.0.0.1 - - [29/Mar/2020 11:33:18] "GET /assets/lcd.ttf HTTP/1.1" 200 -
```

2. Using npm

```
$ npm init

$ npm install

$ node server.js
```
This is what it looks like on terminal:

```
MBP-di-Giorgio:CatchThePitch giorgio$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (catchthepitch)
version: (1.0.0)
keywords:
author:
license: (ISC)
About to write to /Users/giorgio/git/CatchThePitch/CatchThePitch/package.json:

{
  "requires": true,
  "lockfileVersion": 1,
  "dependencies": {
    "clean": "^4.0.2",
    "connect": "^3.7.0",
    "cookie-parser": "^1.4.5",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "morgan": "^1.10.0",
    "serve-favicon": "^2.5.0",
    "serve-static": "^1.14.1"
  },
  "scripts": {
    "start": "node server.js"
  },
  "name": "catchthepitch",
  "description": "With this web app we aim at helping people internalize musical intervals through a didactic game.",
  "version": "1.0.0",
  "main": "server.js",
  "directories": {
    "example": "examples"
  },
  "devDependencies": {},
  "repository": {
    "type": "git",
    "url": "git+https://github.com/totalmentecasuale/CatchThePitch.git"
  },
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/totalmentecasuale/CatchThePitch/issues"
  },
  "homepage": "https://github.com/totalmentecasuale/CatchThePitch#readme"
}


Is this OK? (yes)
MBP-di-Giorgio:CatchThePitch giorgio$ npm install
added 71 packages from 45 contributors and audited 195 packages in 5.329s
found 0 vulnerabilities

MBP-di-Giorgio:CatchThePitch giorgio$ ls -l
total 320
-rw-r--r--   1 giorgio  staff    1245 25 Mar 17:08 README.md
drwxr-xr-x  10 giorgio  staff     320 25 Mar 17:08 assets
drwxr-xr-x   3 giorgio  staff      96 28 Mar 19:13 examples
-rw-r--r--   1 giorgio  staff  102244 25 Mar 17:08 favicon.ico
-rw-r--r--   1 giorgio  staff    1296 28 Mar 19:13 index.html
-rw-r--r--   1 giorgio  staff    1897 28 Mar 19:13 index_againstclock_mode.html
-rw-r--r--   1 giorgio  staff    1885 28 Mar 19:13 index_arcade_mode.html
-rw-r--r--   1 giorgio  staff    1561 25 Mar 17:08 index_bar.html
-rw-r--r--   1 giorgio  staff    2121 28 Mar 19:13 index_zen_mode.html
drwxr-xr-x   6 giorgio  staff     192 25 Mar 17:08 libraries
drwxr-xr-x  66 giorgio  staff    2112 29 Mar 11:34 node_modules
-rw-r--r--   1 giorgio  staff   20696 28 Mar 19:13 package-lock.json
-rw-r--r--   1 giorgio  staff     913 29 Mar 11:34 package.json
-rw-r--r--   1 giorgio  staff     936 28 Mar 19:13 server.js
drwxr-xr-x   8 giorgio  staff     256 25 Mar 17:08 sketch_folder
-rw-r--r--   1 giorgio  staff     220 26 Mar 15:19 style.css
MBP-di-Giorgio:CatchThePitch giorgio$ node server.js
server started 8000
```


# Dependencies
* [P5.js](https://p5js.org/) - P5.js is a JavaScript library for creative coding, it is based on a sketch metaphor and it encompasses a whole set of drawing tools as well as the possibility of treating the HTML page as a canvas.
* [Tone.js](https://github.com/Tonejs/Tone.js) - Tone.js is a framework for creating interactive music in the browser.
* [Teoria.js](https://github.com/saebekassebil/teoria) - Teoria.js is a lightweight and fast JavaScript library for music theory, both Jazz and Classical. It aims at providing an intuitive programming interface for music software.
# Acknowledgements
We would like to thank our Professors Francesco Bruschi and Vincenzo Rana ([Advanced Coding Tools & Methodologies](https://www4.ceda.polimi.it/manifesti/manifesti/controller/ManifestoPublic.do?EVN_DETTAGLIO_RIGA_MANIFESTO=evento&aa=2019&k_cf=225&k_corso_la=263&k_indir=MMI&codDescr=052828&lang=IT&semestre=1&anno_corso=1&idItemOfferta=143936&idRiga=244569)) and Professor Augusto Sarti ([Computer Music Representations and Models](https://www4.ceda.polimi.it/manifesti/manifesti/controller/ManifestoPublic.do?EVN_DETTAGLIO_RIGA_MANIFESTO=evento&aa=2019&k_cf=225&k_corso_la=263&k_indir=MMI&codDescr=054282&lang=IT&semestre=1&anno_corso=1&idItemOfferta=143936&idRiga=244580)), M.Sc in Music and Acoustics Engineering at Politecnico di Milano.





Created by [Giorgio](https://github.com/delucagiorgio) and [me](https://github.com/totalmentecasuale) for an **Advanced Coding Tools and Methodologies** and **Computer Music Representations and Models** joint project.
