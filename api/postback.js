export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send('Método não permitido');
  }

  const { fbclid } = req.query;

  // Enviar conversão ao Facebook
  await fetch('https://graph.facebook.com/v18.0/1907845369956747/events?access_token=EAAfFtSgH5yMBO4YV2d6apiksEOn7kb9ZCqh6o23GVPb6myuDNYHcHJjlR8FCm2FH1HzBQbohUhcP2PmBNxAD7pomiBrGo4tM5o7lophbhyZCLQ6XVR03xZBNtyRnZCAv0Mo1TrGZAUjipZCllYI0eZCefgojCP1PE1HZCQfVZBumHjXq4Drg1VahVXtZCIN7sqVw5laQZDZD', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      data: [{
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: 'https://fastquote.pro',
        user_data: {
          fbc: fbclid,
        },
      }]
    }),
  });

  res.status(200).send('Conversão enviada!');
}
