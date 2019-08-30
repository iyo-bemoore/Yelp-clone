import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity,ActivityIndicator } from 'react-native';
import { withNavigation } from 'react-navigation';
import ResultsDetail from './ResultsDetail';

const ResultsList = ({ title, results, navigation }) => {
    
    return (
        <View>
            <Text style={styles.titleStyle}> {title} </Text>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={results}
                keyExtractor={(result) => result.id}
                renderItem={({ item }) => {
                    return <TouchableOpacity onPress={() =>  navigation.navigate('Result',{id:item.id})}>
                             <ResultsDetail result={item} />
                           </TouchableOpacity>
                }}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 4
    }
})

export default withNavigation(ResultsList); 