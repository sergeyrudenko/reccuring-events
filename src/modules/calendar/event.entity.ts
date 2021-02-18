import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'events' })
export class EventEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        type: 'timestamp without time zone',
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp without time zone',
        name: 'updated_at',
    })
    updatedAt: Date;

    @Column({
        nullable: false,
        name: 'start_date',
        type: 'timestamp without time zone',
    })
    startDate: Date;

    @Column({ nullable: true, name: 'frequency', type: 'interval' })
    frequency: string;
}
