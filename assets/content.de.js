window.GUIDE = window.GUIDE || {};
window.GUIDE.de = {
  lang: "de",
  meta: {
    title: "MeshCom Map",
    tagline: "Was die Karte zeigt, und wie man sie liest.",
    intro:
      "MeshCom Map ist eine Webkarte für das MeshCom-Amateurfunk-LoRa-Mesh. Die offiziellen Dashboards stellen HTML-Tabellen dar; diese Karte fügt Verbindungsqualität aus dem gemessenen Signal, Telemetriediagramme, Wetter-Overlays und einen Live-Feed hinzu. Alles darauf leitet sich davon ab, was das Mesh-Netzwerk selbst ausstrahlt. Dieses Handbuch geht jeden Reiter durch und erklärt die Teile, die man leicht übersieht.",
    liveUrl: "https://meshmap.oevsv.at",
    issuesUrl: "https://github.com/DK5EN/map/issues",
    updated: "2026-08-23",
    stats: [
      { value: "1.434", label: "Knoten" },
      { value: "910", label: "Gateways" },
      { value: "524", label: "Nur HF" },
      { value: "2.428", label: "aktive Verbindungen" },
      { value: "347", label: "Wetterstationen" },
      { value: "8", label: "UI-Sprachen" },
    ],
    statsNote:
      "Eine Momentaufnahme vom Tag, an dem die Screenshots entstanden — kein Live-Zähler. Die Karte selbst aktualisiert sich alle paar Sekunden.",
  },
  ui: {
    skipToContent: "Zum Inhalt springen",
    langLabel: "Sprache",
    themeLabel: "Thema",
    themeSystem: "System",
    themeLight: "Hell",
    themeDark: "Dunkel",
    openLive: "Live-Karte öffnen",
    reportIssue: "Problem melden",
    contents: "Inhalt",
    backToTop: "Nach oben",
    detailsHint: "Details anzeigen",
    updatedLabel: "Screenshots erstellt",
    calloutTip: "Tipp",
    calloutNote: "Hinweis",
    calloutWarn: "Achtung",
    glossaryTitle: "Glossar",
    closeLabel: "Schließen",
  },
  chapters: [
    {
      id: "start",
      nav: "Start",
      title: "Sich zurechtfinden",
      lead: "Sechs Reiter, ein Datensatz. Die Leiste oben ist überall gleich, und drei ihrer Bedienelemente sollte man kennen, bevor man sich mit allem anderen befasst.",
      image: {
        name: "21-command-palette",
        alt: "Die Suchpalette geöffnet über der Karte, mit einer Liste passender Knoten und Seiten.",
        caption: "Die Suchpalette. `Ctrl+K` drücken, auf dem Mac `Cmd+K`.",
      },
      points: [
        {
          h: "Suche von überall",
          p: "`Ctrl+K` drücken (`Cmd+K` auf dem Mac), oder einfach `/`. Die Suche durchsucht Rufzeichen, Wetterstationen und die Seiten selbst und merkt sich die letzte Auswahl. Das ist der schnellste Weg zu einer Station — und die wenigsten finden ihn von selbst.",
        },
        {
          h: "Die App spricht acht Sprachen",
          p: "Die Buchstaben neben dem Suchfeld wechseln die Oberfläche. Standardmäßig folgt sie der Spracheinstellung des Browsers. Englisch und Deutsch sind die beiden Sprachen, die der Autor selbst spricht; die übrigen sechs wurden anhand eines festen Glossars übersetzt.",
        },
        {
          h: "Hell, dunkel oder nach System",
          p: "Das Symbol ganz rechts schaltet zwischen den drei Optionen um. Der Kartenstil folgt dieser Wahl, bis man von Hand eine Basiskarte auswählt — danach bleibt diese Wahl bestehen.",
        },
        {
          h: "Die Statuszeile lügt nicht",
          p: "Unten links zeigt an, ob Daten live über ein WebSocket eintreffen, ob auf Abfragen zurückgefallen wurde, oder ob es still geworden ist. Unten rechts stehen die Knoten- und Verbindungszahl sowie der Zeitpunkt, zu dem der Server zuletzt etwas gesendet hat.",
        },
      ],
      details: [
        {
          summary: "Die sechs Reiter auf einen Blick",
          type: "table",
          head: ["Reiter", "Was er beantwortet"],
          rows: [
            [
              "Karte",
              "Wo befindet sich wer, und wie gut sind die Verbindungen dazwischen?",
            ],
            [
              "Verbindungen",
              "Wer hört wen, wie gut, und wie hat sich das über eine Woche verändert?",
            ],
            ["Nachrichten", "Was wurde über das Mesh-Netzwerk gesendet?"],
            [
              "WX",
              "Was melden die Sensoren einer bestimmten Station im Zeitverlauf?",
            ],
            [
              "WX-Karte",
              "Wie sehen Temperatur, Luftdruck oder Funkabdeckung über das gesamte Gebiet aus?",
            ],
            ["Admin", "Wie gesund sind Netzwerk und Server gerade jetzt?"],
          ],
        },
      ],
      callout: {
        type: "note",
        text: "Für nichts hier braucht es ein Konto. Jede Seite, auch Admin, ist frei zugänglich.",
      },
    },

    {
      id: "map",
      nav: "Karte",
      title: "Die Karte",
      lead: "Jeder Knoten, für den das Mesh-Netzwerk eine Position gemeldet hat, und jede Verbindung zwischen ihnen, die tatsächlich gemessen wurde.",
      image: {
        name: "01-map",
        alt: "Die Karte zeigt Knoten über Mitteleuropa, verbunden durch farbige Linien, mit geöffneter Legende unten rechts.",
        caption:
          "Knotenmarker verwenden APRS-Symbole; die Linien sind gemessene Verbindungen, eingefärbt nach Signalqualität.",
      },
      points: [
        {
          h: "Farbe bedeutet Signalqualität, nicht Entfernung",
          p: "Eine Verbindungslinie wird nach ihrem Signal-Rausch-Abstand eingefärbt. Grün ist eine komfortable Verbindung, Rot eine, die kaum noch funktioniert. Grenzwertige und schlechte Verbindungen werden absichtlich **über** guten gezeichnet, damit ein Problem nie unter einer gesunden Linie verschwindet.",
        },
        {
          h: "Zwei Arten von Stationen",
          p: "Orangefarbene Marker sind Nur-HF-Knoten, nur über Funk erreichbar. Blaue Marker sind Gateways, die zusätzlich eine Internetverbindung haben. Gateways erhalten außerdem einen kräftigeren Rand, damit die beiden auch bei eingeschränktem Farbsehen unterscheidbar bleiben.",
        },
        {
          h: "Durchgezogen heißt direkt, gestrichelt heißt weitergeleitet",
          p: "Eine durchgezogene Linie bedeutet, dass ein Funkgerät ein anderes direkt hört. Eine gestrichelte Linie ist über mindestens einen Relay-Knoten dazwischen gelaufen.",
        },
        {
          h: "Verbindungen enden bei 300 km",
          p: "Längere Kanten werden nicht gezeichnet. Ein LoRa-Pfad jenseits davon ist fast immer eine Meldung, die irgendwo unterwegs das Internet genutzt hat, kein echter Funkweg — und ihn zu zeichnen würde die Karte über die Abdeckung lügen lassen.",
        },
        {
          h: "Symbole stammen von APRS",
          p: "Das kleine Symbol auf jedem Marker ist das eigene APRS-Symbol der Station — eine Wetterstation, ein Repeater, ein Fahrzeug, eine Heimstation. Es ist derselbe Symbolsatz, den jedes andere APRS-Werkzeug verwendet.",
        },
      ],
      details: [
        {
          summary: "Die genaue Signalqualitäts-Skala",
          type: "table",
          head: ["Farbe", "SNR", "Bewertung"],
          rows: [
            ["Grün", "≥ −12 dB", "Gut — solide Reserve"],
            ["Gelb", "−12 bis −16 dB", "OK — funktioniert, weniger Reserve"],
            [
              "Orange",
              "−16 bis −20 dB",
              "Grenzwertig — verliert Pakete, sobald sich die Bedingungen verschlechtern",
            ],
            ["Rot", "< −20 dB", "Schlecht — an der Grenze der Dekodierbarkeit"],
            [
              "Grau",
              "kein Messwert",
              "Die Verbindung ist bekannt, aber ohne brauchbaren Messwert",
            ],
          ],
        },
        {
          summary:
            "Was die Werkzeugleiste kann, ohne es offensichtlich zu machen",
          type: "list",
          items: [
            "**Messen** — einschalten und zwei Punkte antippen, um die Entfernung dazwischen in Kilometern zu erhalten. Nützlich, um zu prüfen, ob ein Pfad überhaupt plausibel ist.",
            "**Nur ausgewählt** — reduziert die Karte auf eine Station und ihre direkten Nachbarn. In Kombination mit dem Suchfeld gilt das gleichzeitig für alle Treffer, wodurch aus einer überfüllten Karte ein lesbarer Stern wird.",
            "**Startansicht** — speichert die aktuelle Position und den Zoomfaktor, sodass die Karte beim nächsten Mal dort öffnet statt auf dem ganzen Kontinent.",
            "**Signal / Last** — ändert, wofür die Verbindungsfarbe steht. Signal zeigt die Qualität; Last färbt danach, wie viele einzelne Meldungen auf diesem Pfad beobachtet wurden, und zeigt so, wo sich Verkehr konzentriert. Last lädt ihre Daten erst, wenn sie zum ersten Mal angefordert wird.",
            "**Ansicht einpassen** — rahmt das, was nach dem Filtern gerade sichtbar ist.",
            "Ein Klick auf einen Cluster vergrößert die Ansicht. Sitzen mehrere Stationen exakt auf denselben Koordinaten, fächert ein Klick sie zu einem Bogen auf, sodass jede einzeln ausgewählt werden kann.",
          ],
        },
        {
          summary: "Filter und teilbare Links",
          type: "table",
          head: ["Filter", "Was er tut", "In der URL"],
          rows: [
            [
              "Knotentyp",
              "Nur Gateways, nur HF, oder beides",
              "`?type=gw` / `?type=hf`",
            ],
            [
              "Zuletzt gesehen",
              "Blendet alles aus, was nicht innerhalb von 1, 3 oder 6 Stunden gehört wurde",
              "`?seen=1h` / `3h` / `6h`",
            ],
            ["Batterie", "Nur Stationen mit 20 % oder weniger", "`?batt=low`"],
            ["Heartbeat", "Nur Gateways, die verstummt sind", "`?hb=silent`"],
            [
              "Auswahl",
              "Eine Station fokussieren, einkreisen und zentrieren",
              "`?focus=CALLSIGN`",
            ],
          ],
        },
      ],
      callout: {
        type: "tip",
        text: "Der Button **Link kopieren** neben einer ausgewählten Station liefert eine URL, die die Karte exakt auf dieser Station öffnet. Genau das gehört in einen Fehlerbericht oder einen Chat eingefügt.",
      },
    },

    {
      id: "connections",
      nav: "Verbindungen",
      title: "Verbindungen",
      lead: "Dieselben Verbindungen wie auf der Karte, aber als Zahlen und Verlauf. Hier zeigt sich, ob ein Pfad besser oder schlechter wird.",
      image: {
        name: "07b-connections-expanded",
        alt: "Die Verbindungstabelle mit einem erweiterten Knoten, der seine direkten und indirekten Nachbarn mit Signalwerten und kleinen Trenddiagrammen zeigt.",
        caption:
          "Das Erweitern einer Station listet jeden Nachbarn auf, den sie hört, mit Signal, Anzahl der Messwerte und einem Sieben-Tage-Trend.",
      },
      points: [
        {
          h: "Eine Station erweitern, um ihre Nachbarn zu sehen",
          p: "Grüne Zeilen sind direkte Nachbarn — ein einziger Funk-Hop. Orange Zeilen sind indirekt, über Relays erreicht, und die Zeile nennt die Relays, über die es lief.",
        },
        {
          h: "Die kleinen Diagramme sind anklickbar",
          p: "Die Spalte **Trend** enthält eine Sparkline — ein Miniaturdiagramm ohne Achsenbeschriftung: 48 Punkte, jeder das durchschnittliche Signal über eine Stunde der letzten sieben Tage. Ein Klick darauf öffnet die vollständige Historie: Signalstärke und Signal-Rausch-Abstand im Zeitverlauf, dazu die Anzahl der Meldungen pro Stunde. Fast niemand entdeckt das von selbst.",
        },
        {
          h: "Qualität gehört zu einer Verbindung, nie zu einer Station",
          p: "Es gibt keine einzelne „Qualität“-Kennzahl für einen Knoten. Eine Station kann einen ausgezeichneten Nachbarn und einen miserablen haben, und der Durchschnitt daraus würde nichts aussagen. Jeder Messwert hier gehört zu genau einem bestimmten Paar.",
        },
        {
          h: "Messwerte gelten nur in eine Richtung",
          p: "Ein Messwert sagt: „B hat A mit diesem Signal gehört.“ Er sagt nichts darüber aus, ob A auch B hört — das ist ein eigener Messwert, aufgenommen von einem anderen Funkgerät, und die beiden stimmen oft nicht überein.",
        },
        {
          h: "Lücken in einem Diagramm sind meist echt",
          p: "Stationen senden nicht durchgehend, deshalb hinterlassen ruhige Stunden Lücken. Eine einzelne fehlende Stunde zwischen zwei Messwerten wird überbrückt, weil der Verlust einer Meldung auf einer sonst gesunden Verbindung normal ist. Längere Lücken werden ehrlich als Lücken angezeigt.",
        },
      ],
      details: [
        {
          summary:
            "„Zuletzt gesehen“ bedeutet zweierlei — daran stolpert jeder",
          type: "prose",
          text: "In der Zeile einer Station bedeutet es: der letzte Zeitpunkt, zu dem **überhaupt irgendjemand** diese Station gehört hat. In einer ihrer Nachbarzeilen bedeutet es: der letzte Zeitpunkt, zu dem ein Messwert **auf genau dieser Verbindung** eintraf. Eine Station kann vor zwei Minuten gehört worden sein, während eine ihrer Verbindungen seit zwei Tagen still ist. Beide Zahlen sind korrekt — sie beantworten nur unterschiedliche Fragen.",
        },
        {
          summary: "Was die Spalten enthalten",
          type: "table",
          head: ["Spalte", "Bedeutung"],
          rows: [
            [
              "Rufzeichen",
              "Die Station, oder — bei erweiterter Zeile — einer ihrer Nachbarn",
            ],
            ["Typ", "Gateway oder Nur HF"],
            [
              "Verbindungen",
              "Wie viele Nachbarn diese Station hat, direkt und indirekt",
            ],
            [
              "Verbindungsqualität",
              "Signal-Rausch-Abstand und Empfangsstärke dieser einen Verbindung",
            ],
            [
              "Messwerte",
              "Wie viele Meldungen in den letzten sieben Tagen auf dieser Verbindung eintrafen",
            ],
            ["Trend", "Die anklickbare Sparkline"],
            [
              "Zuletzt gesehen",
              "Siehe Kasten oben — hängt davon ab, welche Zeile man betrachtet",
            ],
          ],
        },
        {
          summary: "Die Stationsprofilseite",
          type: "list",
          items: [
            "Ein Klick auf ein Rufzeichen öffnet, gleich wo, die eigene Seite dieser Station.",
            "Sie bündelt alles zu einer Station: Hardware und Firmware, alle ihre Verbindungen, ihre jüngsten Nachrichten, ihre Sensordiagramme, ihre Position und — bei Gateways — eine Verfügbarkeits-Zeitachse, die zeigt, wann sie aktiv war und wann nicht.",
            "Geplante Wartungsfenster werden wie Betriebszeit dargestellt, damit ein geplanter Ausfall nicht wie ein Fehler wirkt.",
          ],
        },
      ],
    },

    {
      id: "messages",
      nav: "Nachrichten",
      title: "Nachrichten",
      lead: "Was tatsächlich über das Mesh-Netzwerk gesendet wurde, jeweils mit der Empfangsqualität der einzelnen Nachricht.",
      image: {
        name: "11-messages",
        alt: "Die Nachrichtenansicht zeigt Nachrichtentexte, gruppiert nach Absender, mit Signalwerten und Filterbedienelementen.",
        caption:
          "Nachrichten tragen die Signalwerte, mit denen sie empfangen wurden, sowie die Relays, über die sie liefen.",
      },
      points: [
        {
          h: "Jede Nachricht zeigt, wie sie ankam",
          p: "Neben dem Text stehen der Signal-Rausch-Abstand und die Empfangsstärke dieses Empfangs sowie, falls weitergeleitet, die Kette der Stationen, über die sie lief.",
        },
        {
          h: "Live und Suche sind zwei unterschiedliche Modi",
          p: "Standardmäßig ist ein Live-Fenster der letzten 24 Stunden zu sehen, das sich aktualisiert, sobald Nachrichten eintreffen. Ein längerer Zeitraum wechselt zu einer seitenweisen Suche über die gespeicherte Historie — die Ansicht sagt das ausdrücklich, sodass immer klar ist, in welchem Modus man sich befindet.",
        },
        {
          h: "Filtern nach Wer, Über wen und An wen",
          p: "Eigene Felder für Absender, Relay und Empfänger, dazu eine Volltextsuche über die Nachrichtentexte und ein Schalter für ausschließlich weitergeleitete Nachrichten.",
        },
        {
          h: "Notfallverkehr wird separat ausgewiesen",
          p: "Notfallnachrichten erhalten einen eigenen Filter und eine eigene Kennzeichnung, damit sie im gewöhnlichen Verkehr nicht untergehen.",
        },
      ],
      callout: {
        type: "note",
        text: "Alles hier wurde offen über Funk ausgestrahlt. Amateurfunk ist kein privates Medium, und die Karte macht ihn nicht dazu.",
      },
    },

    {
      id: "wx",
      nav: "WX",
      title: "Wetter und Telemetrie",
      lead: "Viele Stationen tragen Sensoren. Dieser Reiter zeigt, was eine einzelne Station im Zeitverlauf gemessen hat; der nächste zeigt, was alle zusammen über das Gebiet aussagen.",
      image: {
        name: "12b-wx-station",
        alt: "Diagramme für eine Wetterstation: Temperatur und Luftfeuchte, Luftdruck, Batterie, mit aktuellen Werten darüber.",
        caption:
          "Eine Station, vier Zeiträume, mit den aktuellen Bedingungen oben und der vollständigen Zeitreihe darunter.",
      },
      points: [
        {
          h: "Vier Zeiträume, plus ein freier",
          p: "24 Stunden, 7 Tage, ein Monat, ein Jahr. Der Button **Detail** öffnet eine Ansicht, in der Start- und Enddatum selbst gewählt werden.",
        },
        {
          h: "Zwei Temperaturen, und sie sind nicht austauschbar",
          p: "Die meisten Boards haben einen Sensor direkt auf der Platine, der im Gehäuse sitzt und zu warm anzeigt. Manche haben zusätzlich eine Sonde an einem Kabel, außerhalb. Die Karte ermittelt anhand des nächtlichen Verhaltens, welcher Sensor tatsächlich draußen sitzt, und verwendet diesen für die flächendeckende Temperaturkarte.",
        },
        {
          h: "QFE ist das, was der Sensor misst — QNH ist das, was sich vergleichen lässt",
          p: "QFE ist der Luftdruck auf der eigenen Höhe der Station — eine Bergstation und eine Talstation sind so nie vergleichbar. QNH ist dieser Druck, umgerechnet auf Meereshöhe. Der Server berechnet QNH selbst aus Druck und Höhe, weil der von der Firmware gemeldete Wert nicht zuverlässig ist.",
        },
        {
          h: "Eine Null ist nicht immer ein Messwert",
          p: "0 °C ist eine echte Temperatur und wird geplottet. 0 % Luftfeuchte und 0 % Batterie sind das nicht — das schickt die Firmware, wenn es nichts zu melden gibt, und wird als fehlend behandelt statt als Absturz auf null gezeichnet.",
        },
      ],
      details: [
        {
          summary: "Jeder Wert, den eine Station melden kann",
          type: "table",
          head: ["Wert", "Einheit", "Was er ist"],
          rows: [
            [
              "Temp (innen)",
              "°C",
              "Der Sensor auf dem Board, meist im Gehäuse",
            ],
            [
              "Temp 2 (außen)",
              "°C",
              "Eine Sonde an einem Kabel, meist tatsächlich im Freien",
            ],
            ["Luftfeuchte", "%", "Relative Luftfeuchte"],
            ["QFE", "hPa", "Luftdruck auf Höhe der Station"],
            [
              "QNH",
              "hPa",
              "Derselbe Druck, umgerechnet auf Meereshöhe, damit Stationen vergleichbar werden",
            ],
            [
              "Höhe",
              "m",
              "Aus GPS; auch geglättet mit dem Barometer verfügbar, um Rauschen zu entfernen",
            ],
            [
              "Batterie",
              "%",
              "Versorgungsspannung, sofern die Station eine meldet",
            ],
            [
              "Gaswiderstand",
              "kΩ",
              "Luftqualitätssensor, auf Boards, die einen haben",
            ],
            ["eCO2", "ppm", "Geschätztes CO₂ aus derselben Sensorfamilie"],
            ["Wasserstand", "—", "Für Stationen, die einen Pegel überwachen"],
            ["Wassertemperatur", "°C", "Ebenso"],
            [
              "Benutzerdefinierte Kanäle",
              "variiert",
              "Frei definierte Messwerte, die eine Station mit eigenem Namen und eigener Einheit sendet",
            ],
          ],
        },
        {
          summary: "Die Ampel an einer Wetterstation",
          type: "prose",
          text: "Jede Station wird danach beurteilt, ob ihre Messwerte für die flächendeckende Karte vertrauenswürdig sind. **Grün** heißt: sie fließt ein. **Gelb** heißt: sie wird beobachtet, zählt aber noch. **Grau** heißt: es reicht noch nicht für ein Urteil — entweder kein Sensor, oder weniger als zwei Tage Daten. **Rot** heißt: sie ist derzeit ausgeschlossen. Eine Station muss sich rund zwei Tage lang durchgehend auffällig verhalten, um auf Rot zu springen, und sich rund zwei Tage lang unauffällig verhalten, um zurückzukehren — so flackert sie nicht bei jedem Wetterumschwung.",
        },
        {
          summary: "Was eine Station markiert",
          type: "table",
          head: ["Befund", "Was es meist bedeutet"],
          rows: [
            [
              "Druck weicht um mehr als 4 hPa ab",
              "Die konfigurierte Höhe ist falsch — von Hand setzen, statt sie von GPS zu übernehmen",
            ],
            [
              "Temperatur weicht um mehr als 7 °C ab",
              "Sensorplatzierung, oder ein defekter Sensor",
            ],
            [
              "Kaum Tag-Nacht-Schwankung",
              "Der Sensor sitzt drinnen oder ist abgeschirmt",
            ],
            [
              "Ein konstanter, unveränderlicher Wert",
              "Der Sensor hängt fest und braucht vermutlich einen Neustart",
            ],
            [
              "Springende Höhenwerte",
              "GPS-Rauschen — eine feste Höhe konfigurieren",
            ],
            [
              "Nachts zu warm",
              "Das Gehäuse hält Wärme, oder das Board erwärmt seinen eigenen Sensor",
            ],
          ],
        },
      ],
      callout: {
        type: "tip",
        text: "Zeigt die eigene Station Rot, nennt die Markierung die Ursache. Die meisten davon sind ein Konfigurations- oder Platzierungsproblem, kein defekter Sensor.",
      },
    },

    {
      id: "wxmap",
      nav: "WX-Karte",
      title: "Flächenkarten — und das HF-Wetter",
      lead: "Drei Overlays, berechnet aus allen Stationen zugleich: Temperatur, Luftdruck, und wie gut das Netzwerk tatsächlich hört.",
      image: {
        name: "16-wxmap-coverage",
        alt: "Das Abdeckungs-Overlay: ein Farbfeld über Mitteleuropa von Dunkellila über Grün bis Gelb, mit einer Legende, die die Dezibel-Skala erklärt.",
        caption:
          "HF-Abdeckung — der Median-Empfangspegel an den Stationen, die zuhören.",
      },
      points: [
        {
          h: "HF-Abdeckung ist das „HF-Wetter“",
          p: "Dieses Overlay färbt das Gebiet nach dem **Median-Empfangspegel**, gemessen an den empfangenden Stationen. Hell bedeutet: Signale kommen dort stark an; dunkel bedeutet: sie kommen schwach an. Es ist das Nächste, was die Karte an einem Bild der aktuellen Funkbedingungen zu bieten hat, und es wird aus echten Empfängen berechnet, nicht aus einem Ausbreitungsmodell.",
        },
        {
          h: "Leer heißt: niemand hat zugehört",
          p: "Das ist der mit Abstand wichtigste Punkt beim Abdeckungs-Overlay. Eine leere Fläche bedeutet **nicht** schlechten Empfang — sie bedeutet, dass kein Empfänger in Reichweite war, um überhaupt etwas zu messen. Fehlender Beweis ist kein Beweis für Abwesenheit.",
        },
        {
          h: "Zwei Zeitfenster",
          p: "Die letzten 24 Stunden, oder die letzten 7 Tage. Das kürzere Fenster zeigt die aktuellen Bedingungen; das längere glättet eine ruhige Nacht oder eine Station, die gerade zufällig aus war.",
        },
        {
          h: "Temperatur über das Gebiet",
          p: "Das Temperatur-Overlay interpoliert zwischen Stationen, statt nur einzelne Punkte einzufärben. Wo keine Station in der Nähe ist, verblasst die Farbe, statt einen Wert zu erfinden.",
        },
        {
          h: "Luftdruck mit Isobaren",
          p: "Das Druck-Overlay zeichnet Höhenlinien gleichen Drucks, wie eine Wetterkarte es tut. Es verwendet den vom Server berechneten Meeresspiegeldruck und korrigiert eine netzweite systematische Abweichung, damit eine Flotte leicht verstellter Sensoren nicht das ganze Bild verschiebt.",
        },
        {
          h: "Einen Wert dort ablesen, wo man zeigt",
          p: "Bewegt man die Maus darüber, erscheint der Wert unter dem Zeiger. Auf einem Touchscreen heftet stattdessen der Button **Wert im Kartenmittelpunkt ablesen** den Wert an. Die Stationsliste zeigt die echten Messwerte statt des interpolierten Feldes.",
        },
      ],
      details: [
        {
          summary: "Die Farbskala der Abdeckung",
          type: "table",
          head: ["Farbe", "Empfangssignal", "Bewertung"],
          rows: [
            ["Gelb", "etwa −90 dBm", "Stark — komfortable Reserve"],
            ["Grün", "etwa −105 dBm", "Solide"],
            ["Blaugrün", "etwa −115 dBm", "Brauchbar"],
            ["Dunkellila", "etwa −130 dBm", "An der Rauschgrenze"],
            [
              "Leer",
              "keine Daten",
              "Kein Empfänger in Reichweite — kein schwaches Signal",
            ],
          ],
        },
        {
          summary: "Ehrliche Grenzen der Wetter-Overlays",
          type: "list",
          items: [
            "Messwerte werden über die letzte Stunde geglättet, das Bild hinkt einer schnell ziehenden Front also hinterher.",
            "Unbelüftete Sensoren in der Sonne zeigen an einem klaren Nachmittag mehrere Grad zu viel an. Das ist eine bekannte Eigenschaft der Hardware, kein Fehler der Karte.",
            "Das Temperaturfeld ist nicht höhenkorrigiert — eine Bergstation zeigt, was eine Bergstation zeigt.",
            "Die Interpolation verblasst mit der Entfernung zur nächsten Station, absichtlich. Wo nichts zu sehen ist, gab es auch nichts, worauf man sich stützen konnte.",
            "Die Abdeckung braucht mindestens vier Empfänger in Reichweite, bevor überhaupt etwas gezeichnet wird.",
          ],
        },
      ],
      callout: {
        type: "warn",
        text: "Die Abdeckung zeigt genauso, wo Empfänger **stehen**, wie sie zeigt, wie gut sie hören. Ein dunkler oder leerer Bereich ist oft ein Bereich ohne Stationen darin — am besten zusammen mit der Knotenkarte lesen.",
      },
    },

    {
      id: "admin",
      nav: "Admin",
      title: "Admin — die Zahlen, und welchen Zeitraum sie abdecken",
      lead: "Zustand von Feed und Flotte. Jede Zahl hier ist ehrlich, aber fast jede deckt einen anderen Zeitraum ab — und zwei davon so zu lesen, als würden sie denselben Zeitraum abdecken, ist der übliche Fehler.",
      image: {
        name: "17-admin",
        alt: "Die Admin-Seite mit Feed-Status, Flottenzahlen und Aktivitätsdiagrammen.",
        caption:
          "Feed-Status oben, Flottenzahlen darunter, dann Hardware, Batteriezustand und die Ansicht der Rohdaten.",
      },
      points: [
        {
          h: "Erst das Zeitfenster lesen, dann die Zahl",
          p: "Mehrere Kacheln tragen ihr Zeitfenster im Label, und das ist wörtlich gemeint. „Aktive Pfade (3 Std.)“ heißt nicht „alle Verbindungen aller Zeiten“ — eine Verbindung, die drei Stunden lang nicht gehört wurde, verschwindet einfach aus dieser Zahl.",
        },
        {
          h: "Der Feed-Status ist als Erstes zu prüfen",
          p: "Er zeigt, ob die Upstream-Verbindung lebt, wie viele Frames pro Stunde jeder Art eintreffen, und einen Verfügbarkeitsbalken für den beobachteten Zeitraum. Ist er unzufrieden, ist alles darunter veraltet.",
        },
        {
          h: "Manche Zähler starten mit dem Server neu",
          p: "Frames pro Stunde und der Hub-Reset-Zähler werden seit dem letzten Serverstart gezählt. Eine niedrige Zahl direkt nach einem Neustart heißt „gerade erst mit dem Zählen begonnen“, nicht „es passiert nichts“.",
        },
        {
          h: "Batteriezustand ist nicht Batteriestand",
          p: "Diese Karte listet Stationen, deren Batterie**meldung** unzuverlässig wirkt — springende Werte, oder Werte, die auftauchen und wieder verschwinden. Eine Station mit einer echt niedrigen, aber stabilen Batterie steht hier nicht.",
        },
        {
          h: "Rohdaten, wer die tatsächlichen Frames sehen will",
          p: "Vier Tabellen zeigen unverarbeitete Daten: Knoten, Pfade, eingehende HEY-Frames und Positionen, die die Prüfung nicht bestanden haben. Sie lassen sich sortieren und als CSV exportieren.",
        },
      ],
      details: [
        {
          summary: "Welche Zahl welchen Zeitraum abdeckt — die ganze Tabelle",
          type: "table",
          head: ["Gruppe", "Beispiele", "Zeitraum"],
          rows: [
            [
              "Live",
              "Feed-Status, Knoten- und Gateway-Zahlen, Rohdaten-Tabellen, Aktivitätsdiagramme",
              "Jetzt gerade, alle paar Sekunden aktualisiert",
            ],
            [
              "Gleitendes Fenster",
              "Aktive Pfade (3 Std.), Nachrichten (24 Std.), Weiterleitungs-Rangliste (24 Std. / 7 Tage)",
              "Nur, was in das genannte Fenster fällt",
            ],
            [
              "Seit Serverstart",
              "Frames pro Stunde, Hub-Resets",
              "Setzt sich bei einem Neustart auf null zurück",
            ],
            [
              "Aktueller Flottenzustand",
              "Hardware-Mix, Firmware-Aktualität, Liste schwacher Batterien",
              "Nur Stationen, die in den letzten 3 Stunden gehört wurden",
            ],
          ],
        },
        {
          summary: "Die Flottenkacheln im Einzelnen",
          type: "table",
          head: ["Kachel", "Was sie zählt"],
          rows: [
            [
              "Knoten gesamt (3 Std.)",
              "Jede Station, die in den letzten drei Stunden gehört wurde",
            ],
            ["Gateways", "Davon jene mit Internetverbindung"],
            ["Nur HF", "Davon jene, die nur über Funk erreichbar sind"],
            [
              "Mit Position",
              "Stationen, die eine plausible Position gemeldet haben",
            ],
            [
              "Ohne Position",
              "Gehört, aber ohne brauchbare Position — sie existieren, stehen nur nicht auf der Karte",
            ],
            [
              "Aktive Pfade (3 Std.)",
              "Verbindungen mit einem Messwert innerhalb dieses Fensters",
            ],
            [
              "SMS-Nachrichten (24 Std.)",
              "Gewöhnliche Nachrichten des letzten Tages",
            ],
            ["Notfall (24 Std.)", "Notfallverkehr des letzten Tages"],
          ],
        },
        {
          summary:
            "Warum eine Station auf der Karte fehlen und in den Zahlen trotzdem vorkommen kann",
          type: "prose",
          text: "Positionen werden bei Eingang geprüft. Eine physikalisch unplausible Position wird nicht stillschweigend korrigiert und nicht stillschweigend verworfen — die Station bleibt ohne Position erhalten, und die abgelehnte Koordinate erscheint unter „Positionsverdächtige“. Die Station wird also gezählt, ist auffindbar und durchsuchbar; sie hat nur keinen Punkt. Das ist Absicht: Ein falscher Punkt ist schlimmer als kein Punkt.",
        },
      ],
      callout: {
        type: "note",
        text: "Die gesamte Admin-Seite ist öffentlich. Nichts ist hinter einem Login versteckt, und nichts wird für Besucher ausgeblendet.",
      },
    },

    {
      id: "tech",
      nav: "Dahinter",
      title: "Wie es gebaut ist",
      lead: "Für alle, die neugierig auf die Mechanik sind, oder die selbst etwas Ähnliches bauen möchten.",
      image: {
        name: "20-admin-raw",
        alt: "Die Rohdaten-Tabellen auf der Admin-Seite zeigen eingehende Frames mit Zeitstempeln und Signalwerten.",
        caption:
          "Die Rohdaten-Tabellen — die Daten, wie sie eintreffen, vor jeder der oben beschriebenen Verarbeitungen.",
      },
      points: [
        {
          h: "Server: Node.js",
          p: "Ein Node.js-Server auf Basis von Fastify erledigt die gesamte Arbeit: Er nimmt die Feeds auf, validiert und führt sie zusammen, berechnet Verbindungsqualität, Wetterfelder und Abdeckung, und speichert alles in SQLite. Der Browser zeichnet nur — jede Umwandlung geschieht serverseitig, sodass alle Clients exakt dieselben Zahlen sehen.",
        },
        {
          h: "Frontend: Vue 3",
          p: "Vue 3 in striktem TypeScript, mit Pinia für den Zustand, MapLibre GL für die Karten, Chart.js für die Diagramme und Tailwind für das Styling. Rund 83 Komponenten, übersetzt in acht Sprachen.",
        },
        {
          h: "Live-Daten über ein WebSocket",
          p: "Beim Verbinden gibt es eine vollständige Momentaufnahme, danach nur noch, was sich geändert hat, etwa alle zwei Sekunden, codiert als Protocol Buffers. Nur die Unterschiede zu senden ist das, was eine dauerhaft geöffnete Karte günstig genug macht, um sie laufen zu lassen. Ist das WebSocket nicht verfügbar, fällt die Karte auf Abfragen alle 15 Sekunden zurück.",
        },
        {
          h: "Drei Quellen, ein Bild",
          p: "Die Hauptquelle ist ein UDP-Feed aus der MeshCom-Infrastruktur, der Positionen, Nachrichten und Empfangsmeldungen trägt. Eine zweite, ältere Quelle wird noch für private Eins-zu-eins-Nachrichten gescrapt. Eine dritte wurde stillgelegt. Wo sich Quellen widersprechen, sind die Zusammenführungsregeln explizit, statt dass einfach die letzte gewinnt.",
        },
        {
          h: "Nichts scheitert stillschweigend",
          p: "Jeder Fehler, der das Verhalten verändert, hinterlässt einen Eintrag. Abgelehnte Positionen, abgelehnte Sensormesswerte und Protokollverstöße werden alle mitsamt Beleg festgehalten — deshalb kann die Karte sagen, *warum* etwas fehlt.",
        },
        {
          h: "Auch maschinenlesbar",
          p: "Dieselbe API steht auch über das Model Context Protocol mit 25 Werkzeugen zur Verfügung, sodass ein Sprachmodell Fragen zum Netzwerk direkt beantworten kann, statt die Seite zu scrapen.",
        },
      ],
      details: [
        {
          summary: "Größenordnung des Ganzen",
          type: "table",
          head: ["", "Anzahl"],
          rows: [
            ["Server-Code", "~62.700 Zeilen"],
            ["Frontend-Code", "~40.200 Zeilen"],
            ["Vue-Komponenten", "83"],
            ["Testdateien", "298"],
            ["UI-Sprachen", "8"],
            ["MCP-Werkzeuge", "25"],
          ],
        },
      ],
    },

    {
      id: "help",
      nav: "Rückmeldung",
      title: "Etwas gefunden, das nicht stimmt?",
      lead: "Die Karte wird von einer einzelnen Person geschrieben, ein zweites Augenpaar hilft also wirklich. Rückmeldungen sind willkommen, und der Tracker ist öffentlich.",
      points: [
        {
          h: "Was einer Meldung am meisten hilft",
          p: "Die beteiligten Rufzeichen, welcher Reiter, was zu sehen war im Vergleich zum Erwarteten, ungefähr wann es passierte samt Zeitzone, und ein Link — `?focus=CALLSIGN` öffnet die Karte exakt auf dieser Station.",
        },
        {
          h: "Was woanders hingehört",
          p: "Firmware-Probleme gehören zum MeshCom-Projekt. Fragen zum Betrieb von Gateways gehören zu den MeshCom-Betreibern. Und eine Station lässt sich hier nicht von der Karte entfernen — die Karte spiegelt nur, was das Mesh-Netzwerk offen ausstrahlt, das muss an der Quelle geändert werden.",
        },
      ],
      callout: {
        type: "tip",
        text: "Nicht sicher, ob etwas ein Fehler ist oder man nur einen Teil der Karte falsch liest? Trotzdem fragen. War die Karte unklar genug, um zu verwirren, ist das etwas wert zu wissen.",
      },
    },
  ],

  glossary: [
    {
      term: "Knoten",
      def: "Eine Station im Mesh-Netzwerk — ein Funkgerät mit Rufzeichen.",
    },
    {
      term: "Gateway",
      def: "Eine Station, die zusätzlich mit dem Internet verbunden ist und Verkehr weiterleitet. Alles, was das weitere Netzwerk sieht, kommt über eine solche Station herein.",
    },
    {
      term: "Nur HF",
      def: "Eine Station, die nur über Funk erreichbar ist, ohne eigene Internetverbindung.",
    },
    {
      term: "HEY",
      def: "Die Aussendung, mit der sich eine Station ankündigt. Jede Station, die sie weiterleitet, fügt ihren eigenen Messwert hinzu, wie gut sie sie empfangen hat. Von hier stammen fast alle Verbindungsdaten dieser Karte.",
    },
    {
      term: "PATH",
      def: "Ein gespeicherter Empfang: wer gehört wurde, von wem, über welche Relays, mit welchem Signal. Eine unterwegs befindliche HEY-Aussendung wird zu einem oder mehreren PATH-Datensätzen, sobald sie empfangen und aufgezeichnet wird.",
    },
    {
      term: "Hop",
      def: "Ein einzelner Weiterleitungsschritt. Ein Direktempfang hat null Hops; jedes weitere Relay fügt einen hinzu.",
    },
    {
      term: "SNR",
      def: "Signal-Rausch-Abstand in dB — wie weit das Signal über dem Rauschen liegt. Das wichtigste Qualitätsmaß für Verbindungen hier. Höher ist besser; LoRa dekodiert noch weit unter null.",
    },
    {
      term: "RSSI",
      def: "Empfangsfeldstärke in dBm — wie viel Energie ankam. Immer negativ; näher an null bedeutet stärker. Sie sagt, wie laut, während SNR sagt, wie klar.",
    },
    {
      term: "QFE",
      def: "Luftdruck, gemessen auf der eigenen Höhe der Station.",
    },
    {
      term: "QNH",
      def: "Derselbe Druck, umgerechnet auf Meereshöhe, damit Stationen auf unterschiedlicher Höhe vergleichbar sind. Diesen Wert verwenden Wetterkarten.",
    },
    {
      term: "Sparkline",
      def: "Das kleine Diagramm in der Spalte Trend — ein Miniaturverlauf ohne Achsenbeschriftung. Anklicken öffnet die vollständige Historie.",
    },
    {
      term: "Heartbeat",
      def: "Das Lebenszeichen eines Gateways über seine Internetverbindung. Getrennt davon, ob es über Funk gehört wurde — ein Gateway kann online lebendig sein, während sein Funkgerät still ist, und die Karte hält beides auseinander.",
    },
    {
      term: "Abdeckung",
      def: "Der Median-Empfangspegel über ein Gebiet, berechnet aus tatsächlichen Empfängen. Leere Flächen bedeuten, dass dort niemand zugehört hat.",
    },
    {
      term: "NBCNT",
      def: "Die Anzahl direkter Nachbarn, die eine Station nach eigener Zählung in der letzten Stunde gehört hat.",
    },
    {
      term: "APRS-Symbol",
      def: "Der im Amateurfunk verbreitete Standardsatz an Symbolen, der angibt, um welche Art Station es sich handelt.",
    },
  ],

  footer: {
    text: "Die Karte wird von Martin, DK5EN, entwickelt — in Kooperation mit dem ÖVSV, der den Server dafür bereitstellt. Die Daten stammen aus dem MeshCom-Projekt und werden freundlicherweise von Kurt, OE1KBC, zur Verfügung gestellt. Alles, was hier zu sehen ist, senden die Stationen selbst offen über Funk aus.",
    links: [
      { label: "Live-Karte", href: "https://meshmap.oevsv.at" },
      { label: "Problem melden", href: "https://github.com/DK5EN/map/issues" },
      { label: "MeshCom", href: "https://icssw.org/meshcom/" },
    ],
  },
};
