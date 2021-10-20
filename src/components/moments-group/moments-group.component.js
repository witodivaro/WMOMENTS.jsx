import moment from 'moment-mini';
import React, { useState, useMemo, useCallback } from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import COLORS from '../../constants/colors';
import MomentItem from '../moment-item/moment-item.component';

const MomentsGroup = ({ date, moments }) => {
  const formattedDate = moment(date).format('MMMM Do YYYY');

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleIsExpandedHandler = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setIsExpanded(newIsExpanded => !newIsExpanded);
  }, []);

  const renderedMoments = useMemo(
    () =>
      isExpanded ? (
        <View style={styles.momentsContainer}>
          {moments.map(item => (
            <MomentItem key={item.id} item={item} />
          ))}
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
        <Text style={[styles.date, isExpanded ? styles.textLeft : null]}>
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
    backgroundColor: '#fff',
    borderColor: COLORS.primary,
    elevation: 5,
    overflow: 'hidden',
  },
  date: {
    fontSize: 20,
    color: COLORS.primary,
    textAlign: 'center',
  },
  momentsContainer: {
    position: 'relative',
    marginTop: 20,
  },
  actionContainer: {
    marginTop: 10,
  },
  closeText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.primary,
  },
  textLeft: {
    textAlign: 'left',
  },
});

export default MomentsGroup;
