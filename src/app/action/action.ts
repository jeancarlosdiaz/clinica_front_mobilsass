import { createAction , props } from "@ngrx/store";
//import {ItemModel } from "@core/models/Item.interface";


export  const loadItems = createAction(
    '[Item List] Load items',
    props<{bookId: string}>()
)


/* export  const loadedItems = createAction(
    'add book',
    props<{items: ItemModel}>()
) */