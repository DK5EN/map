window.GUIDE = window.GUIDE || {};
window.GUIDE.en = {
  lang: "en",
  meta: {
    title: "MeshCom Map",
    tagline: "What the map shows, and how to read it.",
    intro:
      "MeshCom Map is a web map for the MeshCom amateur-radio LoRa mesh. The official dashboards render HTML tables; this one adds link quality from the measured signal, telemetry charts, weather overlays and a live feed. Everything on it is derived from what the mesh itself broadcasts. This manual walks through every tab and explains the parts that are easy to miss.",
    liveUrl: "https://meshmap.oevsv.at",
    issuesUrl: "https://github.com/DK5EN/map/issues",
    updated: "2026-08-23",
    stats: [
      { value: "1,434", label: "nodes" },
      { value: "910", label: "gateways" },
      { value: "524", label: "HF-only" },
      { value: "2,428", label: "active links" },
      { value: "347", label: "weather stations" },
      { value: "8", label: "UI languages" },
    ],
    statsNote:
      "A snapshot from the day the screenshots were taken, not a live counter. The map itself updates every couple of seconds.",
  },
  ui: {
    skipToContent: "Skip to content",
    langLabel: "Language",
    themeLabel: "Theme",
    themeSystem: "System",
    themeLight: "Light",
    themeDark: "Dark",
    openLive: "Open the live map",
    reportIssue: "Report a problem",
    contents: "Contents",
    backToTop: "Back to top",
    detailsHint: "Show details",
    updatedLabel: "Screenshots taken",
    calloutTip: "Tip",
    calloutNote: "Note",
    calloutWarn: "Watch out",
    glossaryTitle: "Glossary",
    closeLabel: "Close",
  },
  chapters: [
    {
      id: "start",
      nav: "Start",
      title: "Getting your bearings",
      lead: "Six tabs, one data set. The bar across the top is the same everywhere, and three of its controls are worth knowing before anything else.",
      image: {
        name: "21-command-palette",
        alt: "The search palette open over the map, listing matching nodes and pages.",
        caption: "The search palette. Press Ctrl+K, or Cmd+K on a Mac.",
      },
      points: [
        {
          h: "Search from anywhere",
          p: "Press `Ctrl+K` (`Cmd+K` on a Mac), or just `/`. It searches callsigns, weather stations and the pages themselves, and it remembers what you picked last. This is the fastest way to jump to a station, and most people never find it.",
        },
        {
          h: "The app speaks eight languages",
          p: "The letters next to the search box switch the interface. It follows your browser by default. English and German are the two the author speaks; the other six were translated against a fixed glossary.",
        },
        {
          h: "Light, dark or follow the system",
          p: "The icon at the far right cycles through the three. The map style follows your choice until you pick a basemap by hand, after which your choice sticks.",
        },
        {
          h: "The status line never lies to you",
          p: "Bottom left tells you whether data is arriving live over a WebSocket, whether it fell back to polling, or whether it has gone quiet. Bottom right shows the node and link counts and the time the server last sent something.",
        },
      ],
      details: [
        {
          summary: "The six tabs at a glance",
          type: "table",
          head: ["Tab", "What it answers"],
          rows: [
            [
              "Map",
              "Where is everyone, and how good are the links between them?",
            ],
            [
              "Connections",
              "Who hears whom, how well, and how has that changed over a week?",
            ],
            ["Messages", "What has been sent across the mesh?"],
            [
              "WX",
              "What are the sensors on a given station reporting, over time?",
            ],
            [
              "WX Map",
              "What does temperature, air pressure or radio coverage look like across the whole area?",
            ],
            ["Admin", "How healthy is the network and this server right now?"],
          ],
        },
      ],
      callout: {
        type: "note",
        text: "Nothing here needs an account. Every page, including Admin, is open to anyone.",
      },
    },

    {
      id: "map",
      nav: "Map",
      title: "The map",
      lead: "Every node the mesh has reported a position for, and every link between them that someone actually measured.",
      image: {
        name: "01-map",
        alt: "The map showing nodes across Central Europe, connected by coloured lines, with the legend open at the lower right.",
        caption:
          "Node markers use APRS symbols; the lines are measured links, coloured by signal quality.",
      },
      points: [
        {
          h: "Colour is signal quality, not distance",
          p: "A link line is coloured by its signal-to-noise ratio. Green is a comfortable link, red is one that barely works. Marginal and bad links are deliberately drawn **on top** of good ones, so a problem is never hidden underneath a healthy line.",
        },
        {
          h: "Two kinds of station",
          p: "Orange markers are HF-only nodes, reachable only over the air. Blue markers are gateways, which also have an internet connection. Gateways additionally get a bolder outline, so the two stay distinguishable if you do not see colour well.",
        },
        {
          h: "Solid means direct, dashed means relayed",
          p: "A solid line is one radio hearing another directly. A dashed line went through at least one relay in between.",
        },
        {
          h: "Links stop at 300 km",
          p: "Longer edges are not drawn. A LoRa path beyond that is almost always a report that travelled over the internet somewhere along the way, not a genuine radio shot, and drawing it would make the map lie about coverage.",
        },
        {
          h: "Symbols come from APRS",
          p: "The little icon on each marker is the station’s own APRS symbol — a weather station, a repeater, a vehicle, a home station. It is the same symbol set every other APRS tool uses.",
        },
      ],
      details: [
        {
          summary: "The exact signal-quality scale",
          type: "table",
          head: ["Colour", "SNR", "Reading"],
          rows: [
            ["Green", "≥ −12 dB", "Good — solid margin"],
            ["Yellow", "−12 to −16 dB", "OK — works, less headroom"],
            [
              "Orange",
              "−16 to −20 dB",
              "Marginal — drops packets when conditions worsen",
            ],
            ["Red", "< −20 dB", "Bad — at the edge of decodable"],
            [
              "Grey",
              "no reading",
              "The link is known, but no usable measurement came with it",
            ],
          ],
        },
        {
          summary: "Things the toolbar does that are not obvious",
          type: "list",
          items: [
            "**Measure** — switch it on and tap two points to get the distance between them in kilometres. Useful for sanity-checking whether a path is plausible at all.",
            "**Only selected** — reduces the map to one station and its direct neighbours. Combined with the search box it does the same for every match at once, which turns a crowded map into one readable star.",
            "**Start view** — saves the current position and zoom, so the map opens there next time instead of on the whole continent.",
            "**Signal / Load** — swaps what the link colour means. Signal is quality; Load colours by how many separate reports were observed on that path, which shows where traffic concentrates. Load only fetches its data when you first ask for it.",
            "**Fit view** — frames whatever is currently visible after filtering.",
            "Clicking a cluster zooms in. Where several stations sit on exactly the same coordinates, clicking spreads them into an arc so each one can be picked individually.",
          ],
        },
        {
          summary: "Filters and shareable links",
          type: "table",
          head: ["Filter", "What it does", "In the URL"],
          rows: [
            [
              "Node type",
              "Gateways only, HF-only, or both",
              "`?type=gw` / `?type=hf`",
            ],
            [
              "Last seen",
              "Hide anything not heard within 1, 3 or 6 hours",
              "`?seen=1h` / `3h` / `6h`",
            ],
            ["Battery", "Only stations reporting 20 % or less", "`?batt=low`"],
            [
              "Heartbeat",
              "Only gateways that have gone silent",
              "`?hb=silent`",
            ],
            [
              "Selection",
              "Focus one station, ring it and centre on it",
              "`?focus=CALLSIGN`",
            ],
          ],
        },
      ],
      callout: {
        type: "tip",
        text: "The **Copy link** button next to a selected station gives you a URL that opens the map on exactly that station. It is the right thing to paste into a bug report or a chat.",
      },
    },

    {
      id: "connections",
      nav: "Connections",
      title: "Connections",
      lead: "The same links as on the map, but as numbers and history. This is where you find out whether a path is getting better or worse.",
      image: {
        name: "07b-connections-expanded",
        alt: "The connections table with one node expanded, showing its direct and indirect neighbours with signal values and small trend charts.",
        caption:
          "Expanding a station lists every neighbour it hears, with signal, sample count and a seven-day trend.",
      },
      points: [
        {
          h: "Expand a station to see its neighbours",
          p: "Green rows are direct neighbours — one radio hop. Orange rows are indirect, reached through relays, and the row names the relays it went through.",
        },
        {
          h: "The little charts are clickable",
          p: "The **Trend** column holds a sparkline: 48 points, each the average signal over one hour of the last seven days. Click it and the full history opens — signal strength and signal-to-noise over time, plus how many reports arrived in each hour. Almost nobody discovers this on their own.",
        },
        {
          h: "Quality belongs to a link, never to a station",
          p: 'There is no single "quality" number for a node. A station can have one excellent neighbour and one terrible one, and averaging those would tell you nothing. Every reading here belongs to one specific pair.',
        },
        {
          h: "Readings are one-directional",
          p: 'A measurement says "B heard A at this signal". It does not say anything about A hearing B — that is a separate measurement taken by a different radio, and the two are often not the same.',
        },
        {
          h: "Gaps in a chart are usually real",
          p: "Stations do not transmit continuously, so quiet hours leave holes. A single missing hour between two readings is bridged, because losing one report on an otherwise healthy link is normal. Longer gaps are shown as gaps, honestly.",
        },
      ],
      details: [
        {
          summary:
            '"Last Seen" means two different things — this trips everyone up',
          type: "prose",
          text: "On a station row it means: the last time **anyone at all** heard this station. On one of its neighbour rows it means: the last time a reading arrived **on that specific link**. A station can have been heard two minutes ago while one of its links has been quiet for two days. Both numbers are correct; they answer different questions.",
        },
        {
          summary: "What the columns hold",
          type: "table",
          head: ["Column", "Meaning"],
          rows: [
            ["Callsign", "The station, or one of its neighbours when expanded"],
            ["Type", "Gateway or HF-only"],
            [
              "Connections",
              "How many neighbours this station has, direct and indirect",
            ],
            [
              "Link Quality",
              "Signal-to-noise and received strength for that one link",
            ],
            [
              "Samples",
              "How many reports arrived on that link in the last seven days",
            ],
            ["Trend", "The clickable sparkline"],
            [
              "Last Seen",
              "See the box above — it depends on which row you are looking at",
            ],
          ],
        },
        {
          summary: "The station profile page",
          type: "list",
          items: [
            "Clicking a callsign anywhere opens that station’s own page.",
            "It gathers everything about one station: hardware and firmware, all its links, its recent messages, its sensor charts, its position, and — for gateways — an availability timeline showing when it was up and when it was not.",
            "Planned maintenance windows are drawn like uptime, so a scheduled outage does not read as a fault.",
          ],
        },
      ],
    },

    {
      id: "messages",
      nav: "Messages",
      title: "Messages",
      lead: "What has actually been sent across the mesh, with the reception quality of each message attached.",
      image: {
        name: "11-messages",
        alt: "The messages view, showing message text grouped by sender with signal values and filter controls.",
        caption:
          "Messages carry the signal values they were received with, and the relays they passed through.",
      },
      points: [
        {
          h: "Every message shows how it arrived",
          p: "Alongside the text you get the signal-to-noise and received strength of that reception, and, if it was relayed, the chain of stations it travelled through.",
        },
        {
          h: "Live and search are two different modes",
          p: "By default you see a live window of the last 24 hours that updates as messages come in. Choosing a longer range switches to a paged search over stored history — the view says so explicitly, so you always know which one you are in.",
        },
        {
          h: "Filter by who, via whom, and to whom",
          p: "Separate fields for sender, relay and recipient, plus a full-text search over the message bodies and a switch for relayed messages only.",
        },
        {
          h: "Emergency traffic is separated out",
          p: "Emergency messages get their own filter and their own marking, so they do not drown in ordinary traffic.",
        },
      ],
      callout: {
        type: "note",
        text: "Everything here was broadcast openly over the air. Amateur radio is not a private medium, and the map does not make it one.",
      },
    },

    {
      id: "wx",
      nav: "WX",
      title: "Weather and telemetry",
      lead: "Many stations carry sensors. This tab shows what one station has measured over time; the next one shows what all of them together say about the area.",
      image: {
        name: "12b-wx-station",
        alt: "Charts for one weather station: temperature and humidity, pressure, battery, with current values above.",
        caption:
          "One station, four time ranges, with current conditions on top and the full series below.",
      },
      points: [
        {
          h: "Four ranges, plus a free one",
          p: "24 hours, 7 days, one month, one year. The **Detail** button opens a view where you pick the start and end date yourself.",
        },
        {
          h: "Two temperatures, and they are not interchangeable",
          p: "Most boards have a sensor on the board itself, which sits inside the enclosure and reads too warm. Some also have a probe on a cable, outside. The map works out which one is genuinely outdoors from its behaviour at night, and uses that one for the area-wide temperature map.",
        },
        {
          h: "QFE is what the sensor measures, QNH is what you can compare",
          p: "QFE is the air pressure at the station’s own altitude, so a mountain station and a valley station are never comparable. QNH is that pressure reduced to sea level. The server calculates QNH itself from pressure and altitude, because the value the firmware reports is not reliable.",
        },
        {
          h: "A zero is not always a reading",
          p: "0 °C is a real temperature and is plotted. 0 % humidity and 0 % battery are not — they are what the firmware sends when there is nothing to report, and they are treated as missing rather than drawn as a crash to zero.",
        },
      ],
      details: [
        {
          summary: "Every value a station can report",
          type: "table",
          head: ["Value", "Unit", "What it is"],
          rows: [
            [
              "Temp (in)",
              "°C",
              "The sensor on the board, usually inside the enclosure",
            ],
            [
              "Temp 2 (out)",
              "°C",
              "A probe on a cable, usually genuinely outdoors",
            ],
            ["Humidity", "%", "Relative humidity"],
            ["QFE", "hPa", "Air pressure at the station’s altitude"],
            [
              "QNH",
              "hPa",
              "The same pressure reduced to sea level, so stations compare",
            ],
            [
              "Altitude",
              "m",
              "From GPS; also available smoothed with the barometer to remove jitter",
            ],
            ["Battery", "%", "Supply level, where the station reports one"],
            [
              "Gas resistance",
              "kΩ",
              "Air-quality sensor, on boards that have one",
            ],
            ["eCO2", "ppm", "Estimated CO₂, from the same sensor family"],
            ["Water level", "—", "For stations monitoring a gauge"],
            ["Water temperature", "°C", "Same"],
            [
              "Custom channels",
              "varies",
              "Freely defined measurements a station sends with its own name and unit",
            ],
          ],
        },
        {
          summary: "The traffic light on a weather station",
          type: "prose",
          text: "Each station is judged on whether its readings can be trusted for the area-wide map. **Green** means it feeds in. **Yellow** means it is being watched but still counts. **Grey** means there is not enough to judge yet — either no sensor, or less than two days of data. **Red** means it is currently excluded. A station has to misbehave persistently over roughly two days to turn red, and to behave for roughly two days to come back — so it does not flicker every time the weather changes.",
        },
        {
          summary: "What gets a station flagged",
          type: "table",
          head: ["Finding", "What it usually means"],
          rows: [
            [
              "Pressure off by more than 4 hPa",
              "The configured altitude is wrong — set it by hand instead of taking it from GPS",
            ],
            [
              "Temperature off by more than 7 °C",
              "Sensor placement, or a failing sensor",
            ],
            ["Barely any day-night swing", "The sensor is indoors or shielded"],
            [
              "A constant, unchanging value",
              "The sensor is stuck and probably needs a restart",
            ],
            [
              "Altitude jumping around",
              "GPS jitter — configure a fixed altitude",
            ],
            [
              "Too warm at night",
              "The enclosure holds heat, or the board warms its own sensor",
            ],
          ],
        },
      ],
      callout: {
        type: "tip",
        text: "If your own station shows red, the flag names the cause. Most of them are a configuration or placement issue, not a broken sensor.",
      },
    },

    {
      id: "wxmap",
      nav: "WX Map",
      title: "Area maps — and the RF weather",
      lead: "Three overlays computed from all stations at once: temperature, air pressure, and how well the network is actually hearing.",
      image: {
        name: "16-wxmap-coverage",
        alt: "The coverage overlay: a colour field across Central Europe from dark purple through green to yellow, with a legend explaining the decibel scale.",
        caption:
          "RF coverage — the median received signal at the stations that are listening.",
      },
      points: [
        {
          h: 'RF coverage is the "HF weather"',
          p: "This overlay colours the area by the **median received signal strength** measured at the receiving stations. Bright means signals are arriving strongly there; dark means they arrive weakly. It is the closest thing the map has to a picture of current radio conditions, and it is computed from real receptions, not from a propagation model.",
        },
        {
          h: "Blank means nobody was listening",
          p: "This is the single most important thing to understand about the coverage overlay. An empty patch does **not** mean bad reception — it means there was no receiver in range to measure anything. Absence of evidence, not evidence of absence.",
        },
        {
          h: "Two windows",
          p: "The last 24 hours, or the last 7 days. The shorter window shows current conditions; the longer one smooths out a quiet night or a station that happened to be off.",
        },
        {
          h: "Temperature across the area",
          p: "The temperature overlay interpolates between stations rather than colouring dots. Where no station is near, the colour fades out instead of inventing a value.",
        },
        {
          h: "Air pressure with isobars",
          p: "The pressure overlay draws contour lines of equal pressure, the way a weather chart does. It uses the sea-level pressure the server computed, and corrects for a network-wide bias so a fleet of slightly-off sensors does not shift the whole picture.",
        },
        {
          h: "Read a value where you are pointing",
          p: "Hovering gives you the value under the cursor. On a touch screen the **Read value at map center** button pins the value instead. The station list shows the real measurements rather than the interpolated field.",
        },
      ],
      details: [
        {
          summary: "The coverage colour scale",
          type: "table",
          head: ["Colour", "Received signal", "Reading"],
          rows: [
            ["Yellow", "around −90 dBm", "Strong — comfortable margin"],
            ["Green", "around −105 dBm", "Solid"],
            ["Blue-green", "around −115 dBm", "Workable"],
            ["Dark purple", "around −130 dBm", "At the noise floor"],
            ["Blank", "no data", "No receiver in range — not a weak signal"],
          ],
        },
        {
          summary: "Honest limits of the weather overlays",
          type: "list",
          items: [
            "Readings are smoothed over the last hour, so the picture lags behind a fast-moving front.",
            "Unventilated sensors in the sun read several degrees too warm on a clear afternoon. This is a known property of the hardware, not a bug in the map.",
            "The temperature field is not corrected for altitude — a mountain station reads what a mountain station reads.",
            "The interpolation fades out with distance from the nearest station, on purpose. Where you see nothing, there was nothing to go on.",
            "Coverage needs at least four receivers in range before it will draw anything at all.",
          ],
        },
      ],
      callout: {
        type: "warn",
        text: "Coverage shows where receivers **are**, as much as how well they hear. A dark or blank region is often a region with no stations in it — read it together with the node map.",
      },
    },

    {
      id: "admin",
      nav: "Admin",
      title: "Admin — the numbers, and what time they cover",
      lead: "Health of the feed and the fleet. Every number here is honest, but almost every one covers a different span of time, and reading two of them as if they covered the same span is the usual mistake.",
      image: {
        name: "17-admin",
        alt: "The admin page with feed status, fleet counts and activity charts.",
        caption:
          "Feed status on top, fleet counts below, then hardware, battery health and raw feed inspection.",
      },
      points: [
        {
          h: "Read the time window before the number",
          p: 'Several tiles carry their window in the label, and they mean it. "Active links (3 h)" is not "all links ever" — a link that has not been heard for three hours is simply gone from that count.',
        },
        {
          h: "The feed status is the first thing to check",
          p: "It shows whether the upstream connection is alive, how many frames per hour of each kind are arriving, and an availability bar for the observed period. If this is unhappy, everything below it is stale.",
        },
        {
          h: "Some counters restart with the server",
          p: 'Frames-per-hour and the hub-reset counter are counted since the server last started. A low number right after a restart means "just started counting", not "nothing is happening".',
        },
        {
          h: "Battery health is not battery level",
          p: "That card lists stations whose battery **reporting** looks unreliable — values jumping around, or appearing and disappearing. A station with a genuinely low but steady battery is not listed here.",
        },
        {
          h: "Raw feed, if you want to see the actual frames",
          p: "Four tables show unprocessed data: nodes, links, incoming beacons, and positions that failed validation. They can be sorted and exported as CSV.",
        },
      ],
      details: [
        {
          summary: "Which number covers which span — the whole table",
          type: "table",
          head: ["Group", "Examples", "Time span"],
          rows: [
            [
              "Live",
              "Feed status, node and gateway counts, raw tables, activity charts",
              "Right now, refreshed every few seconds",
            ],
            [
              "Rolling window",
              "Active links (3 h), messages (24 h), relay leaderboard (24 h / 7 d)",
              "Only what falls inside the stated window",
            ],
            [
              "Since the server started",
              "Frames per hour, hub resets",
              "Resets to zero on restart",
            ],
            [
              "Current fleet state",
              "Hardware mix, firmware currency, low-battery list",
              "Only stations heard in the last 3 hours",
            ],
          ],
        },
        {
          summary: "The fleet tiles, one by one",
          type: "table",
          head: ["Tile", "What it counts"],
          rows: [
            [
              "Total nodes (3 h)",
              "Every station heard in the last three hours",
            ],
            ["Gateways", "Of those, the ones with an internet connection"],
            ["HF-only", "Of those, the ones reachable only over the air"],
            ["With position", "Stations that reported a plausible position"],
            [
              "Without position",
              "Heard, but with no usable position — they exist, they are just not on the map",
            ],
            [
              "Active links (3 h)",
              "Links with a measurement inside that window",
            ],
            ["Messages (24 h)", "Ordinary messages in the last day"],
            ["Emergency (24 h)", "Emergency traffic in the last day"],
          ],
        },
        {
          summary:
            "Why a station can be missing from the map but present in the counts",
          type: "prose",
          text: 'Positions are validated on arrival. A position that is physically implausible is not silently corrected and not silently dropped — the station is kept without a position, and the rejected coordinate is listed under "Position suspects". So the station is counted, findable and searchable; it simply has no dot. This is deliberate: a wrong dot is worse than no dot.',
        },
      ],
      callout: {
        type: "note",
        text: "The whole Admin page is public. There is nothing hidden behind a login, and nothing is blanked out for visitors.",
      },
    },

    {
      id: "tech",
      nav: "Behind it",
      title: "How it is built",
      lead: "For anyone curious about the machinery, or thinking about building something similar.",
      image: {
        name: "20-admin-raw",
        alt: "The raw data tables on the admin page, showing incoming frames with timestamps and signal values.",
        caption:
          "The raw feed tables — the data as it arrives, before any of the processing above.",
      },
      points: [
        {
          h: "Server: Node.js",
          p: "A Node.js server built on Fastify does all the work: it ingests the feeds, validates and merges them, computes link quality, weather fields and coverage, and stores everything in SQLite. The browser only draws — every transformation happens server-side, so all clients see exactly the same numbers.",
        },
        {
          h: "Frontend: Vue 3",
          p: "Vue 3 in strict TypeScript, with Pinia for state, MapLibre GL for the maps, Chart.js for the charts and Tailwind for styling. Around 83 components, translated into eight languages.",
        },
        {
          h: "Live data over a WebSocket",
          p: "On connecting you get one complete snapshot, and after that only what changed, about every two seconds, encoded as Protocol Buffers. Sending only the differences is what makes a permanently open map cheap enough to leave running. If the WebSocket is unavailable it falls back to polling every 15 seconds.",
        },
        {
          h: "Three sources, one picture",
          p: "The main source is a UDP feed from the MeshCom infrastructure, which carries positions, messages and reception reports. A second, older source is still scraped for private one-to-one messages. A third has been retired. Where sources disagree, the merge rules are explicit rather than last-one-wins.",
        },
        {
          h: "Nothing fails silently",
          p: "Every error that changes behaviour leaves a record. Rejected positions, rejected sensor readings and protocol violations all get written down with the evidence, which is why the map can tell you *why* something is missing.",
        },
        {
          h: "Machine-readable too",
          p: "The same API is exposed over the Model Context Protocol with 25 tools, so a language model can answer questions about the network directly instead of scraping the page.",
        },
      ],
      details: [
        {
          summary: "Size of the thing",
          type: "table",
          head: ["", "Count"],
          rows: [
            ["Server code", "~62,700 lines"],
            ["Frontend code", "~40,200 lines"],
            ["Vue components", "83"],
            ["Test files", "298"],
            ["UI languages", "8"],
            ["MCP tools", "25"],
          ],
        },
      ],
    },

    {
      id: "help",
      nav: "Feedback",
      title: "Found something wrong?",
      lead: "The map is written by one person, so a second pair of eyes genuinely helps. Reports are welcome, and the tracker is public.",
      points: [
        {
          h: "What helps most in a report",
          p: "The callsigns involved, which tab, what you saw against what you expected, roughly when it happened with the timezone, and a link — `?focus=CALLSIGN` opens the map on exactly that station.",
        },
        {
          h: "What belongs somewhere else",
          p: "Firmware problems belong to the MeshCom project. Questions about running gateways belong to the MeshCom operators. And a station cannot be removed from the map here — the map only mirrors what the mesh broadcasts openly, so that has to be changed at the source.",
        },
      ],
      callout: {
        type: "tip",
        text: "Not sure whether something is a bug or just a part of the map you are reading wrong? Ask anyway. If the map was unclear enough to confuse you, that is worth knowing.",
      },
    },
  ],

  glossary: [
    { term: "Node", def: "One station in the mesh — a radio with a callsign." },
    {
      term: "Gateway",
      def: "A station that is also connected to the internet and passes traffic on. Everything the wider network sees comes in through one of these.",
    },
    {
      term: "HF-only",
      def: "A station reachable only over the air, with no internet connection of its own.",
    },
    {
      term: "HEY",
      def: "The beacon a station sends to announce itself. Every station that relays it adds its own measurement of how well it received it. This is where nearly all the link data on this map comes from.",
    },
    {
      term: "PATH",
      def: "A stored reception: who was heard, by whom, over which relays, at what signal. A HEY beacon in flight becomes one or more PATH records once it is received and recorded.",
    },
    {
      term: "Hop",
      def: "One relay step. A direct reception is zero hops; each further relay adds one.",
    },
    {
      term: "SNR",
      def: "Signal-to-noise ratio in dB — how far the signal stands above the noise. The main measure of link quality here. Higher is better; LoRa still decodes well below zero.",
    },
    {
      term: "RSSI",
      def: "Received signal strength in dBm — how much energy arrived. Always negative; closer to zero is stronger. It says how loud, while SNR says how clear.",
    },
    {
      term: "QFE",
      def: "Air pressure measured at the station’s own altitude.",
    },
    {
      term: "QNH",
      def: "The same pressure reduced to sea level, so stations at different altitudes can be compared. This is the value weather charts use.",
    },
    {
      term: "Sparkline",
      def: "The small chart in the Trend column. Click it for the full history.",
    },
    {
      term: "Heartbeat",
      def: "A gateway’s sign of life over its internet connection. Separate from whether it has been heard on the air — a gateway can be alive online while its radio is quiet, and the map keeps the two apart.",
    },
    {
      term: "Coverage",
      def: "The median received signal across an area, computed from actual receptions. Blank areas mean nobody was listening there.",
    },
    {
      term: "NBCNT",
      def: "The number of direct neighbours a station reports having heard in the last hour, by its own count.",
    },
    {
      term: "APRS symbol",
      def: "The standard icon set used across amateur radio to say what kind of station something is.",
    },
  ],

  footer: {
    text: "The map is developed by Martin, DK5EN, in cooperation with ÖVSV, who provide the server it runs on. The data comes from the MeshCom project and is kindly made available by Kurt, OE1KBC. Everything shown here is broadcast openly over the air by the stations themselves.",
    links: [
      { label: "Live map", href: "https://meshmap.oevsv.at" },
      {
        label: "Report a problem",
        href: "https://github.com/DK5EN/map/issues",
      },
      { label: "MeshCom", href: "https://icssw.org/meshcom/" },
    ],
  },
};
