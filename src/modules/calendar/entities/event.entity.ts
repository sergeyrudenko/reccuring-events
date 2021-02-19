import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';

import { Frequency } from '../../../constants/frequencies';
import { CompanyEntity } from '../../company/entities/company.entity';
import { UserEntity } from '../../user/entities/user.entity';
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

  @ManyToOne(() => UserEntity, (user) => user.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @RelationId((eventRelation: EventEntity) => eventRelation.user)
  readonly userId: string | null;

  @ManyToOne(() => CompanyEntity, (company) => company.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'company_id' })
  company?: CompanyEntity;

  @RelationId((eventRelation: EventEntity) => eventRelation.company)
  readonly companyId: string | null;
}
