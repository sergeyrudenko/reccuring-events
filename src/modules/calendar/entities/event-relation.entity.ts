import { Entity, JoinColumn, ManyToOne, OneToOne, RelationId } from 'typeorm';

import { CompanyEntity } from '../../company/entities/company.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { EventEntity } from './event.entity';

@Entity({ name: 'event_relations' })
export class EventRelationEntity {
  @OneToOne(() => EventEntity, (event) => event.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
    primary: true,
  })
  @JoinColumn({ name: 'event_id' })
  event?: EventEntity;

  @RelationId((eventRelation: EventRelationEntity) => eventRelation.event)
  readonly eventId: string;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @RelationId((eventRelation: EventRelationEntity) => eventRelation.user)
  readonly userId: string | null;

  @ManyToOne(() => CompanyEntity, (company) => company.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'company_id' })
  company?: CompanyEntity;

  @RelationId((eventRelation: EventRelationEntity) => eventRelation.company)
  readonly companyId: string | null;
}
