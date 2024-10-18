const translations = {
    en: {
        text1: "about us",
        text2: "contact us",
        text3: "Loading...",
        text4: "Search...",
        prevButton: "Previous",
        nextButton: "Next",
        aboutText1: "The genocides that began in Western Azerbaijan in the 20th century resulted in the destruction of Turkic settlements and the Armenization of the region's population. At the same time, it was a war against our culture, an attack on our centuries-old heritage. Along with our devastated villages, our toponyms, the names of our cities and villages were officially changed, and our traces were erased from our lands.",
        aboutText2: "Our presented project is aimed at the restoration and preservation of the cultural and historical traces of our ancestral homeland, Western Azerbaijan. Our main goal is to restore the toponyms erased as a result of Armenian barbarism on our historical lands, to reclaim our centuries-old blood memory, to raise awareness among the younger generation in this direction, and to convey the truth to the international community.",
        aboutText3: "We invite our compatriots from Western Azerbaijan to cooperate in the placement of overlooked toponyms and to address any possible inaccuracies on the map.",
        aboutText4: "Just as we reunited with our Karabakh following the 44-day Patriotic War victory and the successful 23-hour anti-terror operation, we are now one step away from reuniting with our Western Azerbaijan. This virtual map we present can serve as a beacon of hope for our compatriots who were displaced, deported, and endured great tragedies from their ancestral lands.",
        aboutText5: "Lastly, we would like to thank everyone who contributed and helped us in this work!",
        nonCommercialText: "The site is non-commercial. <br> It does not carry any advertising and no donations are accepted. <br>© 2024 All rights reserved.",
        quote1: "In 1918, the territory of the Republic of Azerbaijan was 114 thousand square kilometers. Now, only 86 thousand square kilometers remain. See how much land we have lost.",
        author1: "Heydar Aliyev",
        quote2: "I am sure that the day will come when our compatriots from Western Azerbaijan, their relatives, children, and grandchildren will return to our historical land, Western Azerbaijan.",
        author2: "Ilham Aliyev",
    },
    az: {
        text1: "Haqqımızda",
        text2: "əlaqə",
        text3: "Yüklənir...",
        text4: "Axtar...",
        prevButton: "Əvvəlki",
        nextButton: "Sonrakı",
        aboutText1: "XX əsrdə Qərbi Azərbaycanda başlanmış soyqırımlar türk yaşayış məskənlərinin dağıdılması və bölgə əhalisinin erməniləşdirilməsi ilə nəticələndi. Bu, eyni zamanda, mədəniyyətimizə qarşı müharibə, çoxəsrlik irsimizə edilmiş qəsd idi. Viran qalan kəndlərimizlə bərabər toponimlərimiz, şəhərlərimizin və kəndlərimizin adı rəsmi olaraq dəyişdirildi, izlərimiz də torpaqlarımızdan silindi.",
        aboutText2: "Təqdim olunan layihəmiz dədə-baba yurdumuz olan Qərbi Azərbaycandakı mədəni-tarixi izlərimizin bərpasına və qorunmasına yönəlmişdir. Əsas məqsədimiz tarixi torpaqlarımızda erməni barbarlığı nəticəsində silinmiş toponimlərimizin bərpası ilə çoxəsrlik qan yaddaşının qaytarılması, gənc nəsildə bu istiqamətdə məlumatlılığın formalaşdırılması və beynəlxalq ictimaiyyətə həqiqətlərin çatdırılmasıdır.",
        aboutText3: "Biz diqqətdən yayınan toponimlərimizin yerləşdirilməsi və xəritədə ola biləcək hər hansı bir çatışmamazlıqla əlaqədar Qərbi Azərbaycandan olan soydaşlarımızı əməkdaşlığa dəvət edirik.",
        aboutText4: "44 günlük Vətən müharibəsində qazandığımız Zəfərdən və 23 saatlıq uğurlu anti-terror əməliyyatından sonra Qarabağımıza qovuşduğumuz kimi Qərbi Azərbaycanımıza da qovuşmağımızın bir addımlığındayıq. Təqdim etdiyimiz bu virtual xəritə dədə baba torpaqlarımızdan didərgin düşən, deportasiyaya uğrayan və böyük faciələr yaşayan soydaşlarımız üçün onların qayıdışına işıq saça bilər.",
        aboutText5: "Son olaraq bu işdə əməyi keçən, bizə kömək edən hər bir şəxsə öz təşəkkürümüzü bildiririk!",
        nonCommercialText: "Sayt qeyri-kommersiya xarakterlidir. <br> Reklam xarakteri daşımır və heç bir ianə qəbul edilmir. <br>© 2024 Bütün hüquqlar qorunur.",
        quote1: "1918-ci ildə Azərbaycan Respublikasının ərazisi 114 min kv kilometr olub. İndi isə 86 min kv kilometrdir. Gör əlimizdən nə qədər torpaqlar gedib.",
        author1: "Heydər Əliyev",
        quote2: "Əminəm ki, gün gələcək və Qərbi Azərbaycandan olan soydaşlarımız, onların yaxınları, uşaqları, nəvələri tarixi diyarımız olan Qərbi Azərbaycana qayıdacaqlar.",
        author2: "İlham Əliyev",

    }
};


function translateToEnglish() {
    document.getElementById("head-about-btn").innerText = translations.en.text1;
    document.getElementById("head-contact-btn").innerText = translations.en.text2;
    document.getElementById("loading-text").innerText = translations.en.text3;
    document.getElementById("search-input").placeholder = translations.en.text4;
    document.getElementById("prev-button").innerText = translations.en.prevButton;
    document.getElementById("next-button").innerText = translations.en.nextButton;
    document.getElementById("about-text1").innerText = translations.en.aboutText1;
    document.getElementById("about-text2").innerText = translations.en.aboutText2;
    document.getElementById("about-text3").innerText = translations.en.aboutText3;
    document.getElementById("about-text4").innerText = translations.en.aboutText4;
    document.getElementById("about-text5").innerText = translations.en.aboutText5;
    document.getElementById("non-commercial-text").innerHTML = translations.en.nonCommercialText;
    document.getElementById("quote1").innerText = translations.en.quote1;
    document.getElementById("author1").innerText = translations.en.author1;
    document.getElementById("quote2").innerText = translations.en.quote2;
    document.getElementById("author2").innerText = translations.en.author2;
}


function translateToAzerbaijani() {
    document.getElementById("head-about-btn").innerText = translations.az.text1;
    document.getElementById("head-contact-btn").innerText = translations.az.text2;
    document.getElementById("loading-text").innerText = translations.az.text3;
    document.getElementById("search-input").placeholder = translations.az.text4;
    document.getElementById("prev-button").innerText = translations.az.prevButton;
    document.getElementById("next-button").innerText = translations.az.nextButton;
    document.getElementById("about-text1").innerText = translations.az.aboutText1;
    document.getElementById("about-text2").innerText = translations.az.aboutText2;
    document.getElementById("about-text3").innerText = translations.az.aboutText3;
    document.getElementById("about-text4").innerText = translations.az.aboutText4;
    document.getElementById("about-text5").innerText = translations.az.aboutText5;
    document.getElementById("non-commercial-text").innerHTML = translations.az.nonCommercialText;
    document.getElementById("quote1").innerText = translations.az.quote1;
    document.getElementById("author1").innerText = translations.az.author1;
    document.getElementById("quote2").innerText = translations.az.quote2;
    document.getElementById("author2").innerText = translations.az.author2;


}