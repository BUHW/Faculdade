import { Alert, Button, Snackbar } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { appointments, host, http, port } from '../../../variavel';
import Container from '../../layout/container/Container';
import MenuAcoes from '../../layout/menuAcoes/MenuAcoes';
import AlertModal from '../../layout/modal/AlertModal';
import ModificarResponsavel from '../../layout/modal/responsavel/ModificarResponsavel';
import TableList from '../../layout/tabela/Table';

export default function TabelaResponsavel() {
    const [responsavel, setResponsavel] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({ show: false, severity: '', message: '' });
    const [selectedResponsavel, setSelectedResponsavel] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [statusResponsavel, setStatusResponsavel] = useState(null);

    async function getResponsavel() {
        try {
            const resp = await axios.get(`${http}://${host}:${port}${appointments}`)
            const editResp = resp.data.appointments.map((student) => ({
                ...student,
                status: student.status ? 'Ativo' : 'Inativo',
                date: new Date(student.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
            }))

            setResponsavel(editResp)
        } catch {
            setAlert({ show: true, severity: 'error', message: 'Erro ao carregar responsavel' })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getResponsavel();
    }, []);

    const handleClose = () => {
        setAlert({ ...alert, show: false });
    };

    const openEditModalresponsavel = (responsavel) => {
        setSelectedResponsavel(responsavel);
        setEditMode(true);
        setIsEditModalOpen(true);
    };

    const openCreateModalresponsavel = () => {
        setSelectedResponsavel(null);
        setEditMode(false);
        setIsEditModalOpen(true);
    };

    async function deleteResponsavel(id) {
        try {
            const ResponsavelToChange = responsavel.find((responsavel) => responsavel._id === id);
            const newStatus = ResponsavelToChange.status === 'Ativo' ? false : true;

            await axios.put(`${http}://${host}:${port}${appointments}/${id}`, { status: newStatus });
            getResponsavel();

            setAlert({
                show: true,
                severity: 'success',
                message: newStatus ? 'responsavel ativado com sucesso!' : 'responsavel inativado com sucesso!',
            });
        } catch (error) {
            console.error('Erro ao atualizar status do responsavel:', error);
            setAlert({ show: true, severity: 'error', message: 'Erro ao atualizar status do responsavel' });
        }
    }

    function handleAlertOpen(id) {
        const ResponsavelToChange = responsavel.find((responsavel) => responsavel._id === id);
        const newStatus = ResponsavelToChange.status === 'Ativo' ? false : true;
        setStatusResponsavel(newStatus);
        setSelectedResponsavel(id);
        setAlertOpen(true);
    }

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const opcoesMenu = (responsavel) => {
        const options = []

        if (responsavel.status !== false) {
            options.push({ label: 'Editar', onClick: () => openEditModalresponsavel(responsavel) })
        }
        options.push({ label: responsavel.status === 'Ativo' ? 'Inativar' : 'Ativar', onClick: () => handleAlertOpen(responsavel._id) })

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
            field: 'date',
            headerName: 'Data de aniversário',
        },
        {
            field: 'phone_number',
            headerName: 'Nomero de telefone',
        },
        {
            field: 'student',
            headerName: 'Responsável pelo estudante',
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
                <Button variant="contained" className="btn-primary" onClick={openCreateModalresponsavel}>Cadastrar responsavel</Button>
            </div>
            <ModificarResponsavel
                getResponsavel={getResponsavel}
                selectedResponsavel={selectedResponsavel}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                editMode={editMode}
            />
            <TableList
                columns={columns}
                rows={responsavel}
                loading={loading}
            />
            {alertOpen && (
                <AlertModal
                    open={alertOpen}
                    handleClose={handleAlertClose}
                    description={statusResponsavel === true ? 'Deseja realmente ativar este responsavel?' : 'Deseja realmente inativar este responsavel?'}
                    title={statusResponsavel === true ? 'Ativar responsável' : 'Inativar responsável'}
                    handle={deleteResponsavel}
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