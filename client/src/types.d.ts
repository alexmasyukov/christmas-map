export interface ISize {
  height: number
  width: number
}

export interface IPosition {
  top: number
  left: number
}

export interface IAddition {
  image: string
  options: IPosition
  animation?: string
}

export interface IPersonage {
  image: string
  options: ISize & IPosition
  additions?: Array<IAddition>
}

export interface IBase {
  image: string
  options: IPosition
}

export interface IBoundary {
  svg: string
  options: ISize & IPosition
}

export interface IScene {
  id: number
  options: IPosition
  personages: Array<IPersonage>
  base: IBase
  boundary: IBoundary
}
