import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVente } from 'app/shared/model/vente.model';
import { AccountService } from 'app/core';
import { VenteService } from './vente.service';

@Component({
    selector: 'jhi-vente',
    templateUrl: './vente.component.html'
})
export class VenteComponent implements OnInit, OnDestroy {
    ventes: IVente[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected venteService: VenteService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.venteService
            .query()
            .pipe(
                filter((res: HttpResponse<IVente[]>) => res.ok),
                map((res: HttpResponse<IVente[]>) => res.body)
            )
            .subscribe(
                (res: IVente[]) => {
                    this.ventes = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInVentes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVente) {
        return item.id;
    }

    registerChangeInVentes() {
        this.eventSubscriber = this.eventManager.subscribe('venteListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
