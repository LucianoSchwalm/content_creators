import {
   useInfiniteQuery,
   useMutation,
   useQueryClient,
} from "@tanstack/react-query";
import axios from "../api/axios";
import { ContentCreatorDto } from "../dto/contentCreator";

const useApi = (selectedCreatorsIds: number[]) => {
   const queryClient = useQueryClient();
   const { data, fetchNextPage, refetch } = useInfiniteQuery({
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

   const updateAll = useMutation({
      mutationFn: async () => {
         axios.put(
            `/content_creator/`,
            data?.pages[data?.pages.length - 1]
               .filter((item: ContentCreatorDto) =>
                  selectedCreatorsIds.includes(item.id)
               )
               .map((item: ContentCreatorDto) => item)
         );
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["contentcreator"] });
      },
   });

   const updateContentCreator = useMutation({
      mutationFn: async (item : ContentCreatorDto) => {
         axios.put(
            `/content_creator/${item.id}`,
            item
         );
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["contentcreator"] });
      },
   });

   return { updateAll, updateContentCreator, data, fetchNextPage, refetch };
};

export default useApi;
