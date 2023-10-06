import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Loading from '../../components/loading';
import { AlbumType } from '../../types';

export default function Search() {
  const [artistName, setArtistName] = useState({ artist: '' });
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [actualArtist, setActualArtist] = useState('');

  useEffect(() => {
    const verifyLength = () => ((artistName.artist.length > 1)
      ? setBtnDisabled(false)
      : setBtnDisabled(true));
    verifyLength();
  }, [artistName.artist]);

  const hPerquisaClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsLoading(true);
    e.preventDefault();
    const albumsList = await searchAlbumsAPI(artistName.artist);
    setActualArtist(artistName.artist);
    setArtistName({ artist: '' });
    setAlbums(albumsList);
    setIsLoading(false);
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <form action="">
        {/* Campo de entrada para o nome do artista */}
        <label htmlFor="artist-input">
          <input
            type="text"
            id="artist-input"
            placeholder="Digite sua pesquisa"
            data-testid="search-artist-input"
            value={ artistName.artist }
            onChange={ (e) => setArtistName({ artist: e.target.value }) }
          />
        </label>
        {/* Botão de pesquisa */}
        <button
          onClick={ (e) => hPerquisaClick(e) }
          data-testid="search-artist-button"
          disabled={ btnDisabled }
        >
          Pesquisar
        </button>
      </form>
      {albums.length > 0
      && <h2>{`Resultado de álbuns de: ${actualArtist}`}</h2>}
      {albums.length === 0
        ? <h2>Nenhum álbum foi encontrado</h2>
        : albums.map((album, index) => (
          <div key={ index }>
            <NavLink
              to={ `/album/${album.collectionId}` }
              data-testid={ `link-to-album-${album.collectionId}` }
            >
              {album.collectionName}
            </NavLink>
            <br />
          </div>
        ))}
    </>
  );
}
