import styles from "./styles.module.css";
import emojis from "./assets/emojis.png";
import { useState } from "react";

export default function App() {
  const [userPrompt, setUserPrompt] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const query = await generateQuery();
    setSqlQuery(query);
  };

  const generateQuery = async () => {
    const response = await fetch("http://localhost:3002/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ queryDescription: userPrompt }),
    });

    const data = await response.json();
    return data.sqlQuery.trim();
  };

  return (
    <main className={styles.main}>
      <img src={emojis} className={styles.icon} alt="Emojis" style={{ width: "150px", height: "150px" }}/>
      <h3>Generate Imitation Games! 🪄 </h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="query-description"
          placeholder="Input your character in the format: 'name' from 'movie/tv/book series' "
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
        />
        <input type="submit" value="Generate Games!" />
      </form>
      <pre>{sqlQuery}</pre>
    </main>
  );
}
