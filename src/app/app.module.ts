import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, OverviewDialog } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import {MatButtonModule} from '@angular/material/button';
import { FileSaverModule } from 'ngx-filesaver';

import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatSliderModule} from '@angular/material/slider';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { gameReducer  } from './ngrx/reducer';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './ngrx/effects';
import {MatTabsModule} from '@angular/material/tabs';
import { HttpClientModule } from  '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion'
import { ItemsViewerComponent } from './components/items-viewer/items-viewer.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';

import {MatChipsModule} from '@angular/material/chips';

import {MatDialogModule} from '@angular/material/dialog';
import { BasicInfoComponent } from './components/basic-info/basic-info.component';



@NgModule({
  declarations: [
    AppComponent,  
    ItemsViewerComponent,
    OverviewDialog,
    BasicInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatButtonModule,
    FileSaverModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatSliderModule,
    MatTabsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatGridListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatChipsModule,
    MatDialogModule,
    StoreModule.forRoot({gameState:gameReducer}),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({name: 'Covid-battle-2',
    maxAge: 25}),
  ],
  entryComponents: [OverviewDialog],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
