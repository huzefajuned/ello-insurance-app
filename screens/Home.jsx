import React from "react";
import { View, StyleSheet } from "react-native";
import InsuranceServices from "../components/InsuranceServices";
import Header from "../components/Header";
import car from "../assets/images/car/car.jpg";
import bike from "../assets/images/bike/bike.png";
import health from "../assets/images/health/health.png";
import home from "../assets/images/home/house.png";
import life from "../assets/images/life/ecology.png";
import pension from "../assets/images/pension/pension.png";
import property from "../assets/images/property/building.png";
import rent from "../assets/images/rent/rent.png";
import travel from "../assets/images/travel/airplane.png";

const Home = () => {
  const InsuranceServicesData = [
    {
      key: 1,
      name: "Car",
      image: car,
    },
    {
      key: 2,
      name: "Life",
      image: life,
    },
    {
      key: 3,
      name: "Health",
      image: health,
    },
    {
      key: 4,
      name: "Travel",
      image: travel,
    },
    {
      key: 5,
      name: "Rental",
      image: rent,
    },
    {
      key: 6,
      name: "Bike",
      image: bike,
    },
    {
      key: 7,
      name: "Property",
      image: property,
    },
    {
      key: 8,
      name: "Home",
      image: home,
    },
    {
      key: 9,
      name: "Pension",
      image: pension,
    },
  ];

  return (
    <View style={styles.container}>
      <Header />
      <InsuranceServices InsuranceServicesData={InsuranceServicesData} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0, // Remove bottom padding
  },
});
