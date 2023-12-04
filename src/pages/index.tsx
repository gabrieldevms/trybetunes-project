import { Outlet } from 'react-router-dom';
import Header from '../components/header';

export { default as Album } from './album';
export { default as Favorites } from './favorites';
export { default as Login } from './login';
export { default as NotFound } from './notFound';
export { default as Profile } from './profile';
export { default as Search } from './search';
export { default as ProfileEdit } from './profileEdit';

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
