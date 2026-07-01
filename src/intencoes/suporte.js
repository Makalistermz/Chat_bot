import open from 'open';

const numeroSuporte = '5527995128081';
const mensagem = 'Olá, Gostaria de falar com o suporte!';

const linkWhatsapp = `https://wa.me/${numeroSuporte}?text=${encodeURIComponent(mensagem)}`;

export function suporte(resposta) {
    console.log('Abrindo Whatsapp do suporte...');
    open(linkWhatsapp);
}