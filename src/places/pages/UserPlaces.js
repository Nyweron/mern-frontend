import React from "react";
import { useParams } from 'react-router-dom';


import PlaceList from '../components/PlaceList';
import { dummy_places } from "./dummyPlaces";



const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = dummy_places.filter(place=> place.creator === userId);

  return <PlaceList items={loadedPlaces}/>;
};

export default UserPlaces;
