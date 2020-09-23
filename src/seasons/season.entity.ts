import { Result } from "src/results/result.entity";
import { Entity, OneToMany } from "typeorm";
import {PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Season {

  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  season: string

  @OneToMany(type => Result, result => result.season)
  results: Result[];

}