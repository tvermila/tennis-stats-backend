import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, OneToMany } from "typeorm"


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

  @Column({ default: 0 })
  pointsWon: number

  @Column({ default: 0 })
  pointsLost: number

}