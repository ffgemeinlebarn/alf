import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SettingsService
{
    constructor()
    {
        this.testMode = this.readBoolean('testMode');
    }

    public testMode = false;

    public writeTestMode = () => this.write('testMode', this.testMode);

    private write(key: string, value: any)
    {
        localStorage.setItem(key, value);
    }

    private readBoolean(key: string): boolean
    {
        const value = localStorage.getItem(key);
        if (value === null) this.writeTestMode();

        return value === 'true' ? true : false;
    }
}
