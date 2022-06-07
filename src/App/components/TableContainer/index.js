import React from "react";
import get from "just-safe-get";
import "./style.css";
import { Avatar } from "antd";
import randomColor from "randomcolor";

const TableRow = (props) => {
  const { data, avatarBackground, keys } = props;

  const renderData = keys.map(({ key }) => {
    return <td class="table__content">{get(data, key)}</td>;
  });

  const renderAvatar = keys.map(({ key, avatar = false }) => {
    if (avatar)
      return (
        <td class="table__content">
          <Avatar style={{ backgroundColor: avatarBackground }} size="small">
            {data[key].charAt(0)?.toUpperCase()}
          </Avatar>
        </td>
      );

    return "";
  });

  return (
    <tr class="table__row">
      {renderAvatar}
      {renderData}
    </tr>
  );
};

const TableContainer = ({ titles, tableData }) => {
  const avatarBackground = randomColor();

  return (
    <table class="table">
      <tr>
        <th class="table__heading"></th>
        {titles.map((item) => (
          <th class="table__heading">{item.title}</th>
        ))}
      </tr>
      {tableData.map((item) => (
        <TableRow
          data={item}
          keys={titles}
          avatarBackground={avatarBackground}
        />
      ))}
    </table>
  );
};

export default TableContainer;
