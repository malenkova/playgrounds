import { IconContext } from "react-icons";
const FilterIcon = ({ component, color, title }) => {
    return (
        <span className="inline-block w-4 mt-1 mr-1" title={title}>
            <IconContext.Provider
                value={{
                    color: color ?? "black",
                    title: title,
                }}
            >
                {component}
            </IconContext.Provider>
        </span>
    );
};

export default FilterIcon;
