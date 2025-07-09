import { Address } from "../../datasource/models/Address";
import { User } from "../../datasource/models/User";

export class UserBuilder {

    private static user = new User()

    static setName(name: string) {
        this.user.name = name
    }

    static setDateOfBith(dateOfBirth: Date) {
        this.user.dateOfBirth = dateOfBirth
    }

    static setBiography(biography: string) {
        this.user.biography = biography
    }

    static setAddress(address: Address) {
        this.user.address = address
    }

    static build() {
        return this.user
    }
}