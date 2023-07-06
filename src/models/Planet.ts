export interface PlanetModel {
  name: string;
  distance: number;
  size: number;
  texture: string;
  tilt: number;
  speed: number;
  inclination: number;
  distanceMoonFromEarth?: number;
}
