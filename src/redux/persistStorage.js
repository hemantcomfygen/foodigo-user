import createWebStorage from "redux-persist/es/storage/createWebStorage";

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : {
        getItem: () => Promise.resolve(null),
        setItem: () => Promise.resolve(),
        removeItem: () => Promise.resolve(),
      };

export default storage;
