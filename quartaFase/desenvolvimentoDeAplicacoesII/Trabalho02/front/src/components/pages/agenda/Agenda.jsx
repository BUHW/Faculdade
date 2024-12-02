import moment from 'moment';
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Container from '../../layout/container/Container';
import CadAgenda from '../../layout/modal/agenda/CadAgenda';

const localizer = momentLocalizer(moment);

export default function Agenda() {
    const [events, setEvents] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = (title) => {
        if (title && selectedSlot) {
            const { start, end } = selectedSlot;
            setEvents((prevEvents) => [
                ...prevEvents,
                { start, end, title, id: new Date().getTime() }
            ]);
        }
    };

    const handleSelectSlot = ({ start, end }) => {
        setSelectedSlot({ start, end });
        handleClickOpen();
    };

    const handleSelectEvent = (event) => {
        if (window.confirm(`Deseja excluir o evento "${event.title}"?`)) {
            setEvents((prevEvents) => prevEvents.filter((e) => e.id !== event.id));
        }
    };

    return (
        <div>
            <Container>
                <Calendar
                    localizer={localizer}
                    events={events}
                    selectable
                    defaultView="month"
                    views={['month', 'week', 'day']}
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectEvent}
                    style={{ height: 600 }}
                />
            </Container>
            <CadAgenda open={open} handleClose={handleClose} handleSave={handleSave} />
        </div>
    );
}