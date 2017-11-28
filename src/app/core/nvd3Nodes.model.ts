import { Nvd3Node } from "./nvd3Node.model";
import { SciaDll } from "../model/SciaDll.model";

export class Nvd3Nodes {
    nodes: Array<Nvd3Node> = new Array<Nvd3Node>();
    constructor(dlls: SciaDll[]) {
        if (SciaDll != null) {
            this.nodes = new Array<Nvd3Node>();
            for (let dll of dlls) {
                this.nodes.push(new Nvd3Node(dll));
            }
        }

    }
}