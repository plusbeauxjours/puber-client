import React from "react";
import FindAddressPresenter from "./FindAddressPresenter";
import ReactDOM from "react-dom";

interface IState {
  lat: number;
  lng: number;
  address: string;
}

class FindAddressContainer extends React.Component<any, IState> {
  public mapRef: any;
  public map: google.maps.Map;
  public state = {
    address: "",
    lat: 0,
    lng: 0
  };
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }
  public componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSucces,
      this.handleGeoError
    );
  }
  public render() {
    const { address } = this.state;
    return (
      <FindAddressPresenter
        mapRef={this.mapRef}
        address={address}
        onInputChange={this.onInputChange}
        onInputBlur={this.onInputBlur}
      />
    );
  }
  public handleGeoSucces = (position: Position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    console.log(position);
    this.loadMap(latitude, longitude);
    this.setState({
      lat: latitude,
      lng: longitude
    });
  };
  public handleGeoError = () => {
    console.log("No location");
  };
  public loadMap = (lat, lng) => {
    const { google } = this.props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig: google.maps.MapOptions = {
      center: {
        lat,
        lng
      },
      disableDefaultUI: true,
      zoom: 16
    };
    this.map = new maps.Map(mapNode, mapConfig);
    this.map.addListener("draeged", this.handleDragEnd);
  };
  public handleDragEnd = () => {
    const newCenter = this.map.getCenter();
    const lat = newCenter.lat();
    const lng = newCenter.lng();
    this.setState({
      lat,
      lng
    });
  };
  public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
  public onInputBlur = () => {
    console.log("Address updated");
  };
}

export default FindAddressContainer;
