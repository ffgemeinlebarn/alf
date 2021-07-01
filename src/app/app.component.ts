import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OperatingService } from './shared/services/operating/operating.service';
import { SettingsService } from './shared/services/settings/settings.service';

@Component({
    selector: 'ffg-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent
{
    constructor(public settings: SettingsService) { }
}
