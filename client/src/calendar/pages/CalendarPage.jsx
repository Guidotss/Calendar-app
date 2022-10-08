import { useState } from 'react';
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Navbar,CalendarEventBox,CalendarModal,FabAddNew,FabDelete } from '../index';
import { localizer,getMessagesES } from '../../helpers';
import { useUiStore,useCalendarStore } from '../../hooks';


const eventStyleGetter = ( event, start, end, isSelected ) => {
  
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }
  
    return {
      style
    }
  
}


export const CalendarPage = () => {
  
  const { events,setActiveEvent } = useCalendarStore();

  const { openDateModal } = useUiStore()

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');
  
  const onDoubleClickEvent = ( event ) =>{
    openDateModal()
  }
  
  const selectEvent = ( event ) =>{
    setActiveEvent( event );
  }
  
  const onViewChangeEvent = ( event ) =>{
    localStorage.setItem('lastView',event);
    setLastView( event );
  }
  

  
  return (
    <>
      <Navbar />
      <Calendar
        culture='es'
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ 
          height: 'calc(100vh - 100px )',
          width:'calc(100vw - 10px', 
          backgroundColor: '#f3f3f3',
          padding: '20px',
          borderRadius: '10px',
          marginTop: '20px',
          marginBottom: '20px',
          boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)' }}

        messages={ getMessagesES() }
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox
        }}

        onDoubleClickEvent={ onDoubleClickEvent }
        onSelectEvent={ selectEvent }
        onView={ onViewChangeEvent }
      /> 
      <CalendarModal />
      <FabAddNew/>
      <FabDelete/>
    </>
  )
}