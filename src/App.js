import "./App.css";
import HomePage from "./pages/HomePage";

function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-green-100 text-white py-4">
                <div className="container mx-auto">
                    <h1>Header</h1>
                </div>
            </header>
            <main>
                <HomePage />
            </main>
            <footer className="bg-gray-500 text-white py-4">
                <div className="container mx-auto">
                    <h3 className="text-xl font-bold">Footer</h3>
                    <p>Content goes here</p>
                </div>
            </footer>
        </div>
    );
}

export default App;
