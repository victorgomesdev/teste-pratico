import { Address } from "./address"

export type User = {
    id?: string,
    name: string,
    email: string,
    dateOfBirth: string,
    biography: string,
    address: Address,
    imageBase64?: string
    imageBase64Name?: string
}