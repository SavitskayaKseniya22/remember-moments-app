import React from "react";
import styled from "styled-components";
import { Star, Map } from "@styled-icons/boxicons-regular";

export const StyledPopularPlace = styled("li")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  border-radius: 0.5rem;

  .place__image_main {
    border-radius: 0.5rem;
  }

  .place__content {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .content__title {
      margin: 0;
    }

    .content__info {
      display: flex;
      color: #666666;
      justify-content: space-between;

      span {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }
  }
`;

export const StyledStar = styled(Star)<{ $score: string }>`
  color: ${(props) => {
    if (+props.$score >= 4) {
      return "#ffb60a";
    }
    if (+props.$score >= 3) {
      return "#4086F4";
    }
    return "#FA7436";
  }};
`;

function PopularPlace(place: {
  name: string;
  country: string;
  score: string;
  image: string;
}) {
  const { name, country, score, image } = place;
  return (
    <StyledPopularPlace>
      <img
        className="place__image_main"
        src={image}
        alt={name}
        width="250"
        height="250"
      />
      <div className="place__content">
        <h3 className="content__title">{name}</h3>
        <p className="content__info">
          <span>
            <Map title="Map" size="24" />
            {country}
          </span>
          <span>
            <StyledStar $score={score} title="Star" size="24" />
            {score}
          </span>
        </p>
      </div>
    </StyledPopularPlace>
  );
}

export default PopularPlace;
