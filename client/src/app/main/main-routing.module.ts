import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainComponent } from "./main.component";
import { ShowcaseComponent } from "./showcase/showcase.component";

const routes: Routes = [
  {
    path: "**",
    component: MainComponent,
    children: [{ path: "", component: ShowcaseComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
