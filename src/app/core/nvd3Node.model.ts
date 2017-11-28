import { SciaDll } from "../model/SciaDll.model";

export class Nvd3Node {
    name : string;
    group : number;
    constructor(dll : SciaDll) {
        this.name = dll.name;
        this.group = 1;
     }
}