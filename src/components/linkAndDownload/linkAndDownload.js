import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, PermissionsAndroid, ActivityIndicator } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { constants } from '../../Constants/constants';

const LinkAndDownload = () => {
    const [pastedURL, setPastedURL] = useState('');
    const [videos, setVideos] = useState([]);
    const [thumbnail, setThumbnail] = useState([]);
    const [loading, setloading] = useState({})
    const [vedioUrl, setvedioUrl] = useState('')
    const requestStoragePermission = async () => {

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Downloader App Storage Permission',
                    message: 'Downloader App needs access to your storage so you can download files',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                downloadFile(vedioUrl)
            } else {
                console.log('Storage permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const SearchVedio = async (url) => {
        setloading(1)

        const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;

        if (!videoId) {
            alert('Invalid YouTube URL');
            setloading(null)
            return;
        }

        const downloadUrl = `https://yt-api.p.rapidapi.com/dl?id=${videoId}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'f55b9eb67cmshc123e97e018e2acp12535ajsn98f8984b23e1',
                'x-rapidapi-host': 'yt-api.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(downloadUrl, options);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            setThumbnail(result.thumbnail);
            console.log(result.formats[0].url)
            setvedioUrl(result.formats[0].url)
            setloading(null)
        } catch (error) {
            console.error('Error fetching video data:', error);
            setloading(null)
        }
    };

    const renderVideoItem = ({ item }) => (
        <View style={{ marginVertical: 10, alignItems: 'center' }}>
            <Image
                source={{ uri: item.snippet.thumbnails.medium.url }}
                style={{ width: 320, height: 180 }}
            />
            <Text style={{ color: 'white', marginVertical: 5 }}>{item.snippet.title}</Text>
        </View>
    );

    const downloadFile = () => {
        setloading(2)
        const { config, fs } = RNFetchBlob;
        const date = new Date();
        const fileDir = fs.dirs.DownloadDir;
        config({
            // add this option that makes response data to be stored as a file,
            // this is much more performant.
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path:
                    fileDir +
                    '/download_' +
                    Math.floor(date.getDate() + date.getSeconds() / 2) +
                    '.mp4',
                description: 'file download',
            },
        })
            .fetch('GET', vedioUrl, {
                //some headers ..
            })
            .then(res => {
                setloading(null)
                console.log('The file saved to ', res.path());
                alert('file downloaded successfully ');
            });
    };

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: '5%' }}>
            <TextInput
                placeholder="Enter/Paste file URL"
                style={{
                    width: '90%',
                    height: 50,
                    borderWidth: 0.5,
                    borderColor: 'white',
                    alignSelf: 'center',
                    paddingLeft: 20,
                    backgroundColor: 'transparent',
                    color: 'white'
                }}
                value={pastedURL}
                onChangeText={txt => setPastedURL(txt)}
            />

            <View style={{ flexDirection: 'row', margin: '5%', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
                {thumbnail.map((item, index) => (
                    <Image
                        key={index}
                        source={{ uri: item.url }}
                        style={{ width: 100, height: 100, margin: 5, borderColor: 'black', borderWidth: 1 }}
                    />
                ))}
            </View>

            <TouchableOpacity
                style={{
                    width: '90%',
                    height: 50,
                    borderWidth: 1,
                    borderColor: '#021133',
                    alignSelf: 'center',
                    backgroundColor: constants.themeColor,
                    borderRadius: 20,
                    marginTop: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => {
                    if (pastedURL !== '') {
                        SearchVedio(pastedURL);
                    } else {
                        alert('Please Add URL');
                    }
                }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: '#fff' }}>Search Video</Text>
                    {loading === 1 && <ActivityIndicator style={{ marginHorizontal: '2%' }} color='white' />}
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    width: '90%',
                    height: 50,
                    borderWidth: 1,
                    borderColor: '#021133',
                    alignSelf: 'center',
                    backgroundColor: 'black',
                    borderRadius: 20,
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => {
                    if (vedioUrl !== '') {
                        requestStoragePermission()
                    } else {
                        alert('Please Add URL');
                    }
                }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: '#fff' }}>Download Video</Text>
                    {loading === 2 && <ActivityIndicator style={{ marginHorizontal: '2%' }} />}
                </View>
            </TouchableOpacity>



            <FlatList
                data={videos}
                renderItem={renderVideoItem}
                keyExtractor={item => item.id.videoId}
                style={{ marginTop: 20 }}
            />
        </View>
    );
};

export default LinkAndDownload;
