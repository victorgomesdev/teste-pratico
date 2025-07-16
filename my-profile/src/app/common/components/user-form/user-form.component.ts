import { Component, inject, input, OnInit, output } from "@angular/core";
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

    userUUID!: string
    user = input<User>()
    editedUser = output<User>()
    close = output()
    base64!: string

    ngOnInit(): void {

        this.formGroup = this.formBuilder.group({
            name: ['', [Validators.required]],
            email: ['', Validators.required],
            dateOfBirth: ['', Validators.required],
            biography: ['', Validators.required],
            base64Image: this.formBuilder.control(''),
            base64ImageName: this.formBuilder.control(''),
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

        if (this.user()) {
            this.userUUID = <string>this.user()?.id
            this.base64 = <string>this.user()?.base64Image
            delete this.user()?.id
            this.formGroup.setValue({
                name: this.user()?.name,
                dateOfBirth: this.user()?.dateOfBirth,
                email: this.user()?.email,
                biography: this.user()?.biography,
                base64ImageName: '',
                address: {
                    number: this.user()?.address.number,
                    street: this.user()?.address.street || " ",
                    district: this.user()?.address.district || " ",
                    city: this.user()?.address.city || " ",
                    state: this.user()?.address.state
                },
                base64Image: this.user()?.base64Image || ""
            })
        }
    }

    async onImageSelected(input: Event): Promise<void> {
        try {
            this.base64 = (await imageToBase64Util(<HTMLInputElement>input.target)).base64
            this.formGroup.get('base64Image')?.setValue(this.base64)
        } catch (e) {
            if (e === -1) alert('Imagem muito grande')
        }
    }

    cancelImage(): void {
        this.base64 = ''
        this.formGroup.get('base64Image')?.reset()
    }

    onDateChange(event: Event): void {
        this.formGroup.get('dateOfBirth')?.setValue((<HTMLInputElement>event.target).value)
    }

    saveForm(): void {
        if (this.formGroup.valid) {
            if (!this.user()) {
                this.userService.createUser(this.formGroup.value)
                    .subscribe({
                        next: () => {
                            alert("Usuário cadastrado.")
                        },
                        error: (err: HttpErrorResponse) => alert(err.error.message)
                    })
                return
            }
            this.userService.editUser({
                id: this.userUUID,
                ...this.formGroup.value
            })
                .subscribe({
                    next: (res) => {
                        if (res.updated) alert("Usuário editado com sucesso!")
                        this.editedUser.emit(this.formGroup.value)
                    },
                    error: (err) => {
                        alert(err.error.message)
                    }
                })
        } else {
            alert("Campos inválidos!")
        }
    }

    closeForm(): void {
        this.close.emit()
    }

    reset(): void {
        this.base64 = ''
        this.formGroup.reset()
    }

    states = [
        "AC",
        "AL",
        "AM",
        "AP",
        "BA",
        "CE",
        "DF",
        "ES",
        "GO",
        "MA",
        "MG",
        "MT",
        "MS",
        "PA",
        "PI",
        "PR",
        "PE",
        "RA",
        "RJ",
        "RS",
        "RN",
        "RO",
        "SC",
        "SE",
        "SP",
        "TO"
    ]
}