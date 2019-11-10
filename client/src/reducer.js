const initialState = {
    testData: "Initial State.",
};

export const testAction = (text) => {
    return {
        type: 'ACTION_TEST',
        payload: text
    }
}

const rootReducer = (state = initialState,action) => {
    switch(action.type) {
        case 'ACTION_TEST':
            console.log("Test action received.");
            return {
                ...state,
                testData: action.payload
            };
        default:
            return state;
    }
}

export default rootReducer;