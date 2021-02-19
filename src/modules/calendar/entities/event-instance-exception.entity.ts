import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';

import { InstanceExceptionType } from '../../../constants/instance-exception-types';
import { EventEntity } from './event.entity';

@Entity({ name: 'event_instance_exceptions' })
export class EventInstanceExceptionEntity {
  @ManyToOne(() => EventEntity, (event) => event.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
    primary: true,
  })
  @JoinColumn({ name: 'event_id' })
  event?: EventEntity;

  @RelationId(
    (eventInstanceException: EventInstanceExceptionEntity) =>
      eventInstanceException.event,
  )
  readonly eventId: string;

  @Column({
    nullable: false,
    name: 'exception_date',
    type: 'timestamp without time zone',
    primary: true,
  })
  exceptionDate: Date;

  @Index()
  @Column({
    nullable: false,
    name: 'exception_type_id',
    type: 'smallint',
  })
  exceptionTypeId: InstanceExceptionType;
}
