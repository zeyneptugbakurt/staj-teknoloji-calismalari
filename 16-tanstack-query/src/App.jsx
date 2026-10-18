
import { useQuery } from "@tanstack/react-query";

function App() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["kullanicilar"],
    queryFn: async () => {
      const cevap = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!cevap.ok) {
        throw new Error("Kullanıcılar alınamadı!");
      }

      return cevap.json();
    },
  });

  if (isLoading) {
    return <h2>Kullanıcılar yükleniyor...</h2>;
  }

  if (isError) {
    return <h2>Hata: {error.message}</h2>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Kullanıcı Listesi</h1>

      {data.map((kullanici) => (
        <div
          key={kullanici.id}
          style={{
            border: "1px solid #ddd",
            padding: "12px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>{kullanici.name}</h3>
          <p>E-posta: {kullanici.email}</p>
          <p>Şehir: {kullanici.address.city}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
