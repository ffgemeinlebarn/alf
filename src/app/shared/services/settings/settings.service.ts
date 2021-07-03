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
    public syncUrl = '';
    public syncFeuerwehrNummern: Array<any> = [];

    public loadAll()
    {
        this.testMode = this.readBoolean('testMode');
        this.barcodeScannerStartSequenz = this.readString('barcodeScannerStartSequenz');
        this.syncUrl = this.readString('syncUrl');
        this.syncFeuerwehrNummern = this.readObject('syncFeuerwehrNummern') || [];
    }

    public saveAll()
    {
        this.writeTestMode();
        this.writeBarcodeScannerStartSequenz();
        this.writeSyncURL();
        this.writeSyncFeuerwehrNummern();
    }

    public writeTestMode = () => this.write('testMode', this.testMode);
    public writeBarcodeScannerStartSequenz = () => this.write('barcodeScannerStartSequenz', this.barcodeScannerStartSequenz);
    public writeSyncURL = () => this.write('syncUrl', this.syncUrl);
    public writeSyncFeuerwehrNummern = () => this.writeObject('syncFeuerwehrNummern', this.syncFeuerwehrNummern);

    private write(key: string, value: any)
    {
        localStorage.setItem(key, value);
    }
    private writeObject(key: string, value: any)
    {
        localStorage.setItem(key, JSON.stringify(value));
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

    private readObject(key: string): any
    {
        return JSON.parse(localStorage.getItem(key));
    }
}
