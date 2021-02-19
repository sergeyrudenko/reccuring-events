import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

import { Frequency } from '../../../constants/frequencies';
import { EventFrequencyEntity } from './event-frequency.entity';

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

  @ManyToOne(
    () => EventFrequencyEntity,
    (eventFrequency) => eventFrequency.id,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      nullable: false,
    },
  )
  frequency?: EventFrequencyEntity;

  @RelationId((event: EventEntity) => event.frequency)
  readonly frequencyId: Frequency;
}
