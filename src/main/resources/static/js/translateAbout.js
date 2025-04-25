const translations = {
    en: {
        homePage: "Home",
        text2: "contact us",
        ideaAuthorTitle: "Author of the Idea and Project",
        // ideaAuthorDescription: "Asif Sevindik Muradzade was born in 1969. He is originally from the village of Agdu in the Garakilse district of the Zangezur region of Western Azerbaijan. He graduated from the Azerbaijan Technology Institute and the Azerbaijan State University of Economics. He has worked in various positions at the State Customs Committee of the Republic of Azerbaijan and the Ministry of Taxes of the Republic of Azerbaijan. He is currently an employee of the State Tax Service of the Republic of Azerbaijan's Main Department of Local Revenues in Baku.",

        aboutAuthorH: "We express our gratitude to those who participated in the project."
    },
    az: {
        homePage: "Ana Səhifə",
        text2: "əlaqə",
        ideaAuthorTitle: "İdea və layihə müəllifi",
        // ideaAuthorDescription: "Asif Sevindik oğlu Muradzadə 1969-cu ildə anadan olub. Əslən Qərbi Azərbaycanın Zəngəzur mahalının Qarakilsə rayonunun Ağdü kəndindəndir. Azərbaycan Texnologiya İnstitutunu və Azərbaycan Dövlət İqtisad Universitetini bitirmişdir. Azərbaycan Respublikası Dövlət Gömrük Komitəsində və Azərbaycan Respublikası Vergilər Nazirliyində müxtəlif vəzifələrdə işləmişdir. Hazırda Azərbaycan Respublikasının İqtisadiyyat Nazirliyi yanında Dövlət Vergi Xidmətinin Bakı şəhəri Lokal Gəlirlər Baş İdarəsinin əməkdaşıdır.",
        aboutAuthorH: "Layihədə iştirak edənlərə öz təşəkkürümüzü bildiririk."

    }
};


// function translateToEnglish() {
//     document.getElementById("head-main-btn").innerText = translations.en.homePage;
//     document.getElementById("head-contact-btn").innerText = translations.en.text2;
//     document.getElementById("idea-author-title").innerText = translations.en.ideaAuthorTitle;
//     document.getElementById("idea-author-description").innerText = translations.en.ideaAuthorDescription;
//     document.getElementById("thanks-guys").innerText = translations.en.aboutAuthorH;
//
//
// }
//
//
// function translateToAzerbaijani() {
//     document.getElementById("head-main-btn").innerText = translations.az.homePage;
//     document.getElementById("head-contact-btn").innerText = translations.az.text2;
//     document.getElementById("idea-author-title").innerText = translations.az.ideaAuthorTitle;
//     document.getElementById("idea-author-description").innerText = translations.az.ideaAuthorDescription;
//     document.getElementById("thanks-guys").innerText = translations.az.aboutAuthorH;
//
//
//
// }


function translateToEnglish() {
    applyTranslations('en');
    localStorage.setItem('language', 'en');
    console.log('Language set to English');
}

function translateToAzerbaijani() {
    applyTranslations('az');
    localStorage.setItem('language', 'az');
    console.log('Language set to Azerbaijani');
}

function applyTranslations(lang) {
    console.log('Applying translations for:', lang);
    document.getElementById("head-main-btn").innerText = translations[lang].homePage;
    document.getElementById("head-contact-btn").innerText = translations[lang].text2;
    document.getElementById("idea-author-title").innerText = translations[lang].ideaAuthorTitle;
    // document.getElementById("idea-author-description").innerText = translations[lang].ideaAuthorDescription;
    document.getElementById("thanks-guys").innerText = translations[lang].aboutAuthorH;
}

idea-author-description

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired');
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        applyTranslations(savedLanguage);
        console.log('Language preference loaded from localStorage:', savedLanguage);
    } else {
        console.log('No language preference found in localStorage');
    }

    document.querySelector('.lang-btns .lang-btn:nth-child(1)').addEventListener('click', translateToEnglish);
    document.querySelector('.lang-btns .lang-btn:nth-child(2)').addEventListener('click', translateToAzerbaijani);
    console.log('Event listeners added to language buttons');
});