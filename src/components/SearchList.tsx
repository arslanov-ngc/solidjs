import { For, Show, Setter, JSX, createSignal, createEffect } from 'solid-js';
import { Book } from './Bookshelf';

interface SearchListProps {
  when: boolean;
  data: Book[];
  setBooks: Setter<Book[]>;
}

export function SearchList(props: SearchListProps) {
  const [bookList, setBookList] = createSignal<Book[]>([]);

  const addBook = (book: Book) => {
    props.setBooks((books) => {
      const hasSelectedBook = books.find((b) => b.key === book.key);

      return hasSelectedBook ? [...books] : [...books, book];
    });

    setBookList(() => {
      return bookList().filter((b) => b.key !== book.key);
    });
  };

  createEffect(() => {
    setBookList(props.data);
  });

  return (
    <div class="search_list">
      <Show when={!props.when} fallback={<span class="loading">Searching...</span>}>
        <ul>
          <For each={bookList()} fallback={<span>Empty data</span>}>
            {(book) => (
              <li>
                <p>
                  {book.title}{' '}
                  <span>
                    by <b>{book.author}</b>
                  </span>
                </p>
                <button
                  type="button"
                  class="add_button"
                  aria-label={`Add ${book.title} by ${book.author} to the bookshelf`}
                  title={`Add ${book.title} by ${book.author} to the bookshelf`}
                  onClick={() => {
                    addBook(book);
                  }}
                >
                  Add
                </button>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
}
