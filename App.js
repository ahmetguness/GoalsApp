import { View, FlatList, StyleSheet } from 'react-native';
import { useState } from 'react';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {

  const [myGoals, setMyGoals] = useState([]);

  function addGoalHandler(enteredGoalText) {
    setMyGoals(currentGoals => [
      ...currentGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
  }


  function deleteGoalHandler(id) {
    setMyGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <View style={styles.appContainer}>
      <GoalInput onAddGoal={addGoalHandler} />
      <View style={styles.goalsContainer}>
        <FlatList
          data={myGoals}
          renderItem={itemData => {
            return <GoalItem text={itemData.item.text} onDeleteItem={deleteGoalHandler} id={itemData.item.id} />;
          }}
        />
      </View>
    </View>
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
