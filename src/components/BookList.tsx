import { For } from 'solid-js';
import { Book } from './Bookshelf';

interface BookListProps {
  books: Book[];
}

export function BookList(props: BookListProps) {
  return (
    <>
      <h2 style={'color: #444'} aria-live="assertive">
        My books ({props.books.length})
      </h2>
      <ul>
        <For each={props.books}>
          {(book) => (
            <li>
              {book.title} <span>({book.author})</span>
            </li>
          )}
        </For>
      </ul>
    </>
  );
}
