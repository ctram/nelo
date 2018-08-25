import FrontPage from '../components/pages/front-page';
import EntryPage from '../components/pages/entry-page';
import EntriesPage from '../components/pages/entries-page';
import EntryForm from '../components/entry-form';
import Entries from '../components/entries';
import EntryFormPage from '../components/entry-form-page';
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
  FrontPage,
  EntriesPage,
  EntryFormPage
});
