export function renderPokemonCardTemplate(pokemonDataArray, pokemonFlavorTextArray, pokemonGeneraTextArray, pokemonNamesTextArray, labels) {
  return /*html*/ `
      <div class="container">
            <div tabindex="${pokemonDataArray.id + 500}" 
                onclick="showPokemonDetails(${pokemonDataArray.id})"                 
                class="card ${pokemonDataArray.types[0].type.name}_card_before cardEffekt">
              <div class="info">
                  <div class="infoLeft">
                      <h2 class="name">${pokemonNamesTextArray}</h2>
                  </div>
                  <div class="infoRight">
                      <div class="battlePoints">${pokemonDataArray.stats[0].base_stat} HP</div>
                      <div class="number">${pokemonDataArray.id}</div>
                  </div>
              </div>
              <div class="window ${pokemonDataArray.types[0].type.name}_window_bg"></div>
              <div class="basicData">
                  ${pokemonGeneraTextArray} 
                  ${labels.size}: ${(pokemonDataArray.height / 10).toFixed(2)}m 
                  ${labels.weight}: ${(pokemonDataArray.weight / 10).toFixed(2)}kg
              </div>
              <p class="description">
                  ${pokemonFlavorTextArray.replaceAll("\f", "\n")}
              </p>
              <div class="types">             
                ${pokemonDataArray.types[0] ? `<img src="./assets/img/types/${pokemonDataArray.types[0].type.name}.svg" alt="" />` : ""}    
                ${pokemonDataArray.types[1] ? `<img src="./assets/img/types/${pokemonDataArray.types[1].type.name}.svg" alt="" />` : ""}              
              </div>
              <p class="footerLine">${labels.description}</p>
          </div>
          <img onclick="showPokemonDetails(${pokemonDataArray.id})" class="pokemonCard" src="${pokemonDataArray.sprites.other.home.front_default}" />
      </div>
    `;
}

export function renderPokemonBigCardTemplate(pokemonDataArray, pokemonFlavorTextArray, pokemonGeneraTextArray, pokemonNamesTextArray, IndexPokeID, labels) {
  return /*html*/ `
    <div class="containerBigCard">
        <div id="pokeArrowLeftBigCard" class="pokeArrowLeftBigCard">
            <img onclick="renderPokemonDetails(${IndexPokeID - 1})" 
                class="pokeArrowLeft" 
                id="pokeArrowLeft" 
                src="./assets/icons/arrowLeft.png" alt="" />
            <img onclick="renderPokemonDetails(${IndexPokeID - 1})" 
                class="pokeArrowLeftBall" 
                src="./assets/icons/pokeballArrow.png" 
                alt="" />
        </div>
        <div class="infoBox ${pokemonDataArray.types[0].type.name}_card_before">
            <div class="info">
                <div class="infoLeft">
                    <h1 class="name">${pokemonNamesTextArray}</h1>
                       <svg class="cries" onclick="playSound(${IndexPokeID})" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                      <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/>
                    </svg>
                </div>
                <div class="infoRight">
                    <div class="battlePoints">${pokemonDataArray.stats[0].base_stat} HP</div>
                    <div class="number">${pokemonDataArray.id}</div>
                </div>
            </div>
            <div class="window ${pokemonDataArray.types[0].type.name}_window_bg">
                <img class="pokemon" src="${pokemonDataArray.sprites.other.home.front_default}" />
            </div>
            <div class="basicData">
                ${pokemonGeneraTextArray} 
                ${labels.size}: ${(pokemonDataArray.height / 10).toFixed(2)}m 
                ${labels.weight}: ${(pokemonDataArray.weight / 10).toFixed(2)}kg
            </div>
            <p class="description">
                ${pokemonFlavorTextArray.replaceAll("\f", "\n")}
            </p>
            <div class="quickInfos">
                <div class="types">             
                    ${pokemonDataArray.types[0] ? `<img src="./assets/img/types/${pokemonDataArray.types[0].type.name}.svg" alt="" />` : ""}    
                    ${pokemonDataArray.types[1] ? `<img src="./assets/img/types/${pokemonDataArray.types[1].type.name}.svg" alt="" />` : ""}
                </div>
                <canvas class="myChart" id="myChart"></canvas>              
            </div>
            <p class="footerLine">${labels.description}</p>
        </div>
        <div id="pokeArrowRightBigCard" class="pokeArrowRightBigCard">
            <img onclick="renderPokemonDetails(${IndexPokeID + 1})" 
                class="pokeArrowRight" 
                id="pokeArrowRight" 
                src="./assets/icons/arrowRight.png" alt="" />
            <img onclick="renderPokemonDetails(${IndexPokeID + 1})" 
                class="pokeArrowRightBall" 
                src="./assets/icons/pokeballArrow.png" alt="" />
        </div>
    </div>
    `;
}

export function renderShowLoadingScreen() {
  return /*html*/ `
      <div class="container">
            <div class="card">
              <div class="info">
                  <div class="infoLeft">
                      <h1 class="name">Loading..</h1>
                  </div>
                  <div class="infoRight">
                      <div class="battlePoints">Loading..</div>
                      <div class="number">Loading..</div>
                  </div>
              </div>
              <div class="window loading_window_bg"></div>
              <div class="basicData">
              Loading..
              </div>
              <p class="description">
              Loading..
              </p>
              <div class="types">
              Loading..
              </div>
              <p class="footerLine">Loading..</p>
          </div>
          <img class="pokemonCard loading" src="./assets/img/132.png" />
      </div>
      `;
}

export function renderImprintTemplate() {
  return /*html*/ `
     <div class="imprint">

        <div class="header">
            <h1>Impressum</h1>
            <p>Angaben gemäß § 5 DDG</p>
        </div>

        <div class="address" >
            <p>Mirko Rinke</p>
            <p>Maschstraße 7</p>
            <p>31199 Diekholzen</p>
        </div>
        <div class="representedBy" >
            <p><strong>Vertreten durch:</strong></p>            
            <p>Mirko Rinke</p>         
        </div>
        <div class="contact">
            <p><strong>Kontakt:</strong></p>
            <p>Telefon: 05064-951989</p>
            <p>E-Mail: <a href="mirkorinke@htp.com">mirkorinke@htp.com</a></p>          
        </div>
        <h2>Haftungsausschluss</h2>
        <h3>Haftung für Inhalte</h3>
        <p>
            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte 
            können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 DDG für eigene Inhalte auf diesen Seiten 
            nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte 
            oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. 
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. 
            Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden 
            von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
        </p>
        <h3>Haftung für Links</h3>
        <p>
            Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese 
            fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
            Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte 
            waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete 
            Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
        </p>
        <h3>Urheberrecht</h3>
        <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, 
            Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des 
            jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. 
            Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden 
            Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen 
            entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
        </p>
        <h3>Datenschutz</h3>
        <p>
            Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten 
            (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. 
            Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben. 
            <br>
            Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. 
            Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich. 
            <br>
            Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich 
            angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich 
            rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.
        </p>
        <p>
            Website Impressum erstellt durch 
            <a href="https://www.impressum-generator.de">impressum-generator.de</a> von der 
            <a href="https://www.kanzlei-hasselbach.de/" rel="nofollow">Kanzlei Hasselbach</a>.
        </p>
        </div>
    `;
}

export function renderPrivacyPolicyTemplate() {
  return /*html*/ `
    <div class="privacyPolicy">
      <h1>Datenschutzerklärung</h1>
      <h2 id="m716">Präambel</h2>
      <p>
        Mit der folgenden Datenschutzerklärung möchten wir Sie darüber aufklären, welche Arten Ihrer personenbezogenen Daten (nachfolgend auch kurz als "Daten" bezeichnet) wir zu
        welchen Zwecken und in welchem Umfang verarbeiten. Die Datenschutzerklärung gilt für alle von uns durchgeführten Verarbeitungen personenbezogener Daten, sowohl im Rahmen
        der Erbringung unserer Leistungen als auch insbesondere auf unseren Webseiten, in mobilen Applikationen sowie innerhalb externer Onlinepräsenzen, wie z. B. unserer
        Social-Media-Profile (nachfolgend zusammenfassend bezeichnet als "Onlineangebot").
      </p>
      <p>Die verwendeten Begriffe sind nicht geschlechtsspezifisch.</p>

      <p>Stand: 29. September 2024</p>
      <h2>Inhaltsübersicht</h2>
      <ul class="index">
        <li><a class="index-link" href="#m716">Präambel</a></li>
        <li><a class="index-link" href="#m3">Verantwortlicher</a></li>
        <li><a class="index-link" href="#mOverview">Übersicht der Verarbeitungen</a></li>
        <li><a class="index-link" href="#m2427">Maßgebliche Rechtsgrundlagen</a></li>
        <li><a class="index-link" href="#m25">Übermittlung von personenbezogenen Daten</a></li>
        <li><a class="index-link" href="#m24">Internationale Datentransfers</a></li>
        <li><a class="index-link" href="#m12">Allgemeine Informationen zur Datenspeicherung und Löschung</a></li>
        <li><a class="index-link" href="#m10">Rechte der betroffenen Personen</a></li>
        <li><a class="index-link" href="#m225">Bereitstellung des Onlineangebots und Webhosting</a></li>
        <li><a class="index-link" href="#m134">Einsatz von Cookies</a></li>
        <li><a class="index-link" href="#m328">Plug-ins und eingebettete Funktionen sowie Inhalte</a></li>
        <li><a class="index-link" href="#m15">Änderung und Aktualisierung</a></li>
        <li><a class="index-link" href="#m42">Begriffsdefinitionen</a></li>
      </ul>
      <h2 id="m3">Verantwortlicher</h2>
      <p>Mirko Rinke<br />Maschstraße 7<br />31199 Diekholzen</p>
      <p>E-Mail-Adresse: <a href="mailto:mirkorinke@htp.com">mirkorinke@htp.com</a></p>

      <h2 id="mOverview">Übersicht der Verarbeitungen</h2>
      <p>Die nachfolgende Übersicht fasst die Arten der verarbeiteten Daten und die Zwecke ihrer Verarbeitung zusammen und verweist auf die betroffenen Personen.</p>
      <h3>Arten der verarbeiteten Daten</h3>
      <ul>
        <li>Nutzungsdaten.</li>
        <li>Meta-, Kommunikations- und Verfahrensdaten.</li>
        <li>Protokolldaten.</li>
      </ul>
      <h3>Kategorien betroffener Personen</h3>
      <ul>
        <li>Nutzer.</li>
      </ul>
      <h3>Zwecke der Verarbeitung</h3>
      <ul>
        <li>Sicherheitsmaßnahmen.</li>
        <li>Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit.</li>
        <li>Informationstechnische Infrastruktur.</li>
      </ul>
      <h2 id="m2427">Maßgebliche Rechtsgrundlagen</h2>
      <p>
        <strong>Maßgebliche Rechtsgrundlagen nach der DSGVO: </strong>Im Folgenden erhalten Sie eine Übersicht der Rechtsgrundlagen der DSGVO, auf deren Basis wir personenbezogene
        Daten verarbeiten. Bitte nehmen Sie zur Kenntnis, dass neben den Regelungen der DSGVO nationale Datenschutzvorgaben in Ihrem bzw. unserem Wohn- oder Sitzland gelten können.
        Sollten ferner im Einzelfall speziellere Rechtsgrundlagen maßgeblich sein, teilen wir Ihnen diese in der Datenschutzerklärung mit.
      </p>
      <ul>
        <li>
          <strong>Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO)</strong> - Die betroffene Person hat ihre Einwilligung in die Verarbeitung der sie betreffenden personenbezogenen
          Daten für einen spezifischen Zweck oder mehrere bestimmte Zwecke gegeben.
        </li>
        <li>
          <strong>Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO)</strong> - die Verarbeitung ist zur Wahrung der berechtigten Interessen des Verantwortlichen oder eines
          Dritten notwendig, vorausgesetzt, dass die Interessen, Grundrechte und Grundfreiheiten der betroffenen Person, die den Schutz personenbezogener Daten verlangen, nicht
          überwiegen.
        </li>
      </ul>
      <p>
        <strong>Nationale Datenschutzregelungen in Deutschland: </strong>Zusätzlich zu den Datenschutzregelungen der DSGVO gelten nationale Regelungen zum Datenschutz in
        Deutschland. Hierzu gehört insbesondere das Gesetz zum Schutz vor Missbrauch personenbezogener Daten bei der Datenverarbeitung (Bundesdatenschutzgesetz – BDSG). Das BDSG
        enthält insbesondere Spezialregelungen zum Recht auf Auskunft, zum Recht auf Löschung, zum Widerspruchsrecht, zur Verarbeitung besonderer Kategorien personenbezogener
        Daten, zur Verarbeitung für andere Zwecke und zur Übermittlung sowie automatisierten Entscheidungsfindung im Einzelfall einschließlich Profiling. Ferner können
        Landesdatenschutzgesetze der einzelnen Bundesländer zur Anwendung gelangen.
      </p>
      <p>
        <strong>Hinweis auf Geltung DSGVO und Schweizer DSG: </strong>Diese Datenschutzhinweise dienen sowohl der Informationserteilung nach dem Schweizer DSG als auch nach der
        Datenschutzgrundverordnung (DSGVO). Aus diesem Grund bitten wir Sie zu beachten, dass aufgrund der breiteren räumlichen Anwendung und Verständlichkeit die Begriffe der
        DSGVO verwendet werden. Insbesondere statt der im Schweizer DSG verwendeten Begriffe „Bearbeitung" von „Personendaten", "überwiegendes Interesse" und "besonders
        schützenswerte Personendaten" werden die in der DSGVO verwendeten Begriffe „Verarbeitung" von „personenbezogenen Daten" sowie "berechtigtes Interesse" und "besondere
        Kategorien von Daten" verwendet. Die gesetzliche Bedeutung der Begriffe wird jedoch im Rahmen der Geltung des Schweizer DSG weiterhin nach dem Schweizer DSG bestimmt.
      </p>

      <h2 id="m25">Übermittlung von personenbezogenen Daten</h2>
      <p>
        Im Rahmen unserer Verarbeitung von personenbezogenen Daten kommt es vor, dass diese an andere Stellen, Unternehmen, rechtlich selbstständige Organisationseinheiten oder
        Personen übermittelt beziehungsweise ihnen gegenüber offengelegt werden. Zu den Empfängern dieser Daten können z. B. mit IT-Aufgaben beauftragte Dienstleister gehören oder
        Anbieter von Diensten und Inhalten, die in eine Website eingebunden sind. In solchen Fällen beachten wir die gesetzlichen Vorgaben und schließen insbesondere entsprechende
        Verträge bzw. Vereinbarungen, die dem Schutz Ihrer Daten dienen, mit den Empfängern Ihrer Daten ab.
      </p>

      <h2 id="m24">Internationale Datentransfers</h2>
      <p>
        Datenverarbeitung in Drittländern: Sofern wir Daten in einem Drittland (d. h., außerhalb der Europäischen Union (EU), des Europäischen Wirtschaftsraums (EWR)) verarbeiten
        oder die Verarbeitung im Rahmen der Inanspruchnahme von Diensten Dritter oder der Offenlegung bzw. Übermittlung von Daten an andere Personen, Stellen oder Unternehmen
        stattfindet, erfolgt dies nur im Einklang mit den gesetzlichen Vorgaben. Sofern das Datenschutzniveau in dem Drittland mittels eines Angemessenheitsbeschlusses anerkannt
        wurde (Art. 45 DSGVO), dient dieser als Grundlage des Datentransfers. Im Übrigen erfolgen Datentransfers nur dann, wenn das Datenschutzniveau anderweitig gesichert ist,
        insbesondere durch Standardvertragsklauseln (Art. 46 Abs. 2 lit. c) DSGVO), ausdrückliche Einwilligung oder im Fall vertraglicher oder gesetzlich erforderlicher
        Übermittlung (Art. 49 Abs. 1 DSGVO). Im Übrigen teilen wir Ihnen die Grundlagen der Drittlandübermittlung bei den einzelnen Anbietern aus dem Drittland mit, wobei die
        Angemessenheitsbeschlüsse als Grundlagen vorrangig gelten. Informationen zu Drittlandtransfers und vorliegenden Angemessenheitsbeschlüssen können dem Informationsangebot
        der EU-Kommission entnommen werden:
        <a href="https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection_en?prefLang=de" target="_blank"
          >https://commission.europa.eu/law/law-topic/data-protection/international-dimension-data-protection_en?prefLang=de.</a
        >
        Im Rahmen des sogenannten „Data Privacy Framework" (DPF) hat die EU-Kommission das Datenschutzniveau ebenfalls für bestimmte Unternehmen aus den USA im Rahmen der
        Angemessenheitsbeschlusses vom 10.07.2023 als sicher anerkannt. Die Liste der zertifizierten Unternehmen als auch weitere Informationen zu dem DPF können Sie der Website
        des Handelsministeriums der USA unter <a href="https://www.dataprivacyframework.gov/" target="_blank">https://www.dataprivacyframework.gov/</a> (in Englisch) entnehmen. Wir
        informieren Sie im Rahmen der Datenschutzhinweise, welche von uns eingesetzten Diensteanbieter unter dem Data Privacy Framework zertifiziert sind.
      </p>

      <h2 id="m12">Allgemeine Informationen zur Datenspeicherung und Löschung</h2>
      <p>
        Wir löschen personenbezogene Daten, die wir verarbeiten, gemäß den gesetzlichen Bestimmungen, sobald die zugrundeliegenden Einwilligungen widerrufen werden oder keine
        weiteren rechtlichen Grundlagen für die Verarbeitung bestehen. Dies betrifft Fälle, in denen der ursprüngliche Verarbeitungszweck entfällt oder die Daten nicht mehr
        benötigt werden. Ausnahmen von dieser Regelung bestehen, wenn gesetzliche Pflichten oder besondere Interessen eine längere Aufbewahrung oder Archivierung der Daten
        erfordern.
      </p>
      <p>
        Insbesondere müssen Daten, die aus handels- oder steuerrechtlichen Gründen aufbewahrt werden müssen oder deren Speicherung notwendig ist zur Rechtsverfolgung oder zum
        Schutz der Rechte anderer natürlicher oder juristischer Personen, entsprechend archiviert werden.
      </p>
      <p>Unsere Datenschutzhinweise enthalten zusätzliche Informationen zur Aufbewahrung und Löschung von Daten, die speziell für bestimmte Verarbeitungsprozesse gelten.</p>
      <p>Bei mehreren Angaben zur Aufbewahrungsdauer oder Löschungsfristen eines Datums, ist stets die längste Frist maßgeblich.</p>
      <p>
        Beginnt eine Frist nicht ausdrücklich zu einem bestimmten Datum und beträgt sie mindestens ein Jahr, so startet sie automatisch am Ende des Kalenderjahres, in dem das
        fristauslösende Ereignis eingetreten ist. Im Fall laufender Vertragsverhältnisse, in deren Rahmen Daten gespeichert werden, ist das fristauslösende Ereignis der Zeitpunkt
        des Wirksamwerdens der Kündigung oder sonstige Beendigung des Rechtsverhältnisses.
      </p>
      <p>
        Daten, die nicht mehr für den ursprünglich vorgesehenen Zweck, sondern aufgrund gesetzlicher Vorgaben oder anderer Gründe aufbewahrt werden, verarbeiten wir ausschließlich
        zu den Gründen, die ihre Aufbewahrung rechtfertigen.
      </p>
      <p><strong>Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:</strong></p>
      <ul class="m-elements">
        <li>
          <strong>Aufbewahrung und Löschung von Daten: </strong>Die folgenden allgemeinen Fristen gelten für die Aufbewahrung und Archivierung nach deutschem Recht:
          <ul>
            <li>
              10 Jahre - Aufbewahrungsfrist für Bücher und Aufzeichnungen, Jahresabschlüsse, Inventare, Lageberichte, Eröffnungsbilanz sowie die zu ihrem Verständnis erforderlichen
              Arbeitsanweisungen und sonstigen Organisationsunterlagen, Buchungsbelege und Rechnungen (§ 147 Abs. 3 i. V. m. Abs. 1 Nr. 1, 4 und 4a AO, § 14b Abs. 1 UStG, § 257
              Abs. 1 Nr. 1 u. 4, Abs. 4 HGB).
            </li>
            <li>
              6 Jahre - Übrige Geschäftsunterlagen: empfangene Handels- oder Geschäftsbriefe, Wiedergaben der abgesandten Handels- oder Geschäftsbriefe, sonstige Unterlagen, soweit
              sie für die Besteuerung von Bedeutung sind, z. B. Stundenlohnzettel, Betriebsabrechnungsbögen, Kalkulationsunterlagen, Preisauszeichnungen, aber auch
              Lohnabrechnungsunterlagen, soweit sie nicht bereits Buchungsbelege sind und Kassenstreifen (§ 147 Abs. 3 i. V. m. Abs. 1 Nr. 2, 3, 5 AO, § 257 Abs. 1 Nr. 2 u. 3, Abs.
              4 HGB).
            </li>
            <li>
              3 Jahre - Daten, die erforderlich sind, um potenzielle Gewährleistungs- und Schadensersatzansprüche oder ähnliche vertragliche Ansprüche und Rechte zu berücksichtigen
              sowie damit verbundene Anfragen zu bearbeiten, basierend auf früheren Geschäftserfahrungen und üblichen Branchenpraktiken, werden für die Dauer der regulären
              gesetzlichen Verjährungsfrist von drei Jahren gespeichert (§§ 195, 199 BGB).
            </li>
          </ul>
        </li>
      </ul>
      <h2 id="m10">Rechte der betroffenen Personen</h2>
      <p>
        Rechte der betroffenen Personen aus der DSGVO: Ihnen stehen als Betroffene nach der DSGVO verschiedene Rechte zu, die sich insbesondere aus Art. 15 bis 21 DSGVO ergeben:
      </p>
      <ul>
        <li>
          <strong
            >Widerspruchsrecht: Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung der Sie betreffenden
            personenbezogenen Daten, die aufgrund von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes
            Profiling. Werden die Sie betreffenden personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben, haben Sie das Recht, jederzeit Widerspruch gegen die
            Verarbeitung der Sie betreffenden personenbezogenen Daten zum Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit es mit solcher
            Direktwerbung in Verbindung steht.</strong
          >
        </li>
        <li><strong>Widerrufsrecht bei Einwilligungen:</strong> Sie haben das Recht, erteilte Einwilligungen jederzeit zu widerrufen.</li>
        <li>
          <strong>Auskunftsrecht:</strong> Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob betreffende Daten verarbeitet werden und auf Auskunft über diese Daten
          sowie auf weitere Informationen und Kopie der Daten entsprechend den gesetzlichen Vorgaben.
        </li>
        <li>
          <strong>Recht auf Berichtigung:</strong> Sie haben entsprechend den gesetzlichen Vorgaben das Recht, die Vervollständigung der Sie betreffenden Daten oder die
          Berichtigung der Sie betreffenden unrichtigen Daten zu verlangen.
        </li>
        <li>
          <strong>Recht auf Löschung und Einschränkung der Verarbeitung:</strong> Sie haben nach Maßgabe der gesetzlichen Vorgaben das Recht, zu verlangen, dass Sie betreffende
          Daten unverzüglich gelöscht werden, bzw. alternativ nach Maßgabe der gesetzlichen Vorgaben eine Einschränkung der Verarbeitung der Daten zu verlangen.
        </li>
        <li>
          <strong>Recht auf Datenübertragbarkeit:</strong> Sie haben das Recht, Sie betreffende Daten, die Sie uns bereitgestellt haben, nach Maßgabe der gesetzlichen Vorgaben in
          einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten oder deren Übermittlung an einen anderen Verantwortlichen zu fordern.
        </li>
        <li>
          <strong>Beschwerde bei Aufsichtsbehörde:</strong> Sie haben unbeschadet eines anderweitigen verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs das Recht auf
          Beschwerde bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthaltsorts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen
          Verstoßes, wenn Sie der Ansicht sind, dass die Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die Vorgaben der DSGVO verstößt.
        </li>
      </ul>

      <h2 id="m225">Bereitstellung des Onlineangebots und Webhosting</h2>
      <p>
        Wir verarbeiten die Daten der Nutzer, um ihnen unsere Online-Dienste zur Verfügung stellen zu können. Zu diesem Zweck verarbeiten wir die IP-Adresse des Nutzers, die
        notwendig ist, um die Inhalte und Funktionen unserer Online-Dienste an den Browser oder das Endgerät der Nutzer zu übermitteln.
      </p>
      <ul class="m-elements">
        <li>
          <strong>Verarbeitete Datenarten:</strong> Nutzungsdaten (z. B. Seitenaufrufe und Verweildauer, Klickpfade, Nutzungsintensität und -frequenz, verwendete Gerätetypen und
          Betriebssysteme, Interaktionen mit Inhalten und Funktionen); Meta-, Kommunikations- und Verfahrensdaten (z. B. IP-Adressen, Zeitangaben, Identifikationsnummern,
          beteiligte Personen). Protokolldaten (z. B. Logfiles betreffend Logins oder den Abruf von Daten oder Zugriffszeiten.).
        </li>
        <li><strong>Betroffene Personen:</strong> Nutzer (z. B. Webseitenbesucher, Nutzer von Onlinediensten).</li>
        <li>
          <strong>Zwecke der Verarbeitung:</strong> Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit; Informationstechnische Infrastruktur (Betrieb und
          Bereitstellung von Informationssystemen und technischen Geräten (Computer, Server etc.).). Sicherheitsmaßnahmen.
        </li>
        <li><strong>Aufbewahrung und Löschung:</strong> Löschung entsprechend Angaben im Abschnitt "Allgemeine Informationen zur Datenspeicherung und Löschung".</li>
        <li class=""><strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).</li>
      </ul>
      <p><strong>Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:</strong></p>
      <ul class="m-elements">
        <li>
          <strong>Bereitstellung Onlineangebot auf gemietetem Speicherplatz: </strong>Für die Bereitstellung unseres Onlineangebotes nutzen wir Speicherplatz, Rechenkapazität und
          Software, die wir von einem entsprechenden Serveranbieter (auch "Webhoster" genannt) mieten oder anderweitig beziehen;
          <span class=""><strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).</span>
        </li>
        <li>
          <strong>Erhebung von Zugriffsdaten und Logfiles: </strong>Der Zugriff auf unser Onlineangebot wird in Form von sogenannten "Server-Logfiles" protokolliert. Zu den
          Serverlogfiles können die Adresse und der Name der abgerufenen Webseiten und Dateien, Datum und Uhrzeit des Abrufs, übertragene Datenmengen, Meldung über erfolgreichen
          Abruf, Browsertyp nebst Version, das Betriebssystem des Nutzers, Referrer URL (die zuvor besuchte Seite) und im Regelfall IP-Adressen und der anfragende Provider gehören.
          Die Serverlogfiles können zum einen zu Sicherheitszwecken eingesetzt werden, z. B. um eine Überlastung der Server zu vermeiden (insbesondere im Fall von missbräuchlichen
          Angriffen, sogenannten DDoS-Attacken), und zum anderen, um die Auslastung der Server und ihre Stabilität sicherzustellen;
          <span class=""><strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO). </span
          ><strong>Löschung von Daten:</strong> Logfile-Informationen werden für die Dauer von maximal 30 Tagen gespeichert und danach gelöscht oder anonymisiert. Daten, deren
          weitere Aufbewahrung zu Beweiszwecken erforderlich ist, sind bis zur endgültigen Klärung des jeweiligen Vorfalls von der Löschung ausgenommen.
        </li>
      </ul>
      <h2 id="m134">Einsatz von Cookies</h2>
      <p>
        Cookies sind kleine Textdateien bzw. sonstige Speichervermerke, die Informationen auf Endgeräten speichern und aus ihnen auslesen. Zum Beispiel, um den Log-in-Status in
        einem Nutzerkonto, einen Warenkorbinhalt in einem E-Shop, die aufgerufenen Inhalte oder verwendete Funktionen eines Onlineangebots zu speichern. Cookies können ferner in
        Bezug auf unterschiedliche Anliegen Einsatz finden, etwa zu Zwecken der Funktionsfähigkeit, der Sicherheit und des Komforts von Onlineangeboten sowie der Erstellung von
        Analysen der Besucherströme.
      </p>
      <p>
        <strong>Hinweise zur Einwilligung: </strong>Wir setzen Cookies im Einklang mit den gesetzlichen Vorschriften ein. Daher holen wir von den Nutzern eine vorhergehende
        Einwilligung ein, es sei denn, sie ist laut Gesetzeslage nicht gefordert. Eine Erlaubnis ist insbesondere nicht notwendig, wenn das Speichern und das Auslesen der
        Informationen, also auch von Cookies, unbedingt erforderlich sind, um den Nutzern einen von ihnen ausdrücklich gewünschten Telemediendienst (also unser Onlineangebot) zur
        Verfügung zu stellen. Die widerrufliche Einwilligung wird ihnen gegenüber deutlich kommuniziert und enthält die Informationen zur jeweiligen Cookie-Nutzung.
      </p>
      <p>
        <strong>Hinweise zu datenschutzrechtlichen Rechtsgrundlagen: </strong>Auf welcher datenschutzrechtlichen Grundlage wir die personenbezogenen Daten der Nutzer mithilfe von
        Cookies verarbeiten, hängt davon ab, ob wir sie um eine Einwilligung bitten. Falls die Nutzer akzeptieren, ist die Rechtsgrundlage der Verwertung ihrer Daten die erklärte
        Einwilligung. Andernfalls werden die mithilfe von Cookies verwerteten Daten auf Grundlage unserer berechtigten Interessen (z. B. an einem betriebswirtschaftlichen Betrieb
        unseres Onlineangebots und der Verbesserung seiner Nutzbarkeit) verarbeitet oder, falls dies im Rahmen der Erfüllung unserer vertraglichen Pflichten erfolgt, wenn der
        Einsatz von Cookies erforderlich ist, um unseren vertraglichen Verpflichtungen nachzukommen. Zu welchen Zwecken die Cookies von uns verwertet werden, darüber klären wir im
        Laufe dieser Datenschutzerklärung oder im Rahmen von unseren Einwilligungs- und Verarbeitungsprozessen auf.
      </p>
      <p><strong>Speicherdauer: </strong>Im Hinblick auf die Speicherdauer werden die folgenden Arten von Cookies unterschieden:</p>
      <ul>
        <li>
          <strong>Temporäre Cookies (auch: Session- oder Sitzungscookies):</strong> Temporäre Cookies werden spätestens gelöscht, nachdem ein Nutzer ein Onlineangebot verlassen und
          sein Endgerät (z. B. Browser oder mobile Applikation) geschlossen hat.
        </li>
        <li>
          <strong>Permanente Cookies:</strong> Permanente Cookies bleiben auch nach dem Schließen des Endgeräts gespeichert. So können beispielsweise der Log-in-Status gespeichert
          und bevorzugte Inhalte direkt angezeigt werden, wenn der Nutzer eine Website erneut besucht. Ebenso können die mithilfe von Cookies erhobenen Nutzerdaten zur
          Reichweitenmessung Verwendung finden. Sofern wir Nutzern keine expliziten Angaben zur Art und Speicherdauer von Cookies mitteilen (z. B. im Rahmen der Einholung der
          Einwilligung), sollten sie davon ausgehen, dass diese permanent sind und die Speicherdauer bis zu zwei Jahre betragen kann.
        </li>
      </ul>
      <p>
        <strong>Allgemeine Hinweise zum Widerruf und Widerspruch (Opt-out): </strong>Nutzer können die von ihnen abgegebenen Einwilligungen jederzeit widerrufen und zudem einen
        Widerspruch gegen die Verarbeitung entsprechend den gesetzlichen Vorgaben, auch mittels der Privatsphäre-Einstellungen ihres Browsers, erklären.
      </p>
      <ul class="m-elements">
        <li><strong>Verarbeitete Datenarten:</strong> Meta-, Kommunikations- und Verfahrensdaten (z. B. IP-Adressen, Zeitangaben, Identifikationsnummern, beteiligte Personen).</li>
        <li><strong>Betroffene Personen:</strong> Nutzer (z. B. Webseitenbesucher, Nutzer von Onlinediensten).</li>
        <li class=""><strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO). Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO).</li>
      </ul>
      <p><strong>Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:</strong></p>
      <ul class="m-elements">
        <li>
          <strong>Verarbeitung von Cookie-Daten auf Grundlage einer Einwilligung: </strong>Wir setzen eine Einwilligungs-Management-Lösung ein, bei der die Einwilligung der Nutzer
          zur Verwendung von Cookies oder zu den im Rahmen der Einwilligungs-Management-Lösung genannten Verfahren und Anbietern eingeholt wird. Dieses Verfahren dient der
          Einholung, Protokollierung, Verwaltung und dem Widerruf von Einwilligungen, insbesondere bezogen auf den Einsatz von Cookies und vergleichbaren Technologien, die zur
          Speicherung, zum Auslesen und zur Verarbeitung von Informationen auf den Endgeräten der Nutzer eingesetzt werden. Im Rahmen dieses Verfahrens werden die Einwilligungen
          der Nutzer für die Nutzung von Cookies und die damit verbundenen Verarbeitungen von Informationen, einschließlich der im Einwilligungs-Management-Verfahren genannten
          spezifischen Verarbeitungen und Anbieter, eingeholt. Die Nutzer haben zudem die Möglichkeit, ihre Einwilligungen zu verwalten und zu widerrufen. Die
          Einwilligungserklärungen werden gespeichert, um eine erneute Abfrage zu vermeiden und den Nachweis der Einwilligung gemäß der gesetzlichen Anforderungen führen zu können.
          Die Speicherung erfolgt serverseitig und/oder in einem Cookie (sogenanntes Opt-In-Cookie) oder mittels vergleichbarer Technologien, um die Einwilligung einem spezifischen
          Nutzer oder dessen Gerät zuordnen zu können. Sofern keine spezifischen Angaben zu den Anbietern von Einwilligungs-Management-Diensten vorliegen, gelten folgende
          allgemeine Hinweise: Die Dauer der Speicherung der Einwilligung beträgt bis zu zwei Jahre. Dabei wird ein pseudonymer Nutzer-Identifikator erstellt, der zusammen mit dem
          Zeitpunkt der Einwilligung, den Angaben zum Umfang der Einwilligung (z. B. betreffende Kategorien von Cookies und/oder Diensteanbieter) sowie Informationen über den
          Browser, das System und das verwendete Endgerät gespeichert wird;
          <span class=""><strong>Rechtsgrundlagen:</strong> Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO).</span>
        </li>
      </ul>
      <h2 id="m328">Plug-ins und eingebettete Funktionen sowie Inhalte</h2>
      <p>
        Wir binden Funktions- und Inhaltselemente in unser Onlineangebot ein, die von den Servern ihrer jeweiligen Anbieter (nachfolgend als „Drittanbieter" bezeichnet) bezogen
        werden. Dabei kann es sich zum Beispiel um Grafiken, Videos oder Stadtpläne handeln (nachfolgend einheitlich als „Inhalte" bezeichnet).
      </p>
      <p>
        Die Einbindung setzt immer voraus, dass die Drittanbieter dieser Inhalte die IP-Adresse der Nutzer verarbeiten, da sie ohne IP-Adresse die Inhalte nicht an deren Browser
        senden könnten. Die IP-Adresse ist damit für die Darstellung dieser Inhalte oder Funktionen erforderlich. Wir bemühen uns, nur solche Inhalte zu verwenden, deren jeweilige
        Anbieter die IP-Adresse lediglich zur Auslieferung der Inhalte anzuwenden. Drittanbieter können ferner sogenannte Pixel-Tags (unsichtbare Grafiken, auch als „Web Beacons"
        bezeichnet) für statistische oder Marketingzwecke einsetzen. Durch die „Pixel-Tags" können Informationen, wie etwa der Besucherverkehr auf den Seiten dieser Website,
        ausgewertet werden. Die pseudonymen Informationen können darüber hinaus in Cookies auf dem Gerät der Nutzer gespeichert werden und unter anderem technische Auskünfte zum
        Browser und zum Betriebssystem, zu verweisenden Websites, zur Besuchszeit sowie weitere Angaben zur Nutzung unseres Onlineangebots enthalten, aber auch mit solchen
        Informationen aus anderen Quellen verbunden werden.
      </p>
      <p>
        <strong>Hinweise zu Rechtsgrundlagen:</strong> Sofern wir die Nutzer um ihre Einwilligung in den Einsatz der Drittanbieter bitten, stellt die Rechtsgrundlage der
        Datenverarbeitung die Erlaubnis dar. Ansonsten werden die Nutzerdaten auf Grundlage unserer berechtigten Interessen (d. h. Interesse an effizienten, wirtschaftlichen und
        empfängerfreundlichen Leistungen) verarbeitet. In diesem Zusammenhang möchten wir Sie auch auf die Informationen zur Verwendung von Cookies in dieser Datenschutzerklärung
        hinweisen.
      </p>
      <ul class="m-elements">
        <li>
          <strong>Verarbeitete Datenarten:</strong> Nutzungsdaten (z. B. Seitenaufrufe und Verweildauer, Klickpfade, Nutzungsintensität und -frequenz, verwendete Gerätetypen und
          Betriebssysteme, Interaktionen mit Inhalten und Funktionen). Meta-, Kommunikations- und Verfahrensdaten (z. B. IP-Adressen, Zeitangaben, Identifikationsnummern,
          beteiligte Personen).
        </li>
        <li><strong>Betroffene Personen:</strong> Nutzer (z. B. Webseitenbesucher, Nutzer von Onlinediensten).</li>
        <li><strong>Zwecke der Verarbeitung:</strong> Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit.</li>
        <li>
          <strong>Aufbewahrung und Löschung:</strong> Löschung entsprechend Angaben im Abschnitt "Allgemeine Informationen zur Datenspeicherung und Löschung". Speicherung von
          Cookies von bis zu 2 Jahren (Sofern nicht anders angegeben, können Cookies und ähnliche Speichermethoden für einen Zeitraum von zwei Jahren auf den Geräten der Nutzer
          gespeichert werden.).
        </li>
        <li class=""><strong>Rechtsgrundlagen:</strong> Einwilligung (Art. 6 Abs. 1 S. 1 lit. a) DSGVO). Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f) DSGVO).</li>
      </ul>
      <h2 id="m15">Änderung und Aktualisierung</h2>
      <p>
        Wir bitten Sie, sich regelmäßig über den Inhalt unserer Datenschutzerklärung zu informieren. Wir passen die Datenschutzerklärung an, sobald die Änderungen der von uns
        durchgeführten Datenverarbeitungen dies erforderlich machen. Wir informieren Sie, sobald durch die Änderungen eine Mitwirkungshandlung Ihrerseits (z. B. Einwilligung) oder
        eine sonstige individuelle Benachrichtigung erforderlich wird.
      </p>
      <p>
        Sofern wir in dieser Datenschutzerklärung Adressen und Kontaktinformationen von Unternehmen und Organisationen angeben, bitten wir zu beachten, dass die Adressen sich über
        die Zeit ändern können und bitten die Angaben vor Kontaktaufnahme zu prüfen.
      </p>

      <h2 id="m42">Begriffsdefinitionen</h2>
      <p>
        In diesem Abschnitt erhalten Sie eine Übersicht über die in dieser Datenschutzerklärung verwendeten Begrifflichkeiten. Soweit die Begrifflichkeiten gesetzlich definiert
        sind, gelten deren gesetzliche Definitionen. Die nachfolgenden Erläuterungen sollen dagegen vor allem dem Verständnis dienen.
      </p>
      <ul class="glossary">
        <li>
          <strong>Meta-, Kommunikations- und Verfahrensdaten:</strong> Meta-, Kommunikations- und Verfahrensdaten sind Kategorien, die Informationen über die Art und Weise
          enthalten, wie Daten verarbeitet, übermittelt und verwaltet werden. Meta-Daten, auch bekannt als Daten über Daten, umfassen Informationen, die den Kontext, die Herkunft
          und die Struktur anderer Daten beschreiben. Sie können Angaben zur Dateigröße, dem Erstellungsdatum, dem Autor eines Dokuments und den Änderungshistorien beinhalten.
          Kommunikationsdaten erfassen den Austausch von Informationen zwischen Nutzern über verschiedene Kanäle, wie E-Mail-Verkehr, Anrufprotokolle, Nachrichten in sozialen
          Netzwerken und Chat-Verläufe, inklusive der beteiligten Personen, Zeitstempel und Übertragungswege. Verfahrensdaten beschreiben die Prozesse und Abläufe innerhalb von
          Systemen oder Organisationen, einschließlich Workflow-Dokumentationen, Protokolle von Transaktionen und Aktivitäten, sowie Audit-Logs, die zur Nachverfolgung und
          Überprüfung von Vorgängen verwendet werden.
        </li>
        <li>
          <strong>Nutzungsdaten:</strong> Nutzungsdaten beziehen sich auf Informationen, die erfassen, wie Nutzer mit digitalen Produkten, Dienstleistungen oder Plattformen
          interagieren. Diese Daten umfassen eine breite Palette von Informationen, die aufzeigen, wie Nutzer Anwendungen nutzen, welche Funktionen sie bevorzugen, wie lange sie
          auf bestimmten Seiten verweilen und über welche Pfade sie durch eine Anwendung navigieren. Nutzungsdaten können auch die Häufigkeit der Nutzung, Zeitstempel von
          Aktivitäten, IP-Adressen, Geräteinformationen und Standortdaten einschließen. Sie sind besonders wertvoll für die Analyse des Nutzerverhaltens, die Optimierung von
          Benutzererfahrungen, das Personalisieren von Inhalten und das Verbessern von Produkten oder Dienstleistungen. Darüber hinaus spielen Nutzungsdaten eine entscheidende
          Rolle beim Erkennen von Trends, Vorlieben und möglichen Problembereichen innerhalb digitaler Angebote
        </li>
        <li>
          <strong>Personenbezogene Daten:</strong> "Personenbezogene Daten" sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person (im
          Folgenden "betroffene Person") beziehen; als identifizierbar wird eine natürliche Person angesehen, die direkt oder indirekt, insbesondere mittels Zuordnung zu einer
          Kennung wie einem Namen, zu einer Kennnummer, zu Standortdaten, zu einer Online-Kennung (z. B. Cookie) oder zu einem oder mehreren besonderen Merkmalen identifiziert
          werden kann, die Ausdruck der physischen, physiologischen, genetischen, psychischen, wirtschaftlichen, kulturellen oder sozialen Identität dieser natürlichen Person sind.
        </li>
        <li>
          <strong>Protokolldaten:</strong> Protokolldaten sind Informationen über Ereignisse oder Aktivitäten, die in einem System oder Netzwerk protokolliert wurden. Diese Daten
          enthalten typischerweise Informationen wie Zeitstempel, IP-Adressen, Benutzeraktionen, Fehlermeldungen und andere Details über die Nutzung oder den Betrieb eines Systems.
          Protokolldaten werden oft zur Analyse von Systemproblemen, zur Sicherheitsüberwachung oder zur Erstellung von Leistungsberichten verwendet.
        </li>
        <li>
          <strong>Verantwortlicher:</strong> Als "Verantwortlicher" wird die natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, die allein oder gemeinsam
          mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet, bezeichnet.
        </li>
        <li>
          <strong>Verarbeitung:</strong> "Verarbeitung" ist jeder mit oder ohne Hilfe automatisierter Verfahren ausgeführte Vorgang oder jede solche Vorgangsreihe im Zusammenhang
          mit personenbezogenen Daten. Der Begriff reicht weit und umfasst praktisch jeden Umgang mit Daten, sei es das Erheben, das Auswerten, das Speichern, das Übermitteln oder
          das Löschen.
        </li>
      </ul>
      <p class="seal">
        <a
          href="https://datenschutz-generator.de/"
          title="Rechtstext von Dr. Schwenke - für weitere Informationen bitte anklicken."
          target="_blank"
          rel="noopener noreferrer nofollow"
          >Erstellt mit kostenlosem Datenschutz-Generator.de von Dr. Thomas Schwenke</a
        >
      </p>
    </div>
`;
}

export function renderNavTemplate(currentLanguage, placeholderText) {
  return /*html*/ `
      <img onclick="backToHome()" tabindex="101" class="homeButton item" src="./assets/icons/home.png" alt="" />
      <div id="search" class="search">
        <label class="searchLabel" for="pokemonSearchInput"><img class="searchIcon" src="./assets/icons/pokeballArrow.png" alt="" /></label>
        <input tabindex="102" class="pokemonSearchInput" id="pokemonSearchInput" type="text" autocomplete="off" />
        <div id="searchSuggestions" class="searchSuggestions d_none"></div>
      </div>
      <div id="pokemonRegions" class="pokemonRegions">
      <img tabindex="150" onclick="toggleRegionsMenu()" class="pokemonRegionsIcon" src="./assets/icons/regions${currentLanguage.replace('"', " ")}.png" alt="" />
      <div id="selectedPokemonRegions" class="selectedPokemonRegions d_none">
        <img tabindex="151" src="./assets/icons/kanto${currentLanguage.replace('"', " ")}.png" alt="" onclick="selectedPokemonLimit(1,11,151)" />
        <img tabindex="152" src="./assets/icons/johto${currentLanguage.replace('"', " ")}.png" alt="" onclick="selectedPokemonLimit(152,162,251)" />
        <img tabindex="153" src="./assets/icons/hoenn${currentLanguage.replace('"', " ")}.png" alt="" onclick="selectedPokemonLimit(252,262,386)" />
        <img tabindex="154" src="./assets/icons/sinnoh${currentLanguage.replace('"', " ")}.png" alt="" onclick="selectedPokemonLimit(387,397,493)" />
        <img tabindex="155" src="./assets/icons/einall${currentLanguage.replace('"', " ")}.png" alt="" onclick="selectedPokemonLimit(494,504,649)" />
        <img tabindex="156" src="./assets/icons/kalos${currentLanguage.replace('"', " ")}.png" alt="" onclick="selectedPokemonLimit(650,660,721)" />
        <img tabindex="157" src="./assets/icons/alola${currentLanguage.replace('"', " ")}.png" alt="" onclick="selectedPokemonLimit(722,732,809)" />
        <img tabindex="158" src="./assets/icons/galar${currentLanguage.replace('"', " ")}.png" alt="" onclick="selectedPokemonLimit(810,820,898)" />
        <img tabindex="159" src="./assets/icons/paldea${currentLanguage.replace('"', " ")}.png" alt="" onclick="selectedPokemonLimit(899,909,1026)" />
      </div>
      </div>
      <div id="yourName" class="yourName">
      <input tabindex="160" class="userNameInput" id="userNameInput" type="text" autocomplete="off" placeholder="${placeholderText}" />
      <label class="yourNameLabel" for="userNameInput"><img class="yourNameIcon" src="./assets/icons/yourName.gif" alt="" /></label>
      </div>
      <div id="languageSettings" class="languageSettings">
        <img tabindex="161" id="languageSettingsJa" onclick="selectedLanguage('ja')" src="./assets/icons/jp.svg" alt="" />
        <img tabindex="162" id="languageSettingsEn" onclick="selectedLanguage('en')" src="./assets/icons/us.svg" alt="" />
        <img tabindex="163" id="languageSettingsDe" onclick="selectedLanguage('de')" src="./assets/icons/de.svg" alt="" />
      </div>
  `;
}

export function renderFooterTemplate(currentLanguage) {
  return /*html*/ `   
      <img tabindex="201" onclick="renderImprint()" src="./assets/icons/imprint${currentLanguage.replace('"', " ")}.png" alt="" />
      <img tabindex="202" onclick="renderPrivacyPolicy()" src="./assets/icons/privacyPolicy${currentLanguage.replace('"', " ")}.png" alt="" />
  `;
}
