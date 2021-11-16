import { Routes, Route } from "react-router-dom";
import { ProposalProvider } from "../../../context/Proposal";
import AddProposal from "./Add";
import Edit from "./Edit";
import { GetByOffer } from "./GetByOffer/indext";
import { List } from "./List";

const ProposalRoutes = () => {
  return (
    <ProposalProvider>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="offer/:id" element={<GetByOffer />} />
        <Route path="new/:id" element={<AddProposal />} />
        <Route path="edit/:id" element={<Edit />} />
      </Routes>
    </ProposalProvider>
  );
};

export { ProposalRoutes };
