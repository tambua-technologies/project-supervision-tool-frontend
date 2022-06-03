import React, { useState, useEffect } from "react";
import "./style.css";
import { Avatar } from "antd";
import randomColor from "randomcolor";
const TableContainer = ({ titles, tableData }) => {
  const avatarBackground = randomColor();
  const [titless, setTitles] = useState([]);
  const [tableDatas, setTableDatas] = useState([]);
  useEffect(() => {
    setTitles(titles);
    setTableDatas(tableData);
  }, [titless, tableDatas]);

  return (
    <table class="table">
      <tr>
        <th class="table__heading"></th>
        {titless.map((item) => (
          <th class="table__heading">{item.title}</th>
        ))}
      </tr>
      {tableDatas.map((item) => (
        <tr class="table__row">
          <td class="table__content" data-heading="Sub-Project">
            <Avatar style={{ backgroundColor: avatarBackground }} size="small">
              {item.title?.charAt(0)?.toUpperCase() || "B"}
            </Avatar>
          </td>
          <td class="table__content" data-heading="Sub-Project">
            {item.Sub_name}
          </td>
          <td class="table__content" data-heading="Progress of Works">
            {item.progress}
          </td>
          <td class="table__content" data-heading="Remarks">
            {item.remark}
          </td>
          <td class="table__content" data-heading="Challenges">
            {item.Challenge}
          </td>
        </tr>
      ))}
    </table>
  );
};

export default TableContainer;
