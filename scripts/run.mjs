/**
 * Roda o Vite com a versão escolhida do produto.
 *
 *   node scripts/run.mjs dev complete
 *   node scripts/run.mjs build essential
 *
 * A variável PLAN decide qual arquivo de conteúdo o alias "@plan-content"
 * resolve (ver vite.config.ts). O conteúdo exclusivo da versão Completa
 * simplesmente não entra no bundle da versão Essencial.
 */
import { spawn } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const [, , command = 'dev', plan = 'complete'] = process.argv;

if (!['dev', 'build'].includes(command)) {
  console.error(`Comando inválido: "${command}". Use "dev" ou "build".`);
  process.exit(1);
}

if (!['essential', 'complete'].includes(plan)) {
  console.error(`Versão inválida: "${plan}". Use "essential" ou "complete".`);
  process.exit(1);
}

const args = command === 'build' ? ['build', '--outDir', `dist/${plan}`] : [];

console.log(`\n▸ ${command === 'build' ? 'Build' : 'Dev server'} — versão ${plan.toUpperCase()}\n`);

const child = spawn('npx', ['vite', ...args], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, PLAN: plan },
});

child.on('exit', (code) => {
  /* as notas das pastas de assets são para você, não para publicar */
  if (command === 'build' && code === 0) {
    const dist = join(process.cwd(), 'dist', plan);
    for (const folder of ['audio', 'modulos']) {
      const notes = join(dist, folder, 'LEIA-ME.md');
      if (existsSync(notes)) rmSync(notes);
    }
  }
  process.exit(code ?? 0);
});
