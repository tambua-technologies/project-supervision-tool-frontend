import React, { useState } from 'react';
import { Tree } from 'antd';

const MultlevelFilter = ({ items, handleFilter }) => {

  const [checkedKeys, setCheckedKeys] = useState('');
  const [selectedKeys, setSelectedKeys] = useState([]);

  const data = items.map(({ title, id, children }) => {
    return (
      {
        'title': title,
        "key": `${id}-0`,
        'children': children.map(({ name, id, }) => ({ 'title': name, 'key': `${id}` }))
      }
    )
  })

  const onCheck = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue);
    handleFilter(checkedKeysValue.map(id => id).toString())
  };

  const onSelect = (selectedKeysValue, info) => {
    setSelectedKeys(selectedKeysValue);
  };



  return (
    data.length > 0 ? <Tree treeData={data} checkable onCheck={onCheck}
      checkedKeys={checkedKeys}
      onSelect={onSelect}
      selectedKeys={selectedKeys} />
      : <h4>No data Available</h4>
  );
};

export default MultlevelFilter