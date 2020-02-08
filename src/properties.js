import OrdersView from "./components/OrdersView";
import ProductsView from "./components/ProductsView";
import {UsersView} from "./components/UsersView";

export const properties = {
    contacts: {
        phone: "(+373) 69 479 862",
        email: "electron@gmail.com",
        mailto: "mailto:electron@gmail.com"
    },
    header: {
        links: [
            {
                displayText: "Comenzile",
                path: "/",
                component: OrdersView
            },
            {
                displayText: "Produse",
                path: "/produse",
                component: ProductsView
            },
            {
                displayText: "Utilizatori",
                path: "/contacte",
                component: UsersView
            }
        ]
    },
    ordersView: {
        noOrdersDisplayText: "Nu a fost plasată nici o comandă",
    },
    productsView: {
        noProductsDisplayText: "Nu a fost adaugat nici un produs",
    },
    login: {
        emailPlaceHolder: "Email",
        passwordPlaceHolder: "Parolă"
    },
    api: {
        allOrders: "/api/admin/orders",
        products: "/api/admin/products",
        login: "/login"
    },
    buttons: {
        login: "Autentificare",
    }
};