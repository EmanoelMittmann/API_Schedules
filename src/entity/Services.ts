import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import { Professional } from './Professional'
import { Schedules } from './Schedules'

@Entity()
export class Services{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    duration: string

    @Column()
    price: string

    @OneToOne(() => Professional,(user) => user.id)
    @JoinColumn()
    professional: Professional

    @OneToMany(() => Schedules, (schedules) => schedules.id)
    schedules: Schedules
}