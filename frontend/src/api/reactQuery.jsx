import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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
        queryClient.invalidateQueries({ queryKey: qKey });
      }
    },
    onError: (err, data, {qKey}) => {
      console.log(err);
      console.log(err.config.data);
      console.log(data);
      console.log(caches);
      console.log(qKey);

      let nData = { id: 222222, ...data };

      caches.open("offline-mutate-cache").then((c) => {
        

        console.log("Cache opened");
        c.match("http://127.0.0.1:8000/app-api/appointments/clinics/", {
          ignoreVary: true,
          ignoreMethod: true,
          ignoreSearch: true,
        })
          .then((match) => {
            console.log("old response", match);
            return match.json();
          })
          .then((t) => {
            // console.log("old data", t);
            // console.log(nData);
            // console.log([...t, nData]);
            // console.log("new reponse");
            // const newResponse =new Response(JSON.stringify([...t, nData]), {
            //   headers: {
            //     "Content-Type": "application/json",
            //     'Access-Control-Allow-Origin': '*',
            //     'Access-Control-Allow-Methods': 'GET, POST, PUT',
            //     'Access-Control-Allow-Headers': 'Content-Type',
            //   },
            //   status: 200,
            //   statusText: 'OK',
            //   type: 'cors',
            //   url: "http://127.0.0.1:8000/app-api/appointments/clinics/",
            // })
            // console.log("new response" , newResponse)
            c.put("",newResponse )

          });
      });
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

export const useConfigQuery = (qKey, getterFunc, params, config = {}) => {
  const context = useQuery({
    queryKey: qKey,
    queryFn: () => getterFunc(params),
    ...config,
  });
  return context;
};
