import { JSX, Setter, createSignal } from 'solid-js';
import { Book } from './Bookshelf';

interface AddBookProps {
  setBooks: Setter<Book[]>;
  setShow: Setter<boolean>;
}

const emptyBook: Book = { title: '', author: '' };

export function AddBook(props: AddBookProps) {
  const [newBook, setNewBook] = createSignal(emptyBook);

  const addBook: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (e) => {
    e.preventDefault();

    if (checkInputLength([newBook().title as string, newBook().author as string])) {
      props.setBooks((prev) => [...prev, newBook()]);
      setNewBook(emptyBook);
    } else {
      alert('Please enter something');
    }
  };

  const checkInputLength = (allInput: string[]) => allInput.find((i: string) => i.trim().length !== 0);

  return (
    <form>
      <div>
        <label for="title">Book name</label>
        <input
          id="title"
          value={newBook().title}
          onInput={(e) => {
            setNewBook({ ...newBook(), title: e.currentTarget.value });
          }}
        />
      </div>
      <div>
        <label for="author">Author</label>
        <input
          id="author"
          value={newBook().author}
          onInput={(e) => {
            setNewBook({ ...newBook(), author: e.currentTarget.value });
          }}
        />
      </div>
      <button type="submit" onClick={addBook}>
        Add book
      </button>
      <button type="button" onClick={() => props.setShow(false)}>
        Close
      </button>
    </form>
  );
}
