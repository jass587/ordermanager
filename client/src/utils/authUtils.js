
export const getLoggedInUser = () => {
    const name = localStorage.getItem("name");
    const id = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    return { id, name, role };
};
