import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView,ActivityIndicator } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults'
import ResultsList from '../components/ResultsList';




const SearchScreen = () => {
    const [term, setTerm] = useState('');
    const [results, errorMessage, searchAPI] = useResults()

    const filterResultsByPrice = price => {
        return results.filter(res => {
            return res.price === price
        })
    }
     
    return (
        <>
         <View style={{flex:1}} >
                <SearchBar
                    term={term}
                    onTermChange={setTerm}
                    onTermSubmit={() => searchAPI(term)}
                    />
                {errorMessage ? <Text> {errorMessage} </Text> : null}
                <Text style={styles.result}> {results.length} Places  </Text>
            <ScrollView>
                {results.length < 1 ? (
                     <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#74A235" />
                     </View>
                )
                  : <View>
                    <ResultsList  results={filterResultsByPrice('$')} title="Cost Effective"/>
                    <ResultsList  results={filterResultsByPrice('$$')} title="Bit Pricier"/>
                    <ResultsList  results={filterResultsByPrice('$$$')} title="Big Spender"/>
                    <ResultsList  results={filterResultsByPrice('$$$$')} title="High End"/>
                    </View>
                    }
            </ScrollView>
        </View>
       </>
    )
   
}


const styles = StyleSheet.create({
    result : {
        alignSelf:'flex-end',
        marginRight:7,
        opacity:0.5
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 10
    }
});

export default SearchScreen