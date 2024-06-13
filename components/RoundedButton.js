import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const RoundedButton = ({ label, onPress, loading }) => {
  return (
    <TouchableOpacity
      style={{ alignItems: 'center', justifyContent: 'center' }}
      onPress={onPress}
    >
     {loading ? <Text style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>
        ...Loading
      </Text> : <Text style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>
        {label}
      </Text>}
    </TouchableOpacity>
  );
};

export default RoundedButton;