import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import JourneyPreview from "./JourneyPreview";
import { RootState } from "../../../store/store";

const StyledJourneyPreviewList = styled("ul")``;

function JourneyPreviewList() {
  const { userData } = useSelector((state: RootState) => state.persist.user);
  return (
    <StyledJourneyPreviewList>
      {[...userData].map((item) => {
        return <JourneyPreview data={item} key={item.id} />;
      })}
    </StyledJourneyPreviewList>
  );
}

export default JourneyPreviewList;
