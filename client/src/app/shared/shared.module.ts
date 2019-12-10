import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ShowcaseComponent } from "./components/showcase/showcase.component";
import { NgZorroAntdModule } from "ng-zorro-antd";
import { PhotoComponent } from './components/photo/photo.component';

@NgModule({
  declarations: [ShowcaseComponent, PhotoComponent],
  imports: [CommonModule, NgZorroAntdModule],
  exports: [ShowcaseComponent]
})
export class SharedModule {}
