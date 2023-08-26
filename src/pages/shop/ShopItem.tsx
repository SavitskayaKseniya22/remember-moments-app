import React from "react";
import styled from "styled-components";

export const StyledShopItem = styled("li")`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  max-width: 250px;

  img {
    border-radius: 0.5rem;
  }

  .content {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .title_small {
      margin: 0;
    }

    p {
      display: flex;
      color: #666666;
      justify-content: right;
      gap: 1rem;
      span {
        padding: 0.5rem;
        &.price_new {
          background-color: #ffe7db;
          color: #fa7436;
          border-radius: 0.5rem;
        }
        &.price_old {
          color: #666666;
          text-decoration: line-through;
        }
      }
    }
  }
`;

function ShopItem({
  title,
  price,
  oldPrice,
  image,
}: {
  title: string;
  price: string;
  oldPrice: string;
  image: string;
}) {
  return (
    <StyledShopItem>
      <img src={image} alt={title} width="250" height="250" />
      <div className="content">
        <h3 className="title_small">{title}</h3>
        <p>
          <span className="price_old">&#36;{oldPrice}</span>
          <span className="price_new">&#36;{price}</span>
        </p>
      </div>
    </StyledShopItem>
  );
}

export default ShopItem;
