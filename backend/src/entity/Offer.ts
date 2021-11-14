import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  BeforeUpdate,
} from "typeorm";
import { User } from "./User";
import { Proposal } from "./Proposal";
import { IsNotEmpty, IsNumber, NotEquals } from "class-validator";
import { Transform } from "class-transformer";

export enum AmountType {
  TON = "TON",
  KG = "KG",
  G = "G",
}
export enum StatusOffersEnum {
  ACTIVE = "active",
  CLOSED = "closed",
  VALID = "validated",
}

@Entity("goflux_offers")
export class Offer {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    type: "enum",
    enum: StatusOffersEnum,
    default: StatusOffersEnum.ACTIVE,
  })
  status: StatusOffersEnum;

  @Column({ nullable: false })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: "A Origem não pode ser Vazia" })
  @NotEquals("")
  from: string;

  @Column({ nullable: false })
  @NotEquals(false, { message: "O Destino não pode ser vazio" })
  @IsNotEmpty({ message: "O Destino não pode ser Vazia" })
  @Transform(({ value }) => value.trim())
  to: string;

  @Column({ type: "double precision", nullable: false, unsigned: true })
  @IsNotEmpty({ message: "O Valor inicial não pode ser vazio" })
  @IsNumber({}, { message: "O Valor inicial deve ser númerio" })
  @Transform(({ value }) => value.trim())
  initial_value: number;

  @Column({ type: "double precision", nullable: false, unsigned: true })
  @IsNotEmpty({ message: "O Peso não pode ser vazio" })
  @IsNumber({}, { message: "O Peso deve ser númerio" })
  amount: number;

  @Column({
    type: "enum",
    enum: AmountType,
    default: AmountType.KG,
  })
  amount_type: AmountType;

  @ManyToOne(() => User, (user) => user.offers)
  @JoinColumn()
  user: User;

  @OneToMany(() => Proposal, (proposal) => proposal.offer)
  proposals: Proposal[];

  @CreateDateColumn({ default: "now()" })
  created_at: Date;
  @UpdateDateColumn({ default: "now()" })
  updated_at: Date;

  @BeforeUpdate()
  updateDate() {
    this.updated_at = new Date();
  }
}
