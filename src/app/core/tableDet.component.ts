import { Component, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DllCategory } from "../model/shared.model";
import { SciaDll } from "../model/SciaDll.model";
import { MODES, SharedState, SHARED_STATE } from "./sharedState.model";
import { ModelRepository } from "../model/repository.model";
import { Observable } from "rxjs/Observable";

@Component({
    moduleId: module.id,
    templateUrl: "tableDet.component.html"
})
export class TableDetComponent {
    private Create

    model: SciaDll = SciaDll.Factory();

    constructor(
        @Inject(SHARED_STATE) private stateEvents: Observable<SharedState>,
        private repository: ModelRepository,
        private router: Router,
        activeRoute: ActivatedRoute) {
        stateEvents.subscribe((update) => {
            this.model = SciaDll.Factory();
            if (update.id != undefined && update.id > 0 && update.mode == MODES.TABLE_DET) {
                Object.assign(this.model, this.repository.getSciaDll(update.id));
                console.log("Table det subscribed !");
            }
        });
        let dllId: number = activeRoute.snapshot.params["id"]
        if (dllId > 0 && dllId != null) {
            repository.getSciaDllPromise(dllId, (dll) => this.model = dll);
        }
    }

    // constructor(@Inject(SHARED_STATE) private stateEvents: Observable<SharedState>) {
    //     stateEvents.subscribe((update) => {
    //         this.model = new SciaDll(-1, "Not set", "Not set", DllCategory.BussinesLogic);
    //         if (update.id != undefined) {
    //             Object.assign(this.product, this.model.getProduct(update.id));
    //         }
    //         this.editing = update.mode == MODES.EDIT;
    //     });
    // }
} 