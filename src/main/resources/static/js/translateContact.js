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
    document.getElementById("head-about-btn").innerText = translations.en.text1;
    document.getElementById("head-main-btn").innerText = translations.en.homePage;
    document.getElementById("contact-title").innerText = translations.en.contactTitle;
    document.getElementById("contact-description").innerHTML = translations.en.contactDescription;
    document.getElementById("label-name").innerText = translations.en.labelName;
    document.getElementById("label-surname").innerText = translations.en.labelSurname;
    document.getElementById("label-email").innerText = translations.en.labelEmail;
    document.getElementById("label-contactNumber").innerText = translations.en.labelContactNumber;
    document.getElementById("label-description").innerText = translations.en.labelDescription;
    document.getElementById("submit-button").value = translations.en.submitButton;
}


function translateToAzerbaijani() {
    document.getElementById("head-about-btn").innerText = translations.az.text1;
    document.getElementById("head-main-btn").innerText = translations.az.homePage;
    document.getElementById("contact-title").innerText = translations.az.contactTitle;
    document.getElementById("contact-description").innerHTML = translations.az.contactDescription;
    document.getElementById("label-name").innerText = translations.az.labelName;
    document.getElementById("label-surname").innerText = translations.az.labelSurname;
    document.getElementById("label-email").innerText = translations.az.labelEmail;
    document.getElementById("label-contactNumber").innerText = translations.az.labelContactNumber;
    document.getElementById("label-description").innerText = translations.az.labelDescription;
    document.getElementById("submit-button").value = translations.az.submitButton;


}