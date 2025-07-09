import { Address } from "./address"

export type UserRequest = {
    name: string,
    email: string,
    dateOfBirth: string,
    biography: string,
    address: Address,
    imageBase64?: string
    imageBase64Name?: string
}