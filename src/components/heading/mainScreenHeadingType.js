import { Text, View } from "react-native"

const MainScreenHeadingType = (props) => {
    return (
        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }}>
                {props.title}
            </Text>
        </View>
    )
}
export default MainScreenHeadingType