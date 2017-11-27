import { NgModule } from "@angular/core";
import { HttpModule, JsonpModule } from "@angular/http"
import { IModelDataSource } from "./datasource.interface.model";
import { ModelRepository } from "./repository.model";
import { RestDataSource, REST_URL } from "./rest.datasource";

@NgModule({
    imports: [HttpModule, JsonpModule],
    providers: [ModelRepository,
        { provide: IModelDataSource, useClass: RestDataSource },
        { provide: REST_URL, useValue: `http://${location.hostname}:3500/sciaDlls` }]
})
export class ModelModule { }
