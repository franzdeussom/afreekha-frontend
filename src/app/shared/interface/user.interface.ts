import { Role } from "./role.interface";
import { Country } from "./country.interface";
import { States } from "./state.interface";
import { Attachment } from "./attachment.interface";
import { Wallet } from "./wallet.interface";
import { Point } from "./point.interface";
import { PaymentDetails } from "./payment-details.interface";

export interface User {
    idUser?: number;
    nom?: string;
    prenom?: string;
    date_naissance?: string;
    password?: string;
    tel?: number;
    createdAt?: string;
    updatedAt?: string;
    adresses?: UserAddress[];
    nbrTotalCommande?: number;
    montantTotalCommandeImpaye?: number;
    montantTotalCommandePaye?: number;

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
    address?: UserAddress[];
    point?: Point;
    wallet?: Wallet;
    orders_count: number;
    is_approved: boolean;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface UserAddress {
    id: number;
    user_id: number;
    title: string;
    street: string;
    type: string;
    city: string;
    pincode: string | number;
    state_id: number;
    state: States;
    country: Country;
    country_code: number;
    phone: number;
    country_id: number;

    idAdresse: number
    adresse: string;
    ville: string;
    pays: string;
    etat: string;
    numero_telephone: string;
    titre: string;
    idUser: number;
    is_default: boolean;
}