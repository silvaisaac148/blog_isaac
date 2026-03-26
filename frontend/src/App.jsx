import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Presentacion from "./pages/Presentacion";
import LapsoPage from "./pages/LapsoPage";
import PostDetail from "./pages/PostDetail";
import InfografiaViewer from "./pages/InfografiaViewer";

function App() {
    return (
        <div className="app">
            <Navbar />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Presentacion />} />
                    <Route path="/lapso-1" element={<LapsoPage lapsoSlug="lapso-1" title="Lapso 1" />} />
                    <Route path="/lapso-2" element={<LapsoPage lapsoSlug="lapso-2" title="Lapso 2" />} />
                    <Route path="/lapso-3" element={<LapsoPage lapsoSlug="lapso-3" title="Lapso 3" />} />
                    <Route path="/lapso-4" element={<LapsoPage lapsoSlug="lapso-4" title="Lapso 4" />} />
                    <Route path="/post/:slug" element={<PostDetail />} />
                    <Route
                        path="/infografia/cto"
                        element={
                            <InfografiaViewer
                                src="/infografias/infografia_cto.html"
                                title="Infografía CTO · De Programador a Orquestador"
                            />
                        }
                    />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
