export interface PlanetsData {
  bodies: Body[];
}

export interface Body {
  alternativeName: string;
  aphelion: number;
  argPeriapsis: number;
  aroundPlanet: AroundPlanet | null;
  avgTemp: number;
  axialTilt: number;
  bodyType: BodyType;
  density: number;
  dimension: string;
  discoveredBy: string;
  discoveryDate: string;
  eccentricity: number;
  englishName: string;
  equaRadius: number;
  escape: number;
  flattening: number;
  gravity: number;
  id: string;
  inclination: number;
  isPlanet: boolean;
  longAscNode: number;
  mainAnomaly: number;
  mass: Mass | null;
  meanRadius: number;
  moons: Moon[] | null;
  name: string;
  perihelion: number;
  polarRadius: number;
  rel: string;
  semimajorAxis: number;
  sideralOrbit: number;
  sideralRotation: number;
  vol: Vol | null;
}

export interface AroundPlanet {
  planet: string;
  rel: string;
}

export enum BodyType {
  Asteroid = "Asteroid",
  Comet = "Comet",
  DwarfPlanet = "Dwarf Planet",
  Moon = "Moon",
  Planet = "Planet",
  Star = "Star",
}

export interface Mass {
  massExponent: number;
  massValue: number;
}

export interface Moon {
  moon: string;
  rel: string;
}

export interface Vol {
  volExponent: number;
  volValue: number;
}
