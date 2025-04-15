import { Product } from "./product.interface";

export interface Home {
    vedette?: Product[];
    promos?: Product[];
    tendance?: Product[];
    m_ventes?: Product[];
    v_imgs: any;
}