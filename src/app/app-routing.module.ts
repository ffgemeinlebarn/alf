import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EreignissePageComponent } from './pages/ereignisse-page/ereignisse-page.component';
import { OperatingPageComponent } from './pages/operating-page/operating-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { StatisticsPageComponent } from './pages/statistics-page/statistics-page.component';
import { VerwaltungPageComponent } from './pages/verwaltung-page/verwaltung-page.component';

const routes: Routes = [
    {
        path: '',
        component: StartPageComponent
    },
    {
        path: 'operating',
        component: OperatingPageComponent
    },
    {
        path: 'ereignisse',
        component: EreignissePageComponent
    },
    {
        path: 'verwaltung',
        component: VerwaltungPageComponent
    },
    {
        path: 'statistics',
        component: StatisticsPageComponent
    },
    {
        path: 'settings',
        component: SettingsPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
