/* Embedded so the complete bilingual app also works from static/offline hosts. */
(() => {
  "use strict";

  const ui = {
    en: {
      pageTitle: "Karel online",
      tagline: "A browser-based algorithm trainer — no installation needed",
      navLabel: "Navigation",
      navDiagrams: "Flowcharts",
      languageLabel: "Language",
      taskSelect: "Task",
      program: "Program",
      editorAria: "Pseudocode editor",
      controlsAria: "Program controls",
      run: "Run",
      step: "Step",
      pause: "Pause",
      check: "Check",
      solution: "Solution",
      reset: "Reset",
      animationSpeed: "Animation speed",
      currentLine: "Current line",
      pseudocodeLanguage: "Pseudocode language",
      conditions: "Conditions",
      taskHeading: "Task",
      worldHeading: "Karel's world",
      canvasAria: "Map of Karel's world",
      legendAria: "Map legend",
      "legend.target": "target",
      "legend.beeper": "beeper",
      "legend.wall": "wall",
      "legend.lastMove": "last move",
      "ref.stepCode": "step",
      "ref.stepDesc": "move one square forward",
      "ref.leftCode": "left",
      "ref.leftDesc": "turn 90 degrees to the left",
      "ref.rightCode": "right",
      "ref.rightDesc": "turn 90 degrees to the right",
      "ref.pickCode": "pick",
      "ref.pickDesc": "pick up a beeper from the current square",
      "ref.putCode": "put",
      "ref.putDesc": "put down a beeper from the bag",
      "ref.repeatCode": "repeat 4",
      "ref.repeatDesc": "run a block a fixed number of times",
      "ref.whileCode": "while front_is_clear",
      "ref.whileDesc": "repeat a block while a condition is true",
      "ref.ifCode": "if beepers_present",
      "ref.ifDesc": "run a block only when a condition is true",
      "ref.elseCode": "else",
      "ref.elseDesc": "optional branch after an if block",
      "ref.functionCode": "function name",
      "ref.functionDesc": "a custom instruction closed with end",
      "ref.conditions": "front_is_clear|front_is_blocked|left_is_clear|left_is_blocked|right_is_clear|right_is_blocked|beepers_present|no_beepers_present|beepers_in_bag|facing_north|facing_south|facing_east|facing_west",
      "ref.example": "repeat 3\n  step\nend\n\nif beepers_present\n  pick\nelse\n  left\nend",
      "status.ready": "Ready",
      "status.modified": "Modified",
      "status.paused": "Paused",
      "status.running": "Running",
      "status.done": "Done",
      "status.error": "Error",
      "status.solutionInserted": "Solution inserted",
      "status.passed": "Passed",
      "status.notPassed": "Not passed",
      "direction.N": "north",
      "direction.E": "east",
      "direction.S": "south",
      "direction.W": "west",
      commandsCount: "{count} commands",
      bagCount: "bag {count}",
      taskFallback: "task",
      noAutomaticGoal: "This task does not have an automatically configured goal.",
      introLog: "Choose a task, write a program, and run Karel.",
      resetLog: "The world was reset to its initial state.",
      loadedTaskLog: "Task loaded: {title}",
      solutionLog: "The solution was inserted into the editor.",
      programReadyLog: "The program is ready to run.",
      programEndedLog: "The program finished.",
      noAutomaticCheck: "This task does not have automatic goal checking.",
      goalPassed: "Goal passed: {passed}/{total}.",
      goalNotPassed: "Goal not passed yet: {passed}/{total}.",
      linePrefix: "Line {line}: ",
      lineShort: "L{line}",
      lineUnknown: "L?",
      actionStep: "{line}: step to ({x}, {y})",
      actionTurn: "{line}: {action}, facing {direction}",
      actionBeeper: "{line}: {action} a beeper, bag {bag}",
      actionWait: "{line}: wait",
      commandStep: "step",
      commandLeft: "turn left",
      commandRight: "turn right",
      commandBack: "turn around",
      commandPick: "pick",
      commandPut: "put",
      commandWait: "wait",
      "error.unexpected": "Unexpected command {token}.",
      "error.endWithoutBlock": "The end command does not have a matching block.",
      "error.elseOutsideIf": "The else command can only appear inside an if command.",
      "error.functionOutside": "Define functions outside if, while, and repeat blocks.",
      "error.functionNeedsName": "A function needs a name.",
      "error.reservedName": "The name {name} is a reserved command.",
      "error.functionMissingEnd": "Function {name} is not closed with end.",
      "error.repeatMissingEnd": "The repeat block is not closed with end.",
      "error.whileMissingEnd": "The while block is not closed with end.",
      "error.elseMissingEnd": "The else branch is not closed with end.",
      "error.ifMissingEnd": "The if block is not closed with end.",
      "error.repeatCount": "The repeat command needs an integer from 0 to 999.",
      "error.conditionMissing": "A condition is missing.",
      "error.unknownCondition": "Unknown condition: {condition}.",
      "error.callDepth": "Function calls are nested too deeply.",
      "error.actionLimit": "The program exceeded the limit of {limit} executed commands.",
      "error.unknownCommand": "Unknown command or function: {command}.",
      "error.emptyWhile": "An empty while loop would never change the program state.",
      "error.loopLimit": "The while loop exceeded the safe iteration limit.",
      "error.wall": "Karel cannot step forward: there is a wall or the edge of the world ahead.",
      "error.noBeeper": "There is no beeper on this square to pick up.",
      "error.emptyBag": "Karel has no beeper in the bag."
    },
    sk: {
      pageTitle: "Karel online",
      tagline: "Statický trenažér algoritmizácie bez inštalácie",
      navLabel: "Navigácia",
      navDiagrams: "Diagramy",
      languageLabel: "Jazyk",
      taskSelect: "Zadanie",
      program: "Program",
      editorAria: "Editor pseudokódu",
      controlsAria: "Ovládanie programu",
      run: "Spustiť",
      step: "Krokovať",
      pause: "Pauza",
      check: "Skontrolovať",
      solution: "Riešenie",
      reset: "Reset",
      animationSpeed: "Rýchlosť animácie",
      currentLine: "Aktuálny riadok",
      pseudocodeLanguage: "Jazyk pseudokódu",
      conditions: "Podmienky",
      taskHeading: "Zadanie",
      worldHeading: "Svet Karla",
      canvasAria: "Mapa sveta robota Karla",
      legendAria: "Legenda mapy",
      "legend.target": "cieľ",
      "legend.beeper": "značka",
      "legend.wall": "stena",
      "legend.lastMove": "posledný pohyb",
      "ref.stepCode": "krok",
      "ref.stepDesc": "posuň sa o jedno políčko dopredu",
      "ref.leftCode": "vlavo",
      "ref.leftDesc": "otoč sa o 90 stupňov doľava",
      "ref.rightCode": "vpravo",
      "ref.rightDesc": "otoč sa o 90 stupňov doprava",
      "ref.pickCode": "zober",
      "ref.pickDesc": "zober značku z aktuálneho políčka",
      "ref.putCode": "poloz",
      "ref.putDesc": "polož značku z batohu",
      "ref.repeatCode": "opakuj 4",
      "ref.repeatDesc": "vykonaj blok pevný počet krát",
      "ref.whileCode": "kym volno_vpredu",
      "ref.whileDesc": "opakuj blok, kým platí podmienka",
      "ref.ifCode": "ak znacka",
      "ref.ifDesc": "vykonaj blok iba pri splnenej podmienke",
      "ref.elseCode": "inak",
      "ref.elseDesc": "voliteľná vetva za príkazom ak",
      "ref.functionCode": "funkcia nazov",
      "ref.functionDesc": "vlastná inštrukcia ukončená slovom koniec",
      "ref.conditions": "volno_vpredu|stena_vpredu|volno_vlavo|stena_vlavo|volno_vpravo|stena_vpravo|znacka|bez_znacky|mam_znacku|smer_sever|smer_juh|smer_vychod|smer_zapad",
      "ref.example": "opakuj 3\n  krok\nkoniec\n\nak znacka\n  zober\ninak\n  vlavo\nkoniec",
      "status.ready": "Pripravený",
      "status.modified": "Upravený",
      "status.paused": "Pauza",
      "status.running": "Beží",
      "status.done": "Hotovo",
      "status.error": "Chyba",
      "status.solutionInserted": "Riešenie vložené",
      "status.passed": "Splnené",
      "status.notPassed": "Nesplnené",
      "direction.N": "sever",
      "direction.E": "východ",
      "direction.S": "juh",
      "direction.W": "západ",
      commandsCount: "{count} príkazov",
      bagCount: "batoh {count}",
      taskFallback: "zadanie",
      noAutomaticGoal: "Toto zadanie nemá automaticky nastavený cieľ.",
      introLog: "Vyber zadanie, napíš program a spusti Karla.",
      resetLog: "Svet bol vrátený do počiatočného stavu.",
      loadedTaskLog: "Načítané zadanie: {title}",
      solutionLog: "Do editora bolo vložené riešenie.",
      programReadyLog: "Program je pripravený na spustenie.",
      programEndedLog: "Program skončil.",
      noAutomaticCheck: "Toto zadanie nemá automatickú kontrolu cieľa.",
      goalPassed: "Cieľ splnený: {passed}/{total}.",
      goalNotPassed: "Cieľ zatiaľ nesplnený: {passed}/{total}.",
      linePrefix: "Riadok {line}: ",
      lineShort: "R{line}",
      lineUnknown: "R?",
      actionStep: "{line}: krok na ({x}, {y})",
      actionTurn: "{line}: {action}, smer {direction}",
      actionBeeper: "{line}: {action} značku, batoh {bag}",
      actionWait: "{line}: čakaj",
      commandStep: "krok",
      commandLeft: "otoč vľavo",
      commandRight: "otoč vpravo",
      commandBack: "otoč sa",
      commandPick: "zober",
      commandPut: "polož",
      commandWait: "čakaj",
      "error.unexpected": "Neočakávaný príkaz {token}.",
      "error.endWithoutBlock": "Príkaz koniec nemá zodpovedajúci blok.",
      "error.elseOutsideIf": "Príkaz inak môže byť iba vo vnútri príkazu ak.",
      "error.functionOutside": "Funkciu definuj mimo blokov ak, kym a opakuj.",
      "error.functionNeedsName": "Funkcia potrebuje názov.",
      "error.reservedName": "Názov {name} je vyhradený príkaz.",
      "error.functionMissingEnd": "Funkcia {name} nie je ukončená príkazom koniec.",
      "error.repeatMissingEnd": "Blok opakuj nie je ukončený príkazom koniec.",
      "error.whileMissingEnd": "Blok kym nie je ukončený príkazom koniec.",
      "error.elseMissingEnd": "Vetva inak nie je ukončená príkazom koniec.",
      "error.ifMissingEnd": "Blok ak nie je ukončený príkazom koniec.",
      "error.repeatCount": "Príkaz opakuj potrebuje celé číslo od 0 do 999.",
      "error.conditionMissing": "Podmienka chýba.",
      "error.unknownCondition": "Neznáma podmienka: {condition}.",
      "error.callDepth": "Príliš hlboké volanie funkcií.",
      "error.actionLimit": "Program prekročil limit {limit} vykonaných príkazov.",
      "error.unknownCommand": "Neznámy príkaz alebo funkcia: {command}.",
      "error.emptyWhile": "Prázdny cyklus kym by nikdy nezmenil stav programu.",
      "error.loopLimit": "Cyklus kym prekročil bezpečnostný limit opakovaní.",
      "error.wall": "Karel nemôže spraviť krok: pred ním je stena alebo okraj sveta.",
      "error.noBeeper": "Na tomto políčku nie je žiadna značka na zodvihnutie.",
      "error.emptyBag": "Karel nemá v batohu žiadnu značku."
    }
  };

  const tasks = { en: {
    "first-path": {
      title: "First path", level: "1 - sequence",
      story: "Karel starts in the bottom-left corner and must reach the marked square. This is a fixed sequence of steps without conditions.",
      goals: ["The beeper is collected.", "Karel has the beeper in his bag."],
      starter: "# Use a simple sequence of commands\nstep\n",
      example: "repeat 3\n  step\nend\npick\n"
    },
    turning: {
      title: "Turns and direction", level: "1 - sequence",
      story: "The beeper is to Karel's left. This task shows that the step command always depends on the robot's current direction.",
      goals: ["The beeper is collected.", "Karel finishes on square (2, 2)."],
      starter: "# The beeper is to Karel's left\nleft\n",
      example: "left\nstep\npick\n"
    },
    delivery: {
      title: "Delivery robot", level: "1 - sequence",
      story: "Karel has three packages in his bag. Deliver them to the three houses at (2, 2), (4, 2), and (5, 3).",
      goals: ["Every house has a delivered package.", "Karel has no packages left in his bag."],
      starter: "# Deliver packages to the three specified squares\n",
      example: "step\nleft\nstep\nput\nturn_around\nstep\nleft\nstep\nstep\nleft\nstep\nput\nturn_around\nstep\nleft\nstep\nleft\nstep\nstep\nput\n"
    },
    square: {
      title: "Square", level: "2 - repetition",
      story: "Karel must travel around the perimeter of a 4 x 4 square and return to his starting position and direction. Look for a repeating pattern.",
      goals: ["Karel returns to the start.", "Karel is facing east again."],
      starter: "# Do you really need to write the same steps four times?\n",
      example: "repeat 4\n  repeat 3\n    step\n  end\n  left\nend\n"
    },
    "unknown-corridor": {
      title: "Unknown corridor length", level: "2 - while loop",
      story: "Karel does not know how long the corridor is. He must walk to the end and collect every beeper along the way.",
      goals: ["All beepers in the corridor are collected.", "Karel reaches the end of the corridor."],
      starter: "while front_is_clear\n  step\nend\n",
      example: "while front_is_clear\n  step\n  if beepers_present\n    pick\n  end\nend\n\nif beepers_present\n  pick\nend\n"
    },
    paving: {
      title: "Paving the path", level: "2 - while loop",
      story: "Karel walks along a path of unknown length and must mark every square with a beeper.",
      goals: ["Every square of the path has exactly one beeper.", "Karel finishes at the end of the path."],
      starter: "# Put a beeper on the first square too\n",
      example: "put\nwhile front_is_clear\n  step\n  put\nend\n"
    },
    "road-repair": {
      title: "Road repair", level: "3 - decisions",
      story: "Some squares on the path have beepers and others do not. Karel must fill only the missing spots without adding a second beeper where one already exists.",
      goals: ["Every square of the path has exactly one beeper.", "Karel finishes at the end of the path."],
      starter: "function repair\n  if no_beepers_present\n    put\n  end\nend\n\n",
      example: "function repair\n  if no_beepers_present\n    put\n  end\nend\n\nrepair\nwhile front_is_clear\n  step\n  repair\nend\n"
    },
    storekeeper: {
      title: "Storekeeper 1: individual packages", level: "3 - decisions",
      story: "Packages are scattered along a row. Karel must collect them all and carry them to the end of the corridor.",
      goals: ["All three packages are stored at the end of the corridor.", "Karel stands at the end of the corridor."],
      starter: "# Collect while you can move forward, then unload everything\n",
      example: "while front_is_clear\n  step\n  while beepers_present\n    pick\n  end\nend\n\nwhile beepers_in_bag\n  put\nend\n"
    },
    "storekeeper-stacks": {
      title: "Storekeeper 2: stacks of packages", level: "3 - nested loop",
      story: "Packages no longer appear one at a time. Some squares hold a whole stack, so Karel must keep collecting at each location until nothing remains.",
      goals: ["All eight packages are stored in the warehouse at the end of the corridor.", "Karel stands in the warehouse at the end of the corridor."],
      starter: "# One square may contain several packages\n",
      example: "while front_is_clear\n  step\n  while beepers_present\n    pick\n  end\nend\n\nwhile beepers_in_bag\n  put\nend\n"
    },
    vacuum: {
      title: "Vacuum 1: small room", level: "4 - traversal",
      story: "Dirt is scattered across the room. Karel must systematically traverse the entire room row by row and collect it all.",
      goals: ["No dirt remains in the room.", "Karel finishes in the top-right corner."],
      starter: "function pick_if_present\n  if beepers_present\n    pick\n  end\nend\n\npick_if_present\n",
      example: "function pick_if_present\n  if beepers_present\n    pick\n  end\nend\n\npick_if_present\nrepeat 3\n  step\n  pick_if_present\nend\nleft\nstep\nleft\npick_if_present\nrepeat 3\n  step\n  pick_if_present\nend\nright\nstep\nright\npick_if_present\nrepeat 3\n  step\n  pick_if_present\nend\n"
    },
    "vacuum-large": {
      title: "Vacuum 2: larger room", level: "4 - systematic traversal",
      story: "The room is larger and the dirt is distributed irregularly. Karel should traverse it systematically row by row instead of wandering randomly.",
      goals: ["No dirt remains in the room.", "Karel finishes in the top-left corner after traversing the entire room."],
      starter: "function pick_if_present\n  if beepers_present\n    pick\n  end\nend\n\n",
      example: "function pick_if_present\n  if beepers_present\n    pick\n  end\nend\n\npick_if_present\nrepeat 5\n  step\n  pick_if_present\nend\nleft\nstep\nleft\npick_if_present\nrepeat 5\n  step\n  pick_if_present\nend\nright\nstep\nright\npick_if_present\nrepeat 5\n  step\n  pick_if_present\nend\nleft\nstep\nleft\npick_if_present\nrepeat 5\n  step\n  pick_if_present\nend\n"
    },
    checkerboard: {
      title: "Checkerboard", level: "4 - nested pattern",
      story: "Mark a 5 x 5 checkerboard. The first row starts with a beeper on the first square; the second row starts on the second square. Look for an alternating two-row pattern.",
      goals: ["All 13 checkerboard squares are marked."],
      starter: "function odd_row\n  # mark squares 1, 3, and 5\nend\n\n",
      example: "function odd_row\n  put\n  step\n  step\n  put\n  step\n  step\n  put\nend\n\nfunction even_row\n  step\n  put\n  step\n  step\n  put\n  step\nend\n\nfunction next_row_from_right\n  left\n  step\n  left\nend\n\nfunction next_row_from_left\n  right\n  step\n  right\nend\n\nodd_row\nnext_row_from_right\neven_row\nnext_row_from_left\nodd_row\nnext_row_from_right\neven_row\nnext_row_from_left\nodd_row\n"
    },
    stairs: {
      title: "Stairs 1: regular", level: "4 - problem decomposition",
      story: "Karel must climb a regular staircase. He places a beeper on every step and finishes on the highest step.",
      goals: ["Every step is marked with exactly one beeper.", "Karel finishes on the highest step."],
      starter: "function climb_step\n  step\n  left\n  step\n  right\nend\n\n",
      example: "function climb_step\n  step\n  left\n  step\n  right\nend\n\nput\nrepeat 4\n  climb_step\n  put\nend\n"
    },
    "stairs-irregular": {
      title: "Stairs 2: irregular", level: "4 - generalization",
      story: "The steps no longer have equal lengths. Karel must find the end of each platform, climb higher, and mark every corner of the staircase.",
      goals: ["All five corners of the staircase are marked.", "Karel finishes at the highest corner of the staircase."],
      starter: "function climb_one_level\n  left\n  step\n  right\nend\n\nput\n",
      example: "put\nrepeat 2\n  step\nend\nleft\nstep\nright\nput\nstep\nleft\nstep\nright\nput\nrepeat 3\n  step\nend\nleft\nstep\nright\nput\nstep\nleft\nstep\nput\n"
    },
    pyramid: {
      title: "Beeper pyramid", level: "4 - nested repetition",
      story: "Build a 7, 5, 3, 1 pyramid from beepers. Each higher row is shorter and starts one square farther to the right.",
      goals: ["The pyramid has rows with widths 7, 5, 3, and 1.", "Karel finishes at the top of the pyramid."],
      starter: "# Build the bottom row first, then look for the shrinking pattern\n",
      example: "repeat 6\n  put\n  step\nend\nput\n\nleft\nstep\nleft\nstep\nput\nrepeat 4\n  step\n  put\nend\n\nright\nstep\nright\nstep\nput\nrepeat 2\n  step\n  put\nend\n\nleft\nstep\nleft\nstep\nput\n"
    },
    hurdles: {
      title: "Hurdles 1: equal height", level: "4 - procedure",
      story: "Karel runs to the right. Whenever he meets an obstacle of the same height, he uses the same procedure: climb up, cross over it, climb down, and continue.",
      goals: ["Karel collects the beeper at the finish.", "Karel stands at the finish beyond the last obstacle."],
      starter: "function jump\n  # complete the procedure for one obstacle\nend\n\n",
      example: "function jump\n  left\n  step\n  right\n  step\n  right\n  step\n  left\nend\n\nwhile no_beepers_present\n  if front_is_blocked\n    jump\n  else\n    step\n  end\nend\npick\n"
    },
    "hurdles-irregular": {
      title: "Hurdles 2: different heights", level: "5 - generalization",
      story: "The obstacles have different heights. Karel cannot use a fixed one-square jump; he must climb while the obstacle remains on his right.",
      goals: ["Karel collects the beeper at the finish.", "Karel stands at the finish beyond the last obstacle."],
      starter: "function jump\n  # climb while the obstacle is on the right\nend\n\n",
      example: "function jump\n  left\n  while right_is_blocked\n    step\n  end\n  right\n  step\n  right\n  while front_is_clear\n    step\n  end\n  left\nend\n\nwhile no_beepers_present\n  if front_is_blocked\n    jump\n  else\n    step\n  end\nend\npick\n"
    },
    "hurdles-hard": {
      title: "Hurdles 3: long track", level: "5 - general algorithm",
      story: "The longer track combines low and high obstacles with irregular gaps. The solution should use one general procedure for an obstacle of any height.",
      goals: ["Karel collects the beeper at the finish.", "Karel stands at the end of the track."],
      starter: "function jump\n  # the same procedure must handle every height\nend\n\n",
      example: "function jump\n  left\n  while right_is_blocked\n    step\n  end\n  right\n  step\n  right\n  while front_is_clear\n    step\n  end\n  left\nend\n\nwhile no_beepers_present\n  if front_is_blocked\n    jump\n  else\n    step\n  end\nend\npick\n"
    },
    frame: {
      title: "Picture frame", level: "5 - general algorithm",
      story: "Karel has many beepers in his bag. Mark the boundary of the world so that every edge square contains a beeper.",
      goals: ["Every boundary square has at least one beeper.", "Karel is facing east when finished."],
      starter: "function mark\n  if no_beepers_present\n    put\n  end\nend\n\n",
      example: "function mark\n  if no_beepers_present\n    put\n  end\nend\n\nrepeat 4\n  mark\n  while front_is_clear\n    step\n    mark\n  end\n  left\nend\n"
    },
    maze: {
      title: "Maze", level: "5 - general algorithm",
      story: "Karel must find the beeper in the maze. The goal is not to memorize a particular route, but to use a rule that also works after a similar change to the map.",
      goals: ["The beeper at the target is collected.", "Karel reaches the target at (7, 5)."],
      starter: "while no_beepers_present\n  # right-hand rule\nend\n",
      example: "while no_beepers_present\n  if right_is_clear\n    right\n    step\n  else\n    if front_is_clear\n      step\n    else\n      left\n    end\n  end\nend\npick\n"
    },
    "treasure-search": {
      title: "Find the treasure", level: "5 - traversal with termination",
      story: "There is one treasure in the room. Do not write a route to one specific square; traverse the room systematically and stop only when Karel is standing on the beeper.",
      goals: ["The treasure is collected.", "Karel has the treasure in his bag."],
      starter: "while no_beepers_present\n  # move systematically along the rows\nend\n",
      example: "while no_beepers_present\n  if front_is_clear\n    step\n  else\n    if facing_east\n      left\n      step\n      left\n    else\n      right\n      step\n      right\n    end\n  end\nend\npick\n"
    },
    "shortest-route": {
      title: "Shortest route", level: "5 - challenge",
      story: "Get Karel from the start to the target. After completing the task, compare the number of executed commands and the length of the program.",
      goals: ["Karel collects the beeper at the target.", "Karel stands at the target."],
      starter: "# Make the program work first, then shorten the route\n",
      example: "step\nstep\nleft\nstep\nstep\nright\nstep\nstep\nleft\nstep\nright\nstep\npick\n"
    }
  }};

  window.KAREL_I18N = { ui, tasks };
})();


(() => {
  "use strict";

  const I18N = window.KAREL_I18N || { ui: { en: {} }, tasks: { en: {} } };
  const SUPPORTED_LANGUAGES = new Set(["en", "sk"]);

  const MAX_ACTIONS = 5000;
  const MAX_LOOP_ITERATIONS = 1200;
  const MAX_CALL_DEPTH = 80;

  const DIRS = {
    N: { dx: 0, dy: 1, left: "W", right: "E", back: "S", label: "sever", angle: -Math.PI / 2 },
    E: { dx: 1, dy: 0, left: "N", right: "S", back: "W", label: "východ", angle: 0 },
    S: { dx: 0, dy: -1, left: "E", right: "W", back: "N", label: "juh", angle: Math.PI / 2 },
    W: { dx: -1, dy: 0, left: "S", right: "N", back: "E", label: "západ", angle: Math.PI }
  };

  const COMMAND_ALIASES = {
    krok: "step",
    step: "step",
    chod: "step",
    dopredu: "step",
    vlavo: "left",
    otoc_vlavo: "left",
    turn_left: "left",
    left: "left",
    vpravo: "right",
    otoc_vpravo: "right",
    turn_right: "right",
    right: "right",
    otoc_sa: "back",
    otoc_opacne: "back",
    turn_around: "back",
    zober: "pick",
    zdvihni: "pick",
    zober_znacku: "pick",
    pick: "pick",
    pick_beeper: "pick",
    poloz: "put",
    poloz_znacku: "put",
    put: "put",
    put_beeper: "put",
    cakaj: "wait",
    wait: "wait"
  };

  const CONDITION_ALIASES = {
    volno_vpredu: "frontClear",
    vpredu_volno: "frontClear",
    front_is_clear: "frontClear",
    clear_front: "frontClear",
    stena_vpredu: "frontBlocked",
    vpredu_stena: "frontBlocked",
    front_is_blocked: "frontBlocked",
    volno_vlavo: "leftClear",
    vlavo_volno: "leftClear",
    left_is_clear: "leftClear",
    stena_vlavo: "leftBlocked",
    vlavo_stena: "leftBlocked",
    left_is_blocked: "leftBlocked",
    volno_vpravo: "rightClear",
    vpravo_volno: "rightClear",
    right_is_clear: "rightClear",
    stena_vpravo: "rightBlocked",
    vpravo_stena: "rightBlocked",
    right_is_blocked: "rightBlocked",
    znacka: "beeperPresent",
    znacka_tu: "beeperPresent",
    beeper: "beeperPresent",
    beepers_present: "beeperPresent",
    bez_znacky: "noBeeperPresent",
    no_beeper: "noBeeperPresent",
    no_beepers_present: "noBeeperPresent",
    mam_znacku: "beepersInBag",
    mam_znacky: "beepersInBag",
    beepers_in_bag: "beepersInBag",
    prazdny_batoh: "noBeepersInBag",
    no_beepers_in_bag: "noBeepersInBag",
    smer_sever: "facingNorth",
    facing_north: "facingNorth",
    smer_juh: "facingSouth",
    facing_south: "facingSouth",
    smer_vychod: "facingEast",
    facing_east: "facingEast",
    smer_zapad: "facingWest",
    facing_west: "facingWest"
  };

  const DIRECTION_ALIASES = {
    n: "N",
    north: "N",
    sever: "N",
    s: "S",
    south: "S",
    juh: "S",
    e: "E",
    east: "E",
    vychod: "E",
    w: "W",
    west: "W",
    zapad: "W"
  };

  const TASKS = [
    {
      id: "first-path",
      title: "Prvá cesta",
      level: "1 - sekvencia",
      story: "Karel stojí v ľavom dolnom rohu a má sa dostať na označené políčko. Ide o pevnú postupnosť krokov bez podmienok.",
      goals: [
        { type: "collectAll", text: "Značka je pozbieraná." },
        { type: "bagAtLeast", count: 1, text: "Karel má značku v batohu." }
      ],
      world: {
        width: 5,
        height: 3,
        karel: { x: 1, y: 1, dir: "E", bag: 0 },
        beepers: [{ x: 4, y: 1, count: 1 }],
        walls: []
      },
      starter: "# Použi jednoduchú postupnosť príkazov\nkrok\n",
      example: "opakuj 3\n  krok\nkoniec\nzober\n"
    },
    {
      id: "turning",
      title: "Otočky a smer",
      level: "1 - sekvencia",
      story: "Značka je naľavo od Karla. Úloha ukazuje, že príkaz krok vždy závisí od aktuálneho smeru robota.",
      goals: [
        { type: "collectAll", text: "Značka je pozbieraná." },
        { type: "at", x: 2, y: 2, text: "Karel skončí na políčku (2, 2)." }
      ],
      world: {
        width: 4,
        height: 4,
        karel: { x: 3, y: 2, dir: "N", bag: 0 },
        beepers: [{ x: 2, y: 2, count: 1 }],
        walls: []
      },
      starter: "# Značka je naľavo od Karla\nvlavo\n",
      example: "vlavo\nkrok\nzober\n"
    },
    {
      id: "delivery",
      title: "Doručovateľ",
      level: "1 - sekvencia",
      story: "Karel má v batohu tri balíky. Doruč ich na tri domy: (2, 2), (4, 2) a (5, 3).",
      goals: [
        { type: "pointsMarked", points: [{ x: 2, y: 2 }, { x: 4, y: 2 }, { x: 5, y: 3 }], text: "Každý dom má doručený balík." },
        { type: "bagEquals", count: 0, text: "Karel už nemá v batohu žiadny balík." }
      ],
      world: {
        width: 5,
        height: 3,
        karel: { x: 1, y: 1, dir: "E", bag: 3 },
        beepers: [],
        walls: []
      },
      starter: "# Doruč balíky na tri určené políčka\n",
      example: "krok\nvlavo\nkrok\npoloz\notoc_sa\nkrok\nvlavo\nkrok\nkrok\nvlavo\nkrok\npoloz\notoc_sa\nkrok\nvlavo\nkrok\nvlavo\nkrok\nkrok\npoloz\n"
    },
    {
      id: "square",
      title: "Štvorec",
      level: "2 - opakovanie",
      story: "Karel má obísť obvod štvorca 4 x 4 a vrátiť sa na pôvodné miesto s pôvodným smerom. Hľadaj opakujúci sa vzor.",
      goals: [
        { type: "at", x: 1, y: 1, text: "Karel sa vráti na štart." },
        { type: "facing", dir: "E", text: "Karel je znovu otočený na východ." }
      ],
      world: {
        width: 4,
        height: 4,
        karel: { x: 1, y: 1, dir: "E", bag: 0 },
        beepers: [],
        walls: []
      },
      starter: "# Naozaj treba rovnaké kroky písať štyrikrát?\n",
      example: "opakuj 4\n  opakuj 3\n    krok\n  koniec\n  vlavo\nkoniec\n"
    },
    {
      id: "unknown-corridor",
      title: "Neznáma dĺžka chodby",
      level: "2 - cyklus kým",
      story: "Karel nevie, aká dlhá je chodba. Má ísť až na koniec a po ceste pozbierať všetky značky.",
      goals: [
        { type: "collectAll", text: "Všetky značky v chodbe sú pozbierané." },
        { type: "at", x: 6, y: 1, text: "Karel príde na koniec chodby." }
      ],
      world: {
        width: 6,
        height: 1,
        karel: { x: 1, y: 1, dir: "E", bag: 0 },
        beepers: [
          { x: 3, y: 1, count: 1 },
          { x: 6, y: 1, count: 1 }
        ],
        walls: []
      },
      starter: "kym volno_vpredu\n  krok\nkoniec\n",
      example: "kym volno_vpredu\n  krok\n  ak znacka\n    zober\n  koniec\nkoniec\n\nak znacka\n  zober\nkoniec\n"
    },
    {
      id: "paving",
      title: "Pokladanie dlažby",
      level: "2 - cyklus kým",
      story: "Karel ide po chodníku neznámej dĺžky a má označiť každé políčko značkou.",
      goals: [
        {
          type: "exactBeepers",
          points: [
            { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 },
            { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }, { x: 8, y: 1 }
          ],
          text: "Každé políčko chodníka má presne jednu značku."
        },
        { type: "at", x: 8, y: 1, text: "Karel skončí na konci chodníka." }
      ],
      world: {
        width: 8,
        height: 1,
        karel: { x: 1, y: 1, dir: "E", bag: 20 },
        beepers: [],
        walls: []
      },
      starter: "# Polož značku aj na prvé políčko\n",
      example: "poloz\nkym volno_vpredu\n  krok\n  poloz\nkoniec\n"
    },
    {
      id: "road-repair",
      title: "Opravár cesty",
      level: "3 - rozhodovanie",
      story: "Na chodníku niektoré značky sú a niektoré chýbajú. Karel má doplniť iba chýbajúce miesta, nie pridávať druhé značky tam, kde už jedna je.",
      goals: [
        {
          type: "exactBeepers",
          points: [
            { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 },
            { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }, { x: 8, y: 1 },
            { x: 9, y: 1 }, { x: 10, y: 1 }, { x: 11, y: 1 }
          ],
          text: "Každé políčko chodníka má presne jednu značku."
        },
        { type: "at", x: 11, y: 1, text: "Karel skončí na konci chodníka." }
      ],
      world: {
        width: 11,
        height: 1,
        karel: { x: 1, y: 1, dir: "E", bag: 10 },
        beepers: [
          { x: 1, y: 1, count: 1 },
          { x: 2, y: 1, count: 1 },
          { x: 4, y: 1, count: 1 },
          { x: 7, y: 1, count: 1 },
          { x: 10, y: 1, count: 1 }
        ],
        walls: []
      },
      starter: "funkcia oprav\n  ak bez_znacky\n    poloz\n  koniec\nkoniec\n\n",
      example: "funkcia oprav\n  ak bez_znacky\n    poloz\n  koniec\nkoniec\n\noprav\nkym volno_vpredu\n  krok\n  oprav\nkoniec\n"
    },
    {
      id: "storekeeper",
      title: "Skladník 1: jednotlivé balíky",
      level: "3 - rozhodovanie",
      story: "V jednom riadku sú náhodne rozmiestnené balíky. Karel ich má všetky pozbierať a odniesť na koniec chodby.",
      goals: [
        { type: "onlyBeepersAt", x: 7, y: 1, count: 3, text: "Všetky tri balíky sú uložené na konci chodby." },
        { type: "at", x: 7, y: 1, text: "Karel stojí na konci chodby." }
      ],
      world: {
        width: 7,
        height: 1,
        karel: { x: 1, y: 1, dir: "E", bag: 0 },
        beepers: [
          { x: 2, y: 1, count: 1 },
          { x: 4, y: 1, count: 1 },
          { x: 5, y: 1, count: 1 }
        ],
        walls: []
      },
      starter: "# Zbieraj, kým sa dá ísť dopredu, potom všetko vylož\n",
      example: "kym volno_vpredu\n  krok\n  kym znacka\n    zober\n  koniec\nkoniec\n\nkym mam_znacku\n  poloz\nkoniec\n"
    },
    {
      id: "storekeeper-stacks",
      title: "Skladník 2: stohy balíkov",
      level: "3 - vnorený cyklus",
      story: "Balíky už nie sú iba po jednom. Na niektorých políčkach je celý stoh, takže Karel musí na každom mieste zbierať dovtedy, kým tam ešte niečo je.",
      goals: [
        { type: "onlyBeepersAt", x: 10, y: 1, count: 8, text: "Všetkých osem balíkov je uložených v sklade na konci chodby." },
        { type: "at", x: 10, y: 1, text: "Karel stojí v sklade na konci chodby." }
      ],
      world: {
        width: 10,
        height: 1,
        karel: { x: 1, y: 1, dir: "E", bag: 0 },
        beepers: [
          { x: 2, y: 1, count: 2 },
          { x: 5, y: 1, count: 1 },
          { x: 6, y: 1, count: 3 },
          { x: 9, y: 1, count: 2 }
        ],
        walls: []
      },
      starter: "# Na jednom policku moze byt viac balikov\n",
      example: "kym volno_vpredu\n  krok\n  kym znacka\n    zober\n  koniec\nkoniec\n\nkym mam_znacku\n  poloz\nkoniec\n"
    },
    {
      id: "vacuum",
      title: "Vysávač 1: malá miestnosť",
      level: "4 - prehľadávanie",
      story: "V miestnosti je špina na náhodných políčkach. Karel má prejsť celú miestnosť systematicky po riadkoch a všetko pozbierať.",
      goals: [
        { type: "collectAll", text: "V miestnosti nezostane žiadna špina." },
        { type: "at", x: 4, y: 3, text: "Karel skončí v pravom hornom rohu." }
      ],
      world: {
        width: 4,
        height: 3,
        karel: { x: 1, y: 1, dir: "E", bag: 0 },
        beepers: [
          { x: 1, y: 1, count: 1 },
          { x: 4, y: 1, count: 1 },
          { x: 3, y: 2, count: 1 },
          { x: 1, y: 3, count: 1 },
          { x: 4, y: 3, count: 1 }
        ],
        walls: []
      },
      starter: "funkcia zober_ak\n  ak znacka\n    zober\n  koniec\nkoniec\n\nzober_ak\n",
      example: "funkcia zober_ak\n  ak znacka\n    zober\n  koniec\nkoniec\n\nzober_ak\nopakuj 3\n  krok\n  zober_ak\nkoniec\nvlavo\nkrok\nvlavo\nzober_ak\nopakuj 3\n  krok\n  zober_ak\nkoniec\nvpravo\nkrok\nvpravo\nzober_ak\nopakuj 3\n  krok\n  zober_ak\nkoniec\n"
    },
    {
      id: "vacuum-large",
      title: "Vysávač 2: väčšia miestnosť",
      level: "4 - systematické prehľadávanie",
      story: "Miestnosť je väčšia a špina je rozmiestnená nepravidelne. Karel má použiť systematický prechod po riadkoch, nie náhodné blúdenie.",
      goals: [
        { type: "collectAll", text: "V miestnosti nezostane žiadna špina." },
        { type: "at", x: 1, y: 4, text: "Karel skončí v ľavom hornom rohu po prejdení celej miestnosti." }
      ],
      world: {
        width: 6,
        height: 4,
        karel: { x: 1, y: 1, dir: "E", bag: 0 },
        beepers: [
          { x: 2, y: 1, count: 1 },
          { x: 6, y: 1, count: 1 },
          { x: 4, y: 2, count: 1 },
          { x: 1, y: 3, count: 1 },
          { x: 5, y: 3, count: 1 },
          { x: 3, y: 4, count: 1 },
          { x: 6, y: 4, count: 1 }
        ],
        walls: []
      },
      starter: "funkcia zober_ak\n  ak znacka\n    zober\n  koniec\nkoniec\n\n",
      example: "funkcia zober_ak\n  ak znacka\n    zober\n  koniec\nkoniec\n\nzober_ak\nopakuj 5\n  krok\n  zober_ak\nkoniec\nvlavo\nkrok\nvlavo\nzober_ak\nopakuj 5\n  krok\n  zober_ak\nkoniec\nvpravo\nkrok\nvpravo\nzober_ak\nopakuj 5\n  krok\n  zober_ak\nkoniec\nvlavo\nkrok\nvlavo\nzober_ak\nopakuj 5\n  krok\n  zober_ak\nkoniec\n"
    },
    {
      id: "checkerboard",
      title: "Šachovnica",
      level: "4 - vnorený vzor",
      story: "Označ šachovnicu 5 x 5. Prvý riadok začína značkou na prvom políčku, druhý riadok na druhom políčku. Hľadaj striedanie dvoch typov riadkov.",
      goals: [
        {
          type: "exactBeepers",
          points: [
            { x: 1, y: 1 }, { x: 3, y: 1 }, { x: 5, y: 1 },
            { x: 2, y: 2 }, { x: 4, y: 2 },
            { x: 1, y: 3 }, { x: 3, y: 3 }, { x: 5, y: 3 },
            { x: 2, y: 4 }, { x: 4, y: 4 },
            { x: 1, y: 5 }, { x: 3, y: 5 }, { x: 5, y: 5 }
          ],
          text: "Všetkých 13 políčok šachovnice je označených."
        }
      ],
      world: {
        width: 5,
        height: 5,
        karel: { x: 1, y: 1, dir: "E", bag: 13 },
        beepers: [],
        walls: []
      },
      starter: "funkcia riadok_od_prveho\n  # oznac 1., 3. a 5. policko\nkoniec\n\n",
      example: "funkcia riadok_od_prveho\n  poloz\n  krok\n  krok\n  poloz\n  krok\n  krok\n  poloz\nkoniec\n\nfunkcia riadok_od_druheho\n  krok\n  poloz\n  krok\n  krok\n  poloz\n  krok\nkoniec\n\nfunkcia dalsi_riadok_sprava\n  vlavo\n  krok\n  vlavo\nkoniec\n\nfunkcia dalsi_riadok_zlava\n  vpravo\n  krok\n  vpravo\nkoniec\n\nriadok_od_prveho\ndalsi_riadok_sprava\nriadok_od_druheho\ndalsi_riadok_zlava\nriadok_od_prveho\ndalsi_riadok_sprava\nriadok_od_druheho\ndalsi_riadok_zlava\nriadok_od_prveho\n"
    },
    {
      id: "stairs",
      title: "Schodisko 1: pravidelné",
      level: "4 - rozklad problému",
      story: "Karel má vyjsť po pravidelných schodoch. Na každý schod položí značku a skončí na najvyššom schode.",
      goals: [
        { type: "exactBeepers", points: [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 5 }], text: "Každý schod je označený presne jednou značkou." },
        { type: "at", x: 5, y: 5, text: "Karel skončí na najvyššom schode." }
      ],
      world: {
        width: 5,
        height: 5,
        karel: { x: 1, y: 1, dir: "E", bag: 5 },
        beepers: [],
        walls: [
          { x: 1, y: 1, dir: "N" },
          { x: 2, y: 1, dir: "E" },
          { x: 2, y: 2, dir: "N" },
          { x: 3, y: 2, dir: "E" },
          { x: 3, y: 3, dir: "N" },
          { x: 4, y: 3, dir: "E" },
          { x: 4, y: 4, dir: "N" }
        ]
      },
      starter: "funkcia schod\n  krok\n  vlavo\n  krok\n  vpravo\nkoniec\n\n",
      example: "funkcia schod\n  krok\n  vlavo\n  krok\n  vpravo\nkoniec\n\npoloz\nopakuj 4\n  schod\n  poloz\nkoniec\n"
    },
    {
      id: "stairs-irregular",
      title: "Schodisko 2: nepravidelné",
      level: "4 - zovšeobecnenie",
      story: "Schody už nemajú rovnakú dĺžku. Karel má nájsť konce jednotlivých plošín, vystúpiť vyššie a označiť každý roh schodiska.",
      goals: [
        { type: "exactBeepers", points: [{ x: 1, y: 1 }, { x: 3, y: 2 }, { x: 4, y: 3 }, { x: 7, y: 4 }, { x: 8, y: 5 }], text: "Všetkých päť rohov schodiska je označených." },
        { type: "at", x: 8, y: 5, text: "Karel skončí na najvyššom rohu schodiska." }
      ],
      world: {
        width: 8,
        height: 5,
        karel: { x: 1, y: 1, dir: "E", bag: 5 },
        beepers: [],
        walls: [
          { x: 1, y: 1, dir: "N" },
          { x: 2, y: 1, dir: "N" },
          { x: 3, y: 1, dir: "E" },
          { x: 3, y: 2, dir: "N" },
          { x: 4, y: 2, dir: "E" },
          { x: 4, y: 3, dir: "N" },
          { x: 5, y: 3, dir: "N" },
          { x: 6, y: 3, dir: "N" },
          { x: 7, y: 3, dir: "E" },
          { x: 7, y: 4, dir: "N" }
        ]
      },
      starter: "funkcia vystup_o_poschodie\n  vlavo\n  krok\n  vpravo\nkoniec\n\npoloz\n",
      example: "poloz\nopakuj 2\n  krok\nkoniec\nvlavo\nkrok\nvpravo\npoloz\nkrok\nvlavo\nkrok\nvpravo\npoloz\nopakuj 3\n  krok\nkoniec\nvlavo\nkrok\nvpravo\npoloz\nkrok\nvlavo\nkrok\npoloz\n"
    },
    {
      id: "pyramid",
      title: "Pyramída zo značiek",
      level: "4 - vnorené opakovanie",
      story: "Postav pyramídu 7, 5, 3, 1 zo značiek. Každý vyšší riadok je kratší a začína o jedno políčko viac vpravo.",
      goals: [
        {
          type: "exactBeepers",
          points: [
            { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 },
            { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 5, y: 2 }, { x: 6, y: 2 },
            { x: 3, y: 3 }, { x: 4, y: 3 }, { x: 5, y: 3 },
            { x: 4, y: 4 }
          ],
          text: "Pyramída má riadky so šírkami 7, 5, 3, 1."
        },
        { type: "at", x: 4, y: 4, text: "Karel skončí na vrchole pyramídy." }
      ],
      world: {
        width: 7,
        height: 4,
        karel: { x: 1, y: 1, dir: "E", bag: 16 },
        beepers: [],
        walls: []
      },
      starter: "# Najprv postav spodny riadok, potom hladaj skracujuci sa vzor\n",
      example: "opakuj 6\n  poloz\n  krok\nkoniec\npoloz\n\nvlavo\nkrok\nvlavo\nkrok\npoloz\nopakuj 4\n  krok\n  poloz\nkoniec\n\nvpravo\nkrok\nvpravo\nkrok\npoloz\nopakuj 2\n  krok\n  poloz\nkoniec\n\nvlavo\nkrok\nvlavo\nkrok\npoloz\n"
    },
    {
      id: "hurdles",
      title: "Prekážkový beh 1: rovnaké",
      level: "4 - procedúra",
      story: "Karel beží doprava. Keď narazí na prekážku rovnakej výšky, použije rovnaký postup: vyjde hore, prejde ponad ňu, zíde dole a pokračuje.",
      goals: [
        { type: "collectAll", text: "Karel zoberie značku v cieli." },
        { type: "at", x: 11, y: 1, text: "Karel stojí v cieli za poslednou prekážkou." }
      ],
      world: {
        width: 11,
        height: 2,
        karel: { x: 1, y: 1, dir: "E", bag: 0 },
        beepers: [{ x: 11, y: 1, count: 1 }],
        walls: [
          { x: 3, y: 1, dir: "E" },
          { x: 6, y: 1, dir: "E" },
          { x: 9, y: 1, dir: "E" }
        ]
      },
      starter: "funkcia preskoc\n  # doplň postup pre jednu prekážku\nkoniec\n\n",
      example: "funkcia preskoc\n  vlavo\n  krok\n  vpravo\n  krok\n  vpravo\n  krok\n  vlavo\nkoniec\n\nkym bez_znacky\n  ak stena_vpredu\n    preskoc\n  inak\n    krok\n  koniec\nkoniec\nzober\n"
    },
    {
      id: "hurdles-irregular",
      title: "Prekážkový beh 2: rôzne výšky",
      level: "5 - zovšeobecnenie",
      story: "Prekážky majú rôznu výšku. Karel nemôže použiť pevný preskok o jedno políčko; musí stúpať, kým má prekážku napravo.",
      goals: [
        { type: "collectAll", text: "Karel zoberie značku v cieli." },
        { type: "at", x: 13, y: 1, text: "Karel stojí v cieli za poslednou prekážkou." }
      ],
      world: {
        width: 13,
        height: 4,
        karel: { x: 1, y: 1, dir: "E", bag: 0 },
        beepers: [{ x: 13, y: 1, count: 1 }],
        walls: [
          { x: 3, y: 1, dir: "E" },
          { x: 6, y: 1, dir: "E" },
          { x: 6, y: 2, dir: "E" },
          { x: 10, y: 1, dir: "E" },
          { x: 10, y: 2, dir: "E" },
          { x: 10, y: 3, dir: "E" }
        ]
      },
      starter: "funkcia preskoc\n  # stuplaj hore, kym je prekazka napravo\nkoniec\n\n",
      example: "funkcia preskoc\n  vlavo\n  kym stena_vpravo\n    krok\n  koniec\n  vpravo\n  krok\n  vpravo\n  kym volno_vpredu\n    krok\n  koniec\n  vlavo\nkoniec\n\nkym bez_znacky\n  ak stena_vpredu\n    preskoc\n  inak\n    krok\n  koniec\nkoniec\nzober\n"
    },
    {
      id: "hurdles-hard",
      title: "Prekážkový beh 3: dlhá trať",
      level: "5 - všeobecný algoritmus",
      story: "Dlhšia trať kombinuje nízke aj vysoké prekážky s nepravidelnými medzerami. Riešenie má byť jeden všeobecný postup pre ľubovoľnú výšku prekážky.",
      goals: [
        { type: "collectAll", text: "Karel zoberie značku v cieli." },
        { type: "at", x: 18, y: 1, text: "Karel stojí na konci trate." }
      ],
      world: {
        width: 18,
        height: 5,
        karel: { x: 1, y: 1, dir: "E", bag: 0 },
        beepers: [{ x: 18, y: 1, count: 1 }],
        walls: [
          { x: 4, y: 1, dir: "E" },
          { x: 4, y: 2, dir: "E" },
          { x: 7, y: 1, dir: "E" },
          { x: 11, y: 1, dir: "E" },
          { x: 11, y: 2, dir: "E" },
          { x: 11, y: 3, dir: "E" },
          { x: 11, y: 4, dir: "E" },
          { x: 15, y: 1, dir: "E" },
          { x: 15, y: 2, dir: "E" },
          { x: 15, y: 3, dir: "E" }
        ]
      },
      starter: "funkcia preskoc\n  # ten isty postup ma zvladnut kazdu vysku\nkoniec\n\n",
      example: "funkcia preskoc\n  vlavo\n  kym stena_vpravo\n    krok\n  koniec\n  vpravo\n  krok\n  vpravo\n  kym volno_vpredu\n    krok\n  koniec\n  vlavo\nkoniec\n\nkym bez_znacky\n  ak stena_vpredu\n    preskoc\n  inak\n    krok\n  koniec\nkoniec\nzober\n"
    },
    {
      id: "frame",
      title: "Rám obrazu",
      level: "5 - všeobecný algoritmus",
      story: "Karel má v batohu veľa značiek. Označ hranicu sveta tak, aby na každom okrajovom políčku ležala značka.",
      goals: [
        { type: "boundaryMarked", text: "Každé hraničné políčko má aspoň jednu značku." },
        { type: "facing", dir: "E", text: "Po dokončení je Karel otočený na východ." }
      ],
      world: {
        width: 5,
        height: 5,
        karel: { x: 1, y: 1, dir: "E", bag: 99 },
        beepers: [],
        walls: []
      },
      starter: "funkcia oznac\n  ak bez_znacky\n    poloz\n  koniec\nkoniec\n\n",
      example: "funkcia oznac\n  ak bez_znacky\n    poloz\n  koniec\nkoniec\n\nopakuj 4\n  oznac\n  kym volno_vpredu\n    krok\n    oznac\n  koniec\n  vlavo\nkoniec\n"
    },
    {
      id: "maze",
      title: "Bludisko",
      level: "5 - všeobecný algoritmus",
      story: "Karel má nájsť značku v bludisku. Cieľom nie je naspamäť napísať konkrétnu trasu, ale použiť pravidlo, ktoré funguje aj pri podobnej zmene mapy.",
      goals: [
        { type: "collectAll", text: "Značka v cieli je pozbieraná." },
        { type: "at", x: 7, y: 5, text: "Karel sa dostane do cieľa (7, 5)." }
      ],
      world: {
        width: 7,
        height: 5,
        karel: { x: 1, y: 1, dir: "E", bag: 0 },
        beepers: [{ x: 7, y: 5, count: 1 }],
        walls: [
          { x: 2, y: 1, dir: "N" },
          { x: 2, y: 2, dir: "N" },
          { x: 4, y: 1, dir: "N" },
          { x: 4, y: 2, dir: "E" },
          { x: 5, y: 2, dir: "N" },
          { x: 6, y: 2, dir: "N" },
          { x: 1, y: 3, dir: "E" },
          { x: 2, y: 3, dir: "E" },
          { x: 3, y: 3, dir: "N" },
          { x: 5, y: 3, dir: "E" },
          { x: 6, y: 4, dir: "N" }
        ]
      },
      starter: "kym bez_znacky\n  # pravidlo pravej ruky\nkoniec\n",
      example: "kym bez_znacky\n  ak volno_vpravo\n    vpravo\n    krok\n  inak\n    ak volno_vpredu\n      krok\n    inak\n      vlavo\n    koniec\n  koniec\nkoniec\nzober\n"
    },
    {
      id: "treasure-search",
      title: "Nájdi poklad",
      level: "5 - prehľadávanie s ukončením",
      story: "V miestnosti je jeden poklad. Nepíš trasu ku konkrétnemu políčku; prechádzaj miestnosť systematicky a skonči až vtedy, keď Karel stojí na značke.",
      goals: [
        { type: "collectAll", text: "Poklad je pozbieraný." },
        { type: "bagAtLeast", count: 1, text: "Karel má poklad v batohu." }
      ],
      world: {
        width: 5,
        height: 4,
        karel: { x: 1, y: 1, dir: "E", bag: 0 },
        beepers: [{ x: 4, y: 3, count: 1 }],
        walls: []
      },
      starter: "kym bez_znacky\n  # pohybuj sa systematicky po riadkoch\nkoniec\n",
      example: "kym bez_znacky\n  ak volno_vpredu\n    krok\n  inak\n    ak smer_vychod\n      vlavo\n      krok\n      vlavo\n    inak\n      vpravo\n      krok\n      vpravo\n    koniec\n  koniec\nkoniec\nzober\n"
    },
    {
      id: "shortest-route",
      title: "Najkratšia trasa",
      level: "5 - výzva",
      story: "Dostaň Karla zo štartu do cieľa. Po splnení porovnajte počet vykonaných príkazov a dĺžku zápisu programu.",
      goals: [
        { type: "collectAll", text: "Karel zoberie značku v cieli." },
        { type: "at", x: 6, y: 4, text: "Karel stojí v cieli." }
      ],
      world: {
        width: 6,
        height: 4,
        karel: { x: 1, y: 1, dir: "E", bag: 0 },
        beepers: [{ x: 6, y: 4, count: 1 }],
        walls: [
          { x: 2, y: 1, dir: "N" },
          { x: 2, y: 2, dir: "N" },
          { x: 3, y: 2, dir: "E" },
          { x: 4, y: 1, dir: "N" },
          { x: 4, y: 2, dir: "N" }
        ]
      },
      starter: "# Najprv nech program funguje, potom skracuj trasu\n",
      example: "krok\nkrok\nvlavo\nkrok\nkrok\nvpravo\nkrok\nkrok\nvlavo\nkrok\nvpravo\nkrok\nzober\n"
    }
  ];

  const el = {};
  let currentLanguage = "en";
  let editorSourceKind = "starter";
  let canvasContext = null;
  let currentTask = TASKS[0];
  let currentWorld = cloneWorld(TASKS[0].world);
  let state = null;
  let runner = null;
  let autoRunning = false;
  let programDirty = true;
  let actionCount = 0;
  let renderLayout = null;
  let currentAnimation = null;

  class KarelError extends Error {
    constructor(line, message) {
      super(message);
      this.name = "KarelError";
      this.line = line || null;
    }
  }

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    cacheElements();
    currentLanguage = getInitialLanguage();
    applyLanguageToDocument();
    canvasContext = el.worldCanvas.getContext("2d");
    populateTaskSelect();
    bindEvents();
    const requestedTask = new URLSearchParams(window.location.search).get("task");
    const initialTask = TASKS.some((task) => task.id === requestedTask) ? requestedTask : TASKS[0].id;
    loadTask(initialTask);
    resizeCanvas();
    updateSpeedOutput();
    appendLog(t("introLog"), "ok");

    if ("ResizeObserver" in window) {
      const observer = new ResizeObserver(resizeCanvas);
      observer.observe(el.worldCanvas.parentElement);
    }
    window.addEventListener("resize", resizeCanvas);
  }

  function cacheElements() {
    el.worldSelect = document.getElementById("worldSelect");
    el.loadExampleBtn = document.getElementById("loadExampleBtn");
    el.resetBtn = document.getElementById("resetBtn");
    el.codeEditor = document.getElementById("codeEditor");
    el.runBtn = document.getElementById("runBtn");
    el.stepBtn = document.getElementById("stepBtn");
    el.pauseBtn = document.getElementById("pauseBtn");
    el.checkBtn = document.getElementById("checkBtn");
    el.speedRange = document.getElementById("speedRange");
    el.speedValue = document.getElementById("speedValue");
    el.currentLine = document.getElementById("currentLine");
    el.consoleLog = document.getElementById("consoleLog");
    el.programState = document.getElementById("programState");
    el.worldCanvas = document.getElementById("worldCanvas");
    el.stepCount = document.getElementById("stepCount");
    el.positionState = document.getElementById("positionState");
    el.directionState = document.getElementById("directionState");
    el.bagState = document.getElementById("bagState");
    el.taskLevel = document.getElementById("taskLevel");
    el.taskTitle = document.getElementById("taskTitle");
    el.taskStory = document.getElementById("taskStory");
    el.goalList = document.getElementById("goalList");
    el.conditionTokens = document.getElementById("conditionTokens");
    el.languageButtons = Array.from(document.querySelectorAll("[data-lang]"));
  }

  function getInitialLanguage() {
    const requested = new URLSearchParams(window.location.search).get("lang");
    if (SUPPORTED_LANGUAGES.has(requested)) {
      return requested;
    }
    return "en";
  }

  function t(key, values = {}) {
    const dictionary = I18N.ui[currentLanguage] || I18N.ui.en || {};
    const fallback = I18N.ui.en || {};
    const template = dictionary[key] ?? fallback[key] ?? key;
    return String(template).replace(/\{(\w+)\}/g, (_, name) => values[name] ?? `{${name}}`);
  }

  function taskText(task, key) {
    const localized = I18N.tasks[currentLanguage]?.[task.id];
    return localized?.[key] ?? task[key] ?? "";
  }

  function goalText(task, goal, index) {
    return I18N.tasks[currentLanguage]?.[task.id]?.goals?.[index] ?? goal.text;
  }

  function applyLanguageToDocument() {
    document.documentElement.lang = currentLanguage;
    document.title = t("pageTitle");
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
      node.setAttribute("aria-label", t(node.dataset.i18nAria));
    });
    if (el.conditionTokens) {
      el.conditionTokens.replaceChildren(...t("ref.conditions").split("|").map((token) => {
        const code = document.createElement("code");
        code.textContent = token;
        return code;
      }));
    }
    if (el.languageButtons) {
      el.languageButtons.forEach((button) => {
        const selected = button.dataset.lang === currentLanguage;
        button.classList.toggle("active", selected);
        button.setAttribute("aria-pressed", String(selected));
      });
    }
  }

  function changeLanguage(language) {
    if (!SUPPORTED_LANGUAGES.has(language) || language === currentLanguage) {
      return;
    }
    stopAutoRun();
    currentLanguage = language;
    applyLanguageToDocument();
    populateTaskSelect();
    el.worldSelect.value = currentTask.id;
    if (editorSourceKind !== "custom") {
      el.codeEditor.value = taskText(currentTask, editorSourceKind);
      runner = null;
      programDirty = true;
    }
    renderTask();
    updateStats();
    const stateKey = el.programState.dataset.stateKey || "status.ready";
    setProgramState(stateKey, el.programState.classList.contains("error") ? "error" : el.programState.classList.contains("success") ? "success" : "");
  }

  function populateTaskSelect() {
    el.worldSelect.innerHTML = "";
    for (const task of TASKS) {
      const option = document.createElement("option");
      option.value = task.id;
      option.textContent = taskText(task, "title");
      el.worldSelect.appendChild(option);
    }
  }

  function bindEvents() {
    el.languageButtons.forEach((button) => {
      button.addEventListener("click", () => changeLanguage(button.dataset.lang));
    });
    el.worldSelect.addEventListener("change", () => loadTask(el.worldSelect.value));
    el.loadExampleBtn.addEventListener("click", loadExample);
    el.resetBtn.addEventListener("click", () => {
      stopAutoRun();
      resetWorld();
      runner = null;
      programDirty = true;
      clearLog();
      appendLog(t("resetLog"), "ok");
      setProgramState("status.ready");
    });
    el.codeEditor.addEventListener("input", () => {
      programDirty = true;
      runner = null;
      editorSourceKind = "custom";
      setProgramState("status.modified");
      el.currentLine.textContent = "-";
    });
    el.runBtn.addEventListener("click", runProgram);
    el.stepBtn.addEventListener("click", stepProgram);
    el.pauseBtn.addEventListener("click", () => {
      stopAutoRun();
      setProgramState("status.paused");
    });
    el.checkBtn.addEventListener("click", () => checkGoals(true));
    el.speedRange.addEventListener("input", updateSpeedOutput);
  }

  function loadTask(taskId) {
    stopAutoRun();
    const task = TASKS.find((item) => item.id === taskId);
    currentTask = task || TASKS[0];
    currentWorld = cloneWorld(currentTask.world);
    el.worldSelect.value = currentTask.id;
    el.codeEditor.value = taskText(currentTask, "starter");
    editorSourceKind = "starter";
    programDirty = true;
    runner = null;
    clearLog();
    resetWorld({ keepLog: true });
    renderTask();
    setProgramState("status.ready");
    appendLog(t("loadedTaskLog", { title: taskText(currentTask, "title") }), "ok");
  }

  function loadExample() {
    el.codeEditor.value = taskText(currentTask, "example") || taskText(currentTask, "starter");
    editorSourceKind = taskText(currentTask, "example") ? "example" : "starter";
    programDirty = true;
    runner = null;
    setProgramState("status.solutionInserted");
    appendLog(t("solutionLog"), "ok");
  }

  function renderTask(goalResults = null) {
    el.taskLevel.textContent = taskText(currentTask, "level") || t("taskFallback");
    el.taskTitle.textContent = taskText(currentTask, "title");
    el.taskStory.textContent = taskText(currentTask, "story");
    renderGoals(goalResults);
  }

  function renderGoals(goalResults = null) {
    el.goalList.innerHTML = "";
    if (!currentTask.goals || currentTask.goals.length === 0) {
      const item = document.createElement("li");
      item.textContent = t("noAutomaticGoal");
      el.goalList.appendChild(item);
      return;
    }
    currentTask.goals.forEach((goal, index) => {
      const item = document.createElement("li");
      item.textContent = goalText(currentTask, goal, index);
      if (goalResults) {
        item.classList.add(goalResults[index]?.pass ? "pass" : "fail");
      }
      el.goalList.appendChild(item);
    });
  }

  function resetWorld(options = {}) {
    state = createState(currentWorld);
    actionCount = 0;
    currentAnimation = null;
    el.currentLine.textContent = "-";
    updateStats();
    render();
    if (!options.keepLog) {
      clearLog();
    }
  }

  function prepareProgram() {
    stopAutoRun();
    try {
      const parsed = parseProgram(el.codeEditor.value);
      resetWorld({ keepLog: true });
      actionCount = 0;
      runner = {
        parsed,
        generator: executeProgram(parsed),
        done: false
      };
      programDirty = false;
      setProgramState("status.ready");
      appendLog(t("programReadyLog"), "ok");
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  }

  async function runProgram() {
    if (autoRunning) {
      return;
    }
    if (!runner || runner.done || programDirty) {
      if (!prepareProgram()) {
        return;
      }
    }
    autoRunning = true;
    setProgramState("status.running");
    while (autoRunning && runner && !runner.done) {
      const advanced = await advanceOneAction();
      if (!advanced) {
        break;
      }
    }
  }

  async function stepProgram() {
    stopAutoRun();
    if (!runner || runner.done || programDirty) {
      if (!prepareProgram()) {
        return;
      }
    }
    await advanceOneAction();
  }

  async function advanceOneAction() {
    try {
      const result = runner.generator.next();
      if (result.done) {
        runner.done = true;
        el.currentLine.textContent = "-";
        setProgramState("status.done", "success");
        appendLog(t("programEndedLog"), "ok");
        checkGoals(false);
        return false;
      }
      const action = result.value;
      el.currentLine.textContent = action.line ? String(action.line) : "-";
      appendLog(formatAction(action), "ok");
      updateStats();
      await animateAction(action);
      updateStats();
      return true;
    } catch (error) {
      runner.done = true;
      stopAutoRun();
      handleError(error);
      render();
      return false;
    }
  }

  function stopAutoRun() {
    autoRunning = false;
  }

  function handleError(error) {
    const linePart = error.line ? t("linePrefix", { line: error.line }) : "";
    setProgramState("status.error", "error");
    appendLog(`${linePart}${error.message}`, "error");
    if (error.line) {
      el.currentLine.textContent = String(error.line);
    }
  }

  function setProgramState(key, type = "") {
    el.programState.dataset.stateKey = key;
    el.programState.textContent = t(key);
    el.programState.classList.remove("error", "success");
    if (type) {
      el.programState.classList.add(type);
    }
  }

  function updateStats() {
    if (!state) {
      return;
    }
    el.stepCount.textContent = t("commandsCount", { count: state.actions });
    el.positionState.textContent = `(${state.karel.x}, ${state.karel.y})`;
    el.directionState.textContent = t(`direction.${state.karel.dir}`);
    el.bagState.textContent = t("bagCount", { count: state.karel.bag });
  }

  function updateSpeedOutput() {
    el.speedValue.textContent = `${el.speedRange.value} ms`;
  }

  function clearLog() {
    el.consoleLog.innerHTML = "";
  }

  function appendLog(message, type = "") {
    const row = document.createElement("div");
    if (type) {
      row.className = type;
    }
    row.textContent = message;
    el.consoleLog.appendChild(row);
    while (el.consoleLog.children.length > 120) {
      el.consoleLog.removeChild(el.consoleLog.firstChild);
    }
    el.consoleLog.scrollTop = el.consoleLog.scrollHeight;
  }

  function parseProgram(source) {
    const lines = source.split(/\r?\n/).map((raw, index) => ({
      number: index + 1,
      raw,
      clean: stripComments(raw)
    }));
    const functions = new Map();
    const result = parseBlock(lines, 0, new Set(), true, functions);
    if (result.stop) {
      throw new KarelError(lines[result.index]?.number, t("error.unexpected", { token: result.stop }));
    }
    const main = result.nodes.length > 0 ? result.nodes : functions.get("main") || [];
    return { nodes: main, functions };
  }

  function parseBlock(lines, startIndex, stopTokens, allowFunctions, functions) {
    const nodes = [];
    let index = startIndex;

    while (index < lines.length) {
      const line = lines[index];
      if (!line.clean) {
        index += 1;
        continue;
      }

      const words = normalizeWords(line.clean);
      const token = normalizeToken(line.clean);
      const parts = words.split(" ").filter(Boolean);
      const first = parts[0];

      if (isEndToken(token)) {
        if (stopTokens.has("end")) {
          return { nodes, index, stop: "koniec" };
        }
        throw new KarelError(line.number, t("error.endWithoutBlock"));
      }

      if (isElseToken(token)) {
        if (stopTokens.has("else")) {
          return { nodes, index, stop: "inak" };
        }
        throw new KarelError(line.number, t("error.elseOutsideIf"));
      }

      if (first === "funkcia" || first === "function" || first === "def") {
        if (!allowFunctions) {
          throw new KarelError(line.number, t("error.functionOutside"));
        }
        const name = normalizeToken(parts.slice(1).join(" "));
        if (!name) {
          throw new KarelError(line.number, t("error.functionNeedsName"));
        }
        if (COMMAND_ALIASES[name]) {
          throw new KarelError(line.number, t("error.reservedName", { name }));
        }
        const nested = parseBlock(lines, index + 1, new Set(["end"]), false, functions);
        if (nested.stop !== "koniec") {
          throw new KarelError(line.number, t("error.functionMissingEnd", { name }));
        }
        functions.set(name, nested.nodes);
        index = nested.index + 1;
        continue;
      }

      if (first === "opakuj" || first === "repeat") {
        const count = parseRepeatCount(parts, line.number);
        const nested = parseBlock(lines, index + 1, new Set(["end"]), false, functions);
        if (nested.stop !== "koniec") {
          throw new KarelError(line.number, t("error.repeatMissingEnd"));
        }
        nodes.push({ type: "repeat", count, body: nested.nodes, line: line.number });
        index = nested.index + 1;
        continue;
      }

      if (first === "kym" || first === "while") {
        const condition = parseCondition(parts.slice(1).join(" "), line.number);
        const nested = parseBlock(lines, index + 1, new Set(["end"]), false, functions);
        if (nested.stop !== "koniec") {
          throw new KarelError(line.number, t("error.whileMissingEnd"));
        }
        nodes.push({ type: "while", condition, body: nested.nodes, line: line.number });
        index = nested.index + 1;
        continue;
      }

      if (first === "ak" || first === "if") {
        const condition = parseCondition(parts.slice(1).join(" "), line.number);
        const thenBlock = parseBlock(lines, index + 1, new Set(["else", "end"]), false, functions);
        let elseBody = [];
        let endIndex = thenBlock.index;
        if (thenBlock.stop === "inak") {
          const elseBlock = parseBlock(lines, thenBlock.index + 1, new Set(["end"]), false, functions);
          if (elseBlock.stop !== "koniec") {
            throw new KarelError(line.number, t("error.elseMissingEnd"));
          }
          elseBody = elseBlock.nodes;
          endIndex = elseBlock.index;
        } else if (thenBlock.stop !== "koniec") {
          throw new KarelError(line.number, t("error.ifMissingEnd"));
        }
        nodes.push({ type: "if", condition, thenBody: thenBlock.nodes, elseBody, line: line.number });
        index = endIndex + 1;
        continue;
      }

      nodes.push({
        type: "command",
        name: token,
        display: line.clean,
        line: line.number
      });
      index += 1;
    }

    return { nodes, index, stop: null };
  }

  function parseRepeatCount(parts, lineNumber) {
    const value = Number(parts[1]);
    if (!Number.isInteger(value) || value < 0 || value > 999) {
      throw new KarelError(lineNumber, t("error.repeatCount"));
    }
    return value;
  }

  function parseCondition(text, lineNumber) {
    let token = normalizeToken(text);
    if (!token) {
      throw new KarelError(lineNumber, t("error.conditionMissing"));
    }
    let inverted = false;
    if (token.startsWith("nie_")) {
      inverted = true;
      token = token.slice(4);
    } else if (token.startsWith("not_")) {
      inverted = true;
      token = token.slice(4);
    }
    const key = CONDITION_ALIASES[token];
    if (!key) {
      throw new KarelError(lineNumber, t("error.unknownCondition", { condition: text }));
    }
    return { key, inverted, text: token };
  }

  function* executeProgram(parsed) {
    yield* executeNodes(parsed.nodes, parsed, 0);
  }

  function* executeNodes(nodes, parsed, depth) {
    if (depth > MAX_CALL_DEPTH) {
      throw new KarelError(null, t("error.callDepth"));
    }

    for (const node of nodes) {
      if (actionCount >= MAX_ACTIONS) {
        throw new KarelError(node.line, t("error.actionLimit", { limit: MAX_ACTIONS }));
      }

      if (node.type === "command") {
        const primitive = COMMAND_ALIASES[node.name];
        if (primitive) {
          actionCount += 1;
          yield performPrimitive(primitive, node.line);
          continue;
        }
        const functionBody = parsed.functions.get(node.name);
        if (!functionBody) {
          throw new KarelError(node.line, t("error.unknownCommand", { command: node.display }));
        }
        yield* executeNodes(functionBody, parsed, depth + 1);
        continue;
      }

      if (node.type === "repeat") {
        for (let i = 0; i < node.count; i += 1) {
          yield* executeNodes(node.body, parsed, depth);
        }
        continue;
      }

      if (node.type === "while") {
        if (node.body.length === 0) {
          throw new KarelError(node.line, t("error.emptyWhile"));
        }
        let loops = 0;
        while (evaluateCondition(node.condition)) {
          loops += 1;
          if (loops > MAX_LOOP_ITERATIONS) {
            throw new KarelError(node.line, t("error.loopLimit"));
          }
          yield* executeNodes(node.body, parsed, depth);
        }
        continue;
      }

      if (node.type === "if") {
        if (evaluateCondition(node.condition)) {
          yield* executeNodes(node.thenBody, parsed, depth);
        } else {
          yield* executeNodes(node.elseBody, parsed, depth);
        }
      }
    }
  }

  function performPrimitive(command, line) {
    const before = { ...state.karel };

    if (command === "step") {
      const dir = DIRS[state.karel.dir];
      if (hasWall(state, state.karel.x, state.karel.y, state.karel.dir)) {
        throw new KarelError(line, t("error.wall"));
      }
      const to = {
        x: state.karel.x + dir.dx,
        y: state.karel.y + dir.dy,
        dir: state.karel.dir
      };
      state.karel.x = to.x;
      state.karel.y = to.y;
      state.actions += 1;
      state.lastMove = { from: before, to: { ...state.karel } };
      return { type: "move", line, from: before, to: { ...state.karel }, label: t("commandStep") };
    }

    if (command === "left" || command === "right" || command === "back") {
      const nextDir = DIRS[state.karel.dir][command];
      state.karel.dir = nextDir;
      state.actions += 1;
      return { type: "turn", line, from: before, to: { ...state.karel }, label: commandLabel(command) };
    }

    if (command === "pick") {
      const key = pointKey(state.karel.x, state.karel.y);
      const count = state.beepers.get(key) || 0;
      if (count <= 0) {
        throw new KarelError(line, t("error.noBeeper"));
      }
      if (count === 1) {
        state.beepers.delete(key);
      } else {
        state.beepers.set(key, count - 1);
      }
      state.karel.bag += 1;
      state.actions += 1;
      return { type: "beeper", mode: "pick", line, at: { x: before.x, y: before.y }, label: t("commandPick") };
    }

    if (command === "put") {
      if (state.karel.bag <= 0) {
        throw new KarelError(line, t("error.emptyBag"));
      }
      const key = pointKey(state.karel.x, state.karel.y);
      state.beepers.set(key, (state.beepers.get(key) || 0) + 1);
      state.karel.bag -= 1;
      state.actions += 1;
      return { type: "beeper", mode: "put", line, at: { x: before.x, y: before.y }, label: t("commandPut") };
    }

    state.actions += 1;
    return { type: "wait", line, from: before, to: { ...state.karel }, label: t("commandWait") };
  }

  function commandLabel(command) {
    if (command === "left") {
      return t("commandLeft");
    }
    if (command === "right") {
      return t("commandRight");
    }
    return t("commandBack");
  }

  function formatAction(action) {
    const line = action.line ? t("lineShort", { line: action.line }) : t("lineUnknown");
    if (action.type === "move") {
      return t("actionStep", { line, x: action.to.x, y: action.to.y });
    }
    if (action.type === "turn") {
      return t("actionTurn", { line, action: action.label, direction: t(`direction.${action.to.dir}`) });
    }
    if (action.type === "beeper") {
      return t("actionBeeper", { line, action: action.label, bag: state.karel.bag });
    }
    return t("actionWait", { line });
  }

  function evaluateCondition(condition) {
    const result = evaluateConditionKey(condition.key);
    return condition.inverted ? !result : result;
  }

  function evaluateConditionKey(key) {
    switch (key) {
      case "frontClear":
        return !hasWall(state, state.karel.x, state.karel.y, state.karel.dir);
      case "frontBlocked":
        return hasWall(state, state.karel.x, state.karel.y, state.karel.dir);
      case "leftClear":
        return !hasWall(state, state.karel.x, state.karel.y, DIRS[state.karel.dir].left);
      case "leftBlocked":
        return hasWall(state, state.karel.x, state.karel.y, DIRS[state.karel.dir].left);
      case "rightClear":
        return !hasWall(state, state.karel.x, state.karel.y, DIRS[state.karel.dir].right);
      case "rightBlocked":
        return hasWall(state, state.karel.x, state.karel.y, DIRS[state.karel.dir].right);
      case "beeperPresent":
        return (state.beepers.get(pointKey(state.karel.x, state.karel.y)) || 0) > 0;
      case "noBeeperPresent":
        return (state.beepers.get(pointKey(state.karel.x, state.karel.y)) || 0) === 0;
      case "beepersInBag":
        return state.karel.bag > 0;
      case "noBeepersInBag":
        return state.karel.bag <= 0;
      case "facingNorth":
        return state.karel.dir === "N";
      case "facingSouth":
        return state.karel.dir === "S";
      case "facingEast":
        return state.karel.dir === "E";
      case "facingWest":
        return state.karel.dir === "W";
      default:
        return false;
    }
  }

  function checkGoals(manual) {
    if (!currentTask.goals || currentTask.goals.length === 0) {
      renderGoals();
      appendLog(t("noAutomaticCheck"), "warn");
      return;
    }
    const results = currentTask.goals.map((goal) => ({
      goal,
      pass: evaluateGoal(goal)
    }));
    renderTask(results);
    const passed = results.filter((result) => result.pass).length;
    if (passed === results.length) {
      setProgramState("status.passed", "success");
      appendLog(t("goalPassed", { passed, total: results.length }), "ok");
    } else {
      if (manual) {
        setProgramState("status.notPassed");
      }
      appendLog(t("goalNotPassed", { passed, total: results.length }), "warn");
    }
  }

  function evaluateGoal(goal) {
    if (goal.type === "collectAll") {
      return totalBeepers(state.beepers) === 0;
    }
    if (goal.type === "bagAtLeast") {
      return state.karel.bag >= goal.count;
    }
    if (goal.type === "bagEquals") {
      return state.karel.bag === goal.count;
    }
    if (goal.type === "pointsMarked") {
      return goal.points.every((point) => {
        const required = point.count || 1;
        return (state.beepers.get(pointKey(point.x, point.y)) || 0) >= required;
      });
    }
    if (goal.type === "exactBeepers") {
      let requiredTotal = 0;
      for (const point of goal.points) {
        const required = point.count || 1;
        requiredTotal += required;
        if ((state.beepers.get(pointKey(point.x, point.y)) || 0) !== required) {
          return false;
        }
      }
      return totalBeepers(state.beepers) === requiredTotal;
    }
    if (goal.type === "onlyBeepersAt") {
      const targetCount = state.beepers.get(pointKey(goal.x, goal.y)) || 0;
      return targetCount === goal.count && totalBeepers(state.beepers) === goal.count;
    }
    if (goal.type === "at") {
      return state.karel.x === goal.x && state.karel.y === goal.y;
    }
    if (goal.type === "facing") {
      return state.karel.dir === goal.dir;
    }
    if (goal.type === "boundaryMarked") {
      return boundaryMarked();
    }
    return false;
  }

  function boundaryMarked() {
    for (let x = 1; x <= state.width; x += 1) {
      if ((state.beepers.get(pointKey(x, 1)) || 0) <= 0) {
        return false;
      }
      if ((state.beepers.get(pointKey(x, state.height)) || 0) <= 0) {
        return false;
      }
    }
    for (let y = 2; y < state.height; y += 1) {
      if ((state.beepers.get(pointKey(1, y)) || 0) <= 0) {
        return false;
      }
      if ((state.beepers.get(pointKey(state.width, y)) || 0) <= 0) {
        return false;
      }
    }
    return true;
  }

  function createState(world) {
    const beepers = new Map();
    for (const item of world.beepers || []) {
      if (insideWorld(world, item.x, item.y) && item.count > 0) {
        beepers.set(pointKey(item.x, item.y), Math.floor(item.count));
      }
    }
    const walls = new Set();
    for (const wall of world.walls || []) {
      const key = wallKey(world, wall.x, wall.y, normalDir(wall.dir));
      if (key) {
        walls.add(key);
      }
    }
    const karel = {
      x: clamp(Math.floor(world.karel?.x || 1), 1, world.width),
      y: clamp(Math.floor(world.karel?.y || 1), 1, world.height),
      dir: normalDir(world.karel?.dir || "E"),
      bag: Math.max(0, Math.floor(world.karel?.bag || 0))
    };
    return {
      width: Math.floor(world.width),
      height: Math.floor(world.height),
      karel,
      beepers,
      walls,
      actions: 0,
      lastMove: null
    };
  }

  function cloneWorld(world) {
    return JSON.parse(JSON.stringify(world));
  }

  function pointKey(x, y) {
    return `${x},${y}`;
  }

  function totalBeepers(beeperMap) {
    let total = 0;
    for (const count of beeperMap.values()) {
      total += count;
    }
    return total;
  }

  function wallKey(worldOrState, x, y, dir) {
    if (!insideWorld(worldOrState, x, y)) {
      return null;
    }
    if (dir === "E") {
      return x < worldOrState.width ? `V:${x}:${y}` : null;
    }
    if (dir === "W") {
      return x > 1 ? `V:${x - 1}:${y}` : null;
    }
    if (dir === "N") {
      return y < worldOrState.height ? `H:${x}:${y}` : null;
    }
    if (dir === "S") {
      return y > 1 ? `H:${x}:${y - 1}` : null;
    }
    return null;
  }

  function hasWall(worldOrState, x, y, dir) {
    const direction = DIRS[dir];
    const nx = x + direction.dx;
    const ny = y + direction.dy;
    if (!insideWorld(worldOrState, nx, ny)) {
      return true;
    }
    const key = wallKey(worldOrState, x, y, dir);
    return key ? worldOrState.walls.has(key) : true;
  }

  function insideWorld(worldOrState, x, y) {
    return x >= 1 && x <= worldOrState.width && y >= 1 && y <= worldOrState.height;
  }

  function normalDir(value) {
    const token = normalizeToken(String(value || "E"));
    return DIRECTION_ALIASES[token] || "E";
  }

  function stripComments(raw) {
    return raw.replace(/\/\/.*$/, "").replace(/#.*$/, "").trim();
  }

  function normalizeWords(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[();,?:]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function normalizeToken(value) {
    return normalizeWords(value).replace(/\s+/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  }

  function isEndToken(token) {
    return token === "koniec" || token === "end";
  }

  function isElseToken(token) {
    return token === "inak" || token === "else";
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function resizeCanvas() {
    const canvas = el.worldCanvas;
    const rect = canvas.parentElement.getBoundingClientRect();
    const cssWidth = Math.max(280, Math.floor(rect.width - 24));
    const cssHeight = Math.max(260, Math.floor(rect.height - 24));
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    canvas.width = Math.floor(cssWidth * dpr);
    canvas.height = Math.floor(cssHeight * dpr);
    canvas.style.width = `${cssWidth}px`;
    canvas.style.height = `${cssHeight}px`;
    canvasContext.setTransform(dpr, 0, 0, dpr, 0, 0);
    render();
  }

  function render(animation = currentAnimation) {
    if (!state || !canvasContext) {
      return;
    }
    const ctx = canvasContext;
    const width = el.worldCanvas.clientWidth;
    const height = el.worldCanvas.clientHeight;
    ctx.clearRect(0, 0, width, height);
    renderLayout = computeLayout(width, height);

    drawBoard(ctx, renderLayout);
    drawTargets(ctx, renderLayout);
    drawLastMove(ctx, renderLayout, animation);
    drawBeepers(ctx, renderLayout, animation);
    drawKarel(ctx, renderLayout, animation);
  }

  function computeLayout(width, height) {
    const labelSpace = 36;
    const margin = 18;
    const usableWidth = Math.max(120, width - margin * 2 - labelSpace);
    const usableHeight = Math.max(120, height - margin * 2 - labelSpace);
    const cell = Math.floor(Math.min(usableWidth / state.width, usableHeight / state.height));
    const boardWidth = cell * state.width;
    const boardHeight = cell * state.height;
    const left = Math.floor((width - boardWidth + labelSpace / 2) / 2);
    const top = Math.floor((height - boardHeight - labelSpace / 2) / 2);
    return { left, top, cell, boardWidth, boardHeight, width, height, labelSpace };
  }

  function drawBoard(ctx, layout) {
    ctx.save();
    ctx.fillStyle = "#ffffff";
    roundRect(ctx, layout.left, layout.top, layout.boardWidth, layout.boardHeight, 7);
    ctx.fill();

    for (let x = 1; x <= state.width; x += 1) {
      for (let y = 1; y <= state.height; y += 1) {
        const rect = cellRect(layout, x, y);
        ctx.fillStyle = (x + y) % 2 === 0 ? "#fbfdff" : "#f4f8fb";
        ctx.fillRect(rect.x, rect.y, layout.cell, layout.cell);
      }
    }

    ctx.strokeStyle = "#c8d2df";
    ctx.lineWidth = 1;
    for (let x = 0; x <= state.width; x += 1) {
      const px = layout.left + x * layout.cell;
      line(ctx, px, layout.top, px, layout.top + layout.boardHeight);
    }
    for (let y = 0; y <= state.height; y += 1) {
      const py = layout.top + y * layout.cell;
      line(ctx, layout.left, py, layout.left + layout.boardWidth, py);
    }

    ctx.strokeStyle = "#253243";
    ctx.lineWidth = Math.max(3, layout.cell * 0.08);
    ctx.lineCap = "round";
    roundRect(ctx, layout.left, layout.top, layout.boardWidth, layout.boardHeight, 6);
    ctx.stroke();
    drawWalls(ctx, layout);
    drawCoordinates(ctx, layout);
    ctx.restore();
  }

  function drawWalls(ctx, layout) {
    ctx.save();
    ctx.strokeStyle = "#253243";
    ctx.lineWidth = Math.max(4, layout.cell * 0.12);
    ctx.lineCap = "round";
    for (const key of state.walls) {
      const [kind, xs, ys] = key.split(":");
      const x = Number(xs);
      const y = Number(ys);
      if (kind === "V") {
        const px = layout.left + x * layout.cell;
        const yTop = layout.top + (state.height - y) * layout.cell;
        line(ctx, px, yTop + 4, px, yTop + layout.cell - 4);
      } else if (kind === "H") {
        const py = layout.top + (state.height - y) * layout.cell;
        const xLeft = layout.left + (x - 1) * layout.cell;
        line(ctx, xLeft + 4, py, xLeft + layout.cell - 4, py);
      }
    }
    ctx.restore();
  }

  function drawCoordinates(ctx, layout) {
    ctx.save();
    ctx.fillStyle = "#5b6675";
    ctx.font = "700 12px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    for (let x = 1; x <= state.width; x += 1) {
      const rect = cellRect(layout, x, 1);
      ctx.fillText(String(x), rect.x + layout.cell / 2, layout.top + layout.boardHeight + 9);
    }
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    for (let y = 1; y <= state.height; y += 1) {
      const rect = cellRect(layout, 1, y);
      ctx.fillText(String(y), layout.left - 9, rect.y + layout.cell / 2);
    }
    ctx.restore();
  }

  function drawTargets(ctx, layout) {
    const targets = getTargetPoints();
    if (targets.length === 0) {
      return;
    }

    ctx.save();
    ctx.strokeStyle = "#2563a7";
    ctx.fillStyle = "rgba(37, 99, 167, 0.045)";
    ctx.lineWidth = Math.max(1.5, layout.cell * 0.028);
    ctx.setLineDash([5, 5]);

    for (const target of targets) {
      const rect = cellRect(layout, target.x, target.y);
      const inset = Math.max(7, layout.cell * 0.22);
      roundedRectPath(ctx, rect.x + inset, rect.y + inset, layout.cell - inset * 2, layout.cell - inset * 2, 6);
      ctx.fill();
      ctx.stroke();

      if (target.count && target.count > 1) {
        const center = cellCenter(layout, target.x, target.y);
        ctx.setLineDash([]);
        ctx.fillStyle = "#154a80";
        ctx.font = `800 ${Math.max(12, layout.cell * 0.22)}px system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(String(target.count), center.x, center.y);
        ctx.fillStyle = "rgba(37, 99, 167, 0.08)";
        ctx.setLineDash([6, 5]);
      }
    }

    ctx.restore();
  }

  function getTargetPoints() {
    const targets = new Map();
    const addTarget = (point) => {
      const key = pointKey(point.x, point.y);
      const existing = targets.get(key);
      const count = point.count || existing?.count || 1;
      targets.set(key, { x: point.x, y: point.y, count: Math.max(count, existing?.count || 1) });
    };

    for (const goal of currentTask.goals || []) {
      if (goal.type === "pointsMarked" || goal.type === "exactBeepers") {
        for (const point of goal.points) {
          addTarget(point);
        }
      } else if (goal.type === "onlyBeepersAt" || goal.type === "at") {
        addTarget(goal);
      } else if (goal.type === "boundaryMarked") {
        for (let x = 1; x <= state.width; x += 1) {
          addTarget({ x, y: 1 });
          addTarget({ x, y: state.height });
        }
        for (let y = 2; y < state.height; y += 1) {
          addTarget({ x: 1, y });
          addTarget({ x: state.width, y });
        }
      }
    }
    return Array.from(targets.values());
  }

  function drawLastMove(ctx, layout, animation) {
    const move = animation?.type === "move" ? { from: animation.from, to: animation.to } : state.lastMove;
    if (!move) {
      return;
    }
    const from = cellCenter(layout, move.from.x, move.from.y);
    const to = cellCenter(layout, move.to.x, move.to.y);
    ctx.save();
    ctx.strokeStyle = "#7aa6d8";
    ctx.lineWidth = Math.max(3, layout.cell * 0.06);
    ctx.setLineDash([8, 7]);
    line(ctx, from.x, from.y, to.x, to.y);
    ctx.restore();
  }

  function drawBeepers(ctx, layout, animation) {
    ctx.save();
    for (const [key, count] of state.beepers.entries()) {
      const [x, y] = key.split(",").map(Number);
      const center = cellCenter(layout, x, y);
      const radius = Math.max(8, layout.cell * 0.19);
      const pulse = animation?.type === "beeper" && animation.at.x === x && animation.at.y === y ? animation.progress : 0;
      drawBeeper(ctx, center.x, center.y, radius + pulse * 5, count);
    }
    if (animation?.type === "beeper" && animation.mode === "pick") {
      const center = cellCenter(layout, animation.at.x, animation.at.y);
      drawPickPulse(ctx, center.x, center.y, layout.cell, animation.progress);
    }
    ctx.restore();
  }

  function drawBeeper(ctx, x, y, radius, count) {
    ctx.save();
    ctx.fillStyle = "#f3b43f";
    ctx.strokeStyle = "#8d5108";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#2b1b05";
    ctx.font = `800 ${Math.max(11, radius * 0.9)}px system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(count), x, y + 0.5);
    ctx.restore();
  }

  function drawPickPulse(ctx, x, y, cell, progress) {
    ctx.save();
    ctx.strokeStyle = `rgba(195, 101, 35, ${1 - progress})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y, cell * (0.22 + progress * 0.28), 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  function drawKarel(ctx, layout, animation) {
    const pose = currentKarelPose(layout, animation);
    ctx.save();
    ctx.translate(pose.x, pose.y);
    ctx.rotate(pose.angle);
    const size = layout.cell * 0.68;

    ctx.fillStyle = "rgba(23, 32, 42, 0.16)";
    ctx.beginPath();
    ctx.ellipse(-size * 0.04, size * 0.18, size * 0.34, size * 0.16, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#0f766e";
    ctx.strokeStyle = "#083f3c";
    ctx.lineWidth = Math.max(2, layout.cell * 0.035);
    roundedRectPath(ctx, -size * 0.32, -size * 0.26, size * 0.5, size * 0.52, size * 0.09);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#2563a7";
    ctx.beginPath();
    ctx.moveTo(size * 0.34, 0);
    ctx.lineTo(size * 0.08, -size * 0.25);
    ctx.lineTo(size * 0.08, size * 0.25);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(-size * 0.08, -size * 0.09, size * 0.055, 0, Math.PI * 2);
    ctx.arc(-size * 0.08, size * 0.09, size * 0.055, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#17202a";
    ctx.fillRect(-size * 0.42, -size * 0.28, size * 0.12, size * 0.56);
    ctx.fillRect(-size * 0.27, -size * 0.34, size * 0.25, size * 0.08);
    ctx.fillRect(-size * 0.27, size * 0.26, size * 0.25, size * 0.08);
    ctx.restore();
  }

  function currentKarelPose(layout, animation) {
    let x = state.karel.x;
    let y = state.karel.y;
    let angle = DIRS[state.karel.dir].angle;
    if (animation?.type === "move") {
      x = lerp(animation.from.x, animation.to.x, easeInOut(animation.progress));
      y = lerp(animation.from.y, animation.to.y, easeInOut(animation.progress));
      angle = DIRS[animation.to.dir].angle;
    } else if (animation?.type === "turn") {
      x = animation.to.x;
      y = animation.to.y;
      angle = interpolateAngle(DIRS[animation.from.dir].angle, DIRS[animation.to.dir].angle, easeInOut(animation.progress));
    }
    const center = cellCenter(layout, x, y);
    return { x: center.x, y: center.y, angle };
  }

  function animateAction(action) {
    const duration = Number(el.speedRange.value) || 320;
    return new Promise((resolve) => {
      const started = performance.now();
      const frame = (now) => {
        const progress = clamp((now - started) / duration, 0, 1);
        currentAnimation = { ...action, progress };
        render(currentAnimation);
        if (progress < 1 && autoRunning !== false) {
          requestAnimationFrame(frame);
        } else if (progress < 1 && !autoRunning && action.type !== "wait") {
          requestAnimationFrame(frame);
        } else {
          currentAnimation = null;
          render();
          resolve();
        }
      };
      requestAnimationFrame(frame);
    });
  }

  function cellRect(layout, x, y) {
    return {
      x: layout.left + (x - 1) * layout.cell,
      y: layout.top + (state.height - y) * layout.cell
    };
  }

  function cellCenter(layout, x, y) {
    return {
      x: layout.left + (x - 0.5) * layout.cell,
      y: layout.top + (state.height - y + 0.5) * layout.cell
    };
  }

  function line(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  function roundRect(ctx, x, y, width, height, radius) {
    roundedRectPath(ctx, x, y, width, height, radius);
  }

  function roundedRectPath(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + r);
    ctx.lineTo(x + width, y + height - r);
    ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    ctx.lineTo(x + r, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  function interpolateAngle(from, to, t) {
    let diff = to - from;
    while (diff > Math.PI) {
      diff -= Math.PI * 2;
    }
    while (diff < -Math.PI) {
      diff += Math.PI * 2;
    }
    return from + diff * t;
  }

})();
