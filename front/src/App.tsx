import React, { useEffect, useState } from "react";
import { ContentCreatorDto } from "./dto/contentCreator";
import { useInView } from "react-intersection-observer";
import Modal from "react-modal";
import useApi from "./hooks/useApi";
import ModalList from "./components/ModalList";
import TableList from "./components/TableList";

Modal.setAppElement("#root");

const App: React.FC = () => {
   const { ref, inView } = useInView({
      threshold: 0,
   });

   const [modalIsOpen, setModalIsOpen] = useState(false);
   const [selectedCreatorsIds, setSelectedCreatorsIds] = useState<number[]>([]);
   const { updateAll, updateContentCreator, data, fetchNextPage, refetch } =
      useApi(selectedCreatorsIds);

   const openModal = () => {
      setModalIsOpen(true);
   };

   const closeModal = () => {
      setModalIsOpen(false);
   };

   const selectContentCreator = (itemId: number) => {
      selectedCreatorsIds.includes(itemId)
         ? setSelectedCreatorsIds(
              selectedCreatorsIds.filter((idCreator) => idCreator !== itemId)
           )
         : setSelectedCreatorsIds((oldSelectedCreatorsIds) => [
              ...oldSelectedCreatorsIds,
              itemId,
           ]);
   };

   const selectAllContentCreators = (isChecked: boolean) => {
      isChecked
         ? setSelectedCreatorsIds(
              data?.pages
                 ? data?.pages[data?.pages.length - 1].map(
                      (item: ContentCreatorDto) => item.id
                   )
                 : []
           )
         : setSelectedCreatorsIds([]);
   };

   useEffect(() => {
      if (inView) fetchNextPage();
   }, [inView, fetchNextPage]);

   return (
      <>
         <div className="flex flex-col">
            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
               <div className="py-2 inline-block min-w-full sm:px-6 lg:px-10">
                  <div className="overflow-hidden"></div>
                  <header>
                     <div className="text-3xl pb-5">
                        Lista de criadores de conteúdo que assisto!
                     </div>
                     <div className="grid grid-cols-2">
                        <div className="pb-4">
                           Clique no lápis para editar email e/ou nick do
                           criador de conteúdo
                        </div>
                        <div className="pb-5 text-right">
                           <button onClick={openModal} className="border">
                              Atualizar Seguidores
                           </button>
                        </div>
                     </div>
                  </header>
                  <TableList
                     pages={data?.pages[data?.pages.length - 1]}
                     selectedCreatorsIds={selectedCreatorsIds}
                     modalIsOpen={modalIsOpen}
                     updateContentCreator={updateContentCreator}
                     selectContentCreator={selectContentCreator}
                     selectAllContentCreators={selectAllContentCreators}
                     refetch={refetch}
                  />
               </div>
            </div>
            <ModalList
               selectedCreatorsIds={selectedCreatorsIds}
               modalIsOpen={modalIsOpen}
               closeModal={closeModal}
               updateAll={updateAll}
               selectContentCreator={selectContentCreator}
               selectAllContentCreators={selectAllContentCreators}
               pages={data?.pages[data?.pages.length - 1]}
               refetch={refetch}
            />
         </div>
         <div ref={ref} />
      </>
   );
};

export default App;
