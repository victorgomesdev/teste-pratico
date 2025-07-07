import AppDataSource from "../app-data-source";
import { Address } from "../models/Address";
import { User } from "../models/User";

const AddressRepository = AppDataSource.getRepository(Address)
const UserRespository = AppDataSource.getRepository(User)

export {
    AddressRepository, UserRespository
}