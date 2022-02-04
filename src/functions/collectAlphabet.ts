export const collectAlphabet = (hasRussianLetters: boolean, hasEnglishLetters: boolean, hasSigns: boolean, hasNumbers: boolean): string => {
    const signs = "!@\"#№$;:'%^&?*()-_=+][}{\\|/.,><~`"
    const russianLetters = "йцукенгшщзхъэждлорпавыфячсмитьбюёЁЙЦУКЕНГШЩЗХЪЭЖДЛОРПАВЫФЯЧСМИТЬБЮ"
    const englishLetters = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM"
    const numbers = "1234567890"
    let alphabet = ""

    if (hasRussianLetters) alphabet += russianLetters
    if (hasEnglishLetters) alphabet += englishLetters
    if (hasSigns) alphabet += signs
    if (hasNumbers) alphabet += numbers

    return alphabet
}