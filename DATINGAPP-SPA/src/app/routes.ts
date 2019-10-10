import { MemberListComponent } from './Components/member-list/member-list.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { MessagesComponent } from './Components/messages/messages.component';
import { ListsComponent } from './Components/lists/lists.component';
import { AuthGuard } from './Services/auth-gaurd.service';
import { MemberDetailsComponent } from './Components/member-details/member-details.component';
import { MemberDetailsResolver } from './Resolvers/member-details.resolver';
import { MembersResolver } from './Resolvers/members.resolver';
import { MemberEditComponent } from './Components/member-edit/member-edit.component';
import { MemberEditResolver } from './Resolvers/member-edit.resolver';

export const appRouts: Routes = [
	{ path: '', component: HomeComponent },
	{
		path: '',
		runGuardsAndResolvers: 'always',
		canActivate: [ AuthGuard ],
		children: [
			{
				path: 'members',
				component: MemberListComponent,
				canActivate: [ AuthGuard ],
				resolve: { users: MembersResolver }
			},
			{
				path: 'members/:id',
				component: MemberDetailsComponent,
				canActivate: [ AuthGuard ],
				resolve: { user: MemberDetailsResolver }
			},
			{
				path: 'member/edit',
				component: MemberEditComponent,
				canActivate: [ AuthGuard ],
				resolve: { user: MemberEditResolver }
			},

			{ path: 'lists', component: ListsComponent },
			{ path: 'messages', component: MessagesComponent }
		]
	},
	{ path: '**', redirectTo: '', pathMatch: 'full' }
];
