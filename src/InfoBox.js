import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./InfoBox.css";

function InfoBox({
  title,
  cases,
  isRed,
  isBlue,
  isGray,
  active,
  total,
  ...props
}) {
  return (
    
      <Card
        onClick={() => props.onClick()}
        className={`infoBox ${active && "infoBox--selected"} ${
          isRed && "infoBox--red"
        } ${isGray && "infoBox--gray"} ${isBlue && "infoBox--blue"}`}
      >
        <CardContent>
          {/*Coronavirus cases Title  */}
          <Typography className="infoBox__title" color="textSecondary">
            {title}
          </Typography>

          {/* +2000 Number of cases  */}
          <h1
            className={`infoBox__cases ${
              !isRed && !isGray && "infoBox__cases--green"
            } ${isGray && "infoBox__cases--gray"} ${
              isBlue && "infoBox__cases--blue"
            }`}
          >
            {cases}
          </h1>

          {/* 1.2M Total  */}
          <Typography className="infoBox__total" color="textSecondary">
            {total} Total
          </Typography>
        </CardContent>
      </Card>
    
  );
}

export default InfoBox;
