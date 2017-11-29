import { Component } from "@angular/core";

@Component({
    moduleId: module.id,
    templateUrl: "dataGrid.component.html"
})
export class DataGridComponent {
    constructor() {
    }
    myData = [
        {
            "firstName": "Cox",
            "lastName": "Carney",
            "company": "Enormo",
            "employed": true
        },
        {
            "firstName": "Lorraine",
            "lastName": "Wise",
            "company": "Comveyer",
            "employed": false
        },
        {
            "firstName": "Nancy",
            "lastName": "Waters",
            "company": "Fuelton",
            "employed": false
        }
    ];
}
