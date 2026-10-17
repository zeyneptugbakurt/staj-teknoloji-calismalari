
import { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Stack
} from '@mui/material';

function App() {
  const [mesaj, setMesaj] = useState('');

  const dersler = [
    { id: 1, ad: 'Veri Yapıları', durum: 'Devam ediyor' },
    { id: 2, ad: 'Veritabanı', durum: 'Tamamlandı' },
    { id: 3, ad: 'Web Programlama', durum: 'Devam ediyor' }
  ];

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Öğrenci Paneli
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        Derslerini buradan takip edebilirsin.
      </Typography>

      <Stack spacing={2}>
        {dersler.map((ders) => (
          <Card key={ders.id} variant="outlined">
            <CardContent>
              <Typography variant="h6">
                {ders.ad}
              </Typography>

              <Typography color="text.secondary" sx={{ mb: 2 }}>
                Durum: {ders.durum}
              </Typography>

              <Button
                variant="contained"
                onClick={() => setMesaj(`${ders.ad} dersini seçtin!`)}
              >
                Dersi Seç
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {mesaj && (
        <Typography sx={{ mt: 3 }} color="primary">
          {mesaj}
        </Typography>
      )}
    </Container>
  );
}

export default App;
