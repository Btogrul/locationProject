const translations = {
    en: {
        text1: "about us",
        homePage: "Home",
        contactTitle: "CONTACT US",
        contactDescription: "You can send us your inquiry by filling out the form below.<br> We will contact you soon.",
        labelName: "Name:",
        labelSurname: "Surname:",
        labelEmail: "Email:",
        labelContactNumber: "Contact Number:",
        labelDescription: "Your Message:",
        submitButton: "Send"
    },
    az: {
        text1: "Haqqımızda",
        homePage: "Ana Səhifə",
        contactTitle: "BİZİMLƏ ƏLAQƏ",
        contactDescription: "Sorğunuzu aşağıdakı formu dolduraraq bizə göndərə bilərsiniz.<br> Tezliklə sizinlə əlaqə saxlayacağıq.",
        labelName: "Ad:",
        labelSurname: "Soyad:",
        labelEmail: "E-poçt:",
        labelContactNumber: "Əlaqə Nömrəsi:",
        labelDescription: "Mesajınız:",
        submitButton: "Göndər"

    }
};



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
    document.getElementById("head-about-btn").innerText = translations[lang].text1;
    document.getElementById("head-main-btn").innerText = translations[lang].homePage;
    document.getElementById("contact-title").innerText = translations[lang].contactTitle;
    document.getElementById("contact-description").innerHTML = translations[lang].contactDescription;
    document.getElementById("label-name").innerText = translations[lang].labelName;
    document.getElementById("label-surname").innerText = translations[lang].labelSurname;
    document.getElementById("label-email").innerText = translations[lang].labelEmail;
    document.getElementById("label-contactNumber").innerText = translations[lang].labelContactNumber;
    document.getElementById("label-description").innerText = translations[lang].labelDescription;
    document.getElementById("submit-button").value = translations[lang].submitButton;
}

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

//
// function translateToEnglish() {
//     document.getElementById("head-about-btn").innerText = translations.en.text1;
//     document.getElementById("head-main-btn").innerText = translations.en.homePage;
//     document.getElementById("contact-title").innerText = translations.en.contactTitle;
//     document.getElementById("contact-description").innerHTML = translations.en.contactDescription;
//     document.getElementById("label-name").innerText = translations.en.labelName;
//     document.getElementById("label-surname").innerText = translations.en.labelSurname;
//     document.getElementById("label-email").innerText = translations.en.labelEmail;
//     document.getElementById("label-contactNumber").innerText = translations.en.labelContactNumber;
//     document.getElementById("label-description").innerText = translations.en.labelDescription;
//     document.getElementById("submit-button").value = translations.en.submitButton;
// }
//
//
// function translateToAzerbaijani() {
//     document.getElementById("head-about-btn").innerText = translations.az.text1;
//     document.getElementById("head-main-btn").innerText = translations.az.homePage;
//     document.getElementById("contact-title").innerText = translations.az.contactTitle;
//     document.getElementById("contact-description").innerHTML = translations.az.contactDescription;
//     document.getElementById("label-name").innerText = translations.az.labelName;
//     document.getElementById("label-surname").innerText = translations.az.labelSurname;
//     document.getElementById("label-email").innerText = translations.az.labelEmail;
//     document.getElementById("label-contactNumber").innerText = translations.az.labelContactNumber;
//     document.getElementById("label-description").innerText = translations.az.labelDescription;
//     document.getElementById("submit-button").value = translations.az.submitButton;
//
//
// }