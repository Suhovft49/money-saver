import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { HeaderComponent } from './header/header.component';
import {NavComponent} from './nav/nav.component';
import {ButtonComponent} from './button/button.component';
import {RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

import {MoneyTooltipComponent} from './tooltip-directive/tooltip.component';
import {ToolTipDirective} from './tooltip-directive/tooltip.directive';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './interceptors/auth.interceptors';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';


const Components = [HeaderComponent, NavComponent, ButtonComponent, PageNotFoundComponent, ToolTipDirective, MoneyTooltipComponent];
const Exports = [HeaderComponent, NavComponent, PageNotFoundComponent, ToolTipDirective];

@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule],
  declarations: Components,
  exports: Exports,
  providers: [
    AuthService,
    AuthGuard,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  entryComponents: [MoneyTooltipComponent]
})
export class CoreModule { }
