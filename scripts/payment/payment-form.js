const PAYMENT_DATA_ATTRIBUTES = {
    GROUP: 'data-payment-group',
    ROLE: 'data-payment-role',
}

const PAYMENT_NAMES = {
    PRODUCT_NAME: 'product-name',
    PRODUCT_QUANTITY: 'product-quantity',
    PRODUCT_PRICE: 'product-price',
    SHIPPING_COUNTRY: 'shipping-country',
    SHIPPING_STATE: 'shipping-state',
    SHIPPING_CITY: 'shipping-state',
    CARD_NUMBER: 'card-number',
    CARD_DATE: 'card-date',
    CARD_YEAR: 'card-year',
    CARD_CSV: 'card-csv',
    CARD_OWNER: 'card-owner'
}

const selectFormElementByName = (form, name) => form.querySelector(`[name='${name}']`);
const selectFormElementsByNames = (form, names) => {
    const elements = {};
    names.forEach((name) => {
        elements[name] = selectFormElementByName(form, name);
    })
    return elements;
}

const createGroupRoleSelector = (groupName, groupValue, roleName, roleValue) => `[${groupName}='${groupValue}'][${roleName}='${roleValue}']`;

function createPaymentForm(form, {
    onCardNumberChange,
    onCardDateChange,
    onCardCsvChange,
    onCardOwnerChange,
}) {
    const elements = selectFormElementsByNames(form, Object.values(PAYMENT_NAMES));
    createMaskInput(elements[PAYMENT_NAMES.CARD_NUMBER], formatCardNumber, deFormatCardNumber);
    createMaskInput(elements[PAYMENT_NAMES.CARD_DATE], formatExpirationDate, deFormatExpirationDate);

    elements[PAYMENT_NAMES.CARD_NUMBER].addEventListener("input", (e) => {
        onCardNumberChange(e.target.value);
    });

    elements[PAYMENT_NAMES.CARD_DATE].addEventListener("input", (e) => {
        onCardDateChange(e.target.value);
    });

    elements[PAYMENT_NAMES.CARD_OWNER].addEventListener("input", (e) => {
        onCardOwnerChange(e.target.value);
    });

    elements[PAYMENT_NAMES.CARD_CSV].addEventListener("input", (e) => {
        onCardCsvChange(e.target.value);
    });
}