import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeadComponent } from './head/head.component';
import { HomeComponent } from './/user/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeadComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AdminModule,
    UserModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
