import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";



export const usePost = (posterFunc, qKey) => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data) => posterFunc(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: qKey });
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
  
  
  export const useDelete =(deleterFunc, qKey) =>{
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (param) => deleterFunc(param),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: qKey });
      },
    });
  }


  export const useUpdate = (qKey, updaterFunc) =>{
    const queryClient = useQueryClient();
  
      return useMutation({
        mutationFn: (data) => updaterFunc(data),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: qKey });
        },
      });
  } 
  

  export const useDirectMutation = (qKey, mutationFunc, activateOnMutate)=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => mutationFunc(data),
        onMutate: async (newData)=>{
            if (activateOnMutate === true){
                await queryClient.cancelQueries({ queryKey: qKey })
                const previousData = queryClient.getQueryData(qKey)
                queryClient.setQueryData(qKey, () => newData)
            }
        },
        onSuccess: (newData) => {
          queryClient.invalidateQueries({ queryKey: qKey });

          queryClient.setQueryData(qKey, newData);
        },
      });

  }

  export const useFlexMutation = (qKey, mutationFunc, activateOnMutate = false , directQueryUpdate = false)=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => mutationFunc(data),
        onMutate: async (newData)=>{
            if (activateOnMutate === true){
                await queryClient.cancelQueries({ queryKey: qKey })
                const previousData = queryClient.getQueryData(qKey)
                queryClient.setQueryData(qKey, () => newData)
            }
        },
        onSuccess: (newData) => {
            if (directQueryUpdate){
                queryClient.setQueryData(qKey, newData);
            }
            else{
                queryClient.invalidateQueries({ queryKey: qKey });
            } 

        },
      });

  }


  export const useConfigQuery = (qKey, getterFunc,params,  config ={})=>{
    const context = useQuery({
        queryKey: qKey,
        queryFn: () => getterFunc(params),
        ...config
      });
      return context;

  }

