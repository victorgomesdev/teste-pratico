import { Address } from "./address"

export type UserRequest = {
    name: string,
    email: string,
    dateOfBirth: string,
    biography: string,
    address: Address,
    base64Image?: string
    base64ImageName?: string
}