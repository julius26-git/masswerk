import { absatz } from "./portable";
import type {
  Arbeitsschritt,
  Branche,
  Frage,
  Grundeinstellungen,
  Kontaktseite,
  Leistung,
  Leistungsseite,
  Referenz,
  Referenzseite,
  Startseite,
  Stimme,
  UeberSeite,
} from "./typen";

/* ==================================================================
   Standardinhalt.
   Jedes Feld hier ist ein fertiger, veröffentlichungsfähiger Text.
   Sobald dasselbe Feld in Sanity gefüllt ist, gewinnt Sanity.
   Die mit ANPASSEN markierten Werte sind Platzhalter.
   ================================================================== */

export const standardGrundeinstellungen: Grundeinstellungen = {
  name: "Maßwerk",
  claim: "Websites nach Maß für lokale Betriebe",
  verfuegbarkeit: "Zwei Projektplätze im laufenden Quartal frei",
  laufband: [
    "Ladezeit unter einer Sekunde",
    "Bewerbung in 60 Sekunden",
    "Kein Cookie-Banner",
    "Festpreis vor Projektstart",
    "Ein Ansprechpartner",
    "DSGVO-konform gebaut",
  ],
  telefon: "+49 151 00000000", // ANPASSEN
  email: "hallo@masswerk.de", // ANPASSEN
  erreichbarkeit: "Montag bis Freitag, 8 bis 18 Uhr",
  antwortzeit: "Ich melde mich innerhalb von 24 Stunden telefonisch bei Ihnen.",
  inhaber: "Julius Dörmann", // ANPASSEN
  strasse: "Musterstraße 1", // ANPASSEN
  plz: "42551", // ANPASSEN
  ort: "Velbert", // ANPASSEN
  land: "Deutschland",
  umsatzsteuerId: null, // ANPASSEN
  kleinunternehmer: true, // ANPASSEN
  seo: {
    titel: "Maßwerk — Websites nach Maß für lokale Betriebe",
    beschreibung:
      "Websites für Handwerk, Werkstatt, Praxis und Laden: schnell, ohne Cookie-Banner, mit einem Bewerbungsformular, das in 60 Sekunden ausgefüllt ist. Zum Festpreis.",
    bild: null,
    vonSucheAusschliessen: false,
  },
};

export const standardStartseite: Startseite = {
  kennzeichnung: "Webdesign für Handwerk und lokale Betriebe",
  ueberschrift: "Aufträge gewinnen. Mitarbeiter finden. Mit einer Website, die beides kann.",
  hervorhebung: "Mitarbeiter finden.",
  einleitung:
    "Ich baue Websites für Betriebe, die von ihrer Region leben. Schnell genug, dass niemand vorher abspringt. Einfach genug, dass sich ein Geselle in der Mittagspause vom Handy aus bewirbt. Und zum Festpreis, der vor dem ersten Handschlag feststeht.",
  hauptaktion: { beschriftung: "Website-Check anfordern", ziel: "/kontakt" },
  nebenaktion: { beschriftung: "Leistungen ansehen", ziel: "/leistungen" },
  kennzahlen: [
    {
      _key: "k1",
      wert: "< 1 s",
      label: "Ladezeit",
      erlaeuterung: "Auch mit einem Balken Empfang auf der Baustelle.",
    },
    {
      _key: "k2",
      wert: "60 Sek.",
      label: "Bewerbung",
      erlaeuterung: "Ohne Lebenslauf, ohne Anschreiben, ohne Drucker.",
    },
    {
      _key: "k3",
      wert: "0",
      label: "Cookie-Banner",
      erlaeuterung: "Kein Tracking, also auch keine Einwilligung nötig.",
    },
  ],
  ausgangslage: {
    kennzeichnung: "Ausgangslage",
    titel: "Was ich auf den meisten Betriebswebsites finde",
    text: "Kein Vorwurf, sondern eine Bestandsaufnahme. Die Seite wurde vor Jahren gebaut, danach hatte niemand Zeit. Das kennt fast jeder Betrieb.",
  },
  maengel: [
    "Auf dem Handy muss man zoomen, um die Telefonnummer zu treffen.",
    "Bis das erste Bild da ist, vergehen acht Sekunden.",
    "Bewerbungen gehen nur per E-Mail, mit vollständigen Unterlagen.",
    "Der letzte Eintrag unter „Aktuelles“ ist von 2019.",
    "Bei Google steht der Wettbewerber zwei Straßen weiter oben.",
    "Niemand weiß mehr, wer das Passwort zum Bearbeiten hat.",
  ],
  loesung: {
    kennzeichnung: "Lösung",
    titel: "Drei Dinge, die den Unterschied machen",
    text: "Dahinter steckt moderne Webtechnik. Was Sie davon merken, ist das hier.",
  },
  vorteile: [
    {
      _key: "v1",
      titel: "Google mag schnelle Seiten",
      text: "Ihre Seite wird als fertige Datei ausgeliefert und nicht bei jedem Aufruf neu zusammengebaut. Das zählt bei Google als Rankingfaktor — und Ihre Besucher merken es auch.",
    },
    {
      _key: "v2",
      titel: "Erreichbar, wenn es zählt",
      text: "Ausgeliefert über ein weltweites Rechnernetz statt über einen einzelnen Server. Kein Wartungsfenster, keine überlastete Datenbank, kein weißer Bildschirm am Montagmorgen.",
    },
    {
      _key: "v3",
      titel: "Bewerben dauert eine Minute",
      text: "Name, Telefonnummer, was man kann. Mehr fragt das Formular nicht. Wer wechseln will, tut das in der Pause — nicht abends am Drucker.",
    },
  ],
  branchenKopf: {
    kennzeichnung: "Branchen",
    titel: "Für wen ich baue",
    text: "Die Probleme ähneln sich mehr, als man denkt: lokal gefunden werden, Leute finden, keine Zeit für Technik haben. Nur der Ton ist ein anderer.",
  },
  leistungenKopf: {
    kennzeichnung: "Leistungen",
    titel: "Was dazugehört",
    text: "Vier Bausteine. Einzeln möglich, zusammen sinnvoll.",
  },
  ablaufKopf: {
    kennzeichnung: "Ablauf",
    titel: "Vom Anruf bis zur fertigen Seite",
    text: "Vier Schritte. Ihr Aufwand dabei: rund drei Stunden, verteilt über die gesamte Zeit.",
  },
  referenzenKopf: {
    kennzeichnung: "Referenzen",
    titel: "Gebaute Seiten",
    text: "Zwei Prototypen zeigen, wie ich arbeite. Sobald die ersten Kundenprojekte online sind, stehen sie hier.",
  },
  medienKopf: {
    kennzeichnung: "Bild & Film",
    titel: "Eigene Bilder statt Bildagentur",
    text: "In Vorbereitung: Fotos und kurze Filme von Ihrem Betrieb, aufgenommen und geschnitten passend zur Website.",
  },
  medienAnzeigen: false,
  schlussKopf: {
    kennzeichnung: "Nächster Schritt",
    titel: "Ich sehe mir Ihre Seite an. Kostenlos.",
    text: "Sie bekommen eine ehrliche Einschätzung als kurzes Video: was funktioniert, was Sie Kunden kostet und was ich anders machen würde. Ohne Verpflichtung und ohne Vertreterbesuch.",
  },
  schlussAktion: { beschriftung: "Website-Check anfordern", ziel: "/kontakt" },
  seo: {
    titel: "Maßwerk — Websites nach Maß für lokale Betriebe",
    beschreibung:
      "Schnelle Websites für Handwerk, Werkstatt, Praxis und Laden. Mit Bewerbungsformular für die Mitarbeitersuche, ohne Cookie-Banner, zum Festpreis.",
    bild: null,
    vonSucheAusschliessen: false,
  },
};

export const standardBranchen: Branche[] = [
  {
    _id: "branche-handwerk",
    titel: "Handwerk & Bau",
    slug: "handwerk-bau",
    beispiele: ["Elektrik", "Sanitär & Heizung", "Dachdeckerei", "Zimmerei"],
    beduerfnis: "Gesellen erreichen, die sich sonst nirgends bewerben würden.",
    material: "beton",
  },
  {
    _id: "branche-werkstatt",
    titel: "Werkstatt & Dienstleistung",
    slug: "werkstatt-dienstleistung",
    beispiele: ["KFZ-Werkstatt", "Fahrschule", "Garten- und Landschaftsbau"],
    beduerfnis: "Bei der Suche nach der Leistung ganz oben stehen.",
    material: "stahl",
  },
  {
    _id: "branche-praxis",
    titel: "Praxis & Gesundheit",
    slug: "praxis-gesundheit",
    beispiele: ["Physiotherapie", "Zahnarztpraxis", "Pflegedienst"],
    beduerfnis: "Termine vergeben, ohne dass das Telefon durchklingelt.",
    material: "daemmung",
  },
  {
    _id: "branche-laden",
    titel: "Laden & Gastronomie",
    slug: "laden-gastronomie",
    beispiele: ["Restaurant", "Bäckerei", "Hofladen"],
    beduerfnis: "Karte und Öffnungszeiten aktuell halten, in zwei Minuten.",
    material: "holz",
  },
];

export const standardLeistungen: Leistung[] = [
  {
    _id: "leistung-neubau",
    titel: "Website-Neubau",
    slug: "website-neubau",
    bereich: "website",
    versprechen: "Eine Seite, die auf dem Handy so gut aussieht wie im Büro.",
    teaser:
      "Aufbau, Struktur, Texte und Technik als ein Paket zum Festpreis. Sie liefern Wissen und Bilder, ich mache daraus eine Seite, die Ihre Arbeit richtig zeigt.",
    umfang: [
      "Aufbau und Gestaltung, zuerst fürs Smartphone gedacht",
      "Texte gemeinsam geschärft, kein Blabla",
      "Rechtssichere Pflichtseiten inklusive",
      "Eintragung bei Google, damit die Seite gefunden wird",
      "Übergabe mit Einweisung, danach können Sie selbst ändern",
    ],
    beschreibung: null,
  },
  {
    _id: "leistung-funnel",
    titel: "Mitarbeiter-Funnel",
    slug: "mitarbeiter-funnel",
    bereich: "website",
    versprechen: "Bewerbungen kommen von der Baustelle statt gar nicht.",
    teaser:
      "Eine eigene Seite für offene Stellen und ein Formular, das drei Fragen stellt. Wer sich bewirbt, braucht kein Anschreiben und keinen Lebenslauf — nur ein Handy und eine Minute.",
    umfang: [
      "Stellenseite je Position, in Ihrer Sprache geschrieben",
      "Kurzbewerbung: Name, Telefon, was man kann",
      "Rückruf-Wunsch statt E-Mail-Pingpong",
      "Benachrichtigung aufs Handy, sobald jemand abschickt",
      "Ehrliche Einblicke: Team, Fuhrpark, Baustelle",
    ],
    beschreibung: null,
  },
  {
    _id: "leistung-seo",
    titel: "Local SEO & Google-Profil",
    slug: "local-seo",
    bereich: "sichtbarkeit",
    versprechen: "Bei „… in meiner Nähe“ stehen Sie oben, nicht auf Seite zwei.",
    teaser:
      "Ihr Google-Unternehmensprofil wird eingerichtet und geschärft, die Seite auf die Suchbegriffe ausgerichtet, mit denen Kunden tatsächlich suchen — nicht auf die, die intern schön klingen.",
    umfang: [
      "Google-Unternehmensprofil einrichten und pflegen",
      "Eine Seite je Leistung statt einer Sammelseite",
      "Sauberer Datensatz für Adresse, Zeiten und Leistungen",
      "Bewertungen anfragen, ohne aufdringlich zu sein",
    ],
    beschreibung: null,
  },
  {
    _id: "leistung-wartung",
    titel: "Wartung & Betreuung",
    slug: "wartung-betreuung",
    bereich: "betreuung",
    versprechen: "Sie rufen an, ich kümmere mich. Keine Ticketnummer.",
    teaser:
      "Technik, Updates, Sicherung und kleine Änderungen laufen über mich. Sie merken davon nichts — außer daran, dass die Seite läuft.",
    umfang: [
      "Technik und Sicherheitsupdates laufend",
      "Tägliche Sicherung, Wiederherstellung auf Zuruf",
      "Kleine Textänderungen ohne Zusatzrechnung",
      "Einmal im Jahr ein Blick auf Zahlen und Sichtbarkeit",
    ],
    beschreibung: null,
  },
  {
    _id: "leistung-medien",
    titel: "Fotos & Film",
    slug: "fotos-film",
    bereich: "medien",
    versprechen: "Ihr Betrieb, Ihre Leute — statt gekaufter Stockfotos.",
    teaser:
      "Ein Vor-Ort-Termin, aus dem Bilder und kurze Filme für Website, Google-Profil und Stellenanzeigen entstehen. Passend zur Seite gestaltet, nicht danebengelegt.",
    umfang: [
      "Halber Tag vor Ort auf Baustelle, in Werkstatt oder Praxis",
      "Bilder von Team, Arbeit und Fuhrpark",
      "Kurze Filme für Stellenanzeigen und Social Media",
      "Zuschnitt und Optimierung für die Website inklusive",
    ],
    beschreibung: null,
  },
];

export const standardArbeitsschritte: Arbeitsschritt[] = [
  {
    _id: "schritt-1",
    titel: "Erstgespräch",
    text: "Sie erzählen, was der Betrieb macht und woran es hakt. Ich sage Ihnen ehrlich, ob ich der Richtige dafür bin.",
    dauer: "20 Minuten",
    aufwandKunde: "Ein Telefonat",
  },
  {
    _id: "schritt-2",
    titel: "Angebot zum Festpreis",
    text: "Sie bekommen eine Aufstellung mit Umfang, Preis und Termin. Was darin steht, gilt. Nachträge gibt es nur, wenn Sie etwas dazubestellen.",
    dauer: "2 Werktage",
    aufwandKunde: "Einmal lesen",
  },
  {
    _id: "schritt-3",
    titel: "Bauphase",
    text: "Ich baue, Sie sehen ab dem ersten Tag eine Vorschau im Netz. Dazwischen zwei Abstimmungen — mehr brauche ich nicht von Ihnen.",
    dauer: "3 bis 5 Wochen",
    aufwandKunde: "Zwei Termine",
  },
  {
    _id: "schritt-4",
    titel: "Übergabe",
    text: "Die Seite geht online, Sie bekommen alle Zugänge und eine Einweisung. Danach ändern Sie Texte und Bilder selbst — oder Sie rufen an.",
    dauer: "1 Stunde",
    aufwandKunde: "Eine Einweisung",
  },
];

export const standardReferenzen: Referenz[] = [
  {
    _id: "referenz-zimmerei",
    titel: "Zimmerei Berg",
    slug: "zimmerei-berg",
    status: "platzhalter",
    jahr: null,
    auftrag:
      "Gesellen und Auszubildende gewinnen, ohne für Stellenportale zu zahlen.",
    adresse: null,
    branche: { titel: "Handwerk & Bau", material: "holz" },
    ergebnisse: [],
    bildNachher: null,
    bildVorher: null,
  },
  {
    _id: "referenz-werkstatt",
    titel: "KFZ-Meisterbetrieb Nord",
    slug: "kfz-meisterbetrieb-nord",
    status: "platzhalter",
    jahr: null,
    auftrag:
      "Termine für Reifenwechsel online annehmen, statt sie am Telefon zu sortieren.",
    adresse: null,
    branche: { titel: "Werkstatt & Dienstleistung", material: "stahl" },
    ergebnisse: [],
    bildNachher: null,
    bildVorher: null,
  },
];

export const standardStimmen: Stimme[] = [];

export const standardFragen: Frage[] = [
  {
    _id: "frage-preis",
    frage: "Was kostet eine Website bei Ihnen?",
    antwort: [
      absatz(
        "Eine vollständige Website mit fünf bis acht Seiten liegt zwischen 2.500 und 5.500 Euro. Kommt der Mitarbeiter-Funnel dazu, sind es 800 bis 1.500 Euro mehr. Die Betreuung kostet 45 bis 90 Euro im Monat.",
      ),
      absatz(
        "Was Ihr Projekt kostet, steht nach dem Erstgespräch im Angebot — vorher würde ich raten, und das hilft niemandem.",
      ),
    ],
  },
  {
    _id: "frage-dauer",
    frage: "Wie lange dauert das?",
    antwort: [
      absatz(
        "Drei bis fünf Wochen ab dem Tag, an dem Texte und Bilder da sind. Das ist meist der Punkt, an dem es hakt — deshalb helfe ich beim Schreiben.",
      ),
    ],
  },
  {
    _id: "frage-fotos",
    frage: "Ich habe keine guten Fotos. Ist das ein Problem?",
    antwort: [
      absatz(
        "Nein. Für den Anfang reichen ehrliche Handybilder von Baustelle, Werkstatt oder Team — die wirken oft besser als gekaufte Stockfotos mit lachenden Models im weißen Hemd.",
      ),
      absatz(
        "Wenn es richtig gut werden soll, komme ich für einen halben Tag vorbei und fotografiere selbst.",
      ),
    ],
  },
  {
    _id: "frage-selbst-aendern",
    frage: "Kann ich die Seite später selbst ändern?",
    antwort: [
      absatz(
        "Ja. Texte, Bilder, Öffnungszeiten und Stellenanzeigen pflegen Sie über eine einfache Oberfläche — das funktioniert auch vom Handy und sieht nicht aus wie ein Steuerprogramm.",
      ),
      absatz("Wenn Sie keine Lust darauf haben, mache ich es. Anrufen genügt."),
    ],
  },
  {
    _id: "frage-umzug",
    frage: "Was passiert mit meiner alten Seite und meinen E-Mail-Adressen?",
    antwort: [
      absatz(
        "Die alte Seite bleibt online, bis die neue fertig ist. Der Umzug passiert an einem Abend. Ihre E-Mail-Adressen laufen weiter — daran rühre ich nur, wenn Sie es ausdrücklich möchten.",
      ),
      absatz(
        "Alte Adressen werden auf die neuen Seiten umgeleitet, damit Google-Treffer und alte Verlinkungen nicht ins Leere laufen.",
      ),
    ],
  },
  {
    _id: "frage-cookies",
    frage: "Warum hat Ihre Seite kein Cookie-Banner?",
    antwort: [
      absatz(
        "Weil ich nichts speichere, wofür ich Sie um Erlaubnis fragen müsste. Keine Analysedienste, keine Werbenetzwerke, keine Schriften von fremden Servern.",
      ),
      absatz(
        "Ein Banner ist keine Pflicht, sondern die Folge davon, dass eine Seite Daten weitergibt. Lässt man das weg, entfällt auch das Banner — und niemand muss beim ersten Besuch etwas wegklicken.",
      ),
    ],
  },
];

export const standardLeistungsseite: Leistungsseite = {
  kopf: {
    kennzeichnung: "Leistungen",
    titel: "Vier Bausteine, ein Ergebnis",
    text: "Eine Website ist kein Selbstzweck. Sie soll Anfragen bringen, Bewerbungen bringen und in Ruhe laufen. Danach sind diese Leistungen geschnitten.",
  },
  preishinweis:
    "Zu Preisen: Eine vollständige Website liegt bei 2.500 bis 5.500 Euro, die laufende Betreuung bei 45 bis 90 Euro im Monat. Der genaue Preis steht nach dem Erstgespräch im Angebot und ändert sich danach nicht mehr.",
  ablaufKopf: {
    kennzeichnung: "Ablauf",
    titel: "So läuft die Zusammenarbeit",
    text: "Damit Sie wissen, worauf Sie sich einlassen — und wie wenig Zeit es Sie kostet.",
  },
  fragenKopf: {
    kennzeichnung: "Häufige Fragen",
    titel: "Was vor dem ersten Anruf oft gefragt wird",
    text: null,
  },
  seo: {
    titel: "Leistungen",
    beschreibung:
      "Website-Neubau, Mitarbeiter-Funnel, Local SEO und laufende Betreuung — vier Bausteine für lokale Betriebe, zum Festpreis.",
    bild: null,
    vonSucheAusschliessen: false,
  },
};

export const standardReferenzseite: Referenzseite = {
  kopf: {
    kennzeichnung: "Referenzen",
    titel: "Gebaute Seiten",
    text: "Was ich zeige, zeige ich vollständig: Auftrag, Umsetzung und — sobald sie vorliegen — echte Zahlen.",
  },
  platzhalterHinweis:
    "Diese Projekte sind Prototypen, keine Kundenprojekte. Sie zeigen Aufbau, Tempo und Bedienung an einem erfundenen Betrieb. Erfundene Erfolgszahlen finden Sie hier nicht — die stehen erst dann hier, wenn sie echt sind.",
  seo: {
    titel: "Referenzen",
    beschreibung:
      "Prototypen und Kundenprojekte von Maßwerk: Aufbau, Tempo und Bedienung zum Anschauen.",
    bild: null,
    vonSucheAusschliessen: false,
  },
};

export const standardUeberSeite: UeberSeite = {
  kopf: {
    kennzeichnung: "Über mich",
    titel: "Ich baue keine Websites für Konzerne.",
    text: "Mein Herz hängt am lokalen Mittelstand: am inhabergeführten Handwerksbetrieb, an der Werkstatt an der Ecke, an der Praxis um die Kurve.",
  },
  portrait: null,
  text: [
    absatz(
      "Ich bin Julius, ich baue Websites, und ich habe eine Schwäche für Betriebe, in denen am Ende des Tages etwas fertig ist, das man anfassen kann.",
    ),
    absatz(
      "Was mich an dieser Arbeit stört: Handwerksbetriebe liefern jeden Tag saubere, ehrliche Arbeit ab — und ihre Website sieht aus, als wäre sie nebenbei entstanden. Umgekehrt gibt es Betriebe, deren Website glänzt, während die Arbeit dahinter nichts taugt. Der zweite Fall ist ein Marketingproblem. Der erste ist ein Ärgernis, und den kann ich beheben.",
    ),
    absatz(
      "Deshalb arbeite ich so, wie ein guter Handwerker arbeitet: Ich sage vorher, was es kostet. Ich halte Termine. Ich erkläre, was ich tue, ohne mich hinter Fachbegriffen zu verstecken. Und wenn etwas nicht funktioniert, hören Sie das von mir, bevor Sie fragen müssen.",
    ),
    absatz(
      "Technisch setze ich auf einen Aufbau, der Ihre Seite als fertige Datei ausliefert, statt sie bei jedem Aufruf neu zusammenzubauen. Das macht sie schnell und schwer angreifbar. Sie merken davon vor allem eines: Es ruckelt nicht, und es fällt nicht aus.",
    ),
  ],
  grundsaetze: [
    {
      _key: "g1",
      titel: "Festpreis",
      text: "Der Preis steht vor dem ersten Handschlag. Was im Angebot steht, gilt. Nachträge nur, wenn Sie etwas dazubestellen.",
    },
    {
      _key: "g2",
      titel: "Ein Ansprechpartner",
      text: "Sie reden mit mir, nicht mit einem Kundenkonto. Meine Nummer steht auf dieser Seite und nicht versteckt im Impressum.",
    },
    {
      _key: "g3",
      titel: "Termine sind Termine",
      text: "Ein zugesagter Termin wird gehalten. Wenn wirklich etwas dazwischenkommt, erfahren Sie es von mir, bevor Sie nachfragen müssen.",
    },
    {
      _key: "g4",
      titel: "Kein Fachchinesisch",
      text: "Ich erkläre, was ich baue, in Sätzen, die man ohne Informatikstudium versteht. Fragen sind ausdrücklich erwünscht.",
    },
  ],
  seo: {
    titel: "Über mich",
    beschreibung:
      "Warum ich Websites für Handwerk und lokale Betriebe baue — und wie ich dabei arbeite: Festpreis, feste Termine, ein Ansprechpartner.",
    bild: null,
    vonSucheAusschliessen: false,
  },
};

export const standardKontaktseite: Kontaktseite = {
  kopf: {
    kennzeichnung: "Kontakt",
    titel: "Am liebsten am Telefon.",
    text: "Handwerker rufen an. Deshalb steht meine Nummer hier oben und nicht klein im Impressum.",
  },
  formularHinweis:
    "Wenn Ihnen Schreiben lieber ist: vier Felder, mehr brauche ich nicht.",
  ablauf: [
    "Ich melde mich innerhalb von 24 Stunden — werktags meist deutlich schneller.",
    "Wir telefonieren rund 20 Minuten. Sie erzählen, ich höre zu und frage nach.",
    "Sie bekommen eine ehrliche Einschätzung. Auch dann, wenn sie lautet: Lassen Sie es.",
  ],
  seo: {
    titel: "Kontakt",
    beschreibung:
      "Kostenloser Website-Check und Erstgespräch. Rückmeldung innerhalb von 24 Stunden, telefonisch oder per Formular.",
    bild: null,
    vonSucheAusschliessen: false,
  },
};
