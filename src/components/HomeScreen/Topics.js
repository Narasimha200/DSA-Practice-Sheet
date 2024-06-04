import React from "react";
import TopicCard from './TopicCard';
import './Topics.css';
export default function Topics() {
    const topics = [
        {Name:"Arrays",Url:"https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230726162247/Array-data-structure.png"},
        {Name:"Strings",Url:"https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230726162404/String-Data-Structure.png"},
        {Name:"Matrix",Url:"https://cdn.educba.com/academy/wp-content/uploads/2020/09/NumPy-2D-array.jpg.webp"},
        {Name:"Linked List", Url:""},
        {Name:"Stacks",Url:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.geeksforgeeks.org%2Fstack-data-structure%2F&psig=AOvVaw0iYD5KKqmDaFxwEy14vI7d&ust=1705573017715000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCJjI0OOY5IMDFQAAAAAdAAAAABAD"},
        {Name:"Queues",Url:"https://media.geeksforgeeks.org/wp-content/cdn-uploads/20230726165642/Queue-Data-structure1.png"},
        {Name:"Binary trees",Url:"https://media.geeksforgeeks.org/wp-content/uploads/20221124174432/binary.png"},
        {Name:"BST",Url:"https://static.javatpoint.com/ds/images/binary-search-tree1.png"},
        {Name:"Graphs",Url:"https://www.boardinfinity.com/blog/content/images/2023/01/Graphs-in-DSA.png"},
        {Name:"Binary Search",Url:"https://fullyunderstood.com/wp-content/uploads/2019/09/Binary-Search.png"},
    ]
  return (
    <div className="topics">
      <h2 className="title">Practice problems on various Data structures and Algorithms</h2>
      <div className="topics_container">
        {
            topics.map(topic => <TopicCard topic={topic}/>)
        }
      </div>
    </div>
  );
}
