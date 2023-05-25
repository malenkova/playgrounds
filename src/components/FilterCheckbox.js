import FilterIcon from "./FilterIcon";

const FilterCheckbox = ({ title, name, value, onChange, icon }) => {
    return (
        <label className="flex">
            <FilterIcon
                title={title}
                color={icon.color}
                component={icon.component}
            />
            <input
                className="mr-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                type="checkbox"
                name={name}
                value={value ?? false}
                checked={value ?? false}
                onChange={(e) => onChange(name, e.target.checked)}
            />
            {title}
        </label>
    );
};

export default FilterCheckbox;
