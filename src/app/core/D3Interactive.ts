import { Component, OnInit, ElementRef } from '@angular/core';
import { D3Service, D3, Selection, D3ZoomEvent, D3DragEvent } from 'd3-ng2-service'; // <-- import the D3 Service, the type alias for the d3 variable and the Selection interface

class Point {
    name;
    x: number;
    y: number;
    a: number = 0;
    b: number = 0;
}

class Link {
    a: number = 0;
    b: number = 0;
    source: Point;
    target: Point;
}

var glob3D: D3Interactive;

@Component({
    //  selector: 'app-test-d3',
    //  templateUrl: 'test-d3.component.html',
    //  styleUrls: ['test-d33.component.css']
    template: ' <div id="chart"><svg (mousemove)="move()"></svg></div>'
})
export class D3Interactive implements OnInit {

    private d3: D3; // <-- Define the private member which will hold the d3 reference
    private parentNativeElement: any;

    private d3Svg: Selection<SVGSVGElement, any, null, undefined>;
    private d3G: Selection<SVGGElement, any, null, undefined>;
    points: Point[];
    links: Link[];
    simu;
    w:number;
    h:number;

    constructor(element: ElementRef, d3Service: D3Service) { // <-- pass the D3 Service into the constructor
        this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
        this.parentNativeElement = element.nativeElement;

    }

    ngOnInit() {
        let d3 = this.d3; // <-- for convenience use a block scope variable
        glob3D = this;
        let d3ParentElement: Selection<any, any, any, any>; // <-- Use the Selection interface (very basic here for illustration only)

        let d3G: Selection<SVGGElement, any, null, undefined>;

        function zoomed(this: SVGSVGElement) {
            let e: D3ZoomEvent<SVGSVGElement, any> = d3.event;
            d3G.attr('transform', e.transform.translate(glob3D.w/2,glob3D.h/2).toString());
        }
        function dragged(this: SVGCircleElement, d: Point) {
            let e: D3DragEvent<SVGCircleElement, Point, Point> = d3.event;
            //        d3.select(this).attr('cx', d.x = e.x).attr('cy', d.y = e.y);
        }

        if (this.parentNativeElement !== null) {

            d3ParentElement = d3.select(this.parentNativeElement); // <-- use the D3 select method 

            this.d3Svg = d3ParentElement.select<SVGSVGElement>('svg');

            var chartDiv = document.getElementById("chart");
            this.w = chartDiv.clientWidth;
            this.h = chartDiv.clientHeight;

            this.d3Svg.attr('width', this.w);
            this.d3Svg.attr('height', this.h);

            this.points = [
                { name: "aa", x: 10, y: 10, a: 0, b: 0 },
                { name: "bb", x: 15, y: 15, a: 0, b: 0 },
                { name: "bb", x: 10, y: 15, a: 0, b: 0 },
            ];

            this.links = [
                { source: this.points[0], target: this.points[1], a: 0, b: 0 }
            ];
            d3G = this.d3G = this.d3Svg.append<SVGGElement>('g');

            d3G.attr('transform', "translate(300, 200)");
            this.d3G.selectAll<SVGCircleElement, any>('circle')
                .data(this.points)
                .enter().append<SVGCircleElement>('circle')
                .attr('cx', function (d) { return d.x; })
                .attr('cy', function (d) { return d.y; })
                .attr('r', 2)
                //   .attr('label', function(d) { return d.name; })
                .call(d3.drag<SVGCircleElement, Point>().on('drag', dragged));;

                this.d3G.selectAll<SVGLineElement, any>('line')
                .data(this.links)
                .enter().append<SVGLineElement>('line');
                //   .attr('label', function(d) { return d.name; })
//                .call(d3.drag<SVGCircleElement, Point>().on('drag', dragged));;

            this.simu = d3.forceSimulation(this.points)
                .force("charge", d3.forceManyBody())
                .force("link", d3.forceLink(this.links).distance(20).strength(0.5))
                .force("x", d3.forceX())
                .force("y", d3.forceY())
                .on("tick", this.ticked);

            //    this.simu.stop();

            this.d3Svg.call(d3.zoom<SVGSVGElement, any>()
                .scaleExtent([1 / 2, 8])
                .on('zoom', zoomed));

//            this.update1();
        }
    }
    move() {
        this.points[0].x++;
        this.update1();
    }

    ticked() {
        //   this.points.forEach(this.setNode);
        glob3D.update1();
        console.log("tick");
        // console.log(glob3D.points[0].x);
    }

    update1() {
        //       this.simu.tick();
        console.log(this.points[0].x);
        //    console.log('a');
        //    this.points[0].x++;
        this.d3G.selectAll('circle')
            .data(this.points)
            .attr('cx', function (d) { return d.x; })
            .attr('cy', function (d) { return d.y; });

        this.d3G.selectAll('line')
        .data(this.links)
        .attr('x1', function (d) { return d.source.x; })
        .attr('y1', function (d) { return d.source.y; })
        .attr('x2', function (d) { return d.target.x; })
        .attr('y2', function (d) { return d.target.y; })
        .attr('style', "stroke:rgb(255,0,0);stroke-width:2")
        ;
//        .attr('r', 2)

    }
    setNode(pt: Point) {
        pt.a = pt.x;
        pt.b = pt.y;
    }


}