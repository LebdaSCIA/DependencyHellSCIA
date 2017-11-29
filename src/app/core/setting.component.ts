import { Component, Inject } from "@angular/core";
import { SciaDll } from "../model/SciaDll.model";
import { ModelRepository } from "../model/repository.model";
import { MODES, SharedState, SHARED_STATE } from "./sharedState.model";
import { Observer } from "rxjs/Observer";
import { Router } from "@angular/router";
import { DllCategory, DllStatus } from "../model/shared.model";
import { AppSetting, CategorySet} from "./app.setting.service";

@Component({
    selector: 'app-set',
    templateUrl: "setting.component.html"
})
export class SettingComponent {
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
        public appSetting: AppSetting,
        @Inject(SHARED_STATE) private observer: Observer<SharedState>) {
        appSetting.addCallBack4OnSet(() => observer.next(new SharedState(MODES.APP_SETING, -1)));
    }

    getStyle(item : CategorySet) {
        if(item.cat == DllCategory.Kernel)
        {
            return {
                color: "orange"
            };
        }
        else if(item.cat == DllCategory.Algorithms)
        {
            return {
                color: "red"
            };
        }
        else if(item.cat == DllCategory.Checks)
        {
            return {
                color: "red"
            };
        }
        else if(item.cat == DllCategory.Commands)
        {
            return {
                color: "orange"
            };
        }
        else if(item.cat == DllCategory.DataModel)
        {
            return {
                color: "blue"
            };
        }
        else if(item.cat == DllCategory.GUI)
        {
            return {
                color: "green"
            };
        }
        else if(item.cat == DllCategory.Nexis)
        {
            return {
                color: "violet"
            };
        }
        else if(item.cat == DllCategory.Storage)
        {
            return {
                color: "LightBlue"
            };
        }
        else if(item.cat == DllCategory.unknown)
        {
            return {
                color: "black"
            };
        }
        else if(item.cat == DllCategory.UT)
        {
            return {
                color: "gray"
            };
        }
    }
}
