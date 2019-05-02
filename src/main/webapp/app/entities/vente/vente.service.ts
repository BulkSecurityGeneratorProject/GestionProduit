import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVente } from 'app/shared/model/vente.model';

type EntityResponseType = HttpResponse<IVente>;
type EntityArrayResponseType = HttpResponse<IVente[]>;

@Injectable({ providedIn: 'root' })
export class VenteService {
    public resourceUrl = SERVER_API_URL + 'api/ventes';

    constructor(protected http: HttpClient) {}

    create(vente: IVente): Observable<EntityResponseType> {
        return this.http.post<IVente>(this.resourceUrl, vente, { observe: 'response' });
    }

    update(vente: IVente): Observable<EntityResponseType> {
        return this.http.put<IVente>(this.resourceUrl, vente, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IVente>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IVente[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
