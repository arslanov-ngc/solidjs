import { JSX, Setter, createResource, createSignal } from 'solid-js';
import { Book } from './Bookshelf';
import { searchBooks } from '../utils/searchBooks';
import { SearchList } from './SearchList';

interface AddBookProps {
  setBooks: Setter<Book[]>;
  setShow: Setter<boolean>;
}

export function AddBook(props: AddBookProps) {
  const [input, setInput] = createSignal('');
  const [query, setQuery] = createSignal('');

  const onSubmit: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (e) => {
    e.preventDefault();
    setQuery(input());
  };

  const [data] = createResource(query, searchBooks);

  return (
    <form>
      <h2>Search</h2>
      <div>
        <label for="title">Search Book</label>
        <input
          id="title"
          placeholder="Enter something"
          value={input()}
          onInput={(e) => {
            setInput(e.currentTarget.value);
          }}
        />
      </div>
      <button type="submit" onClick={onSubmit}>
        Search
      </button>
      <button type="button" onClick={() => props.setShow(false)}>
        Close
      </button>
      <SearchList when={data.loading} data={data() as Book[]} setBooks={props.setBooks} />
    </form>
  );
}
