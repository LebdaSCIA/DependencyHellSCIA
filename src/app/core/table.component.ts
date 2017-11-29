import { Component, Inject } from "@angular/core";
import { SciaDll } from "../model/SciaDll.model";
import { ModelRepository } from "../model/repository.model";
import { MODES, SharedState, SHARED_STATE } from "./sharedState.model";
import { Observer } from "rxjs/Observer";
import { Router } from "@angular/router";
import { AppSetting } from "./app.setting.service";
import { Observable } from "rxjs/Observable";

@Component({
    moduleId: module.id,
    templateUrl: "table.component.html"
})
export class TableComponent {
    SciaDlls = new Array<SciaDll>();
    SciaDllsAll = new Array<SciaDll>();
    constructor(
        private appSetting: AppSetting,
        private router: Router,
        private repository: ModelRepository,
        @Inject(SHARED_STATE) private stateEvents: Observable<SharedState>) {
        repository.getSciaDllsPromise((dlls) => {
            this.SciaDllsAll = dlls;
            for (let item of this.SciaDllsAll) {
                this.SciaDlls.push(item);
            }
        });

        stateEvents.subscribe((update) => {
            this.SciaDlls = new Array<SciaDll>();
            for (let item of this.SciaDllsAll) {
                this.SciaDlls.push(item);
            }
            for (let item of appSetting.catset) {
                if (!item.on) {
                    this.SciaDlls = this.SciaDlls.filter(dll => dll.Category1.Name != item.name);
                }
            }
        });

    }

    // getSciaDll(key: number): SciaDll {
    //     return this.modelRepo.getSciaDll(key);
    // }

    // getSciaDlls(): SciaDll[] {
    //     return this.modelRepo.getSciaDlls();
    // }

    selectSciaDll(key: number) {
        //this.observer.next(new SharedState(MODES.TABLE_DET, key));
        this.router.navigateByUrl(`/det/${key}`);
    }


    // deleteProduct(key: number) {
    //     this.model.deleteProduct(key);
    // }

    // editProduct(key: number) {
    //     this.observer.next(new SharedState(MODES.EDIT, key));
    // }

    // createProduct() {
    //     this.observer.next(new SharedState(MODES.CREATE));
    // }
}
