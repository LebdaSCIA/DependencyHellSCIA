import { SciaDll } from "../model/SciaDll.model";

export class Nvd3Node {
    name : string;
    group : number;
    constructor(dll : SciaDll) {
        this.name = dll.Name;
        this.group = 1;
     }
}