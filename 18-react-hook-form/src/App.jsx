
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    alert(`Öğrenci kaydedildi!\nAd: ${data.ad}\nE-posta: ${data.email}`);
    console.log(data);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Öğrenci Kayıt Formu</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "15px" }}>
          <label>Ad Soyad</label>
          <br />
          <input
            {...register("ad", { required: "Ad Soyad zorunludur." })}
            placeholder="Adınızı girin"
          />
          {errors.ad && <p>{errors.ad.message}</p>}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>E-posta</label>
          <br />
          <input
            {...register("email", {
              required: "E-posta zorunludur.",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Geçerli bir e-posta girin.",
              },
            })}
            placeholder="ornek@mail.com"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <button type="submit">Kaydet</button>
      </form>
    </div>
  );
}

export default App;
