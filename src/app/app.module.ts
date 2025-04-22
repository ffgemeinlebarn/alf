import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
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
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment.development';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [AppComponent],
    imports: [
        SharedModule,
        BrowserModule,
        HammerModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        MatDialogModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            registrationStrategy: 'registerWhenStable:30000'
        }),
        StartPageComponent,
        StatisticsPageComponent,
        SettingsPageComponent,
        OperatingPageComponent,
        VerwaltungPageComponent,
        EreignissePageComponent
    ],
    providers: [CdkColumnDef],
    bootstrap: [AppComponent]
})
export class AppModule { }
