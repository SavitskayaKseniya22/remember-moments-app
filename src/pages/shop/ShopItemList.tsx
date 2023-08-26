import React from "react";
import { StyledListOfItems } from "../../styledComponents/SharedStyles";
import ShopItem from "./ShopItem";
import backPackImage from "../../assets/images/8fb264e1628282d8e3ddb50ba26bf962.jpg";
import luggageImage from "../../assets/images/9a324fef83f5269e1f910d4e1d8f0fd0.jpg";
import earBuddsImage from "../../assets/images/1c42e79d36225cc8bd72e97e72f1c975.jpg";
import chargeImage from "../../assets/images/6a2718bd05e0e0c0e37bcd3314ddd842.jpg";

function ShopItemList() {
  return (
    <StyledListOfItems>
      <ShopItem
        title="Backpack Xiaomi"
        price="320"
        oldPrice="400"
        image={backPackImage}
      />
      <ShopItem
        title="Ninetygo Lightweight Luggage 20''"
        price="1135"
        oldPrice="1200"
        image={luggageImage}
      />
      <ShopItem
        title="Наушники 1MORE 1MORE Piston Fit In-Ear"
        price="120"
        oldPrice="125"
        image={earBuddsImage}
      />
      <ShopItem
        title="Зарядное устройство EnergEA Ampcharge USB QC3.0 20W"
        price="230"
        oldPrice="245"
        image={chargeImage}
      />
    </StyledListOfItems>
  );
}

export default ShopItemList;
