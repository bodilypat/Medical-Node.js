/* **************************************** */
/* File: #src/components/feedback/Toast.jsx */
/* **************************************** */

import React, { useEffect, useMemo, useState } from "react";

const TYPES = {
  success: {
    icon: "✓",
    color: "#1f9d61",
    bg: "#eafaf2",
    border: "#a9e3c2",
  },
  error: {
    icon: "!",
    color: "#d9485f",
    bg: "#fff0f2",
    border: "#f7bec7",
  },
  warning: {
    icon: "⚠",
    color: "#d98c2b",
    bg: "#fff8eb",
    border: "#f4d4a1",
  },
  info: {
    icon: "i",
    color: "#2d6cdf",
    bg: "#edf4ff",
    border: "#bfd5ff",
  },
};

const POSITION_STYLES = {
  "top-right": { top: 20, right: 20 },
  "top-left": { top: 20, left: 20 },
  "bottom-right": { bottom: 20, right: 20 },
  "bottom-left": { bottom: 20, left: 20 },
  center: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
};

export default function Toast({
  visible = true,
  title,
  message,
  type = "info",
  duration = 4000,
  position = "top-right",
  closable = true,
  actionLabel,
  onAction,
  onClose,
}) {
  const [isVisible, setIsVisible] = useState(visible);

  const toastType = TYPES[type] || TYPES.info;

  useEffect(() => {
    if (!visible) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);

    if (!duration || duration <= 0) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      if (typeof onClose === "function") onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [visible, duration, onClose]);

  const positionStyle = useMemo(
    () => ({
      position: "fixed",
      zIndex: 9999,
      display: isVisible ? "flex" : "none",
      alignItems: "flex-start",
      gap: 12,
      width: 340,
      maxWidth: "calc(100vw - 24px)",
      padding: "14px 16px",
      borderRadius: 12,
      border: `1px solid ${toastType.border}`,
      background: toastType.bg,
      boxShadow: "0 12px 30px rgba(15, 23, 42, 0.12)",
      ...POSITION_STYLES[position] || POSITION_STYLES["top-right"],
    }),
    [isVisible, position, toastType]
  );

  const handleClose = () => {
    setIsVisible(false);
    if (typeof onClose === "function") onClose();
  };

  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      style={positionStyle}
    >
      <div
        style={{
          width: 28,
          height: 28,
          minWidth: 28,
          borderRadius: "50%",
          background: toastType.color,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: 16,
          lineHeight: 1,
          marginTop: 2,
        }}
      >
        {toastType.icon}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        {title && (
          <div
            style={{
              color: "#0f172a",
              fontSize: 14,
              fontWeight: 700,
              marginBottom: message ? 4 : 0,
            }}
          >
            {title}
          </div>
        )}

        {message && (
          <div
            style={{
              color: "#334155",
              fontSize: 13,
              lineHeight: 1.5,
              wordBreak: "break-word",
            }}
          >
            {message}
          </div>
        )}

        {actionLabel && typeof onAction === "function" && (
          <button
            type="button"
            onClick={onAction}
            style={{
              marginTop: 10,
              border: "none",
              background: "transparent",
              padding: 0,
              color: toastType.color,
              fontWeight: 700,
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            {actionLabel}
          </button>
        )}
      </div>

      {closable && (
        <button
          type="button"
          aria-label="Close toast"
          onClick={handleClose}
          style={{
            border: "none",
            background: "transparent",
            color: "#475569",
            fontSize: 18,
            lineHeight: 1,
            cursor: "pointer",
            padding: 0,
            marginTop: 2,
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}

