// Initialize Firebase with your config
firebase.initializeApp({
        apiKey: "AIzaSyB_h4Sq3KGTbXmlDnY6MeSwc_77mVCuVNU",
        authDomain: "task-management-app-be210.firebaseapp.com",
        projectId: "task-management-app-be210",
        storageBucket: "task-management-app-be210.appspot.com",
        messagingSenderId: "440557223092",
        appId: "1:440557223092:web:2a6f6e804e7252065babe1",
  });
  
  const db = firebase.firestore();
  
  // Function to add a task
  function addTask() {
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if (task !== "") {
      db.collection("tasks").add({
        task: task,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      taskInput.value = "";
      console.log("Task added");
    }
  }
  
  // Function to render tasks
  function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
      <span>${doc.data().task}</span>
      <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);
  }
  
  // Real-time listener for tasks
  db.collection("tasks")
    .orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
      const changes = snapshot.docChanges();
      changes.forEach(change => {
        if (change.type === "added") {
          renderTasks(change.doc);
        }
      });
    });
  
  // Function to delete a task
  function deleteTask(id) {
    db.collection("tasks").doc(id).delete();
  }