import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { events, host, http, port } from '../../../variavel';
import Container from '../../layout/container/Container';
import CadAgenda from '../../layout/modal/agenda/CadAgenda';
import './Agenda.css';

moment.locale('pt-br');
const localizer = momentLocalizer(moment);

const messages = {
    allDay: 'Dia inteiro',
    previous: 'Anterior',
    next: 'Próximo',
    today: 'Hoje',
    month: 'Mês',
    week: 'Semana',
    day: 'Dia',
    agenda: 'Agenda',
    date: 'Data',
    time: 'Hora',
    event: 'Evento',
    noeventInRange: 'Não há eventos neste intervalo.',
    showMore: total => `+ Ver mais (${total})`
};

export default function Agenda() {
    const [event, setEvent] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);

    async function getEvent() {
        try {
            const resp = await axios.get(`${http}://${host}:${port}${events}`);
            setEvent(resp.data.content);
            console.log(resp.data.content);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getEvent();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async (title) => {
        if (title && selectedSlot) {
            const { start, end } = selectedSlot;
            const newEvent = {
                start: moment(start).format(),
                end: moment(end).format(),
                title,
                id: new Date().getTime()
            };

            try {
                await axios.post(`${http}://${host}:${port}${events}`, newEvent);
                setEvent((prevEvent) => [...prevEvent, newEvent]);
                handleClose();
            } catch (error) {
                console.log(error);
                alert('Erro ao salvar o evento');
            }
        }
    };

    const handleSelectSlot = ({ start, end }) => {
        setSelectedSlot({ start, end });
        handleClickOpen();
    };

    const handleSelectEvent = (event) => {
        if (window.confirm(`Deseja excluir o evento "${event.title}"?`)) {
            setEvent((prevEvent) => prevEvent.filter((e) => e.id !== event.id));
        }
    };

    return (
        <div>
            <Container>
                <Calendar
                    localizer={localizer}
                    events={event.map((e) => ({
                        ...e,
                        start: new Date(e.start),
                        end: new Date(e.end)
                    }))}
                    selectable
                    defaultView="month"
                    views={['month', 'week', 'day']}
                    messages={messages}
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectEvent}
                    style={{ height: 600 }}
                />
            </Container>
            <CadAgenda open={open} handleClose={handleClose} getEvent={getEvent} />
        </div>
    );
}
