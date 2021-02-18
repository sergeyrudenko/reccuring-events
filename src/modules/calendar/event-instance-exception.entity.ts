import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';

import { ExceptionType } from '../../common/constants/exception-types';
import { EventEntity } from './event.entity';

@Entity({ name: 'event_instance_exceptions' })
export class EventInstanceExceptionEntity {
    @ManyToOne(() => EventEntity, (event) => event.id, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: false,
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
    })
    exceptionDate: Date;

    @Column({
        nullable: false,
        name: 'exception_type_id',
        type: 'tinyint',
    })
    exceptionTypeId: ExceptionType;
}
