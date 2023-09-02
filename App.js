import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, ScrollView, Animated } from 'react-native';

const App = () => {
  const [scrollY] = useState(new Animated.Value(0));
  const [blurIntensity, setBlurIntensity] = useState(0);

  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      const newBlurIntensity = Math.min(1, value / 100); 
      setBlurIntensity(newBlurIntensity);
    });

    return () => {
      scrollY.removeListener(listener);
    };
  }, [scrollY]);

  const yourData = Array.from({ length: 20 }, (_, index) => ({
    id: `${index + 1}`,
    text: `Item ${index + 1}`,
  }));

  return (
    <View style={styles.container}>
      <FlatList
        data={yourData}
        renderItem={({ item }) => (
          <Text style={styles.listItem}>{item.text}</Text>
        )}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />
      <BlurredBottomNavigation blurIntensity={blurIntensity} />
    </View>
  );
};

const BlurredBottomNavigation = ({ blurIntensity }) => {
  return (
    <Animated.View
      style={[
        styles.blurContainer,
        {
          opacity: 1 - blurIntensity,
        },
      ]}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <BottomNavigationItem label="Home" />
        <BottomNavigationItem label="Profile" />
        <BottomNavigationItem label="Messages" />
        <BottomNavigationItem label="Notifications" />
        <BottomNavigationItem label="Settings" />
        <BottomNavigationItem label="More" />
        <BottomNavigationItem label="Explore" />
      </ScrollView>
    </Animated.View>
  );
};

const BottomNavigationItem = ({ label }) => {
  return (
    <View style={styles.navigationItem}>
      <Text style={styles.navigationItemText}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  blurContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff', 
    borderTopWidth: 1, 
    borderTopColor: '#ccc',
  },
  navigationItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10, 
    marginLeft: 8, 
    marginRight: 8, 
  },
  navigationItemText: {
    color: 'blue', 
    fontWeight: 'bold', 
  },
});

export default App;
