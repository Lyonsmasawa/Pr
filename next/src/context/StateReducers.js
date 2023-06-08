import { reducerCases } from "./constants";

export const initialState = {
    showLoginModal: false,
    showSignupModal: false,
}

const reducer = (state, action) => {
    switch (action.type) {
        case reducerCases.TOGGLE_LOGIN_MODAL:
            return {
                ...state,
                showLoginModel: action.showLoginModel
            };
        case reducerCases.TOGGLE_SIGNUP_MODAL:
            return {
                ...state,
                showSignupModel: action.showSignupModel
            };
        default:
            return state;
    }
}

export default reducer;