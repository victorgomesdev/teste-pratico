import { Address } from "../../datasource/models/Address";

export class AddressBuilder {
    private static address = new Address()

    static setStreet(street: string) {
        this.address.street = street
        return this
    }

    static setNumber(number: number) {
        this.address.number = number
        return this
    }

    static setDistrict(district: string) {
        this.address.district = district
        return this
    }

    static setCity(city: string) {
        this.address.city = city
        return this
    }

    static setState(state: string) {
        this.address.state = state
        return this
    }

    static build(): Address {
        return this.address
    }
}