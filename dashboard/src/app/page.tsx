'use client';
import styles from "./page.module.css";
import { NetworkTables, NetworkTablesTypeInfos } from 'ntcore-ts-client';
import { useState } from "react";

const ntcore = NetworkTables.getInstanceByURI('localhost', 5810);
const autoModeTopic = ntcore.createTopic<string>('/ReactDash/Main/dpub/example', NetworkTablesTypeInfos.kString, 'Primary');
await autoModeTopic.publish();

export default function Home() {
  const [example, setExample] = useState("Primary");
  
  const handleClick = (val: string) => {
    autoModeTopic.setValue(val);
    setExample(val);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.ctas}>
          <a
            className={example == "Primary" ? styles.primary : styles.secondary}
            onClick={() => handleClick("Primary")}
          >
            Primary
          </a>
          <a
            className={example == "Secondary" ? styles.primary : styles.secondary}
            onClick={() => handleClick("Secondary")}
          >
            Secondary
          </a>
        </div>
      </main>
    </div>
  );
}
