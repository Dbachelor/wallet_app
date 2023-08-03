import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    email: string

    @Column()
    name: string

    @Column()
    password: string

    @Column({default:0.00})
    balance: number

    @Column({unique:false})
    wallet_id: string

    @Column({default:1})
    enabled: number

    @Column()
    role:number

}