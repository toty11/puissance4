import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeJoueurComponent } from './liste-joueur/liste-joueur.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { JoueurDetailComponent } from './joueur-detail/joueur-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full'},
  { path: 'joueurs', component: ListeJoueurComponent },
  { path: 'welcome', component: WelcomeComponent},
  { path: 'detail/:id', component: JoueurDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }