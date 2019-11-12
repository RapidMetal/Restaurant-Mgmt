import { toast } from "react-toastify";

const initialState = {
    testData: "Initial State.",
    user: {
        name: "D_Employee",
        id: "D_id",
        isManager: false,
    },
    employeeDetails: {
        tips: 0,
        rating: 4,
        orderCount: 1,
    },
    menu: [{
        _id: '1',
        name: 'item1',
        type: 'entree',
        price: 200
    }, {
        _id: '2',
        name: 'item2',
        type: 'main',
        price: 500
    }, {
        _id: '3',
        name: 'item3',
        type: 'dessert',
        price: 400
    }],
    employees: [{
        name: 'Server A',
        orderCount: 5,
        tips: 270,
        rating: 4.2
    }, {
        name: 'Server B',
        orderCount: 9,
        tips: 550,
        rating: 3.8
    }, {
        name: 'Server C',
        orderCount: 27,
        tips: 1990,
        rating: 3.5
    }],
    restaurantDetails: {
        orderCount: 41,
        revenue: 21600,
        tips: 2810,
        rating: 3.65
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
        isManager: loginDetails.isManager,
    }
}

export const actionLogout = () => {
    return {
        type: 'ACTION_LOGOUT',
    }
}

export const actionSetEmployeeDetails = (employeeDetails) => {
    return {
        type: 'ACTION_SET_EMPLOYEE_DETAILS',
        tips: employeeDetails.tips,
        rating: employeeDetails.rating,
        orderCount: employeeDetails.orderCount
    }
}

export const actionSetMenu = (newMenu) => {
    return {
        type: 'ACTION_SET_MENU',
        menu: newMenu
    }
}

export const actionSetRestaurantDetails = (restaurantDetails) => {
    return {
        type: 'ACTION_SET_RESTAURANT_DETAILS',
        orderCount: restaurantDetails.orderCount,
        revenue: restaurantDetails.revenue,
        tips: restaurantDetails.tips,
        rating: restaurantDetails.rating
    }
}

export const actionSetEmployeeSummary = (employees) => {
    return {
        type: 'ACTION_SET_EMPLOYEE_SUMMARY',
        employees: employees
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
            console.log('User login, manager = ' + action.isManager);
            var newUserLogin = {
                name: action.empName,
                token: action.userToken,
                isManager: action.isManager,
            };
            return {
                ...state,
                user: newUserLogin
            };
        case 'ACTION_LOGOUT':
            console.log('User logged out.');
            return {
                ...state,
                user: initialState.user,
                employeeDetails: initialState.employeeDetails,
                employees: initialState.employees,
                restaurantDetails: initialState.restaurantDetails
            }
        case 'ACTION_SET_EMPLOYEE_DETAILS':
            console.log("User is an employee.");
            var newEmployeeDetails = {
                tips: action.tips,
                rating: action.rating,
                orderCount: action.orderCount,
            };
            return {
                ...state,
                employeeDetails: newEmployeeDetails
            }
        case 'ACTION_SET_MENU':
            console.log("Setting new menu...");
            return {
                ...state,
                menu: action.menu,
            }
        case 'ACTION_SET_RESTAURANT_DETAILS':
            console.log("User is a manager.");
            var newRestaurantDetails = {
                orderCount: action.orderCount,
                revenue: action.revenue,
                tips: action.tips,
                rating: action.rating,
            }
            return {
                ...state,
                restaurantDetails: newRestaurantDetails
            }
        case 'ACTION_SET_EMPLOYEE_SUMMARY':
            console.log("Setting new employee summary...");
            return {
                ...state,
                employees: action.employees,
            }
        default:
            return state;
    }
}

export default rootReducer;