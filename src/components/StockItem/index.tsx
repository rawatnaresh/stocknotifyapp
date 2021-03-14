import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {useFetchStockList} from '../../hooks/useFetchStockList';

export type ItemType = {
  id: Number;
  symbol: string;
  securityName: string;
  name: string;
  activeStatus: string;
  watched: boolean;
};

type ItemProp = {
  item: ItemType;
  renderAddWatchUI: boolean;
};

export const Item = ({item, renderAddWatchUI}: ItemProp) => {
  const [minInput, handleMinInput] = React.useState('');
  const [maxInput, handleMaxInput] = React.useState('');
  const [showAdder, setShowAdder] = React.useState(false);

  const stockListing = useFetchStockList();

  const handleAddWatchlist = () => {
    stockListing.addToWatchlist({
      symbol: item.symbol,
      minAmount: +minInput,
      maxAmount: +maxInput,
    });
    setShowAdder(false);
  };
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        setShowAdder(!showAdder);
      }}
      activeOpacity={0.5}>
      <View style={styles.row}>
        <View style={styles.companyLogo}>
          <Text>Logo</Text>
        </View>
        <View style={styles.content}>
          <View>
            <Text style={styles.title}>{item.symbol}</Text>
            <View style={styles.watchContainer}>
              <Text style={styles.subTitle}>(6.71%)</Text>
              {item.watched && (
                <Icon name={'eye'} size={15} color={'#2585d9'} />
              )}
            </View>
          </View>
          <View style={styles.stockPriceContainer}>
            <Text style={styles.stockPrice}>$6,000</Text>
          </View>
        </View>
      </View>
      {renderAddWatchUI && showAdder && (
        <View style={styles.adder}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => handleMaxInput(text)}
            value={maxInput}
            placeholder="max"
            keyboardType="numeric"
            selectionColor="black"
            autoFocus
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => handleMinInput(text)}
            value={minInput}
            placeholder="min"
            keyboardType="numeric"
            selectionColor="black"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button]}
              onPress={handleAddWatchlist}>
              <Icon name={'add-circle-outline'} color={'#fff'} size={25} />
              <Text style={styles.textStyle}>Add to watchlist</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#e7edff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  subTitle: {
    color: '#2585d9',
    fontWeight: '700',
    fontSize: 12,
    marginRight: 10,
  },
  companyLogo: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
  },
  content: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20,
  },
  stockPriceContainer: {
    backgroundColor: '#fbfbfb',
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
  },
  stockPrice: {
    fontWeight: '700',
    fontSize: 12,
  },

  textInput: {
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    // elevation: 2,
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
  adder: {
    marginTop: 20,
  },
  watchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
