import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults'

const SearchScreen = () => {
    const [term, setTerm] = useState('');
    const [ results, errorMessage, searchAPI ] = useResults()

    return (
        <View>
            <SearchBar
                term={term} 
                onTermChange={setTerm}
                onTermSubmit={searchAPI(term)}
            />
            {errorMessage ? <Text> {errorMessage } </Text> :null}
            <Text> we have found {results.length} hits  </Text>
        </View>
    )
}


const styles = StyleSheet.create({});

export default SearchScreen