import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

function InfoBox({ title, cases, total }) {
  return (
    <div>
      <Card className="infoBox">
        <CardContent>
          {/*Coronavirus cases Title  */}
          <Typography className="infoBox__title" color="textSecondary">
            {title}
          </Typography>

          {/* +2000 Number of cases  */}
          <h1 className="infoBox__cases">{cases}</h1>

          {/* 1.2M Total  */}
          <Typography className="infoBox__total" color="textSecondary">
            {total}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default InfoBox;
