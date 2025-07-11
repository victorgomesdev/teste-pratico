import { Component, input, output } from "@angular/core";
import { User } from "../../types/user";
import { EditorModule } from "primeng/editor";
import { AgePipe } from "../../pipe/age";

@Component({
    templateUrl: './profile.component.html',
    selector: 'profile',
    imports: [EditorModule, AgePipe]
})
export class ProfileComponent {

    user = input<User>()
    edit = output()

    editUser(): void {

        this.edit.emit()
    }
}