/**
 * @fileoverview This module provides template rendering functions for the Pokémon application.
 * It includes functions to render Pokémon card templates with various details and labels.
 */

/**
 * Renders a Pokemon card template.
 *
 * @param {Object} pokemonDataArray - The data array containing Pokemon information.
 * @param {Array} pokemonFlavorTextArray - The array containing flavor text for the Pokemon.
 * @param {Array} pokemonGeneraTextArray - The array containing genera text for the Pokemon.
 * @param {Array} pokemonNamesTextArray - The array containing names for the Pokemon.
 * @param {Object} labels - An object containing various labels for the template.
 * @param {string} labels.size - The label for the size of the Pokemon.
 * @param {string} labels.weight - The label for the weight of the Pokemon.
 * @param {string} labels.description - The label for the description section.
 * @returns {string} The HTML string for the Pokemon card template.
 */
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
                  ${pokemonFlavorTextArray.replaceAll('\f', '\n')}
              </p>
              <div class="types">             
                ${pokemonDataArray.types[0] ? `<img src="./assets/img/types/${pokemonDataArray.types[0].type.name}.svg" alt="" />` : ''}    
                ${pokemonDataArray.types[1] ? `<img src="./assets/img/types/${pokemonDataArray.types[1].type.name}.svg" alt="" />` : ''}              
              </div>
              <p class="footerLine">${labels.description}</p>
          </div>
          <img onclick="showPokemonDetails(${pokemonDataArray.id})" class="pokemonCard" src="${pokemonDataArray.sprites.other.home.front_default}" />
      </div>
    `;
}

/**
 * Renders the template for the detailed view of a Pokémon card.
 *
 * @param {Array} pokemonDataArray - Array containing data of the Pokémon.
 * @param {Array} pokemonFlavorTextArray - Array containing flavor text of the Pokémon.
 * @param {Array} pokemonGeneraTextArray - Array containing genera text of the Pokémon.
 * @param {Array} pokemonNamesTextArray - Array containing names of the Pokémon.
 * @param {number} IndexPokeID - The index or ID of the Pokémon.
 * @param {Object} labels - Object containing various labels for the template.
 * @param {string} labels.size - Label for the size of the Pokémon.
 * @param {string} labels.weight - Label for the weight of the Pokémon.
 * @param {string} labels.description - Label for the description footer.
 * @returns {string} - The HTML template string for the Pokémon card.
 */
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
                ${pokemonFlavorTextArray.replaceAll('\f', '\n')}
            </p>
            <div class="quickInfos">
                <div class="types">             
                    ${pokemonDataArray.types[0] ? `<img src="./assets/img/types/${pokemonDataArray.types[0].type.name}.svg" alt="" />` : ''}    
                    ${pokemonDataArray.types[1] ? `<img src="./assets/img/types/${pokemonDataArray.types[1].type.name}.svg" alt="" />` : ''}
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

/**
 * Renders a loading screen template for the Pokedex application.
 * This function returns an HTML string that displays a loading screen
 * with various placeholders indicating that data is being loaded.
 *
 * @returns {string} The HTML string representing the loading screen.
 */
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

/**
 * Generates the HTML template for the imprint (Impressum) section of the website.
 *
 * @returns {string} The HTML string for the imprint section.
 */
export function renderImprintTemplateDE() {
  return /*html*/ `
     <div class="imprint">

     <div class="header">
      <h1>Impressum</h1>
      <p>Angaben gemäß § 5 DDG</p>
    </div>
    <div class="address">
      <p>Mirko Rinke</p>
      <p>Maschstraße 7</p>
      <p>31199 Diekholzen</p>
    </div>
    <div class="representedBy">
      <p><strong>Vertreten durch:</strong></p>
      <p>Mirko Rinke</p>
    </div>
    <div class="contact">
      <p><strong>Kontakt:</strong></p>
      <div>
        E-Mail:
        <a href="mailto:contact@mirkorinke.dev">contact&#64;mirkorinke.dev</a>
      </div>
    </div>
    <h2>Haftungsausschluss</h2>
    <h3>Haftung für Inhalte</h3>
    <p>
      Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die
      Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch
      keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 DDG
      für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
      verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch
      nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
      überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
      Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
      Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon
      unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt
      der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
      von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
      entfernen.
    </p>
    <h3>Haftung für Links</h3>
    <p>
      Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
      Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
      Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
      Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
      verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung
      auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum
      Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche
      Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte
      einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
      Rechtsverletzungen werden wir derartige Links umgehend entfernen.
    </p>
    <h3>Urheberrecht</h3>
    <p>
      Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
      Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
      Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen
      des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen
      Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den
      privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf
      dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
      Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
      gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung
      aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei
      Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend
      entfernen.
    </p>
    <h3>Datenschutz</h3>
    <p>
      Die Nutzung unserer Webseite ist in der Regel ohne Angabe
      personenbezogener Daten möglich. Soweit auf unseren Seiten
      personenbezogene Daten (beispielsweise Name, Anschrift oder
      eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf
      freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung
      nicht an Dritte weitergegeben.
      <br />
      Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der
      Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein
      lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht
      möglich.
      <br />
      Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten
      Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich
      angeforderter Werbung und Informationsmaterialien wird hiermit
      ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich
      ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von
      Werbeinformationen, etwa durch Spam-Mails, vor.
    </p>
    <p>
      Website Impressum erstellt durch
      <a
        href="https://www.impressum-generator.de"
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        impressum-generator.de</a
      >
      von der
      <a
        href="https://www.kanzlei-hasselbach.de/"
        target="_blank"
        rel="noopener noreferrer nofollow"
        >Kanzlei Hasselbach</a
      >.
    </p>
    `;
}

/**
 * Generates the HTML template for the privacy policy section of the website.
 *
 * @returns {string} The HTML string for the privacy policy section.
 */
export function renderImprintTemplateEN() {
  return /*html*/ `
     <div class="imprint">
     <div class="header">
      <h1>Imprint</h1>
      <p>Information according to § 5 DDG</p>
    </div>
    <div class="address">
      <div>Mirko Rinke</div>
      <div>Maschstraße 7</div>
      <div>31199 Diekholzen</div>
    </div>
    <div class="representedBy">
      <div><strong>Represented by:</strong></div>
      <div>Mirko Rinke</div>
    </div>
    <div class="contact">
      <div><strong>Contact:</strong></div>
      <div>
        Email:
        <a href="mailto:contact@mirkorinke.dev">contact&#64;mirkorinke.dev</a>
      </div>
    </div>
    <h2>Disclaimer</h2>
    <h3>Liability for content</h3>
    <p>
      The contents of our pages were created with the greatest care. However, we
      cannot guarantee the accuracy, completeness, and timeliness of the
      content. As a service provider, we are responsible for our own content on
      these pages according to § 7 Abs.1 DDG under general laws. According to §§
      8 to 10 DDG, we are not obligated as a service provider to monitor
      transmitted or stored third-party information or to investigate
      circumstances that indicate illegal activity. Obligations to remove or
      block the use of information under general laws remain unaffected.
      However, liability in this regard is only possible from the time of
      knowledge of a specific infringement. Upon becoming aware of such
      violations, we will remove this content immediately.
    </p>
    <h3>Liability for links</h3>
    <p>
      Our offer contains links to external websites of third parties, on whose
      contents we have no influence. Therefore, we cannot assume any liability
      for these external contents. The respective provider or operator of the
      pages is always responsible for the contents of the linked pages. The
      linked pages were checked for possible legal violations at the time of
      linking. Illegal contents were not recognizable at the time of linking. A
      permanent content control of the linked pages is not reasonable without
      concrete evidence of a violation of the law. Upon becoming aware of legal
      violations, we will remove such links immediately.
    </p>
    <h3>Copyright</h3>
    <p>
      The content and works created by the site operators on these pages are
      subject to German copyright law. The duplication, processing,
      distribution, and any kind of exploitation outside the limits of copyright
      require the written consent of the respective author or creator. Downloads
      and copies of this site are only permitted for private, non-commercial
      use. Insofar as the content on this site was not created by the operator,
      the copyrights of third parties are respected. In particular, third-party
      content is marked as such. Should you nevertheless become aware of a
      copyright infringement, please inform us accordingly. Upon becoming aware
      of legal violations, we will remove such content immediately.
    </p>
    <h3>Data protection</h3>
    <p>
      The use of our website is usually possible without providing personal
      data. Insofar as personal data (for example, name, address, or email
      addresses) are collected on our pages, this is always done on a voluntary
      basis as far as possible. These data will not be passed on to third
      parties without your express consent.
      <br />
      We point out that data transmission over the Internet (e.g., communication
      by email) can have security gaps. A complete protection of the data from
      access by third parties is not possible.
      <br />
      The use of contact data published within the framework of the imprint
      obligation by third parties for sending unsolicited advertising and
      information materials is hereby expressly prohibited. The operators of the
      pages expressly reserve the right to take legal action in the event of
      unsolicited sending of advertising information, such as spam emails.
    </p>
    <p>
      Website imprint created by
      <a
        href="https://www.impressum-generator.de"
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        impressum-generator.de</a
      >
      from the
      <a
        href="https://www.kanzlei-hasselbach.de/"
        target="_blank"
        rel="noopener noreferrer nofollow"
        >Kanzlei Hasselbach</a
      >.
    </p>
    `;
}

/**
 * Renders the privacy policy template.
 *
 * @returns {string} The HTML string for the privacy policy template.
 */
export function renderPrivacyPolicyTemplateDE() {
  return /*html*/ `
    <div class="privacyPolicy">
    <h1>Datenschutzerklärung</h1>
    <h2>1. Datenschutz auf einen Blick</h2>
    <h3>Allgemeine Hinweise</h3>
    <p>
      Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit
      Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
      Personenbezogene Daten sind alle Daten, mit denen Sie persönlich
      identifiziert werden können. Ausführliche Informationen zum Thema
      Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten
      Datenschutzerklärung.
    </p>
    <h3>Datenerfassung auf dieser Website</h3>
    <h4>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
    <p>
      Die Datenverarbeitung auf dieser Website erfolgt durch den
      Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis
      zur Verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen.
    </p>
    <h4>Wie erfassen wir Ihre Daten?</h4>
    <p>
      Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen.
      Hierbei kann es sich z. B. um Daten handeln, die Sie in ein
      Kontaktformular eingeben.
    </p>
    <p>
      Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch
      der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische
      Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des
      Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie
      diese Website betreten.
    </p>
    <h4>Wofür nutzen wir Ihre Daten?</h4>
    <p>
      Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der
      Website zu gewährleisten. Andere Daten können zur Analyse Ihres
      Nutzerverhaltens verwendet werden. Sofern über die Website Verträge
      geschlossen oder angebahnt werden können, werden die übermittelten Daten
      auch für Vertragsangebote, Bestellungen oder sonstige Auftragsanfragen
      verarbeitet.
    </p>
    <h4>Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>
    <p>
      Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft,
      Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu
      erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung
      dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur
      Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit
      für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten
      Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten
      zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der
      zuständigen Aufsichtsbehörde zu.
    </p>
    <p>
      Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich
      jederzeit an uns wenden.
    </p>
    <h2>2. Hosting</h2>
    <p>Wir hosten die Inhalte unserer Website bei folgendem Anbieter:</p>
    <h3>IONOS</h3>
    <p>
      Anbieter ist die IONOS SE, Elgendorfer Str. 57, 56410 Montabaur
      (nachfolgend IONOS). Wenn Sie unsere Website besuchen, erfasst IONOS
      verschiedene Logfiles inklusive Ihrer IP-Adressen. Details entnehmen Sie
      der Datenschutzerklärung von IONOS:
      <a
        href="https://www.ionos.de/terms-gtc/terms-privacy"
        target="_blank"
        rel="noopener noreferrer nofollow"
        >https://www.ionos.de/terms-gtc/terms-privacy</a
      >.
    </p>
    <p>
      Die Verwendung von IONOS erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f
      DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst
      zuverlässigen Darstellung unserer Website. Sofern eine entsprechende
      Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf
      Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die
      Einwilligung die Speicherung von Cookies oder den Zugriff auf
      Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im
      Sinne des TDDDG umfasst. Die Einwilligung ist jederzeit widerrufbar.
    </p>

    <h2>3. Allgemeine Hinweise und Pflicht&shy;informationen</h2>
    <h3>Datenschutz</h3>
    <p>
      Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten
      sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und
      entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser
      Datenschutzerklärung.
    </p>
    <p>
      Wenn Sie diese Website benutzen, werden verschiedene personenbezogene
      Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich
      identifiziert werden können. Die vorliegende Datenschutzerklärung
      erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie
      erläutert auch, wie und zu welchem Zweck das geschieht.
    </p>
    <p>
      Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei
      der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein
      lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht
      möglich.
    </p>
    <h3>Hinweis zur verantwortlichen Stelle</h3>
    <p>
      Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website
      ist:
    </p>
    <p>
      Mirko Rinke<br />
      Maschstraße 7<br />
      31199 Diekholzen
    </p>
    <a href="mailto:contact@mirkorinke.dev">contact&#64;mirkorinke.dev</a>
    <p>
      Verantwortliche Stelle ist die natürliche oder juristische Person, die
      allein oder gemeinsam mit anderen über die Zwecke und Mittel der
      Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o.
      Ä.) entscheidet.
    </p>

    <h3>Speicherdauer</h3>
    <p>
      Soweit innerhalb dieser Datenschutzerklärung keine speziellere
      Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei
      uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein
      berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur
      Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine
      anderen rechtlich zulässigen Gründe für die Speicherung Ihrer
      personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche
      Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach
      Fortfall dieser Gründe.
    </p>
    <h3>
      Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf
      dieser Website
    </h3>
    <p>
      Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir
      Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO
      bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach
      Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer ausdrücklichen
      Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten
      erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1
      lit. a DSGVO. Sofern Sie in die Speicherung von Cookies oder in den
      Zugriff auf Informationen in Ihr Endgerät (z. B. via
      Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung
      zusätzlich auf Grundlage von § 25 Abs. 1 TDDDG. Die Einwilligung ist
      jederzeit widerrufbar. Sind Ihre Daten zur Vertragserfüllung oder zur
      Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir Ihre
      Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren
      verarbeiten wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen
      Verpflichtung erforderlich sind auf Grundlage von Art. 6 Abs. 1 lit. c
      DSGVO. Die Datenverarbeitung kann ferner auf Grundlage unseres
      berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen. Über die
      jeweils im Einzelfall einschlägigen Rechtsgrundlagen wird in den folgenden
      Absätzen dieser Datenschutzerklärung informiert.
    </p>
    <h3>Empfänger von personenbezogenen Daten</h3>
    <p>
      Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit verschiedenen
      externen Stellen zusammen. Dabei ist teilweise auch eine Übermittlung von
      personenbezogenen Daten an diese externen Stellen erforderlich. Wir geben
      personenbezogene Daten nur dann an externe Stellen weiter, wenn dies im
      Rahmen einer Vertragserfüllung erforderlich ist, wenn wir gesetzlich
      hierzu verpflichtet sind (z. B. Weitergabe von Daten an Steuerbehörden),
      wenn wir ein berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO an der
      Weitergabe haben oder wenn eine sonstige Rechtsgrundlage die
      Datenweitergabe erlaubt. Beim Einsatz von Auftragsverarbeitern geben wir
      personenbezogene Daten unserer Kunden nur auf Grundlage eines gültigen
      Vertrags über Auftragsverarbeitung weiter. Im Falle einer gemeinsamen
      Verarbeitung wird ein Vertrag über gemeinsame Verarbeitung geschlossen.
    </p>
    <h3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
    <p>
      Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen
      Einwilligung möglich. Sie können eine bereits erteilte Einwilligung
      jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten
      Datenverarbeitung bleibt vom Widerruf unberührt.
    </p>
    <h3>
      Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen
      Direktwerbung (Art. 21 DSGVO)
    </h3>
    <p>
      WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F
      DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS
      IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER
      PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF
      DIESE BESTIMMUNGEN GESTÜTZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE,
      AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER
      DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE
      BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN,
      WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN,
      DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN ODER DIE
      VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON
      RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).
    </p>
    <p>
      WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU
      BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE
      VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE
      DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING, SOWEIT ES
      MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE WIDERSPRECHEN,
      WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT MEHR ZUM ZWECKE
      DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).
    </p>
    <h3>Beschwerde&shy;recht bei der zuständigen Aufsichts&shy;behörde</h3>
    <p>
      Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein
      Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem
      Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder
      des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht
      unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher
      Rechtsbehelfe.
    </p>
    <h3>Recht auf Daten&shy;übertrag&shy;barkeit</h3>
    <p>
      Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder
      in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an
      einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu
      lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen
      Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar
      ist.
    </p>
    <h3>Auskunft, Berichtigung und Löschung</h3>
    <p>
      Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das
      Recht auf unentgeltliche Auskunft über Ihre gespeicherten
      personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der
      Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser
      Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten
      können Sie sich jederzeit an uns wenden.
    </p>
    <h3>Recht auf Einschränkung der Verarbeitung</h3>
    <p>
      Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer
      personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit an
      uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in
      folgenden Fällen:
    </p>
    <ul>
      <li>
        Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen
        Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu
        überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die
        Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu
        verlangen.
      </li>
      <li>
        Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig
        geschah/geschieht, können Sie statt der Löschung die Einschränkung der
        Datenverarbeitung verlangen.
      </li>
      <li>
        Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie
        jedoch zur Ausübung, Verteidigung oder Geltendmachung von
        Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die
        Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu
        verlangen.
      </li>
      <li>
        Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben,
        muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen
        werden. Solange noch nicht feststeht, wessen Interessen überwiegen,
        haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer
        personenbezogenen Daten zu verlangen.
      </li>
    </ul>
    <p>
      Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt
      haben, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit
      Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von
      Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder
      juristischen Person oder aus Gründen eines wichtigen öffentlichen
      Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet
      werden.
    </p>
    <h3>SSL- bzw. TLS-Verschlüsselung</h3>
    <p>
      Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
      vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die
      Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung.
      Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile
      des Browsers von „http://“ auf „https://“ wechselt und an dem
      Schloss-Symbol in Ihrer Browserzeile.
    </p>
    <p>
      Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten,
      die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
    </p>
    <p>
      Quelle:
      <a
        href="https://www.e-recht24.de"
        target="_blank"
        rel="noopener noreferrer nofollow"
        >https://www.e-recht24.de</a
      >
    </p>
  </div>
    </div>
`;
}

/**
 * Renders the imprint template in English.
 * @returns {string} The HTML string for the imprint template.
 */
export function renderPrivacyPolicyTemplateEN() {
  return /*html*/ `
  <div class="privacyPolicy">
      <h1>Privacy Policy</h1>
      <h2>1. Data Protection at a Glance</h2>
      <h3>General Information</h3>
      <p>
        The following information provides a simple overview of what happens to
        your personal data when you visit this website. Personal data refers to
        all data that can personally identify you. Detailed information on the
        topic of data protection can be found in our privacy policy listed below
        this text.
      </p>
      <h3>Data Collection on This Website</h3>
      <h4>Who is responsible for the data collection on this website?</h4>
      <p>
        The data processing on this website is carried out by the website
        operator. The operator's contact details can be found in the section
        "Information on the Responsible Party" in this privacy policy.
      </p>
      <h4>How do we collect your data?</h4>
      <p>
        Your data is collected on the one hand when you provide it to us. This
        could, for example, involve data you enter in a contact form.
      </p>
      <p>
        Other data is collected automatically or with your consent when you visit
        the website through our IT systems. This data primarily includes technical
        data (e.g., internet browser, operating system, or the time of the page
        access). This data is collected automatically as soon as you enter this
        website.
      </p>
      <h4>What do we use your data for?</h4>
      <p>
        Part of the data is collected to ensure error-free provision of the
        website. Other data can be used to analyze your user behavior. If
        contracts can be concluded or initiated via the website, the transmitted
        data will also be processed for contract offers, orders, or other
        inquiries.
      </p>
      <h4>What rights do you have regarding your data?</h4>
      <p>
        You have the right at any time to receive free information about the
        origin, recipient, and purpose of your stored personal data. You also have
        the right to request the correction or deletion of this data. If you have
        given your consent to data processing, you can revoke this consent at any
        time for the future. Furthermore, you have the right, under certain
        circumstances, to demand the restriction of the processing of your
        personal data. Additionally, you have the right to lodge a complaint with
        the competent supervisory authority.
      </p>
      <p>
        For this and other questions on the topic of data protection, you can
        contact us at any time.
      </p>
      <h2>2. Hosting</h2>
      <p>We host the content of our website with the following provider:</p>
      <h3>IONOS</h3>
      <p>
        The provider is IONOS SE, Elgendorfer Str. 57, 56410 Montabaur
        (hereinafter IONOS). When you visit our website, IONOS collects various
        log files, including your IP addresses. For details, please refer to the
        IONOS privacy policy:
        <a
          href="https://www.ionos.de/terms-gtc/terms-privacy"
          target="_blank"
          rel="noopener noreferrer nofollow"
          >https://www.ionos.de/terms-gtc/terms-privacy</a
        >.
      </p>
      <p>
        The use of IONOS is based on Art. 6(1)(f) GDPR. We have a legitimate
        interest in the most reliable presentation of our website. If consent has
        been requested, processing takes place exclusively on the basis of Art.
        6(1)(a) GDPR and § 25(1) TDDG, insofar as consent includes the storage of
        cookies or access to information in the user's end device (e.g., device
        fingerprinting) within the meaning of the TDDG. Consent can be revoked at
        any time.
      </p>

      <h2>3. General Information and Mandatory Information</h2>
      <h3>Data Protection</h3>
      <p>
        The operators of these pages take the protection of your personal data
        very seriously. We treat your personal data confidentially and in
        accordance with statutory data protection regulations and this privacy
        policy.
      </p>
      <p>
        When you use this website, various personal data is collected. Personal
        data refers to data that can personally identify you. This privacy policy
        explains what data we collect and what we use it for. It also explains how
        and for what purpose this is done.
      </p>
      <p>
        We would like to point out that data transmission over the Internet (e.g.
        communication by e-mail) can have security gaps. A complete protection of
        data against access by third parties is not possible.
      </p>
      <h3>Information on the Responsible Party</h3>
      <p>The responsible party for data processing on this website is:</p>
      <p>
        Mirko Rinke<br />
        Maschstraße 7<br />
        31199 Diekholzen
      </p>
      <a href="mailto:contact@mirkorinke.dev">contact&#64;mirkorinke.dev</a>
      <p>
        The responsible party is the natural or legal person who, alone or jointly
        with others, decides on the purposes and means of processing personal data
        (e.g., names, e-mail addresses, etc.).
      </p>

      <h3>Storage Duration</h3>
      <p>
        Unless a specific storage period has been specified within this privacy
        policy, your personal data will remain with us until the purpose for
        processing the data no longer applies. If you assert a legitimate request
        for deletion or revoke your consent to data processing, your data will be
        deleted unless we have other legally permissible reasons for storing your
        personal data (e.g., tax or commercial retention periods); in the latter
        case, the deletion will take place after these reasons cease to apply.
      </p>
      <h3>General Information on Data Processing on This Website</h3>
      <p>
        If you have given your consent to data processing, we will process your
        personal data on the basis of Art. 6(1)(a) GDPR or Art. 9(2)(a) GDPR if
        special categories of data are processed in accordance with Art. 9(1)
        GDPR. In the event of an explicit consent to the transfer of personal data
        to third countries, data processing is also based on Art. 49(1)(a) GDPR.
        If you have consented to the storage of cookies or access to information
        on your end device (e.g., via device fingerprinting), data processing is
        also based on § 25(1) TDDG. Consent can be revoked at any time. If your
        data is required for the fulfillment of a contract or for the
        implementation of pre-contractual measures, we will process your data on
        the basis of Art. 6(1)(b) GDPR. Furthermore, we will process your data if
        this is necessary to fulfill a legal obligation on the basis of Art.
        6(1)(c) GDPR. Data processing may also be carried out on the basis of our
        legitimate interest pursuant to Art. 6(1)(f) GDPR. The relevant legal
        bases in each individual case are provided in the following paragraphs of
        this privacy policy.
      </p>
      <h3>Recipients of Personal Data</h3>
      <p>
        In the course of our business activities, we work with various external
        entities. In some cases, it is necessary to transfer personal data to
        these external entities. We only pass on personal data to external
        entities if this is necessary for the fulfillment of a contract, if we are
        legally obliged to do so (e.g., disclosure of data to tax authorities), if
        we have a legitimate interest pursuant to Art. 6(1)(f) GDPR in the
        disclosure, or if another legal basis permits the data transfer. When
        using processors, we only pass on personal data of our customers on the
        basis of a valid contract for order processing. In the case of joint
        processing, a joint processing agreement is concluded.
      </p>
      <h3>Revocation of Your Consent to Data Processing</h3>
      <p>
        Many data processing operations are only possible with your express
        consent. You can revoke your consent at any time. The legality of the data
        processing carried out before the revocation remains unaffected by the
        revocation.
      </p>
      <h3>
        Right to Object to the Collection of Data in Special Cases and to Direct
        Advertising (Art. 21 GDPR)
      </h3>
      <p>
        IF DATA PROCESSING IS CARRIED OUT ON THE BASIS OF ART. 6(1)(E) OR (F)
        GDPR, YOU HAVE THE RIGHT TO OBJECT TO THE PROCESSING OF YOUR PERSONAL DATA
        AT ANY TIME FOR REASONS ARISING FROM YOUR PARTICULAR SITUATION; THIS ALSO
        APPLIES TO PROFILING BASED ON THESE PROVISIONS. THE RESPECTIVE LEGAL BASIS
        ON WHICH PROCESSING IS BASED CAN BE FOUND IN THIS PRIVACY POLICY. IF YOU
        OBJECT, WE WILL NO LONGER PROCESS YOUR PERSONAL DATA UNLESS WE CAN
        DEMONSTRATE COMPELLING LEGITIMATE GROUNDS FOR THE PROCESSING THAT OVERRIDE
        YOUR INTERESTS, RIGHTS, AND FREEDOMS OR FOR THE ESTABLISHMENT, EXERCISE,
        OR DEFENSE OF LEGAL CLAIMS (OBJECTION PURSUANT TO ART. 21(1) GDPR).
      </p>
      <p>
        IF YOUR PERSONAL DATA IS PROCESSED FOR THE PURPOSE OF DIRECT ADVERTISING,
        YOU HAVE THE RIGHT TO OBJECT AT ANY TIME TO THE PROCESSING OF PERSONAL
        DATA CONCERNING YOU FOR THE PURPOSE OF SUCH ADVERTISING; THIS ALSO APPLIES
        TO PROFILING INSOFAR AS IT IS RELATED TO SUCH DIRECT ADVERTISING. IF YOU
        OBJECT, YOUR PERSONAL DATA WILL SUBSEQUENTLY NO LONGER BE USED FOR THE
        PURPOSE OF DIRECT ADVERTISING (OBJECTION PURSUANT TO ART. 21(2) GDPR).
      </p>
      <h3>Right to Lodge a Complaint with the Competent Supervisory Authority</h3>
      <p>
        In the event of violations of the GDPR, data subjects have the right to
        lodge a complaint with a supervisory authority, in particular in the
        Member State of their habitual residence, place of work, or place of the
        alleged violation. The right to lodge a complaint is without prejudice to
        other administrative or judicial remedies.
      </p>
      <h3>Right to Data Portability</h3>
      <p>
        You have the right to have data that we process automatically on the basis
        of your consent or in fulfillment of a contract handed over to you or to a
        third party in a common, machine-readable format. If you request the
        direct transfer of the data to another responsible party, this will only
        be done to the extent that it is technically feasible.
      </p>
      <h3>Information, Correction, and Deletion</h3>
      <p>
        Within the framework of the applicable legal provisions, you have the
        right to free information about your stored personal data, its origin and
        recipient, and the purpose of data processing and, if necessary, a right
        to correct or delete this data. For this and other questions on the topic
        of personal data, you can contact us at any time.
      </p>
      <h3>Right to Restriction of Processing</h3>
      <p>
        You have the right to request the restriction of the processing of your
        personal data. To do so, you can contact us at any time. The right to
        restrict processing exists in the following cases:
      </p>
      <ul>
        <li>
          If you dispute the accuracy of your personal data stored with us, we
          usually need time to verify this. For the duration of the examination,
          you have the right to request the restriction of the processing of your
          personal data.
        </li>
        <li>
          If the processing of your personal data was/is unlawful, you can request
          the restriction of data processing instead of deletion.
        </li>
        <li>
          If we no longer need your personal data, but you need it for the
          exercise, defense, or assertion of legal claims, you have the right to
          request the restriction of the processing of your personal data instead
          of deletion.
        </li>
        <li>
          If you have lodged an objection pursuant to Art. 21(1) GDPR, a balance
          must be struck between your interests and ours. As long as it is not yet
          clear whose interests prevail, you have the right to request the
          restriction of the processing of your personal data.
        </li>
      </ul>
      <p>
        If you have restricted the processing of your personal data, these data –
        apart from their storage – may only be processed with your consent or for
        the establishment, exercise, or defense of legal claims or for the
        protection of the rights of another natural or legal person or for reasons
        of important public interest of the European Union or a Member State.
      </p>
      <h3>SSL or TLS Encryption</h3>
      <p>
        For security reasons and to protect the transmission of confidential
        content, such as orders or inquiries that you send to us as the website
        operator, this site uses SSL or TLS encryption. You can recognize an
        encrypted connection by the fact that the address line of the browser
        changes from "http://" to "https://" and by the lock symbol in your
        browser line.
      </p>
      <p>
        If SSL or TLS encryption is activated, the data you transmit to us cannot
        be read by third parties.
      </p>
      <p>
        Source:
        <a
          href="https://www.e-recht24.de"
          target="_blank"
          rel="noopener noreferrer nofollow"
          >https://www.e-recht24.de</a
        >
      </p>
    </div>
  </div>
`;
}

/**
 * Renders the navigation template for the Pokedex application.
 *
 * @param {string} currentLanguage - The current language setting for the application.
 * @param {string} placeholderText - The placeholder text for the user name input field.
 * @returns {string} The HTML string for the navigation template.
 */
export function renderNavTemplate(currentLanguage, placeholderText) {
  return /*html*/ `
      <img onclick="backToHome()" tabindex="101" class="homeButton item" src="./assets/icons/home.png" alt="" />
      <div id="search" class="search">
        <label onclick="pokemonSearchButton()" class="searchLabel" for="pokemonSearchInput"><img class="searchIcon" src="./assets/icons/pokeballArrow.png" alt="" /></label>
        <input tabindex="102" class="pokemonSearchInput" id="pokemonSearchInput" type="text" autocomplete="off" />
        <div id="searchSuggestions" class="searchSuggestions d_none"></div>
      </div>
      <div id="pokemonRegions" class="pokemonRegions">
      <img tabindex="150" onclick="toggleRegionsMenu()" class="pokemonRegionsIcon" src="./assets/icons/regions${currentLanguage.replace('"', ' ')}.png" alt="" />
      <div id="selectedPokemonRegions" class="selectedPokemonRegions d_none">
        <img tabindex="151" src="./assets/icons/kanto${currentLanguage.replace('"', ' ')}.png" alt="" onclick="selectedPokemonLimit(1,11,151)" />
        <img tabindex="152" src="./assets/icons/johto${currentLanguage.replace('"', ' ')}.png" alt="" onclick="selectedPokemonLimit(152,162,251)" />
        <img tabindex="153" src="./assets/icons/hoenn${currentLanguage.replace('"', ' ')}.png" alt="" onclick="selectedPokemonLimit(252,262,386)" />
        <img tabindex="154" src="./assets/icons/sinnoh${currentLanguage.replace('"', ' ')}.png" alt="" onclick="selectedPokemonLimit(387,397,493)" />
        <img tabindex="155" src="./assets/icons/einall${currentLanguage.replace('"', ' ')}.png" alt="" onclick="selectedPokemonLimit(494,504,649)" />
        <img tabindex="156" src="./assets/icons/kalos${currentLanguage.replace('"', ' ')}.png" alt="" onclick="selectedPokemonLimit(650,660,721)" />
        <img tabindex="157" src="./assets/icons/alola${currentLanguage.replace('"', ' ')}.png" alt="" onclick="selectedPokemonLimit(722,732,809)" />
        <img tabindex="158" src="./assets/icons/galar${currentLanguage.replace('"', ' ')}.png" alt="" onclick="selectedPokemonLimit(810,820,898)" />
        <img tabindex="159" src="./assets/icons/paldea${currentLanguage.replace('"', ' ')}.png" alt="" onclick="selectedPokemonLimit(899,909,1026)" />
      </div>
      </div>
      <div id="yourName" class="yourName">
      <input tabindex="160" class="userNameInput" id="userNameInput" type="text" autocomplete="off" placeholder="${placeholderText}" />
      <label onclick="getUserName()" class="yourNameLabel" for="userNameInput"><img class="yourNameIcon" src="./assets/icons/yourName.gif" alt="" /></label>
      </div>
      <div id="languageSettings" class="languageSettings">
        <img style="display: none" tabindex="161" id="languageSettingsJa" onclick="selectedLanguage('ja')" src="./assets/icons/jp.svg" alt="" />
        <img tabindex="162" id="languageSettingsEn" onclick="selectedLanguage('en')" src="./assets/icons/us.svg" alt="" />
        <img tabindex="163" id="languageSettingsDe" onclick="selectedLanguage('de')" src="./assets/icons/de.svg" alt="" />
      </div>
  `;
}

/**
 * Renders the footer template with the appropriate language-specific icons.
 *
 * @param {string} currentLanguage - The current language code to be used for selecting the appropriate icons.
 * @returns {string} The HTML string for the footer template.
 */
export function renderFooterTemplate(currentLanguage) {
  return /*html*/ `   
      <img tabindex="201" onclick="renderImprint()" src="./assets/icons/imprint${currentLanguage.replace('"', ' ')}.png" alt="" />
      <img tabindex="202" onclick="renderPrivacyPolicy()" src="./assets/icons/privacyPolicy${currentLanguage.replace('"', ' ')}.png" alt="" />
  `;
}
