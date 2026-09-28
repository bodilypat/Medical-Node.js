/* ****************************************************************** */
/* File: #src/features/appointments/components/AppointmentFilters.jsx */ 
/* ****************************************************************** */

import {
  APPOINTMENT_STATUS_OPTIONS,
} from "../constants/appointmentConstants";

const AppointmentFilters = ({
  filters,
  onChange,
  onReset,
}) => {
  const currentFilters = filters || {};

  const update = (field, value) => {
    onChange?.({
      ...currentFilters,
      [field]: value,
    });
  };

  return (
    <div className="appointment-filters">
      <div>
        <label htmlFor="appointment-search">
          Search
        </label>

        <input
          id="appointment-search"
          type="search"
          value={currentFilters.search || ""}
          onChange={(event) =>
            update("search", event.target.value)
          }
          placeholder="Search patient or doctor..."
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="appointment-status">
          Status
        </label>

        <select
          id="appointment-status"
          value={currentFilters.status || ""}
          onChange={(event) =>
            update("status", event.target.value)
          }
        >
          <option value="">All statuses</option>

          {APPOINTMENT_STATUS_OPTIONS.map(
            (option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            )
          )}
        </select>
      </div>

      <div>
        <label htmlFor="appointment-date-from">
          From
        </label>

        <input
          id="appointment-date-from"
          type="date"
          value={currentFilters.dateFrom || ""}
          max={currentFilters.dateTo || undefined}
          onChange={(event) =>
            update("dateFrom", event.target.value)
          }
        />
      </div>

      <div>
        <label htmlFor="appointment-date-to">
          To
        </label>

        <input
          id="appointment-date-to"
          type="date"
          value={currentFilters.dateTo || ""}
          min={currentFilters.dateFrom || undefined}
          onChange={(event) =>
            update("dateTo", event.target.value)
          }
        />
      </div>

      <button type="button" onClick={onReset} disabled={!onReset}>
        Reset
      </button>
    </div>
  );
};

export default AppointmentFilters;
