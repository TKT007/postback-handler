export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send('Method Not Allowed');
  }

  const { fbclid, payout, currency, test_event_code } = req.query;

  if (!fbclid) {
    return res.status(400).json({ error: 'Parâmetro fbclid é obrigatório' });
  }

  const ACCESS_TOKEN = 'EAAfFtSgH5yMBOxA4hqTUW8yi3yYZA6H7O5FbQZBArznqpaKPa7RFF0SZA8Eef482ZAKakc4RT96R210A5ZC87EJCARBUklgQKGATqKzJobSYvYBrtSWKXhtA27ZAZA8u1ifbz1CjZCbQZCN6GGC45K1LdysMamRVhVA1TBywCd1e2FK0xjFWFR05BAc10ig23Pbp9qwZDZD';
  const PIXEL_ID = '1907845369956747';

  const eventTime = Math.floor(Date.now() / 1000);
  const eventName = 'Lead';

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: eventTime,
        action_source: 'website',
        event_source_url: 'https://www.docsmaked.shop',
        user_data: {
          fbc: fbclid
        },
        custom_data: {
          value: parseFloat(payout || 0),
          currency: currency || 'USD'
        }
      }
    ],
    ...(test_event_code && { test_event_code })
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
