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
    const [editMode, setEditMode] = useState(false);

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
        setEditMode(false);
        setSelectedSlot(null);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelectSlot = ({ start, end }) => {
        const startUtc = moment(start).utc().toDate();
        const endUtc = moment(end).utc().toDate();

        setSelectedSlot({ start: startUtc, end: endUtc });
        handleClickOpen();
    };

    const handleSelectEvent = (selectedEvent) => {
        setSelectedSlot({
            id: selectedEvent.id,
            title: selectedEvent.title,
            description: selectedEvent.description,
            date: moment(selectedEvent.start).format('YYYY-MM-DD'),
            start: moment(selectedEvent.start).format('HH:mm'),
            end: moment(selectedEvent.end).format('HH:mm'),
            location: selectedEvent.location,
            participantes: selectedEvent.participantes,
        });

        setEditMode(true);
        setOpen(true);
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
            <CadAgenda
                open={open}
                handleClose={handleClose}
                getEvent={getEvent}
                selectedSlot={selectedSlot}
                editMode={editMode}
            />
        </div>
    );
}
