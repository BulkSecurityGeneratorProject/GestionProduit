import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IVente } from 'app/shared/model/vente.model';
import { VenteService } from './vente.service';
import { IClient } from 'app/shared/model/client.model';
import { ClientService } from 'app/entities/client';
import { ICommande } from 'app/shared/model/commande.model';
import { CommandeService } from 'app/entities/commande';
import { IProduit } from 'app/shared/model/produit.model';
import { ProduitService } from 'app/entities/produit';

@Component({
    selector: 'jhi-vente-update',
    templateUrl: './vente-update.component.html'
})
export class VenteUpdateComponent implements OnInit {
    vente: IVente;
    isSaving: boolean;

    clients: IClient[];

    commandes: ICommande[];

    produits: IProduit[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected venteService: VenteService,
        protected clientService: ClientService,
        protected commandeService: CommandeService,
        protected produitService: ProduitService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ vente }) => {
            this.vente = vente;
        });
        this.clientService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IClient[]>) => mayBeOk.ok),
                map((response: HttpResponse<IClient[]>) => response.body)
            )
            .subscribe((res: IClient[]) => (this.clients = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.commandeService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICommande[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICommande[]>) => response.body)
            )
            .subscribe((res: ICommande[]) => (this.commandes = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.produitService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProduit[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProduit[]>) => response.body)
            )
            .subscribe((res: IProduit[]) => (this.produits = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.vente.id !== undefined) {
            this.subscribeToSaveResponse(this.venteService.update(this.vente));
        } else {
            this.subscribeToSaveResponse(this.venteService.create(this.vente));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IVente>>) {
        result.subscribe((res: HttpResponse<IVente>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackClientById(index: number, item: IClient) {
        return item.id;
    }

    trackCommandeById(index: number, item: ICommande) {
        return item.id;
    }

    trackProduitById(index: number, item: IProduit) {
        return item.id;
    }
}
