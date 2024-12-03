import { Alert, Button, Snackbar } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { host, http, port, professionals } from '../../../variavel';
import Container from '../../layout/container/Container';
import MenuAcoes from '../../layout/menuAcoes/MenuAcoes';
import AlertModal from '../../layout/modal/AlertModal';
import ModificarProfissional from '../../layout/modal/profissional/ModificarProfissional';
import TableList from '../../layout/tabela/Table';

export default function TabelaProfissional() {
    const [profissionais, setProfissionais] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({ show: false, severity: '', message: '' });
    const [selectedProfissional, setSelectedProfissional] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [statusProfissional, setStatusProfissional] = useState(null);

    async function getProfissionais() {
        try {
            const resp = await axios.get(`${http}://${host}:${port}${professionals}`)
            const editResp = resp.data.professionals.map((professional) => ({
                ...professional,
                status: professional.status ? 'Ativo' : 'Inativo'
            }))

            setProfissionais(editResp)
        } catch (error) {
            setAlert({ show: true, severity: 'error', message: 'Erro ao carregar profissionais' });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProfissionais();
    }, []);

    const handleClose = () => {
        setAlert({ ...alert, show: false });
    }

    const openEditModalProfissionais = (profissional) => {
        setSelectedProfissional(profissional);
        setEditMode(true);
        setIsEditModalOpen(true);
    }

    const openCreateModalProfissionais = () => {
        setSelectedProfissional(null);
        setEditMode(false);
        setIsEditModalOpen(true);
    }

    async function deleteProfissional(id) {
        try {
            const profissionalToChange = profissionais.find((profissional) => profissional._id === id);
            const newStatus = profissionalToChange.status === 'Ativo' ? false : true;

            await axios.put(`${http}://${host}:${port}${professionals}/${id}`, { status: newStatus });
            getProfissionais();

            setAlert({
                show: true,
                severity: 'success',
                message: newStatus ? 'Profissional ativado com sucesso!' : 'Profissional inativado com sucesso!',
            });
        } catch (error) {
            console.error('Erro ao atualizar status do profissional:', error);
            setAlert({ show: true, severity: 'error', message: 'Erro ao atualizar status do profissional' });
        }
    }

    function handleAlertOpen() {
        const profissionalToChange = profissionais.find((profissional) => profissional._id === selectedProfissional._id);
        const newStatus = profissionalToChange.status === 'Ativo' ? 'inativar' : 'ativar';
        setStatusProfissional(newStatus);
        setAlertOpen(true);
    }

    function handleCloseAlert() {
        setAlertOpen(false);
    }

    const opcoesMenu = (aluno) => {
        const options = []

        if (aluno.status !== false) {
            options.push({ label: 'Editar', onClick: () => openEditModalProfissionais(aluno) })
        }
        options.push({ label: aluno.status === 'Ativo' ? 'Inativar' : 'Ativar', onClick: () => handleAlertOpen(aluno._id) })

        return options;
    }

    const columns = [
        {
            field: 'name',
            headerName: 'Nome',
        },
        {
            field: 'specialty',
            headerName: 'Especialidade',
        },
        {
            field: 'contact',
            headerName: 'Contato',
        },
        {
            field: 'phone_number',
            headerName: 'Número de telefone',
        },
        {
            field: 'status',
            headerName: 'Situação',
        },
        {
            field: 'acoes',
            headerName: 'Ações',
            align: 'right',
            render: (row) => <MenuAcoes opcoesMenu={opcoesMenu(row)} />,
        },
    ];

    return (
        <Container>
            <div className="position_modal">
                <Button variant="contained" className="btn-primary" onClick={openCreateModalProfissionais}>Cadastrar profissional</Button>
            </div>
            <ModificarProfissional
                getProfissionais={getProfissionais}
                selectedProfissional={selectedProfissional}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                editMode={editMode}
            />
            <TableList
                columns={columns}
                rows={profissionais}
                loading={loading}
            />
            {alertOpen && (
                <AlertModal
                    open={alertOpen}
                    handleClose={handleCloseAlert}
                    description={statusProfissional === true ? 'Deseja realmente ativar este profissional?' : 'Deseja realmente inativar este profissional?'}
                    title={statusProfissional === true ? 'Ativar profissional' : 'Inativar profissional'}
                    handle={() => deleteProfissional(selectedProfissional)}
                />
            )}
            <Snackbar
                open={alert.show}
                autoHideDuration={5000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity={alert.severity} variant="filled" sx={{ width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </Container>
    )
}