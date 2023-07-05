import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo, mic } from "@expo/vector-icons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setClicked }) => {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }
      >
        {/* search Icon */}
        <FontAwesome5 name="search" size={16} color="#707070" style={styles.icon} />

        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />

        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked ? (
          <Entypo
            name="cross"
            size={18}
            color="#707070"
            onPress={() => {
              setSearchPhrase("");
            }}
          />
        ) : (
          <FontAwesome5 name="microphone" size={20} color="#707070" style={styles.icon} />
        )}
      </View>
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    // backgroundColor: "red",
  },
  searchBar__unclicked: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    width: "99%",
    // backgroundColor: "#d9dbda",
    borderRadius: 7,
    alignItems: "center",
    marginTop: 10,
    borderColor: "#707070",
    borderWidth: 1,
    height: 39,
  },
  searchBar__clicked: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    width: "99%",
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    borderColor: "#707070",
    borderWidth: 1,
    height: 39,
  },
  input: {
    flex: 1,
    fontSize: 14,
    marginLeft: 10,
    color: "#030104",
  },
  icon: {
    fontSize: 12,
    color: "#707070", 
     },
});
