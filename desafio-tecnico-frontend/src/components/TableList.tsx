import { useState } from "react";
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

   const [isEditting, setIsEditting] = useState(false)

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
               <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left"/>
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
                       <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {isEditting ? (
                           <div>
                              <button className="px-6 py-4 whitespace-nowrap " onClick={() => setIsEditting(!isEditting)}>
                                 <svg className="h-8 w-8 text-green-600"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z"/>
                                    <circle cx="12" cy="12" r="9" />
                                    <path d="M9 12l2 2l4 -4" />
                                 </svg>
                              </button> 
                              <button className="" onClick={() => setIsEditting(!isEditting)}>
                                 <svg className="h-8 w-8 text-red-600"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" />
                                 </svg>
                              </button>
                           </div>
                        ) : (
                           <button className="px-6 py-4 whitespace-nowrap" onClick={() => setIsEditting(!isEditting)}>
                              <svg className="h-6 w-6 text-gray-600"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                              </svg>
                           </button>
                        )}
                       </td>
                    </tr>
                 ))}
         </tbody>
      </table>
   );
};

export default TableList;
