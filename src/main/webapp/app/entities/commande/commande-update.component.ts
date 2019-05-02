import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICommande } from 'app/shared/model/commande.model';
import { CommandeService } from './commande.service';
import { IClient } from 'app/shared/model/client.model';
import { ClientService } from 'app/entities/client';
import { IProduit } from 'app/shared/model/produit.model';
import { ProduitService } from 'app/entities/produit';

@Component({
    selector: 'jhi-commande-update',
    templateUrl: './commande-update.component.html'
})
export class CommandeUpdateComponent implements OnInit {
    commande: ICommande;
    isSaving: boolean;

    clients: IClient[];

    produits: IProduit[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected commandeService: CommandeService,
        protected clientService: ClientService,
        protected produitService: ProduitService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ commande }) => {
            this.commande = commande;
        });
        this.clientService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IClient[]>) => mayBeOk.ok),
                map((response: HttpResponse<IClient[]>) => response.body)
            )
            .subscribe((res: IClient[]) => (this.clients = res), (res: HttpErrorResponse) => this.onError(res.message));
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
        if (this.commande.id !== undefined) {
            this.subscribeToSaveResponse(this.commandeService.update(this.commande));
        } else {
            this.subscribeToSaveResponse(this.commandeService.create(this.commande));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommande>>) {
        result.subscribe((res: HttpResponse<ICommande>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProduitById(index: number, item: IProduit) {
        return item.id;
    }
}
