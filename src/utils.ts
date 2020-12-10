export function nameToPath(path: string): string {
  return `/resources/views/components/${path.replace(/\./g, "/")}.blade.php`;
}
