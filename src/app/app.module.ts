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
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

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
        FormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: environment.production,
          // Register the ServiceWorker as soon as the app is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        })
    ],
    providers: [CdkColumnDef],
    bootstrap: [AppComponent]
})
export class AppModule { }
