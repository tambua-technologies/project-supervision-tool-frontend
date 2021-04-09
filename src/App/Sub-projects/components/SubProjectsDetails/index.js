import React, { Component } from "react";
import { Button, Col, Layout, Row, Spin, Tabs } from 'antd';
import SidebarSection from "./SideBar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { projectOperation, projectSelectors } from "../../../../redux/modules/projects";
import SubProjectContract from "./SubProjectContract";
import SubProjectEquipment from "./SubProjectEquipment";
import SubProjectsMilestone from "./SubProjectMilestone";
import SubProjectHumanResource from "./SubProjectHumanResource";
import BaseMap from "../../../Map/BaseMap";
import SubProjectLocations from "../../../Map/components/SubProjectLocations";
import { mapActions, mapSelectors } from "../../../../redux/modules/map";
import ImageList from "./ImageGallary";
import ImagesGallery from "./ImageGallary/imageGallaries";
import FullscreenControl from 'react-leaflet-fullscreen';
import "./styles.css";

const { Content, Sider } = Layout;
const { TabPane } = Tabs;

class SubProject extends Component {

  state = {
    showImage: false,
    selectedImage: {},
    showColumn: false,
    showMilestone: false,
    showHumanResource: false,
    showEquipment: false,
    showContract: false

  }
  componentDidMount() {
    const { getSubProject, match: { params }
    } = this.props;
    getSubProject(params.id)
  }

  handleViewImage = (image) => {
    this.setState({ showImage: true, selectedImage: image })
  }

  handleViewClose = () => {
    this.setState({ showImage: false, selectedImage: {} })
  }

  handleClick = () => {
    this.setState({ showMilestone: true })
  }

  render() {
    const { sub_project, loading, mapLoading, getWfsLayerData } = this.props;
    const { showImage, selectedImage } = this.state;
    return (
      <Layout className="sub-project-layout">
        <Spin spinning={loading} tip="Loading..." >
          <Content style={{ padding: '0 50px' }}>
            <div className='top-nav'>
              <h3 id="sub_project_name">{sub_project?.name}</h3>
              {showImage ? <Button id="closeAlbum" onClick={this.handleViewClose}>Close Album</Button> : null}
            </div>
            {!showImage ? <Layout className="sub-project-inner-layout" >
              <Sider className="sider" width={350}>
                <div className="sidebar-header">
                  <h2 id="sider-title">Key Details</h2>
                  <Link
                    to={{
                      pathname: '/app/map/',
                    }}
                  >View on map
              </Link>
                </div>
                <SidebarSection sub_project={sub_project} />
              </Sider>
              <Content className="sub-project-contents">
                <Row>
                  <Col span={11} className="sub_project_map"  >
                    <h4 className='mapHeaderTitle'>Sub Project Location</h4>
                    <Spin spinning={mapLoading} tip="Loading data...">
                      <BaseMap ref={this.map} zoomControl={true}>
                        <FullscreenControl position="topright" />
                        <SubProjectLocations getWfsLayerData={getWfsLayerData} subProject={sub_project} />
                      </BaseMap>
                    </Spin>
                  </Col>
                  <Col span={13}  className='Sub-project-image' >
                  {<ImageList handleViewImage={this.handleViewImage} showImage={showImage} sub_project={sub_project} offset={1}/>}
                  </Col>
                  <Col span={24} style={{ marginTop: 26 }}>
                  <div className="card-container">
                    <Tabs type="card">
                      <TabPane tab="Milestone" key="1">
                      <SubProjectsMilestone sub_project={sub_project}/>
                      </TabPane>
                      <TabPane tab="Human Resources" key="2">
                      <SubProjectHumanResource sub_project={sub_project} />
                      </TabPane>
                      <TabPane tab="Equipment Mobilization" key="3">
                      < SubProjectEquipment sub_project={sub_project} />
                      </TabPane>
                    </Tabs>
                  </div>
                  </Col>
                </Row>
              </Content>
            </Layout> : <ImagesGallery sub_project={sub_project} selectedImage={selectedImage} />}

          </Content>
        </Spin>
      </Layout>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    sub_project: projectSelectors.getSubProjectSelector(state),
    loading: projectSelectors.getSubProjectLoadingSelector(state),
    mapLoading: mapSelectors.getMapLoadingSelector(state),

  };
};

const mapDispatchToProps = {
  getSubProject: projectOperation.getSubProjectStart,
  getWfsLayerData: mapActions.getWfsLayerDataStart,

};

export default connect(mapStateToProps, mapDispatchToProps)(SubProject);

