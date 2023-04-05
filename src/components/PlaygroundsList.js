const PlaygroundsList = ({ playgrounds = [] }) => {
    return (
        <>
            <h3>Playgrounds:</h3>
            <ul>
            {
            playgrounds.map((place, i) => (
                <li key={place.id}>
                    <p className="text-green-600">{i+1}. {place.name}</p>
                    <p>{place.address}</p>
                </li>
            ))}
            </ul>
        </>
    );
}

export default PlaygroundsList;