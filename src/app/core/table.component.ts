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

    constructor(
        private appSetting: AppSetting,
        private router: Router,
        private modelRepo: ModelRepository,
        @Inject(SHARED_STATE) private stateEvents: Observable<SharedState>) {
        stateEvents.subscribe((update) => {
            let kunda : number = 1;
            kunda++;
        });

    }

    getSciaDll(key: number): SciaDll {
        return this.modelRepo.getSciaDll(key);
    }

    getSciaDlls(): SciaDll[] {
        return this.modelRepo.getSciaDlls();
    }

    selectSciaDll(key: number) {
        // this.observer.next(new SharedState(MODES.TABLE_DET, key));
        this.router.navigateByUrl(`/table/det/${key}`);
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
