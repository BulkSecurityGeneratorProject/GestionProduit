import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'produit',
                loadChildren: './produit/produit.module#GestionProduitsProduitModule'
            },
            {
                path: 'client',
                loadChildren: './client/client.module#GestionProduitsClientModule'
            },
            {
                path: 'commande',
                loadChildren: './commande/commande.module#GestionProduitsCommandeModule'
            },
            {
                path: 'vente',
                loadChildren: './vente/vente.module#GestionProduitsVenteModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionProduitsEntityModule {}
