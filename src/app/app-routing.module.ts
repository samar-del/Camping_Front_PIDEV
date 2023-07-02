import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllTemplateAdminComponent} from "./backoffice/all-template-admin/all-template-admin.component";
import {BodyAdminComponent} from "./backoffice/body-admin/body-admin.component";
import {AllTemplateUserComponent} from "./frontoffice/all-template-user/all-template-user.component";
import {BodyUserComponent} from "./frontoffice/body-user/body-user.component";
import {ActiviteAdminComponent} from "./backoffice/activite-admin/activite-admin.component";
import {PostAdminComponent} from "./backoffice/post-admin/post-admin.component";
import {ForumCommentAdminComponent} from "./backoffice/forum-comment-admin/forum-comment-admin.component";

const routes: Routes = [
  {
    path: 'admin', component: AllTemplateAdminComponent,
    children: [
      {
        path: 'home',
        component: BodyAdminComponent,
      },
      {
        path: 'Activite',
        component: ActiviteAdminComponent,
      },
      {
        path: 'post',
        component: PostAdminComponent,
      },

      {
        path: 'comment',
        component: ForumCommentAdminComponent,
      }
    ]
  },
  {
    path: '', component: AllTemplateUserComponent,
    children: [
      {
        path: '',
        component: BodyUserComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
