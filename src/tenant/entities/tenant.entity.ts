import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Tenant {
 @PrimaryGeneratedColumn()
 id: number

 @Column({ type: 'varchar', length: 50 })
 service: string

 @Column({ type: 'text' })
 cfg: string

 @Column('text')
 backup: string

 @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
 public created_at: Date

 @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
 public updated_at: Date
}
