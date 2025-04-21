export const selectStyles = {
  control: (base) => ({
    ...base,
    borderRadius: "0.5rem",
    borderColor: "#D1D5DB",
    boxShadow: "none",
    minHeight: "2.5rem",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "0.5rem",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#F3F4F6" : "white",
    color: "#111827",
  }),
};
