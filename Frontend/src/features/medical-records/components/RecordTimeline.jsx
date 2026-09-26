/* ***************************************************************** */
/* File: #src/features/medical-records/components/RecordTimeline.jsx */ 
/* ***************************************************************** */

const RecordTimeline = ({
  events = [],
}) => {
  if (!events.length) {
    return (
      <div className="record-timeline__empty">
        No timeline events available.
      </div>
    );
  }

  return (
    <div className="record-timeline">
      {events.map((event, index) => (
        <article
          key={event.id || index}
          className="record-timeline__item"
        >
          <div className="record-timeline__marker" />

          <div className="record-timeline__content">
            <time>
              {event.date ||
                event.createdAt ||
                ""}
            </time>

            <h4>
              {event.title ||
                event.type ||
                "Medical Record Event"}
            </h4>

            {event.description && (
              <p>{event.description}</p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
};

export default RecordTimeline;
