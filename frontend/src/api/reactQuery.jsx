import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { openDB, deleteDB, wrap, unwrap } from 'idb';
import { dbHandler } from "./dbFunc";
import { v4 as uuidv4 } from 'uuid';

export const usePost = (posterFunc, qKey) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => posterFunc(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qKey });
    },
    onError: (error, query, context) => {
      console.log(error);
      console.log(query);
      console.log(context);
    },
  });
};

export const useGet = (qKey, getterFunc, params) => {
  const context = useQuery({
    queryKey: qKey,
    queryFn: () => getterFunc(params),
  });
  return context;
};

export const useDelete = (deleterFunc, qKey) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (param) => deleterFunc(param),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qKey });
    },
  });
};
export const useFlexDelete = (deleterFunc, qKey, filterFunction) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (param) => deleterFunc(param),
    onMutate: async (oldData) => {
      await queryClient.cancelQueries({ queryKey: qKey });

      const previousData = queryClient.getQueryData(qKey);
      //  the filter functin takes the previous data and filters the new data out of it.
      // the old data is whatever passed to the mutate function which is often and object Id

      const data = filterFunction(previousData, oldData);
      queryClient.setQueryData(qKey, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qKey });
    },
    onError: (err, oldData, context) => {
      if (err.code === "ERR_NETWORK") {
        console.log(err);
        // the async offline functionality will go here
      } else {
        // handling other errors
        console.log(err);
      }
    },
  });
};

export const useUpdate = (qKey, updaterFunc) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updaterFunc(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: qKey });
    },
  });
};

export const useDirectMutation = (qKey, mutationFunc, activateOnMutate) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => mutationFunc(data),
    onMutate: async (newData) => {
      if (activateOnMutate === true) {
        await queryClient.cancelQueries({ queryKey: qKey });
        const previousData = queryClient.getQueryData(qKey);
        queryClient.setQueryData(qKey, () => newData);
      }
    },
    onSuccess: (newData) => {
      queryClient.invalidateQueries({ queryKey: qKey });

      queryClient.setQueryData(qKey, newData);
    },
  });
};

export const useFlexMutation = (
  qKey,
  mutationFunc,
  addFunc,
  activateOnMutate = false,
  directQueryUpdate = false
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => mutationFunc(data),
    onMutate: async (newData) => {
      if (activateOnMutate === true) {
        await queryClient.cancelQueries({ queryKey: qKey });
        const previousData = queryClient.getQueryData(qKey);

        const finalData = addFunc(previousData, newData);

        queryClient.setQueryData(qKey, () => finalData);
        return {qKey}
      }
    },
    onSuccess: (newData) => {
      if (directQueryUpdate) {
        queryClient.setQueryData(qKey, newData);
      } else {
        console.log("invalidated........................")
        queryClient.invalidateQueries({ queryKey: qKey });
      }
    },
    // onError: (err, data, {qKey}) => {
  
    //   let nData = { id: uuidv4(), ...data };
    //   let reqMethod = err.config.method
      

    //   dbHandler(reqMethod, qKey, nData)
      
    //   if (err.code === "ERR_NETWORK") {
    //     // console.log(err);
    //     // the async offline functionality will go here
    //   } else {
    //     // handling other errors
    //     console.log(err);
    //   }
    // },
  });
};

export const useConfigQuery = (qKey, getterFunc, params, config = {}) => {
  const context = useQuery({
    queryKey: qKey,
    queryFn: () => getterFunc(params),
    ...config,
  });
  return context;
};
