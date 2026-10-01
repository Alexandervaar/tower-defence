Features:
- Towers
    - Forskellige typer
        - Laver penge
        - Lav range høj dps og omvendt
        - Ice tower
        - Firetower
        - Lyn tårn (chaining)
        - Luft tårn (push)
        - 
    - Special abilities
        - Cooldown
    - Opgraderinger
    - Merge/Kombinationer
    - Permanente opgrades/unlocks
    
- Shop menu
- Monstre
   - Waves
   - Forskellige typer
        - Regen
        - Skjold
   - Boss
   - Monstre giver penge/xp når de rammes
   
- Sound effects
- Vores health 
- Penge
- Map med en vej
    - Pile der indikerer hvor fjenderne kommer fra
- Sprites
- Start menu
    - Score board
    - Sværhedsgrad
    - Flere levels
- Indstillingsmenu


# Must have:
- 1 type tårn
    - Skal kunne skyde
    - Skal koste penge
- 1 type monster
    - HP
    - Gøre skade når de kommer igennem banen
- Map med en bane
- Penge
- Health for brugeren
- Forskellige waves
    - Bliver sværere

    RIGTIGE KRAV;


# MVP Requirements

## Must have

- 1 type tårn   X
  - Skal kunne skyde    X
  - Skal koste penge    X
- 1 type monster    X
  - HP  X
  - Gøre skade når de kommer igennem banen  X
- Map med en sti    X
- Brugeren  X
  - Health  X
  - Penge   X
- Forskellige waves X
  - Bliver sværere  X

## Ikke-funktionelle krav

- Spillet skal hedde "FG Tower Defence".
- Spillet skal vare højst 5 minutter.   X
- Spillet skal både kunne spilles på PC og mobil.   X

## Funktionelle krav

**Spil:**

- Spillet skal have en startskærm, game over-skærm og en spilskærm. X
- Spillet skal starte når spilleren klikker med musen når de er på startskærmen eller game over-skærmen.    X
- Spillet skal slutte når spilleren ikke har mere HP eller alle waves er klaret.    X
- Game over-skærmen skal vise om spilleren har tabt eller vundet.   X
- Spillet skal vise spillerens nuværende score og high-score.   X
- Scoren er hvor meget liv spilleren har tilbage.   X
- Spillet skal indeholde tre waves, hvor tredje wave er en boss-wave. X
- Spillet skal have en timer på 3 sekunder til næste wave der starter når spillet starter eller en wave slutter.    X

**Waves:**

- En wave skal indeholde en eller flere monstre.    X
- Sværhedsgraden skal stige mellem waves.   X
- En wave skal afsluttes, når alle dens monstre er besejret eller har nået målet.   X

**Spiller:**

- Spilleren skal have en mængde HP. X
- Spilleren skal have en mængde penge.  X
- Spillerens penge skal reduceres, når spilleren køber et tårn. X
- Spilleren skal ikke kunne placere et tårn, hvis spilleren ikke har penge nok. X
- Spilleren skal modtage penge, når et monster bliver besejret. X

**Map:**

- Spillet skal indeholde et map med en sti, som monstrene skal følge fra start til mål. X
- Spilleren skal kunne placere tårne uden for stien der hvor der ikke allerede er et tårn.  X

**Monster:**

- Monstrene er af to typer: Almindelige og en boss. X
- Et monster skal have et antal HP, som kan reduceres, når monsteret tager skade.   X
- Et monster skal forsvinde fra spillet, når dets HP er mindre end eller lig 0. X
- Et monster skal bevæge sig gennem stien med en konstant hastighed.    X
- Monsteret skal give skade til spilleren når det kommer igennem stien. X
- Hvis bossen kommer igennem banen taber spilleren. X

**Tårn:**

- Spillet skal indeholde én type tårn.  X
- Et tårn skal automatisk kunne skyde på monstre inden for dets rækkevidde. X
- Et tårn kan maksimalt skyde et skud hvert sekund. X

**Skud:**

- Alle skud skal ramme deres mål.   X
- Skuddets skade skal være en tredjedel af monsterets liv. X
