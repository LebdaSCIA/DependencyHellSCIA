import { Injectable } from "@angular/core";
import { SciaDll } from "./sciaDll.model";
import { DllDependency } from "./dllDependency.model";
import { Observable } from "rxjs/Observable";

@Injectable()
export abstract class IModelDataSource {
    abstract getSciaDlls(): Observable<SciaDll[]>;
    abstract getSciaDllDeps(): Observable<DllDependency[]>;
}

