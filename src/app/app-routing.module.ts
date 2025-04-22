import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';







const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/start-page/start-page.component').then(m => m.StartPageComponent)
    },
    {
        path: 'operating',
        loadComponent: () => import('./pages/operating-page/operating-page.component').then(m => m.OperatingPageComponent)
    },
    {
        path: 'ereignisse',
        loadComponent: () => import('./pages/ereignisse-page/ereignisse-page.component').then(m => m.EreignissePageComponent)
    },
    {
        path: 'verwaltung',
        loadComponent: () => import('./pages/verwaltung-page/verwaltung-page.component').then(m => m.VerwaltungPageComponent)
    },
    {
        path: 'statistics',
        loadComponent: () => import('./pages/statistics-page/statistics-page.component').then(m => m.StatisticsPageComponent)
    },
    {
        path: 'settings',
        loadComponent: () => import('./pages/settings-page/settings-page.component').then(m => m.SettingsPageComponent)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
