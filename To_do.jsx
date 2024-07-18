import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

export default function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  function handleInputChange(text) {
    setNewTask(text);
  }

  function addTask() {
    setTasks([...tasks, newTask]);
    setNewTask("");
  }

  function delTask(index) {
    const newTasks = tasks.filter((task, i) => i !== index);
    setTasks(newTasks);
  }

  function moveTaskUp(index) {
    if (index === 0) return;
    const newTasks = [...tasks];
    [newTasks[index - 1], newTasks[index]] = [
      newTasks[index],
      newTasks[index - 1],
    ];
    setTasks(newTasks);
  }

  function moveTaskDown(index) {
    if (index === tasks.length - 1) return;
    const newTasks = [...tasks];
    [newTasks[index + 1], newTasks[index]] = [
      newTasks[index],
      newTasks[index + 1],
    ];
    setTasks(newTasks);
  }

  return (
    <View style={styles.container}>
      <Text>To Do List</Text>
      <StatusBar style="auto" />
      <TextInput
        style={styles.input}
        placeholder="Enter Task"
        value={newTask}
        onChangeText={handleInputChange}
      />
      <Button title="Add Task" onPress={addTask} />
      {tasks.map((task, index) => (
        <View key={index} style={styles.taskContainer}>
          <Text>{task}</Text>
          <Button title="Delete" onPress={() => delTask(index)} />
          <Button title="Up" onPress={() => moveTaskUp(index)} />
          <Button title="Down" onPress={() => moveTaskDown(index)} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: "80%",
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 5,
  },
});