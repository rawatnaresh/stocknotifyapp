import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export const AddWatchlistContainer = ({item}: any) => {
  const [minInput, handleMinInput] = React.useState('');
  const [maxInput, handleMaxInput] = React.useState('');

  console.log(item, 'yuyu');

  return (
    <View style={styles.sheetContainer}>
      <Text style={{fontSize: 20, fontWeight: '700', marginBottom: 10}}>
        {item.symbol}
      </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => handleMaxInput(text)}
        value={maxInput}
        placeholder="max"
        keyboardType="numeric"
        selectionColor="#2585d9"
        autoFocus
      />
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => handleMinInput(text)}
        value={minInput}
        placeholder="min"
        keyboardType="numeric"
        selectionColor="#2585d9"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button]} onPress={() => {}}>
          <Icon name={'add-circle-outline'} color={'#fff'} size={25} />
          <Text style={styles.textStyle}>Add to watchlist</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 20,
    backgroundColor: '#e7edff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#2585d9',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 10,
  },
  sheetContainer: {
    padding: 20,
  },
});
