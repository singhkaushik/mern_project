if (!import.meta.env.VITE_BACKEND_PATH) {
    throw new Error("Backend Path is not set");
  }
  
  const Config = {
    Backend_Path: import.meta.env.VITE_BACKEND_PATH 
  };
  
  export default Config;
  