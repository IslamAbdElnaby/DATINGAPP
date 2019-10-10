import { PhotoEditorComponent } from './Components/photo-editor/photo-editor.component';
import { MemberListComponent } from './Components/member-list/member-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appRouts } from './routes';
import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ValueComponent } from './Components/Value/Value.component';
import { NavComponent } from './Components/Nav/Nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { BsDropdownModule, TabsModule, BsDatepickerModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { ListsComponent } from './Components/lists/lists.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { MemberCardComponent } from './Components/member-card/member-card.component';
import { JwtModule } from '@auth0/angular-jwt';
import { MemberDetailsComponent } from './Components/member-details/member-details.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { MemberEditComponent } from './Components/member-edit/member-edit.component';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeAgoPipe } from 'time-ago-pipe';

export class CustomHammerConfig extends HammerGestureConfig {
	overrides = {
		pinch: { enable: false },
		rotate: { enable: false }
	};
}
@NgModule({
	declarations: [
		AppComponent,
		ValueComponent,
		NavComponent,
		RegisterComponent,
		HomeComponent,
		MemberListComponent,
		ListsComponent,
		MessagesComponent,
		MemberCardComponent,
		MemberDetailsComponent,
		MemberEditComponent,
		PhotoEditorComponent,
		TimeAgoPipe
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FileUploadModule,
		HttpClientModule,
		FormsModule,
		NgxGalleryModule,
		ReactiveFormsModule,
		BsDropdownModule.forRoot(),
		BsDatepickerModule.forRoot(),
		TabsModule.forRoot(),
		RouterModule.forRoot(appRouts),
		JwtModule.forRoot({
			config: {
				tokenGetter: () => localStorage.getItem('token'),
				whitelistedDomains: [ 'localhost:5000' ],
				blacklistedRoutes: [ 'localhost:5000/api/auth' ]
			}
		})
	],
	providers: [ { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig } ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
