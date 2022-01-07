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
    },
    api: {
        allOrders: "http://localhost:8080/api/admin/orders",
        users: "http://localhost:8080/api/admin/users",
        userById: "http://localhost:8080/api/admin/user",
        products: "http://localhost:8080/api/admin/products",
        orderByCode: "http://localhost:8080/api/admin/order",
        productByCode: "http://localhost:8080/api/product",
        getProductImage: "http://localhost:8080/api/productImage",
        uploadProductImage: "http://localhost:8080/api/upload/productImage/",
        login: "http://localhost:8080/login",
        createProduct: "http://localhost:8080/api/admin/createProduct",
        updateProduct: "http://localhost:8080/api/admin/updateProduct"
    },
    url: {
        imageServerURL: "http://localhost:8080/"
    }
};