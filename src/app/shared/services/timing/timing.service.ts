import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TimingService
{
    public currentTime: string = '';
    public ereignisTime = null;
    private ereignisStart: Date = null;

    constructor()
    {
        setInterval(() => this.run(), 1000);
    }

    public setEreignisStartTime(start: Date)
    {
        this.ereignisStart = start;
    }

    private run()
    {
        const time = new Date();

        let hours = time.getHours().toString();
        let minutes = time.getMinutes().toString();
        let seconds = time.getSeconds().toString();

        if (this.ereignisStart)
        {
            const diff = time.getTime() - this.ereignisStart.getTime();

            const diffSeconds = Math.floor(diff / 1000);
            const diffHours = Math.floor(diffSeconds / 60 / 60);
            const diffMinutes = Math.floor(diffSeconds / 60) - (diffHours * 60);
            this.ereignisTime = {
                hours: diffHours,
                minutes: diffMinutes
            };
        }

        if (hours.length < 2)
        {
            hours = '0' + hours;
        }

        if (minutes.length < 2)
        {
            minutes = '0' + minutes;
        }

        if (seconds.length < 2)
        {
            seconds = '0' + seconds;
        }

        this.currentTime = hours + ' : ' + minutes + ' : ' + seconds;
    }
}
