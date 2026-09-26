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
  const update = (field, value) => {
    onChange?.({
      ...filters,
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
          value={filters?.search || ""}
          onChange={(event) =>
            update("search", event.target.value)
          }
          placeholder="Search patient or doctor..."
        />
      </div>

      <div>
        <label htmlFor="appointment-status">
          Status
        </label>

        <select
          id="appointment-status"
          value={filters?.status || ""}
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
          value={filters?.dateFrom || ""}
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
          value={filters?.dateTo || ""}
          onChange={(event) =>
            update("dateTo", event.target.value)
          }
        />
      </div>

      <button type="button" onClick={onReset}>
        Reset
      </button>
    </div>
  );
};

export default AppointmentFilters;
