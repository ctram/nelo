import FrontPage from '../components/pages/front-page';
import EntryPage from '../components/pages/entry-page';
import EntriesPage from '../components/pages/entries-page';
import CommentPage from '../components/pages/comment-page';
import CommentsPage from '../components/pages/comments-page';
import ProfilePage from '../components/pages/profile-page';
import EntryFormPage from '../components/pages/entry-form-page';
import Navbar from '../components/navbar';
import ReactOnRails from 'react-on-rails';

ReactOnRails.register({
  Navbar,
  EntryPage,
  FrontPage,
  EntriesPage,
  EntryFormPage,
  CommentsPage,
  ProfilePage,
  CommentPage
});
