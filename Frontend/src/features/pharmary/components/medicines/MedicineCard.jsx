/* **************************************************************** */
/* File: src/features/pharmacy/components/medicine/MedicineCard.jsx */
/* **************************************************************** */

import PropTypes from "prop-types";

const MedicineCard = ({
    medicine,
    status,
    onClick,
    onEdit,
    onDispense,
}) => {
    if (!medicine) {
        return null;
    }

    const {
        name,
        generic_name,
        category,
        dosage_form,
        strength,
        manufacturer,
        batch_number,
        stock_quantity,
        minimum_stock,
        expiry_date,
        unit_price,
    } = medicine;

    const isOutOfStock = stock_quantity === 0;
    const isLowStock =
        stock_quantity > 0 &&
        stock_quantity <= minimum_stock;
    const expiryTimestamp = expiry_date
        ? new Date(expiry_date).getTime()
        : NaN;
    const isExpired = Number.isFinite(expiryTimestamp) &&
        expiryTimestamp < Date.now();
    const isExpiringSoon = Number.isFinite(expiryTimestamp) &&
        !isExpired &&
        expiryTimestamp <= Date.now() + 30 * 24 * 60 * 60 * 1000;
    const isDispenseDisabled = isOutOfStock || isExpired;

    const expiryLabel = isExpired
        ? "Expired"
        : isExpiringSoon
        ? "Expiring soon"
        : expiry_date || "-";

    return (
        <article
            className="medicine-card"
            role="button"
            tabIndex={0}
            aria-label={`View details for ${name}`}
            onClick={() => onClick?.(medicine)}
            onKeyDown={(event) => {
                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {
                    event.preventDefault();
                    onClick?.(medicine);
                }
            }}
        >
            {/* Header */}
            <header className="medicine-card__header">
                <div>
                    <h3 className="medicine-card__title">
                        {name}
                    </h3>

                    {generic_name && (
                        <p className="medicine-card__generic">
                            {generic_name}
                        </p>
                    )}
                </div>

                {status}
            </header>

            {/* Details */}
            <section className="medicine-card__body">

                <div className="medicine-card__row">
                    <span>Category</span>
                    <strong>{category || "-"}</strong>
                </div>

                <div className="medicine-card__row">
                    <span>Dosage</span>
                    <strong>
                        {[dosage_form, strength]
                            .filter(Boolean)
                            .join(" ")}
                    </strong>
                </div>

                <div className="medicine-card__row">
                    <span>Manufacturer</span>
                    <strong>{manufacturer || "-"}</strong>
                </div>

                <div className="medicine-card__row">
                    <span>Batch</span>
                    <strong>{batch_number || "-"}</strong>
                </div>

                <div className="medicine-card__row">
                    <span>Stock</span>

                    <strong
                        className={
                            isOutOfStock
                                ? "text-danger"
                                : isLowStock
                                ? "text-warning"
                                : "text-success"
                        }
                    >
                        {stock_quantity ?? 0}
                    </strong>
                </div>

                <div className="medicine-card__row">
                    <span>Minimum Stock</span>
                    <strong>{minimum_stock}</strong>
                </div>

                <div className="medicine-card__row">
                    <span>Expiry</span>
                    <strong
                        className={
                            isExpired
                                ? "text-danger"
                                : isExpiringSoon
                                ? "text-warning"
                                : undefined
                        }
                        title={isExpired || isExpiringSoon ? expiryLabel : undefined}
                    >
                        {expiryLabel}
                    </strong>
                </div>

                <div className="medicine-card__row">
                    <span>Unit Price</span>
                    <strong>
                        {unit_price != null
                            ? new Intl.NumberFormat(
                                  "en-US",
                                  {
                                      style: "currency",
                                      currency: "USD",
                                  }
                              ).format(unit_price)
                            : "-"}
                    </strong>
                </div>

            </section>

            {/* Footer */}
            <footer className="medicine-card__footer">

                <button
                    type="button"
                    className="btn btn-outline-primary"
                    aria-label={`Edit ${name}`}
                    onClick={(event) => {
                        event.stopPropagation();
                        onEdit?.(medicine);
                    }}
                >
                    Edit
                </button>

                <button
                    type="button"
                    className="btn btn-primary"
                    disabled={isDispenseDisabled}
                    title={
                        isOutOfStock
                            ? "This medicine is out of stock"
                            : isExpired
                            ? "Expired medicines cannot be dispensed"
                            : undefined
                    }
                    aria-label={`Dispense ${name}`}
                    onClick={(event) => {
                        event.stopPropagation();
                        onDispense?.(medicine);
                    }}
                >
                    Dispense
                </button>

            </footer>

        </article>
    );
};

MedicineCard.propTypes = {
    medicine: PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]).isRequired,
        name: PropTypes.string.isRequired,
        generic_name: PropTypes.string,
        category: PropTypes.string,
        dosage_form: PropTypes.string,
        strength: PropTypes.string,
        manufacturer: PropTypes.string,
        batch_number: PropTypes.string,
        stock_quantity: PropTypes.number.isRequired,
        minimum_stock: PropTypes.number.isRequired,
        expiry_date: PropTypes.string,
        unit_price: PropTypes.number,
    }).isRequired,

    status: PropTypes.node,

    onClick: PropTypes.func,
    onEdit: PropTypes.func,
    onDispense: PropTypes.func,
};

export default MedicineCard;