import React from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Tooltip } from "react-tooltip";

// Extract action buttons to a separate component
const ActionButtons = ({ itemId, onShow, onEdit, onDelete }) => (
  <div className="flex gap-2 py-2">
    <div className="text-blue-900">
      <VisibilityOutlinedIcon
        data-tooltip-content="View"
        data-tooltip-id="myTooltip"
        fontSize="small"
        aria-hidden="false"
        onClick={() => onShow(itemId)}
      />
    </div>
    <div className="text-sm text-gray-500 bg-white cursor-pointer">
      <ModeEditOutlinedIcon
        data-tooltip-content="Edit"
        data-tooltip-id="myTooltip"
        fontSize="small"
        aria-hidden="false"
        onClick={() => onEdit(itemId)}
      />
    </div>
    <div className="text-red-500 cursor-pointer">
      <DeleteOutlineOutlinedIcon
        data-tooltip-content="delete"
        data-tooltip-id="myTooltip"
        fontSize="small"
        aria-hidden="false"
        onClick={() => onDelete(itemId)}
      />
    </div>
  </div>
);

// Extract cell rendering logic to a function
const renderCellContent = (column, item, onShow, onEdit, onDelete) => {
  if (column.key === "user") {
    return (
      <div className="flex items-center justify-start gap-3 flex-wrap">
        <img src={item.picture} alt="profile picture" className="object-cover w-11 h-11" />
        <span className="font-bold">{item.name}</span>
      </div>
    );
  } else if (column.key === "actions") {
    return <ActionButtons itemId={item.id} onShow={onShow} onEdit={onEdit} onDelete={onDelete} />;
  } else {
    return item[column.key];
  }
};

const ReusableTable = ({ columns, data, onDelete, onEdit, onShow }) => {
  const hasData = data.length > 0;

  return (
    <table className="w-full overflow-x-auto table mx-4 mt-3 bg-white table-fixed">
      <thead>
        <tr className="text-sm text-left bg-white shadow-sm font-Roboto text-zinc-500">
          {columns.map(column => (
            <th
              key={column.key}
              className={
                column.key === "actions"
                  ? "max-w-none overflow-visible text-clip whitespace-normal"
                  : "max-w-14 table-cell overflow-hidden text-ellipsis whitespace-nowrap"
              }
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {hasData ? (
          data.map(item => (
            <tr className="border-b font-Roboto" key={item.id}>
              {columns.map(column => (
                <td
                  className={column.key=== "actions"?"py-4 text-zinc-500 max-w-none table-cell overflow-visible text-clip whitespace-normal":"py-4 text-zinc-500 max-w-14 table-cell overflow-hidden text-ellipsis whitespace-nowrap"}
                  key={`${column.key}-${item.id}`}
                >
                  {renderCellContent(column, item, onShow, onEdit, onDelete)}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="10">
              <div className="flex flex-col items-center justify-center p-3">
                <img src="/images/noData.png" alt="No Data found" className="w-60 h-60" />
                <span className="font-Roboto">No Data Found</span>
              </div>
            </td>
          </tr>
        )}
      </tbody>
      <Tooltip id="myTooltip" />
    </table>
  );
};

export default ReusableTable;