import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { NavBarComponent } from "./component/nav-bar/nav-bar.component";
import { Error404Component } from './component/error-404/error-404.component';

@NgModule({
  declarations: [
    NavBarComponent,
    Error404Component
  ],
  exports: [
    NavBarComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: '**', //quando não encontrar a rota
        component: Error404Component
      }
    ])
  ]
})
export class CoreModule {

}
