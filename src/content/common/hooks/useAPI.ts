import React from 'react';

export default function useApi(callback: () => Promise<any>): { data: any; loading: boolean; error: boolean } {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data: tempData } = await callback();
        setData(tempData);
      } catch (e) {
        setError(true);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return { data, loading, error };
}
