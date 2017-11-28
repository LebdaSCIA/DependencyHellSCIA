import { Injectable } from "@angular/core";
import { DllCategory, DllStatus } from "../model/shared.model";

export class CategorySet {
    private _on: boolean = true;
    callBack4OnSet = new Array<() => void>();
    constructor(
        public name: string,
        cat: DllCategory) {
    }

    get on(): boolean {
        return this._on;
    }

    set on(onPar: boolean) {
        this._on = onPar;
        for (let item of this.callBack4OnSet) {
            item();
        }
    }
}

@Injectable()
export class AppSetting {
    catset = new Array<CategorySet>();
    constructor() {
        this.catset.push(new CategorySet("Checks", DllCategory.Checks));
        this.catset.push(new CategorySet("DataModel", DllCategory.DataModel));
        this.catset.push(new CategorySet("GUI", DllCategory.GUI));
        this.catset.push(new CategorySet("Kernel", DllCategory.Kernel));
        this.catset.push(new CategorySet("Storage", DllCategory.Storage));
        this.catset.push(new CategorySet("UT", DllCategory.UT));
    }
    addCallBack4OnSet(callback : () => void)
    {
        for (let item of this.catset) {
            item.callBack4OnSet.push(callback);
        }
    }
}