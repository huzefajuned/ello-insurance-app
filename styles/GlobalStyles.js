import { StyleSheet, Platform } from 'react-native';
export default StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        backgroundColor: "gray",
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
});