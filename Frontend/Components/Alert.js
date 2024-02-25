import React from "react";

const Alert = ({ alert }) => {
  const capitalize = (string) => {
    if (string && typeof string === "string") {
      return string.charAt(0).toUpperCase() + string.substring(1);
    }
    return "";
  };

  return (
    <>
      {alert && (
        <div className="container mt-4">
          <div
            className={`alert`}
            // style={{
            //   borderColor: "black",
            //   backgroundColor: alert.type === "warning" ? "red" : "inherit",
            // }}
            role="alert"
          >
            <b className="mx-1">{capitalize(alert.type)}</b>:
            <b className="mx-1">{capitalize(alert.message)}</b>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
