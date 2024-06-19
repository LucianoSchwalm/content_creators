import { ContentCreatorDto } from "../dto/contentCreator";

interface MyComponentProps {
   pages: ContentCreatorDto[];
   selectedCreatorsIds: number[];
   modalIsOpen: boolean;
   selectContentCreator: (itemId: number) => void;
   selectAllContentCreators: (isChecked: boolean) => void;
}

const TableList: React.FC<MyComponentProps> = ({
   pages,
   selectedCreatorsIds,
   modalIsOpen,
   selectContentCreator,
   selectAllContentCreators,
}) => {
   return (
      <table className="min-w-full border">
         <thead className="bg-gray-200 border-b">
            <tr>
               <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  {!modalIsOpen && (
                     <input
                        type="checkbox"
                        checked={selectedCreatorsIds?.length === pages?.length}
                        name="allContentCreators"
                        id="allContetCreators"
                        className="h-5 w-5"
                        onChange={(e) => selectAllContentCreators(e.target.checked)}
                     />
                  )}
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
            {modalIsOpen
               ? pages
                    ?.filter((item: ContentCreatorDto) =>
                       selectedCreatorsIds.includes(item.id)
                    )
                    .map((selectedItem: ContentCreatorDto) => (
                       <tr key={selectedItem.id} className="bg-white border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                             {!modalIsOpen && (
                                <input
                                   checked={selectedCreatorsIds.includes(
                                      selectedItem.id
                                   )}
                                   type="checkbox"
                                   name="allContentCreators"
                                   id="allContentCreators"
                                   className="h-5 w-5"
                                   onChange={() =>
                                      selectContentCreator(selectedItem.id)
                                   }
                                />
                             )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                             {selectedItem.nick}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                             {selectedItem.email}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                             {selectedItem.followersYtb}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                             {selectedItem.country}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                             {selectedItem.lastVideoInAWeek ? "Sim" : "Não"}
                          </td>
                       </tr>
                    ))
               : pages?.map((item: ContentCreatorDto) => (
                    <tr key={item.id} className="bg-white border-b">
                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {!modalIsOpen && (
                             <input
                                checked={selectedCreatorsIds.includes(item.id)}
                                type="checkbox"
                                name="allContentCreators"
                                id="allContentCreators"
                                className="h-5 w-5"
                                onChange={() => selectContentCreator(item.id)}
                             />
                          )}
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
                 ))}
         </tbody>
      </table>
   );
};

export default TableList;
