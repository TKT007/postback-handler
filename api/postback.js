export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send('Método não permitido');
  }

  const { fbclid } = req.query;

  // Enviar conversão ao Facebook
  await fetch('https://graph.facebook.com/v18.0/YOUR_PIXEL_ID/events?access_token=YOUR_ACCESS_TOKEN', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: [{
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: 'https://seusite.com',
        user_data: {
          fbc: fbclid,
        },
      }]
    }),
  });

  res.status(200).send('Conversão enviada!');
}
