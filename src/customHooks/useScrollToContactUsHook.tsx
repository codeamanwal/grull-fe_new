const useScrollToContactUsHook = () => {
  const scrollToSection = () => {
    const section = document.getElementById("contactus");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return scrollToSection;
};

export default useScrollToContactUsHook;
