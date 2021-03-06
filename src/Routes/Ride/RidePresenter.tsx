import React from "react";
import { MutationFn } from "react-apollo";
import Button from "../../Components/Button";
import styled from "../../typed-components";
import { getRide, userProfile } from "../../types/api";
import Loader from "../../Components/Loader";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Helmet from "react-helmet";

const Container = styled.div`
  flex-direction: column;
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 15px
  margin-top: 30px;
  margin-bottom: 15px;
  &:first-child {
    margin-top: 0;
  }
`;

const Data = styled.span`
  color: ${props => props.theme.blueColor};
`;

const Img = styled.img`
  height: 50px;
  width: 50px;
  background-color: transparent;
  border-radius: 50%;
  margin-right: 20px;
  overflow: hidden;
`;

const Passenger = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Buttons = styled.div`
  margin: 30px 0px;
  width: 500px;
`;

const renderStatusButton = ({ ride, user, updateRideFn }) => {
  if (ride.driver && user && ride.driver.id === user.id) {
    if (ride.status === "ACCEPTED") {
      return (
        <ExtendedButton
          value="Picked Up"
          onClick={() => {
            updateRideFn({
              variables: { rideId: ride.id, status: "ONROUTE" }
            });
          }}
        />
      );
    } else if (ride.status === "ONROUTE") {
      return (
        <ExtendedButton
          value="Finished"
          onClick={() => {
            updateRideFn({
              variables: { rideId: ride.id, status: "FINISHED" }
            });
          }}
        />
      );
    }
  }
  return false;
};

const ExtendedButton = styled(Button)`
  margin-bottom: 30px;
`;

interface IProps {
  userData?: userProfile;
  userLoading: boolean;
  rideData?: getRide;
  rideLoading: boolean;
  updateRideFn: MutationFn;
}

const RidePresenter: React.SFC<IProps> = ({
  rideData: { GetRide: { ride = null } = {} } = {},
  userData: { GetMyProfile: { user = null } = {} } = {},
  userLoading,
  rideLoading,
  updateRideFn
}) => {
  if (userLoading || rideLoading) {
    return <Loader />;
  } else if (ride && user) {
    return (
      <React.Fragment>
        <Helmet>
          <title>Add Place | Puber</title>
        </Helmet>
        <Header title={"Ride"} backTo={"/"} />
        <Container>
          {ride && user && (
            <React.Fragment>
              <Title>Passenger</Title>
              <Passenger>
                {ride.passenger && <Img src={ride.passenger.profilePhoto!} />}
                {ride.passenger && <Data>{ride.passenger.fullName!}</Data>}
              </Passenger>
              {ride.driver && (
                <React.Fragment>
                  <Title>Driver</Title>
                  <Passenger>
                    {ride.driver && <Img src={ride.driver.profilePhoto!} />}
                    {ride.driver && <Data>{ride.driver.fullName!}</Data>}
                  </Passenger>
                </React.Fragment>
              )}
              <Title>From</Title>
              <Data>{ride.pickUpAddress}</Data>
              <Title>To</Title>
              <Data>{ride.dropOffAddress}</Data>
              <Title>Price</Title>
              <Data>{ride.price}</Data>
              <Title>Distance</Title>
              <Data>{ride.distance}</Data>
              <Title>Duration</Title>
              <Data>{ride.duration}</Data>
              <Title>Status</Title>
              <Data>{ride.status}</Data>

              <Buttons>
                {renderStatusButton({ user, ride, updateRideFn })}
                {ride.status !== "REQUESTING" && (
                  <Link to={`/chat/${ride.chatId}`}>
                    <ExtendedButton value={"Chat"} onClick={null} />
                  </Link>
                )}
              </Buttons>
            </React.Fragment>
          )}
        </Container>
      </React.Fragment>
    );
  } else {
    return null;
  }
};

export default RidePresenter;
