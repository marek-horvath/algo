(() => {
  "use strict";

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
    canvasContext = el.worldCanvas.getContext("2d");
    populateTaskSelect();
    bindEvents();
    const requestedTask = new URLSearchParams(window.location.search).get("task");
    const initialTask = TASKS.some((task) => task.id === requestedTask) ? requestedTask : TASKS[0].id;
    loadTask(initialTask);
    resizeCanvas();
    updateSpeedOutput();
    appendLog("Vyber zadanie, napíš program a spusti Karla.", "ok");

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
  }

  function populateTaskSelect() {
    el.worldSelect.innerHTML = "";
    for (const task of TASKS) {
      const option = document.createElement("option");
      option.value = task.id;
      option.textContent = task.title;
      el.worldSelect.appendChild(option);
    }
  }

  function bindEvents() {
    el.worldSelect.addEventListener("change", () => loadTask(el.worldSelect.value));
    el.loadExampleBtn.addEventListener("click", loadExample);
    el.resetBtn.addEventListener("click", () => {
      stopAutoRun();
      resetWorld();
      runner = null;
      programDirty = true;
      clearLog();
      appendLog("Svet bol vrátený do počiatočného stavu.", "ok");
      setProgramState("Pripravený");
    });
    el.codeEditor.addEventListener("input", () => {
      programDirty = true;
      runner = null;
      setProgramState("Upravený");
      el.currentLine.textContent = "-";
    });
    el.runBtn.addEventListener("click", runProgram);
    el.stepBtn.addEventListener("click", stepProgram);
    el.pauseBtn.addEventListener("click", () => {
      stopAutoRun();
      setProgramState("Pauza");
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
    el.codeEditor.value = currentTask.starter || "";
    programDirty = true;
    runner = null;
    clearLog();
    resetWorld({ keepLog: true });
    renderTask();
    setProgramState("Pripravený");
    appendLog(`Načítané zadanie: ${currentTask.title}`, "ok");
  }

  function loadExample() {
    el.codeEditor.value = currentTask.example || currentTask.starter || "";
    programDirty = true;
    runner = null;
    setProgramState("Riešenie vložené");
    appendLog("Do editora bolo vložené riešenie.", "ok");
  }

  function renderTask(goalResults = null) {
    el.taskLevel.textContent = currentTask.level || "zadanie";
    el.taskTitle.textContent = currentTask.title;
    el.taskStory.textContent = currentTask.story;
    renderGoals(goalResults);
  }

  function renderGoals(goalResults = null) {
    el.goalList.innerHTML = "";
    if (!currentTask.goals || currentTask.goals.length === 0) {
      const item = document.createElement("li");
      item.textContent = "Toto zadanie nemá automaticky nastavený cieľ.";
      el.goalList.appendChild(item);
      return;
    }
    currentTask.goals.forEach((goal, index) => {
      const item = document.createElement("li");
      item.textContent = goal.text;
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
      setProgramState("Pripravený");
      appendLog("Program je pripravený na spustenie.", "ok");
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
    setProgramState("Beží");
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
        setProgramState("Hotovo", "success");
        appendLog("Program skončil.", "ok");
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
    const linePart = error.line ? `Riadok ${error.line}: ` : "";
    setProgramState("Chyba", "error");
    appendLog(`${linePart}${error.message}`, "error");
    if (error.line) {
      el.currentLine.textContent = String(error.line);
    }
  }

  function setProgramState(text, type = "") {
    el.programState.textContent = text;
    el.programState.classList.remove("error", "success");
    if (type) {
      el.programState.classList.add(type);
    }
  }

  function updateStats() {
    if (!state) {
      return;
    }
    el.stepCount.textContent = `${state.actions} príkazov`;
    el.positionState.textContent = `(${state.karel.x}, ${state.karel.y})`;
    el.directionState.textContent = DIRS[state.karel.dir].label;
    el.bagState.textContent = `batoh ${state.karel.bag}`;
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
      throw new KarelError(lines[result.index]?.number, `Neočakávaný príkaz ${result.stop}.`);
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
        throw new KarelError(line.number, "Príkaz koniec nemá zodpovedajúci blok.");
      }

      if (isElseToken(token)) {
        if (stopTokens.has("else")) {
          return { nodes, index, stop: "inak" };
        }
        throw new KarelError(line.number, "Príkaz inak môže byť iba vo vnútri príkazu ak.");
      }

      if (first === "funkcia" || first === "function" || first === "def") {
        if (!allowFunctions) {
          throw new KarelError(line.number, "Funkciu definuj mimo blokov ak, kym a opakuj.");
        }
        const name = normalizeToken(parts.slice(1).join(" "));
        if (!name) {
          throw new KarelError(line.number, "Funkcia potrebuje názov.");
        }
        if (COMMAND_ALIASES[name]) {
          throw new KarelError(line.number, `Názov ${name} je vyhradený príkaz.`);
        }
        const nested = parseBlock(lines, index + 1, new Set(["end"]), false, functions);
        if (nested.stop !== "koniec") {
          throw new KarelError(line.number, `Funkcia ${name} nie je ukončená príkazom koniec.`);
        }
        functions.set(name, nested.nodes);
        index = nested.index + 1;
        continue;
      }

      if (first === "opakuj" || first === "repeat") {
        const count = parseRepeatCount(parts, line.number);
        const nested = parseBlock(lines, index + 1, new Set(["end"]), false, functions);
        if (nested.stop !== "koniec") {
          throw new KarelError(line.number, "Blok opakuj nie je ukončený príkazom koniec.");
        }
        nodes.push({ type: "repeat", count, body: nested.nodes, line: line.number });
        index = nested.index + 1;
        continue;
      }

      if (first === "kym" || first === "while") {
        const condition = parseCondition(parts.slice(1).join(" "), line.number);
        const nested = parseBlock(lines, index + 1, new Set(["end"]), false, functions);
        if (nested.stop !== "koniec") {
          throw new KarelError(line.number, "Blok kym nie je ukončený príkazom koniec.");
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
            throw new KarelError(line.number, "Vetva inak nie je ukončená príkazom koniec.");
          }
          elseBody = elseBlock.nodes;
          endIndex = elseBlock.index;
        } else if (thenBlock.stop !== "koniec") {
          throw new KarelError(line.number, "Blok ak nie je ukončený príkazom koniec.");
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
      throw new KarelError(lineNumber, "Príkaz opakuj potrebuje celé číslo od 0 do 999.");
    }
    return value;
  }

  function parseCondition(text, lineNumber) {
    let token = normalizeToken(text);
    if (!token) {
      throw new KarelError(lineNumber, "Podmienka chýba.");
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
      throw new KarelError(lineNumber, `Neznáma podmienka: ${text}.`);
    }
    return { key, inverted, text: token };
  }

  function* executeProgram(parsed) {
    yield* executeNodes(parsed.nodes, parsed, 0);
  }

  function* executeNodes(nodes, parsed, depth) {
    if (depth > MAX_CALL_DEPTH) {
      throw new KarelError(null, "Príliš hlboké volanie funkcií.");
    }

    for (const node of nodes) {
      if (actionCount >= MAX_ACTIONS) {
        throw new KarelError(node.line, `Program prekročil limit ${MAX_ACTIONS} vykonaných príkazov.`);
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
          throw new KarelError(node.line, `Neznámy príkaz alebo funkcia: ${node.display}.`);
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
          throw new KarelError(node.line, "Prázdny cyklus kym by nikdy nezmenil stav programu.");
        }
        let loops = 0;
        while (evaluateCondition(node.condition)) {
          loops += 1;
          if (loops > MAX_LOOP_ITERATIONS) {
            throw new KarelError(node.line, "Cyklus kym prekročil bezpečnostný limit opakovaní.");
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
        throw new KarelError(line, "Karel nemôže spraviť krok: pred ním je stena alebo okraj sveta.");
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
      return { type: "move", line, from: before, to: { ...state.karel }, label: "krok" };
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
        throw new KarelError(line, "Na tomto políčku nie je žiadna značka na zodvihnutie.");
      }
      if (count === 1) {
        state.beepers.delete(key);
      } else {
        state.beepers.set(key, count - 1);
      }
      state.karel.bag += 1;
      state.actions += 1;
      return { type: "beeper", mode: "pick", line, at: { x: before.x, y: before.y }, label: "zober" };
    }

    if (command === "put") {
      if (state.karel.bag <= 0) {
        throw new KarelError(line, "Karel nemá v batohu žiadnu značku.");
      }
      const key = pointKey(state.karel.x, state.karel.y);
      state.beepers.set(key, (state.beepers.get(key) || 0) + 1);
      state.karel.bag -= 1;
      state.actions += 1;
      return { type: "beeper", mode: "put", line, at: { x: before.x, y: before.y }, label: "polož" };
    }

    state.actions += 1;
    return { type: "wait", line, from: before, to: { ...state.karel }, label: "čakaj" };
  }

  function commandLabel(command) {
    if (command === "left") {
      return "otoč vľavo";
    }
    if (command === "right") {
      return "otoč vpravo";
    }
    return "otoč sa";
  }

  function formatAction(action) {
    const line = action.line ? `R${action.line}` : "R?";
    if (action.type === "move") {
      return `${line}: krok na (${action.to.x}, ${action.to.y})`;
    }
    if (action.type === "turn") {
      return `${line}: ${action.label}, smer ${DIRS[action.to.dir].label}`;
    }
    if (action.type === "beeper") {
      return `${line}: ${action.label} značku, batoh ${state.karel.bag}`;
    }
    return `${line}: čakaj`;
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
      appendLog("Toto zadanie nemá automatickú kontrolu cieľa.", "warn");
      return;
    }
    const results = currentTask.goals.map((goal) => ({
      goal,
      pass: evaluateGoal(goal)
    }));
    renderTask(results);
    const passed = results.filter((result) => result.pass).length;
    if (passed === results.length) {
      setProgramState("Splnené", "success");
      appendLog(`Cieľ splnený: ${passed}/${results.length}.`, "ok");
    } else {
      if (manual) {
        setProgramState("Nesplnené");
      }
      appendLog(`Cieľ zatiaľ nesplnený: ${passed}/${results.length}.`, "warn");
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
