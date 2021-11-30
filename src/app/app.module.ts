import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestcenterComponent } from './components/testcenter/testcenter.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { ScreenrecordingComponent } from './components/screenrecording/screenrecording.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent,
    TestcenterComponent,
    WrapperComponent,
    ScreenrecordingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private injector : Injector){}
  ngDoBootstrap(){
    const el = createCustomElement(ScreenrecordingComponent, {injector : this.injector});

    customElements.define('screen-recording',el);
  }
}
