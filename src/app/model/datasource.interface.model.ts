import { Injectable } from "@angular/core";
import { SciaDll } from "./sciaDll.model";
import { Observable } from "rxjs/Observable";

@Injectable()
export abstract class IModelDataSource {
    abstract getData(): Observable<SciaDll[]>;
}

