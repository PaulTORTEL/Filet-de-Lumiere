import { registerLocaleData } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import fr from "@angular/common/locales/fr";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { fr_FR, NgZorroAntdModule, NZ_I18N } from "ng-zorro-antd";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

registerLocaleData(fr);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: fr_FR }],
  bootstrap: [AppComponent]
})
export class AppModule {}
