import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { TypeOffer } from "../../../context/Offer";
import Button from "../../Button";
import Select from "../../Select";
import { Input } from "../Input";

import { InputArea, SelectArea, ButtonArea, SaveIcon } from "./styles";

interface OfferFormProps {
  offer?: TypeOffer;
}
export const OfferForm = ({ offer }: OfferFormProps) => {
  const goTo = useNavigate();

  const handlerCancel = useCallback(() => {
    goTo(-1);
  }, [goTo]);
  return (
    <>
      <InputArea>
        <Input
          title="Origem"
          name="from"
          type={"text"}
          defaultValue={offer?.from}
          placeholder="...Caruaru - PE"
          required
        />
        <Input
          title="Destino"
          name="to"
          type={"text"}
          placeholder="...São Paulo - SP"
          defaultValue={offer?.to}
          required
        />
        <Input
          title="R$"
          name="initial_value"
          type={"number"}
          placeholder="...900"
          defaultValue={offer?.initial_value}
          required
        />

        <SelectArea>
          <Input
            title="Peso"
            name="amount"
            type={"number"}
            placeholder="...130"
            defaultValue={offer?.amount}
            required
          />
          <Select name={"amount_type"} defaultValue={offer?.status}>
            <option value="KG">Kilograma</option>
            <option value="TON">Tonelada</option>
            <option value="G">Gramas</option>
          </Select>
        </SelectArea>

        {offer?.status && (
          <SelectArea>
            <Select
              title="Status"
              name={"amount_type"}
              defaultValue={offer?.status}
            >
              <option value="active">Ativo</option>
              <option value="closed">Finalizado</option>
              <option value="validate">Validado</option>
            </Select>
          </SelectArea>
        )}
      </InputArea>
      <ButtonArea>
        <Button
          title="Salvar"
          type="submit"
          color="green"
          icon={<SaveIcon />}
        />
        <Button
          title="Cancelar"
          type="button"
          color="yellow"
          onClick={handlerCancel}
        />
      </ButtonArea>
    </>
  );
};

export default OfferForm;
