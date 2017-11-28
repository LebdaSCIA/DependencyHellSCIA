import { Component, Inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DllCategory } from "../model/shared.model";
import { SciaDll } from "../model/SciaDll.model";
import { DllDependency } from "../model/dllDependency.model";
import { MODES, SharedState, SHARED_STATE } from "./sharedState.model";
import { ModelRepository } from "../model/repository.model";
import { Observable } from "rxjs/Observable";

@Component({
    moduleId: module.id,
    templateUrl: "tableDet.component.html"
})
export class TableDetComponent {
    private Create

    model: SciaDll;

    DllId: number;
    DllDependencies : DllDependency[];

    constructor(
        @Inject(SHARED_STATE) private stateEvents: Observable<SharedState>,
        private repository: ModelRepository,
        private router: Router,
        activeRoute: ActivatedRoute) {
        this.DllId = activeRoute.snapshot.params["id"];
        if (this.DllId > 0 && this.DllId != null) {
          repository.getSciaDllPromise(this.DllId, (dll) => this.model = dll);
          repository.getSciaDllDepsForSrPromise(this.DllId, (dll) => this.DllDependencies = dll);
        }
    }

    selectSciaDll(key: number) {
      //this.observer.next(new SharedState(MODES.TABLE_DET, key));
      this.router.navigateByUrl(`/det/${key}`, );
      this.DllId = key;
      this.repository.getSciaDllDepsForSrPromise(this.DllId, (dll) => this.DllDependencies = dll);
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
