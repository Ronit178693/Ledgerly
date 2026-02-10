export const BASE_URI = import.meta.env.VITE_API_URL || "https://ledgerly-08fs.onrender.com";

export const API_PATHS = {
    AUTH: {
        LOGIN: "api/auth/login",
        SIGNUP: "api/auth/signup",
        LOGOUT: "api/auth/logout"
    },
    USER: {
        GET_USER_DATA: "api/user/getUserData",
    },
    INCOME: {
        GET_INCOME: "api/income/getincome",
        ADD_INCOME: "api/income/addincome",
        DELETE_INCOME: (id) => `api/income/${id}`
    },
    EXPENSES: {
        ADD_EXPENSES: "api/expense/addexpense",
        GET_EXPENSES: "api/expense/getexpense",
        DELETE_EXPENSES: (id) => `api/expense/${id}`
    },
    DASHBOARD: {
        GET_DASHBOARD: "api/dashboard/dashboard-data"
    }
};