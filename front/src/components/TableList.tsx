import { useEffect, useState } from "react";
import { ContentCreatorDto } from "../dto/contentCreator";
import {
   InfiniteData,
   QueryObserverResult,
   RefetchOptions,
   UseMutationResult,
} from "@tanstack/react-query";

interface MyComponentProps {
   pages: ContentCreatorDto[];
   selectedCreatorsIds: number[];
   modalIsOpen: boolean;
   updateContentCreator?: UseMutationResult<
      void,
      Error,
      ContentCreatorDto,
      unknown
   >;
   selectContentCreator: (itemId: number) => void;
   selectAllContentCreators: (isChecked: boolean) => void;
   refetch: (
      options?: RefetchOptions | undefined
   ) => Promise<QueryObserverResult<InfiniteData<any, unknown>, Error>>;
}

const TableList: React.FC<MyComponentProps> = ({
   pages,
   selectedCreatorsIds,
   modalIsOpen,
   updateContentCreator,
   selectContentCreator,
   selectAllContentCreators,
   refetch,
}) => {
   const [isEditting, setIsEditting] = useState(false);
   const [contentCreators, setContentCreators] =
      useState<ContentCreatorDto[]>(pages);

   useEffect(() => {
      setContentCreators(pages);
   }, [pages]);

   const editContentCreatorNick = (itemId: number, newNick: string) => {
      setContentCreators((oldContentCreators) =>
         oldContentCreators.map((item: ContentCreatorDto) =>
            item.id === itemId ? { ...item, nick: newNick } : item
         )
      );
   };

   const editContentCreatorEmail = (itemId: number, newEmail: string) => {
      setContentCreators((oldContentCreators) =>
         oldContentCreators.map((item: ContentCreatorDto) =>
            item.id === itemId ? { ...item, email: newEmail } : item
         )
      );
   };

   const submitEditContentCreator = (item: ContentCreatorDto) => {
      setIsEditting(!isEditting);
      updateContentCreator?.mutate(item);
   };

   const cancelEditContentCreator = (item: ContentCreatorDto) => {
      setIsEditting(!isEditting);
      const itemPages = pages.find((itemPages) => itemPages.id === item.id);
      itemPages &&
         setContentCreators((oldContentCreators) =>
            oldContentCreators.map((oldItem: ContentCreatorDto) =>
               oldItem.id === item.id
                  ? { ...oldItem, email: itemPages.email, nick: itemPages.nick }
                  : oldItem
            )
         );
      refetch();
   };

   return (
      <table className="min-w-full border">
         <thead className="bg-gray-200 border-b">
            <tr>
               <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  {!modalIsOpen && (
                     <input
                        type="checkbox"
                        checked={
                           selectedCreatorsIds?.length ===
                           contentCreators?.length
                        }
                        name="allContentCreators"
                        id="allContetCreators"
                        className="h-5 w-5"
                        onChange={(e) =>
                           selectAllContentCreators(e.target.checked)
                        }
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
               <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left" />
            </tr>
         </thead>
         <tbody>
            {modalIsOpen
               ? contentCreators
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
               : contentCreators?.map((item: ContentCreatorDto) => (
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
                          <input
                             type="text"
                             className="bg-white"
                             value={item.nick}
                             onChange={(e) =>
                                editContentCreatorNick(item.id, e.target.value)
                             }
                             disabled={!isEditting}
                          />
                       </td>
                       <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap ">
                          <input
                             type="text"
                             className="bg-white w-72"
                             value={item.email ? item.email : ""}
                             onChange={(e) =>
                                editContentCreatorEmail(item.id, e.target.value)
                             }
                             disabled={!isEditting}
                          />
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
                       <td className="text-sm text-gray-900 font-light px-6 py-4 h-24 whitespace-nowrap">
                          {isEditting ? (
                             <div>
                                <button
                                   className="px-4 py-4"
                                   onClick={() =>
                                      submitEditContentCreator(item)
                                   }
                                >
                                   <svg
                                      className="h-6 w-8 text-green-600"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      strokeWidth="2"
                                      stroke="currentColor"
                                      fill="none"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                   >
                                      <path stroke="none" d="M0 0h24v24H0z" />
                                      <circle cx="12" cy="12" r="9" />
                                      <path d="M9 12l2 2l4 -4" />
                                   </svg>
                                </button>
                                <button
                                   onClick={() =>
                                      cancelEditContentCreator(item)
                                   }
                                >
                                   <svg
                                      className="h-6 w-8 text-red-600"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                   >
                                      <circle cx="12" cy="12" r="10" />
                                      <line
                                         x1="15"
                                         y1="9"
                                         x2="9"
                                         y2="15"
                                      />{" "}
                                      <line x1="9" y1="9" x2="15" y2="15" />
                                   </svg>
                                </button>
                             </div>
                          ) : (
                             <div className="px-4 py-4">
                                <button
                                   className="h-5 w-16"
                                   onClick={() => setIsEditting(!isEditting)}
                                >
                                   <svg
                                      className="h-6 w-6 text-gray-600"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                   >
                                      <path
                                         strokeLinecap="round"
                                         strokeLinejoin="round"
                                         strokeWidth="2"
                                         d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                      />
                                   </svg>
                                </button>
                             </div>
                          )}
                       </td>
                    </tr>
                 ))}
         </tbody>
      </table>
   );
};

export default TableList;
