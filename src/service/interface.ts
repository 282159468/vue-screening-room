export interface IScreeningRoom {
  /** 放映厅ID */
  id: number
  /** 座位列表 */
  seats: string[]
  /** 已选座位 */
  selected: string[]
  /** 已购座位 */
  purchased: string[]
  /** 已占座位 */
  occupied: string[]
}
