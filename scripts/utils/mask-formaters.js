function formatCardNumber(value) {
    const str = value.toString()
        .replace(/(\d{16})/, '$1')
        .replace(/(\d{4})/g, '$1 ')
        .replace(/(^\s+|\s+$)/,'');
    return str
}

function deFormatCardNumber(value) {
    const newValue = value.split(/\s/).join('');
    return newValue;
}

function formatExpirationDate(value) {
    const str = value.toString().replace(/(\d{2})(\d{2})/, '$1/$2');
    return str;
}

function deFormatExpirationDate(value) {
    return value.replace(/(\d{2})\/(\d{2})/, '$1$2');
}