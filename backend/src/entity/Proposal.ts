import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  UpdateDateColumn,
  ManyToOne,
  BeforeUpdate,
} from "typeorm";

import { User } from "./User";
import { Offer } from "./Offer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { Transform } from "class-transformer";

export enum StatusProposalsEnum {
  ACCEPTED = "accepted",
  RECUSED = "recused",
  WAITING = "waiting",
}

@Entity("goflux_proposals")
export class Proposal {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: "enum",
    enum: StatusProposalsEnum,
    default: StatusProposalsEnum.WAITING,
  })
  status: StatusProposalsEnum;

  @Column({ type: "double precision", unsigned: true })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: "O Peso não pode ser vazio" })
  @IsNumber({}, { message: "O Peso deve ser númerio" })
  amount: number;

  @ManyToOne(() => User, (user) => user.proposals)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Offer, (offer) => offer.proposals)
  @JoinColumn()
  offer: Offer;

  @CreateDateColumn({ default: "now()" })
  created_at: Date;

  @UpdateDateColumn({ default: "now()" })
  updated_at: Date;

  @BeforeUpdate()
  updateDate() {
    this.updated_at = new Date();
  }
}
