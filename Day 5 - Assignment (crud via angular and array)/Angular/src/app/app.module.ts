import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyNewComponentComponent } from './component/my-new-component/my-new-component.component';
import { TestPipePipe } from './pipe/test-pipe.pipe';
import { UserCrudJsonComponentComponent } from './component/user-crud-json-component/user-crud-json-component.component';

@NgModule({        // this NgModule contains 4 important sections: 
                   // 1. declaration 2. import  3. providers  4.bootstrap
  declarations:  [ // here we need to register component directive pipe
    AppComponent, 
    MyNewComponentComponent, 
    TestPipePipe, UserCrudJsonComponentComponent
  ],
  imports: [       // import internal and external modules
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],   // we need to inject the Angular services <- HERE angular DI(dependency injection) bracket
  bootstrap: [AppComponent] // we need to mention the component which would be an entry point of the app
})
export class AppModule { }
