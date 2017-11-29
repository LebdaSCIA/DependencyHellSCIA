import { SciaDll } from "../model/SciaDll.model";
import { DllDependency } from "../model/dllDependency.model";

export class Nvd3Node {
    name : string;
    group : number;
    constructor(dll : SciaDll) {
        this.name = dll.Name;
        this.group = dll.Category;
     }
}

export class Nvd3Link {
    source : number;
    target : number;
    value : number;
    constructor(source : number, target : number) {
        this.source = source;
        this.target = target;
        this.value = 5;
     }
}