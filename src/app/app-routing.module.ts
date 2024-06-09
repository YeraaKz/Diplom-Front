import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CoursesComponent} from "./courses/courses.component";
import {TestResultsComponent} from "./test-results/test-results.component";
import {TestComponent} from "./test/test.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {PmComponent} from "./pm/pm.component";
import {UserComponent} from "./user/user.component";
import {ProfileComponent} from "./profile/profile.component";
import {CourseDetailsComponent} from "./course-details/course-details.component";
import {ContactusComponent} from "./contactus/contactus.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {MyCourseDetailsComponent} from "./my-course-details/my-course-details.component";
import {MyCoursesComponent} from "./my-courses/my-courses.component";
import {AuthGuard} from "./auth.guard";
import {PdfViewerComponent} from "./pdf-viewer/pdf-viewer.component";
import {CryptoCheckerComponent} from "./crypto-checker/crypto-checker.component";
import {ModuleTestComponent} from "./module-test/module-test.component";
import {ModuleTestResultComponent} from "./module-test-result/module-test-result.component";
import {NewsComponent} from "./news/news.component";
import {NewsDetailsComponent} from "./news-details/news-details.component";
import {AchievementsComponent} from "./achievements/achievements.component";
import {AdminUsersComponent} from "./admin-users/admin-users.component";
import {AdminGuard} from "./admin.guard";
import {AdminCourseComponent} from "./admin-course/admin-course.component";
import {AdminCourseDetailsComponent} from "./admin-course-details/admin-course-details.component";
import {AdminModuleDetailsComponent} from "./admin-module-details/admin-module-details.component";
import {AdminModuleTestDetailsComponent} from "./admin-module-test-details/admin-module-test-details.component";

const routes: Routes = [
  {
    path: 'myCourse',
    component: MyCoursesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'myCourse/:id',
    component: MyCourseDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'notfound',
    component: PageNotFoundComponent
  },
  {
    path: 'contact',
    component: ContactusComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'course-details/:id',
    component: CourseDetailsComponent
  },
  {
    path: 'course-details',
    component: CourseDetailsComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'pm',
    component: PmComponent
  },
  {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: 'admin/users',
    component: AdminUsersComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/courses',
    component: AdminCourseComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/courses/:courseId',
    component: AdminCourseDetailsComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/courses/:courseId/modules/:moduleId',
    component: AdminModuleDetailsComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/courses/:courseId/modules/:moduleId/tests/:testId',
    component: AdminModuleTestDetailsComponent,
    canActivate: [AdminGuard]
  },

  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  },
  {
    path: 'test',
    component: TestComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'test-results',
    component: TestResultsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'presentation/:fileKey',
    component: PdfViewerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'crypto-checker',
    component: CryptoCheckerComponent
  },
  {
    path: 'module-test/:id',
    component: ModuleTestComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'module-test-result',
    component: ModuleTestResultComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'news',
    component: NewsComponent,
  },
  {
    path: 'news/:id',
    component: NewsDetailsComponent,
  },
  {
    path: 'achievements',
    component: AchievementsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
