import React, { useEffect, useState } from "react";

import { Col } from "antd";
import CustomList from "../components/List";
import ListItem from "../components/ListItem";
import ListItemActions from "../components/ListItemActions";
import { Link } from "react-router-dom";
import "./styles.css";
import API from "../../API";
import { UPLOAD_SUBPROJECTS_ENDPOINT, GET_SUBPROJECTS_ENDPOINT } from '../../API/endpoints'

/* constants */
const subProjectNameSpan = { xxl: 4, xl: 4, lg: 4, md: 4, sm: 20, xs: 20 };
const packageSpan = { xxl: 4, xl: 4, lg: 4, md: 4, sm: 0, xs: 0 };
const statusSpan = { xxl: 6, xl: 6, lg: 6, md: 6, sm: 0, xs: 0 };
const contractor ={ xxl: 6, xl: 6, lg: 6, md: 6, sm: 0, xs: 0 };

const headerLayout = [
  { ...subProjectNameSpan, header: "Name" },
  { ...packageSpan, header: "Package" },
  { ...statusSpan, header: "Status" },
  { ...contractor, header: "Contractor" },
];

/**
 * @function
 * @name SubProjects
 * @description Render actions list which have search box, actions and Sub Projects list
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const SubProjects = (props) => {
  const { match, history } = props;
  const [subProjects, setSubProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubProjectsImport  = (e) => {
    setIsLoading(true);
    const file = e.target.files[0];
    API.upload(UPLOAD_SUBPROJECTS_ENDPOINT, file)
    .then(() => getSubProjects());
  }

  /**
   * @function
   * @name handleViewDetails
   * @description Handle detail preview
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  const handleViewDetails = (item_id) => {
    
    let path = `${match.url}/${item_id}`;
    history.push(path);
  };

  const getSubProjects = () => {
    setIsLoading(true);
    API.get(GET_SUBPROJECTS_ENDPOINT)
  .then(res => {
    setSubProjects(res.data);
    setIsLoading(false)
  })
  }

  useEffect(() => {
    getSubProjects();

  }, []);

    return (
      <>
          <CustomList
            itemName="Sub-projects"
            items={subProjects}
            page={1}
            itemCount={subProjects.length}
            loading={isLoading}
            actionButtonProp={{ title: "Sub-project", arrActions: [
              {
                btnName: "Import SubProjects",
                btnType: "upload",
                btnAction: handleOnSubProjectsImport,
              }
            ] }}
            onRefresh={getSubProjects}
            headerLayout={headerLayout}
            renderListItem={({ item }) => (
              <ListItem
                key={item.id} // eslint-disable-line
                name={item.name}
                item={item}
                renderActions={() => (
                  <ListItemActions
                    view={{
                      name: "View Details",
                      title: "View more detail of selected sub project",
                      onClick: () => handleViewDetails(item.id),
                    }}
                  />
                )}
              >
                {/* eslint-disable react/jsx-props-no-spreading */}

                <Col
                  {...subProjectNameSpan}
                  className="contentEllipse"
                  title={item.name}
                >
                  {" "}
                  <Link
                    onClick={() => handleViewDetails(item.id)}
                    className="sub-project-list"
                  >
                    {item.name}
                  </Link>
                </Col>

                <Col {...packageSpan} className="contentEllipse">
                  {item?.procuring_entity_package?.name || "N/A" }
                </Col>
                <Col {...statusSpan}>
                  { item?.status?.name || "N/A" }
                </Col>
                <Col {...contractor}>{ item?.procuring_entity_package?.contract?.contractor?.name || "N/A" }</Col>
              </ListItem>
            )}
          />
      </>
    );
  
}





export default SubProjects;
