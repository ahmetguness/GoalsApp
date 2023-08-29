import { View, FlatList, StyleSheet, Button } from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [myGoals, setMyGoals] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  };

  function endAddGoalHandler() {
    setModalIsVisible(false);
  };

  function addGoalHandler(enteredGoalText) {
    setMyGoals(currentGoals => [
      ...currentGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    setModalIsVisible(false)
  }


  function deleteGoalHandler(id) {
    setMyGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}>
        <Button title='Add New Goal' color="#a065ec" onPress={startAddGoalHandler} />
        <GoalInput onAddGoal={addGoalHandler} visible={modalIsVisible} cancel={endAddGoalHandler} />
        <View style={styles.goalsContainer}>
          <FlatList
            data={myGoals}
            renderItem={itemData => {
              return <GoalItem text={itemData.item.text} onDeleteItem={deleteGoalHandler} id={itemData.item.id} />;
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
