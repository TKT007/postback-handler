export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).send('Método não permitido');
    }

    const clickid = req.query.fbclid || req.query.source || req.query.aff_sub2;
    const payout = req.query.sum || req.query.payout;

    // Verifica se os parâmetros são válidos
    if (!clickid || !payout) {
      return res.status(400).send('Click ID ou Payout não informados');
    }

    console.log(`Click ID: ${clickid}, Payout: ${payout}`);

    // Retorno de sucesso simples para testar a função sem o envio para o Facebook
    res.status(200).send('Conversão processada!');
  } catch (error) {
    console.error('Erro no processamento da função:', error);
    res.status(500).send('Erro interno do servidor');
  }
}
