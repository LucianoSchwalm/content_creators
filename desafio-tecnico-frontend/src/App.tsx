import React, { useEffect, useState } from "react";
import { ContentCreatorDto } from "./dto/contentCreator";
import { useInView } from "react-intersection-observer";
import Modal from "react-modal";
import useApi from "./hooks/useApi";
import ModalList from "./ModalList";

Modal.setAppElement("#root");

const App: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCreatorsIds, setSelectedCreatorsIds] = useState<number[]>([]);
  const {  mutation, data, fetchNextPage } = useApi(selectedCreatorsIds)
  

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleOnClick = (itemId: number) => {
    selectedCreatorsIds.includes(itemId)
      ? setSelectedCreatorsIds(
          selectedCreatorsIds.filter((idCreator) => idCreator !== itemId)
        )
      : setSelectedCreatorsIds((oldSelectedCreatorsIds) => [
          ...oldSelectedCreatorsIds,
          itemId,
        ]);
  };

  const handleOnClickAll = (isChecked: boolean) => {
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
            </header>
            <table className="min-w-full border">
              <thead className="bg-gray-200 border-b">
                <tr>
                  <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selectedCreatorsIds.length ===
                        data?.pages[data.pages.length - 1].length
                      }
                      name="allContentCreators"
                      id="allContetCreators"
                      className="h-5 w-5"
                      onChange={(e) => handleOnClickAll(e.target.checked)}
                    />
                  </th>
                  <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Nick
                  </th>
                  <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Email
                  </th>
                  <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Seguidores no Youtube
                  </th>
                  <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Nacionalidade
                  </th>
                  <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Último vídeo foi em uma semana?
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.pages[data?.pages.length - 1].map(
                  (item: ContentCreatorDto) => (
                    <tr key={item.id} className="bg-white border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <input
                          checked={selectedCreatorsIds.includes(item.id)}
                          type="checkbox"
                          name="allContentCreators"
                          id="allContentCreators"
                          className="h-5 w-5"
                          onChange={() => handleOnClick(item.id)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.nick}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {item.email}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {item.followersYtb}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {item.country}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {item.lastVideoInAWeek ? "Sim" : "Não"}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mx-10 mb-10">
          <button ref={ref} onClick={openModal} className="border">
            Verificar Seguidores
          </button>
        </div>
        <ModalList pages={data?.pages[data?.pages.length-1]} selectedCreatorsIds={selectedCreatorsIds} modalIsOpen={modalIsOpen} closeModal={closeModal}/>
      </div>
    </>
  );
};

export default App;
