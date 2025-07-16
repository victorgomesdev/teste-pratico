import 'reflect-metadata'
import dotenv from 'dotenv'
import { DataSource, MixedList } from "typeorm";
import { EntitySchema } from "typeorm";
import { Address } from './models/Address';
import { User } from './models/User';
import { Migrations1752694138800 } from './migrations/1752694138800-migrations';

dotenv.config()

const ENTITIES: MixedList<string | Function | EntitySchema> = [
    Address,
    User
]

const MIGRATIONS: MixedList<string | Function> = [
    Migrations1752694138800
]

const AppDataSource = new DataSource({
    //synchronize: true,
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'my-profile',
    entities: [...ENTITIES],
    migrations: [...MIGRATIONS],
})

export default AppDataSource