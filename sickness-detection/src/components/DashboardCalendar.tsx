import Layout from '@/components/layout'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import timeGridPlugin from '@fullcalendar/timegrid'

export default function DashboardCalendar({appointments}: {appointments: Array<any>}) {

  const updatedAppointments = appointments.map((appointment) => {
    const date = new Date(appointment.requestedAt)
    const AppointmentExample = { title: `${appointment.patient.name} ${appointment.patient.lastname}`, start: date, resourceId: appointment.state === "accepted" ? 'a' : (appointment.state === "finished" ? 'b' : 'c')}
    return (AppointmentExample)
  })


  return (
    <Layout>
      <div className='calendar-container overflow-x-auto'>
        <FullCalendar
          viewClassNames={`overflow-x-scroll`}
          plugins={[
            resourceTimelinePlugin,
            dayGridPlugin,
            interactionPlugin,
            timeGridPlugin
          ]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridDay,timeGridWeek,dayGridMonth'
          }}
          initialView='timeGridDay'
          nowIndicator={true}
          editable={true}
          selectable={true}
          selectMirror={true}
          resources={[
            { id: 'a', title: 'Appointment' },
            { id: 'b', title: 'Finished Appointment' },
            { id: 'c', title: 'Other' },
          ]}
          initialEvents={ updatedAppointments }
        />
      </div>
    </Layout>
  )
}