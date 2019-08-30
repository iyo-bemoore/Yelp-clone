import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, Linking, Platform, ActivityIndicator } from 'react-native';
import yelp from '../api/yelp';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createOpenLink } from 'react-native-open-maps';


const getDay = (day) => {
    const d = new Date();
    const n = d.getDay()
    if (day === n) {
        return { fontWeight: 'bold' }
    }
}

const dial = (phone) => {
    let tel = '';
    if (Platform.OS === 'android') {
        tel = `tel:${phone}`
    } else {
        tel = `telprompt:${phone}`
    }
    Linking.openURL(tel)
}

const getDaysOfTheWeek = (day) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const res = days[day]
    return res
}
const ResultsShowScreen = ({ navigation }) => {
    const id = navigation.getParam('id');
    const [result, setResult] = useState(null);
    console.log(result)
    const getDetail = async (id) => {
        const res = await yelp.get(`/${id}`)
        setResult(res.data)
    };
    useEffect(() => {
        getDetail(id);
    }, [])

    if (!result) {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#74A235" />
            </View>
        )
    }
    const { latitude, longitude } = result.coordinates
    return (
        <>
            <View style={{ flex: 1 }}>
                <FlatList
                    style={styles.flatListStyle}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={result.photos}
                    keyExtractor={(photo) => photo}
                    renderItem={({ item }) => {
                        return (
                            <Image style={styles.photoStyle} source={{ uri: item }} />
                        )
                    }}
                />
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText} > {result.name}</Text>
                    {result.hours[0].is_open_now ? <Text style={styles.openText}> OPEN </Text> : <Text style={styles.closedText}> CLOSED </Text>}
                </View>
                <View  >
                    <View style={styles.descriptionContainer}>
                        <Text> Specialities : {result.categories[0].alias} {result.price} </Text>
                        <Text> Rating : {result.rating} <Feather style={styles.rating} name="star" /></Text>
                        <Text> Contact : {result.phone} </Text>
                        <Text> Location : {result.location.address1} </Text>
                        <Text> City : {result.location.city} </Text>
                    </View>
                </View>
                <Text style={styles.opening} >Opening Hours</Text>
                <FlatList
                    scrollEnabled={false}
                    data={result.hours[0].open}
                    keyExtractor={(day) => result.hours[0].open.indexOf(day).toString()}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.openingHoursContainer} >
                                <Text style={getDay(item.day)}>{getDaysOfTheWeek(item.day)}</Text>
                                <Text style={getDay(item.day)}>{item.start} - {item.end} </Text>
                            </View>
                        )
                    }}
                />
                <View style={styles.contactContainer} >
                    <TouchableOpacity onPress={createOpenLink({ latitude, longitude })} ><Feather style={styles.contact} name="compass" /></TouchableOpacity>
                    <TouchableOpacity onPress={() => dial(result.phone)} ><Feather style={styles.contact} name="phone" /></TouchableOpacity>
                    <TouchableOpacity><Feather style={styles.contact} name="aperture" /></TouchableOpacity>
                </View>
            </View>
        </>
    )
}


const styles = StyleSheet.create({

    flatListStyle: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 4,
        borderBottomColor: 'black'
    },
    contactContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        borderTopWidth: 1,
        height: 70,
        borderColor: '#f8f8f8'
    },
    contact: {
        opacity: 0.8,
        marginTop: 15,
        fontSize: 40,
        alignSelf: 'center',
        color: '#74A235'
    },
    imgList: {
        shadowColor: "#000",
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

    },
    decContainer: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    },
    descriptionContainer: {
        marginLeft: 5,

    },
    rating: {
        color: '#74A235',
        fontSize: 15
    },
    openingHoursContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 5,
        marginRight: 5
    },
    opening: {
        marginLeft: 5,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 17,
        fontWeight: '600'
    },
    headerTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    openText: {
        marginTop: 24,
        fontWeight: '800',
        color: '#74A235'
    },
    closedText: {
        marginTop: 24,
        fontWeight: '800',
        color: '#003334'

    },
    iconStyle: {
        fontSize: 40,
        alignSelf: 'flex-start'
    },
    headerText: {
        marginTop: 20,
        fontSize: 28,
        alignSelf: 'center',
        fontWeight: 'bold',
        marginVertical: 12,
        marginLeft: 5,
        fontFamily: 'billabong'
    },
    photoStyle: {
        height: 200,
        width: 200,
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
});

export default ResultsShowScreen;
