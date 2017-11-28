import { Component, Inject } from "@angular/core";
import { SciaDll } from "../model/SciaDll.model";
import { ModelRepository } from "../model/repository.model";
import { MODES, SharedState, SHARED_STATE } from "./sharedState.model";
import { Observer } from "rxjs/Observer";
import { Router } from "@angular/router";

@Component({
    moduleId: module.id,
    templateUrl: "table.component.html"
})
export class TableComponent {

    constructor(
        private router: Router,
        private modelRepo: ModelRepository,
        @Inject(SHARED_STATE) private observer: Observer<SharedState>) { }

    getSciaDll(key: number): SciaDll {
        return this.modelRepo.getSciaDll(key);
    }

    getSciaDlls(): SciaDll[] {
        return this.modelRepo.getSciaDlls();
    }

    selectSciaDll(key: number) {
        this.observer.next(new SharedState(MODES.TABLE_DET, key));
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
