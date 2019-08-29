import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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
        <View>
            <View style={{flex:1}}>
                <SearchBar
                    term={term}
                    onTermChange={() => setTerm(term)}
                    onTermSubmit={() => searchAPI(term)}
                />
                {errorMessage ? <Text> {errorMessage} </Text> : null}
                <Text style={styles.result}> {results.length} Places  </Text>
            </View>
            <View>
            <ScrollView>
                <ResultsList results={filterResultsByPrice('$')} title="Cost Effective" />
                <ResultsList results={filterResultsByPrice('$$')} title="Bit Pricier" />
                <ResultsList results={filterResultsByPrice('$$$')} title="Big Spender" />
            </ScrollView>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    result : {
        alignSelf:'flex-end',
        marginRight:7,
        opacity:0.5
    }
});

export default SearchScreen