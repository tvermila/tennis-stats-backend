import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, OneToMany } from "typeorm"
import { Result } from "src/results/result.entity"


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

  @OneToMany(type => Result, result => result.player)
  results: Result[];

  // @ManyToMany(type => Result, result => result.players)
  // results: Result[]

}