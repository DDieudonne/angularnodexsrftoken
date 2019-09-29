import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatService } from './services/chat.service';
import { AuthHttpInterceptor } from './interceptor';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
  ],
  declarations: [AppComponent],
  providers: [AuthService, ChatService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
