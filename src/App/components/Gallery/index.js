import React from "react";
import "./style.css";
import { useHistory } from "react-router-dom";
import { Col, Image, Row, Card } from "antd";
import Img1 from "../../../assets/img/img1.jpg";
import Img2 from "../../../assets/img/img2.jpg";
import Img3 from "../../../assets/img/img3.jpg";
import Img4 from "../../../assets/img/img4.jpg";
import ActionBar from "../ActionBar";

const Gallery = () => {
  const { Meta } = Card;
  const history = useHistory();
  return (
    <section className="Gallery-container">
      <ActionBar
        actionButtonProp={{
          title: "Photo Gallery",
          arrActions: [
            {
              btnName: "Back ",
              btnAction: () => history.goBack(),
            },
          ],
        }}
      />
      <Row justify="space-between">
        <Col span={5}>
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={<Image src={Img3} width={240} />}
          >
            <Meta
              // title="Europe Street beat"
              description="Constructions of flood cntrol and stom water damage System at Yombo"
            />
          </Card>
        </Col>
        <Col span={5}>
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={<Image src={Img1} width={240} />}
          >
            <Meta
              // title="Europe Street beat"
              description="Constructions of flood cntrol and stom water damage System at Yombo"
            />
          </Card>
        </Col>
        <Col span={5}>
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={<Image src={Img2} width={240} />}
          >
            <Meta
              // title="Europe Street beat"
              description="Constructions of flood cntrol and stom water damage System at Yombo"
            />
          </Card>
        </Col>
        <Col span={5}>
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={<Image src={Img4} width={240} />}
          >
            <Meta
              // title="Europe Street beat"
              description="Constructions of flood cntrol and stom water damage System at Yombo"
            />
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default Gallery;
