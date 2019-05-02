import { ICommande } from 'app/shared/model/commande.model';
import { IVente } from 'app/shared/model/vente.model';

export const enum ProduitStatus {
    DISPONIBLE = 'DISPONIBLE',
    NON_DISPONIBLE = 'NON_DISPONIBLE'
}

export interface IProduit {
    id?: number;
    code?: string;
    nom?: string;
    prixAchat?: number;
    prixVente?: number;
    quantite?: number;
    status?: ProduitStatus;
    commandes?: ICommande[];
    ventes?: IVente[];
}

export class Produit implements IProduit {
    constructor(
        public id?: number,
        public code?: string,
        public nom?: string,
        public prixAchat?: number,
        public prixVente?: number,
        public quantite?: number,
        public status?: ProduitStatus,
        public commandes?: ICommande[],
        public ventes?: IVente[]
    ) {}
}
