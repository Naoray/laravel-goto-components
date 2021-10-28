export function nameToPath(path: string): string {
  return `/resources/views/components/${path.replace(/\./g, "/")}.blade.php`;
}

export function nameToIndexPath(path: string): string {
  return `/resources/views/components/${path.replace(/\./g, "/")}/index.blade.php`;
}