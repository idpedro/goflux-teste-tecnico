import { createContext, useCallback, useContext } from "react";
import { Api } from "../../services/Api";

export enum ProposlaStatusEnum {
  ACCEPTED = "accepted",
  RECUSED = "recused",
  WAITING = "waiting",
}

export type ProposalType = {
  id: number;
  status: ProposlaStatusEnum;
  amount: number;
  created_at: string;
  updated_at: string;
  user: userType;
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

interface ProposalContextProps {
  getProposalPerOffer: (offerId: string) => Promise<ProposalType[]>;
}

const ProposalContext = createContext<ProposalContextProps>(
  {} as ProposalContextProps
);

interface ProposalProvider {
  children: React.ReactNode;
}

export const ProposalProvider = ({ children }: ProposalProvider) => {
  const baseUrl = "/api/v1/proposal";
  const getPerOffer = useCallback((offerId: string) => {
    return new Promise<ProposalType[]>(async (resolve, reject) => {
      try {
        const response = await Api.get(baseUrl + "/find", {
          params: { offer: offerId },
        });
        resolve(response.data);
      } catch (error: any) {
        reject(error.response?.data.errors);
      }
    });
  }, []);

  return (
    <ProposalContext.Provider value={{ getProposalPerOffer: getPerOffer }}>
      {children}
    </ProposalContext.Provider>
  );
};

export const useProposalApi = () => {
  const { getProposalPerOffer } = useContext(ProposalContext);
  return { getProposalPerOffer };
};
