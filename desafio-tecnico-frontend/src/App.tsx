import React, { useEffect, useState } from "react";
import axios from "./api/axios";
import { ContentCreatorDto } from "./dto/contentCreator";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";

Modal.setAppElement("#root");

const App: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCreatorsIds, setSelectedCreatorsIds] = useState<number[]>([]);

  const queryClient = useQueryClient();
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["contentcreator"],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const response = await axios.get(`/content_creator/${pageParam}`);
      return response?.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage.length / 10 === allPages.length
          ? allPages.length + 1
          : undefined;
      return nextPage;
    },
  });

  // Mutations
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.put(
        `/content_creator/`,
        data?.pages[data?.pages.length - 1]
          .filter((item: ContentCreatorDto) =>
            selectedCreatorsIds.includes(item.id)
          )
          .map((item: ContentCreatorDto) => item)
      );
      console.log(JSON.stringify(response.data));
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["contentcreator"] });
    },
  });

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

  const handleButton = () => {
    mutation.mutate();
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
            <table className="min-w-full border">
              <thead className="bg-gray-200 border-b">
                <tr>
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
                {data?.pages[data?.pages.length - 1]
                  .filter((item: ContentCreatorDto) =>
                    selectedCreatorsIds.includes(item.id)
                  )
                  .map((item: ContentCreatorDto) => (
                    <tr key={item.id} className="bg-white border-b">
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
                  ))}
              </tbody>
            </table>
            <div>
              <div className="text-2xl py-4 flex justify-content-center">
                Deseja Atualizar os Seguidores dos Selecionados?
              </div>
              <div>
                <button className="text-2xl p-4 border" onClick={handleButton}>
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
      </div>
    </>
  );
};

export default App;
