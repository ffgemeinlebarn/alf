import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SettingsService
{
    constructor()
    {
        this.loadAll();
    }

    public testMode = false;
    public barcodeScannerStartSequenz = '';

    public loadAll()
    {
        this.testMode = this.readBoolean('testMode');
        this.barcodeScannerStartSequenz = this.readString('barcodeScannerStartSequenz');
    }

    public saveAll()
    {
        this.writeTestMode();
        this.writeBarcodeScannerStartSequenz();
    }

    public writeTestMode = () => this.write('testMode', this.testMode);
    public writeBarcodeScannerStartSequenz = () => this.write('barcodeScannerStartSequenz', this.barcodeScannerStartSequenz);

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

    private readString(key: string): string
    {
        return localStorage.getItem(key);
    }
}
