type ResultItem = {
  key: string;
  title: string;
  author_name: string[];
};

export async function searchBooks(query: string) {
  if (query.trim() === '') return;

  const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURI(query)}`);
  const { docs } = await response.json();
  const documents = docs as ResultItem[];

  return documents.slice(0, 10).map(({ title, author_name, key }) => ({
    key,
    title,
    author: author_name?.join(', '),
  }));
}
