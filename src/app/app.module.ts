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
import { DataGridComponent } from './core/dataGrid.component';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModelModule,
    CoreModule,
    RouterModule.forRoot([
      { path: "dependencyhell", component: TableComponent},
      { path: "table", component: TableComponent},
      { path: "dependencyhell/table", component: TableComponent},
      { path: "det/:id", component: TableDetComponent },
      { path: "dependencyhell/det/:id", component: TableDetComponent },
      { path: "graph", component: GrafComponent },
      { path: "dependencyhell/graph", component: GrafComponent },
      { path: "**", redirectTo: "dependencyhell/table" }
    ])],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
