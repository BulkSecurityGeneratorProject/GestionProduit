import { ICommande } from 'app/shared/model/commande.model';
import { IVente } from 'app/shared/model/vente.model';

export interface IClient {
    id?: number;
    nom?: string;
    commandes?: ICommande[];
    ventes?: IVente[];
}

export class Client implements IClient {
    constructor(public id?: number, public nom?: string, public commandes?: ICommande[], public ventes?: IVente[]) {}
}
