import { Offer } from "./Offer";
import { Proposal } from "./Proposal";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeUpdate,
} from "typeorm";
import {
  Length,
  MaxLength,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsEnum,
} from "class-validator";

export enum UserType {
  CUSTOMER = "customer",
  PROVIDER = "provider",
}
@Entity("goflux_users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: UserType,
  })
  @IsEnum(UserType, { message: "Tipo de Usuário invalido" })
  type: UserType;

  @Column({ unique: true, length: 254 })
  @IsNotEmpty({ message: "O Email não pode ser vazio" })
  @IsEmail({}, { message: "O Email é Invalido" })
  email: string;

  @Column({ nullable: false, select: false })
  @IsNotEmpty({ message: "O Nome não pode ser vazio" })
  @MaxLength(100, {
    message: "A Senha deve conter no minimo 8 digitos",
  })
  @MinLength(8, {
    message: "A Senha deve conter no maximo 100 digitos",
  })
  password: string;

  @Column({ unique: true, length: 254 })
  @IsNotEmpty({ message: "O Nome não pode ser vazio" })
  @MaxLength(100, {
    message: "O tamanho do nome excede o limite de 100 caracteres",
  })
  name: string;

  @Column("varchar", { length: 14, select: false })
  @Length(14, 14, { message: "O Documento deve conter 14 digitos" })
  doc: string;

  @Column("varchar", { length: 254 })
  @MaxLength(254, {
    message: "A Descrição não pode conter mais que 254 caracteres",
  })
  about: string;

  @Column("boolean", {
    default: true,
  })
  active: boolean;

  @Column({
    nullable: true,
  })
  site?: string;

  @OneToMany(() => Proposal, (proposal) => proposal.user)
  @JoinColumn()
  proposals: Proposal[];

  @OneToMany(() => Offer, (offer) => offer.user)
  @JoinColumn()
  offers: Offer[];

  @CreateDateColumn({ default: "now()" })
  created_at: Date;
  @UpdateDateColumn({
    default: "now()",
  })
  updated_at: Date;

  @BeforeUpdate()
  updateDate() {
    this.updated_at = new Date();
  }
}
