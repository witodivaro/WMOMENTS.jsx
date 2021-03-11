import moment from 'moment-mini';
import React, {useState} from 'react';
import {useMemo} from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import COLORS from '../../constants/colors';
import MomentItem from '../moment-item/moment-item.component';

const renderMomentItem = ({item}) => {
  return <MomentItem item={item} />;
};

const MomentsGroup = ({date, moments}) => {
  const formattedDate = moment(date).format('MMMM Do YYYY');

  const [isExpanded, setIsExpanded] = useState(false);

  const renderedMoments = useMemo(
    () =>
      isExpanded ? (
        <View style={styles.momentsContainer}>
          <FlatList data={moments} renderItem={renderMomentItem} />
        </View>
      ) : null,
    [moments, isExpanded],
  );

  const toggleIsExpandedHandler = () => {
    setIsExpanded((isExpanded) => !isExpanded);
  };

  return (
    <TouchableOpacity onPress={toggleIsExpandedHandler} style={styles.group}>
      <View style={styles.groupDateContainer}>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
      {renderedMoments}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  group: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderRadius: 20,
    shadowOpacity: 0.26,
    backgroundColor: Platform.OS === 'ios' ? '#fff' : COLORS.primary,
    borderColor: COLORS.primary,
    elevation: 5,
  },
  date: {
    fontSize: 20,
    textAlign: 'center',
    color: Platform.OS === 'ios' ? COLORS.primary : '#fff',
  },
  momentsContainer: {
    maxHeight: 500,
  },
});

export default MomentsGroup;
