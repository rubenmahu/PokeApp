import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface FavoriteState {
	favorites: string[];
	toggleFavorite: (name: string) => void;
}

export const useFavoriteStore = create<FavoriteState>()(
	persist(
		(set) => ({
			favorites: [],
			toggleFavorite: (name) =>
				set((state) => ({
					favorites: state.favorites.includes(name)
						? state.favorites.filter((fav) => fav !== name)
						: [...state.favorites, name],
				})),
		}),
		{name: 'pokemon-favorites'},
	),
);
