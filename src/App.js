import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactsPage from "./pages/ContactsPage";
import PlaygroundPage from "./pages/PlaygroundPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen">
                <header className=" text-my-green py-4 container mx-auto">
                    <div className="container mx-auto">
                        <NavBar />
                    </div>
                </header>
                <main className="flex-grow container mx-auto bg-white p-4">
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
                {/*<footer className="bg-gray-400 text-white py-4 container mx-auto">
                    <div className="container mx-auto">
                        <NavBar />
                    </div>
                </footer>*/}
            </div>
        </BrowserRouter>
    );
}

export default App;
