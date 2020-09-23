import { Player } from "src/players/player.entity";
import { Season } from "src/seasons/season.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Result {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Player)
  @JoinColumn()
  playerHome: Player;

  @OneToOne(type => Player)
  @JoinColumn()
  playerAway: Player;

  @Column()
  pointsHome: number;

  @Column()
  pointsAway: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'datetime'})
  date: Date;

  @ManyToOne(type => Season, season => season.results, {nullable: false, eager: true})
  @JoinColumn()
  season: Season;

}