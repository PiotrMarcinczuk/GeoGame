import { set } from "@dotenvx/dotenvx";
import { useEffect, useState } from "react";

interface Stats {
  "NE.IMP.GNFS.ZS": number; //Imports of goods and services (% of GDP)
  "NE.EXP.GNFS.ZS": number; //Exports of goods and services (% of GDP)
  "EG.ELC.ACCS.UR.ZS": number; //urban population with access to electricity (% of total population)
}

export default function useStats({ data }: any) {
  const [stats, setStats] = useState<Stats>({
    "NE.IMP.GNFS.ZS": 0,
    "EG.ELC.ACCS.UR.ZS": 0,
    "NE.EXP.GNFS.ZS": 0,
  });

  useEffect(() => {
    if (!data) return;
    for (const [key, selectedStatistic] of Object.entries(data)) {
      if (Array.isArray(selectedStatistic)) {
        selectedStatistic.forEach((stats: any) => {
          if (!stats.value) return;
          setStats((prev) => {
            return {
              ...prev,
              [key]: stats.value,
            };
          });
        });
      }
    }
  }, [data]);
  console.log(stats);
  return { stats, setStats };
}
