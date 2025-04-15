export const ROUTES_API = {
    ARTICLE: {
        GET: '/articles',
        GET_BY_ID: (id: string) => `/articles/${id}`,
        CREATE: '/articles',
        UPDATE: (id: string) => `/admin/articles/${id}`,
        DELETE: (id: string) => `/admin/articles/${id}`
    },

    CATEGORIE: {
        GET: '/allCategorie',
        GET_BY_ID: (id: string) => `/categories/${id}`,
        CREATE: '/categories',
        UPDATE: (id: string) => `/admin/categories/${id}`,
        DELETE: (id: string) => `/admin/categories/${id}`
    },
    HOME: {
        GET: '/home-data'
    },
    USERS: {
        //post
        AUTH_LOGIN: "/auth",
        REGISTER: "/users",
        UPDATE: (id: string)=> `/users/${id}`, //{nom, prenom, numero_telephone}
        UPDATE_PASSWORD: (id: string)=> `/users/update-password/${id}`, //{current_password, new_password}
    },

    ADRESSE: {
        POST_GET_PUT: "/adresse",
        DELETE: "/adresse/"
    },
    ORDER: {
        GET: "/order",
        GET_BY_ID: (id: string, offset: string) => `/my-facture/${offset}/1`,
        CREATE: "/order",
        UPDATE: (id: string) => `/order/${id}`,
        DELETE: (id: string) => `/order/${id}`
    }
  };