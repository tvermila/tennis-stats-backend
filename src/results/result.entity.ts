import { Player } from "src/players/player.entity";
import { Season } from "src/seasons/season.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";


@Entity()
export class Result {

  @PrimaryGeneratedColumn()
  id: number;

  // @OneToOne(type => Player, { nullable: false, eager: true })
  // @JoinColumn()
  // playerHome: Player;

  // @OneToOne(type => Player, { nullable: false, eager: true })
  // @JoinColumn()
  // playerAway: Player;

//   @ManyToMany(type => Player, player => player.results, {
//     cascade: true
// })
//   @JoinTable({name: 'player_result'})
//   players: Player[]

  @ManyToOne(type => Player, player => player.results, {nullable: false, eager: true})
  @JoinColumn()
  playerHome: Player;

  @ManyToOne(type => Player, player => player.results, {nullable: false, eager: true})
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