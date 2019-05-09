import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TradePageComponent } from './components/trade-page/trade-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  // { path: '**', redirectTo: '', pathMatch: 'full' },
  { path: 'trade', component: TradePageComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
