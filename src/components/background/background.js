import { ImageBackground } from "react-native";
import { StyleSheet } from "react-native";
const Background = ({ children }) => {
    return (
        <ImageBackground source={require('../../assets/images/background.png')} style={styles.image}>
            {children}
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    image: {
        flex: 1,
        height: '100vh'
    }
})
export default Background