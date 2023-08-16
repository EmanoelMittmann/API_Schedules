import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Services } from "./Services";

export enum Status{
    AGENDADO = 'Agendado',
    ABERTO = 'Aberto',
    CONCLUIDO = 'Concluido',
    CANCELADO = 'Cancelado'
}

@Entity()
export class Schedules{
    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column('date')
    date: string

    @Column()
    time: string

    @Column({
        name: 'enum_status',
        type: 'enum',
        enum: ["Agendado","Aberto","Cancelado","Concluido"],
        default: Status.ABERTO
    })
    status: Status

    @ManyToOne(() => Services, (props) => props.id)
    services: Services
}