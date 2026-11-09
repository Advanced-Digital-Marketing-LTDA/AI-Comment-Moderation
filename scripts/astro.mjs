import { spawn } from 'node:child_process';
import { constants } from 'node:os';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export function commandPlan(command, args = [], env = process.env) {
  if (!['dev', 'check', 'build', 'preview'].includes(command))
    throw new Error(`Unsupported Astro command: ${command}`);
  const action = command;
  const bin = fileURLToPath(new URL('./bin/astro.mjs', import.meta.resolve('astro/package.json')));
  const steps = [[process.execPath, bin, action, ...args]];
  if (action === 'build')
    for (const script of ['generate-hosting.mjs', 'check-output.mjs'])
      steps.push([process.execPath, fileURLToPath(new URL(script, import.meta.url))]);
  return {
    env: { ...env, ASTRO_TELEMETRY_DISABLED: '1' },
    steps,
  };
}

export async function runCommands(steps, env) {
  let active;
  let interrupted;
  const relay = (signal) => {
    interrupted = signal;
    active?.kill(signal);
  };
  const onInterrupt = () => relay('SIGINT');
  const onTerminate = () => relay('SIGTERM');
  process.on('SIGINT', onInterrupt);
  process.on('SIGTERM', onTerminate);
  try {
    for (const [executable, ...args] of steps) {
      const result = await new Promise((resolve, reject) => {
        active = spawn(executable, args, { env, stdio: 'inherit', shell: false });
        active.once('error', reject);
        active.once('close', (code, signal) => resolve({ code, signal }));
      });
      active = undefined;
      const signal = interrupted ?? result.signal;
      if (signal) return 128 + (constants.signals[signal] ?? 1);
      if (result.code !== 0) return result.code ?? 1;
    }
    return 0;
  } finally {
    process.off('SIGINT', onInterrupt);
    process.off('SIGTERM', onTerminate);
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    try {
      process.loadEnvFile();
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    const plan = commandPlan(process.argv[2], process.argv.slice(3));
    process.exitCode = await runCommands(plan.steps, plan.env);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
