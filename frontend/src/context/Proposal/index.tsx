import { createContext, useCallback, useContext } from "react";
import { Api } from "../../services/Api";
import { TypeOffer } from "../Offer";

type Optional<T> = {
  [P in keyof Required<T>]?: T[P];
};

export enum ProposlStatusEnum {
  ACCEPTED = "accepted",
  RECUSED = "recused",
  WAITING = "waiting",
}

export const ProposalStatusPTBR = {
  ACCEPTED: "Aceitos",
  RECUSED: "Recusados",
  WAITING: "Aguardando",
};

export type ProposalType = {
  id: number;
  status: ProposlStatusEnum;
  amount: number;
  value: number;
  created_at: string;
  updated_at: string;
  offer: number | TypeOffer;
  user: userType | number;
};

export type userType = {
  id: number;
  type: string;
  email: string;
  name: string;
  about: string;
  active: boolean;
  site: string;
  created_at: string;
  updated_at: string;
};

type PaginationProps = {
  page: number;
  itensPerPage: number;
};
interface ProposalContextProps {
  find: (
    params: Optional<ProposalType>,
    pagination?: PaginationProps
  ) => Promise<{ proposals: ProposalType[]; count: number }>;
  create: (proposal: ProposalType) => Promise<{ message: string }>;
  update: (params: Optional<ProposalType>) => Promise<any>;
  getById: (id: number) => Promise<ProposalType>;
  delete: (id: number) => Promise<{ message: string }>;
}

const ProposalContext = createContext<ProposalContextProps>(
  {} as ProposalContextProps
);

interface ProposalProviderProps {
  children: React.ReactNode;
}

export const ProposalProvider = ({ children }: ProposalProviderProps) => {
  const baseUrl = "/api/v1/proposal";

  const find = useCallback(
    (params: Optional<ProposalType> = {}, pagination?: PaginationProps) => {
      return new Promise<{ proposals: ProposalType[]; count: number }>(
        async (resolve, reject) => {
          try {
            const response = await Api.get(baseUrl + "/find", {
              params: {
                ...params,
                ...pagination,
              },
            });
            const { proposals, count } = response.data;
            resolve({ proposals, count });
          } catch (error: any) {
            reject(error.response?.data.errors);
          }
        }
      );
    },
    []
  );
  const createProposal = useCallback((proposal) => {
    return new Promise<{ message: string }>(async (resolve, reject) => {
      console.log(proposal);
      try {
        const response = await Api.post(baseUrl, proposal);
        const data = response.data;
        resolve(data);
      } catch (error: any) {
        reject(error.response?.data.errors);
      }
    });
  }, []);
  const update = useCallback((proposal) => {
    return new Promise(async (resolve, reject) => {
      console.log(proposal);
      try {
        const response = await Api.put(`${baseUrl}/${proposal.id}`, proposal);
        const { proposals, count } = response.data;
        resolve({ proposals, count });
      } catch (error: any) {
        reject(error.response?.data.errors);
      }
    });
  }, []);

  const deleteProposal = useCallback((id: number) => {
    return new Promise<{ message: string }>(async (resolve, reject) => {
      try {
        const response = await Api.delete(`${baseUrl}/${id}`);
        const { message } = response.data;
        resolve({ message });
      } catch (error: any) {
        reject(error.response?.data.errors);
      }
    });
  }, []);

  const getById = useCallback((id: Number) => {
    return new Promise<ProposalType>(async (resolve, reject) => {
      try {
        const response = await Api.get(`${baseUrl}/${id}`);
        const proposals = response.data;
        resolve(proposals);
      } catch (error: any) {
        reject(error.response?.data.errors);
      }
    });
  }, []);

  return (
    <ProposalContext.Provider
      value={{
        find: find,
        update: update,
        getById: getById,
        delete: deleteProposal,
        create: createProposal,
      }}
    >
      {children}
    </ProposalContext.Provider>
  );
};

export const useProposalApi = () => {
  const {
    find: findProposal,
    update: updateProposal,
    getById: getProposalById,
    delete: deleteProposal,
    create: createProposal,
  } = useContext(ProposalContext);
  return {
    findProposal,
    updateProposal,
    getProposalById,
    deleteProposal,
    createProposal,
  };
};
