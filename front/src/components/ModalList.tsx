import { FaTimes } from "react-icons/fa";
import Modal from "react-modal";
import { ContentCreatorDto } from "../dto/contentCreator";
import {
   InfiniteData,
   QueryObserverResult,
   RefetchOptions,
   UseMutationResult,
} from "@tanstack/react-query";
import TableList from "./TableList";

Modal.setAppElement("#root");

interface MyComponentProps {
   pages: ContentCreatorDto[];
   selectedCreatorsIds: number[];
   modalIsOpen: boolean;
   closeModal: () => void;
   updateAll: UseMutationResult<void, Error, void, unknown>;
   selectContentCreator: (itemId: number) => void;
   selectAllContentCreators: (isChecked: boolean) => void;
   refetch: (
      options?: RefetchOptions | undefined
   ) => Promise<QueryObserverResult<InfiniteData<any, unknown>, Error>>;
}

const ModalList: React.FC<MyComponentProps> = ({
   pages,
   selectedCreatorsIds,
   modalIsOpen,
   closeModal,
   updateAll,
   selectContentCreator,
   selectAllContentCreators,
   refetch,
}) => {
   const updateFollowers = () => {
      updateAll.mutate();
   };

   return (
      <Modal
         isOpen={modalIsOpen}
         onRequestClose={closeModal}
         contentLabel="Exemplo de Modal"
         style={{
            content: {
               width: "80%",
               height: "80%",
               top: "50%",
               left: "50%",
               right: "auto",
               bottom: "auto",
               marginRight: "-50%",
               transform: "translate(-50%, -50%)",
            },
            overlay: {
               backgroundColor: "rgba(0, 0, 0, 0.75)",
            },
         }}
      >
         <>
            <button
               onClick={closeModal}
               style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "transparent",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
               }}
            >
               <FaTimes />
            </button>
            <TableList
               pages={pages}
               selectedCreatorsIds={selectedCreatorsIds}
               modalIsOpen={modalIsOpen}
               selectContentCreator={selectContentCreator}
               selectAllContentCreators={selectAllContentCreators}
               refetch={refetch}
            />
            <div>
               <div className="text-2xl py-4 flex justify-content-center">
                  Deseja Atualizar os Seguidores dos Selecionados?
               </div>
               <div>
                  <button
                     className="text-2xl p-4 border"
                     onClick={updateFollowers}
                  >
                     SIM
                  </button>
                  <span className="p-5"></span>
                  <button className="text-2xl p-4 border" onClick={closeModal}>
                     NÃO
                  </button>
               </div>
            </div>
         </>
      </Modal>
   );
};

export default ModalList;
