export const ROUTES_API = {
    ARTICLE: {
        GET: (id: string) => `/article/${id}`,
        GET_BY_ID: (id: string) => `/article-single/${id}`,
        CREATE: '/articles',
        UPDATE: (id: string) => `/admin/article/${id}`,
        DELETE: (id: string) => `/admin/article/${id}`
    },

    CATEGORIE: {
        GET: '/categorieAndSousCategorie',
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
        RESET_PASSWORD: "/users/reset-password",
        SEND_CODE: "/users/recovery-password",
        UPDATE: (id: string)=> `/admin/users/${id}`, //{nom, prenom, numero_telephone}
        UPDATE_PASSWORD: (id: string)=> `/password/${id}`, //{current_password, new_password}
    },

    ADRESSE: {
        POST_GET_PUT: "/adresse",
        DELETE: "/adresse/"
    },
    ORDER: {
        GET: "/order",
        GET_BY_ID: (id: string, offset: string) => `/my-facture/${offset}/${id}`,
        CREATE: "/order",
        UPDATE: (id: string) => `/order/${id}`,
        DELETE: (id: string) => `/order/${id}`,
        POST: "/commande"
    }
  };