import React, { Children, useState } from 'react'
import {  Drawer, Button } from "antd";
import UsersForm from '../../Users/usersForm';
const UserDrawer = () => {
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
      setVisible(true);
    };
    const onClose = ({}) => {
      setVisible(false);
    };
  return (
   <>
   <Button onClick={showDrawer}>Open</Button>
    <Drawer
          title="Add New Role"
          placement="right"
          onClose={onClose}
          visible={visible}
          width={500}
        >
           {Children }
        </Drawer>
   </>
  )
}

export default UserDrawer