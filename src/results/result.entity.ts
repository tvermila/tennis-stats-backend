import { Player } from "src/players/player.entity";
import { Season } from "src/seasons/season.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Result {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Player, {nullable: false, eager: true})
  playerHome: Player;

  @ManyToOne(type => Player, {nullable: false, eager: true})
  playerAway: Player;

  @Column()
  pointsHome: number;

  @Column()
  pointsAway: number;

  @Column({default: false})
  tie: boolean;

  @Column({ nullable: true })
  tieBreak: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'datetime'})
  date: Date;

  @ManyToOne(type => Season, season => season.results, {nullable: false, eager: true})
  season: Season;

}