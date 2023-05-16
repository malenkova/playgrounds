import { useNavigate } from "react-router-dom";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import playgroundsList from "../data/playgrounds";

const SearchByName = () => {
    const navigate = useNavigate();
    const handleOnSelect = (item) => {
        navigate(`/playgrounds/${item.id}`);
    };

    const formatResult = (item) => {
        return (
            <div className="cursor-pointer">
                <strong>{item.name}</strong>
                <br />
                {item.address}
            </div>
        );
    };

    return (
        <div className="relative">
            <ReactSearchAutocomplete
                fuseOptions={{
                    keys: ["name", "address"],
                    ignoreLocation: true,
                    threshold: 0,
                    location: 0,
                    distance: 100,
                }}
                resultStringKeyName="name"
                items={playgroundsList}
                onSelect={handleOnSelect}
                formatResult={formatResult}
                styling={{ borderRadius: "12px", height: "36px" }}
            />
        </div>
    );
};

export default SearchByName;
