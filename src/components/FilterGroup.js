const FilterGroup = ({ children, title }) => {
    return (
        <fieldset className="area mb-3">
            <p className="font-bold">{title}</p>
            {children}
        </fieldset>
    );
};

export default FilterGroup;
