import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Vente } from 'app/shared/model/vente.model';
import { VenteService } from './vente.service';
import { VenteComponent } from './vente.component';
import { VenteDetailComponent } from './vente-detail.component';
import { VenteUpdateComponent } from './vente-update.component';
import { VenteDeletePopupComponent } from './vente-delete-dialog.component';
import { IVente } from 'app/shared/model/vente.model';

@Injectable({ providedIn: 'root' })
export class VenteResolve implements Resolve<IVente> {
    constructor(private service: VenteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IVente> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Vente>) => response.ok),
                map((vente: HttpResponse<Vente>) => vente.body)
            );
        }
        return of(new Vente());
    }
}

export const venteRoute: Routes = [
    {
        path: '',
        component: VenteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionProduitsApp.vente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: VenteDetailComponent,
        resolve: {
            vente: VenteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionProduitsApp.vente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: VenteUpdateComponent,
        resolve: {
            vente: VenteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionProduitsApp.vente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: VenteUpdateComponent,
        resolve: {
            vente: VenteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionProduitsApp.vente.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ventePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: VenteDeletePopupComponent,
        resolve: {
            vente: VenteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionProduitsApp.vente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
