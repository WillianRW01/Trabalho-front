import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
    return (
        <>
            <Header />

            <Routes>
                {/* <Route path='/' element={<ApiRickAndMorty />} />
                <Route path='/about' element={<About />} /> */}
            </Routes>

            <Footer />
        </>
    );
}

export default App;