import React from 'react';
import { View , TextInput , StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';


const SearchBar = ({term, onTermChange, onTermSubmit}) => { 
    return (
        <View style={styles.backGround}>
            <Feather style={styles.iconStyle} name="search"/>
            <TextInput
               autoCapitalize='none'
               autoCorrect={false} 
               style={styles.inputStyle}
               placeholder="Search for business"
               value={term}
               onChangeText={newTerm => onTermChange(newTerm)}
               onEndEditing={() => onTermSubmit()}
            />      
        </View>
    )
}


const styles = StyleSheet.create({
    iconStyle:{
        fontSize:40,
        alignSelf:"center",
        marginHorizontal:15,
    },
    backGround: {
        paddingLeft:6,
        marginTop:8,
        backgroundColor:'#F0EEEE',
        height:50,
        borderRadius:5,
        marginHorizontal:15,
        flexDirection:'row',
        marginBottom:10
    },
    inputStyle: {
        fontSize:18,
        flex:1
    }
});

export default SearchBar