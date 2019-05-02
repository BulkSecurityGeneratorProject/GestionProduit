import { IClient } from 'app/shared/model/client.model';
import { ICommande } from 'app/shared/model/commande.model';
import { IProduit } from 'app/shared/model/produit.model';

export interface IVente {
    id?: number;
    code?: string;
    quantite?: number;
    prixUnitaire?: number;
    client?: IClient;
    commande?: ICommande;
    produit?: IProduit;
}

export class Vente implements IVente {
    constructor(
        public id?: number,
        public code?: string,
        public quantite?: number,
        public prixUnitaire?: number,
        public client?: IClient,
        public commande?: ICommande,
        public produit?: IProduit
    ) {}
}
