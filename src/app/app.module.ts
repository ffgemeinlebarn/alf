import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { OperatingPageComponent } from './pages/operating-page/operating-page.component';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { StatisticsPageComponent } from './pages/statistics-page/statistics-page.component';
import { VerwaltungPageComponent } from './pages/verwaltung-page/verwaltung-page.component';
import { EreignissePageComponent } from './pages/ereignisse-page/ereignisse-page.component';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CdkColumnDef } from '@angular/cdk/table';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        StartPageComponent,
        StatisticsPageComponent,
        SettingsPageComponent,
        OperatingPageComponent,
        VerwaltungPageComponent,
        EreignissePageComponent
    ],
    imports: [
        SharedModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule
    ],
    providers: [CdkColumnDef],
    bootstrap: [AppComponent]
})
export class AppModule { }
