import { useEffect, useState } from 'react';
import MusicCard from '../../components/musicCard';
import { getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import { SongType } from '../../types';
import Loading from '../../components/loading';

export default function Favorites() {
  const [favorites, setFavorites] = useState<SongType[]>();
  const [changeKey, setChangeKey] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true);
      const data = await getFavoriteSongs();
      setFavorites([...data]);
      setIsLoading(false);
    };

    fetchFavorites();
  }, [changeKey]);

  const hRemovefav = (favorite: SongType) => {
    removeSong(favorite);
    setChangeKey(!changeKey);
  };

  if (isLoading) return (<Loading />);

  return (
    <section>
      {/* Mapear e exibir músicas favoritas como cartões */}
      {favorites?.map((fav) => (
        <MusicCard
          key={ fav.trackId }
          previewUrl={ fav.previewUrl }
          trackId={ fav.trackId }
          trackName={ fav.trackName }
          isChecked
          hChange={ () => hRemovefav(fav) }
        />
      ))}
    </section>
  );
}
