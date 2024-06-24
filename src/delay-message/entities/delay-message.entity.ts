import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class DelayMessage {
 @PrimaryGeneratedColumn()
 id: number

 @Column({ type: 'varchar', length: 50 })
 tenantid: string

 @Column({ type: 'varchar', length: 50 })
 external_unique_id: string

 @Column({ type: 'text' })
 content: string

 @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
 created_at: Date

 @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
 updated_at: Date

 @Column({ type: 'varchar', length: 50 })
 next_integration: string

 @Column({ type: 'varchar', length: 50, nullable: true })
 dt_integration: string

 @Column({ type: 'varchar', length: 50 })
 md5_hash: string
}
