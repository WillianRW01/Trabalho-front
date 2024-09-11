import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./pages/About";
import Itens from "./pages/Itens";
import Noticia from "./pages/Noticia";
import Pokedex from "./pages/Pokedex";
import Videos from "./pages/Videos";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home/home";

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
                <Route path='/login' element={<Login/>} />
                <Route path='/cadastro' element={<Cadastro/>} />
                <Route path='/home' element={<Home/>} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;