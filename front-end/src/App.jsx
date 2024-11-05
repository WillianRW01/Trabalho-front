import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import About from "./pages/About";
import Itens from "./pages/Itens";
import Noticia from "./pages/Noticia";

import Videos from "./pages/Videos";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Perfil from "./pages/Perfil"; 
import { AuthProvider } from "./auth/Context";
import PrivateRoute from "./routes/PrivateRoute";
import PokemonForm from "./pages/Pokeforms/PokemonForm";
import PokemonList from "./pages/Pokelist";

function App() {
    return (
        <AuthProvider>
            <Header />

            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route path='/about' element={<About />} />
                    <Route path='/itens' element={<Itens />} />
                    <Route path='/noticia' element={<Noticia />} />
                    <Route path='/pokedex' element={<PokemonList />} />
                    <Route path='/videos' element={<Videos />} />
                    <Route path='/perfil' element={<Perfil />} />
                    
                    <Route path='/pokemon/new' element={<PokemonForm />} /> 
                    <Route path='/pokedex/:id' element={<PokemonForm />} /> 
                </Route>

                <Route path='/login' element={<Login />} />
                <Route path='/cadastro' element={<Cadastro />} />
            </Routes>

            <Footer />
        </AuthProvider>
    );
}

export default App;
