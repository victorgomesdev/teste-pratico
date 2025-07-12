import { Component, output } from "@angular/core";

@Component({
    templateUrl: './layout.component.html',
    selector: 'layout'
})
export class LayoutComponent {

    newUser = output()

    createNewUser(): void {
        this.newUser.emit()
    }
}