import { Component, Inject } from "@angular/core";
import { SciaDll } from "../model/SciaDll.model";
import { ModelRepository } from "../model/repository.model";
import { MODES, SharedState, SHARED_STATE } from "./sharedState.model";
import { Observer } from "rxjs/Observer";
import { Router } from "@angular/router";
import { DllCategory, DllStatus } from "../model/shared.model";

export class CategorySet {
    constructor(
        public n: boolean,
        public name: string,
        cat: DllCategory) {   
    }
}

@Component({
    selector: 'app-set',
    templateUrl: "setting.component.html"
})
export class SettingComponent {
    catset = new Array<CategorySet>();

    // dllCat = DllCategory;
    // categories() : Array<string> {
    //     var keys = Object.keys(this.dllCat);
    //     return keys.slice(keys.length / 2);
    // }
    // dllStatus = DllStatus;
    // statuses() : Array<string> {
    //     var keys = Object.keys(this.dllStatus);
    //     return keys.slice(keys.length / 2);
    // }
    constructor(
        private router: Router,
        private modelRepo: ModelRepository,
        @Inject(SHARED_STATE) private observer: Observer<SharedState>) {
        this.catset.push(new CategorySet (false, "Checks", DllCategory.Checks));
        this.catset.push(new CategorySet (false, "DataModel", DllCategory.DataModel));
        this.catset.push(new CategorySet (false, "GUI", DllCategory.GUI));
        this.catset.push(new CategorySet (false, "Kernel", DllCategory.Kernel));
        this.catset.push(new CategorySet (false, "Storage", DllCategory.Storage));
        this.catset.push(new CategorySet (false, "UT", DllCategory.UT));
    }
}
