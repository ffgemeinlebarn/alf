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
    public syncUrl = '';
    public syncLastEdit = '';

    public loadAll()
    {
        this.testMode = this.readBoolean('testMode');
        this.syncUrl = this.readString('syncUrl');
        this.syncLastEdit = this.readString('syncLastEdit');
    }

    public saveAll()
    {
        this.writeTestMode();
        this.writeSyncURL();
    }

    public writeTestMode = () => this.write('testMode', this.testMode);
    public writeSyncURL = () => this.write('syncUrl', this.syncUrl);

    public writeSyncLastEdit = (lastEdit: string) =>
    {
        this.syncLastEdit = lastEdit;
        this.write('syncLastEdit', this.syncLastEdit);
    }

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
        return localStorage.getItem(key).toString();
    }
}
