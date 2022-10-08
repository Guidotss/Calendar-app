export const CalendarEventBox = ({ event }) => {
    const { title,user } = event;

  return (
    <>
        <strong>{ title }</strong>
        <strong> - { user.name }</strong>
    </>
  )
}