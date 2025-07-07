import { Address } from "./address"

export type User = {
    id: string,
    name: string,
    dateOfBirth: string,
    biography: string,
    address: Address
}