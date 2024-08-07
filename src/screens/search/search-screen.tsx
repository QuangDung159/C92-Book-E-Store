import { AntDesign, Feather } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import { Layouts } from '@components';
import { COLORS } from '@themes';

const SearchScreen = ({ navigation }: any) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.primaryWhite,
        paddingHorizontal: 24,
        paddingTop: 12,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 12,
        }}
      >
        <TextInput
          placeholder="Happy reading!"
          style={{
            height: 40,
            flex: 1,
          }}
          mode="outlined"
          activeOutlineColor={COLORS.primaryBlack}
        />
        <Layouts.HSpace value={8} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Feather name="search" size={24} />
          <Layouts.HSpace value={8} />
          <View>
            <AntDesign name="shoppingcart" size={24} />
            <View
              style={{
                position: 'absolute',
                bottom: 15,
                left: 10,
                backgroundColor: COLORS.primaryBlack,
                borderRadius: 99,
                minHeight: 16,
                minWidth: 26,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  color: COLORS.primaryWhite,
                  fontSize: 8,
                  paddingHorizontal: 2,
                  fontWeight: 'bold',
                }}
              >
                99+
              </Text>
            </View>
          </View>
        </View>
      </View>
      <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
        <Layouts.VSpace value={24} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export { SearchScreen };
