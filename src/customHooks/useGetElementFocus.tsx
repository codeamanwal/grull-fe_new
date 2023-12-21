const useGetElementFocus = () => {
  const getFocus = (id: string) => {
    if (id && typeof window !== "undefined") {
      document?.getElementById(`${id}`)?.focus();
      document.getElementById(`${id}`)?.classList?.add("errorInput");
    }
  };

  const removeFocus = (id: string) => {
    if (id && typeof window !== "undefined") {
      document?.getElementById(`${id}`)?.classList?.remove("errorInput");
    }
  };

  return { getFocus, removeFocus };
};

export default useGetElementFocus;
