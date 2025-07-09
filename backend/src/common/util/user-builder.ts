import { Address } from "../../datasource/models/Address";
import { User } from "../../datasource/models/User";

export class UserBuilder {

    private static user = new User()

    static setName(name: string) {
        this.user.name = name
        return this
    }

    static setEmail(email: string) {
        this.user.email = email
        return this
    }

    static setDateOfBith(dateOfBirth: string) {
        this.user.dateOfBirth = new Date(dateOfBirth)
        return this
    }

    static setBiography(biography: string) {
        this.user.biography = biography
        return this
    }

    static setAddress(address: Address) {
        this.user.address = address
        return this
    }

    static setBase64Image(base64: string) {
        this.user.base64Image = base64
        return this
    }

    static setBase64Nmae(base64Name: string) {
        this.user.base64ImageName = base64Name
        return this
    }

    static build() {
        return this.user
    }
}