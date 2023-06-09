export type Item = {
  id: number
  value: string
  created_at: number
}

export enum SortKey {
  VALUE = 'value',
  CREATED_AT = 'created_at'
}
