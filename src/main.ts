import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment.development';

import 'hammerjs';
import { CdkColumnDef } from '@angular/cdk/table';
import { SharedModule } from './app/shared/shared.module';
import { BrowserModule, HammerModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app/app.component';

if (environment.production)
{
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(SharedModule, BrowserModule, HammerModule, AppRoutingModule, FormsModule, MatDialogModule, ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            registrationStrategy: 'registerWhenStable:30000'
        })),
        CdkColumnDef,
        provideAnimations()
    ]
})
    .catch(err => console.error(err));
