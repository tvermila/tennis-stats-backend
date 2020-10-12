export default class CreateResultDto {
  readonly playerHome: string;
  readonly playerAway: string;
  readonly pointsHome: number;
  readonly pointsAway: number;
  readonly tie: boolean;
  readonly tieBreak: string;
  readonly date: Date;
  readonly season: string;
}