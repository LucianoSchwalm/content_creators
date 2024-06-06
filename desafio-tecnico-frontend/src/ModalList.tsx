import { FaTimes } from 'react-icons/fa';
import Modal from 'react-modal'
import { ContentCreatorDto } from './dto/contentCreator';
import useApi from './hooks/useApi';

Modal.setAppElement("#root");

interface MyComponentProps {
  pages: ContentCreatorDto[];
  selectedCreatorsIds: number[];
  modalIsOpen: boolean;
  closeModal: () => void; 
}

const ModalList : React.FC<MyComponentProps> = ( { pages, selectedCreatorsIds, modalIsOpen, closeModal } ) => {

  const { mutation } = useApi(selectedCreatorsIds)

  const handleButton = () => {
    mutation.mutate();
  };
  console.log(pages)
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
                {pages?.filter((item: ContentCreatorDto) =>
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
      )
  }

export default ModalList;