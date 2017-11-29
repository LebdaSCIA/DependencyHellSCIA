import { Injectable } from "@angular/core";
import { DllCategory, DllStatus } from "../model/shared.model";

export class CategorySet {
    private _on: boolean = true;
    callBack4OnSet = new Array<() => void>();
    constructor(
        public name: string,
        public cat: DllCategory,
        public catStyle: any) {
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
        this.catset.push(new CategorySet("Kernel", DllCategory.Kernel, {color: "yellow"}));
        this.catset.push(new CategorySet("Storage", DllCategory.Storage, {color:'LightBlue'}));
        this.catset.push(new CategorySet("Data model", DllCategory.DataModel, {color:'blue'}));
        this.catset.push(new CategorySet("Algorithms", DllCategory.Algorithms, {color:'red'}));
        this.catset.push(new CategorySet("Checks", DllCategory.Checks, {color:'red'}));
        this.catset.push(new CategorySet("Commands", DllCategory.Commands, {color:'OrangeRed'}));
        this.catset.push(new CategorySet("GUI", DllCategory.GUI, {color:'green'}));
        this.catset.push(new CategorySet("UT", DllCategory.UT, {color:'gray'}));
        this.catset.push(new CategorySet("Nexis", DllCategory.Nexis, {color:'violet'}));
        this.catset.push(new CategorySet("unknown", DllCategory.unknown, {color:'black'}));
    }
    addCallBack4OnSet(callback: () => void) {
        for (let item of this.catset) {
            item.callBack4OnSet.push(callback);
        }
    }
}