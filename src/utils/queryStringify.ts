export function queryStringify(data: object): string {
  const stingifiedData = Object.keys(data).reduce(
    (acc: string, el: string) => acc.concat(`${el}=${(data as any)[el]}&`),
    "?"
  );
  return stingifiedData.substring(0, stingifiedData.length - 1);
}
