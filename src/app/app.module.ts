import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { SettingsMenuComponent } from './settings-menu/settings-menu.component';
import { MapContainerComponent } from './map-container/map-container.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SettingsMenuComponent,
    MapContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
