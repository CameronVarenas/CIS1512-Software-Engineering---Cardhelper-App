const initialState = {
    user: null,
}

const UPDATE_USER = 'UPDATE_USER'

export function updateUser(user) {
    const action = {
        type: UPDATE_USER,
        payload: user,
    }

    return action
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER:
            return {...state, user: action.payload}
        default:
            return state
    }
}