import {GenericThunkType, InferActionsTypes} from "./redux-store";
import {collectAlphabet} from "../functions/collectAlphabet";

// стейт инициализации
const initialState = {
    alphabet: "",
    password: "",
    quantitySigns: 2,
    filter: {
        hasRussianLetters: false,
        hasEnglishLetters: true,
        hasSigns: false,
        hasNumbers: false
    } as FilterType,
    loading: false,
    processingBarPosition: 0
}

// тип для стейта инициализации
type InitialStateType = typeof initialState
// тип для действий
type ActionsType = InferActionsTypes<typeof actions>
// тип для фильтра
export type FilterType = {
    hasRussianLetters: boolean,
    hasEnglishLetters: boolean,
    hasSigns: boolean,
    hasNumbers: boolean
}

// объект функций
const actions = {
    // установка алфавита
    setAlphabet: (alphabet: string) => ({
        type: "BRUTE/SET_ALPHABET",
        alphabet
    } as const),
    // установка пароля
    setPassword: (password: string) => ({
        type: "BRUTE/SET_PASSWORD",
        password
    } as const),
    // установка количества знаков
    setQuantitySigns: (quantitySigns: number) => ({
        type: "BRUTE/SET_QUANTITY",
        quantitySigns
    } as const),
    // установка фильтра
    setFilter: (filter: FilterType) => ({
        type: "BRUTE/SET_FILTER",
        payload: filter
    } as const),
    // установка загрузки
    setLoading: (loading: boolean) => ({
        type: "BRUTE/SET_LOADING",
        loading
    } as const),
    // установка позиции прогресс бара
    setProcessingBarPosition: (processingBarPosition: number) => ({
        type: "BRUTE/PROCESSING_POSITION",
        processingBarPosition
    } as const)
}

// редьюсер - функция которая возвращает стейт и имеет переключатель с действиями
export const menuReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        // изменение алфавита
        case "BRUTE/SET_ALPHABET": {
            return {
                ...state,
                alphabet: action.alphabet
            }
        }
        // изменение пароля
        case "BRUTE/SET_PASSWORD": {
            return {
                ...state,
                password: action.password
            }
        }
        // установка количества выбранных знаков
        case "BRUTE/SET_QUANTITY": {
            return {
                ...state,
                quantitySigns: action.quantitySigns
            }
        }
        // установка фильтра
        case "BRUTE/SET_FILTER": {
            return {
                ...state,
                filter: action.payload
            }
        }
        // установка загрзки
        case "BRUTE/SET_LOADING": {
            return {
                ...state,
                loading: action.loading
            }
        }
        // установка позиции прогресс бара
        case "BRUTE/PROCESSING_POSITION": {
            return {
                ...state,
                processingBarPosition: action.processingBarPosition
            }
        }
        default:
            break
    }
    return state
}

// функция для проверки длины пароля
const chekLength = (n: number, keys: Array<number>, alphabetLength: number): boolean => {
    if (n === 0 && keys[n] === alphabetLength) return false
    if (keys[n] < alphabetLength) return true
    return chekLength(n - 1, keys, alphabetLength)
}

// функция для обновления ключей для генерации пароля
const update = (keys: Array<number>, alphabetLength: number, i: number) => {
    if (i < 0) return
    if (keys[i] === alphabetLength) {
        keys[i] = 0
        update(keys, alphabetLength, i - 1)
        return
    }
    keys[i]++
}

// функция генерации пароля
const generationPassword = (alphabet: string, n: number, keys: Array<number>): string => {
    if (n === 0) return alphabet[keys[n]]
    return alphabet[keys[n]] + generationPassword(alphabet, n - 1, keys)
}

// санка для установки алфавита
export const setAlphabet = (alphabet: string): GenericThunkType<ActionsType> =>
    async (dispatch) => {
        dispatch(actions.setAlphabet(alphabet))
    }

// санка для установки количества знаков
export const setQuantitySigns = (quantitySigns: number): GenericThunkType<ActionsType> =>
    async dispatch => {
        dispatch(actions.setQuantitySigns(quantitySigns))
    }

// функция для установки фильтра
export const setFilter = (filter: FilterType): GenericThunkType<ActionsType> =>
    dispatch => {
        dispatch(actions.setFilter(filter))
        const alphabet = collectAlphabet(filter.hasRussianLetters, filter.hasEnglishLetters, filter.hasSigns, filter.hasNumbers)
        dispatch(setAlphabet(alphabet))
    }

export const setLoading = (loading: boolean): GenericThunkType<ActionsType> =>
    dispatch => {
        dispatch(actions.setLoading(loading))
    }

// функция для установки пароля
export const setPassword = (quantitySigns: number, alphabet: string): GenericThunkType<ActionsType> =>
    async (dispatch) => {
        // установка режима загрузки в true
        dispatch(actions.setLoading(true))

        // создание массива ключей
        const keys: Array<number> = []

        // заполение массива 0
        for (let i = 0; i < quantitySigns; i++) {
            keys.push(0)
        }

        let password
        let passwords = "[ \""

        // цикл для генерации паролей
        while (chekLength(quantitySigns - 1, keys, alphabet.length - 1)) {
            // генерация пароля
            password = generationPassword(alphabet, quantitySigns - 1, keys)
            // запись пароля в переменную
            passwords += password + "\", \""
            // обновление ключей
            update(keys, alphabet.length - 1, quantitySigns - 1)
        }

        // обрезка последних 3 символов с конца массива
        passwords = passwords.slice(0, passwords.length - 3)
        passwords = passwords + "]"
        // установка пароля
        dispatch(actions.setPassword(passwords))
        // установка загрузки в false
        dispatch(actions.setLoading(false))
        //  возврат пароля
        return passwords
    }
