import moment from 'moment';
import 'moment/locale/pt-br';
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Container from '../../layout/container/Container';

// Configuração do localizador do calendário
const localizer = momentLocalizer(moment);

// Traduções para o calendário
const messages = {
    allDay: 'Dia todo',
    previous: 'Voltar',
    next: 'Próximo',
    today: 'Hoje',
    month: 'Mês',
    week: 'Semana',
    day: 'Dia',
    agenda: 'Agenda',
    date: 'Data',
    time: 'Hora',
    event: 'Evento',
    noEventsInRange: 'Não há eventos neste intervalo.',
    showMore: total => `+ Ver mais (${total})`
};

export default function Agenda() {
    const [events, setEvents] = useState([]); // Estado local para armazenar eventos

    // Adicionar um evento ao selecionar um intervalo
    const handleSelectSlot = ({ start, end }) => {
        const title = window.prompt('Digite o título do evento:');
        if (title) {
            setEvents((prevEvents) => [
                ...prevEvents,
                { start, end, title, id: new Date().getTime() }
            ]);
        }
    };

    // Remover um evento ao clicar
    const handleSelectEvent = (event) => {
        if (window.confirm(`Deseja excluir o evento "${event.title}"?`)) {
            setEvents((prevEvents) => prevEvents.filter((e) => e.id !== event.id));
        }
    };

    return (
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
                messages={messages}
            />
        </Container>
    );
}