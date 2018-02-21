import { NgModule } from '@angular/core';
import { MessageBoxComponent } from './message-box/message-box.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
@NgModule({
	declarations: [MessageBoxComponent,
    UserInfoComponent,
    UserMenuComponent],
	imports: [],
	exports: [MessageBoxComponent,
    UserInfoComponent,
    UserMenuComponent]
})
export class ComponentsModule {}
