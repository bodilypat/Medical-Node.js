/* ***************************************************************** */
/* File: #src/features/medical-records/components/RecordTimeline.jsx */ 
/* ***************************************************************** */

const RecordTimeline = ({
  events = [],
}) => {
  const timelineEvents = Array.isArray(events)
    ? events.filter(Boolean)
    : [];

  if (!timelineEvents.length) {
    return (
      <div className="record-timeline__empty">
        No timeline events available.
      </div>
    );
  }

  return (
    <ol className="record-timeline" aria-label="Medical record timeline">
      {timelineEvents.map((event, index) => {
        const rawDate = event.date || event.createdAt;
        const parsedDate = rawDate ? new Date(rawDate) : null;
        const hasValidDate = parsedDate && !Number.isNaN(parsedDate.getTime());
        const dateLabel = hasValidDate
          ? parsedDate.toLocaleString()
          : rawDate || "Date unavailable";

        return (
        <article
          key={event.id || index}
          className="record-timeline__item"
          aria-label={event.title || event.type || "Medical Record Event"}
        >
          <div className="record-timeline__marker" />

          <div className="record-timeline__content">
            <time dateTime={hasValidDate ? parsedDate.toISOString() : undefined}>
              {dateLabel}
            </time>

            <h4>
              {event.title || event.type || "Medical Record Event"}
            </h4>

            {event.description && (
              <p>{event.description}</p>
            )}
          </div>
        </article>
        );
      })}
    </ol>
  );
};

export default RecordTimeline;
