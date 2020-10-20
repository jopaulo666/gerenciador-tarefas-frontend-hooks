const { useContext, useState, useEffect } = require("react");
const { AuthContext } = require("./useAuth");

const useNavbarItems = () => {

    const auth = useContext(AuthContext);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const activate = (clickedItem) => {
            if (!clickedItem.active) {
                setItems(items.map(item => item.name ==== clickedItem.name ?
                    {...item, active: true} : {...item, active: false}));
            }
        }

        const items = [
            { name: "Listar Tarefas", href: "/", active: true, onClick: activate },
            { name: "Nova Tarefa", href: "/form", active: false, onClick: activate }
        ];

        if (auth.isAuthenticated()) {
            items.push({name: "Sair", active: false, href: "#", onClick: () => auth.logout()});
        }

        setItems(items);
    }, [auth.credentials]);

    return {items};
}