import * as readline from 'node:readline';

const args = process.argv.slice(2);
if (args[0] === '--cleanup') {
  process.exit(0);
}

let sessionCounter = 1;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on('line', (line: string) => {
  const trimmed = line.trim();
  if (!trimmed) return;
  try {
    const req = JSON.parse(trimmed);
    const id = req.id;
    const method = req.method;

    let result: unknown = null;
    switch (method) {
      case 'ping':
        result = { protocol: 1 };
        break;
      case 'begin':
        result = ++sessionCounter;
        break;
      case 'watch_register':
        result = `watch-${Date.now()}`;
        break;
      case 'watch_scan':
        result = [];
        break;
      case 'watch_forget':
      case 'watch_enqueue':
      case 'set_shortcut':
      case 'prime_tray':
      case 'activate':
      case 'reject':
      case 'deliver':
      case 'copy':
      case 'type_delta':
      case 'finish':
        result = null;
        break;
      default:
        result = null;
        break;
    }

    process.stdout.write(JSON.stringify({ id, result }) + '\n');
  } catch (err) {
    process.stdout.write(JSON.stringify({ id: null, error: String(err) }) + '\n');
  }
});

process.stdin.on('end', () => {
  process.exit(0);
});
