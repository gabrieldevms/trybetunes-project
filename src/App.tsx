import { Route, Routes } from 'react-router-dom';
import Layout, { Album, Favorites, Login, NotFound, Profile, ProfileEdit, Search } from './pages';

function App() {
  return (
    <Routes>
      <Route element={ <Layout /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Album /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/profile/edit" element={ <ProfileEdit /> } />
      </Route>
      <Route path="/" element={ <Login /> } />
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
