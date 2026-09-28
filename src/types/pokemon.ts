export interface Pokemon {
	name: string;
	url: string;
}

export interface PokemonResponse {
	count: number;
	results: Pokemon[];
}

export interface PokemonType {
	type: {
		name: string;
	};
}

export interface PokemonStat {
	base_stat: number;
	stat: {
		name: string;
	};
}

export interface PokemonDetail {
	id: number;
	name: string;
	height: number;
	weight: number;
	types: PokemonType[];
	stats: PokemonStat[];
}
