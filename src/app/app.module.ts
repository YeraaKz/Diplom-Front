import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import { FooterComponent } from './footer/footer.component';
import { CoursesComponent } from './courses/courses.component';
import {AdminComponent} from "./admin/admin.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ProfileComponent} from "./profile/profile.component";
import {UserComponent} from "./user/user.component";
import {PmComponent} from "./pm/pm.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {ContactusComponent} from "./contactus/contactus.component";
import {CourseDetailsComponent} from "./course-details/course-details.component";
import {MyCoursesComponent} from "./my-courses/my-courses.component";
import {TestComponent} from "./test/test.component";
import {TestResultsComponent} from "./test-results/test-results.component";
import {MyCourseDetailsComponent} from "./my-course-details/my-course-details.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {httpInterceptorProviders} from "./services/token/auth-interceptor";
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import {PdfViewerModule} from "ng2-pdf-viewer";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {NgOptimizedImage} from "@angular/common";
import { CryptoCheckerComponent } from './crypto-checker/crypto-checker.component';
import {CryptoService} from "./services/crypto/crypto.service";
import { LoadingPageComponent } from './loading-page/loading-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    UserComponent,
    PmComponent,
    CoursesComponent,
    AdminComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    PageNotFoundComponent,
    ContactusComponent,
    CourseDetailsComponent,
    MyCoursesComponent,
    TestComponent,
    TestResultsComponent,
    MyCourseDetailsComponent,
    PdfViewerComponent,
    CryptoCheckerComponent,
    LoadingPageComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ToastrModule.forRoot({
            positionClass: 'toast-top-right',
            preventDuplicates: true,
        }),
        ReactiveFormsModule,
        PdfViewerModule,
        NgOptimizedImage
    ],
  providers: [httpInterceptorProviders, CryptoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
