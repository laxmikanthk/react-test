import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

  
  const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
      defaultZoom={5}
      defaultCenter={{lat: 30.4868, lng: -98.4359}}
    >
      {props.isMarkerShown && <Marker position={{ lat: props.lat, lng: props.lng }} />}
    </GoogleMap>
  ))

  class Drone extends React.Component {
    componentDidMount() {
        this.props.onLoad();
      }
    render() {
        const {
            //data,
            latitude,
            longitude,
            drone_data
          } = this.props;
      return (
        <MyMapComponent lat={latitude} lng={longitude} isMarkerShown={true} 
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `50%`, width: '50%' }} />}
        containerElement={<div style={{ height: `50%`, width: '50%' }} />}
        mapElement={<div style={{ height: `100%` }} />}/>
      );
    }
  }

  const mapState = (state, ownProps) => {
    const {
      latitude,
      longitude,
      drone_data
    } = state.weather;
    return {
      latitude,
      longitude,
      drone_data
    };
  };

  const mapDispatch = dispatch => ({
    onLoad: () =>
      dispatch({
        type: actions.WATCH_DRONE,
      })
  });

  export default connect(
    mapState,
    mapDispatch
  )(Drone);