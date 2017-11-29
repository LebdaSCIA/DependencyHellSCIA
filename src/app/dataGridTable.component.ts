import {Component} from '@angular/core';
import {TableView} from "NG2TableView";
import {PageTableColumns} from "./columns";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    templateUrl: "dataGridTable.component.html"
})
export class DataGridTableComponent extends TableView {

    constructor(route : ActivatedRoute) {
        super(null);
    }

    ngOnInit() {
        this.getBuilder()
            .addCols(PageTableColumns)
            .setPaging(true)
            .setItemsPerPage(5);

        this.buildTable();
    }
}