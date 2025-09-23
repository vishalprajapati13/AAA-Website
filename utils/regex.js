export const REGEX = {
  mobileNumberRegex: /^(?=(?:\D*\d){10,24}$)\+?(?:\d{2,}|\(\d{1,4}\))(?: (?:\d{2,}|\(\d{1,4}\)))*$/,
  startingSpaceNotAllowed: /^(?!\s)/,
  name: /^$|^[A-Za-z][A-Za-z\s]*$/,
  globalMobile: /^\+?(\d{1,4}|\(\d{1,4}\))?([-\s]?\d){1,12}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  internaitionalNumber: /^\+?[1-9]\d{1,14}$/,
  onlyletter: /^[A-Za-z]/,
  onlyNumber: /^[0-9+]/,
  onlyCharNumSymbol: /^[A-Za-z0-9&.,"#\-\/() ]/ 

};
