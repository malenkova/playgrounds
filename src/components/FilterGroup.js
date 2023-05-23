const FilterGroup = ({ children, title }) => {
    return (
        <fieldset className="border border-solid border-gray-300 p-3">
            <legend className="font-bold px-2">{title}</legend>
            {children}
        </fieldset>
    );
};

export default FilterGroup;
