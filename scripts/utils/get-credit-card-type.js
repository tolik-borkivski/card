const CREDIT_CARD_TYPES = {
  VISA: 'VIDA',
  MASTER_CARD: 'MASTER CARD',
  UNKNOWN: 'UNKNOWN',
};

const CREDIT_CARDS_FIRST_NUMBER = {
  '5': CREDIT_CARD_TYPES.VISA,
  '4': CREDIT_CARD_TYPES.MASTER_CARD,
};

function getCreditCardType(number) {
  const firstChar = number.charAt(0);
  const cardType = CREDIT_CARDS_FIRST_NUMBER[firstChar] || CREDIT_CARD_TYPES.UNKNOWN;
  return cardType;
}