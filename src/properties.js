import ProductsView from "./components/products/ProductsView";
import UsersView from "./components/users/UsersView";
import OrdersView from "./components/orders/OrdersView";

export const properties = {
    contacts: {
        phone: "(+373) 69 479 862",
        email: "electron@gmail.com",
        mailto: "mailto:electron@gmail.com"
    },
    header: {
        links: [
            {
                id: "orders",
                path: "/",
                component: OrdersView
            },
            {
                id: "products",
                path: "/produse",
                component: ProductsView
            },
            {
                id: "users",
                path: "/contacte",
                component: UsersView
            }
        ]
    },
    orderDetails: {
        path: "/order/",
        paramName: "orderId"
    },
    productDetails: {
        path: "/product/",
        paramName: "productId"
    },
    createProduct: {
        path: "/createproduct",
    },
    userDetails: {
        path: "/user/",
        paramName: "userId"
    }
};