import { absatz, liste, ueberschrift } from "./portable";
import type { Grundeinstellungen, Rechtstext } from "./typen";

/**
 * Entwürfe für die Pflichtseiten, gespeist aus den Grundeinstellungen.
 * Sobald in Sanity ein Rechtstext mit derselben Adresse liegt, gewinnt Sanity.
 * Beide Texte gehören vor dem Livegang einmal anwaltlich geprüft.
 */

export function standardImpressum(e: Grundeinstellungen): Rechtstext {
  return {
    titel: "Impressum",
    slug: "impressum",
    stand: null,
    inhalt: [
      ueberschrift("Angaben gemäß § 5 DDG"),
      absatz(`${e.inhaber}`),
      absatz(`${e.name}`),
      absatz(`${e.strasse}\n${e.plz} ${e.ort}\n${e.land}`),

      ueberschrift("Kontakt"),
      absatz(`Telefon: ${e.telefon}`),
      absatz(`E-Mail: ${e.email}`),

      ueberschrift("Umsatzsteuer"),
      e.kleinunternehmer
        ? absatz(
            "Gemäß § 19 UStG wird keine Umsatzsteuer berechnet und daher auch nicht in Rechnungen ausgewiesen.",
          )
        : absatz(
            `Umsatzsteuer-Identifikationsnummer gemäß § 27 a UStG: ${e.umsatzsteuerId ?? "—"}`,
          ),

      ueberschrift("Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV"),
      absatz(`${e.inhaber}, ${e.strasse}, ${e.plz} ${e.ort}`),

      ueberschrift("Streitbeilegung"),
      absatz(
        "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit: https://ec.europa.eu/consumers/odr. Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
      ),

      ueberschrift("Haftung für Inhalte und Links"),
      absatz(
        "Als Diensteanbieter bin ich für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Für Inhalte verlinkter externer Seiten ist stets deren Anbieter verantwortlich. Zum Zeitpunkt der Verlinkung waren keine rechtswidrigen Inhalte erkennbar. Bei Bekanntwerden von Rechtsverletzungen entferne ich entsprechende Links umgehend.",
      ),

      ueberschrift("Urheberrecht"),
      absatz(
        "Die auf diesen Seiten erstellten Inhalte und Werke unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung und Verbreitung außerhalb der Grenzen des Urheberrechts bedürfen meiner schriftlichen Zustimmung.",
      ),
    ],
    seo: {
      titel: "Impressum",
      beschreibung: `Anbieterkennzeichnung von ${e.name}.`,
      bild: null,
      vonSucheAusschliessen: true,
    },
  };
}

export function standardDatenschutz(e: Grundeinstellungen): Rechtstext {
  return {
    titel: "Datenschutz",
    slug: "datenschutz",
    stand: null,
    inhalt: [
      absatz(
        "Diese Website kommt ohne Cookie-Banner aus, weil sie keine Einwilligung braucht: Es werden keine Analysedienste, keine Werbenetzwerke und keine Inhalte von fremden Servern eingebunden. Was trotzdem an Daten anfällt, steht hier.",
      ),

      ueberschrift("Verantwortlich"),
      absatz(
        `${e.inhaber}\n${e.name}\n${e.strasse}\n${e.plz} ${e.ort}\nTelefon: ${e.telefon}\nE-Mail: ${e.email}`,
      ),

      ueberschrift("Aufruf der Website (Server-Logdateien)"),
      absatz(
        "Beim Aufruf dieser Website werden durch den Hosting-Anbieter automatisch Daten verarbeitet, die Ihr Browser übermittelt. Das sind:",
      ),
      ...liste([
        "gekürzte IP-Adresse",
        "Datum und Uhrzeit des Zugriffs",
        "aufgerufene Adresse und übertragene Datenmenge",
        "Browsertyp und Betriebssystem",
        "verweisende Seite, sofern übermittelt",
      ]),
      absatz(
        "Diese Daten sind technisch notwendig, um die Seite auszuliefern und Angriffe abzuwehren. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO, mein berechtigtes Interesse an einem sicheren und störungsfreien Betrieb. Eine Zusammenführung mit anderen Daten findet nicht statt.",
      ),

      ueberschrift("Hosting"),
      absatz(
        "Die Website wird bei der Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA, gehostet. Die Auslieferung erfolgt über Rechenzentren innerhalb der Europäischen Union. Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO. Für Übermittlungen in die USA stützt sich Vercel auf Standardvertragsklauseln sowie eine Zertifizierung nach dem EU-US Data Privacy Framework.",
      ),

      ueberschrift("Inhaltsverwaltung"),
      absatz(
        "Die Texte und Bilder dieser Website werden im Redaktionssystem von Sanity (Sanity AS, Dronning Eufemias gate 16, 0191 Oslo, Norwegen) gepflegt. Dabei werden Inhalte der Website verarbeitet, keine personenbezogenen Daten von Besucherinnen und Besuchern.",
      ),

      ueberschrift("Kontaktformular und Anruf"),
      absatz(
        "Wenn Sie das Kontaktformular ausfüllen, werden die von Ihnen eingegebenen Angaben (Name, Betrieb, Telefonnummer, E-Mail-Adresse und Ihre Nachricht) an meine E-Mail-Adresse übermittelt, damit ich Ihre Anfrage beantworten kann. Der Versand erfolgt über die Resend Inc., 2261 Market Street #5039, San Francisco, CA 94114, USA, mit der ein Auftragsverarbeitungsvertrag besteht.",
      ),
      absatz(
        "Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf einen Vertrag zielt, im Übrigen Art. 6 Abs. 1 lit. f DSGVO. Ihre Angaben werden gelöscht, sobald die Anfrage abschließend bearbeitet ist und keine gesetzlichen Aufbewahrungsfristen entgegenstehen — in der Regel nach spätestens sechs Monaten.",
      ),
      absatz(
        "Wenn Sie anrufen, verarbeite ich Ihre Rufnummer und die Inhalte des Gesprächs zur Bearbeitung Ihres Anliegens. Gespräche werden nicht aufgezeichnet.",
      ),

      ueberschrift("Schriften"),
      absatz(
        "Die verwendeten Schriften werden von diesem Server ausgeliefert. Es besteht keine Verbindung zu Google Fonts oder anderen Schriftanbietern; Ihre IP-Adresse wird dorthin nicht übertragen.",
      ),

      ueberschrift("Cookies und Reichweitenmessung"),
      absatz(
        "Diese Website setzt keine Cookies zu Analyse- oder Werbezwecken und bindet keine Reichweitenmessung ein. Es findet kein Profiling und keine automatisierte Entscheidungsfindung statt.",
      ),

      ueberschrift("Ihre Rechte"),
      absatz("Sie haben jederzeit das Recht auf"),
      ...liste([
        "Auskunft über die zu Ihnen gespeicherten Daten (Art. 15 DSGVO)",
        "Berichtigung unrichtiger Daten (Art. 16 DSGVO)",
        "Löschung (Art. 17 DSGVO)",
        "Einschränkung der Verarbeitung (Art. 18 DSGVO)",
        "Datenübertragbarkeit (Art. 20 DSGVO)",
        "Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21 DSGVO)",
      ]),
      absatz(
        `Eine formlose Nachricht an ${e.email} genügt. Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde beschweren, etwa bei der für meinen Sitz zuständigen Behörde.`,
      ),

      ueberschrift("Verschlüsselung"),
      absatz(
        "Diese Website wird ausschließlich verschlüsselt über HTTPS ausgeliefert. Inhalte, die Sie an mich übermitteln, können auf dem Transportweg nicht von Dritten mitgelesen werden.",
      ),
    ],
    seo: {
      titel: "Datenschutz",
      beschreibung: `Wie ${e.name} mit Ihren Daten umgeht: ohne Cookies, ohne Tracking, ohne Schriften von fremden Servern.`,
      bild: null,
      vonSucheAusschliessen: true,
    },
  };
}
