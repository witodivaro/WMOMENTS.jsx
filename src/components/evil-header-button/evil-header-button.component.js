import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/EvilIcons';

const EvilHeaderButton = (props) => {
  return <HeaderButton IconComponent={Icon} iconSize={24} {...props} />;
};

export default EvilHeaderButton;
