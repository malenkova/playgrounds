const FilterRadio = ({ title, name, value, checked, onChange }) => {
    return (
        <label className="block">
            <input
                className="mr-2 rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={(e) =>
                    onChange(name + "_" + value, e.target.checked, name)
                }
            />
            {title}
        </label>
    );
};

export default FilterRadio;
