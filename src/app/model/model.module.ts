import { NgModule } from "@angular/core";
import { HttpModule, JsonpModule } from "@angular/http"
import { IModelDataSource } from "./datasource.interface.model";
import { ModelRepository } from "./repository.model";
import { RestDataSource, REST_URL, REST_URL_DEP, REST_URL_DEP_FOR_SRC } from "./rest.datasource";

@NgModule({
    imports: [HttpModule, JsonpModule],
    providers: [ModelRepository,
        { provide: IModelDataSource, useClass: RestDataSource },
        //{ provide: REST_URL, useValue: `http://${location.hostname}:3500/sciaDlls` },
      //{ provide: REST_URL_DEP, useValue: `http://${location.hostname}:3500/sciaDllDeps` }
        { provide: REST_URL, useValue: `http://portal.scia.cz/portalws/dependencyhell/api/SCIADLLs` },
        { provide: REST_URL_DEP, useValue: `http://portal.scia.cz/portalws/dependencyhell/api/DllDependencies` },
        { provide: REST_URL_DEP_FOR_SRC, useValue: `http://portal.scia.cz/portalws/dependencyhell/api/DllDependencies?targetId=` }]
})
export class ModelModule { }
