
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/http";

const useProfileMutation = (mutationFn) => {
  return useMutation({
    mutationFn: mutationFn,
    onMutate: async (data) => {
      await queryClient.cancelQueries(["profile"]);
      const previousProfile = queryClient.getQueryData(["profile"]);
      const newUserObj = {
        ...previousProfile,
        ...data,
      };
      queryClient.setQueryData(["profile"], newUserObj);
      return { previousProfile };
    },
    onError: (err, data, context) => {
      queryClient.setQueryData(["profile"], context.previousProfile); 
    },
    onSuccess: (data) => {
    },
    onSettled: () => {
      queryClient.invalidateQueries(["profile"]);
    },
  });
};

export default useProfileMutation;
