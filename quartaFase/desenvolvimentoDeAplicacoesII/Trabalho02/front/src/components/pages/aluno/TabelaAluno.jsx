import { Alert, Button, Snackbar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { host, http, port, students } from '../../../variavel';
import Container from '../../layout/container/Container';
import MenuAcoes from "../../layout/menuAcoes/MenuAcoes";
import AlertModal from "../../layout/modal/AlertModal";
import ModificarAluno from "../../layout/modal/aluno/ModificarAluno";
import TableList from "../../layout/tabela/Table";

export default function TabelaAluno() {
    const [alunos, setAlunos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState({ show: false, severity: '', message: '' });
    const [selectedAluno, setSelectedAluno] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [statusAluno, setStatusAluno] = useState(null);

    async function getAlunos() {
        try {
            const resp = await axios.get(`${http}://${host}:${port}${students}`)
            const editResp = resp.data.students.map((student) => ({
                ...student,
                status: student.status ? 'Ativo' : 'Inativo',
                createdAt: new Date(student.createdAt).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
            }))

            setAlunos(editResp)
        } catch {
            setAlert({ show: true, severity: 'error', message: 'Erro ao carregar alunos' })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAlunos();
    }, []);

    const handleClose = () => {
        setAlert({ ...alert, show: false });
    };

    const openEditModalAlunos = (aluno) => {
        setSelectedAluno(aluno);
        setEditMode(true);
        setIsEditModalOpen(true);
    };

    const openCreateModalAlunos = () => {
        setSelectedAluno(null);
        setEditMode(false);
        setIsEditModalOpen(true);
    };

    async function deleteAluno(id) {
        try {
            const alunoToChange = alunos.find((aluno) => aluno._id === id);
            const newStatus = alunoToChange.status === 'Ativo' ? false : true;

            await axios.put(`${http}://${host}:${port}${students}/${id}`, { status: newStatus });
            getAlunos();

            setAlert({
                show: true,
                severity: 'success',
                message: newStatus ? 'Aluno ativado com sucesso!' : 'Aluno inativado com sucesso!',
            });
        } catch (error) {
            console.error('Erro ao atualizar status do aluno:', error);
            setAlert({ show: true, severity: 'error', message: 'Erro ao atualizar status do aluno' });
        }
    }

    function handleAlertOpen(id) {
        const alunoToChange = alunos.find((aluno) => aluno._id === id);
        const newStatus = alunoToChange.status === 'Ativo' ? false : true;
        setStatusAluno(newStatus);
        setSelectedAluno(id);
        setAlertOpen(true);
    }

    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const opcoesMenu = (aluno) => {
        const options = []

        if (aluno.status !== false) {
            options.push({ label: 'Editar', onClick: () => openEditModalAlunos(aluno) })
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
            field: 'age',
            headerName: 'Idade',
        },
        {
            field: 'parents',
            headerName: 'Responsável',
        },
        {
            field: 'phone_number',
            headerName: 'Nomero de telefone',
        },
        {
            field: 'special_needs',
            headerName: 'Necessidades especiais',
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
                <Button variant="contained" className="btn-primary" onClick={openCreateModalAlunos}>Cadastrar Aluno</Button>
            </div>
            <ModificarAluno
                getAlunos={getAlunos}
                selectedAluno={selectedAluno}
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                editMode={editMode}
            />
            <TableList
                columns={columns}
                rows={alunos}
                loading={loading}
            />
            {alertOpen && (
                <AlertModal
                    open={alertOpen}
                    handleClose={handleAlertClose}
                    description={statusAluno === true ? 'Deseja realmente ativar este aluno?' : 'Deseja realmente inativar este aluno?'}
                    title={statusAluno === true ? 'Ativar aluno' : 'Inativar aluno'}
                    handle={deleteAluno}
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