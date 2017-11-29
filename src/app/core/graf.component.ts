import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { SciaDll } from "../model/SciaDll.model";
import { MODES, SharedState, SHARED_STATE } from "./sharedState.model";
import { ModelRepository } from "../model/repository.model";
import { Observable } from "rxjs/Observable";
import { Nvd3Nodes } from "./nvd3Nodes.model";
import { Nvd3Links } from "./nvd3Nodes.model";

declare let d3: any;

let colors = [
  "black", //0 non existing
  "black", //1 unknown
  "orange", //2 kernel
  "blue", //3 DataModel
  "red", //4 checks
  "green", //5 GUI
  "gray", //6 UT
  "OrangeRed", //7 Commands
  "violet", //8 Nexis
  "red", //9 Algorithms
  "LightBlue", //10 Storage
];

let labels: boolean = true;

@Component({
  template: `
    <button class="btn btn-danger btn-sm" (click)="changeSize()">Switch Labels</button>  
    <div>
      <nvd3 [options]="options" [data]="data"></nvd3>
    </div>
  `,
  // include original styles
  styleUrls: [
    '../../../node_modules/nvd3/build/nv.d3.css'
  ],
  encapsulation: ViewEncapsulation.None
})

export class GrafComponent implements OnInit {
  options;
  data;


  constructor(
    @Inject(SHARED_STATE) private stateEvents: Observable<SharedState>,
    private repository: ModelRepository, ) {
    // repository.getSciaDllsPromise((data) => this.data.nodes = new Nvd3Nodes(data).nodes);
  }

  getSciaDlls(): SciaDll[] {
    return this.repository.getSciaDlls();
  }

  changeSize(){
    labels = !labels;
    this.opts();
  }

  opts() {
    this.options = {
      chart: {
        type: 'forceDirectedGraph',
        height: (function () { return nv.utils.windowSize().height - 200})(),
        width: (function () { return nv.utils.windowSize().width })(),
        margin: { top: 20, right: 20, bottom: 20, left: 20 },
        color: function (d) {
          return colors[d.group];
        },
        nodeExtras: function (node) {
          node && node
            .append("text")
            .attr("dx", 8)
            .attr("dy", ".35em")
            .text(function (d) { return d.name })
            .attr('fill', function(d) { return colors[d.group] })
            .style('font-size', labels? '15px':'0px');
        }
      }
  }
}

  ngOnInit() {
    this.opts();

    /*
    this.data = {
      "nodes": [
        { "name": "Myriel", "group": 1 },
        { "name": "Napoleon", "group": 1 },
        { "name": "Mlle.Baptistine", "group": 1 },
        { "name": "Mme.Magloire", "group": 1 },
        { "name": "CountessdeLo", "group": 1 },
        { "name": "Geborand", "group": 1 },
        { "name": "Champtercier", "group": 1 },
        { "name": "Cravatte", "group": 1 },
        { "name": "Count", "group": 1 },
        { "name": "OldMan", "group": 1 },
        { "name": "Labarre", "group": 2 },
        { "name": "Valjean", "group": 2 }
      ],
      "links": [
        { "source": 1, "target": 0, "value": 1 },
        { "source": 2, "target": 0, "value": 8 },
        { "source": 3, "target": 0, "value": 10 },
        { "source": 3, "target": 2, "value": 6 },
        { "source": 4, "target": 0, "value": 1 },
        { "source": 5, "target": 0, "value": 1 },
        { "source": 6, "target": 0, "value": 1 },
        { "source": 7, "target": 0, "value": 1 },
        { "source": 8, "target": 0, "value": 2 },
        { "source": 9, "target": 0, "value": 1 }
      ]
    };
    */

    this.repository.getSciaDllsPromise((data) => {
      var dllArray: { [key:number]:number; }  = {};
      this.data = {
        "nodes": new Nvd3Nodes(data, dllArray).nodes,
        "links": [
          // { "source": 0, "target": 2, "value": 10 },
          // { "source": 1, "target": 2, "value": 10 }
        ]
      };

      this.repository.getSciaDllDepsPromise((data) => {
        this.data = {
          "nodes": this.data.nodes,
          "links": new Nvd3Links(data.filter(q => !q.isTransient), dllArray).links,
        }
      });     

      //  this.data.nodes = new Nvd3Nodes(data, dllArray).nodes;
    });
  }

}