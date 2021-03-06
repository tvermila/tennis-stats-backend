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

}