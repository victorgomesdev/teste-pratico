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
        type: 'varchar',
        nullable: false,
        length: 1000
    })
    email!: string

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

    @Column({
        type: 'longtext'
    })
    base64Image!: string

    @Column({
        type: 'varchar',
        length: 25
    })
    base64ImageName!: string

    @OneToOne(() => Address, { cascade: true })
    @JoinColumn()
    address!: Address
}