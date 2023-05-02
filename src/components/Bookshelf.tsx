import { createSignal, Show } from 'solid-js';
import { BookList } from './BookList';
import { AddBook } from './AddBook';

interface BookshelfProps {
  name?: string;
}

export type Book = {
  title?: string;
  author?: string;
};

const initialBooks: Book[] = [
  {
    title: 'Code Complete',
    author: 'Steve McConnell',
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
  },
];

export function Bookshelf(props: BookshelfProps) {
  const [books, setBooks] = createSignal(initialBooks);
  const [show, setShow] = createSignal(false);

  const toggleShow = () => {
    setShow(!show());
  };

  return (
    <>
      <h1>{props?.name}'s Bookshelf</h1>
      <BookList books={books()} />
      <Show when={show()} fallback={<button onClick={toggleShow}>Add book</button>}>
        <AddBook setBooks={setBooks} setShow={setShow} />
      </Show>
    </>
  );
}
