import { NgModule } from "@angular/core";
import { HttpModule, JsonpModule } from "@angular/http"
import { IModelDataSource } from "./datasource.interface.model";
import { ModelRepository } from "./repository.model";
import { RestDataSource, REST_URL, REST_URL_DEP } from "./rest.datasource";

@NgModule({
    imports: [HttpModule, JsonpModule],
    providers: [ModelRepository,
        { provide: IModelDataSource, useClass: RestDataSource },
<<<<<<< HEAD
        { provide: REST_URL, useValue: `http://portal.scia.cz/portalws/dependencyhell/api/SCIADLLs` },
        { provide: REST_URL_DEP, useValue: `http://${location.hostname}:3500/sciaDllDeps` }]
=======
        //{ provide: REST_URL, useValue: `http://${location.hostname}:3500/sciaDlls` },
      //{ provide: REST_URL_DEP, useValue: `http://${location.hostname}:3500/sciaDllDeps` }
        { provide: REST_URL, useValue: `http://portal.scia.cz/portalws/dependencyhell/api/SCIADLLs` },
        { provide: REST_URL_DEP, useValue: `http://portal.scia.cz/portalws/dependencyhell/api/DllDependencies` }]
>>>>>>> 3b77d54a23a455ef3bf3bc7bab9a1a5e1511ebe3
})
export class ModelModule { }
