const CARD_DATA_ATTRIBUTES = {
    GROUP: 'data-card-group',
    ROLE: 'data-card-role',
};

const CARD_ROLES = {
    NUMBER: 'number',
    DATE: 'date',
    YEAR: 'year',
    CSV: 'csv',
    OWNER: 'owner',
    TYPE: 'type'
};

const selectCardNumber = (group) => document.querySelector(`[${CARD_DATA_ATTRIBUTES.GROUP}='${group}'][${CARD_DATA_ATTRIBUTES.ROLE}='${CARD_ROLES.NUMBER}']`);
const selectCardDate = (group) => document.querySelector(`[${CARD_DATA_ATTRIBUTES.GROUP}='${group}'][${CARD_DATA_ATTRIBUTES.ROLE}='${CARD_ROLES.DATE}']`);
const selectCardYear = (group) => document.querySelector(`[${CARD_DATA_ATTRIBUTES.GROUP}='${group}'][${CARD_DATA_ATTRIBUTES.ROLE}='${CARD_ROLES.YEAR}']`);
const selectCardCsv = (group) => document.querySelector(`[${CARD_DATA_ATTRIBUTES.GROUP}='${group}'][${CARD_DATA_ATTRIBUTES.ROLE}='${CARD_ROLES.CSV}']`);
const selectCardOwner = (group) => document.querySelector(`[${CARD_DATA_ATTRIBUTES.GROUP}='${group}'][${CARD_DATA_ATTRIBUTES.ROLE}='${CARD_ROLES.OWNER}']`);
const selectCardType = (group) => document.querySelector(`[${CARD_DATA_ATTRIBUTES.GROUP}='${group}'][${CARD_DATA_ATTRIBUTES.ROLE}='${CARD_ROLES.TYPE}']`);

function createCard({group}) {
    const numberEl = selectCardNumber(group),
        dateEl = selectCardDate(group),
        yearEl = selectCardYear(group),
        csvEl = selectCardCsv(group),
        ownerEl = selectCardOwner(group),
        cardTypeEl = selectCardType(group);

    let cardType = CREDIT_CARD_TYPES.UNKNOWN;
    cardTypeEl.innerText = cardType;

    return {
        setNumberValue: (value) => {
            numberEl.innerText = formatCardNumber(value);
            cardType = getCreditCardType(value);
            cardTypeEl.innerText = cardType;
        },
        setDateValue: (value) => dateEl.innerText = value,
        setYearValue: (value) => yearEl.innerText = value,
        setCsvValue: (value) => csvEl.innerText = value,
        setOwnerValue: (value) => ownerEl.innerText = value,
    }
}
