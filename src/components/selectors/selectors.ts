import {AppStateType} from "../../redux/redux-store";

// селектор для получения алфавита
export const getAlphabet = (state: AppStateType) => state.menuPage["alphabet"]
// селектор для получения количества установленных знаков
export const getQuantitySigns = (state: AppStateType) => state.menuPage.quantitySigns

// селектор для получения паролей
export const getPasswords = (state: AppStateType) => state.menuPage.password

// селектор для получения фильтра
export const getFilter = (state: AppStateType) => state.menuPage.filter

// селектор для получения инициализации
export const getInitialized = (state: AppStateType) => state.app.initialized

// селектор для получения загрузки
export const getLoading = (state: AppStateType) => state.menuPage.loading

// селектор для получения позиции прогресс бара
export const getProcessingBarPosition = (state: AppStateType) => state.menuPage.processingBarPosition