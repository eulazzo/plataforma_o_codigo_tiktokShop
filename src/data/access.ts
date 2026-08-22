/**
 * ACESSO À PLATAFORMA
 * ============================================================================
 * Credencial única, compartilhada por todos os alunos. É enviada por e-mail
 * pela plataforma de checkout depois da compra.
 *
 * O QUE ISTO É:
 *   · a porta de entrada do produto — a pessoa recebe um acesso e usa;
 *   · atrito contra o link ser colado em grupo sem mais nem menos;
 *   · a cerimônia de "comprei, recebi meu acesso".
 *
 * O QUE ISTO NÃO É:
 *   · segurança. Não há backend: a validação roda no navegador e a senha está
 *     no código da página. Quem quiser entrar sem comprar, entra.
 *
 * Por isso a tela de login NÃO diz "área protegida", não mostra cadeado e não
 * fala em conexão segura. Não prometemos o que não entregamos — mas também não
 * fingimos que um PDF vazaria menos.
 *
 * Não adianta guardar a senha como hash: todo aluno recebe a senha em texto no
 * e-mail de qualquer forma. Deixar legível aqui é mais fácil de manter.
 *
 * PARA TROCAR O ACESSO: edite os valores abaixo, rode o build de novo, publique
 * e mande a credencial nova por e-mail. Quem estava logado continua logado até
 * limpar o navegador — não há como expulsar alguém sem backend.
 */

export const ACCESS = {
  email: 'acesso@ocodigotiktokshop.com',
  password: 'plano7dias2026',
};

/** Compara ignorando espaços sobrando e maiúsculas no e-mail. */
export function checkCredentials(email: string, password: string): boolean {
  return (
    email.trim().toLowerCase() === ACCESS.email.toLowerCase() &&
    password.trim() === ACCESS.password
  );
}
