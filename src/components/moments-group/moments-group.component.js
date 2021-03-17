import moment from 'moment-mini';
import React, {useState, useMemo, useCallback} from 'react';
import {
  Button,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import COLORS from '../../constants/colors';
import MomentItem from '../moment-item/moment-item.component';

const renderMomentItem = ({item}) => {
  return <MomentItem key={item.id.toString()} item={item} />;
};

const MomentsGroup = ({date, moments}) => {
  const formattedDate = moment(date).format('MMMM Do YYYY');

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleIsExpandedHandler = useCallback(() => {
    setIsExpanded((isExpanded) => !isExpanded);
  }, []);

  const renderedMoments = useMemo(
    () =>
      isExpanded ? (
        <View style={styles.momentsContainer}>
          <FlatList
            data={moments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderMomentItem}
            accessibilityLabel="moments list"
          />
          <Text style={styles.closeText}>Touch to close</Text>
        </View>
      ) : null,
    [moments, isExpanded],
  );

  return (
    <TouchableOpacity
      accessibilityLabel="open moments group"
      onPress={toggleIsExpandedHandler}
      style={styles.group}>
      <View style={styles.groupDateContainer}>
        <Text
          style={[styles.date, {textAlign: isExpanded ? 'left' : 'center'}]}>
          {formattedDate}
        </Text>
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
    color: Platform.OS === 'ios' ? COLORS.primary : '#fff',
  },
  momentsContainer: {
    marginTop: 20,
  },
  actionContainer: {
    marginTop: 10,
  },
  closeText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    color: Platform.OS === 'ios' ? COLORS.primary : 'white',
  },
});

export default MomentsGroup;
