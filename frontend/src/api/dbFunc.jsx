import { openDB, deleteDB, wrap, unwrap } from "idb";

const addToDb = async (db, storeName, newData) => {
  console.log("middle line.......................");

  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  console.log(store);
  await store.add(newData);
  console.log("info added to db..............");
  await tx.done;
};
const updateDb = async (db, storeName, newData) => {};
const deleteFromDb = async (db, storeName, newData) => {};

export const readFromDb = async (storeName) => {
  if (!("indexedDB" in window)) {
    console.log("This browser doesn't support IndexedDB");
    return;
  }
  if (!dbHandler.db) {
    dbHandler.db = await openDB("offlineDb");
  }

  const db = dbHandler.db;

  const tx = db.transaction(storeName, "readonly");
  const store = tx.objectStore(storeName);
  const data = await store.getAll();
  return data;
};

export const dbHandler = async (reqMethod, qKey, newData) => {
  if (!("indexedDB" in window)) {
    console.log("This browser doesn't support IndexedDB");
    return;
  }

  const storeName = JSON.stringify([reqMethod, qKey]);
  console.log("handler called ..............................");
  console.log(reqMethod);

  if (!dbHandler.db) {
    dbHandler.db = await openDB(
      "offlineDb",
      parseInt(localStorage.getItem("dbVersion")) || 1,
      {
        upgrade(db, oldVersion, newVersion) {
          localStorage.setItem("dbVersion", newVersion + 1);

          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: "id" });
          }
        },
      }
    );
  }

  const db = dbHandler.db;
  if (reqMethod === "post") {
    await addToDb(db, storeName, newData);
    console.log("post....................");
  }

  console.log("final line.......................");
};



export const dbApiDataHandler =  (response, newData)=>{

    if (navigator.onLine){
        console.log("is online..................")
        return response.data
    }
    console.log("is offLine..................")


    if(response.config.method === "post"){
            
        const responseData = response.data
        if (Array.isArray(responseData)){
            return  [...responseData, newData]
        }
    }

    

}