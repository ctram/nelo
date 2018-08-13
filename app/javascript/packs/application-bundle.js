import EntryForm from '../components/entry-form';
import Entries from '../components/entries';
import Landing from '../components/landing';
import Modal from '../components/modal';
import Navbar from '../components/navbar';
import ReactOnRails from 'react-on-rails';

ReactOnRails.register({
  Navbar,
  Entries,
  EntryForm,
  Landing,
  Modal
});
