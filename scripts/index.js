window.onload = function() {
    cardTabs = makeTabs({
        group: "card"
    });
    cardTabs.next();
    cardTabs.next();

    createAutocomplete({group: "country", dictionary: countryAutocompleteDic});
    const card = createCard({group: "PAYMENT_CARD"});

    createPaymentForm(document.querySelector('.ordering-form'), {
        onCardNumberChange: (value) => card.setNumberValue(value),
        onCardDateChange: (value) => card.setDateValue(value),
        onCardYearChange: (value) => card.setYearValue(value),
        onCardOwnerChange: (value) => card.setOwnerValue(value),
        onCardCsvChange: (value) => card.setCsvValue(value),
    });
}

const countryAutocompleteDic = {
    "UA": ["Chernivtsi", "Kiev"]
};