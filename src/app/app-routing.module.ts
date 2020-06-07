import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeJoueurComponent } from './liste-joueur/liste-joueur.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { PlateauComponent } from './plateau/plateau.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full'},
  { path: 'welcome', component: WelcomeComponent},
  { path: 'jouer', component: PlateauComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }