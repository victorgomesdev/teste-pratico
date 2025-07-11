import { Component, inject, input, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { imageToBase64Util } from "../../util/image-64";

import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { EditorModule } from 'primeng/editor';
import { UserService } from "../../../../services/user";
import { HttpErrorResponse } from "@angular/common/http";
import { User } from "../../types/user";

const IMPORTS = [
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    SelectModule,
    InputNumberModule,
    DatePickerModule,
    FloatLabelModule,
    EditorModule,
    ReactiveFormsModule,
    CommonModule
]

@Component({
    templateUrl: './user-form.component.html',
    selector: 'user-form',
    imports: [...IMPORTS]
})
export class UserFormComponent implements OnInit {

    formGroup!: FormGroup
    formBuilder = new FormBuilder()
    userService = inject(UserService)

    user = input<User>()
    base64!: string

    ngOnInit(): void {

        this.formGroup = this.formBuilder.group({
            name: ['', [Validators.required]],
            email: ['', Validators.required],
            dateOfBirth: ['', Validators.required],
            biography: ['', Validators.required],
            imageBase64: this.formBuilder.control(''),
            address: this.formBuilder.group({
                number: this.formBuilder.control(undefined, {
                    validators: [Validators.required]
                }),
                street: ['', Validators.required],
                district: ['', Validators.required],
                city: ['', Validators.required],
                state: ['', Validators.required]
            })
        })

        if(this.user()) {
            delete this.user()?.id
            this.formGroup.setValue({
                name: this.user()?.name,
                dateOfBirth: new Date(this.user()?.dateOfBirth as string),
                email: this.user()?.email,
                biography: this.user()?.biography,
                address: {
                    number: this.user()?.address.number,
                    street: this.user()?.address.street || " ",
                    district: this.user()?.address.district || " ",
                    city: this.user()?.address.city || " ",
                    state: this.user()?.address.state
                },
                imageBase64: this.user()?.imageBase64 || " "
            })
        }
    }

    async onImageSelected(input: Event): Promise<void> {
        try {
            this.base64 = (await imageToBase64Util(<HTMLInputElement>input.target)).base64
            this.formGroup.get('imageBase64')?.setValue(this.base64)
        } catch (e) {
            if (e === -1) console.log('Imagem muito grande')
        }
    }

    cancelImage(): void {
        this.base64 = ''
        this.formGroup.get('imageBase64')?.reset()
    }

    onDateChange(date: Date): void {
        this.formGroup.get('dateOfBirth')?.setValue(date.toISOString().split('T')[0])
    }

    saveForm() {
        if (this.formGroup.valid) {
            this.userService.createUser(this.formGroup.value)
            .subscribe({
                next: ()=>{
                    alert("Usuário cadastrado.")
                },
                error: (err: HttpErrorResponse)=> alert(err.error.message)
            })
        }else{
            alert("Campos inválidos!")
        }
    }

    states = [
        "MG"
    ]
}