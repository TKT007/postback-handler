// api/postback.js

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }

  const { fbclid, payout } = req.query;

  if (!fbclid) {
    return res.status(400).json({ error: 'fbclid é obrigatório' });
  }

  // Coloque aqui seus dados do Pixel
  const ACCESS_TOKEN = 'EAAfFtSgH5yMBOxZCyzcrDVcZAwHcJ9EuTzOK1wzX2M4YmUDcmx1uW7ymMSSnT0OwwzZBbnMYDCFcM4hYIwiEPsKZCRI65ZByNqQjORqMi8zZARznHNFWMvLogqkh9c6vuNQPFrUZCZA435H3z8ZASSbOrZCMbtHsZCeeZBvPIURPX0e1mjWZAFw7DEt0O63rapgBLalVadgZDZD'; // Copie do Gerenciador de Eventos
  const PIXEL_ID = '1907845369956747';

  const eventTime = Math.floor(Date.now() / 1000); // timestamp atual
  const eventName = 'Lead'; // Ou 'Purchase' se preferir
  const currency = 'USD';

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: eventTime,
        action_source: 'website',
        event_source_url: 'https://fastquote.pro', // qualquer domínio válido
        user_data: {
          fbc: fbclid
        },
        custom_data: {
          value: parseFloat(payout || 0),
          currency
        }
      }
    ]
  };

  try {
    const fbRes = await fetch(`https://graph.facebook.com/v18.0/${1907845369956747}/events?access_token=${EAAfFtSgH5yMBOxZCyzcrDVcZAwHcJ9EuTzOK1wzX2M4YmUDcmx1uW7ymMSSnT0OwwzZBbnMYDCFcM4hYIwiEPsKZCRI65ZByNqQjORqMi8zZARznHNFWMvLogqkh9c6vuNQPFrUZCZA435H3z8ZASSbOrZCMbtHsZCeeZBvPIURPX0e1mjWZAFw7DEt0O63rapgBLalVadgZDZD}`, {
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
      console.error('Erro no envio para Facebook:', fbJson);
      return res.status(500).json({ error: fbJson });
    }
  } catch (err) {
    console.error('Erro geral:', err);
    return res.status(500).send('Erro no servidor');
  }
}
