import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { JourneyTypes } from "../../../store/auth/authSlice";

function checkStatus(dateFrom: Date, dateTo: Date) {
  const now = new Date();
  if (dateTo < now) {
    return "Finished";
  }
  if (now > dateFrom && now < dateTo) {
    return "The trip continues";
  }
  return "Journey planned";
}

const StyledJourneyPreview = styled("li")``;

function JourneyPreview({ data }: { data: JourneyTypes }) {
  const { place, date_to: dateTo, date_from: dateFrom } = data;

  return (
    <StyledJourneyPreview>
      <h4>{place}</h4>
      <h5>{checkStatus(new Date(dateFrom), new Date(dateTo))}</h5>
      <p>
        {new Date(dateFrom).toLocaleDateString()} -{" "}
        {new Date(dateTo).toLocaleDateString()}
      </p>
      <div>{data.notes}</div>
      <NavLink to="/board/trip">See more details</NavLink>
    </StyledJourneyPreview>
  );
}

export default JourneyPreview;
