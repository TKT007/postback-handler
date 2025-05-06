// api/postback.js

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }

  const { fbclid, payout, test_event_code } = req.query;

  if (!fbclid) {
    return res.status(400).json({ error: 'Parâmetro fbclid é obrigatório' });
  }

  const ACCESS_TOKEN = 'EAAfFtSgH5yMBOxZCyzcrDVcZAwHcJ9EuTzOK1wzX2M4YmUDcmx1uW7ymMSSnT0OwwzZBbnMYDCFcM4hYIwiEPsKZCRI65ZByNqQjORqMi8zZARznHNFWMvLogqkh9c6vuNQPFrUZCZA435H3z8ZASSbOrZCMbtHsZCeeZBvPIURPX0e1mjWZAFw7DEt0O63rapgBLalVadgZDZD';
  const PIXEL_ID = '1907845369956747';

  const eventTime = Math.floor(Date.now() / 1000);
  const eventName = 'Lead';
  const currency = 'USD';

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: eventTime,
        action_source: 'website',
        event_source_url: 'https://fastquote.pro',
        user_data: {
          fbc: fbclid
        },
        custom_data: {
          value: parseFloat(payout || 0),
          currency
        }
      }
    ],
    ...(test_event_code && { test_event_code }) // adiciona test_event_code se estiver presente
  };

  try {
    const fbRes = await fetch(`https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const fbJson = await fbRes.json();

    if (fbRes.ok) {
      return res.status(200).send('Conversão enviada com sucesso');
    } else {
      console.error('Erro ao enviar para Facebook:', fbJson);
      return res.status(500).json({ error: fbJson });
    }
  } catch (err) {
    console.error('Erro interno:', err);
    return res.status(500).send('Erro no servidor');
  }
}
