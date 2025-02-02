import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Button, Card } from "@mui/material";

export const Address = ({ item, showButton, handleSelectAddress }) => {
  return (
    <Card className="flex gap-5 w-64 p-5 border border-gray-200 shadow-md">
      <HomeIcon />
      <div className="space-y-3 text-gray-600">
        <h1 className="font-semibold text-lg">{item.fullName}</h1>
        <p>
          {item.street}, {item.city}, {item.province}, {item.pincode}
        </p>
        {showButton && (
          <Button
            variant="outlined"
            fullWidth
            onClick={() => handleSelectAddress(item)}
          >
            Chọn Địa Chỉ
          </Button>
        )}
      </div>
    </Card>
  );
};
