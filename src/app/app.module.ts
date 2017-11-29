import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModelModule } from "./model/model.module";
import { CoreModule } from "./core/core.module";
import { RouterModule } from "@angular/router";
import { TableComponent } from './core/table.component';
import { GrafComponent } from './core/graf.component';
import { TableDetComponent } from './core/tableDet.component';
import { AppComponent } from './app.component';
import { D3Service } from 'd3-ng2-service';
import { D3Interactive } from './core/D3Interactive';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModelModule,
    CoreModule,
    RouterModule.forRoot([
      { path: "table", component: TableComponent,
      children: [ 
        { path: "**", redirectTo: "/table" } 
        ]
      },
      { path: "det/:id", component: TableDetComponent },
      { path: "graf", component: GrafComponent },
      { path: "interactive", component: D3Interactive },
      { path: "**", redirectTo: "/table" }
    ])],
  declarations: [
    AppComponent,
    D3Interactive
  ],
  providers: [D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
