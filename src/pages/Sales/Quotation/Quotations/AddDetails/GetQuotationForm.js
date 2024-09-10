import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import {
  Table,
  Row,
  Col,
  Form,
  FormLabel,
  FormCheck,
  Button,
} from "react-bootstrap";
function GetQuotationForm() {
  return (
    <div>
      <div className="col-md-5">
        <Form.Group controlId="CustName">
          <label className="form-label">Name</label>
          <label
            className="form-label"
            style={{
              color: "#f20707",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            *
          </label>
          <Typeahead
            id="basic-example"
            placeholder="Select Customer"
          />
        </Form.Group>
      </div>
    </div>
  );
}

export default GetQuotationForm;
