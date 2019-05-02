import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { GestionProduitsSharedModule } from 'app/shared';
import {
    VenteComponent,
    VenteDetailComponent,
    VenteUpdateComponent,
    VenteDeletePopupComponent,
    VenteDeleteDialogComponent,
    venteRoute,
    ventePopupRoute
} from './';

const ENTITY_STATES = [...venteRoute, ...ventePopupRoute];

@NgModule({
    imports: [GestionProduitsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [VenteComponent, VenteDetailComponent, VenteUpdateComponent, VenteDeleteDialogComponent, VenteDeletePopupComponent],
    entryComponents: [VenteComponent, VenteUpdateComponent, VenteDeleteDialogComponent, VenteDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionProduitsVenteModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
