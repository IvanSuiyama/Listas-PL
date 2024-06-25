import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClienteEditar from './components/clientes/cliEdit';
import ClienteFormCadastro from './components/clientes/cliForm';
import ClienteLista from './components/clientes/cliList';
import ClienteDetalhesId from './components/clientes/clidetalhesId';

function App() {
    return (
        <Router>
            <div>
                <h1>Gestão de Clientes</h1>
                <Routes>
                    <Route path="/listar" element={<ClienteLista />} />
                    <Route path="/cadastrar" element={<ClienteFormCadastro />} />
                    <Route path="/cliente/:id" element={<ClienteDetalhesId />} />
                    <Route path="/editar/:id" element={<ClienteEditar />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
