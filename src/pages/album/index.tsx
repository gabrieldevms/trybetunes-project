import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getMusics from '../../services/musicsAPI';
import Loading from '../../components/loading';
import MusicCard from '../../components/musicCard';

import { AlbumType, SongType } from '../../types';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';

export type FavoriteProps = {
  trackName: string,
  previewUrl: string,
  trackId: number,
};

export default function Album() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();
  const [album, setAlbum] = useState<AlbumType>();
  const [songsList, setSongsList] = useState<SongType[]>();
  const [favoritesList, setFavoritesList] = useState<FavoriteProps[]>([]);
  const [change, setChange] = useState(true);
  const [favoritesIndex, setFavoritesIndex] = useState<boolean[]>([]);
  const [actualFavorite, setActualFavorite] = useState<SongType>();
  const [addRemove, setAddRemove] = useState<boolean>();

  const fPesquisaFavoritos = async (songList: SongType[]) => {
    const favsList = await getFavoriteSongs();
    const checkArray = songList.map((song: SongType) => {
      const checkFavs = favsList.map((favs) => (favs.trackId === song.trackId));
      return !!checkFavs.includes(true);
    });

    setFavoritesIndex([...checkArray]);
    setFavoritesList(favsList);
  };

  useEffect(() => {
    const fetchMusics = async () => {
      setIsLoading(true);
      const data = await getMusics(id ?? '');
      setAlbum(data[0]);
      const musics = data.slice(1) as SongType[];
      setSongsList([...musics]);
      fPesquisaFavoritos(musics);
      setIsLoading(false);
    };

    fetchMusics();
  }, [id]);

  useEffect(() => {
    const addRemoveApi = async (actualFavoriteSong: SongType, addOrRemove: boolean) => {
      if (!addOrRemove) {
        removeSong(actualFavoriteSong);
      } else {
        addSong(actualFavoriteSong);
      }
    };

    if (addRemove !== undefined
      && actualFavorite !== undefined) addRemoveApi(actualFavorite, addRemove);
  }, [favoritesList, addRemove, actualFavorite]);

  const hFavListaAlterada = (idOfTrack: number) => {
    const actualFav = songsList?.find((fav) => fav.trackId === idOfTrack);
    if (actualFav !== undefined && songsList) {
      const index = songsList.indexOf(actualFav);
      if (favoritesList.find((fav) => fav.trackId === idOfTrack)) {
        removeFavorite(actualFav, index);
        setActualFavorite(actualFav);
        setAddRemove(false);
      } else {
        addFavorite(actualFav, index);
        setActualFavorite(actualFav);
        setAddRemove(true);
      }
    }
    setChange(!change);
  };

  const removeFavorite = async (actualFav: SongType, index: number) => {
    const auxArray = favoritesIndex;
    auxArray.splice(index, 1);
    auxArray.splice(index, 0, false);
    const filtered = favoritesList
      .filter((favorite) => favorite.trackId !== actualFav.trackId);
    setFavoritesList(filtered);
  };

  const addFavorite = async (actualFav: SongType, index: number) => {
    const auxArray = favoritesIndex;
    auxArray.splice(index, 1);
    auxArray.splice(index, 0, true);
    setFavoritesList([...favoritesList, actualFav]);
  };

  if (isLoading) return <Loading />;

  return (
    <>
      {/* Exibir nome do artista e nome do álbum */}
      <h2 data-testid="artist-name">{album?.artistName}</h2>
      <h2 data-testid="album-name">{album?.collectionName}</h2>
      <section>
        {/* Mapear e exibir as músicas do álbum como cartões */}
        {songsList?.map((song, index) => (<MusicCard
          key={ song.trackId }
          previewUrl={ song.previewUrl }
          trackName={ song.trackName }
          trackId={ song.trackId }
          hChange={ () => hFavListaAlterada(song.trackId) }
          isChecked={ favoritesIndex[index] }
        />))}
      </section>
    </>
  );
}
