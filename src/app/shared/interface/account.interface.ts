import { Attachment } from "./attachment.interface";
import { Permission, Role } from "./role.interface";
import { Point } from "./point.interface";
import { Wallet } from "./wallet.interface";
import { PaymentDetails } from "./payment-details.interface";
import { UserAddress } from "./user.interface";
import { Category } from "./category.interface";
import { Product } from "./product.interface";

export interface AccountUser {
    idUser?: number;
    nom?: string;
    prenom?: string;
    date_naissance?: string;
    password?: string;
    tel?: number;
    adresses?: UserAddress[];
    nbrTotalCommande?: number;
    montantTotalCommandeImpaye?: number;
    montantTotalCommandePaye?: number;
    createdAt?: string;
    updatedAt?: string;


    id: number;
    name: string;
    email: string;
    phone: string;
    country_code: string;
    profile_image?: Attachment;
    profile_image_id?: number;
    status: boolean;
    email_verified_at: string;
    payment_account: PaymentDetails;
    role_id: number;
    role_name?: string;
    role?: Role;
    permission: Permission[];
    address?: UserAddress[];
    point?: Point;
    wallet?: Wallet;
    orders_count: number;
    is_approved: boolean;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface AccountUserUpdatePassword {
    current_password: string;
    password: string;
    password_confirmation: string;
}

export interface HomeData {
    firt_section: {
        // produit en vedette
        title: string,
        description: string,
        article: any[],
    },
    secode_section: {
        //deal de la semaine
        title: string,
        description: string,
        article: any[],
    },
    third_section: {
        //meilleur vente,
        title: string,
        description: string,
        article: any[],
    },
    fourth_section: {
        //meilleur vente,
        title: string,
        description: string,
        article: any[],
    },
    v_img : {idImage: number, lien: string, type: "collections"}[],

    list_categories: Category[],
    
}