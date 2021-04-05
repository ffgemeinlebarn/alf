import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FeuerwehrenService } from './services/feuerwehren/feuerwehren.service';
import { FuellungItemComponent } from './components/fuellung-item/fuellung-item.component';
import { EditFeuerwehrComponent } from './dialogs/edit-feuerwehr/edit-feuerwehr.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditFlascheComponent } from './dialogs/edit-flasche/edit-flasche.component';
import { SearchFlascheComponent } from './dialogs/search-flasche/search-flasche.component';
import { PrintReportsComponent } from './dialogs/print-reports/print-reports.component';
import { EditEreignisComponent } from './dialogs/edit-ereignis/edit-ereignis.component';
import { AddMangelComponent } from './dialogs/add-mangel/add-mangel.component';
import { ConfirmFlascheWithMangelComponent } from './dialogs/confirm-flasche-with-mangel/confirm-flasche-with-mangel.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatSidenavModule,
        MatGridListModule,
        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatListModule,
        MatChipsModule,
        MatRippleModule,
        MatExpansionModule,
        MatSlideToggleModule,
        MatCheckboxModule
    ],
    exports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatSidenavModule,
        MatGridListModule,
        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatListModule,
        MatChipsModule,
        MatRippleModule,
        MatExpansionModule,
        FuellungItemComponent,
        MatSlideToggleModule,
        MatCheckboxModule
    ],
    providers: [
        FeuerwehrenService
    ],
    declarations: [
        FuellungItemComponent,
        EditFeuerwehrComponent,
        EditFlascheComponent,
        SearchFlascheComponent,
        PrintReportsComponent,
        EditEreignisComponent,
        AddMangelComponent,
        ConfirmFlascheWithMangelComponent
    ]
})
export class SharedModule { }
