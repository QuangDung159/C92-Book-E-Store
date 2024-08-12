import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Inputs, Layouts, MinusIcon, PlusIcon } from '@components';
import { DataModels } from '@models';
import { FONT_STYLES } from '@themes';
import { ListCheckBoxFilter } from './list-check-box-filter';

interface CollapsibleListProps {
  isCollapse: boolean;
  dataSource: DataModels.IReferenceOptions[];
  listItemReferForSearch: string[];
  onChangeText?: (value: string) => void;
  onCheck?: (list: string[]) => void;
  listChecked: string[];
  title: string;
  setIsCollapse: (value: boolean) => void;
}

const CollapsibleList: React.FC<CollapsibleListProps> = ({
  isCollapse,
  dataSource,
  listItemReferForSearch,
  onChangeText,
  onCheck,
  listChecked,
  title,
  setIsCollapse,
}) => {
  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.label}>
          {title}{' '}
          {listChecked.length > 0 && (
            <Text
              style={styles.title}
            >{`(${listChecked.length} selcted)`}</Text>
          )}
        </Text>
        <Layouts.MaxSpace />
        {isCollapse ? (
          <PlusIcon onPress={() => setIsCollapse(true)} />
        ) : (
          <MinusIcon onPress={() => setIsCollapse(false)} />
        )}
      </View>
      <Collapsible collapsed={isCollapse}>
        <Layouts.VSpace value={12} />
        <Inputs.CTextInput
          placeholder="Search"
          onChangeText={(value) => {
            onChangeText(value);
          }}
        />
        <Layouts.VSpace value={12} />
        <ListCheckBoxFilter
          dataSource={dataSource}
          listRefer={listItemReferForSearch}
          onCheck={(itemId, checked) => {
            let list = [...listItemReferForSearch];
            if (checked) {
              const listUncheck = list.filter((item) => item !== itemId);
              list = listUncheck;
            } else {
              list.push(itemId);
            }

            onCheck(list);
          }}
        />
      </Collapsible>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    ...FONT_STYLES.SEMIBOLD_16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...FONT_STYLES.THIN_16,
  },
});

const observable = observer(CollapsibleList);
export { observable as CollapsibleList };
