export const genShuffle = async (): Promise<string> => {
  const p = Deno.run({ cmd: ['kostka', 'shuffle'], stdout: 'piped' });
  await p.status();
  return new TextDecoder().decode(await p.output());
};
