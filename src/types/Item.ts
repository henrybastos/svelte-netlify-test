export type Items = {
   expense: Array<Item>,
   saving: Array<Item>,
   income: Array<Item>
}
export type Item = {
   title: string;
   amount: number;
   category: string;
}