import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactsPage from "./pages/ContactsPage";
import PlaygroundPage from "./pages/PlaygroundPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen">
                <header className="bg-green-100 text-white py-4">
                    <div className="container mx-auto">
                        <h1>Header</h1>
                    </div>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contacts" element={<ContactsPage />} />
                        <Route path="/playgrounds" element={<HomePage />} />
                        <Route
                            path="/playgrounds/:id"
                            element={<PlaygroundPage />}
                        />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </main>
                <footer className="bg-gray-500 text-white py-4">
                    <div className="container mx-auto">
                        <h3 className="text-xl font-bold">Footer</h3>
                        <p>Content goes here</p>
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
