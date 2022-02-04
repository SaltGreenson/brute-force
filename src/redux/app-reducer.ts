import {GenericThunkType, InferActionsTypes} from "./redux-store";

const initialState = {
    initialized: false
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const actions = {
    initializedSuccess: () => ({
        type: "INITIALIZED_SUCCESS"
    })
}

export const appReducer = (state = initialState, actions: ActionsType): InitialStateType => {
    switch (actions.type) {
        case "INITIALIZED_SUCCESS": {
            return {
                ...state,
                initialized: true
            }
        }
        default: break
    }
    return state
}

export const initializeApp = ():GenericThunkType<ActionsType> =>
    async (dispatch) => {
    dispatch(actions.initializedSuccess())
}