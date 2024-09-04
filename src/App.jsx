import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./pages/About";
import Itens from "./pages/Itens";
import Noticia from "./pages/Noticia";
import Pokedex from "./pages/Pokedex";
import Videos from "./pages/Videos";

function App() {
    return (
        <>
            <Header />

            <Routes>
                {/* <Route path='/' element={<ApiRickAndMorty />} /> */}
                <Route path='/about' element={<About />} />
                <Route path='/itens' element={<Itens />} />
                <Route path='/noticia' element={<Noticia />} />
                <Route path='/pokedex' element={<Pokedex />} />
                <Route path='/videos' element={<Videos />} />
            </Routes>

            <Footer />
        </>
    );
}

export default App;