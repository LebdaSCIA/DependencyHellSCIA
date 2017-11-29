import { Nvd3Node } from "./nvd3Node.model";
import { Nvd3Link } from "./nvd3Node.model";
import { SciaDll } from "../model/SciaDll.model";
import { DllDependency } from "../model/dllDependency.model";

export class Nvd3Nodes {
    nodes: Array<Nvd3Node> = new Array<Nvd3Node>();
    constructor(dlls: SciaDll[], dllArray: Map<number, number> ) {
        if (SciaDll != null) {
            this.nodes = new Array<Nvd3Node>();
            var index : number;
            index = 0;

            for (let dll of dlls) {
                this.nodes.push(new Nvd3Node(dll));
                dllArray.set(dll.ID, index);
                index++;
            }
        }

    }
}

export class Nvd3Links {
    links: Array<Nvd3Link> = new Array<Nvd3Link>();
    constructor(dlls: DllDependency[], dllArray: Map<number, number>) {
        if (SciaDll != null) {
            this.links = new Array<Nvd3Link>();

            for (let dll of dlls) {

                if (dllArray.has(dll.dllSourceID) && dllArray.has(dll.dllTargetID)) {

                    try {
                        this.links.push(new Nvd3Link(dllArray.get(dll.dllSourceID), dllArray.get(dll.dllTargetID)));
                    } catch (error) {
                        continue;
                    }
                }
            }
        }

    }
}