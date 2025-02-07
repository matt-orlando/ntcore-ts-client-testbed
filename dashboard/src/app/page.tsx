'use client';
import styles from "./page.module.css";
import { NetworkTables, NetworkTablesTopic, NetworkTablesTypeInfos } from 'ntcore-ts-client';
import { useEffect, useState } from "react";

export default function Home() {
  const [ntCore, setNtCore] = useState<NetworkTables | undefined>(undefined);
  const [autoModeTopic, setSutoModeTopic] = useState<NetworkTablesTopic<string> | undefined>(undefined);
  const [example, setExample] = useState("Primary");

  const handleTopicUpdateFromServer = (val: string) => {
    setExample(val);
  }
  
  const handleClick = (val: string) => {
    autoModeTopic?.setValue(val);
  };

  const initialize = async () => {
    if (ntCore != null) {
      return;
    }

    const localNtCore = NetworkTables.getInstanceByURI('localhost', 5810);
    setNtCore(localNtCore);
    const localAutoModeTopic = localNtCore.createTopic<string>('/ReactDash/Main/dpub/example', NetworkTablesTypeInfos.kString, 'Primary');
    setSutoModeTopic(localAutoModeTopic);
    await localAutoModeTopic.publish();

    localNtCore.createTopic<string>('/ReactDash/Main/rpub/example', NetworkTablesTypeInfos.kString, "Primary")
      .subscribe((value: string | null) => { handleTopicUpdateFromServer(value ?? "Primary"); });
  }

  useEffect(() => {
    initialize();
  }, [])

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
