export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send('Método não permitido');
  }

  const clickid = req.query.fbclid || req.query.source || req.query.aff_sub2;
  const payout = req.query.sum || req.query.payout;

  if (!clickid) {
    return res.status(400).send('Click ID não informado');
  }

  // Enviar evento para o Facebook (exemplo)
  try {
    const response = await fetch('https://graph.facebook.com/v18.0/
1907845369956747/events?access_token=EAAfFtSgH5yMBO4YV2d6apiksEOn7kb9ZCqh6o23GVPb6myuDNYHcHJjlR8FCm2FH1HzBQbohUhcP2PmBNxAD7pomiBrGo4tM5o7lophbhyZCLQ6XVR03xZBNtyRnZCAv0Mo1TrGZAUjipZCllYI0eZCefgojCP1PE1HZCQfVZBumHjXq4Drg1VahVXtZCIN7sqVw5laQZDZD', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: [{
          event_name: 'Lead', // Ou outro tipo de evento
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          event_source_url: 'https://postback-handler.vercel.app/conversao', // Ou sua URL
          user_data: {
            fbc: clickid,
          },
          custom_data: {
            value: payout,
            currency: 'USD'
          }
        }]
      }),
    });

    const responseBody = await response.json();
    if (response.ok) {
      console.log('Evento enviado com sucesso:', responseBody);
    } else {
      console.error('Erro ao enviar evento:', responseBody);
    }
  } catch (error) {
    console.error('Erro ao tentar enviar evento:', error);
  }

  // Resposta para a chamada do postback
  res.status(200).send('Conversão enviada!');
}
