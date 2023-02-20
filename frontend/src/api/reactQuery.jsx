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
  export const useFlexDelete =(deleterFunc, qKey, filterFunction) =>{
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (param) => deleterFunc(param),
      onMutate: async (oldData)=>{
        await queryClient.cancelQueries({ queryKey: qKey })

        const previousData = queryClient.getQueryData(qKey)
        //  the filter functin takes the previous data and filters the new data out of it. 
        // the old data is whatever passed to the mutate function which is often and object Id

        const data = filterFunction(previousData, oldData)
        queryClient.setQueryData(qKey,data)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: qKey });
      },
      onError:(err, oldData, context )=>{
        if (err.code  === "ERR_NETWORK" ){
          console.log(err)
          // the async offline functionality will go here 
        }else {
          // handling other errors
          console.log(err )
        }
      } 

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

  export const useFlexMutation = (qKey, mutationFunc, addFunc, activateOnMutate = false , directQueryUpdate = false)=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => mutationFunc(data),
        onMutate: async (newData)=>{
            if (activateOnMutate === true){
                await queryClient.cancelQueries({ queryKey: qKey })
                const previousData = queryClient.getQueryData(qKey)
                
                 const finalData = addFunc(previousData,newData )
                
                queryClient.setQueryData(qKey, () => finalData)

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

