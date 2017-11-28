import { Injectable, Inject, OpaqueToken } from "@angular/core";
import { Http, Request, RequestMethod, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { SciaDll } from "./sciaDll.model";
import { DllDependency } from "./dllDependency.model";
import { IModelDataSource } from "./datasource.interface.model";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { Subject } from "rxjs/Subject";

export const REST_URL = new OpaqueToken("rest_url");
export const REST_URL_DEP = new OpaqueToken("rest_url_dep");

@Injectable()
export class RestDataSource implements IModelDataSource {

    constructor(
        private http: Http,
        @Inject(REST_URL) private url: string,
        @Inject(REST_URL_DEP) private urlDep: string,
    ) { }

    getSciaDlls(): Observable<SciaDll[]> {
        return this.sendRequest(RequestMethod.Get, this.url);
    }

    getSciaDllDeps(): Observable<DllDependency[]> {
        return this.sendRequest(RequestMethod.Get, this.urlDep);
    }

    // saveSciaDll(SciaDll: SciaDll): Observable<SciaDll> {
    //     return this.sendRequest(RequestMethod.Post, this.url, SciaDll);
    // }

    // updateSciaDll(SciaDll: SciaDll): Observable<SciaDll> {
    //     return this.sendRequest(RequestMethod.Put,
    //         `${this.url}/${SciaDll.id}`, SciaDll);
    // }

    // deleteSciaDll(id: number): Observable<SciaDll> {
    //     return this.sendRequest(RequestMethod.Delete, `${this.url}/${id}`);
    // }

    private sendRequest(verb: RequestMethod,
        url: string, body?: SciaDll): Observable<any> {

        let headers = new Headers();
        headers.set("Access-Key", "<secret>");
      //headers.set("Access-Key", "<secret>");
        //headers.set("Application-Names", ["exampleApp", "proAngular"]);

        return this.http.request(new Request({
            method: verb,
            url: url,
            body: body
          //,
          //  headers: headers
        }))

            .map(function (response) {
                console.log("+++++++++++ " + response);
                return response.json();
            })
            .catch(function (error) {
                return Promise.reject(`Network Error: ${error.statusText} (${error.status})`);
            })
    }
}
