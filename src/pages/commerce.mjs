const faq = (items) => `
  <div class="faq-list">
    ${items.map(([question, answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join('')}
  </div>`;

const sellerFaq = [
  ['Қандай заттарды сатуға болады?', 'Киім, үйге арналған бұйымдар, кітаптар, техника және басқа да қолданылған заттарды ұсынуға болады. Хабарландыруда заттың жағдайын, жиынтығын және байқалған кемшіліктерін ашық жазыңыз.'],
  ['Жақсы хабарландыруды қалай дайындаймын?', 'Затты күндізгі жарықта бірнеше қырынан түсіріңіз. Атауы, өлшемі, жағдайы, бағасы және орналасқан қаласы туралы нақты ақпарат қосыңыз. Кемшіліктері болса, оларды бөлек көрсетіңіз.'],
  ['Бағаны қалай таңдаймын?', 'Заттың жағдайын, қолданылған уақытын және ұқсас ұсыныстарды ескеріңіз. Келісуге дайын болсаңыз, оны сипаттамада белгілеңіз. Соңғы баға сатып алушымен келісу арқылы анықталады.'],
  ['Сатып алушымен қалай келісемін?', 'Кездесу орнын, уақытын және затты беру тәсілін сатып алушымен тікелей талқылаңыз. Затты қарап шығуға мүмкіндік беріңіз. Бұл оқу нұсқасында төлем немесе жеткізу рәсімделмейді.'],
];

const buyerFaq = [
  ['Іздеуді неден бастаймын?', 'Қандай зат керек екенін, қолайлы баға аралығын және қаланы анықтаңыз. Осы беттегі қадамдар сатып алуға дайындалуға көмектеседі. Нақты ұсыныс кездескенде, суреттері мен сипаттамасын мұқият қарап шығыңыз.'],
  ['Заттың жағдайын қалай анықтаймын?', 'Сатушыдан нақты суреттерін, өлшемдерін, жиынтығын және кемшіліктерін сұраңыз. Техника болса, жұмысын тексеруді келісіңіз. Мүмкіндігінше, шешім қабылдар алдында затты өзіңіз көріңіз.'],
  ['Бағаны келісуге бола ма?', 'Иә, егер сатушы келісуге дайын болса. Ұсынысыңызды сыпайы айтыңыз және бағаны заттың жағдайы мен жинақтылығына сүйеніп талқылаңыз.'],
  ['Жеткізу мен төлемді кім ұйымдастырады?', 'Затты беру тәсілі мен есеп айырысуды сатушы және сатып алушы өзара келіседі. Бұл оқу нұсқасы жеткізу немесе төлем қызметін ұсынбайды.'],
];

const serviceFaq = [
  ['Ақылы қызмет не үшін керек?', 'Қосымша орналастыру тәсілдері хабарландыруды ерекшелеуге арналған. Нақты әсер ұсынысқа және сатып алушының қызығушылығына байланысты; сатылуға кепілдік берілмейді.'],
  ['Қызмет мерзімін қалай таңдаймын?', 'Калькуляторда 1–30 күн аралығын таңдаңыз. Әдепкі мерзім — 7 күн. Қызмет пен мерзімді ауыстырғанда көрсетілген жалпы сома автоматты түрде жаңарады.'],
  ['Калькулятордағы баға нақты ма?', 'Көрсетілген тарифтер осы оқу жобасына арналған үлгі: ерекшелеу — 250 ₸/күн, жоғары орналастыру — 400 ₸/күн, екеуі бірге — 550 ₸/күн. Бұл коммерциялық оферта емес.'],
  ['Осы беттен төлем жасауға бола ма?', 'Жоқ. Калькулятор таңдаған қызметтің үлгі құнын есептейді. «Хабарландыру беру» батырмасы сатуға дайындалу қадамдары жазылған сатушы бетіне апарады. Төлем қабылданбайды.'],
];

export const commercePages = [
  {
    file: 'seller.html',
    title: 'Сатушыға',
    description: 'Қолданылмай тұрған затқа жаңа иесін табыңыз. Ainalym сатушысына арналған қадамдар, кеңестер және жиі қойылатын сұрақтар.',
    body: `
      <section class="page-hero section">
        <div class="container split-panel">
          <div>
            <p class="eyebrow">Сатушыға</p>
            <h1 class="display-title">Сізде бос тұрған зат.<br>Біреудің іздегені.</h1>
            <p class="lead">Сөреге сыймай қалған кітап, жаңасына ауысқан орындық, киілмейтін күрте. Олардың тарихы осы жерде аяқталмасын.</p>
            <div class="hero-actions">
              <a class="button" data-type="primary" href="#seller-steps">Қадамдарды қарау <span aria-hidden="true">↓</span></a>
              <a class="text-link" href="#seller-steps">Қалай бастауға болады <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <div class="story-card hero-story">
            <span class="icon-badge" aria-hidden="true">↻</span>
            <p class="section-kicker">Заттың жаңа тарауы</p>
            <h2>Сіз үшін артық.<br>Біреу үшін дәл керек.</h2>
            <p>Үйде орын ашу — шағын өзгеріс. Ал сол затқа басқа үйден орын табу — жақсы жалғасы.</p>
            <a class="text-link" href="buyer.html">Сатып алушының жолы <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section class="section" id="seller-steps">
        <div class="container">
          <div class="section-heading"><p class="section-kicker">Үш қарапайым қадам</p><h2>Затыңыздың келесі иесіне жол ашыңыз.</h2><p>Сәтті хабарландыру түсінікті ақпараттан басталады.</p></div>
          <div class="story-grid">
            <article class="story-card"><span class="step-number">01</span><h3>Дайындаңыз</h3><p>Затты тазалап, жарық жерде суретке түсіріңіз. Әр қырын, маңызды бөлшектерін және кемшіліктерін көрсетіңіз.</p><span class="section-kicker">Нақты сурет · Ашық ақпарат</span></article>
            <article class="story-card"><span class="step-number">02</span><h3>Әңгімесін жазыңыз</h3><p>Атауын, жағдайын, өлшемін және бағасын сипаттаңыз. Қай қалада екеніңізді, нені бірге беретініңізді нақтылаңыз.</p><span class="section-kicker">Түсінікті сипаттама · Әділ баға</span></article>
            <article class="story-card"><span class="step-number">03</span><h3>Жаңа иесін табыңыз</h3><p>Сұрақтарға жауап беріңіз, баға мен кездесу шарттарын келісіңіз. Затты қарап шығуға мүмкіндік беріңіз.</p><span class="section-kicker">Тікелей байланыс · Өзара келісім</span></article>
          </div>
        </div>
      </section>

      <section class="section" id="advantages">
        <div class="container">
          <div class="section-heading"><p class="section-kicker">Сатудың жақсы жақтары</p><h2>Үйіңізге орын.<br>Затыңызға мүмкіндік.</h2></div>
          <div class="card-grid">
            <article class="feature-card"><span class="icon-badge" aria-hidden="true">＋</span><h3>Кеңістік босатыңыз</h3><p>Қолданылмай тұрған заттармен қоштасып, күнделікті өмірге қажет дүниелерге орын қалдырыңыз.</p></article>
            <article class="feature-card"><span class="icon-badge" aria-hidden="true">₸</span><h3>Құнын қайтарыңыз</h3><p>Жақсы күйдегі затты өзіңіз таңдаған бағамен ұсыныңыз. Бағаны сатып алушымен талқылауға болады.</p></article>
            <article class="feature-card"><span class="icon-badge" aria-hidden="true">↻</span><h3>Қолданысын жалғастырыңыз</h3><p>Жарамды заттың басқа адамға қызмет етуіне мүмкіндік беріңіз. Қайта пайдалану осындай таңдаудан басталады.</p></article>
          </div>
          <p class="section-note">Хабарландыруыңызды ерекшелеудің үлгі нұсқаларын <a class="text-link" href="advantages.html#paid-services">ақылы қызметтер бетінен көріңіз <span aria-hidden="true">↗</span></a></p>
        </div>
      </section>

      <section class="section" id="faq">
        <div class="container split-panel">
          <div class="section-heading"><p class="section-kicker">Сұрақтар мен жауаптар</p><h2>Бастамас бұрын.</h2><p>Сату туралы жиі туатын сұрақтарға қысқа жауаптар.</p><a class="text-link" href="contacts.html">Бізбен байланысу <span aria-hidden="true">↗</span></a></div>
          ${faq(sellerFaq)}
        </div>
      </section>

      <section class="section"><div class="container cta-band"><div><p class="section-kicker">Жаңа тарау осы жерден</p><h2>Бір заттан бастаңыз.</h2><p>Үйіңіздегі қолданылмай тұрған затты есіңізге түсіріңіз. Біреу дәл соны іздеп жүрген шығар.</p></div><a class="button" data-type="primary" href="#seller-steps">Қадамдарды қарау <span aria-hidden="true">↑</span></a></div></section>
    `,
  },
  {
    file: 'advantages.html',
    title: 'Артықшылықтар және қызметтер',
    description: 'Ainalym артықшылықтары және хабарландыруды ерекшелеуге арналған үлгі тарифтердің интерактивті калькуляторы.',
    body: `
      <section class="page-hero section">
        <div class="container split-panel">
          <div><p class="eyebrow">Артықшылықтар</p><h1 class="display-title">Жақсы заттың<br>жолы жалғассын.</h1><p class="lead">Бір жерде артық болған дүние басқа жерде қажетке жарайды. Ainalym — сол екі адамды жақындатуға арналған кеңістік.</p><a class="button" data-type="primary" data-action="view" href="buyer.html">Сатып алу жолын білу <span aria-hidden="true">↗</span></a></div>
          <div class="story-card hero-story"><span class="icon-badge" aria-hidden="true">↻</span><p class="section-kicker">Қайта пайдаланудың мәні</p><h2>Зат жаңа болмауы мүмкін.<br>Мүмкіндігі жаңа.</h2><p>Кітаптың келесі оқырманы, үстелдің келесі үйі, велосипедтің келесі бағыты бар. Қолданылған затқа қайта қараңыз.</p></div>
        </div>
      </section>

      <section class="section" id="advantages">
        <div class="container"><div class="section-heading"><p class="section-kicker">Күнделікті пайдалы таңдау</p><h2>Екі жаққа да жақсы.</h2></div>
          <div class="card-grid">
            <article class="feature-card"><span class="icon-badge" aria-hidden="true">↗</span><h3>Сатушыға жаңа мүмкіндік</h3><p>Қолданылмай тұрған дүниені ұсыныңыз, үйде орын ашыңыз және бағасын өзіңіз таңдаңыз.</p><a class="text-link" href="seller.html">Сатушыға арналған бет <span aria-hidden="true">↗</span></a></article>
            <article class="feature-card"><span class="icon-badge" aria-hidden="true">♡</span><h3>Сатып алушыға жақсы олжа</h3><p>Қажет затыңызды қолданылған ұсыныстардың арасынан іздеңіз. Баға, жағдай және орналасқан жерін салыстырыңыз.</p><a class="text-link" href="buyer.html">Сатып алушыға арналған бет <span aria-hidden="true">↗</span></a></article>
            <article class="feature-card"><span class="icon-badge" aria-hidden="true">↻</span><h3>Затқа ұзақ қолданыс</h3><p>Бар дүниені қайта пайдалану жаңа зат алуға балама бола алады. Жарамды бұйымның тарихын жалғастырыңыз.</p></article>
          </div>
        </div>
      </section>

      <section class="section" id="paid-services">
        <div class="container split-panel">
          <div class="section-heading"><p class="section-kicker">Ақылы қызметтер · Үлгі тарифтер</p><h2>Хабарландыруыңызға<br>қосымша назар.</h2><p>Қызмет пен мерзімді таңдап, үлгі құнын есептеңіз. Үш нұсқа хабарландыруды әртүрлі тәсілмен көрсетуге арналған.</p><p class="pricing-disclaimer">Көрсетілген бағалар оқу жобасына арналған. Калькулятор төлем қабылдамайды және сатылуға кепілдік бермейді.</p></div>
          <form class="pricing-calculator" id="pricing-calculator">
            <fieldset><legend>Қызметті таңдаңыз</legend>
              <label class="service-option"><input type="radio" name="service" value="highlight" checked><span><strong>Ерекшелеу</strong><small>Хабарландыру карточкасына түс акценті</small></span><span class="service-price">250 ₸<small>/ күн</small></span></label>
              <label class="service-option"><input type="radio" name="service" value="top"><span><strong>Жоғары орналастыру</strong><small>Ұсынысты тізімнің басында көрсету</small></span><span class="service-price">400 ₸<small>/ күн</small></span></label>
              <label class="service-option"><input type="radio" name="service" value="combo"><span><strong>Екеуі бірге</strong><small>Ерекшелеу және жоғары орналастыру</small></span><span class="service-price">550 ₸<small>/ күн</small></span></label>
            </fieldset>
            <div class="range-heading"><label for="days">Қызмет мерзімі</label><output id="days-output" for="days">7 күн</output></div>
            <input type="range" id="days" name="days" min="1" max="30" value="7" aria-describedby="days-range-note">
            <div class="range-labels" id="days-range-note"><span>1 күн</span><span>30 күн</span></div>
            <div class="pricing-total" aria-live="polite" aria-atomic="true"><div><span>Үлгі құны</span><small><span id="daily-rate">250 ₸</span> / күн</small></div><strong id="price-total">1 750 ₸</strong></div>
            <a class="button" data-type="primary" data-action="publish" href="seller.html">Хабарландыру беру <span aria-hidden="true">↗</span></a>
            <p class="calculator-note">Есептеу: күндік тариф × күн саны. Нақты төлем жүргізілмейді.</p>
          </form>
        </div>
      </section>

      <section class="section" id="faq"><div class="container split-panel"><div class="section-heading"><p class="section-kicker">Қызметтер туралы</p><h2>Таңдау түсінікті<br>болсын.</h2><p>Тарифтер мен калькуляторға қатысты жауаптар.</p></div>${faq(serviceFaq)}</div></section>

      <section class="section"><div class="container cta-band"><div><p class="section-kicker">Айналымға қосылыңыз</p><h2>Үйдегі затқа жаңа жол.</h2><p>Сатыңыз, іздеңіз, қайта пайдаланыңыз. Қайта пайдаланудың өзіңізге сай жолын таңдаңыз.</p></div><a class="button" data-type="primary" href="seller.html">Сату жолын білу <span aria-hidden="true">↗</span></a></div></section>
    `,
  },
  {
    file: 'buyer.html',
    title: 'Сатып алушыға',
    description: 'Қолданылған заттар арасынан қажет дүниеңізді табыңыз. Сатып алушыға арналған қадамдар, кеңестер және жиі қойылатын сұрақтар.',
    body: `
      <section class="page-hero section">
        <div class="container split-panel">
          <div><p class="eyebrow">Сатып алушыға</p><h1 class="display-title">Жаңа болмаса да,<br>сізге дәл келеді.</h1><p class="lead">Кейде іздегеніңіз біреудің сөресінде тұрады. Жақсы күйдегі затқа, ұнамды бағаға және жаңа тарихқа мүмкіндік беріңіз.</p><div class="hero-actions"><a class="button" data-type="primary" href="index.html#categories">Санаттарды қарау <span aria-hidden="true">↗</span></a><a class="text-link" href="#how-it-works">Қалай таңдаймын <span aria-hidden="true">↓</span></a></div></div>
          <div class="story-card hero-story"><span class="icon-badge" aria-hidden="true">♡</span><p class="section-kicker">Табылған дүниенің қуанышы</p><h2>Керек зат.<br>Өзіне тән тарих.</h2><p>Жайлы кресло, көптен іздеген кітап, күнделікті серігіңіз болатын велосипед. Келесі тарауы сізбен басталсын.</p><a class="text-link" href="advantages.html">Ainalym туралы көбірек <span aria-hidden="true">↗</span></a></div>
        </div>
      </section>

      <section class="section" id="how-it-works"><div class="container"><div class="section-heading"><p class="section-kicker">Үш қадам — бір жақсы олжа</p><h2>Табыңыз. Салыстырыңыз.<br>Келісіңіз.</h2><p>Асықпай таңдау — өзіңізге сай затты табудың бір жолы.</p></div><div class="story-grid">
        <article class="story-card"><span class="step-number">01</span><h3>Қажетіңізді анықтаңыз</h3><p>Қандай зат керек екенін, бюджетіңізді және қолайлы қаланы анықтаңыз. Кейін кездескен ұсыныстардың суреттері мен сипаттамаларын салыстырыңыз.</p><span class="section-kicker">Қажет зат · Қолайлы бюджет</span></article>
        <article class="story-card"><span class="step-number">02</span><h3>Бөлшектерін анықтаңыз</h3><p>Сатушыдан жағдайын, өлшемін және кемшіліктерін сұраңыз. Қосымша сурет немесе жұмысын тексеруді өтініңіз.</p><span class="section-kicker">Нақты сұрақ · Саналы таңдау</span></article>
        <article class="story-card"><span class="step-number">03</span><h3>Өзара келісіңіз</h3><p>Соңғы баға, кездесу уақыты және затты беру тәсілін талқылаңыз. Мүмкін болса, алар алдында қарап шығыңыз.</p><span class="section-kicker">Тікелей байланыс · Өзара келісім</span></article>
      </div></div></section>

      <section class="section" id="advantages"><div class="container"><div class="section-heading"><p class="section-kicker">Қолданылған заттың артықшылығы</p><h2>Жақсы таңдау әрқашан<br>жаңа қораптан шықпайды.</h2></div><div class="card-grid">
        <article class="feature-card"><span class="icon-badge" aria-hidden="true">₸</span><h3>Бюджетке сай іздеңіз</h3><p>Бағаларды салыстырып, қажеттілігіңізге сәйкес ұсынысты таңдаңыз. Қолданылған зат жаңа баламасына қарағанда қолайлы болуы мүмкін.</p></article>
        <article class="feature-card"><span class="icon-badge" aria-hidden="true">✦</span><h3>Өзіңізге тән олжа</h3><p>Ерекше интерьер бұйымы, ескі басылым немесе ұнаған модель — қолданылған заттар арасында қызықты дүниелер кездеседі.</p></article>
        <article class="feature-card"><span class="icon-badge" aria-hidden="true">↻</span><h3>Қайта пайдалануды таңдаңыз</h3><p>Жарамды затты қолданысқа қайтару арқылы оның тарихын жалғастырыңыз. Жаңа дүние алудың баламасын қарастырыңыз.</p></article>
      </div></div></section>

      <section class="section" id="faq"><div class="container split-panel"><div class="section-heading"><p class="section-kicker">Сұрақтар мен жауаптар</p><h2>Таңдауға көмектесеміз.</h2><p>Сатып алу алдында ескеретін қарапайым нәрселер.</p><a class="text-link" href="contacts.html">Бізбен байланысу <span aria-hidden="true">↗</span></a></div>${faq(buyerFaq)}</div></section>

      <section class="section"><div class="container cta-band"><div><p class="section-kicker">Сіздің келесі олжаңыз</p><h2>Керегіңіз жақын шығар.</h2><p>Алдымен санатпен танысып, қажеттілігіңізді анықтаңыз.</p></div><a class="button" data-type="primary" href="index.html#categories">Санаттарды қарау <span aria-hidden="true">↗</span></a></div></section>
    `,
  },
];
