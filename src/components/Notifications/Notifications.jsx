import React, { useState } from "react";
import { Toast, Alert, Button } from "react-bootstrap";

const Notifications = ({
  heading,
  body,
  type,
  small,
  variant,
  confirmButtonText,
  handleConfirm,
  style,
}) => {
  const [show, setShow] = useState(true);

  return (
    show &&
    (type === "alert" ? (
      <Alert
        variant={variant}
        onClose={() => setShow(false)}
        style={style}
        dismissible
      >
        <Alert.Heading>{heading}</Alert.Heading>
        <p>{body}</p>
        {confirmButtonText && (
          <Button variant="outline-danger" onClick={handleConfirm}>
            {confirmButtonText}{" "}
          </Button>
        )}
      </Alert>
    ) : (
      type === "toast" && (
        <Toast onClose={() => setShow(false)} style={style}>
          <Toast.Header>
            <strong className="mr-auto">{heading.toUpperCase()}</strong>
            <small>{small}</small>
          </Toast.Header>
          <Toast.Body>{body}</Toast.Body>
        </Toast>
      )
    ))
  );
};

export default Notifications;
