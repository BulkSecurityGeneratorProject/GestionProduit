import { IClient } from 'app/shared/model/client.model';
import { IProduit } from 'app/shared/model/produit.model';
import { IVente } from 'app/shared/model/vente.model';

export interface ICommande {
    id?: number;
    numero?: string;
    quantite?: number;
    client?: IClient;
    produit?: IProduit;
    ventes?: IVente[];
}

export class Commande implements ICommande {
    constructor(
        public id?: number,
        public numero?: string,
        public quantite?: number,
        public client?: IClient,
        public produit?: IProduit,
        public ventes?: IVente[]
    ) {}
}
