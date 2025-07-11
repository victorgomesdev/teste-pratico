import { Component, input, output } from "@angular/core";
import { NgClass } from '@angular/common'
import { User } from "../../types/user";

const IMPORTS = [
    NgClass
]

@Component({
    templateUrl: './card.component.html',
    selector: 'card',
    imports: [...IMPORTS]
})
export class CardComponent {

    user = input<User>()
    clicked = output<string>()
    isSelected: boolean = false

    toogle(id: string): void {
        switch (this.isSelected) {
            case true: {
                if(this.user()?.id !== id) {
                    this.isSelected = false
                    return
                }
                break
            }
            case false: {
                if(this.user()?.id === id) {
                    this.isSelected = true
                    return
                }
            }
        }
    }

    handleClick(): void {
        this.clicked.emit(this.user()?.id as string)
    }
}