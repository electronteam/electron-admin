import OrdersView from "./components/OrdersView";
import ProductsView from "./components/ProductsView";
import UsersView from "./components/UsersView";

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
        id: "Identificatorul",
        customerName: "Prenume client",
        customerLastName: "Nume client",
        totalPrice: "Total comandă",
        createdDate: "Data creării",
        viewDetails: "Vezi Detaliile"
    },
    usersView: {
        noUserDisplayText: "Nu a fost gasit nici un utilizator",
        name: "Prenume utilizator",
        lastName: "Nume utilizator",
        email: "Email utilizator",
        address: "Addressa utilizator",
        phone: "Telefon utilizator",
        role: "Rolurile utilizatorului"
    },
    orderDetails: {
        path: "/order/",
        paramName: "orderId",
        id: "Identificatorul:",
        customerName: "Prenume:",
        customerLastName: "Nume:",
        customerEmail: "Email:",
        customerPhone: "Telefon:",
        productName: "Nume produs",
        productPrice: "Preț",
        productQuantity: "Cantitate",
        entryTotalPrice: "Total",
        orderTotalPrice: "Total comandă:",
        addressDetailsTitle: "Detaliile adresei de livrare",
        city: "Localitate:",
        street: "Strada:",
        clientDetailsTitle: "Detaliile clientului",
        orderNotFoundDisplayText: "Nu a fost gasita comanda"
    },
    productsView: {
        noProductsDisplayText: "Nu a fost adaugat nici un produs",
    },
    login: {
        emailPlaceHolder: "Email",
        passwordPlaceHolder: "Parolă"
    },
    api: {
        allOrders: "http://localhost:8080/api/admin/orders",
        allUsers: "http://localhost:8080/api/admin/users",
        products: "http://localhost:8080/api/admin/products",
        orderByCode: "http://localhost:8080/api/admin/order",
        login: "http://localhost:8080/login"
    },
    buttons: {
        login: "Autentificare",
    }
};