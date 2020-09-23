import { Result } from "src/results/result.entity"
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class Player {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  firstName: string

  @Column({ nullable: true })
  lastName: string

  @Column({ unique: true })
  nickName: string

  @Column({ default: 0 })
  wins: number

  @Column({ default: 0 })
  losses: number

  @Column({ default: 0 })
  ties: number

}