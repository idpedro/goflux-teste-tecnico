import { createContext, useCallback, useContext } from "react";
import Axios from "axios";
import { Api } from "../../services/Api";
import { toast } from "react-toastify";
import { ProposalType } from "../Proposal";

export enum EnumOfferStatus {
  ACTIVE = "active",
  CLOSED = "closed",
  VALID = "validated",
}
export enum OfferStatusPTBR {
  ACTIVE = "Ativo",
  CLOSED = "Finalizado",
  VALIDATED = "Validade",
}

export type TypeOffer = {
  id: string;
  status: EnumOfferStatus;
  from: string;
  to: string;
  initial_value: number;
  amount: number;
  amount_type: "TON" | "KG" | "G";
  created_at: string;
  updated_at: string;
  proposals: number | ProposalType;
};

interface OfferContextProps {
  getOffer: (
    page: number,
    itensPerPage: number
  ) => Promise<{ count: number; offers: TypeOffer[] }>;
  createOffer: (
    offerData: Pick<TypeOffer, "amount" | "to" | "from" | "amount_type">
  ) => Promise<{ message: string }>;

  getOfferById: (id: number) => Promise<TypeOffer>;
}

const OfferContext = createContext<OfferContextProps>({} as OfferContextProps);

interface OfferProviderProps {
  children: React.ReactNode;
}

const OfferProvider = ({ children }: OfferProviderProps) => {
  const baseUrl = "/api/v1/offer";

  const get = useCallback((page: number, itensPerPage: number) => {
    return new Promise<{ count: number; offers: TypeOffer[] }>(
      async (resolve, reject) => {
        try {
          const response = await Api.get<{
            count: number;
            offers: TypeOffer[];
          }>(`${baseUrl}`, { params: { page, itensPerPage } });
          const { data } = response;
          resolve(data);
        } catch (error) {
          if (Axios.isAxiosError(error)) reject(error.response?.data.errors);
          else return error;
        }
      }
    );
  }, []);

  const create = useCallback(
    (offerData: Pick<TypeOffer, "amount" | "to" | "from" | "amount_type">) => {
      return new Promise<{ message: string }>(async (resolve, reject) => {
        try {
          const response = await Api.post<{
            message: string;
          }>(`${baseUrl}`, offerData);
          const { data } = response;
          resolve(data);
        } catch (error) {
          if (Axios.isAxiosError(error)) reject(error.response?.data.errors);
          else return error;
        }
      });
    },
    []
  );

  const getById = useCallback((id: number) => {
    return new Promise<TypeOffer>(async (resolve, reject) => {
      try {
        const response = await Api.get(`${baseUrl}/get/${id}`);
        const { data } = response;
        resolve(data);
      } catch (error) {
        if (Axios.isAxiosError(error)) reject(error.response?.data.errors);
        else return error;
      }
    });
  }, []);

  return (
    <OfferContext.Provider
      value={{ getOffer: get, createOffer: create, getOfferById: getById }}
    >
      {children}
    </OfferContext.Provider>
  );
};

const useOffersApi = () => {
  const { getOffer, createOffer, getOfferById } = useContext(OfferContext);
  return { getOffer, createOffer, getOfferById };
};

export { useOffersApi, OfferProvider };
