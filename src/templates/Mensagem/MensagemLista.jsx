
import React, { useState, useEffect } from 'react';
import MensagemService from '../../services/MensagemService';
import Sidebar from '../../components/Menu/Sidebar';
import Header from '../../components/Header/Header';
import logo from '../../assets/images/home.png';

import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';

import './MensagensLista.css';

const MensagensLista = () => {
  const recordsPerPage = [6, 8, 10];

  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(recordsPerPage[0]);
  const [search, setSearch] = useState('');
  const [alerta, setAlerta] = useState({
    show: false,
    message: '',
    type: ''
  });

  const navigate = useNavigate();

  const pages = Math.ceil(records.length / rowsPerPage);
  const totalPages = Math.max(pages, 1);

  const registrosExibidos = records.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const lerMensagem = (id) => {
    navigate(`/mensagemler/${id}`);
  };

  const findAll = () => {
    MensagemService.findAll()
      .then((response) => {
        setRecords(response.data || []);
        setPage(0);
        setAlerta({ show: false, message: '', type: '' });
      })
      .catch((error) => {
        console.error('Erro ao buscar todas as mensagens:', error);
        setRecords([]);
        setPage(0);
        setAlerta({
          show: true,
          message: 'Erro ao carregar mensagens.',
          type: 'error'
        });
      });
  };

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const findByEmail = () => {
    const trimmedEmail = search.trim();

    if (!trimmedEmail) {
      findAll();
      return;
    }

    MensagemService.findByEmail(trimmedEmail)
      .then((response) => {
        const data = response.data || [];

        setRecords(data);
        setPage(0);

        setAlerta({
          show: true,
          message: data.length === 0
            ? 'Nenhuma mensagem encontrada para esse email.'
            : 'Mensagens encontradas com sucesso!',
          type: data.length === 0 ? 'warning' : 'success'
        });
      })
      .catch((error) => {
        console.error('Erro ao buscar mensagens:', error);
        setRecords([]);
        setPage(0);
        setAlerta({
          show: true,
          message: 'Erro ao buscar mensagens. Tente novamente.',
          type: 'error'
        });
      });
  };

  const onSearchSubmit = (e) => {
    e.preventDefault();
    findByEmail();
  };

  const limparBusca = () => {
    setSearch('');
    findAll();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  useEffect(() => {
    findAll();
  }, []);

  useEffect(() => {
    if (page > pages - 1) {
      setPage(Math.max(pages - 1, 0));
    }
  }, [page, pages]);

  return (
    <div className="mensagens-layout d-flex">
      <Sidebar />

      <main className="mensagens-content w-100">
        <Header
          goto="/mensagem"
          title="Lista de Mensagens"
          logo={logo}
        />

        <section className="mensagens-container">

          {/* Cabeçalho da página */}
          <div className="mensagens-heading">
            <div>
              <span className="mensagens-overline">
                CENTRAL DE ATENDIMENTO
              </span>

              <h2>Mensagens recebidas</h2>

              <p>
                Consulte, pesquise e acompanhe as mensagens enviadas
                pelos usuários.
              </p>
            </div>

            <div className="mensagens-total-card">
              <i className="bi bi-envelope-paper"></i>
              <div>
                <strong>{records.length}</strong>
                <span>Mensagens cadastradas</span>
              </div>
            </div>
          </div>

          {/* Busca */}
          <div className="mensagens-search-card">
            <form onSubmit={onSearchSubmit}>
              <div className="mensagens-search-field">
                <i className="bi bi-search"></i>

                <input
                  type="text"
                  placeholder="Pesquisar mensagens por email..."
                  value={search}
                  onChange={onChangeSearch}
                  aria-label="Pesquisar por email"
                />

                {search && (
                  <button
                    type="button"
                    className="mensagens-clear-button"
                    onClick={limparBusca}
                    title="Limpar pesquisa"
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                )}
              </div>

              <button type="submit" className="mensagens-search-button">
                <i className="bi bi-search"></i>
                <span>Pesquisar</span>
              </button>
            </form>
          </div>

          {/* Alertas */}
          {alerta.show && (
            <Alert
              icon={
                alerta.type === 'success'
                  ? <CheckIcon fontSize="inherit" />
                  : undefined
              }
              severity={alerta.type}
              className="mensagens-alert"
              onClose={() =>
                setAlerta({ show: false, message: '', type: '' })
              }
            >
              {alerta.message}
            </Alert>
          )}

          {/* Tabela */}
          <div className="mensagens-table-card">
            <div className="mensagens-table-heading">
              <div>
                <h3>Caixa de entrada</h3>
                <span>Gerencie as mensagens recebidas</span>
              </div>

              <span className="mensagens-count">
                {records.length} registro(s)
              </span>
            </div>

            <div className="table-responsive">
              <table className="mensagens-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Data</th>
                    <th>Remetente</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {registrosExibidos.length > 0 ? (
                    registrosExibidos.map((mensagem) => (
                      <tr key={mensagem.id}>
                        <td className="mensagem-id">
                          #{mensagem.id}
                        </td>

                        <td>{mensagem.dataMensagem}</td>

                        <td className="mensagem-remetente">
                          <div className="mensagem-avatar">
                            <i className="bi bi-person"></i>
                          </div>
                          {mensagem.emissor}
                        </td>

                        <td>{mensagem.email}</td>

                        <td>{mensagem.telefone}</td>

                        <td>
                          <span className={`mensagem-status ${
                            String(mensagem.statusMensagem || '')
                              .toUpperCase() === 'LIDA'
                              ? 'status-lida'
                              : 'status-pendente'
                          }`}>
                            {mensagem.statusMensagem || 'Não informado'}
                          </span>
                        </td>

                        <td>
                          <button
                            type="button"
                            className="mensagem-open-button"
                            title={`Abrir mensagem ${mensagem.id}`}
                            aria-label={`Abrir mensagem ${mensagem.id}`}
                            onClick={() => lerMensagem(mensagem.id)}
                          >
                            <i className="bi bi-folder2-open"></i>
                            <span>Abrir</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">
                        <div className="mensagens-empty">
                          <i className="bi bi-inbox"></i>
                          <strong>Nenhuma mensagem encontrada</strong>
                          <span>
                            Tente pesquisar com outro email ou limpe
                            o campo de busca.
                          </span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Rodapé e paginação */}
            <div className="mensagens-table-footer">
              <div className="mensagens-pagination-info">
                Exibindo{' '}
                <strong>
                  {records.length === 0 ? 0 : page * rowsPerPage + 1}
                  {' - '}
                  {Math.min((page + 1) * rowsPerPage, records.length)}
                </strong>
                {' '}de <strong>{records.length}</strong> mensagens
              </div>

              <div className="mensagens-pagination-controls">
                <label htmlFor="itensPorPagina">
                  Por página:
                </label>

                <select
                  id="itensPorPagina"
                  value={rowsPerPage}
                  onChange={handleChangeRowsPerPage}
                >
                  {recordsPerPage.map((r) => (
                    <option value={r} key={r}>
                      {r}
                    </option>
                  ))}
                </select>

                <div className="mensagens-pagination">
                  <button
                    type="button"
                    disabled={page === 0 || pages === 0}
                    onClick={() => setPage((p) => p - 1)}
                    aria-label="Página anterior"
                  >
                    <i className="bi bi-chevron-left"></i>
                  </button>

                  <span>
                    {pages === 0 ? 0 : page + 1} / {pages}
                  </span>

                  <button
                    type="button"
                    disabled={page >= totalPages - 1 || pages === 0}
                    onClick={() => setPage((p) => p + 1)}
                    aria-label="Próxima página"
                  >
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </section>
      </main>
    </div>
  );
};

export default MensagensLista;
