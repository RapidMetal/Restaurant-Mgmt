import { toast } from "react-toastify";

const initialState = {
    testData: "Initial State.",
    user: {
        name: "",
        id: "",
        token: "",
        isManager: false,
    }
};

export const actionTest = (text) => {
    return {
        type: 'ACTION_TEST',
        payload: text,
    }
}

export const actionLogin = (loginDetails) => {
    return {
        type: 'ACTION_LOGIN',
        empName: loginDetails.empName,
        userId: loginDetails.userId,
        userToken: loginDetails.userToken,
        isManager: loginDetails.isManager,
    }
}

const rootReducer = (state = initialState,action) => {
    switch(action.type) {
        case 'ACTION_TEST':
            console.log("Test action received.");
            toast("Tested successfully! New content : " + action.payload);
            return {
                ...state,
                testData: action.payload
            };
        case 'ACTION_LOGIN':
            console.log("User logged in.");
            var newUserLogin = {
                name: action.empName,
                id: action.userId,
                token: action.userToken,
                isManager: action.isManager,
            };
            return {
                ...state,
                user: newUserLogin
            };
        default:
            return state;
    }
}

export default rootReducer;