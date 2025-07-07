import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'enderecos'
})
export class Address {

    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    street!: string

    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    district!: string

    @Column({
        type: 'integer',
        nullable: false
    })
    number!: number

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false
    })
    city!: string

    @Column({
        type: 'enum',
        nullable: false,
        enum: [
            "AC",
            "AL",
            "AP",
            "AM",
            "BA",
            "CE",
            "DF",
            "ES",
            "GO",
            "MA",
            "MT",
            "MS",
            "MG",
            "PA",
            "PB",
            "PR",
            "PE",
            "PI",
            "RJ",
            "RN",
            "RS",
            "RO",
            "RR",
            "SC",
            "SP",
            "SE",
            "TO"
        ]
    })
    state!: string
}