import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import SlideShow from './SlideShow';
import HouseProfile from './HouseProfile';
import { abbreviateAddress, abbreviateMonth } from '../assets/utils';
import { months } from '../assets/constants';
import { HousePost } from '../assets/models/PostModels';

type PathProps = HousePost;

const HouseCard: React.FC<PathProps> = ({
  name,
  pricePerMonth,
  roomType,
  early,
  late,
  distance,
  location,
  photos,
  profilePhoto,
  stayPeriod,
  leaserName,
  leaserSchoolYear,
  leaserMajor,
  leaserIntro,
  leaserEmail,
  leaserPhone,
  other,
  facilities,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const SlideShowContent = photos.map((urls) => ({
    src: `https://houseit.s3.us-east-2.amazonaws.com/${urls}`,
    alt: `${leaserEmail} , ${location}}`,
  }));
  const [moveIn, setMoveIn] = useState<string>('');

  // abbreviate the move in date
  useEffect(() => {
    const [earlyInt, earlyMonth] = early.split(' ') as [string, months];
    const [lateInt, lateMonth] = late.split(' ') as [string, months];
    setMoveIn(
      `${earlyInt} ${abbreviateMonth(
        earlyMonth,
      )} - ${lateInt} ${abbreviateMonth(lateMonth)}`,
    );
  }, [early, late]);

  return (
    <>
      <HouseProfile
        slideShowItems={SlideShowContent}
        pricePerMonth={pricePerMonth}
        roomType={roomType}
        moveIn={moveIn}
        distance={distance}
        address={location}
        houseName={name}
        stayPeriod={stayPeriod}
        facilities={facilities}
        lookingFor={other}
        bioName={leaserName}
        bioYear={leaserSchoolYear}
        bioMajor={leaserMajor}
        email={leaserEmail}
        phone={leaserPhone}
        bioProfilePic={profilePhoto}
        bioDescription={leaserIntro}
        show={show}
        setShow={setShow}
      />

      <Card className="house-card">
        <Card.Body className="p-0">
          <Container>
            <Row className="house-pic">
              <SlideShow
                images={SlideShowContent}
                onImageClick={() => setShow(true)}
              />
            </Row>
            <Row className="px-2">
              <Col md={4} className="house-card-left house-card-price">
                <Row>${pricePerMonth}</Row>
              </Col>
              <Col md={8} className="house-card-right house-card-right-top">
                <Row>
                  <div className="w-100 text-right">
                    {roomType}
                    <span className="divider"> | </span>Move In {moveIn}
                  </div>
                </Row>
              </Col>
            </Row>
            <Row className="px-2">
              <Col md={4} className="house-card-left house-card-left-bottom">
                <Row>{distance}</Row>
              </Col>

              <Col md={8} className="house-card-right">
                <Row>
                  <div className="w-100 text-right">
                    {abbreviateAddress(location)}
                  </div>
                </Row>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
};

export default HouseCard;
