import { Badge, Card, Icon, IconButton } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { classList } from "utils";

const SimpleCard = ({ children, title, subtitle, loading, back }) => {
  return (
    <Card
      elevation={3}
      className="px-6 py-5 h-full border-radius-4"
      style={{ minHeight: 500 }}
    >
      <div className="flex justify-between">
        <div>
          {loading ? (
            <Skeleton width={150} height={15} animation="wave" />
          ) : (
            <div
              className={classList({
                "card-title font-semibold": true,
                "mb-4": !subtitle,
              })}
            >
              {back && (
                <IconButton onClick={() => window.history.back()}>
                  <Badge color="secondary">
                    <Icon>arrow_back</Icon>
                  </Badge>
                </IconButton>
              )}
              {title}
            </div>
          )}
          {loading ? (
            <Skeleton width={120} height={10} animation="wave" />
          ) : (
            subtitle && <div className="card-subtitle mb-4">{subtitle}</div>
          )}
        </div>
      </div>
      {children}
    </Card>
  );
};

export default SimpleCard;
