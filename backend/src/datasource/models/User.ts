import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./Address";

@Entity({
    name: "usuarios"
})
export class User {

    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    name!: string

    @Column({
        type: 'text',
        nullable: false
    })
    biography!: string

    @Column({
        type: 'date',
        nullable: false
    })
    dateOfBirth!: Date

    @OneToOne(() => Address)
    @JoinColumn()
    address!: Address
}