import { Alert, Button, Snackbar } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { host, http, port, users } from '../../../variavel';
import Container from '../../layout/container/Container';
import MenuAcoes from '../../layout/menuAcoes/MenuAcoes';
import AlertModal from '../../layout/modal/AlertModal';
import ModificarUsuario from '../../layout/modal/usuario/ModificarUsuario';
import TableList from '../../layout/tabela/Table';

export default function TabelaUsuario() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({ show: false, severity: '', message: '' });
    const [selectedUsuario, setSelectedUsuario] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [statusUsuarios, setStatusUsuarios] = useState(null);

    async function getUsuarios() {
        try {
            const resp = await axios.get(`${http}://${host}:${port}${users}`)
            const editResp = resp.data.users.map((student) => ({
                ...student,
                status: student.status ? 'Ativo' : 'Inativo',
                createdAt: new Date(student.createdAt).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
            }))

            setUsuarios(editResp)
        } catch {
            setAlert({ show: true, severity: 'error', message: 'Erro ao carregar usuarios' })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getUsuarios();
    }, []);

    const handleClose = () => {
        setAlert({ ...alert, show: false });
    };

    const openEditModalusuarios = (usuario) => {
        setSelectedUsuario(usuario);
        setEditMode(true);
        setIsEditModalOpen(true);
    };

    const openCreateModalusuarios = () => {
        setSelectedUsuario(null);
        setEditMode(false);
        setIsEditModalOpen(true);
    };

    async function deleteUsuario(id) {
        try {
            const usuarioToChange = usuarios.find((usuario) => usuario._id === id);
            const newStatus = usuarioToChange.status === 'Ativo' ? false : true;

            await axios.put(`${http}://${host}:${port}${users}/${id}`, { status: newStatus });
            getUsuarios();

            setAlert({
                show: true,
                severity: 'success',
                message: newStatus ? 'usuario ativado com sucesso!' : 'usuario inativado com sucesso!',
            });
            onclose();
        } catch (error) {
            console.error('Erro ao atualizar status do usuario:', error);
            setAlert({ show: true, severity: 'error', message: 'Erro ao atualizar status do usuario' });
        }
    }

    function handleAlertOpen(id) {
        const usuarioToChange = usuarios.find((usuario) => usuario._id === id);
        const newStatus = usuarioToChange.status === 'Ativo' ? false : true;
        setStatusUsuarios(newStatus);
        setSelectedUsuario(id);
        setAlertOpen(true);
    }

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const opcoesMenu = (usuario) => {
        const options = []

        if (usuario.status !== false) {
            options.push({ label: 'Editar', onClick: () => openEditModalusuarios(usuario) })
        }
        options.push({ label: usuario.status === 'Ativo' ? 'Inativar' : 'Ativar', onClick: () => handleAlertOpen(usuario._id) })

        return options;
    }

    const columns = [
        {
            field: 'name',
            headerName: 'Nome',
        },
        {
            field: 'email',
            headerName: 'E-mail',
        },
        {
            field: 'level',
            headerName: 'Nível de permissão',
        },
        {
            field: 'status',
            headerName: 'Situação',
        },
        {
            field: 'createdAt',
            headerName: 'Data de criação',
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
                <Button variant="contained" className="btn-primary" onClick={openCreateModalusuarios}>Cadastrar usuario</Button>
            </div>
            <ModificarUsuario
                getUsuarios={getUsuarios}
                selectedUsuario={selectedUsuario}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                editMode={editMode}
            />
            <TableList
                columns={columns}
                rows={usuarios}
                loading={loading}
            />
            {alertOpen && (
                <AlertModal
                    open={alertOpen}
                    handleClose={handleAlertClose}
                    description={statusUsuarios === true ? 'Deseja realmente ativar este usuario?' : 'Deseja realmente inativar este usuario?'}
                    title={statusUsuarios === true ? 'Ativar usuario' : 'Inativar usuario'}
                    handle={() => deleteUsuario(selectedUsuario)}
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