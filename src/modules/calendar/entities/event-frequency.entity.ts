import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { Frequency } from '../../../constants/frequencies';

@Entity({ name: 'event_frequencies' })
export class EventFrequencyEntity {
  @PrimaryGeneratedColumn('increment')
  id: Frequency;

  @Column({ nullable: true, name: 'frequency', type: 'interval' })
  interval: string;
}
