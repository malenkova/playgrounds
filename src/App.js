import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactsPage from "./pages/ContactsPage";
import PlaygroundPage from "./pages/PlaygroundPage";
import NotFoundPage from "./pages/NotFoundPage";
import SearchByName from "./components/SearchByName";

function App() {
    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen">
                <header className=" text-my-green py-4 container area mx-auto bg-white">
                    <div className="flex flex-col md:flex-row mx-8">
                        <div className="w-full md:w-2/3 md:pt-1">
                            <NavBar />
                        </div>
                        <div className="w-full md:w-1/3">
                            <SearchByName />
                        </div>
                    </div>
                </header>
                <main className="flex-grow container mb-1 area mx-auto bg-white p-4">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contacts" element={<ContactsPage />} />
                        <Route path="/playgrounds" element={<HomePage />} />
                        <Route
                            path="/playgrounds/:playgroundId"
                            element={<PlaygroundPage />}
                        />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
