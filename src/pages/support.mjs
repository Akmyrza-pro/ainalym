export const supportPages = [
  {
    file: 'contacts.html',
    title: 'Байланыс',
    description: 'Ainalym оқу жобасының байланыс беті: сұрақ қою формасы, жұмыс уақыты және үлгі карта.',
    body: `
      <section class="page-hero container">
        <p class="eyebrow">БАЙЛАНЫС</p>
        <h1 class="display-title">Сөйлесейік.</h1>
        <p class="lead">Жариялау, сатып алу немесе платформаның жұмысы туралы сұрағыңыз болса, осы жерден бастаңыз.</p>
      </section>

      <section class="section container" aria-labelledby="contact-heading">
        <div class="split-panel">
          <div class="form-card">
            <p class="eyebrow">СҰРАҚ ҚОЮ</p>
            <h2 id="contact-heading">Бізге жазыңыз</h2>
            <p>Төмендегі форма аты-жөніңіз, поштаңыз және хабарламаңыз бар мәтіндік файлды дайындайды. Оны жүктеп, кейін өзіңіз пайдалана аласыз. Мәліметтер осы сайттың серверіне жіберілмейді.</p>
            <form id="contact-form">
              <div class="field">
                <label for="contact-name">Атыңыз</label>
                <input id="contact-name" name="name" type="text" required minlength="2" maxlength="80" autocomplete="name" placeholder="Атыңызды жазыңыз">
              </div>
              <div class="field">
                <label for="contact-email">Электронды поштаңыз</label>
                <input id="contact-email" name="email" type="email" required maxlength="120" autocomplete="email" placeholder="siz@example.com">
              </div>
              <div class="field">
                <label for="contact-message">Хабарлама</label>
                <textarea id="contact-message" name="message" required minlength="10" maxlength="2000" rows="5" placeholder="Сұрағыңызды толығырақ жазыңыз"></textarea>
              </div>
              <label class="consent-field" for="contact-consent">
                <input id="contact-consent" name="consent" type="checkbox" required>
                <span><a class="text-link" href="policy.html">Құпиялылық туралы мәтінді</a> оқыдым және хабарлама файлын дайындауға келісемін.</span>
              </label>
              <button class="button" data-type="primary" type="submit" disabled>Хабарламаны дайындау <span aria-hidden="true">↓</span></button>
              <p id="form-status" class="form-status" role="status" aria-live="polite"></p>
            </form>
            <noscript><p class="notice">Хабарлама файлын дайындау үшін браузерде JavaScript қосулы болуы керек. Форма хабарды өзі жібермейді.</p></noscript>
            <p class="notice">Бұл — оқу жобасы. Форма тек .txt файлын жүктеуді ұсынады; хабар жіберілмейді және пошта қолданбасы ашылмайды. hello@ainalym.example мекенжайы үлгі ретінде берілген және жұмыс істемейді.</p>
          </div>

          <aside class="contact-card" aria-labelledby="contact-details-heading">
            <p class="eyebrow">БАЙЛАНЫС АҚПАРАТЫ</p>
            <h2 id="contact-details-heading">Бір сұрақ — бір қадам.</h2>
            <p>Заттарға жаңа айналым беру туралы идеяңыз бар ма? Хабарламаңыздың мәтіндік нұсқасын осы бетте дайындай аласыз.</p>
            <dl>
              <dt>Электронды пошта</dt>
              <dd><a class="text-link" href="mailto:hello@ainalym.example">hello@ainalym.example</a><br><small>Оқу жобасына арналған үлгі мекенжай</small></dd>
              <dt>Үлгі жұмыс уақыты</dt>
              <dd>Дүйсенбі–жұма, 09:00–18:00<br><small>Қызылорда, Қазақстан · UTC+5</small></dd>
              <dt>Әлеуметтік желілер</dt>
              <dd><a class="text-link" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram сервисін ашу <span aria-hidden="true">↗</span></a></dd>
              <dd><a class="text-link" href="https://t.me/" target="_blank" rel="noopener noreferrer">Telegram сервисін ашу <span aria-hidden="true">↗</span></a></dd>
            </dl>
            <p class="notice">Әлеуметтік желі сілтемелері сервистердің жалпы беттерін ашады. Ainalym жобасының ресми аккаунттары жоқ.</p>
          </aside>
        </div>
      </section>

      <section class="section container" aria-labelledby="map-heading">
        <div class="section-heading">
          <div><p class="eyebrow">БІЗДІҢ ҚАЛА</p><h2 id="map-heading">Қызылордадан бастаймыз.</h2></div>
          <p>Жақын жерден табылған зат — жаңа мүмкіндіктің бастауы.</p>
        </div>
        <figure class="map-card">
          <img src="media-files/map.png" width="960" height="560" loading="lazy" alt="Қызылорда тақырыбындағы иллюстрациялық қала картасы және үлгі белгі">
          <figcaption>Бұл — арнайы жасалған иллюстрациялық карта. Белгі оқу үлгісін көрсетеді; нақты кеңсе мекенжайы немесе навигация картасы емес.</figcaption>
        </figure>
      </section>
    `,
  },
  {
    file: 'policy.html',
    title: 'Құпиялылық',
    description: 'Ainalym оқу сайтында байланыс формасы қалай жұмыс істейтіні және қандай деректер сақталмайтыны туралы түсіндірме.',
    body: `
      <section class="page-hero container">
        <p class="eyebrow">ҚҰПИЯЛЫЛЫҚ</p>
        <h1 class="display-title">Деректеріңіз туралы<br>ашық айтамыз.</h1>
        <p class="lead">Бұл бет Ainalym оқу сайтының нақты жұмысын түсіндіреді. Толыққанды сервис іске қосылғанда, оның дерек өңдеу тәртібіне сай жаңа мәтін қажет болады.</p>
      </section>

      <section class="section container" aria-labelledby="privacy-heading">
        <article class="policy-content">
          <p class="notice">Оқу жобасына арналған үлгі мәтін. Бұл заңдық кеңес немесе іске қосылған сервистің толық құқықтық құжаты емес.</p>
          <h2 id="privacy-heading">1. Бұл сайт қалай жұмыс істейді?</h2>
          <p>Ainalym — қолданылған заттар маркетплейсінің статикалық оқу үлгісі. Сайтта пайдаланушы тіркеуі, дерек қабылдайтын сервер немесе төлем қабылдау жүйесі жоқ. Хабарландырулар, пікірлер, бағалар мен байланыс деректері көрсету үшін жасалған.</p>

          <h2>2. Байланыс формасы</h2>
          <p>Формада атыңызды, электронды поштаңызды және хабарламаңызды енгізесіз. «Хабарламаны дайындау» түймесі міндетті өрістерді тексеріп, осы мәліметтер бар .txt файлын жүктеуді ұсынады. Сайт пошта қолданбасын ашпайды, хабарламаны өзі жібермейді және сәтті жіберілді деп хабарламайды.</p>
          <p>Формада енгізген деректер сайттың дерекқорында сақталмайды. Бет жабылғанда, сайт оларды келесі кіру үшін сақтап қалмайды. Құрылғыңыздың браузері өзі ұсынатын автотолтыру баптаулары бөлек басқарылады.</p>
          <p>hello@ainalym.example — жұмыс істемейтін үлгі мекенжай. Ол нақты хабарларды қабылдамайды.</p>

          <h2>3. Жүктелген хабарлама файлы</h2>
          <p>Жүктелген мәтіндік файл құрылғыңызда сақталады. Оны сақтау, өзгерту, жою немесе мәтінін бөлек пошта қолданбасына көшіру — өз таңдауыңыз. Сайт файлды кейін қадағаламайды. Пошта сервисін өзіңіз қолдансаңыз, оның деректерді өңдеу шарттары бөлек қолданылады. Құпия ақпаратты, парольді немесе төлем деректерін формаға енгізбеңіз.</p>

          <h2>4. Cookie және бақылау</h2>
          <p>Осы сайттың бастапқы коды:</p>
          <ul><li>cookie арқылы дерек жинамайды;</li><li>localStorage ішінде жеке ақпарат сақтамайды;</li><li>аналитика немесе жарнамалық трекер қоспайды.</li></ul>
          <p>Сайт кодында cookie орнату, localStorage арқылы дерек сақтау, аналитика немесе жарнамалық бақылау жоқ. Көрініс пен интерактивті элементтер құрылғыңыздағы браузерде жұмыс істейді. Сайт орналастырылған жағдайда хостинг қызметінің техникалық журналдары оның өз баптауларына байланысты болады.</p>

          <h2>5. Сыртқы сілтемелер</h2>
          <p>Instagram және Telegram сілтемелері сыртқы сервистердің жалпы беттерін ашады. Сол сайттарға кіргеннен кейін олардың құпиялылық тәртібі қолданылады. Ainalym оқу жобасында осы сервистерге арналған ресми аккаунттар көрсетілмеген.</p>

          <h2>6. Үлгі материалдар</h2>
          <p>Өнім суреттері, карта және мәтіндік материалдар осы тапсырма үшін жасалған. Пікірлер үлгі ретінде белгіленген. Олар нақты сатып алушылардың деректерін, нақты тауарларды немесе нақты кеңсе мекенжайын білдірмейді.</p>

          <h2>7. Нақты сервис іске қосылса</h2>
          <p>Тіркеу, хабарламалар, төлемдер немесе аналитика қосылған жағдайда қандай дерек жиналатыны, оның мақсаты, сақталу мерзімі және пайдаланушының өтініш беру жолы қайта сипатталуы керек. Қазіргі мәтін тек осы оқу нұсқасының жұмысына қатысты.</p>
          <a class="button" data-type="secondary" href="contacts.html">Байланыс бетіне өту <span aria-hidden="true">↗</span></a>
        </article>
      </section>
    `,
  },
];
