# Coding-Aufgabe

Wir wünschen uns, dass wir über einen GET-Request an https://api.coingecko.com/api/v3/exchange_rates die Tauschrate von Bitcoin zu anderen Krypto und Echtgeld-Währungen ausgeben lassen und uns in einer Tabelle darstellen.

## Description

Die Anwendung würde über einen petrolblauen Header (#01DFD7) und einem Logo, das du im Anhang findest, am rechten Rand des Headers verfügen. Unterhalb des Headers befindet sich die Tabelle. Sie soll über die Spalte „Name“ alphabetisch sortiert sein. Dabei soll der Eintrag mit dem Namen „Bitcoin“ aber trotzdem immer an erster Stelle stehen und farblich etwas abgehoben werden. Unterhalb der Tabelle befindet sich ein Knopf mir der Aufschrift „Aktualisieren“. Wird dieser betätigt, so wird die Tabelle mit den neu erhaltenen Informationen befüllt. Wenn möglich, kann die Tabelle ein Paging von 6 Einträgen pro Seite erlauben, wobei die Zeile für „Bitcoin“ immer die oberste ist, unabhängig davon auf welcher Seite der Tabelle man sich gerade befindet. Wenn ein Paging eingebaut ist, befindet sich man nach der Aktualisierung wieder auf Seite 1 der Tabelle.

* Das Paging der Tabelle ist optional.


* Bibliotheken für Tabellen dürfen gerne verwendet werden.
    * Bibliothek: react-table v7
    * Styling: styled-components v5
### Installation via NPM

Please run the following command in order to install the dependencies:

```
npm install 
```

Once all dependencies have been installed please run:

```
npm start 
```
