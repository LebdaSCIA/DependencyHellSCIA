import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ModelModule } from "../model/model.module";
import { TableComponent } from "./table.component";
import { GrafComponent } from "./graf.component";
import { TableDetComponent } from "./tableDet.component";
import { SettingComponent } from "./setting.component";
import { SharedState, SHARED_STATE } from "./sharedState.model";
import { Observer } from "rxjs/Observer";
import { Subject } from "rxjs/Subject";
import { NvD3Module } from 'ng2-nvd3';
import { AppSetting } from "./app.setting.service";

import 'd3';
import 'nvd3';

export const SHARED_SUBJECT = new Subject<SharedState>();

@NgModule({
    imports: [BrowserModule, FormsModule, ModelModule, RouterModule, NvD3Module ],
    declarations: [TableComponent, GrafComponent, TableDetComponent, SettingComponent],
    exports: [ModelModule, TableComponent, GrafComponent, TableDetComponent, SettingComponent],
    providers: [AppSetting, { provide: SHARED_STATE, useValue: SHARED_SUBJECT }]
    // providers: [{
    //     provide: SHARED_STATE,
    //     deps: [],
    //     useFactory: function () {
    //         let subject = new Subject<SharedState>();
    //         return subject;
    //     }
    // }]

        // deps: [MessageService, Model],
        // useFactory: function (messageService, model) {
        //     let subject = new Subject<SharedState>();
        //     subject.subscribe(m => messageService.reportMessage(
        //         new Message(MODES[m.mode] + (m.id != undefined
        //             ? ` ${model.getProduct(m.id).name}` : "")))
        //     );
        //     return subject;
        // }
})
export class CoreModule { }