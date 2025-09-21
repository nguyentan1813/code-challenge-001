import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity("resources")
export class ResourceModel {
  @PrimaryGeneratedColumn()
  id!: number
  @Column({ length: 100 })
  name!: string
  @Column({ type: "varchar", length: 255, nullable: true })
  desc?: string | undefined
  @Column({ length: 50 })
  state!: string
  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  createdAt!: Date
  @UpdateDateColumn({ type: "timestamptz", name: "updated_at", nullable: true })
  updatedAt!: Date
}
