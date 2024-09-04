
import { StyleSheet, Text, View } from "react-native"
import YTDownloader from "../../components/downloader/ytDownloader"
import Background from "../../components/background/background"
import { FlatList } from "react-native"
import FbDownloader from "../../components/downloader/facebookDownloader"
import TikTokDownloader from "../../components/downloader/tikTokDownloader"
import { TouchableOpacity, Dimensions } from "react-native"
import { useState } from "react"
import MainScreenHeadingType from "../../components/heading/mainScreenHeadingType"
import { constants } from "../../Constants/constants"
import LinkAndDownload from "../../components/linkAndDownload/linkAndDownload"
const MainScreen = () => {
    const [selected, setselected] = useState('Youtube')
    const Data = [
        { name: 'Youtube' },
        { name: 'TikTok' },
        { name: 'Facebook' },
        { name: 'Instagram' },
        { name: 'Twitter' }
    ]
    const RenderItem = ({ title }) => {
        console.log(title)
        return (
            <View>
                <TouchableOpacity style={[styles.item, { backgroundColor: selected === title ? 'white' : constants.themeColor, }]} onPress={() => setselected(title)}>
                    <Text style={[styles.title, { color: selected === title ? 'black' : 'white', }]}>
                        {title}
                    </Text>
                </TouchableOpacity>
            </View>)
    }
    return (
        <Background>
            <View style={styles.container}>
                <FlatList
                    horizontal={true}
                    contentContainerStyle={styles.cardcontainer}
                    data={Data}
                    renderItem={({ item }) => <RenderItem title={item.name} />}
                    keyExtractor={item => item.name}
                />
            </View>
            <MainScreenHeadingType title={selected} />
            {/* {selected === 'Youtube' && <YTDownloader />}
            {selected === 'TikTok' && <TikTokDownloader />}
            {selected === 'Facebook' && <FbDownloader />} */}
            <LinkAndDownload type={selected} />
        </Background>
    )
}
const styles = StyleSheet.create({
    container: {
        marginVertical: '20%',  // Adjusted to a smaller value for better spacing
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    item: {
        paddingVertical: '2%',
        paddingHorizontal: 20,
        borderRadius: 25,
        marginHorizontal: 10,
        marginVertical: '5%',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 15,
        color: 'black',
    },
    cardcontainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

})
export default MainScreen