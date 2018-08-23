import FrontPage from '../components/front-page';
import EntryPage from '../components/entry-page';
import EntryForm from '../components/entry-form';
import Entries from '../components/entries';
import Landing from '../components/landing';
import ModalConfirmDeleteEntry from '../components/modals/modal-confirm-delete-entry';
import Navbar from '../components/navbar';
import ReactOnRails from 'react-on-rails';

ReactOnRails.register({
  Navbar,
  Entries,
  EntryForm,
  EntryPage,
  Landing,
  ModalConfirmDeleteEntry,
  FrontPage
});
